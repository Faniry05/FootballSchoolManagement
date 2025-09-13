const jwt = require('jsonwebtoken');
const User = require('../models/User');

const permissionMiddleware = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const token = req.header('x-auth-token');
      if (!token) {
        return res.status(401).json({ msg: 'Accès refusé, pas de token' });
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).json({ msg: 'Token invalide ou expiré' });
      }

      const userId = decoded.user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ msg: 'Utilisateur non trouvé' });
      }

      if (user.accountType === 'Super Admin') {
        return next(); // Super Admins ont un accès complet
      }

      const permissions = JSON.parse(user.permissions || '[]');

      // Vérifier si toutes les permissions requises sont présentes
      const hasPermission = requiredPermissions.every(permission => 
        permissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ msg: 'Accès interdit, permissions insuffisantes' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Erreur du serveur' });
    }
  };
};


module.exports = permissionMiddleware;
