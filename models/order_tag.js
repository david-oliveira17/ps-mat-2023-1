'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Order, {
        foreignKey: 'order_id',     //Nome do campo na tabela de origem
        targetKey: 'id',               //Nome do campo na tabela de destino
        as: 'order'                 //Nome do atributo para exibição
      })

      this.belongsTo(models.Tag, {
        foreignKey: 'tag_id',     //Nome do campo na tabela de origem
        targetKey: 'id',               //Nome do campo na tabela de destino
        as: 'tag'                 //Nome do atributo para exibição
      })

    }
  }
  OrderTag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderTag',
    tableName: 'order_tags'
  });
  return OrderTag;
};