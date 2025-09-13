const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('Player', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   nomComplet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateNaissance: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true, // Sera calculé automatiquement
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numTel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taille: {
    type: DataTypes.STRING,
    allowNull: false,   
  },
  status: {
    type: DataTypes.ENUM('Nouveau joueur', 'Ancien joueur'),
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateIntegration: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Calcul automatique de l'âge en fonction de la date de naissance
Player.beforeCreate((player) => {
  player.age = new Date().getFullYear() - new Date(player.dateNaissance).getFullYear();
});

module.exports = Player;
