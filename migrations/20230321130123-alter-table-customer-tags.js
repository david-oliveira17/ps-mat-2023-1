'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //Cria a chave estrangeira da tabela customers para a tabela cities
    await queryInterface.addConstraint('customer_tags', {
     fields: ['customer_id'],   //Campo da tabela de origem
     type: 'foreign key',
     name: 'customer_tags_customers_fk',  //Nome da chave estrangeira(deve ser unico no BD)
     references: {
          table: 'customers',  //Tabela estrangeira
          field: 'id'       //Campo da tabela estrangeira
     },
     onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
     onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
    })


    await queryInterface.addConstraint('customer_tags', {
      fields: ['tag_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'customer_tags_tags_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'tags',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })
  },

  

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('customer_tags', 'customers_tags_tags_fk')
    await queryInterface.removeConstraint('customer_tags', 'customers_tags_customers_fk')
  }
};
