// // backend/controllers/performanceController.js
// const Performance = require('../models/Performance');

// // Créer une nouvelle évaluation de performance pour un joueur
// exports.createPerformance = async (req, res) => {
//   const { playerId, assiduite, participation, attitude, competences_techniques, competences_tactiques, condition_physique, esprit_equipe } = req.body;
  
//   try {
//     const newPerformance = await Performance.create({
//       playerId,
//       assiduite,
//       participation,
//       attitude,
//       competences_techniques,
//       competences_tactiques,
//       condition_physique,
//       esprit_equipe
//     });
//     res.status(201).json(newPerformance);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la création de la performance' });
//   }
// };

// // Récupérer toutes les performances
// exports.getPerformances = async (req, res) => {
//   try {
//     const performances = await Performance.findAll();
//     res.status(200).json(performances);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la récupération des performances' });
//   }
// };

// // Mettre à jour une performance
// exports.updatePerformance = async (req, res) => {
//   const { id } = req.params;
//   const { assiduite, participation, attitude, competences_techniques, competences_tactiques, condition_physique, esprit_equipe } = req.body;

//   try {
//     const performance = await Performance.findByPk(id);
//     if (!performance) {
//       return res.status(404).json({ error: 'Performance non trouvée' });
//     }

//     performance.assiduite = assiduite;
//     performance.participation = participation;
//     performance.attitude = attitude;
//     performance.competences_techniques = competences_techniques;
//     performance.competences_tactiques = competences_tactiques;
//     performance.condition_physique = condition_physique;
//     performance.esprit_equipe = esprit_equipe;

//     await performance.save();
//     res.status(200).json(performance);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la mise à jour de la performance' });
//   }
// };

// // Supprimer une performance
// exports.deletePerformance = async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const performance = await Performance.findByPk(id);
//     if (!performance) {
//       return res.status(404).json({ error: 'Performance non trouvée' });
//     }

//     await performance.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la suppression de la performance' });
//   }
// };


// backend/controllers/performanceController.js

const Performance = require('../models/Performance');

// Créer une nouvelle évaluation de performance pour un joueur
exports.createPerformance = async (req, res) => {
  const { playerId, assiduite, participation, attitude, competences_techniques, competences_tactiques, condition_physique, esprit_equipe, matchDate } = req.body;

  // Vérifier que playerId est bien fourni
  if (!playerId) {
    return res.status(400).json({ error: 'playerId est requis' });
  }

  try {
    const newPerformance = await Performance.create({
      playerId,
      assiduite,
      participation,
      attitude,
      competences_techniques,
      competences_tactiques,
      condition_physique,
      esprit_equipe,
      matchDate, // Ajouter la date du match
    });

    res.status(201).json(newPerformance);
  } catch (error) {
    console.error("Erreur lors de la création de la performance :", error);
    res.status(500).json({ error: 'Erreur lors de la création de la performance' });
  }
};

// Récupérer toutes les performances d'un joueur spécifique
exports.getPerformances = async (req, res) => {
  const { playerId } = req.query; // Récupérer l'ID du joueur depuis les paramètres de la requête

  try {
    // Vérifier que l'ID du joueur est fourni
    if (!playerId) {
      return res.status(400).json({ error: 'playerId est requis' });
    }

    // Récupérer les performances uniquement pour le joueur avec l'ID fourni
    const performances = await Performance.findAll({
      where: { playerId: playerId }, // Filtrer par playerId
    });

    res.status(200).json(performances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des performances' });
  }
};

// Mettre à jour une performance
exports.updatePerformance = async (req, res) => {
  const { id } = req.params;
  const { assiduite, participation, attitude, competences_techniques, competences_tactiques, condition_physique, esprit_equipe, matchDate } = req.body;

  try {
    const performance = await Performance.findByPk(id);
    if (!performance) {
      return res.status(404).json({ error: 'Performance non trouvée' });
    }

    performance.assiduite = assiduite;
    performance.participation = participation;
    performance.attitude = attitude;
    performance.competences_techniques = competences_techniques;
    performance.competences_tactiques = competences_tactiques;
    performance.condition_physique = condition_physique;
    performance.esprit_equipe = esprit_equipe;
    performance.matchDate = matchDate; // Mise à jour de la date du match

    await performance.save();
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la performance' });
  }
};

// Supprimer une performance
exports.deletePerformance = async (req, res) => {
  const { id } = req.params;

  try {
    const performance = await Performance.findByPk(id);
    if (!performance) {
      return res.status(404).json({ error: 'Performance non trouvée' });
    }

    await performance.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la performance' });
  }
};
