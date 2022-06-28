# ************************************************************
# Sequel Ace SQL dump
# Version 20033
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 8.0.29)
# Database: Delilah
# Generation Time: 2022-06-28 15:46:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Dishes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Dishes`;

CREATE TABLE `Dishes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Dishes` WRITE;
/*!40000 ALTER TABLE `Dishes` DISABLE KEYS */;

INSERT INTO `Dishes` (`id`, `Description`, `Image`, `Price`)
VALUES
	(1,'Burger','https://www.pexels.com/es-es/foto/hamburguesa-de-jamon-con-verduras-1639557/',5),
	(2,'Hot dog','https://www.pexels.com/es-es/foto/sandwich-de-hotdog-en-papel-cuadriculado-blanco-y-rojo-3162040/',3),
	(3,'Pizza','https://www.pexels.com/es-es/foto/primer-plano-de-pizza-315755/',10),
	(4,'Tacos','https://images.pexels.com/photos/5454019/pexels-photo-5454019.jpeg?cs=srgb&dl=pexels-jeswin-thomas-5454019.jpg&fm=jpg',20);

/*!40000 ALTER TABLE `Dishes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `Status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Date` datetime NOT NULL,
  `Dish_id` int NOT NULL,
  `User_id` int unsigned NOT NULL,
  `Payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;

INSERT INTO `Orders` (`ID`, `Status`, `Date`, `Dish_id`, `User_id`, `Payment`)
VALUES
	(1,'finished','2022-06-17 00:00:00',0,1,'Cash'),
	(2,'Delivering','2022-06-17 00:00:00',0,1,'Cash'),
	(4,'New','2022-06-17 14:07:11',0,1,'Credit'),
	(5,'New','2022-06-17 14:22:08',0,15,'Card'),
	(6,'New','2022-06-17 14:32:09',0,15,'Debit Card'),
	(7,'New','2022-06-21 12:50:30',0,16,'Cash'),
	(8,'New','2022-06-22 13:49:28',3,16,'Paypal'),
	(9,'New','2022-06-22 13:50:12',1,16,'Apple Pay'),
	(10,'New','2022-06-22 13:51:42',3,15,'Apple Pay'),
	(11,'New','2022-06-22 13:51:52',2,15,'Apple Pay'),
	(12,'New','2022-06-22 16:10:45',2,16,'Apple Pay'),
	(13,'New','2022-06-22 16:11:23',2,16,'Apple Pay'),
	(14,'New','2022-06-22 16:16:55',3,16,'Pay Pal'),
	(15,'New','2022-06-22 16:17:19',1,16,'Pay Pal'),
	(16,'New','2022-06-22 16:21:04',1,15,'Master Card'),
	(17,'New','2022-06-22 16:45:01',3,15,'Cash'),
	(18,'New','2022-06-23 20:17:42',1,15,'Cash'),
	(19,'New','2022-06-23 20:17:42',3,15,'Cash'),
	(20,'New','2022-06-27 11:56:52',4,16,'Cash'),
	(21,'New','2022-06-27 11:58:38',4,16,'Cash'),
	(22,'New','2022-06-27 12:00:35',4,16,'Cash'),
	(23,'New','2022-06-27 12:12:03',1,16,'Cash'),
	(24,'New','2022-06-27 12:12:03',3,16,'Cash'),
	(25,'New','2022-06-27 12:12:17',3,16,'Cash'),
	(26,'New','2022-06-27 12:12:17',1,16,'Cash'),
	(27,'New','2022-06-27 12:12:21',3,16,'Cash'),
	(28,'New','2022-06-27 12:12:21',1,16,'Cash'),
	(29,'New','2022-06-27 12:12:40',3,16,'Cash'),
	(30,'New','2022-06-27 12:12:40',1,16,'Cash'),
	(31,'New','2022-06-27 12:13:38',4,16,'Cash'),
	(32,'New','2022-06-27 12:13:38',3,16,'Cash'),
	(33,'New','2022-06-27 12:17:24',4,16,'Cash'),
	(34,'New','2022-06-27 12:18:16',3,16,'Cash'),
	(35,'New','2022-06-27 12:19:22',3,16,'Cash'),
	(36,'New','2022-06-27 12:19:52',3,16,'Cash'),
	(37,'New','2022-06-27 12:23:07',3,16,'Cash'),
	(38,'New','2022-06-27 12:59:21',3,11,'Cash'),
	(39,'New','2022-06-27 12:59:21',4,11,'Cash'),
	(40,'New','2022-06-27 13:02:08',1,11,'Cash'),
	(41,'New','2022-06-27 13:12:55',4,11,'Cash'),
	(42,'New','2022-06-27 13:12:55',3,11,'Cash'),
	(43,'New','2022-06-27 13:13:06',3,11,'Cash'),
	(44,'New','2022-06-27 13:24:00',3,11,'Cash'),
	(45,'New','2022-06-27 13:24:41',3,11,'Cash'),
	(46,'New','2022-06-27 13:25:06',1,11,'Cash'),
	(47,'New','2022-06-27 13:25:31',1,11,'Cash'),
	(48,'New','2022-06-27 13:25:32',1,11,'Cash'),
	(49,'New','2022-06-27 13:26:11',1,11,'Cash'),
	(50,'New','2022-06-27 13:28:10',1,11,'Cash'),
	(51,'New','2022-06-27 13:28:46',1,11,'Cash'),
	(52,'New','2022-06-27 13:32:49',3,11,'Cash'),
	(53,'New','2022-06-27 13:32:59',4,11,'Cash');

/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Orders_dishes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Orders_dishes`;

CREATE TABLE `Orders_dishes` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `Order_id` int DEFAULT NULL,
  `Dish_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `test` (`Order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Orders_dishes` WRITE;
/*!40000 ALTER TABLE `Orders_dishes` DISABLE KEYS */;

INSERT INTO `Orders_dishes` (`ID`, `Order_id`, `Dish_id`)
VALUES
	(2,16,1),
	(3,10,3),
	(4,10,3),
	(5,16,1),
	(6,8,3),
	(7,9,1),
	(8,8,3),
	(9,9,1),
	(10,8,3),
	(11,9,1),
	(12,8,3),
	(13,9,1),
	(14,20,4),
	(15,8,3),
	(16,38,3),
	(17,39,4),
	(18,40,1),
	(19,39,4),
	(20,38,3),
	(21,38,3),
	(22,38,3),
	(23,38,3),
	(24,40,1),
	(25,40,1),
	(26,40,1),
	(27,40,1),
	(28,40,1),
	(29,40,1),
	(30,38,3),
	(31,39,4);

/*!40000 ALTER TABLE `Orders_dishes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Direction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `Name`, `Email`, `Password`, `Direction`, `Admin`)
VALUES
	(4,'Amber Heard','amber@youtube.com','amberlovesjhony','Walk of fame 89',1),
	(6,'Amber Heard','amber@youtube.com','amberlovesjhony','Walk of fame 89',1),
	(7,'Amber Heard','amber@youtube.com','amberlovesjhony','Walk of fame 89',1),
	(8,'Amber Heard','amber@youtube.com','amberlovesjhony','Walk of fame 89',1),
	(9,'Amber Heard','amber@youtube.com','amberlovesjhony','Walk of fame 89',1),
	(10,'Amber Heard','amber@youtube.com','amberlovesjhony','Walk of fame 89',1),
	(11,'Brittany','brittany@departments.com','brit','High Way of Monaco 12',0),
	(15,'Whitney Brown','whitney@englishlive.com','whitneyteacher12','Walk of fame 102',1),
	(16,'Nicole Lepariz','nicole@musician.com','nicole1029','Monaco, Italy',0);

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
