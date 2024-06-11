'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      Animal.hasMany(models.Transaction, {foreignKey: "AnimalId"});
    }
  }
  Animal.init({
    intakeType: DataTypes.STRING,
    inDate: DataTypes.STRING,
    petName: DataTypes.STRING,
    // description: DataTypes.STRING,
    animalType: DataTypes.STRING,
    petAge: DataTypes.STRING,
    petSize: DataTypes.STRING,
    color: DataTypes.STRING,
    breed: DataTypes.STRING,
    sex: DataTypes.STRING,
    urlLink: DataTypes.STRING,
    crossing: DataTypes.STRING,
    // status: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};