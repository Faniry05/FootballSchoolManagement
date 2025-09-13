const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

// Route pour récupérer tous les utilisateurs
router.get('/users', getUsers);

// Route pour créer un nouvel utilisateur
router.post('/users', createUser);

// Route pour mettre à jour un utilisateur
router.put('/users/:id', updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:id', deleteUser);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
// const { validateUser } = require('../middlewares/validateUser');

// // Route pour récupérer tous les utilisateurs
// router.get('/users', getUsers);

// // Route pour créer un nouvel utilisateur avec validation
// router.post('/users', validateUser, createUser);

// // Route pour mettre à jour un utilisateur avec validation
// router.put('/users/:id', validateUser, updateUser);

// // Route pour supprimer un utilisateur
// router.delete('/users/:id', deleteUser);

// module.exports = router;

