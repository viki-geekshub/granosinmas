'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    UserId: {
      allowNull: false,
      unique: true,  // NO FUNCIONA - Habria que hacerlo a mano en el phpMyAdmin
      type: DataTypes.INTEGER
    },
    deliveryDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User); // Un pedido pertenece a un solo usuario
    Order.belongsToMany(models.Product,{ // Un pedido puede tener muchos productos
      through: models.OrderProduct
    });
  };
  return Order;
};