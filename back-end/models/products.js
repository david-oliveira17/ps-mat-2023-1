'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Suplliers, {
        foreignKey: 'supllier',     //Nome do campo na tabela de origem
        targetKey: 'id',           //Nome do campo na tabela de destino
        as: 'suplliers'                 //Nome do atributo para exibição
   })
    }
  }
  Products.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    unit: {
      type: DataTypes.ENUM("un","kg"),
      allowNull: false
    },
    supllier: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'products'
  });
  return Products;
};