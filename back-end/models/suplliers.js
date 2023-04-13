'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suplliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Products, {
        foreignKey: 'suplliers',  //Campo da tabela estrangeira
        sourceKey: 'id',        //Campo da tabela local
        as: 'products'         //Nome do campo de associação(plural)
      })
    }
  }
  Suplliers.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Suplliers',
    tableName: 'suplliers'
  });
  return Suplliers;
};