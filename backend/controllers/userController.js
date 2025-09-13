

const User = require('../models/User'); // Import du modèle User
const bcrypt = require('bcryptjs');

// Liste des permissions valides
const VALID_PERMISSIONS = [
  'tableauBord',
  'gestionJoueurs',
  'suiviPerformance',
  'verificationEcolage',
  'calendrier',
  'gestionUtilisateurs',
];

// Fonction de validation des permissions
const validatePermissions = (permissions) => {
  if (!permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => VALID_PERMISSIONS.includes(permission));
};

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  try {
    const { name, email, password, accountType, status, permissions } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    // Valider les permissions
    if (!validatePermissions(permissions)) {
      return res.status(400).json({ message: 'Permissions invalides' });
    }

    // Hashing du mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un utilisateur dans la base de données
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accountType,
      status,
      permissions: JSON.stringify(permissions), // Convertir les permissions en chaîne JSON
    });

    res.status(201).json({ 
      message: 'Utilisateur créé avec succès', 
      user: { ...user.toJSON(), permissions } // Retourner les permissions au format tableau
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};

// Obtenir tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs depuis la base de données
    const users = await User.findAll();

    // Traiter les utilisateurs pour parser les permissions en JSON
    const formattedUsers = users.map(user => ({
      ...user.toJSON(), // Convertir l'utilisateur en un objet JSON brut
      permissions: JSON.parse(user.permissions || '[]'), // Parse les permissions stockées
    }));

    // Envoyer la liste des utilisateurs formatés au frontend
    res.status(200).json(formattedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Mettre à jour un utilisateur
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password, accountType, status, permissions } = req.body;

//     console.log('Données reçues dans la requête:', req.body);

//     // Récupérer l'utilisateur par ID
//     const user = await User.findByPk(id);
//     if (!user) {
//       console.log(`Utilisateur avec l'ID ${id} non trouvé.`);
//       return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }
//     console.log('Utilisateur trouvé:', user);

//     // Valider les permissions si elles sont présentes
//     if (permissions && !validatePermissions(permissions)) {
//       console.log('Permissions invalides fournies:', permissions);
//       return res.status(400).json({ message: 'Permissions invalides' });
//     }

//     // Mise à jour des champs, sauf le mot de passe s'il n'est pas modifié
//     console.log('Mise à jour des champs pour l\'utilisateur.');
//     user.name = name || user.name; // Mettre à jour le nom si fourni
//     user.email = email || user.email; // Mettre à jour l'email si fourni

//     // Hasher le mot de passe uniquement si un nouveau mot de passe est fourni
//     if (password && password.trim() !== '') {
//       // Vérifiez si le mot de passe est brut (non haché) avant de le hacher
//       const isHashed = password.startsWith('$2a$10$'); // Vérifie si c'est un hash bcrypt
//       if (!isHashed) {
//         console.log('Hachage nécessaire pour le nouveau mot de passe.');
//         user.password = await bcrypt.hash(password, 10);
//         console.log('Nouveau mot de passe haché:', user.password);
//       } else {
//         console.log('Le mot de passe est déjà haché. Aucun changement nécessaire.');
//       }
//     }
    

//     user.accountType = accountType || user.accountType; // Mettre à jour le type de compte si fourni
//     user.status = status || user.status; // Mettre à jour le statut si fourni
//     user.permissions = permissions ? JSON.stringify(permissions) : user.permissions; // Mettre à jour les permissions si fournies

//     console.log('Données utilisateur avant sauvegarde:', {
//       name: user.name,
//       email: user.email,
//       accountType: user.accountType,
//       status: user.status,
//       permissions: user.permissions,
//     });

//     // Sauvegarder les modifications
//     console.log('Données utilisateur avant sauvegarde:', {
//       name: user.name,
//       email: user.email,
//       accountType: user.accountType,
//       status: user.status,
//       permissions: user.permissions,
//   });
  
//   await user.save();
  
//   console.log('Mise à jour exécutée avec succès pour l\'utilisateur:', user);
  

//     // Répondre avec l'utilisateur mis à jour et des permissions parsées
//     res.status(200).json({ 
//       message: 'Utilisateur mis à jour avec succès', 
//       user: { ...user.toJSON(), permissions: JSON.parse(user.permissions || '[]') } 
//     });
//   } catch (err) {
//     console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
//     res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, accountType, status, permissions } = req.body;

    // Récupérer l'utilisateur par ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Valider les permissions si elles sont présentes
    if (permissions && !validatePermissions(permissions)) {
      return res.status(400).json({ message: 'Permissions invalides' });
    }

    // Mise à jour des champs, sauf le mot de passe s'il n'est pas modifié
    user.name = name || user.name; // Mettre à jour le nom si fourni
    user.email = email || user.email; // Mettre à jour l'email si fourni
    user.accountType = accountType || user.accountType; // Mettre à jour le type de compte si fourni
    user.status = status || user.status; // Mettre à jour le statut si fourni
    user.permissions = permissions ? JSON.stringify(permissions) : user.permissions; // Mettre à jour les permissions si fournies

    // **Ne pas hacher le mot de passe, le stocker en clair**
    if (password && password.trim() !== '') {
      console.log('Le mot de passe brut a été reçu pour mise à jour.');
      user.password = password; // Stoker le mot de passe brut sans hachage
    }

    // Sauvegarder les modifications
    await user.save();

    // Répondre avec l'utilisateur mis à jour et des permissions parsées
    res.status(200).json({ 
      message: 'Utilisateur mis à jour avec succès', 
      user: { ...user.toJSON(), permissions: JSON.parse(user.permissions || '[]') } 
    });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};


// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password, accountType, status, permissions } = req.body;

//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }

//     // Valider les permissions si elles sont présentes
//     if (permissions && !validatePermissions(permissions)) {
//       return res.status(400).json({ message: 'Permissions invalides' });
//     }

//     // Mettre à jour les champs
//     user.name = name || user.name;
//     user.email = email || user.email;

//     // Hasher le mot de passe si un nouveau mot de passe est fourni
//     if (password) {
//       user.password = await bcrypt.hash(password, 10);
//     }

//     user.accountType = accountType || user.accountType;
//     user.status = status || user.status;
//     user.permissions = permissions ? JSON.stringify(permissions) : user.permissions;

//     await user.save();

//     res.status(200).json({ 
//       message: 'Utilisateur mis à jour avec succès', 
//       user: { ...user.toJSON(), permissions: JSON.parse(user.permissions || '[]') } 
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
//   }
// };



// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };

