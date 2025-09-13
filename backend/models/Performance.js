// backend/models/Performance.js
const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Connexion à la base de données

const Performance = db.define('Performance', {
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Players', // Nom de la table de joueurs
      key: 'id',
    },
  },
  assiduite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  participation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  attitude: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  competences_techniques: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  competences_tactiques: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  condition_physique: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  esprit_equipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  matchDate: {
    type: DataTypes.DATEONLY, // Type date pour stocker la date du match
    allowNull: true, // Rendre la date facultative si tu ne veux pas que chaque performance en ait une
  },
}, {
  timestamps: true,
});

module.exports = Performance;
