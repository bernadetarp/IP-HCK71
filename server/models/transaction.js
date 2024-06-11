'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {foreignKey: "UserId"});
      Transaction.belongsTo(models.Animal, {foreignKey: "AnimalId"});
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    AnimalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};