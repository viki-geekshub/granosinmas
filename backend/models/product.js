'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    image_path: DataTypes.STRING,
    price: DataTypes.FLOAT,
    packedPrice: DataTypes.FLOAT,
    stock: DataTypes.FLOAT
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.Category,{ // Creo la relación entre la tabla products y la tabla categories. Es una relacion de muchos a muchos.
      through: models.ProductCategory  // a traves de la tabla de cruce ProductCategory
    })
    Product.belongsToMany(models.Order,{  // Un Producto puede pertenecer a muchos pedidos
      through: models.OrderProduct  
  });
  };
  return Product;
};