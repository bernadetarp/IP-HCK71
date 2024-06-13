'use strict';

const axios = require("axios")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const response = await axios({
      method: 'GET',
      url: 'https://pet-data.p.rapidapi.com/records',
      params: {
        orderBy: 'dataListIndex_asc',
        index: '0',
        limit: '20'
      },
      headers: {
        'x-rapidapi-key': "d110c449a2msh7eec7ec3ac4265dp17f8fdjsn368645d2ff51",
        'x-rapidapi-host': 'pet-data.p.rapidapi.com'
      }
    });

    const dataAnimal = response.data.data.map(animal => {
      delete animal.dataListIndex;
      delete animal.animalId;

      animal.createdAt = animal.updatedAt = new Date();

      return animal
    })

    await queryInterface.bulkInsert("Animals", dataAnimal, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Animals", null, {});
  }
};
