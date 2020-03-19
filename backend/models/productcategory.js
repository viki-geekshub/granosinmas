'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    CategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategory;
};