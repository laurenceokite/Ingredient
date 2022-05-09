const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ingredient extends Model {} 

Ingredient.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'recipe',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metric_value: DataTypes.FLOAT,
    metric_unit: DataTypes.TEXT,
    us_value: DataTypes.FLOAT,
    us_unit: DataTypes.TEXT
}, { 
    sequelize, 
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ingredient" 
});

module.exports = Ingredient;