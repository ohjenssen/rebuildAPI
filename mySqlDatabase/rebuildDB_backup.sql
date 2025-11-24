-- MySQL dump 10.13  Distrib 9.5.0, for macos15 (arm64)
--
-- Host: localhost    Database: rebuildDB
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '97ad960e-c6b2-11f0-a2e6-25dcdec43cde:1-58';

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `cateID` int NOT NULL AUTO_INCREMENT,
  `cateName` varchar(20) DEFAULT NULL,
  `cateDesc` varchar(255) DEFAULT NULL,
  `cateImage` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cateID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sten','Sten til alt','image');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prodID` int NOT NULL AUTO_INCREMENT,
  `prodName` varchar(30) DEFAULT NULL,
  `prodDesc` varchar(255) DEFAULT NULL,
  `prodDateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `prodCategory` int NOT NULL,
  `prodAmount` int DEFAULT NULL,
  `prodUnitID` int DEFAULT NULL,
  `prodPrice` varchar(10) DEFAULT NULL,
  `prodGradeID` int DEFAULT NULL,
  `prodLocation` varchar(30) DEFAULT NULL,
  `prodUserID` int NOT NULL,
  PRIMARY KEY (`prodID`),
  KEY `fk_product_user` (`prodUserID`),
  KEY `fk_product_category` (`prodCategory`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`prodCategory`) REFERENCES `categories` (`cateID`),
  CONSTRAINT `fk_product_user` FOREIGN KEY (`prodUserID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Røde mursten','Dette er mursten','2025-11-22 14:57:02',1,450,1,'199',1,'Roskilde',1),(6,'Grus','Noget grus.','2025-11-23 15:05:51',1,50,NULL,'100',NULL,'Roskilde',2),(7,'Flat sten','Til inngravering eller noe.','2025-11-23 15:06:28',1,10,NULL,'50',NULL,'Norge',3),(8,'Steen','Vi sauna dig','2025-11-23 15:07:53',1,1,NULL,'50',NULL,'Undervisningslokalet',4),(11,'Paller','paler i tre','2025-11-24 08:41:14',1,20,NULL,'200',NULL,'Køge',1),(12,'Vindu','Vinduer til deg. OBS dobbeltsjekk at de ikke er knuste','2025-11-24 09:07:52',1,10,NULL,'500',NULL,'Sønderjylland',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(40) DEFAULT NULL,
  `userEmail` varchar(30) DEFAULT NULL,
  `userPhone` varchar(11) DEFAULT NULL,
  `userAddress` varchar(100) DEFAULT NULL,
  `userImage` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userEmail` (`userEmail`),
  UNIQUE KEY `userPhone` (`userPhone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mai','Mai@MAIl.com','282844','Roskilde','profile'),(2,'Alberte','albert@mail.com','44345678','Amager','/profile'),(3,'Sarah','sarah@mail.com','1234567','Vordingborg','/proile'),(4,'Oskar','oskar@mail.com','92486848','Gjøvik','/profile'),(5,'Steen','steen@sauna.com','9293848','Næstved','/proile');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 18:38:24
