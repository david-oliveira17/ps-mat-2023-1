'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.CustomerTag, {
      //   foreignKey: 'tag_id',   //Campo da tabela estrangeira
      //   sourceKey: 'id',        //Campo da tabela local
      //   as: 'customers'         //Nome do campo de associação (plural)
      // })

      this.belongsToMany(models.Customer, {
        through: 'customer_tags',     //Tabela intermediaria
        foreignKey: 'tag_id',         //Chave estrangeira da tabela intermediária
        otherKey: 'customer_id',      //Outra chave da tabela intermediaria
        as: 'customers'               //Nome do campo de associação (plural)
      })
    }
  }
  Tag.init({
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
    color: {
      type: DataTypes.STRING(8)
    },
    type: {
      type: DataTypes.ENUM('C','O'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });
  return Tag;
};