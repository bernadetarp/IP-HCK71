'use strict';

const { hashPassword } = require("../helpers/bcrypt");
let nodemailer = require('nodemailer');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, { foreignKey: "UserId" })
    }

    static async nodemailer(email, link) {
      let transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'bernadetargn@gmail.com',
         pass: process.env.NODEMAILER_PASS
       }
     });
     
     let mailOptions = {
       from: 'bernadetargn@gmail.com',
       to: email,
       subject: 'Reset your Password',
       text: link
     };
     
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
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
      }
    }
  });
  return User;
};