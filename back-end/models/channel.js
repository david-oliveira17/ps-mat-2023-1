'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.Order, {
        foreignKey: 'channel_id',  //Campo da tabela estrangeira
        sourceKey: 'id',        //Campo da tabela local
        as: 'orders'         //Nome do campo de associação(plural)
      })
    }
  }
  Channel.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    commission_fee: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      default:0
    }
  }, {
    sequelize,
    modelName: 'Channel',
    tableName: 'channels'
  });
  return Channel;
};