'use strict';

const { hashPassword } = require("../helpers/bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, { foreignKey: "UserId" })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exists",
        args: true
      },
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format",
          args: true
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          msg: "Minimum password length is 8",
          args: [8, Infinity]
        }
      }
    },
    imageUrl: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        if (user.password) {
          user.password = hashPassword(user.password);
        }
        
        user.imageUrl = "",
        user.phoneNumber = ""
      }
    }
  });
  return User;
};