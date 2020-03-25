'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    surnames: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,  // NO FUNCIONA - Habria que hacerlo a mano en el phpMyAdmin
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dni: DataTypes.STRING,
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: DataTypes.STRING,
    observations: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
      User.hasMany(models.Order); // Un usuario puede tener muchos pedidos
  };
  return User;
};