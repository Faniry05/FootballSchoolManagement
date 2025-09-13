-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 07 déc. 2024 à 05:23
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `football_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `eventDate` date NOT NULL,
  `eventTime` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `eventDate`, `eventTime`, `createdAt`, `updatedAt`) VALUES
(59, 'Réunion des parents à 04:00', '2024-11-01', '04:00:00', '2024-10-31 12:38:29', '2024-10-31 12:38:29'),
(75, 'Réunion des parents à 15:00', '2024-11-05', '15:00:00', '2024-11-04 05:39:17', '2024-11-04 05:39:17'),
(78, 'aazert à 02:00', '2024-11-12', '02:00:00', '2024-11-04 07:57:24', '2024-11-04 07:57:24'),
(84, 'Entraînement à 04:00', '2024-11-14', '04:00:00', '2024-11-04 09:02:10', '2024-11-04 09:02:10'),
(85, 'Réunion des parents à 18:00', '2024-11-20', '18:00:00', '2024-11-04 13:19:12', '2024-11-04 13:19:12'),
(90, 'Match à 04:00', '2024-11-04', '04:00:00', '2024-11-11 06:29:06', '2024-11-11 06:29:06'),
(92, 'Entraînement à 02:00', '2024-12-02', '02:00:00', '2024-11-11 17:24:40', '2024-11-11 17:24:40'),
(93, 'Entraînement à 01:00', '2024-11-15', '01:00:00', '2024-11-12 06:19:39', '2024-11-12 06:19:39'),
(96, 'Réunion des parents à 16:30', '2024-11-27', '16:30:00', '2024-11-13 08:30:03', '2024-11-13 08:30:03'),
(98, 'Match à 05:00', '2024-11-05', '05:00:00', '2024-11-27 08:57:54', '2024-11-27 08:57:54'),
(99, 'Entraînement à 02:00', '2024-11-07', '02:00:00', '2024-11-27 08:59:28', '2024-11-27 08:59:28'),
(100, 'Match à 15:00', '2024-12-10', '15:00:00', '2024-12-05 19:08:01', '2024-12-05 19:08:01'),
(101, 'Entraînement à 14:00', '2024-12-12', '14:00:00', '2024-12-05 19:08:11', '2024-12-05 19:08:11'),
(102, 'Réunion des parents à 14:00', '2024-12-17', '14:00:00', '2024-12-05 20:28:04', '2024-12-05 20:28:04'),
(103, 'Réunion des parents à 03:00', '2024-12-18', '03:00:00', '2024-12-06 17:03:44', '2024-12-06 17:03:44'),
(104, 'Match à 04:00', '2024-12-19', '04:00:00', '2024-12-06 17:03:55', '2024-12-06 17:03:55');

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `paymentDate` date DEFAULT NULL,
  `referenceMonth` date NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`id`, `playerId`, `paymentDate`, `referenceMonth`, `status`, `createdAt`, `updatedAt`) VALUES
(69, 22, '2024-10-31', '2024-10-01', 1, '2024-10-31 06:10:01', '2024-10-31 06:10:01'),
(70, 22, '2024-10-31', '2024-01-01', 1, '2024-10-31 06:10:08', '2024-10-31 06:10:08'),
(71, 23, '2024-10-31', '2024-01-01', 1, '2024-10-31 06:18:02', '2024-10-31 06:18:02'),
(72, 23, '2024-10-31', '2024-02-01', 1, '2024-10-31 06:18:13', '2024-10-31 06:18:13'),
(73, 25, '2024-10-31', '2024-10-01', 1, '2024-10-31 06:18:25', '2024-10-31 06:18:25'),
(74, 22, '2024-10-31', '2024-11-01', 1, '2024-10-31 06:18:43', '2024-10-31 06:18:43'),
(75, 22, '2024-10-31', '2024-12-01', 1, '2024-10-31 12:49:44', '2024-10-31 12:49:44'),
(76, 27, '2024-11-04', '2024-11-01', 1, '2024-11-05 05:07:53', '2024-11-05 05:07:53'),
(77, 22, '2024-11-06', '2024-02-01', 1, '2024-11-06 05:49:54', '2024-11-06 05:49:54'),
(78, 22, '2024-11-12', '2025-01-01', 1, '2024-11-12 06:37:24', '2024-11-12 06:37:24'),
(79, 25, '2024-11-13', '2024-01-01', 1, '2024-11-13 04:40:54', '2024-11-13 04:40:54'),
(80, 25, '2024-11-19', '2024-11-01', 1, '2024-11-19 11:10:32', '2024-11-19 11:10:32'),
(81, 23, '2024-11-19', '2024-12-01', 1, '2024-11-19 11:46:55', '2024-11-19 11:46:55'),
(82, 22, '2024-11-25', '2024-03-01', 1, '2024-11-25 04:58:19', '2024-11-25 04:58:19'),
(83, 22, '2024-11-25', '2025-02-01', 1, '2024-11-25 04:59:43', '2024-11-25 04:59:43'),
(84, 23, '2024-11-25', '2025-01-01', 1, '2024-11-25 05:01:33', '2024-11-25 05:01:33'),
(85, 23, '2024-11-27', '2024-11-01', 1, '2024-11-27 05:11:18', '2024-11-27 05:11:18'),
(86, 26, '2024-12-05', '2024-12-01', 1, '2024-12-05 19:09:42', '2024-12-05 19:09:42');

-- --------------------------------------------------------

--
-- Structure de la table `performances`
--

CREATE TABLE `performances` (
  `id` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `assiduite` int(11) NOT NULL,
  `participation` int(11) NOT NULL,
  `attitude` int(11) NOT NULL,
  `competences_techniques` int(11) NOT NULL,
  `competences_tactiques` int(11) NOT NULL,
  `condition_physique` int(11) NOT NULL,
  `esprit_equipe` int(11) NOT NULL,
  `matchDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `performances`
--

INSERT INTO `performances` (`id`, `playerId`, `assiduite`, `participation`, `attitude`, `competences_techniques`, `competences_tactiques`, `condition_physique`, `esprit_equipe`, `matchDate`, `createdAt`, `updatedAt`) VALUES
(3, 22, 5, 5, 6, 3, 3, 7, 8, '2024-11-04', '2024-11-11 08:18:56', '2024-11-11 08:18:56'),
(9, 22, 9, 7, 9, 6, 7, 6, 4, '2024-10-19', '2024-11-11 14:50:24', '2024-11-11 14:50:38');

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `nomComplet` varchar(255) NOT NULL,
  `dateNaissance` date NOT NULL,
  `age` int(11) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `numTel` varchar(255) NOT NULL,
  `taille` varchar(255) NOT NULL,
  `status` enum('Nouveau joueur','Ancien joueur') NOT NULL,
  `categories` varchar(255) NOT NULL,
  `dateIntegration` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `players`
--

INSERT INTO `players` (`id`, `image`, `nomComplet`, `dateNaissance`, `age`, `adresse`, `numTel`, `taille`, `status`, `categories`, `dateIntegration`, `createdAt`, `updatedAt`) VALUES
(22, 'uploads/1728566860836.jpg', 'THIAGO Alcantara', '2011-07-15', 13, 'Anjoma', '034111111', '167', 'Nouveau joueur', 'U13', '2024-10-09', '2024-10-10 05:52:03', '2024-11-20 13:08:52'),
(23, 'uploads\\1728540385137.png', 'Randriamanantena Faniry', '2003-10-09', 21, 'Anjoma', '034 11 111 11', '171', 'Ancien joueur', 'Senior', '2024-10-09', '2024-10-10 06:06:25', '2024-10-24 12:22:29'),
(25, 'uploads/1728970585278.png', 'JOSHUA Kimmich', '2015-08-28', 9, 'Allemagne', '034 00 00 000', '179', 'Nouveau joueur', 'U9', '2024-10-09', '2024-10-10 13:36:50', '2024-10-15 05:56:01'),
(26, 'uploads/1728971706132.png', 'Robert Lewandowski', '2018-08-17', 6, 'Tanambao', '032 22 222 22', '166', 'Nouveau joueur', 'U7', '2024-10-14', '2024-10-15 05:24:57', '2024-10-15 05:56:48'),
(27, 'uploads\\1728970237818.png', 'XAVI Simons', '2010-10-14', 14, 'Morarano', '034 55 555 55', '164', 'Nouveau joueur', 'U15', '2024-10-14', '2024-10-15 05:30:37', '2024-10-15 05:30:37'),
(30, 'uploads\\1729327545913.png', 'Manuel Neuer', '2002-10-18', 22, 'Andranomadio', '034 xx xxx xx', '188', 'Nouveau joueur', 'Senior', '2024-10-18', '2024-10-19 08:45:45', '2024-10-19 08:45:45'),
(43, 'uploads\\1731398730487.png', 'Rabe PAULL', '2024-11-11', 0, 'azert', 'aaa', 'aa', 'Ancien joueur', 'U9', '2024-11-24', '2024-11-12 08:05:30', '2024-11-27 08:41:10'),
(46, 'uploads\\1732697176941.png', 'Teste', '2001-02-11', 23, 'Lot 15 12', '2522', '175', 'Ancien joueur', 'Senior', '2024-11-26', '2024-11-27 08:46:16', '2024-11-27 08:46:16');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accountType` enum('Super Admin','Entraineurs','Responsable financier') NOT NULL DEFAULT 'Super Admin',
  `status` enum('Actif','Inactif') NOT NULL DEFAULT 'Actif',
  `permissions` varchar(255) DEFAULT '[]',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `accountType`, `status`, `permissions`, `createdAt`, `updatedAt`) VALUES
(28, 'admin', 'admin@admin.com', 'admin123', 'Super Admin', 'Actif', '[\"tableauBord\",\"gestionJoueurs\",\"suiviPerformance\",\"verificationEcolage\",\"calendrier\",\"gestionUtilisateurs\"]', '2024-11-26 14:07:02', '2024-11-26 14:35:13'),
(31, 'coach12', 'coach@coach.com', '$2a$10$O8CP0PpOAhnyL1AR.iUmjuxk8vB6j8zV9U7LbQLoAkgpNvFZQm85i', 'Entraineurs', 'Actif', '[\"tableauBord\"]', '2024-11-26 14:49:00', '2024-11-26 14:52:23'),
(32, 'Rabe', 'resp@resp.com', '$2a$10$Ncx6gmPtdajSYMvnGQ6dDuPpyjtwIe9LH948num7uf/XMKaF.K2FK', 'Responsable financier', 'Actif', '[\"tableauBord\",\"verificationEcolage\",\"calendrier\"]', '2024-11-26 14:54:49', '2024-11-26 14:58:43');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playerId` (`playerId`);

--
-- Index pour la table `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playerId` (`playerId`);

--
-- Index pour la table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT pour la table `performances`
--
ALTER TABLE `performances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`playerId`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `performances`
--
ALTER TABLE `performances`
  ADD CONSTRAINT `performances_ibfk_1` FOREIGN KEY (`playerId`) REFERENCES `players` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
