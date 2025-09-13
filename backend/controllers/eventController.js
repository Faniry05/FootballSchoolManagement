const Event = require('../models/Event');

// Ajouter un nouvel événement
exports.createEvent = async (req, res) => {
  try {
    const { title, eventDate, eventTime } = req.body;
    const newEvent = await Event.create({ title, eventDate, eventTime });
    res.status(201).json({
      message: 'Événement créé avec succès',
      event: newEvent,
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error.message);
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
};

// Récupérer tous les événements
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
};

// Supprimer un événement par ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Event.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Événement supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Événement non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
  }
};
