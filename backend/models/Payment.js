// models/Payment.js:
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Player = require('./Player');

const Payment = sequelize.define('Payment', {
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Player,
      key: 'id'
    }
  },
  paymentDate: {
    type: DataTypes.DATEONLY,  // Utilise une seule colonne pour la date
    allowNull: true,           // Null si non payé
  },
  referenceMonth: {  
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,       // Faux si non payé
  },
});

Player.hasMany(Payment, { foreignKey: 'playerId' });
Payment.belongsTo(Player, { foreignKey: 'playerId' });

module.exports = Payment;
