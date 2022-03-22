# SistemadeGesti-ndeTareas

-- Base de datos SQL 
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tasks
CREATE DATABASE IF NOT EXISTS `tasks` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `tasks`;

-- Volcando estructura para tabla tasks.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla tasks.status: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`id`, `name`, `created`, `updated`) VALUES
	(1, 'No completado', '2022-03-21 21:39:22', '2022-03-21 21:39:22'),
	(2, 'Completado', '2022-03-21 21:39:45', '2022-03-21 21:39:45');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;

-- Volcando estructura para tabla tasks.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `delivery_date` date NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `Tasks_FK_1` (`user_id`),
  KEY `Tasks_FK_2` (`status`),
  CONSTRAINT `Tasks_FK_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Tasks_FK_2` FOREIGN KEY (`status`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla tasks.tasks: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `delivery_date`, `created`, `updated`, `user_id`) VALUES
	(7, 'TestPut', 'Descp TestPUT', 1, '2022-03-25', '2022-03-21 21:43:28', '2022-03-21 21:43:44', 1),
	(11, 'Clases', 'Segunda Tarea ', 1, '0000-00-00', '2022-03-21 22:41:18', '2022-03-21 22:41:18', 2),
	(13, 'Barrer', 'Barrer la casa ', 1, '0000-00-00', '2022-03-21 23:09:00', '2022-03-21 23:09:00', 1),
	(14, 'Saltar', 'Saltar la cuerda', 1, '2022-03-24', '2022-03-21 23:09:47', '2022-03-21 23:09:47', 2),
	(15, 'Test', 'Descp Test', 1, '2022-03-23', '2022-03-21 23:18:57', '2022-03-21 23:18:57', 2);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;

-- Volcando estructura para tabla tasks.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `api_key` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_key` (`api_key`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla tasks.user: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user_name`, `api_key`, `created`, `updated`) VALUES
	(1, 'David', 'FSFSFSFX', '2022-03-21 21:41:54', '2022-03-21 21:41:54'),
	(2, 'Diego', 'FSFAFXGD', '2022-03-21 22:40:47', '2022-03-21 22:40:47');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
