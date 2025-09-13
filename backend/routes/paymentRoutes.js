
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route pour créer un paiement
router.post('/', paymentController.createPayment);

// Route pour mettre à jour le statut d'un paiement
router.put('/:id', paymentController.updatePaymentStatus);

// Route pour récupérer les joueurs avec leurs statuts de paiement
router.get('/payments-status', paymentController.getPlayersWithPaymentStatus);

// Ajoute cette route pour récupérer tous les paiements
router.get('/', paymentController.getPayments);




module.exports = router;

