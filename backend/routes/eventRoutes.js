// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes pour les événements
router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;

// routes/eventRoutes.js

// const express = require('express');
// const router = express.Router();
// const eventController = require('../controllers/eventController');
// const permissionMiddleware = require('../middlewares/permissionMiddleware');

// // Routes pour les événementsmaint
// router.post(
//   '/', 
//   permissionMiddleware('create_event'), // Permission requise pour créer un événement
//   eventController.createEvent
// );

// router.get(
//   '/', 
//   permissionMiddleware('view_events'), // Permission requise pour voir les événements
//   eventController.getAllEvents
// );

// router.delete(
//   '/:id', 
//   permissionMiddleware('delete_event'), // Permission requise pour supprimer un événement
//   eventController.deleteEvent
// );

// module.exports = router;
