// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'SuperAdmin',
//   },
// });

// module.exports = User;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountType: {
    type: DataTypes.ENUM('Super Admin', 'Entraineurs', 'Responsable financier'),
    allowNull: false,
    defaultValue: 'Super Admin',
  },
  status: {
    type: DataTypes.ENUM('Actif', 'Inactif'),
    allowNull: false,
    defaultValue: 'Actif',
  },
  permissions: {
    type: DataTypes.STRING, // Utilisation d'une chaîne de caractères pour stocker les permissions séparées par des virgules
    allowNull: true,
    defaultValue: '[]',  // Chaîne vide par défaut
  },
}, {
  timestamps: true, // Ajoute createdAt et updatedAt
  tableName: 'users',
});

module.exports = User;
