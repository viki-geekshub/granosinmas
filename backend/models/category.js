'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    code:{
      allowNull: false,   
      unique: true,  // NO FUNCIONA - Habria que hacerlo a mano en el phpMyAdmin
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Category.associate = function(models) { // Función que asocia la tabla categorias con la tabla Productos a través de sus modelos
    Category.belongsToMany(models.Product,{ // Creo la relación entre la tabla categories y la tabla products. Es una relacion de muchos a muchos.
      through: models.ProductCategory  // a traves de la tabla de cruce ProductCategory
    });  
  };
  return Category;
};