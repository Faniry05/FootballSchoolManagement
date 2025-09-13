const Player = require('../models/Player');
const { err, ok, Result } = require('neverthrow');

// Fonction pour calculer l'âge à partir de la date de naissance
const calculateAge = (birthDate) => {
  const today = new Date();
  const birthYear = new Date(birthDate).getFullYear();
  return today.getFullYear() - birthYear;
};

// Créer un joueur
exports.createPlayer = async (req, res) => {
  try {
    // Récupérer le chemin de l'image stockée
    const imagePath = req.file ? req.file.path : null; // Utiliser le chemin de l'image téléchargée

    const { nomComplet, dateNaissance, adresse, numTel, taille, status, categories, dateIntegration } = req.body;

    // Validation des champs requis
    if (!imagePath || !nomComplet || !dateNaissance || !numTel || !taille || !status || !categories || !dateIntegration) {
      return res.status(400).json(err(new Error('Tous les champs sont obligatoires.')));
    }

    const age = calculateAge(dateNaissance);

    const player = await Player.create({
      image: imagePath, // Enregistrer le chemin de l'image
      nomComplet,
      dateNaissance,
      age,
      adresse,
      numTel,
      taille,
      status,
      categories,
      dateIntegration
    });

    return res.status(201).json(ok(player));
  } catch (error) {
    console.error('Erreur lors de la création du joueur:', error);
    return res.status(500).json(err(new Error('Erreur lors de la création du joueur.')));
  }
};

// Read all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    return res.status(200).json(ok(players));
  } catch (error) {
    return res.status(500).json(err(new Error('Erreur lors de la récupération des joueurs.')));
  }
};


// Lire un seul joueur par ID
exports.getPlayerById = async (req, res) => {
  try {
    console.log("ID du joueur reçu :", req.params.id); // Log de débogage pour vérifier l'ID reçu
    const player = await Player.findByPk(req.params.id);

    if (!player) {
      console.warn("Aucun joueur trouvé avec l'ID :", req.params.id); // Message si aucun joueur n'est trouvé
      return res.status(404).json(err(new Error('Joueur non trouvé.')));
    }

    // Remplacez les barres inverses par des barres obliques dans le chemin de l'image
    if (player.image) {
      player.image = player.image.replace(/\\/g, '/');
    }

    return res.status(200).json(ok(player));
  } catch (error) {
    console.error("Erreur lors de la récupération du joueur :", error); // Log d'erreur en cas de problème
    return res.status(500).json(err(new Error('Erreur lors de la récupération du joueur.')));
  }
};



//Mise à jour joueur

exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json(err(new Error('Joueur non trouvé.')));
    }

    const { nomComplet, dateNaissance, adresse, numTel, taille, status, categories, dateIntegration } = req.body;

    // Vérifiez si une nouvelle image a été uploadée
    const imagePath = req.file ? `uploads/${req.file.filename}` : player.image; // Utiliser le chemin de la nouvelle image ou conserver l'ancienne

    // Recalculer l'âge si la date de naissance est modifiée
    if (dateNaissance) {
      player.age = calculateAge(dateNaissance);
      player.dateNaissance = dateNaissance;
    }

    // Mettre à jour les autres champs
    player.image = imagePath; // Mettre à jour l'image
    player.nomComplet = nomComplet || player.nomComplet;
    player.adresse = adresse || player.adresse;
    player.numTel = numTel || player.numTel;
    player.taille = taille || player.taille;
    player.status = status || player.status;
    player.categories = categories || player.categories;
    player.dateIntegration = dateIntegration || player.dateIntegration;

    await player.save();

    return res.status(200).json(ok(player));
  } catch (error) {
    return res.status(500).json(err(new Error('Erreur lors de la mise à jour du joueur.')));
  }
};



// Delete a player
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json(err(new Error('Joueur non trouvé.')));
    }

    await player.destroy();
    return res.status(200).json(ok('Joueur supprimé avec succès.'));
  } catch (error) {
    return res.status(500).json(err(new Error('Erreur lors de la suppression du joueur.')));
  }
};
