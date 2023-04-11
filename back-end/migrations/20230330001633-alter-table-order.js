'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('orders', {
      fields: ['channel_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'orders_channels_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'channels',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })

     await queryInterface.addConstraint('orders', {
      fields: ['carrier_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'orders_carriers_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'carriers',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })

     await queryInterface.addConstraint('orders', {
      fields: ['shipment_priority_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'orders_shipment_priorities_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'shipment_priorities',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })

     await queryInterface.addConstraint('orders', {
      fields: ['payment_method_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'orders_payment-methods_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'payment_methods',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })

     await queryInterface.addConstraint('orders', {
      fields: ['customer_id'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'orders_customers_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'customers',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'orders_channels_fk')
    await queryInterface.removeConstraint('orders', 'orders_carriers_fk')
    await queryInterface.removeConstraint('orders', 'orders_shipment_priorities_fk')
    await queryInterface.removeConstraint('orders', 'orders_payment-methods_fk')
    await queryInterface.removeConstraint('orders', 'orders_customers_fk')
  }
};
