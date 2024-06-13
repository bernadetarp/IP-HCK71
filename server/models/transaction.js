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
    orderId: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    AnimalId: DataTypes.INTEGER,
    isFilledForm: DataTypes.BOOLEAN,
    isPaid: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      beforeCreate(transaction) {
        transaction.isPaid = false;
      }
    }
  });
  return Transaction;
};