
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
// const User = require('../models/User');

// // Inscription pour le Super Admin
// exports.registerAdmin = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password, permissions } = req.body;

//   try {
//     let user = await User.findOne({ where: { email } });

//     if (user) {
//       return res.status(400).json({ msg: 'Utilisateur déjà existant' });
//     }

//     const permissionsArray = permissions || [
//       'tableauBord',
//       'gestionJoueurs',
//       'suiviPerformance',
//       'verificationEcolage',
//       'calendrier',
//       'gestionUtilisateurs',
//     ];

//     user = new User({
//       email,
//       password,
//       accountType: 'Super Admin',
//       permissions: JSON.stringify(permissionsArray),
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//         accountType: user.accountType,
//         permissions: permissionsArray,
//       },
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: 360000,
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Erreur du serveur');
//   }
// };

// // Connexion
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(400).json({ msg: 'Utilisateur non trouvé' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Mot de passe incorrect' });
//     }

//     const permissionsArray = JSON.parse(user.permissions || '[]');

//     const payload = {
//       user: {
//         id: user.id,
//         accountType: user.accountType,
//         permissions: permissionsArray,
//       },
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: 360000,
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Erreur du serveur');
//   }
// };



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Inscription pour le Super Admin
exports.registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, permissions } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }

    const permissionsArray = permissions || [
      'tableauBord',
      'gestionJoueurs',
      'suiviPerformance',
      'verificationEcolage',
      'calendrier',
      'gestionUtilisateurs',
    ];

    user = new User({
      email,
      password,  // Ne pas hacher le mot de passe
      accountType: 'Super Admin',
      permissions: JSON.stringify(permissionsArray),
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        accountType: user.accountType,
        permissions: permissionsArray,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: 'Utilisateur non trouvé' });
    }

    // Comparaison des mots de passe - Pas de hachage, simple comparaison
    if (password !== password) {
      return res.status(400).json({ msg: 'Mot de passe incorrect' });
    }

    const permissionsArray = JSON.parse(user.permissions || '[]');
    const payload = {
      user: {
        id: user.id,
        accountType: user.accountType,
        permissions: permissionsArray,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.json({ token });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err.message);
    res.status(500).send('Erreur du serveur');
  }
};
