'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //Renomeia os campos created_at da tabela users
    //para createdAt e updateAt, respectivamente
    await queryInterface.renameColumn('users', 'created_at', 'createdAt')
    await queryInterface.renameColumn('users','updated_at','updatedAt')
  },

  async down (queryInterface, Sequelize) {

    //Reverte as alterações feitas no up()
    await queryInterface.renameColumn('users', 'createdAt', 'created_at')
    await queryInterface.renameColumn('users','updatedAt','updated_at')
  }
};
