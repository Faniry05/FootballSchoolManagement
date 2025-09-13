const express = require('express');
const { check } = require('express-validator');
const { registerAdmin, login } = require('../controllers/authController');
const router = express.Router();

// Route pour inscrire le SuperAdmin
router.post(
  '/register',
  [
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('password', 'Le mot de passe doit comporter 8 caractères minimum').isLength({ min: 8 }),
  ],
  registerAdmin
);

// Route pour la connexion
router.post(
  '/login',
  [
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('password', 'Mot de passe requis').exists(),
  ],
  login
);

module.exports = router;
