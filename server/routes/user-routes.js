const database = require('../config/connection');
const router = require('express').Router();
const { User } = require('../models');

//Add New User
router.post('/', (req, res) => {
    User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(data => {
      
        //Create new session 
        //save() updates the session instance that was created in server.js
        req.session.save(() => {
          req.session.user_id = data.id;
          req.session.email = data.email;
          req.session.loggedIn = true;
        })
        console.log(req.session.email);
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});




module.exports = router;