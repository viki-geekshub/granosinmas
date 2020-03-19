'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false, // añado NOT NULL a los campos que no pueden estar vacíos
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
}
  return Product;
};