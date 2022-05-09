const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {} 

Recipe.init({
    //COLUMNS
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },

    shared_id: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'id'
        }
    },

    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

},{ 
    //
    sequelize, 
    freezeTableName: true,
    underscored: true,
    modelName: "ingredient" 
});
