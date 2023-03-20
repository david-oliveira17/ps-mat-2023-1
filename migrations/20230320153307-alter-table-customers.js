'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //Cria a chave estrangeira da tabela customers para a tabela cities
    await queryInterface.addConstraint('customers', {
     fields: ['city_id'],   //Campo da tabela de origem
     type: 'foreign key',
     name: 'customers_cities_fk',  //Nome da chave estrangeira(deve ser unico no BD)
     references: {
          table: 'cities',  //Tabela estrangeira
          field: 'id'       //Campo da tabela estrangeira
     },
     onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
     onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //Reverte as alterações feitas no up()
    await queryInterface.removeConstraint('customers', 'customers_cities_fk')
  }
};