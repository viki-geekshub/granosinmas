'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code:{
      allowNull: false,   // Añado los campos que no pueden estar vacíos (NOT NULL)
      unique: true,  // NO FUNCIONA - Habria que hacerlo a mano en el phpMyAdmin
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image_path: DataTypes.STRING,
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    packedPrice: DataTypes.FLOAT,
    stock: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
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