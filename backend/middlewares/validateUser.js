const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('name').optional().isString().withMessage('Le nom doit être une chaîne de caractères.'),
  check('email').optional().isEmail().withMessage('Veuillez fournir un email valide.'),
  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit comporter au moins 6 caractères.'),
  check('accountType')
    .optional()
    .isIn(['Super Admin', 'Entraineurs', 'Responsable financier'])
    .withMessage("Le type de compte n'est pas valide."),
  check('status')
    .optional()
    .isIn(['Actif', 'Inactif'])
    .withMessage("Le statut doit être 'Actif' ou 'Inactif'."),
  check('permissions')
    .optional()
    .isArray()
    .withMessage('Les permissions doivent être un tableau.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
