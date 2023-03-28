'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_tags', {
      fields: ['order_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'order_tags_orders_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'orders',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })

     await queryInterface.addConstraint('order_tags', {
      fields: ['tag_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'order_tags_tags_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'tags',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })

  },

  

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_tags', 'order_tags_orders_fk')
    await queryInterface.removeConstraint('order_tags', 'order_tags_tags_fk')
  }
};
