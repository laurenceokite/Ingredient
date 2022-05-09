const { Sequelize, Model, DataTypes, UUIDV4 } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
	checkPassword(pass) {
		return bcrypt.compareSync(pass, this.password);
	}
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;