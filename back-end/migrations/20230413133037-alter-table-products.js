'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['supllier'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'products_suplliers_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'suplliers',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'products_suplliers_fk')
  }
};
