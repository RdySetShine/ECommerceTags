const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(

  {
    
id: {

     type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
},

product_id: {

  type: DataTypes.INTEGER,

  references: {

    model: 'product',
    key: 'id' // when you have references you are saying, go to the model, and use that id the category_id will be tied to the same id in the category model here
    
    }
  
},

tag_id: {

  type: DataTypes.INTEGER,

  references: {

    model: 'tag',
    key: 'id' // when you have references you are saying, go to the model, and use that id the category_id will be tied to the same id in the category model here
    
    }
  
},

    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
