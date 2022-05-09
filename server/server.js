const express = require('express');
const routes = require('./routes');
const path = require('path');

const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(session({
   secret: process.env.SESS_SECRET,
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
     db: sequelize
   })
 }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

(async () => {
   try {
      await sequelize.sync({ force: true });
   }
   catch (e) {
      console.log(e)
   }
   app.listen(PORT, () => console.log(`Server now listening on ${PORT}`));
})();


