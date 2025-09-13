const Payment = require('../models/Payment');
const Player = require('../models/Player');
const { Op } = require('sequelize');

// Récupérer tous les paiements avec les joueurs et pagination
exports.getPayments = async (req, res) => {
  const { startDate, endDate, category, status, search, limit, offset } = req.query;
  const whereClause = {};

  if (startDate && endDate) {
      whereClause.referenceMonth = { [Op.between]: [new Date(startDate), new Date(endDate)] };
  }
  if (category && category !== 'Toutes') {
      whereClause['$Player.categories$'] = category;
  }
  if (status && status !== 'tous') {
      whereClause.status = status === 'paid' ? true : false;
  }

  try {
      const payments = await Payment.findAndCountAll({
          where: whereClause,
          include: [{ model: Player, attributes: ['nomComplet', 'categories'], required: false }],
          limit: parseInt(limit, 10) || 10,
          offset: parseInt(offset, 10) || 0,
      });

      const formattedPayments = payments.rows.map(payment => ({
          id: payment.id,
          playerId: payment.playerId, // Ajoutez ceci
          nomComplet: payment.Player.nomComplet,
          categories: payment.Player.categories,
          paymentDate: payment.paymentDate,
          referenceMonth: payment.referenceMonth,
          status: payment.status ? 'Payé' : 'Non payé',
      }));

      res.status(200).json({ success: true, data: formattedPayments, total: payments.count });
  } catch (error) {
      console.error("Erreur lors de la récupération des paiements :", error);
      res.status(500).json({ success: false, message: 'Erreur lors de la récupération des paiements' });
  }
};


exports.createPayment = async (req, res) => {
  const { playerId, paymentDate, referenceMonth } = req.body;

  const startOfMonth = new Date(referenceMonth);
  startOfMonth.setDate(1);
  const endOfMonth = new Date(referenceMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);

  try {
    const existingPayment = await Payment.findOne({
      where: {
        playerId,
        referenceMonth: { [Op.between]: [startOfMonth, endOfMonth] }  // Vérification sur le mois de référence
      }
    });

    if (existingPayment) {
      return res.status(400).json({ message: "Un paiement a déjà été enregistré pour ce mois." });
    }

    const newPayment = await Payment.create({
      playerId,
      paymentDate,  // Date actuelle du paiement
      referenceMonth: startOfMonth,  // Mois de référence pour le paiement rétroactif
      status: true,  // Marquer comme payé
    });

    res.status(201).json({ message: "Paiement enregistré avec succès", data: newPayment });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du paiement :", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement du paiement", error });
  }
};


exports.getPlayersWithPaymentStatus = async (req, res) => {
  const { startDate, endDate, category, status, search } = req.query;
  const playerWhereClause = {};
  const paymentWhereClause = {};

  // Filtrage par catégorie
  if (category && category !== 'Toutes') {
    playerWhereClause.categories = category;
  }

  // Filtrage par recherche de nom
  if (search) {
    playerWhereClause.nomComplet = { [Op.like]: `%${search}%` };
  }

  // Filtrage par plage de dates
  if (startDate && endDate) {
    paymentWhereClause.referenceMonth = { [Op.between]: [new Date(startDate), new Date(endDate)] };
  }

  // Filtrage par statut de paiement
  if (status && status !== 'tous') {
    paymentWhereClause.status = status === 'paid';
  }

  try {
    const players = await Player.findAll({
      where: playerWhereClause,
      attributes: ['id', 'nomComplet', 'categories'],
    });

    const payments = await Payment.findAll({
      where: paymentWhereClause,
      attributes: ['playerId', 'paymentDate', 'status', 'referenceMonth'],
    });

    // Associer les paiements aux joueurs
    const playersWithStatus = players.map(player => {
      const playerPayment = payments.find(payment => payment.playerId === player.id);
      return {
        id: player.id,
        nomComplet: player.nomComplet,
        categories: player.categories,
        referenceMonth: playerPayment ? playerPayment.referenceMonth : null,
        paymentDate: playerPayment ? playerPayment.paymentDate : null,
        paymentStatus: playerPayment ? 'Payé' : 'Non payé',
      };
    });

    res.status(200).json({ success: true, data: playersWithStatus });
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs avec statut de paiement :", error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des joueurs' });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status, paymentDate } = req.body;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Paiement non trouvé' });
    }
    
    payment.status = status;
    payment.paymentDate = status ? paymentDate : null;
    await payment.save();

    await Player.update({ status: status ? 'Payé' : 'Non payé' }, { where: { id: payment.playerId } });

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du paiement:", error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du paiement' });
  }
};
