'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      external_code: {
        type: Sequelize.STRING(20)
      },
      theme: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      remarks: {
        type: Sequelize.TEXT
      },
      pic_url: {
        type: Sequelize.STRING(200)
      },
      custom_name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      custom_age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      event_date: {
        type: Sequelize.DATE
      },
      atwork_date: {
        type: Sequelize.DATE
      },
      shipment_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      channel_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      carrier_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shipment_priority_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('orders');
  }
};