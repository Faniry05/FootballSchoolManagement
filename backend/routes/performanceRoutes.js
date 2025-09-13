// backend/routes/performanceRoutes.js
const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

// Créer une performance
router.post('/', performanceController.createPerformance);

// Récupérer toutes les performances
router.get('/', performanceController.getPerformances);

// Mettre à jour une performance
router.put('/:id', performanceController.updatePerformance);

// Supprimer une performance
router.delete('/:id', performanceController.deletePerformance);

module.exports = router;
