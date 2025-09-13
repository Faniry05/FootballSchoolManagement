
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const path = require('path'); // Importation de path

dotenv.config();

const app = express();


// Importation des routes
const playerRoutes = require('./routes/playerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 


// Middleware pour vérifier les permissions
const checkPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    
    if (!req.user || !req.user.permissions) {
      return res.status(403).json({ message: 'Accès refusé, permissions insuffisantes' });
    }

    const userPermissions = JSON.parse(req.user.permissions);

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Accès refusé, permissions insuffisantes' });
    }

    next(); // L'utilisateur a les permissions, on passe à la suite
  };
};


// Liste des origines autorisées
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.88.253:3000'
];

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Gérer les requêtes OPTIONS (Preflight)
app.options('*', cors());

// Configuration de fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Utilisation de path

// Middleware pour analyser les données JSON
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Utilisation des routes
app.use('/api/players', playerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth',authRoutes);
app.use('/api', userRoutes);

// Synchronisation des modèles avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Tous les modèles sont synchronisés avec succès.');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation des modèles', err);
  });

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est exécuté sur le port ${PORT}`);
});