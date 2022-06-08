DROP DATABASE IF EXISTS `restaurant`;
CREATE DATABASE `restaurant`;
USE `restaurant`;

CREATE TABLE `users`(
 `user_id`int(11) NOT NULL,
 `name`varchar(255) NOT NULL,
 `address`varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES (1,"David","mexico","davidsv20@icloud.com");
INSERT INTO `users` VALUES (2,"Karen","usa","karen@icloud.com");
INSERT INTO `users` VALUES (3,"Steph","france","steph@icloud.com");
INSERT INTO `users` VALUES (4,"Peter","jamaica","peter@gmail.com");
INSERT INTO `users` VALUES (5,"Whitney","spain","withney@gmail.com");

SELECT * FROM users
where address = "spain";

SELECT * FROM users WHERE `email` like "%icloud%";

UPDATE `users` SET `email` = "karen20@icloud.com" WHERE `users`.`name`= "Karen"; 

ALTER TABLE users
 MODIFY name text NOT NULL;

DELETE FROM `users` WHERE `users`.`name` = 'David';