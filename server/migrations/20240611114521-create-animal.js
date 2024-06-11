'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      intakeType: {
        type: Sequelize.STRING
      },
      inDate: {
        type: Sequelize.STRING
      },
      petName: {
        type: Sequelize.STRING
      },
      animalType: {
        type: Sequelize.STRING
      },
      petAge: {
        type: Sequelize.STRING
      },
      petSize: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      urlLink: {
        type: Sequelize.STRING
      },
      crossing: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animals');
  }
};