
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire de destination pour les fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Générer un nom de fichier unique
  }
});

const upload = multer({ storage: storage });

// CRUD pour les joueurs
router.post('/', upload.single('image'), playerController.createPlayer); // Ajoutez upload.single pour le téléchargement d'images
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.put('/:id', upload.single('image'), playerController.updatePlayer); // Ajoutez upload.single pour la mise à jour d'images
router.delete('/:id', playerController.deletePlayer);


module.exports = router;  // Assurez-vous d'exporter le router
