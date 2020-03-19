'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Category.associate = function(models) { // función que asocia la tabla categorias con la tabla Productos a través de sus modelos
    Category.belongsToMany(models.Product,{ // Creo la relación entre la tabla categories y la tabla products. Es una relacion de muchos a muchos.
      through: models.ProductCategory  // a traves de la tabla de cruce ProductCategory
    });  
  };
  return Category;
};