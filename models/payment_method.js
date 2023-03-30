'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.Order, {
        foreignKey: 'payment_method_id',  //Campo da tabela estrangeira
        sourceKey: 'id',        //Campo da tabela local
        as: 'orders'         //Nome do campo de associação(plural)
      })
    }
  }
  PaymentMethod.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(30)
    },
    operator_fee: {
      type: DataTypes.DECIMAL(18,2)
    }
  },
     {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'payment_methods'
  });
  return PaymentMethod;
};