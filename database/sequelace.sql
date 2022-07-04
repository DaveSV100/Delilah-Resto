# ************************************************************
# Sequel Ace SQL dump
# Version 20033
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 8.0.29)
# Database: Delilah
# Generation Time: 2022-07-01 17:14:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE IF NOT EXISTS Delilah;

DROP TABLE IF EXISTS `Dishes`;

CREATE TABLE `Dishes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Price` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Dishes` WRITE;
/*!40000 ALTER TABLE `Dishes` DISABLE KEYS */;

INSERT INTO `Dishes` (`ID`, `Description`, `Image`, `Price`)
VALUES
	(1,'Tacos','https://taquitos.pexels.com/photos/5454019/pexels-photo-5454019.jpeg?cs=srgb&dl=pexels-jeswin-thomas-5454019.jpg&fm=jpg',12),
	(2,'Tostadas','https://guerrerotortillas.com/es/recetas/tostadas-de-picadillo/',20),
	(4,'Burger','https://burger.com/es/recetas/tostadas-de-picadillo/',30);

/*!40000 ALTER TABLE `Dishes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Date` datetime NOT NULL,
  `Dish_id` int NOT NULL,
  `User_id` int NOT NULL,
  `Payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK=>Orders.User.id-Users.ID` (`User_id`),
  CONSTRAINT `FK=>Orders.User.id-Users.ID` FOREIGN KEY (`User_id`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;

INSERT INTO `Orders` (`ID`, `Status`, `Date`, `Dish_id`, `User_id`, `Payment`)
VALUES
	(1,'Delivering','2022-07-01 11:22:33',1,1,'Cash'),
	(2,'New','2022-07-01 11:28:35',1,8,'Cash'),
	(3,'New','2022-07-01 11:28:35',2,8,'Cash'),
	(4,'New','2022-07-01 11:48:59',4,1,'Cash');

/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Orders_dishes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Orders_dishes`;

CREATE TABLE `Orders_dishes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Order_id` int DEFAULT NULL,
  `Dish_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK=>Orders_dishes.Order_id-Orders.ID` (`Order_id`),
  KEY `FK=>Orders_dishes.Dish_id-Dishes.ID` (`Dish_id`),
  CONSTRAINT `FK=>Orders_dishes.Dish_id-Dishes.ID` FOREIGN KEY (`Dish_id`) REFERENCES `Dishes` (`ID`),
  CONSTRAINT `FK=>Orders_dishes.Order_id-Orders.ID` FOREIGN KEY (`Order_id`) REFERENCES `Orders` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Orders_dishes` WRITE;
/*!40000 ALTER TABLE `Orders_dishes` DISABLE KEYS */;

INSERT INTO `Orders_dishes` (`ID`, `Order_id`, `Dish_id`)
VALUES
	(1,1,1),
	(2,2,1),
	(3,3,2),
	(5,4,4);

/*!40000 ALTER TABLE `Orders_dishes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Direction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`ID`, `Name`, `Email`, `Password`, `Direction`, `Admin`)
VALUES
	(1,'Nicole Lepariz','nicole@lepretty.com','nicole1029','Monaco 21, Italy',0),
	(2,'Brittany Brown','brit@departments.com','iambrit','Hills 12, Ventura California USA',1),
	(8,'Katy Heard','katy@gmail.com','heardkaty','Walk of fame 13, Mnahattan, NY USA',0);

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
