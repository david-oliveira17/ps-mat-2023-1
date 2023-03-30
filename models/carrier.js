'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataType lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.Order, {
        foreignKey: 'carrier_id',  //Campo da tabela estrangeira
        sourceKey: 'id',        //Campo da tabela local
        as: 'orders'         //Nome do campo de associação(plural)
      })
    }
  }
  Carrier.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Carrier',
    tableName: 'carriers'
  });
  return Carrier;
};