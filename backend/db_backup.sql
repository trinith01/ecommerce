-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: c_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.2

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

--
-- Table structure for table `address`
--

drop database if exists c_commerce;
create database c_ecommerce;
use c_ecommerce;

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `line_1` varchar(255) NOT NULL,
  `line_2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `city` (`city`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`city`) REFERENCES `city` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'123 Main St',NULL,'Dallas','Dallas County','75001'),(2,'456 Elm St','Apt 2B','Arlington','Tarrant County','76010');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attribute`
--

DROP TABLE IF EXISTS `attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute` (
  `attribute_id` int NOT NULL AUTO_INCREMENT,
  `attribute_name` varchar(100) NOT NULL,
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute`
--

LOCK TABLES `attribute` WRITE;
/*!40000 ALTER TABLE `attribute` DISABLE KEYS */;
INSERT INTO `attribute` VALUES (1,'Color'),(2,'Storage Capacity'),(3,'Brand'),(4,'Operating System'),(5,'Battery Life'),(6,'Dimensions'),(7,'Age Group'),(8,'Material'),(9,'Screen Size'),(10,'Waterproof'),(11,'Processor');
/*!40000 ALTER TABLE `attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `Index_Customer_Id` (`customer_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'2024-10-27 15:44:32',NULL),(3,3,'2024-10-27 15:44:32',NULL),(8,4,'2024-10-28 19:12:35',NULL),(9,5,'2024-10-28 19:32:18',NULL),(10,8,'2024-10-29 19:21:59',NULL),(11,9,'2024-10-29 21:27:11',NULL),(12,10,'2024-10-29 21:39:12',NULL),(13,2,'2024-10-29 21:48:32',NULL),(14,11,'2024-10-29 21:53:11',NULL),(15,13,'2024-10-29 21:56:04',NULL),(16,14,'2024-10-29 22:01:17',NULL),(17,15,'2024-10-29 22:04:35',NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_id` int NOT NULL,
  `variant_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_id`,`variant_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1,1),(1,5,2),(3,6,1),(8,6,5),(9,2,3),(9,3,1),(9,5,1),(10,5,1),(11,1007,5),(12,1007,3),(13,1,3),(14,5,4),(15,5,1),(16,5,1),(17,1007,1);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `cart_product_details`
--

DROP TABLE IF EXISTS `cart_product_details`;
/*!50001 DROP VIEW IF EXISTS `cart_product_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cart_product_details` AS SELECT
 1 AS `cart_id`,
 1 AS `variant_id`,
 1 AS `product_id`,
 1 AS `email`,
 1 AS `color`,
 1 AS `quantity`,
 1 AS `product_name`,
 1 AS `new_price`,
 1 AS `old_price`,
 1 AS `description`,
 1 AS `image`,
 1 AS `category`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cart_with_email`
--

DROP TABLE IF EXISTS `cart_with_email`;
/*!50001 DROP VIEW IF EXISTS `cart_with_email`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cart_with_email` AS SELECT
 1 AS `cart_id`,
 1 AS `customer_id`,
 1 AS `created_at`,
 1 AS `total_price`,
 1 AS `customer_email`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!50001 DROP VIEW IF EXISTS `categories`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `categories` AS SELECT
 1 AS `id`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `categories_with_name_and_id`
--

DROP TABLE IF EXISTS `categories_with_name_and_id`;
/*!50001 DROP VIEW IF EXISTS `categories_with_name_and_id`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `categories_with_name_and_id` AS SELECT
 1 AS `product_id`,
 1 AS `product_name`,
 1 AS `default_variant_id`,
 1 AS `category_name`,
 1 AS `price`,
 1 AS `discount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Consumer Electronics',NULL),(2,'Toys',NULL),(3,'Fashion',NULL),(4,'Home Appliance',NULL),(5,'Books',NULL),(7,'Laptops',1),(8,'Tablets',1),(9,'Smart Watches',1),(10,'Headphones',1),(11,'Gaming Consoles',1),(12,'Digital Cameras',1),(13,'Men\'s Clothing',3),(14,'Women\'s Clothing',3),(15,'Kids\' Clothing',3),(16,'Footwear',3),(17,'Accessories',3),(18,'Jewelry',3),(19,'Bags & Wallets',3),(20,'Sportswear',3),(21,'Ethnic Wear',3),(22,'Lingerie & Sleepwear',3),(23,'Winter Wear',3),(24,'Designer Brands',3),(25,'Refrigerators',4),(26,'Washing Machines',4),(27,'Air Conditioners',4),(28,'Microwave Ovens',4),(29,'Dishwashers',4),(30,'Water Heaters',4),(31,'Vacuum Cleaners',4),(32,'Kitchen Appliances',4),(33,'Air Purifiers',4),(34,'Food Processors',4),(35,'Electric Fans',4),(36,'Chimneys & Cooktops',4),(37,'Fiction',5),(38,'Non-Fiction',5),(39,'Academic & Educational',5),(40,'Children\'s Books',5),(41,'Comics & Manga',5),(42,'Self-Help',5),(43,'Business & Economics',5),(44,'Technology & Science',5),(45,'Biography & Memoirs',5),(46,'History',5),(47,'Literature & Poetry',5),(48,'Religious & Spiritual',5),(49,'Mobile Phones',1),(50,'Speakers',1),(51,'Educational Toys',2),(52,'Action Figures & Collectibles',2),(53,'Dolls & Accessories',2),(54,'Building & Construction Toys',2),(55,'Electronic & Robotic Toys',2),(56,'Vehicles & Playsets',2),(57,'Role-Playing Toys',2),(58,'Outdoor & Sports Toys',2),(59,'Musical & Sensory Toys',2),(60,'Board Games & Puzzles',2);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_name` varchar(100) NOT NULL,
  `is_main_city` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`city_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES ('Arlington',0),('Austin',1),('Dallas',1),('El Paso',0),('Fort Worth',0),('Houston',1),('San Antonio',1);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_errors`
--

DROP TABLE IF EXISTS `custom_errors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_errors` (
  `error_state` varchar(20) NOT NULL,
  `error_category` varchar(20) DEFAULT NULL,
  `error_message` text,
  PRIMARY KEY (`error_state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_errors`
--

LOCK TABLES `custom_errors` WRITE;
/*!40000 ALTER TABLE `custom_errors` DISABLE KEYS */;
INSERT INTO `custom_errors` VALUES ('45001','INV','Warehouse not found'),('45002','INV','Insufficient stock'),('45003','INV','Variant entry not found'),('45004','INV','Quantity must be a positive integer.'),('45005','INV','No items in cart'),('45006','INV','Stock information not found for variant ID ');
/*!40000 ALTER TABLE `custom_errors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `password_hash` varchar(255) DEFAULT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone_number` varchar(20) DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `is_guest` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_email` (`customer_email`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'hashed_password_1','John Doe','john.doe@example.com','555-1234',1,0),(2,'hashed_password_2','Jane Smith','jane.smith@example.com','555-5678',2,0),(3,NULL,'Guest User','guest.user@example.com',NULL,NULL,1),(4,'$2b$10$3fSPpAOxyhneMMA/hQEapupSz2KZKZA4t/m9jEHhfjtK9Xg3G4XXu','yutharsan','1@gmail.com','1',NULL,0),(5,'$2b$10$q5tWgNkGD2eJ4kZL9P22AeHXyCNkZy67NDSTKg2Ye16rtEwtGwbMW','1','1@email.com','123',NULL,0),(6,'$2b$10$zcKrof4VeNKNeFmz5DHd1uHM5xn1Zw1a.6DNUyo1nY7TOtFKpW.s.','2gy33','123@gmail.com','29u21u89121',NULL,0),(8,'$2b$10$TfleOYMjUUODonEdL0w8O.nlcNdb3o8J9YITGnCIIC42E9mjo.sDy','123','127@gmail.com','07621261267762',NULL,0),(9,NULL,'whwc','129@gmail.com',NULL,NULL,1),(10,NULL,'dddsd','12977@gmail.com',NULL,NULL,1),(11,NULL,'VSGDHS','166161@gmail.com',NULL,NULL,1),(12,NULL,'dhd','23@gmail.com',NULL,NULL,1),(13,NULL,'dhd','2377@gmail.com',NULL,NULL,1),(14,NULL,'kkdwkd','123672624@gmail.com',NULL,NULL,1),(15,NULL,'bhjqb','1663631767@gmail.com',NULL,NULL,1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `discount` decimal(5,2) NOT NULL,
  PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,10.00),(2,5.00),(3,15.00),(4,20.00);
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!50001 DROP VIEW IF EXISTS `order_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `order_details` AS SELECT
 1 AS `order_id`,
 1 AS `user_id`,
 1 AS `address_id`,
 1 AS `payment_id`,
 1 AS `order_date`,
 1 AS `delivery_estimate`,
 1 AS `delivery_method`,
 1 AS `contact_email`,
 1 AS `contact_phone`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_id` int NOT NULL,
  `variant_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`order_id`,`variant_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1),(1,5,2),(2,3,1),(3,6,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `update_variant_stock` AFTER INSERT ON `order_items` FOR EACH ROW BEGIN
    UPDATE variant_warehouse
    SET stock_count = stock_count - NEW.quantity
    WHERE variant_id = NEW.variant_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `address_id` int DEFAULT NULL,
  `payment_id` int NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `delivery_estimate` datetime DEFAULT NULL,
  `delivery_method` enum('Store Pickup','Delivery') NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `address_id` (`address_id`),
  KEY `payment_id` (`payment_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,'2024-10-27 15:44:33','2024-11-01 15:44:33','Delivery','john.doe@example.com','555-1234'),(2,2,2,2,'2024-10-27 15:44:33','2024-11-03 15:44:33','Delivery','jane.smith@example.com','555-5678'),(3,3,NULL,3,'2024-10-27 15:44:33','2024-11-01 15:44:33','Store Pickup','guest.user@example.com',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `adjust_inventory_on_order_delete` BEFORE DELETE ON `orders` FOR EACH ROW BEGIN
    UPDATE variant_warehouse vw
    JOIN order_items oi ON vw.variant_id = oi.variant_id
    SET vw.quantity = vw.quantity + oi.quantity
    WHERE oi.order_id = OLD.order_id;

    DELETE FROM order_items WHERE order_id = OLD.order_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `parent_categories`
--

DROP TABLE IF EXISTS `parent_categories`;
/*!50001 DROP VIEW IF EXISTS `parent_categories`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `parent_categories` AS SELECT
 1 AS `id`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `payment_method` enum('Cash on Delivery','Card') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'Card',1399.97,'2024-10-27 15:44:33'),(2,'Cash on Delivery',1099.99,'2024-10-27 15:44:33'),(3,'Card',89.99,'2024-10-27 15:44:33');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `before_payment_insert` BEFORE INSERT ON `payment` FOR EACH ROW BEGIN
    IF NEW.amount <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Payment amount must be greater than zero';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `description` text,
  `default_variant_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `index_product_product_name` (`product_name`)
) ENGINE=InnoDB AUTO_INCREMENT=356 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'iPhone X','Apple smartphone with advanced features',NULL),(2,'Bose SoundLink Speaker','Portable Bluetooth speaker with high-quality sound',NULL),(3,'LEGO Star Wars Set','Building set for Star Wars enthusiasts',NULL),(4,'iPhone 15 Pro Max','Latest Apple flagship smartphone with A17 chip',1001),(5,'Samsung Galaxy S24 Ultra','Premium Android smartphone with advanced AI features',1004),(6,'Nothing Phone 2','Unique design with transparent back panel',1007),(7,'Sony Xperia 1 V','Professional-grade camera smartphone',1009),(8,'ASUS ROG Phone 8','Gaming-focused smartphone with cooling system',1011),(9,'Motorola Edge 40 Pro','Premium smartphone with clean Android experience',1012),(10,'Vivo X100 Pro','Camera-focused flagship with Zeiss optics',1013),(11,'MacBook Pro 16','Professional laptop with M3 Max chip',1014),(12,'Dell XPS 15','Premium Windows laptop with OLED display',1017),(13,'Lenovo ThinkPad X1 Carbon','Business laptop with excellent keyboard',1019),(14,'ASUS ROG Zephyrus G14','Compact gaming laptop with high performance',1021),(15,'HP Spectre x360','Convertible laptop with premium design',1022),(16,'Razer Blade 18','High-end gaming laptop with RTX 4090',1023),(17,'Acer Swift Edge','Ultra-lightweight laptop with OLED screen',NULL),(18,'Microsoft Surface Laptop 6','Premium Windows laptop with great build',NULL),(19,'MSI Creator Z17','Content creation focused laptop',NULL),(20,'Framework Laptop','Modular and repairable laptop design',NULL),(51,'Bose SoundLink Revolve+','Portable Bluetooth speaker with 360-degree sound',NULL),(52,'JBL PartyBox 310','Powerful speaker with light effects and deep bass',NULL),(53,'Sony SRS-XB43','Extra Bass wireless speaker with water resistance',NULL),(54,'Sonos Move','Smart speaker with Wi-Fi and Bluetooth',NULL),(55,'Marshall Stanmore II','Vintage design with rich sound quality',NULL),(56,'Ultimate Ears Boom 3','Waterproof speaker with 15-hour battery life',NULL),(57,'Anker Soundcore Flare 2','Affordable speaker with RGB lighting',NULL),(58,'Klipsch The One II','Classic design with modern sound',NULL),(59,'Harman Kardon Onyx Studio 6','Elegant design with superior sound',NULL),(60,'Bang & Olufsen Beolit 20','Premium portable speaker with long battery life',NULL),(61,'iPad Pro 12.9','High-performance tablet with M2 chip',NULL),(62,'Samsung Galaxy Tab S9','Android tablet with AMOLED display',NULL),(63,'Microsoft Surface Pro 9','Versatile 2-in-1 tablet for work and play',NULL),(64,'Amazon Fire HD 10','Affordable tablet with Alexa integration',NULL),(65,'Lenovo Tab P12 Pro','Android tablet with stylus support',NULL),(66,'Xiaomi Pad 6','Affordable and powerful tablet',NULL),(67,'ASUS ROG Flow Z13','Gaming tablet with detachable keyboard',NULL),(68,'Huawei MatePad Pro','Premium tablet with multi-screen collaboration',NULL),(69,'Realme Pad X','Budget-friendly tablet with large display',NULL),(70,'Nokia T20','Simple tablet with long-lasting battery',NULL),(71,'Apple Watch Series 9','Smartwatch with fitness and health tracking',1024),(72,'Samsung Galaxy Watch6','Android smartwatch with customizable features',1027),(73,'Garmin Forerunner 965','GPS running watch with advanced metrics',1029),(74,'Fitbit Versa 4','Health and fitness tracker with sleep monitoring',1030),(75,'Amazfit GTR 4','Affordable smartwatch with AMOLED display',1031),(76,'Huawei Watch GT 3 Pro','Premium smartwatch with long battery life',NULL),(77,'Withings ScanWatch','Hybrid smartwatch with ECG and health tracking',NULL),(78,'TicWatch Pro 3','Dual display smartwatch with Wear OS',NULL),(79,'Fossil Gen 6','Stylish smartwatch with customizable watch faces',NULL),(80,'Polar Grit X Pro','Rugged outdoor watch with GPS tracking',NULL),(81,'Sony WH-1000XM5','Noise-canceling over-ear headphones',1032),(82,'Apple AirPods Max','Premium over-ear headphones with spatial audio',1034),(83,'Bose QuietComfort 45','Renowned noise-canceling headphones',1036),(84,'Sennheiser HD 560S','Open-back headphones for audiophiles',1038),(85,'Jabra Elite 85t','True wireless earbuds with ANC',1039),(86,'Beats Studio Buds','Compact wireless earbuds with good sound',1040),(87,'AKG N700NC M2','Comfortable noise-canceling headphones',NULL),(88,'Anker Soundcore Liberty 3 Pro','Affordable earbuds with impressive sound',NULL),(89,'Shure AONIC 50','Studio-quality sound in a wireless design',NULL),(90,'Bowers & Wilkins PX7','Luxury headphones with high-fidelity sound',NULL),(91,'PlayStation 5','Next-gen console with exclusive games',1041),(92,'Xbox Series X','Powerful console with Game Pass integration',1043),(93,'Nintendo Switch OLED','Portable console with vibrant display',1044),(94,'Steam Deck','Portable gaming PC with Steam integration',1046),(95,'Xbox Series S','Affordable digital-only gaming console',1048),(96,'Nintendo Switch Lite','Compact and lightweight gaming console',1049),(97,'Sony PlayStation VR2','VR headset for immersive gaming',1050),(98,'Logitech G Cloud Gaming Handheld','Portable cloud gaming console',NULL),(99,'Analogue Pocket','Handheld console for retro games',NULL),(100,'Atari VCS','Retro-inspired console with modern features',NULL),(101,'Canon EOS R5','Professional mirrorless camera with 8K video',NULL),(102,'Nikon Z7 II','High-resolution mirrorless camera',NULL),(103,'Sony Alpha 7 IV','Versatile camera with high image quality',NULL),(104,'Fujifilm X-T5','Stylish camera with film simulation modes',NULL),(105,'Panasonic Lumix GH6','Hybrid camera for photo and video',NULL),(106,'Leica Q2','Luxury compact camera with full-frame sensor',NULL),(107,'Olympus OM-D E-M1 Mark III','Micro Four Thirds camera for fast shooting',NULL),(108,'GoPro Hero 12','Action camera for outdoor adventures',NULL),(109,'DJI Pocket 2','Portable camera with built-in stabilizer',NULL),(110,'Ricoh GR IIIx','Compact camera with fixed lens and large sensor',NULL),(111,'Classic White Shirt','Formal white cotton shirt',NULL),(112,'Slim Fit Jeans','Denim jeans with a modern slim fit',NULL),(113,'Bomber Jacket','Trendy jacket for casual wear',NULL),(114,'Cargo Shorts','Comfortable cargo shorts with multiple pockets',NULL),(115,'V-Neck Sweater','Classic sweater for layering',NULL),(116,'Floral Summer Dress','Lightweight dress with floral print',NULL),(117,'High-Waist Jeans','Stylish high-waisted jeans',NULL),(118,'Blazer Coat','Elegant coat for formal occasions',NULL),(119,'Crop Top','Trendy crop top for casual outings',NULL),(120,'Midi Skirt','Flared skirt with comfortable fit',NULL),(121,'Graphic T-Shirt','Cotton T-shirt with fun print',NULL),(122,'Kids Denim Shorts','Comfortable shorts for playtime',NULL),(123,'Winter Jacket','Warm jacket for winter season',NULL),(124,'School Uniform Set','Standard school uniform set',NULL),(125,'Pajama Set','Soft pajamas with cartoon characters',NULL),(126,'Running Shoes','Lightweight shoes for daily exercise',NULL),(127,'Leather Boots','Classic boots for casual outings',NULL),(128,'Formal Shoes','Elegant shoes for formal occasions',NULL),(129,'Flip-Flops','Comfortable casual flip-flops',NULL),(130,'Sandals','Open-toe sandals for summer wear',NULL),(131,'Leather Belt','Classic leather belt with metal buckle',NULL),(132,'Sunglasses','Stylish sunglasses with UV protection',NULL),(133,'Baseball Cap','Casual cap with adjustable strap',NULL),(134,'Scarf','Warm scarf for winter days',NULL),(135,'Watch','Stylish analog wristwatch',NULL),(136,'Gold Necklace','Elegant 18k gold necklace',NULL),(137,'Silver Bracelet','Sterling silver bracelet with charm',NULL),(138,'Diamond Ring','Beautiful diamond ring for engagements',NULL),(139,'Pearl Earrings','Classic pearl earrings for formal events',NULL),(140,'Anklet','Fashionable anklet with beads',NULL),(141,'Leather Wallet','Premium leather wallet with multiple compartments',NULL),(142,'Backpack','Durable backpack with large capacity',NULL),(143,'Crossbody Bag','Trendy crossbody bag for essentials',NULL),(144,'Tote Bag','Spacious tote bag for everyday use',NULL),(145,'Clutch','Stylish clutch for evening occasions',NULL),(146,'Track Pants','Comfortable track pants for workouts',NULL),(147,'Sports Bra','Supportive sports bra for active wear',NULL),(148,'Running Shorts','Lightweight shorts for runners',NULL),(149,'Gym T-Shirt','Breathable T-shirt for gym use',NULL),(150,'Yoga Pants','Stretchable pants ideal for yoga',NULL),(151,'Saree','Traditional Indian saree with intricate design',NULL),(152,'Kurta Pajama','Comfortable kurta pajama set for men',NULL),(153,'Salwar Kameez','Stylish salwar kameez for women',NULL),(154,'Sherwani','Embroidered sherwani for weddings',NULL),(155,'Dupatta','Beautiful dupatta to pair with ethnic wear',NULL),(156,'Silk Nightgown','Comfortable nightgown in silk fabric',NULL),(157,'Lace Bra','Stylish lace bra with comfort fit',NULL),(158,'Pajama Set','Soft cotton pajama set',NULL),(159,'Sleep Mask','Comfortable sleep mask for better sleep',NULL),(160,'Boxers','Breathable cotton boxers for men',NULL),(161,'Puffer Jacket','Warm jacket with insulated filling',NULL),(162,'Woolen Sweater','Classic wool sweater for winter',NULL),(163,'Thermal Leggings','Comfortable thermal leggings',NULL),(164,'Winter Scarf','Soft scarf for extra warmth',NULL),(165,'Beanie','Stylish beanie for cold weather',NULL),(166,'Gucci Handbag','Luxury handbag with signature design',NULL),(167,'Prada Sunglasses','High-end sunglasses with iconic style',NULL),(168,'Armani Suit','Elegant suit by Armani',NULL),(169,'Louis Vuitton Belt','Premium belt with LV branding',NULL),(170,'Burberry Trench Coat','Classic trench coat by Burberry',NULL),(171,'LG Smart Refrigerator','Energy-efficient fridge with smart features',NULL),(172,'Whirlpool Double Door','Spacious double door refrigerator',NULL),(173,'Samsung Side-by-Side','Premium side-by-side fridge with inverter technology',NULL),(174,'Haier Mini Fridge','Compact fridge ideal for small spaces',NULL),(175,'Bosch French Door','Luxurious French door refrigerator',NULL),(176,'Samsung Front Load','High-efficiency front load washing machine',NULL),(177,'LG Top Load','Top load washing machine with inverter motor',NULL),(178,'Bosch Fully Automatic','Reliable automatic washing machine',NULL),(179,'Whirlpool Semi Automatic','Affordable semi-automatic washing machine',NULL),(180,'IFB Front Load','Premium front load with multiple wash programs',NULL),(181,'Daikin Split AC','Energy-efficient split AC with inverter',NULL),(182,'LG Dual Inverter AC','Inverter AC with low power consumption',NULL),(183,'Voltas Window AC','Window AC with fast cooling',NULL),(184,'Blue Star Portable AC','Portable AC for quick setup',NULL),(185,'Carrier Tower AC','Tower AC with sleek design',NULL),(186,'Samsung Convection Microwave','Convection microwave with grill function',NULL),(187,'LG Solo Microwave','Simple and efficient solo microwave',NULL),(188,'Panasonic Inverter Microwave','Inverter microwave with quick heating',NULL),(189,'IFB Grill Microwave','Versatile microwave with grill feature',NULL),(190,'Bajaj OTG Oven','Oven toaster griller for baking',NULL),(201,'Calculus Made Easy','An introductory guide to calculus concepts',NULL),(202,'Physics Fundamentals','Comprehensive textbook on physics principles',NULL),(203,'Introduction to Psychology','Textbook covering basic psychology topics',NULL),(204,'Organic Chemistry Basics','Detailed book on organic chemistry fundamentals',NULL),(205,'Advanced Algebra','A guide to complex algebraic concepts and techniques',NULL),(206,'The Adventures of Timmy','Storybook for young readers',NULL),(207,'Fairy Tales of the World','A collection of fairy tales from different cultures',NULL),(208,'Learning ABCs','Educational book for early literacy',NULL),(209,'The Magic Castle','Fantasy story for children',NULL),(210,'Dinosaur Facts','Illustrated book with fun dinosaur facts',NULL),(211,'Superhero Chronicles','Comic series about a team of superheroes',NULL),(212,'Samurai Legends','Historical manga with samurai adventures',NULL),(213,'Alien Invasion','Sci-fi comic about an alien invasion',NULL),(214,'The Ninja Clan','Manga about the journey of a young ninja',NULL),(215,'The Masked Vigilante','A thrilling comic book about a mysterious hero',NULL),(216,'The Power of Positive Thinking','Guide to achieving a positive mindset',NULL),(217,'Time Management Mastery','Tips on managing time efficiently',NULL),(218,'Overcoming Anxiety','Strategies for managing anxiety effectively',NULL),(219,'Goal Setting for Success','Steps to setting and achieving goals',NULL),(220,'Financial Freedom','Advice on achieving financial independence',NULL),(221,'Principles of Economics','Basic guide to economics concepts',NULL),(222,'Marketing Essentials','Introduction to marketing strategies',NULL),(223,'Investment Basics','Guide to starting in the investment world',NULL),(224,'Corporate Finance','Exploring the fundamentals of corporate finance',NULL),(225,'Startup Success','Advice for launching and growing a startup',NULL),(226,'Artificial Intelligence 101','Introduction to AI and its applications',NULL),(227,'The Quantum World','Understanding the basics of quantum mechanics',NULL),(228,'Data Science for Beginners','Guide to getting started in data science',NULL),(229,'The Solar System','Comprehensive guide to our solar system',NULL),(230,'Blockchain Revolution','Exploring the potential of blockchain technology',NULL),(231,'Memoirs of a Scientist','Life journey of a renowned scientist',NULL),(232,'A Leader\'s Path','The story of an influential political leader',NULL),(233,'Entrepreneurial Dreams','The life of a successful entrepreneur',NULL),(234,'The Musician\'s Journey','Memoir of a world-famous musician',NULL),(235,'My Life in the Wild','The life story of a conservationist',NULL),(236,'World War II Chronicles','Detailed account of WWII events',NULL),(237,'Ancient Civilizations','Exploring the history of ancient civilizations',NULL),(238,'The Roman Empire','The rise and fall of the Roman Empire',NULL),(239,'The History of Medicine','Development of medical science through ages',NULL),(240,'The American Revolution','Insight into the American Revolutionary War',NULL),(241,'Collected Works of Shakespeare','Complete collection of Shakespeare\'s works',NULL),(242,'Romantic Poems','Anthology of romantic poetry from various authors',NULL),(243,'Modern Short Stories','Collection of contemporary short stories',NULL),(244,'Classic English Novels','Compilation of classic English literature',NULL),(245,'Epic Poems of Ancient Times','Collection of famous epic poems',NULL),(246,'The Bhagavad Gita','Sacred Hindu scripture with philosophical insights',NULL),(247,'The Holy Bible','The Christian Bible with Old and New Testaments',NULL),(248,'Teachings of the Buddha','Overview of Buddhist principles and teachings',NULL),(249,'The Quran','The holy book of Islam',NULL),(250,'Mindfulness and Spirituality','Guide to mindfulness and inner peace',NULL),(256,'Bosch Serie 2','Reliable dishwasher with eco mode',NULL),(257,'Siemens IQ300','Energy-efficient with multiple washing programs',NULL),(258,'Voltas Beko DF15A','Compact dishwasher for small kitchens',NULL),(259,'Kaff DW VETRA 60','Stylish dishwasher with quick wash feature',NULL),(260,'Elica WQP12-7605V','Affordable dishwasher with multiple cycles',NULL),(261,'Crompton Arno Neo','Water heater with powerful heating element',NULL),(262,'Venus Magma Plus','Durable design with corrosion-resistant tank',NULL),(263,'Bajaj New Shakti','Compact and safe water heater',NULL),(264,'Racold Eterno Pro','Energy-efficient with smart bath logic technology',NULL),(265,'Usha Misty Digital','Water heater with digital temperature display',NULL),(266,'Philips PowerPro FC9352/01','Bagless vacuum with powerful suction',NULL),(267,'Dyson V8 Absolute','Cordless stick vacuum with HEPA filter',NULL),(268,'Karcher WD 3','Multi-purpose vacuum with robust design',NULL),(269,'Eureka Forbes Trendy Zip','Compact vacuum with advanced filtration',NULL),(270,'Inalsa Spruce','Affordable vacuum with high efficiency',NULL),(271,'Preethi Zodiac Mixer Grinder','Multifunctional mixer with multiple jars',NULL),(272,'Morphy Richards Icon DLX','Mixer grinder with powerful motor',NULL),(273,'Philips Viva Collection Juicer','Juicer with quick-clean technology',NULL),(274,'Bajaj Majesty Rice Cooker','Electric cooker for easy rice preparation',NULL),(275,'Usha FP 3811 Food Processor','High-capacity food processor for various tasks',NULL),(276,'Mi Air Purifier 3C','HEPA filter with high clean air delivery rate',NULL),(277,'Sharp FP-J30M','Compact air purifier with plasmacluster technology',NULL),(278,'Blueair Blue Pure 211+','Powerful air purifier with carbon filter',NULL),(279,'Philips AC1215/20','Compact air purifier for small rooms',NULL),(280,'Coway Sleek Pro AP-1009','Powerful air purifier with high efficiency',NULL),(281,'Kenwood Multipro Compact','Compact food processor with multiple tools',NULL),(282,'Bajaj FX1000','Food processor with 3-speed control',NULL),(283,'Inalsa Inox 1000','Multipurpose processor with various attachments',NULL),(284,'Prestige PAF 3.0','Compact food processor with chopper',NULL),(285,'Wonderchef Nutri-Blend','Blender-grinder combo for quick blending',NULL),(286,'Orient Electric Tornado','High speed fan with strong air delivery',NULL),(287,'Usha Maxx Air','Pedestal fan with adjustable height',NULL),(288,'Bajaj Esteem Table Fan','Compact table fan with oscillation feature',NULL),(289,'Havells V3 Turbo','Wall fan with powerful motor',NULL),(290,'Crompton High Flo Wave Plus','Ceiling fan with aerodynamic design',NULL),(291,'Sunflame 60cm Chimney','Powerful chimney with high suction capacity',NULL),(292,'Glen 6062 Auto Clean','Auto clean chimney with touch control',NULL),(293,'Kutchina Xpedio','Chimney with filterless technology',NULL),(294,'Faber Glass Top Cooktop','Four-burner glass cooktop with safety features',NULL),(295,'Prestige Magic Glass Top','Two-burner gas stove with toughened glass',NULL),(296,'The Great Gatsby','Classic novel by F. Scott Fitzgerald',NULL),(297,'To Kill a Mockingbird','Pulitzer Prize-winning novel by Harper Lee',NULL),(298,'The Catcher in the Rye','Novel about teenage rebellion by J.D. Salinger',NULL),(299,'Brave New World','Dystopian science fiction by Aldous Huxley',NULL),(300,'The Hobbit','Fantasy adventure by J.R.R. Tolkien',NULL),(301,'The Immortal Life of Henrietta Lacks','Story of a woman’s immortal cells',NULL),(302,'The Wright Brothers','Biography of the Wright brothers by David McCullough',NULL),(303,'Thinking, Fast and Slow','Psychology book on decision making',NULL),(304,'The Man Who Knew Infinity','Biography of mathematician Srinivasa Ramanujan',NULL),(305,'Unbroken','WWII survival story by Laura Hillenbrand',NULL),(306,'Superhero Figure','An action figure of a popular superhero.',NULL),(307,'Robot Warrior','A collectible robot figure.',NULL),(308,'Fantasy Character Set','Figures from a popular fantasy series.',NULL),(309,'Movie Icon Figure','Collectible movie character figure.',NULL),(310,'Animal Kingdom Set','Set of collectible animal figures.',NULL),(311,'Baby Doll','Soft and cuddly baby doll.',NULL),(312,'Fashion Doll','Doll with changeable fashion outfits.',NULL),(313,'Dollhouse','Fully furnished dollhouse.',NULL),(314,'Doll Carriage','A carriage for dolls to ride in style.',NULL),(315,'Doll Clothing Set','Set of clothing for various dolls.',NULL),(316,'Building Blocks','Classic set of colorful blocks.',NULL),(317,'Magnetic Tiles','Tiles that stick together to build shapes.',NULL),(318,'Engineering Kit','Kit to build simple machines.',NULL),(319,'Wooden Construction Set','Wooden set for creative building.',NULL),(320,'Bridge Builder Kit','Kit to build bridge models.',NULL),(321,'Remote Control Car','High-speed RC car.',NULL),(322,'Dancing Robot','Robot that can dance and sing.',NULL),(323,'Virtual Pet','Interactive pet that responds to touch.',NULL),(324,'Drone with Camera','Small drone with a camera for kids.',NULL),(325,'Interactive Tablet','Tablet for learning games and activities.',NULL),(326,'Toy Race Car','Race car with pull-back action.',NULL),(327,'Construction Truck','Truck with movable parts.',NULL),(328,'Police Station Playset','Playset with police station theme.',NULL),(329,'Fire Engine','Toy fire engine with lights and sounds.',NULL),(330,'Train Set','Toy train with tracks.',NULL),(331,'Doctor Kit','Doctor kit with stethoscope and tools.',NULL),(332,'Kitchen Set','Mini kitchen set for pretend play.',NULL),(333,'Tool Set','Kid-friendly tool set for builders.',NULL),(334,'Cash Register','Toy cash register with pretend money.',NULL),(335,'Firefighter Costume','Costume for role-playing firefighter.',NULL),(336,'Soccer Ball','Kid-sized soccer ball for outdoor play.',NULL),(337,'Basketball Hoop','Portable hoop for basketball.',NULL),(338,'Water Gun','High-pressure water gun.',NULL),(339,'Kick Scooter','Two-wheel scooter for kids.',NULL),(340,'Bicycle Helmet','Helmet for cycling safety.',NULL),(341,'Toy Guitar','Guitar with sound effects.',NULL),(342,'Drum Set','Small drum set for kids.',NULL),(343,'Xylophone','Colorful xylophone with mallets.',NULL),(344,'Sensory Ball','Textured ball for sensory play.',NULL),(345,'Fidget Cube','Cube with fidget-friendly sides.',NULL),(346,'Puzzle Set','Set of small jigsaw puzzles.',NULL),(347,'Board Game','Classic family board game.',NULL),(348,'Memory Game','Card game to improve memory.',NULL),(349,'Checkers Set','Checkers board game.',NULL),(350,'Maze Puzzle','Handheld maze puzzle.',NULL),(351,'Math Puzzle Set','A set of puzzles to improve math skills.',NULL),(352,'Science Experiment Kit','Kit for basic science experiments.',NULL),(353,'Alphabet Blocks','Blocks to learn letters and numbers.',NULL),(354,'Coding Robot','Interactive robot that teaches coding.',NULL),(355,'Solar System Model','A model of the solar system for kids.',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_attribute`
--

DROP TABLE IF EXISTS `product_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_attribute` (
  `product_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  `attribute_value` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`,`attribute_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `product_attribute_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `product_attribute_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_attribute`
--

LOCK TABLES `product_attribute` WRITE;
/*!40000 ALTER TABLE `product_attribute` DISABLE KEYS */;
INSERT INTO `product_attribute` VALUES (1,3,'Apple'),(1,4,'iOS'),(1,5,'Up to 14 hours'),(2,3,'Bose'),(2,5,'8 hours'),(2,6,'5 x 5 x 5 inches'),(3,3,'LEGO'),(3,6,'15 x 10 x 5 inches'),(3,7,'8+'),(3,8,'Plastic'),(4,3,'Apple'),(4,4,'iOS'),(4,5,'Up to 29 hours'),(4,9,'6.7 inches'),(5,3,'Samsung'),(5,4,'Android'),(5,5,'Up to 36 hours'),(5,9,'6.8 inches'),(6,3,'Nothing'),(6,4,'Android'),(6,5,'Up to 33 hours'),(6,9,'6.55 inches'),(7,3,'Sony'),(7,4,'Android'),(7,5,'Up to 27 hours'),(7,9,'6.5 inches'),(8,3,'ASUS'),(8,4,'Android'),(8,5,'Up to 30 hours'),(8,9,'6.78 inches'),(9,3,'Motorola'),(9,4,'Android'),(9,5,'Up to 28 hours'),(9,9,'6.67 inches'),(10,3,'Vivo'),(10,4,'Android'),(10,5,'Up to 34 hours'),(10,9,'6.8 inches'),(11,3,'Apple'),(11,4,'macOS'),(11,5,'Up to 22 hours'),(11,9,'16 inches'),(11,11,'M3 Max'),(12,3,'Dell'),(12,4,'Windows'),(12,5,'Up to 13 hours'),(12,9,'15.6 inches (OLED)'),(12,11,'Intel Core i9'),(13,3,'Lenovo'),(13,4,'Windows'),(13,5,'Up to 15 hours'),(13,9,'14 inches'),(13,11,'Intel Core i7'),(14,3,'ASUS'),(14,4,'Windows'),(14,5,'Up to 10 hours'),(14,9,'14 inches'),(14,11,'AMD Ryzen 9'),(15,3,'HP'),(15,4,'Windows'),(15,5,'Up to 14 hours'),(15,9,'13.5 inches'),(15,11,'Intel Core i7'),(16,3,'Razer'),(16,4,'Windows'),(16,5,'Up to 6 hours'),(16,9,'18 inches'),(16,11,'Intel Core i9 + RTX 4090'),(17,3,'Acer'),(17,4,'Windows'),(17,5,'Up to 11 hours'),(17,9,'14 inches (OLED)'),(17,11,'AMD Ryzen 7'),(18,3,'Microsoft'),(18,4,'Windows'),(18,5,'Up to 15 hours'),(18,9,'15 inches'),(18,11,'Intel Core i7'),(19,3,'MSI'),(19,4,'Windows'),(19,5,'Up to 8 hours'),(19,9,'17 inches'),(19,11,'Intel Core i9'),(20,3,'Framework'),(20,4,'Windows'),(20,5,'Modular battery'),(20,9,'13.5 inches'),(20,11,'Intel Core i7'),(51,1,'Black'),(51,3,'Bose'),(51,5,'Up to 17 hours'),(51,10,'Yes'),(52,1,'Black'),(52,3,'JBL'),(52,5,'Up to 18 hours'),(52,10,'No'),(53,1,'Blue'),(53,3,'Sony'),(53,5,'Up to 24 hours'),(53,10,'Yes'),(54,1,'Black'),(54,3,'Sonos'),(54,5,'Up to 10 hours'),(54,10,'No'),(55,1,'Cream'),(55,3,'Marshall'),(55,5,'Up to 30 hours'),(55,10,'No'),(56,1,'Black'),(56,3,'Ultimate Ears'),(56,5,'Up to 15 hours'),(56,10,'Yes'),(57,1,'Black'),(57,3,'Anker'),(57,5,'Up to 12 hours'),(57,10,'No'),(58,1,'Walnut'),(58,3,'Klipsch'),(58,5,'Up to 15 hours'),(58,10,'No'),(59,1,'Black'),(59,3,'Harman Kardon'),(59,5,'Up to 8 hours'),(59,10,'No'),(60,1,'Grey'),(60,3,'Bang & Olufsen'),(60,5,'Up to 12 hours'),(60,10,'Yes'),(61,2,'128 GB'),(61,3,'Apple'),(61,4,'iPadOS'),(61,9,'12.9 inches'),(61,11,'M2'),(62,2,'256 GB'),(62,3,'Samsung'),(62,4,'Android'),(62,9,'11 inches'),(62,11,'Snapdragon 8 Gen 2'),(63,2,'512 GB'),(63,3,'Microsoft'),(63,4,'Windows 11'),(63,9,'13 inches'),(63,11,'Intel Core i7'),(64,2,'64 GB'),(64,3,'Amazon'),(64,4,'Fire OS'),(64,9,'10.1 inches'),(64,11,'Quad-core'),(65,2,'256 GB'),(65,3,'Lenovo'),(65,4,'Android'),(65,9,'12.6 inches'),(65,11,'Snapdragon 870'),(66,2,'128 GB'),(66,3,'Xiaomi'),(66,4,'MIUI'),(66,9,'11 inches'),(66,11,'MediaTek Dimensity 1200'),(67,2,'512 GB'),(67,3,'ASUS'),(67,4,'Windows 11'),(67,9,'13 inches'),(67,11,'Intel Core i9'),(68,2,'256 GB'),(68,3,'Huawei'),(68,4,'HarmonyOS'),(68,9,'12.6 inches'),(68,11,'Kirin 9000'),(69,2,'64 GB'),(69,3,'Realme'),(69,4,'Android'),(69,9,'10.4 inches'),(69,11,'MediaTek Helio G90T'),(70,2,'32 GB'),(70,3,'Nokia'),(70,4,'Android'),(70,9,'10.4 inches'),(70,11,'Unisoc T606'),(71,2,'32 GB'),(71,3,'Apple'),(71,4,'watchOS'),(71,9,'1.9 inches'),(71,11,'S8'),(72,2,'64 GB'),(72,3,'Samsung'),(72,4,'Wear OS'),(72,9,'1.5 inches'),(72,11,'Exynos W920'),(73,2,'32 GB'),(73,3,'Garmin'),(73,4,'Garmin OS'),(73,9,'1.4 inches'),(73,11,'Dual Frequency GPS'),(74,2,'32 GB'),(74,3,'Fitbit'),(74,4,'Fitbit OS'),(74,9,'1.58 inches'),(74,11,'N/A'),(75,2,'128 GB'),(75,3,'Amazfit'),(75,4,'Zepp OS'),(75,9,'1.43 inches'),(75,11,'N/A'),(76,2,'32 GB'),(76,3,'Huawei'),(76,4,'HarmonyOS'),(76,9,'1.43 inches'),(76,11,'Kirin A1'),(77,2,'32 GB'),(77,3,'Withings'),(77,4,'N/A'),(77,9,'1.8 inches'),(77,11,'N/A'),(78,2,'32 GB'),(78,3,'TicWatch'),(78,4,'Wear OS'),(78,9,'1.4 inches'),(78,11,'Snapdragon Wear 4100'),(79,2,'32 GB'),(79,3,'Fossil'),(79,4,'Wear OS'),(79,9,'1.28 inches'),(79,11,'Snapdragon Wear 3100'),(80,2,'32 GB'),(80,3,'Polar'),(80,4,'N/A'),(80,9,'1.2 inches'),(80,11,'N/A'),(81,1,'Black'),(81,3,'Sony'),(81,5,'30 hours'),(81,10,'Yes'),(82,1,'Silver'),(82,3,'Apple'),(82,5,'20 hours'),(82,10,'No'),(83,1,'Black'),(83,3,'Bose'),(83,5,'24 hours'),(83,10,'No'),(84,1,'Black'),(84,3,'Sennheiser'),(84,5,'30 hours'),(84,10,'No'),(85,1,'Titanium'),(85,3,'Jabra'),(85,5,'25 hours'),(85,10,'No'),(86,1,'Black'),(86,3,'Beats'),(86,5,'8 hours'),(86,10,'No'),(87,1,'Black'),(87,3,'AKG'),(87,5,'20 hours'),(87,10,'No'),(88,1,'Black'),(88,3,'Anker'),(88,5,'8 hours'),(88,10,'No'),(89,1,'Black'),(89,3,'Shure'),(89,5,'20 hours'),(89,10,'No'),(90,1,'Carbon'),(90,3,'Bowers & Wilkins'),(90,5,'30 hours'),(90,10,'No'),(91,2,'825 GB'),(91,3,'Sony'),(91,4,'PlayStation OS'),(91,9,'4K'),(92,2,'1 TB'),(92,3,'Microsoft'),(92,4,'Xbox OS'),(92,9,'4K'),(93,2,'64 GB'),(93,3,'Nintendo'),(93,4,'Custom OS'),(93,9,'7 inches'),(94,2,'64 GB'),(94,3,'Valve'),(94,4,'SteamOS'),(94,9,'7 inches'),(95,2,'512 GB'),(95,3,'Microsoft'),(95,4,'Xbox OS'),(95,9,'1080p'),(96,2,'32 GB'),(96,3,'Nintendo'),(96,4,'Custom OS'),(96,9,'5.5 inches'),(97,2,'N/A'),(97,3,'Sony'),(97,4,'Custom OS'),(97,9,'N/A'),(98,2,'N/A'),(98,3,'Logitech'),(98,4,'N/A'),(98,9,'N/A'),(99,2,'N/A'),(99,3,'Analogue'),(99,4,'N/A'),(99,9,'3.5 inches'),(100,2,'N/A'),(100,3,'Atari'),(100,4,'N/A'),(100,9,'N/A'),(101,2,'512 GB'),(101,3,'Canon'),(101,4,'Canon EOS R5 Firmware'),(101,9,'3.2 inches'),(101,11,'Dual Pixel CMOS AF II'),(102,2,'256 GB'),(102,3,'Nikon'),(102,4,'Nikon Z Firmware'),(102,9,'3.2 inches'),(102,11,'Expeed 6'),(103,2,'256 GB'),(103,3,'Sony'),(103,4,'Sony Alpha Firmware'),(103,9,'3 inches'),(103,11,'BIONZ XR'),(104,2,'128 GB'),(104,3,'Fujifilm'),(104,4,'Fujifilm X Firmware'),(104,9,'3 inches'),(104,11,'X-Processor 4'),(105,2,'128 GB'),(105,3,'Panasonic'),(105,4,'Panasonic Lumix Firmware'),(105,9,'3 inches'),(105,11,'Venus Engine'),(106,2,'128 GB'),(106,3,'Leica'),(106,4,'Leica Q Firmware'),(106,9,'3 inches'),(106,11,'Maestro II'),(107,2,'64 GB'),(107,3,'Olympus'),(107,4,'Olympus Firmware'),(107,9,'3 inches'),(107,11,'TruePic VIII'),(108,2,'32 GB'),(108,3,'GoPro'),(108,4,'GoPro Firmware'),(108,9,'2.27 inches'),(108,11,'GP2'),(109,2,'64 GB'),(109,3,'DJI'),(109,4,'DJI Firmware'),(109,9,'1 inch'),(109,11,'DJI Image Processor'),(110,2,'32 GB'),(110,3,'Ricoh'),(110,4,'Ricoh Firmware'),(110,9,'3 inches'),(110,11,'GR Engine 6');
/*!40000 ALTER TABLE `product_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,3),(4,3),(5,3),(6,3),(7,3),(8,3),(9,3),(10,3),(2,4),(51,4),(52,4),(53,4),(54,4),(55,4),(56,4),(57,4),(58,4),(59,4),(60,4),(3,6),(11,7),(12,7),(13,7),(14,7),(15,7),(16,7),(17,7),(18,7),(19,7),(20,7),(61,8),(62,8),(63,8),(64,8),(65,8),(66,8),(67,8),(68,8),(69,8),(70,8),(71,9),(72,9),(73,9),(74,9),(75,9),(76,9),(77,9),(78,9),(79,9),(80,9),(81,10),(82,10),(83,10),(84,10),(85,10),(86,10),(87,10),(88,10),(89,10),(90,10),(91,11),(92,11),(93,11),(94,11),(95,11),(96,11),(97,11),(98,11),(99,11),(100,11),(101,12),(102,12),(103,12),(104,12),(105,12),(106,12),(107,12),(108,12),(109,12),(110,12),(111,13),(112,13),(113,13),(114,13),(115,13),(116,14),(117,14),(118,14),(119,14),(120,14),(121,15),(122,15),(123,15),(124,15),(125,15),(126,16),(127,16),(128,16),(129,16),(130,16),(131,17),(132,17),(133,17),(134,17),(135,17),(136,18),(137,18),(138,18),(139,18),(140,18),(141,19),(142,19),(143,19),(144,19),(145,19),(146,20),(147,20),(148,20),(149,20),(150,20),(151,21),(152,21),(153,21),(154,21),(155,21),(156,22),(157,22),(158,22),(159,22),(160,22),(161,23),(162,23),(163,23),(164,23),(165,23),(166,24),(167,24),(168,24),(169,24),(170,24),(171,25),(172,25),(173,25),(174,25),(175,25),(176,26),(177,26),(178,26),(179,26),(180,26),(181,27),(182,27),(183,27),(184,27),(185,27),(186,28),(187,28),(188,28),(189,28),(190,28),(256,29),(257,29),(258,29),(259,29),(260,29),(261,30),(262,30),(263,30),(264,30),(265,30),(266,31),(267,31),(268,31),(269,31),(270,31),(271,32),(272,32),(273,32),(274,32),(275,32),(276,33),(277,33),(278,33),(279,33),(280,33),(281,34),(282,34),(283,34),(284,34),(285,34),(286,35),(287,35),(288,35),(289,35),(290,35),(291,36),(292,36),(293,36),(294,36),(295,36),(296,37),(297,37),(298,37),(299,37),(300,37),(301,38),(302,38),(303,38),(304,38),(305,38),(201,39),(202,39),(203,39),(204,39),(205,39),(206,40),(207,40),(208,40),(209,40),(210,40),(211,41),(212,41),(213,41),(214,41),(215,41),(216,42),(217,42),(218,42),(219,42),(220,42),(221,43),(222,43),(223,43),(224,43),(225,43),(226,44),(227,44),(228,44),(229,44),(230,44),(231,45),(232,45),(233,45),(234,45),(235,45),(236,46),(237,46),(238,46),(239,46),(240,46),(241,47),(242,47),(243,47),(244,47),(245,47),(246,48),(247,48),(248,48),(249,48),(250,48),(351,51),(352,51),(353,51),(354,51),(355,51),(306,52),(307,52),(308,52),(309,52),(310,52),(311,53),(312,53),(313,53),(314,53),(315,53),(316,54),(317,54),(318,54),(319,54),(320,54),(321,55),(322,55),(323,55),(324,55),(325,55),(326,56),(327,56),(328,56),(329,56),(330,56),(331,57),(332,57),(333,57),(334,57),(335,57),(336,58),(337,58),(338,58),(339,58),(340,58),(341,59),(342,59),(343,59),(344,59),(345,59),(346,60),(347,60),(348,60),(349,60),(350,60);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `variant_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `discount_id` int DEFAULT NULL,
  PRIMARY KEY (`variant_id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `product_id` (`product_id`),
  KEY `discount_id` (`discount_id`),
  KEY `index_property_price_increment` (`price`),
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `variant_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`discount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1051 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (1,1,'IPX-16GB-BLK',999.99,0.17,1),(2,1,'IPX-16GB-RED',999.99,0.17,NULL),(3,1,'IPX-32GB-BLK',1099.99,0.17,2),(4,1,'IPX-32GB-RED',1099.99,0.17,NULL),(5,2,'BSS-BLK',199.99,1.20,NULL),(6,3,'LSW-SET',89.99,2.50,NULL),(1001,4,'IPH15PM-256-BLK',1299.99,0.24,NULL),(1002,4,'IPH15PM-256-WHT',1299.99,0.24,NULL),(1003,4,'IPH15PM-512-BLK',1499.99,0.24,NULL),(1004,5,'SSGLS24U-256-BLK',1199.99,0.23,NULL),(1005,5,'SSGLS24U-512-BLK',1399.99,0.23,NULL),(1006,5,'SSGLS24U-1TB-BLK',1599.99,0.23,NULL),(1007,6,'NTP2-256-BLK',699.99,0.20,NULL),(1008,6,'NTP2-256-WHT',699.99,0.20,NULL),(1009,7,'SNYXP1V-256-BLK',1299.99,0.19,NULL),(1010,7,'SNYXP1V-256-SLV',1299.99,0.19,NULL),(1011,8,'ASUSROG8-512-BLK',1099.99,0.23,NULL),(1012,9,'MOTOEDG40-256-BLK',899.99,0.20,NULL),(1013,10,'VIVOX100P-512-BLK',999.99,0.22,NULL),(1014,11,'MBP16-M3-1TB-GRY',2499.99,2.15,NULL),(1015,11,'MBP16-M3-1TB-SLV',2499.99,2.15,NULL),(1016,11,'MBP16-M3-2TB-GRY',2899.99,2.15,NULL),(1017,12,'DXPS15-1TB-BLK',1899.99,1.96,NULL),(1018,12,'DXPS15-2TB-BLK',2199.99,1.96,NULL),(1019,13,'LNVX1C-512-BLK',1599.99,1.12,NULL),(1020,13,'LNVX1C-1TB-BLK',1799.99,1.12,NULL),(1021,14,'ASUSG14-1TB-BLK',1699.99,1.65,NULL),(1022,15,'HPX360-512-SLV',1399.99,1.35,NULL),(1023,16,'RZB18-2TB-BLK',3499.99,3.10,NULL),(1024,71,'AWS9-41-BLK',399.99,0.03,NULL),(1025,71,'AWS9-45-BLK',429.99,0.04,NULL),(1026,71,'AWS9-41-SLV',399.99,0.03,NULL),(1027,72,'SSGW6-40-BLK',299.99,0.03,NULL),(1028,72,'SSGW6-44-BLK',329.99,0.03,NULL),(1029,73,'GF965-BLK',599.99,0.05,NULL),(1030,74,'FBV4-BLK',229.99,0.03,NULL),(1031,75,'AMZGTR4-BLK',199.99,0.03,NULL),(1032,81,'SNY1000XM5-BLK',399.99,0.25,NULL),(1033,81,'SNY1000XM5-SLV',399.99,0.25,NULL),(1034,82,'APDMAX-SG-BLK',549.99,0.38,NULL),(1035,82,'APDMAX-SLV',549.99,0.38,NULL),(1036,83,'BSQC45-BLK',329.99,0.24,NULL),(1037,83,'BSQC45-WHT',329.99,0.24,NULL),(1038,84,'SH560S-BLK',199.99,0.26,NULL),(1039,85,'JE85T-BLK',229.99,0.01,NULL),(1040,86,'BTSB-BLK',149.99,0.01,NULL),(1041,91,'PS5-DISC',499.99,4.50,NULL),(1042,91,'PS5-DE',399.99,3.90,NULL),(1043,92,'XBXS-X',499.99,4.45,NULL),(1044,93,'NSOLED-WHT',349.99,0.42,NULL),(1045,93,'NSOLED-NEO',349.99,0.42,NULL),(1046,94,'STMDK-512',649.99,0.67,NULL),(1047,94,'STMDK-256',529.99,0.67,NULL),(1048,95,'XBXS-S',299.99,2.70,NULL),(1049,96,'NSWL-GRY',199.99,0.28,NULL),(1050,97,'PSVR2',549.99,0.56,NULL);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `trg_variant_price_check` BEFORE INSERT ON `variant` FOR EACH ROW BEGIN
    IF NEW.price < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Price cannot be negative';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `apply_discount` AFTER UPDATE ON `variant` FOR EACH ROW BEGIN
    IF NEW.discount_id IS NOT NULL AND NEW.discount_id != OLD.discount_id THEN
        UPDATE variant
        SET price = price * (1 - (SELECT discount FROM discounts WHERE discount_id = NEW.discount_id))
        WHERE variant_id = NEW.variant_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `variant_attribute`
--

DROP TABLE IF EXISTS `variant_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant_attribute` (
  `variant_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  `attribute_value` varchar(255) NOT NULL,
  PRIMARY KEY (`variant_id`,`attribute_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `variant_attribute_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`),
  CONSTRAINT `variant_attribute_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant_attribute`
--

LOCK TABLES `variant_attribute` WRITE;
/*!40000 ALTER TABLE `variant_attribute` DISABLE KEYS */;
INSERT INTO `variant_attribute` VALUES (1,1,'Black'),(1,2,'16GB'),(2,1,'Red'),(2,2,'16GB'),(3,1,'Black'),(3,2,'32GB'),(4,1,'Red'),(4,2,'32GB'),(5,1,'Black');
/*!40000 ALTER TABLE `variant_attribute` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `update_product_attributes` AFTER INSERT ON `variant_attribute` FOR EACH ROW BEGIN
    INSERT INTO product_attribute (product_id, attribute_id, attribute_value)
    SELECT v.product_id, NEW.attribute_id, NEW.attribute_value
    FROM variant v
    WHERE v.variant_id = NEW.variant_id
    ON DUPLICATE KEY UPDATE attribute_value = NEW.attribute_value;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `variant_details_with_variant_id`
--

DROP TABLE IF EXISTS `variant_details_with_variant_id`;
/*!50001 DROP VIEW IF EXISTS `variant_details_with_variant_id`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `variant_details_with_variant_id` AS SELECT
 1 AS `variant_id`,
 1 AS `product_id`,
 1 AS `sku`,
 1 AS `price`,
 1 AS `weight`,
 1 AS `discount_id`,
 1 AS `discount`,
 1 AS `product_name`,
 1 AS `description`,
 1 AS `category_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `variant_search`
--

DROP TABLE IF EXISTS `variant_search`;
/*!50001 DROP VIEW IF EXISTS `variant_search`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `variant_search` AS SELECT
 1 AS `variant_id`,
 1 AS `product_id`,
 1 AS `sku`,
 1 AS `price`,
 1 AS `weight`,
 1 AS `discount_id`,
 1 AS `product_name`,
 1 AS `category_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `variant_warehouse`
--

DROP TABLE IF EXISTS `variant_warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant_warehouse` (
  `variant_id` int NOT NULL,
  `warehouse_id` int NOT NULL,
  `stock_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`variant_id`,`warehouse_id`),
  KEY `warehouse_id` (`warehouse_id`),
  CONSTRAINT `variant_warehouse_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`),
  CONSTRAINT `variant_warehouse_ibfk_2` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant_warehouse`
--

LOCK TABLES `variant_warehouse` WRITE;
/*!40000 ALTER TABLE `variant_warehouse` DISABLE KEYS */;
INSERT INTO `variant_warehouse` VALUES (1,1,50),(2,1,30),(3,1,20),(4,1,10),(5,1,100),(6,2,75);
/*!40000 ALTER TABLE `variant_warehouse` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`yutharsan`@`localhost`*/ /*!50003 TRIGGER `trg_variant_stock_update` AFTER UPDATE ON `variant_warehouse` FOR EACH ROW BEGIN


    IF NEW.stock_count <= 0 THEN
        INSERT INTO stock_alerts (variant_id, warehouse_id, alert_type)
        VALUES (NEW.variant_id, NEW.warehouse_id, 'OUT_OF_STOCK');
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `vw_product_details`
--

DROP TABLE IF EXISTS `vw_product_details`;
/*!50001 DROP VIEW IF EXISTS `vw_product_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_product_details` AS SELECT
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `category`,
 1 AS `old_price`,
 1 AS `new_price`,
 1 AS `available`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse` (
  `warehouse_id` int NOT NULL AUTO_INCREMENT,
  `warehouse_name` varchar(100) NOT NULL,
  `warehouse_location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` VALUES (1,'Main Warehouse','Dallas'),(2,'Secondary Warehouse','Houston');
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'c_ecommerce'
--
/*!50003 DROP FUNCTION IF EXISTS `Check_Variant_Availability` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` FUNCTION `Check_Variant_Availability`(f_variant_id INT, f_warehouse_id INT) RETURNS int
    READS SQL DATA
BEGIN
    DECLARE available_quantity INT;


    SELECT stock_count INTO available_quantity
    FROM variant_warehouse
    WHERE warehouse_id = f_warehouse_id AND variant_id = f_variant_id
    LIMIT 1;

    IF available_quantity IS NULL THEN
    SIGNAL SQLSTATE '45003' SET MESSAGE_TEXT = 'INV - Variant entry not found';
    END IF;

    RETURN available_quantity;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_cart_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` FUNCTION `get_cart_id`(f_customer_id INT) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_cart_id INT;

    SELECT cart_id INTO v_cart_id
    FROM cart
    WHERE customer_id = f_customer_id
    LIMIT 1;

    IF v_cart_id IS NULL THEN

    SIGNAL SQLSTATE '45006' SET MESSAGE_TEXT = 'Cart does not exist for the customer.';
    END IF;

    RETURN v_cart_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_customer_id_with_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` FUNCTION `get_customer_id_with_email`(f_email VARCHAR(100)) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_customer_id INT;

    SELECT customer_id INTO v_customer_id
    FROM customer
    WHERE customer_email = f_email
    LIMIT 1;

    IF v_customer_id IS NULL THEN

    SIGNAL SQLSTATE '45006' SET MESSAGE_TEXT = 'Customer does not exist for the email.';
    END IF;

    RETURN v_customer_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `Get_Warehouse_Id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` FUNCTION `Get_Warehouse_Id`(f_variant_id INT) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_warehouse_id INT;

    SELECT warehouse_id INTO v_warehouse_id
    FROM variant_warehouse
    WHERE variant_id = f_variant_id
    ORDER BY stock_count DESC
    LIMIT 1;

    IF v_warehouse_id IS NULL THEN
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Warehouse not found for variant.';
    END IF;

    RETURN v_warehouse_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_guest_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `add_guest_user`(
    IN p_customer_name VARCHAR(255),
    IN p_customer_email VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    INSERT INTO customer (customer_name, customer_email, is_guest)
    VALUES
    (p_customer_name, p_customer_email, 1);


    SELECT LAST_INSERT_ID() AS customer_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_to_cart_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `add_to_cart_email`(
    IN p_email VARCHAR(100),
    IN p_variant_id INT,
    IN p_quantity INT
)
BEGIN
    DECLARE v_customer_id INT;
    SET v_customer_id = get_customer_id_with_email(p_email);
    CALL Procedure_Add_To_Cart(v_customer_id, p_variant_id, p_quantity);
    SELECT ROW_COUNT() AS affectedRows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Buy_Now` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `Buy_Now`(
    IN p_customer_id INT,
    IN p_variant_id INT,
    IN p_quantity INT,
    IN p_warehouse_id INT,
    IN p_payment_method ENUM('Cash on Delivery', 'Card'),
    IN p_delivery_method ENUM('Store Pickup', 'Delivery')
)
BEGIN
    DECLARE v_price DECIMAL(10,2);
    DECLARE v_total_amount DECIMAL(10,2);
    DECLARE v_order_id INT;
    DECLARE v_payment_id INT;
    DECLARE v_address_id INT;
    DECLARE v_stock_count INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;


    SELECT address_id INTO v_address_id
    FROM customer
    WHERE customer_id = p_customer_id
    FOR UPDATE;


    SELECT price INTO v_price
    FROM variant
    WHERE variant_id = p_variant_id
    FOR UPDATE;


    SELECT stock_count INTO v_stock_count
    FROM variant_warehouse
    WHERE variant_id = p_variant_id AND warehouse_id = p_warehouse_id
    FOR UPDATE;


    IF v_stock_count < p_quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;


    SET v_total_amount = v_price * p_quantity;


    INSERT INTO payment (payment_method, amount)
    VALUES (p_payment_method, v_total_amount);
    SET v_payment_id = LAST_INSERT_ID();


    INSERT INTO orders (customer_id, address_id, payment_id, delivery_method, contact_email, contact_phone)
    SELECT customer_id, v_address_id, v_payment_id, p_delivery_method, email, phone_number
    FROM customer
    WHERE customer_id = p_customer_id;
    SET v_order_id = LAST_INSERT_ID();


    INSERT INTO order_items (order_id, variant_id, quantity)
    VALUES (v_order_id, p_variant_id, p_quantity);


    UPDATE variant_warehouse
    SET stock_count = stock_count - p_quantity
    WHERE variant_id = p_variant_id AND warehouse_id = p_warehouse_id;

    COMMIT;


    SELECT
        o.order_id,
        o.customer_id,
        o.order_date,
        o.delivery_method,
        p.payment_method,
        p.amount AS total_amount,
        'Order placed successfully' AS message
    FROM Orders o
    JOIN payment p ON o.payment_id = p.payment_id
    WHERE o.order_id = v_order_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `count_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `count_product`()
BEGIN
SELECT COUNT(*) AS total FROM product;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `customer_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `customer_login`(
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255)
)
BEGIN
    DECLARE v_customer_id INT;
    DECLARE v_customer_name VARCHAR(100);
    DECLARE v_is_guest BOOLEAN;


    SELECT customer_id, customer_name, is_guest
    INTO v_customer_id, v_customer_name, v_is_guest
    FROM customer
    WHERE email = p_email AND password_hash = p_password_hash
    LIMIT 1;


    IF v_customer_id IS NOT NULL THEN
        SELECT
            v_customer_id AS customer_id,
            v_customer_name AS customer_name,
            v_is_guest AS is_guest,
            'Login successful' AS message;
    ELSE

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email or password';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_cart_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `delete_cart_item`(
    IN p_cart_id INT,
    IN p_variant_id INT
)
BEGIN
    DELETE FROM cart_items
    WHERE cart_id = p_cart_id
    AND
    variant_id = p_variant_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_cart_item_by_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `delete_cart_item_by_email`(
    IN p_email VARCHAR(100)
)
BEGIN
    DECLARE v_customer_id INT;
    DECLARE v_cart_id INT;
    SET v_customer_id = get_customer_id_with_email(p_email);
    SET v_cart_id = get_cart_id(v_customer_id);

    DELETE FROM cart_items
    WHERE cart_id = v_cart_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_cart_item_by_email_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `delete_cart_item_by_email_id`(
    IN p_email VARCHAR(100),
    IN p_variant_id INT
)
BEGIN
    DECLARE v_customer_id INT;
    DECLARE v_cart_id INT;
    SET v_customer_id = get_customer_id_with_email(p_email);
    SET v_cart_id = get_cart_id(v_customer_id);

    DELETE FROM cart_items
    WHERE cart_id = v_cart_id
    AND
    variant_id = p_variant_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_cart`(
    IN p_customer_id INT
)
BEGIN
    SELECT * FROM cart
    WHERE cart.customer_id = p_customer_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cart_by_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_cart_by_email`(IN p_email VARCHAR(255))
BEGIN

select * from cart_product_details where email = p_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cart_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_cart_items`(
    IN p_cart_id INT
)
BEGIN
    SELECT variant_id, product_id, product_name, price, quantity FROM cart as c
    INNER JOIN cart_items USING (cart_id)
    INNER JOIN variant USING (variant_id)
    INNER JOIN product USING (product_id)
    WHERE c.cart_id = p_cart_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cart_items_by_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_cart_items_by_email`(
    IN p_email VARCHAR(100)
)
BEGIN
    DECLARE v_customer_id INT;
    DECLARE v_cart_id INT;
    SET v_customer_id = get_customer_id_with_email(p_email);
    SET v_cart_id = get_cart_id(v_customer_id);

    SELECT variant_id, product_id, product_name, price, quantity FROM cart as c
    INNER JOIN cart_items USING (cart_id)
    INNER JOIN variant USING (variant_id)
    INNER JOIN product USING (product_id)
    WHERE c.cart_id = v_cart_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_categories`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT * FROM categories LIMIT p_limit OFFSET p_offset;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_categories_count` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_categories_count`(
)
BEGIN
    SELECT COUNT(*) FROM categories;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_categories_with_name` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_categories_with_name`(
    IN p_category_name VARCHAR(100)
)
BEGIN
    SELECT * FROM categories_with_name_and_id
    WHERE category_name = p_category_name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_order_by_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_order_by_email`(IN p_email VARCHAR(255))
BEGIN
    SELECT *
    FROM order_details
    WHERE contact_email = p_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_parent_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_parent_categories`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT * FROM parent_categories LIMIT p_limit OFFSET p_offset;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_parent_categories_count` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_parent_categories_count`(

)
BEGIN
    SELECT COUNT(*) FROM parent_categories;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_product_by_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_product_by_category`(
    IN p_category VARCHAR(100)
)
BEGIN
    SELECT * FROM vw_product_details WHERE category = p_category;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_by_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `get_user_by_email`(
    IN p_customer_email VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;


    SELECT * FROM customer where customer_email = p_customer_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Procedure_Add_To_Cart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `Procedure_Add_To_Cart`(
    IN p_customer_id INT,
    IN p_variant_id INT,
    IN p_quantity INT
)
BEGIN
    DECLARE v_cart_id INT;
    DECLARE v_warehouse_id INT;
    DECLARE v_available_quantity INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;


    IF p_quantity <= 0 THEN
        SIGNAL SQLSTATE '45004' SET MESSAGE_TEXT = 'Quantity must be a positive integer.';
    END IF;

    START TRANSACTION;

        SELECT cart_id INTO v_cart_id
        FROM cart
        WHERE customer_id = p_customer_id
        LIMIT 1;


        IF v_cart_id IS NULL THEN
            INSERT INTO cart (customer_id, created_at)
            VALUES (p_customer_id, NOW());
            SET v_cart_id = LAST_INSERT_ID();
        END IF;


        INSERT INTO cart_items(cart_id, variant_id, quantity)
        VALUES (v_cart_id, p_variant_id, p_quantity)
        ON DUPLICATE KEY UPDATE
            quantity = quantity + p_quantity;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Procedure_Checkout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `Procedure_Checkout`(
    IN p_customer_id INT,
    IN p_payment_method VARCHAR(20),
    IN p_delivery_method VARCHAR(20),

    IN p_contact_email VARCHAR(100),
    IN p_contact_phone VARCHAR(20)
)
BEGIN
    DECLARE v_cart_id INT;
    DECLARE v_order_id INT;
    DECLARE v_payment_id INT;
    DECLARE v_variant_id INT;
    DECLARE v_quantity INT;
    DECLARE v_warehouse_id INT;
    DECLARE v_available_quantity INT;
    DECLARE v_address_id INT;

    DECLARE done INT DEFAULT FALSE;
    DECLARE cart_cursor CURSOR FOR
        SELECT variant_id, quantity FROM cart_items WHERE cart_id = v_cart_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

        SELECT address_id INTO v_address_id
        FROM customer
        WHERE customer_id = p_customer_id;


        SELECT cart_id INTO v_cart_id
        FROM cart
        WHERE customer_id = p_customer_id
        LIMIT 1;

        IF v_cart_id IS NULL THEN
            SIGNAL SQLSTATE '45003' SET MESSAGE_TEXT = 'No items in cart';
        END IF;


        INSERT INTO payment (payment_method, amount)
        VALUES (p_payment_method, 0);
        SET v_payment_id = LAST_INSERT_ID();


        INSERT INTO orders(customer_id, address_id, payment_id, delivery_method, contact_email, contact_phone)
        VALUES (p_customer_id, v_address_id, v_payment_id, p_delivery_method, p_contact_email, p_contact_phone);
        SET v_order_id = LAST_INSERT_ID();


        OPEN cart_cursor;

        read_loop: LOOP
            FETCH cart_cursor INTO v_variant_id, v_quantity;
            IF done THEN
                LEAVE read_loop;
            END IF;


            SET v_warehouse_id = GET_Warehouse_Id(v_variant_id);


            SELECT stock_count INTO v_available_quantity
            FROM variant_warehouse
            WHERE variant_id = v_variant_id AND warehouse_id = v_warehouse_id
            FOR UPDATE;

            IF v_available_quantity IS NULL THEN
                ROLLBACK;

            END IF;

            IF v_available_quantity < v_quantity THEN
                ROLLBACK;

            END IF;


            CALL Update_Variant_Stock(v_variant_id, v_warehouse_id, v_quantity);


            INSERT INTO order_items (order_id, variant_id, quantity)
            VALUES (v_order_id, v_variant_id, v_quantity);
        END LOOP;

        CLOSE cart_cursor;


        UPDATE payment
        SET amount = (
            SELECT SUM(v.price * ci.quantity)
            FROM cart_items ci
            JOIN variant v ON ci.variant_id = v.variant_id
            WHERE ci.cart_id = v_cart_id
        )
        WHERE payment_id = v_payment_id;


        DELETE FROM cart_items WHERE cart_id = v_cart_id;
        DELETE FROM cart WHERE cart_id = v_cart_id;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `procedure_fetch_product_information` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `procedure_fetch_product_information`(
    IN p_product_id INT
)
BEGIN

    SELECT
        p.product_id,
        p.product_name,
        p.description
    FROM
        product p
    WHERE
        p.product_id = p_product_id;


    SELECT
        v.variant_id,
        v.sku,
        v.price,
        v.weight,
        GROUP_CONCAT(CONCAT(a.attribute_name, ': ', va.attribute_value) SEPARATOR ', ') AS variant_attributes
    FROM
        variant v
        LEFT JOIN variant_attribute va ON v.variant_id = va.variant_id
        LEFT JOIN attribute a ON va.attribute_id = a.attribute_id
    WHERE
        v.product_id = p_product_id
    GROUP BY
        v.variant_id;


    SELECT
        c.category_id,
        c.category_name
    FROM
        product_category pc
        INNER JOIN category c ON pc.category_id = c.category_id
    WHERE
        pc.product_id = p_product_id;


    SELECT
        vw.warehouse_id,
        vw.variant_id,
        vw.stock_count
    FROM
        variant_warehouse vw
        INNER JOIN warehouse w ON vw.warehouse_id = w.warehouse_id
    WHERE
        vw.variant_id IN (SELECT variant_id FROM variant WHERE product_id = p_product_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Procedure_Update_Cart_Item_Quantity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `Procedure_Update_Cart_Item_Quantity`(
    IN p_customer_id INT,
    IN p_variant_id INT,
    IN p_quantity_change INT
)
BEGIN
    DECLARE v_cart_id INT;
    DECLARE v_current_quantity INT;
    DECLARE v_new_quantity INT;
    DECLARE v_available_quantity INT DEFAULT NULL;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;


    IF p_quantity_change = 0 THEN
        SIGNAL SQLSTATE '45005' SET MESSAGE_TEXT = 'Quantity change cannot be zero.';
    END IF;

    START TRANSACTION;

        SET v_cart_id = get_cart_id(p_customer_id);


        SELECT quantity INTO v_current_quantity
        FROM cart_items
        WHERE cart_id = v_cart_id AND variant_id = p_variant_id
        LIMIT 1;

        IF v_current_quantity IS NULL THEN

            SIGNAL SQLSTATE '45007' SET MESSAGE_TEXT = 'Item not found in cart.';
        END IF;


        SET v_new_quantity = v_current_quantity + p_quantity_change;


        IF v_new_quantity < 0 THEN
            SIGNAL SQLSTATE '45008' SET MESSAGE_TEXT = 'Resulting quantity cannot be negative.';
        END IF;


        IF v_new_quantity = 0 THEN

            DELETE FROM cart_items
            WHERE cart_id = v_cart_id AND variant_id = p_variant_id;
        ELSE

            UPDATE cart_items
            SET quantity = v_new_quantity
            WHERE cart_id = v_cart_id AND variant_id = p_variant_id;
        END IF;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `process_guest_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `process_guest_order`(
    IN p_customer_name VARCHAR(100),
    IN p_customer_email VARCHAR(100),
    IN p_phone_number VARCHAR(20),
    IN p_payment_method VARCHAR(20),
    IN p_delivery_method VARCHAR(20),

    IN p_line_1 VARCHAR(255),
    IN p_line_2 VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_district VARCHAR(100),
    IN p_zip_code VARCHAR(20),

    IN p_cart_items JSON
)
BEGIN
    DECLARE v_customer_id INT;
    DECLARE v_address_id INT;
    DECLARE v_order_id INT;
    DECLARE v_payment_id INT;
    DECLARE v_total_amount DECIMAL(10,2) DEFAULT 0;
    DECLARE v_variant_id INT;
    DECLARE v_quantity INT;
    DECLARE v_item_price DECIMAL(10,2);
    DECLARE v_warehouse_id INT;
    DECLARE i INT DEFAULT 0;
    DECLARE v_items_count INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;


    SET v_items_count = JSON_LENGTH(p_cart_items);


    IF v_items_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cart is empty';
    END IF;


    WHILE i < v_items_count DO
        SET v_variant_id = JSON_EXTRACT(p_cart_items, CONCAT('$[', i, '].variant_id'));
        SET v_quantity = JSON_EXTRACT(p_cart_items, CONCAT('$[', i, '].quantity'));


        SELECT price INTO v_item_price
        FROM variant
        WHERE variant_id = v_variant_id;

        IF v_item_price IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid variant ID';
        END IF;


        SET v_warehouse_id = GET_Warehouse_Id(v_variant_id);


        SET v_total_amount = v_total_amount + (v_item_price * v_quantity);

        SET i = i + 1;
    END WHILE;


    IF v_total_amount <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order total must be greater than 0';
    END IF;


    INSERT INTO payment (
        payment_method,
        amount,
        payment_date
    ) VALUES (
        p_payment_method,
        v_total_amount,
        NOW()
    );
    SET v_payment_id = LAST_INSERT_ID();


    INSERT INTO customer (
        customer_name,
        customer_email,
        customer_phone_number,
        password_hash,
        is_guest
    ) VALUES (
        p_customer_name,
        p_customer_email,
        p_phone_number,
        UUID(),
        TRUE
    );
    SET v_customer_id = LAST_INSERT_ID();


    INSERT INTO address (
        line_1,
        line_2,
        city,
        district,
        zip_code
    ) VALUES (
        p_line_1,
        p_line_2,
        p_city,
        p_district,
        p_zip_code
    );
    SET v_address_id = LAST_INSERT_ID();


    UPDATE customer
    SET address_id = v_address_id
    WHERE customer_id = v_customer_id;


    INSERT INTO orders (
        customer_id,
        address_id,
        payment_id,
        delivery_method,
        contact_email,
        contact_phone,
        order_date
    ) VALUES (
        v_customer_id,
        v_address_id,
        v_payment_id,
        p_delivery_method,
        p_customer_email,
        p_phone_number,
        NOW()
    );
    SET v_order_id = LAST_INSERT_ID();


    SET i = 0;
    WHILE i < v_items_count DO
        SET v_variant_id = JSON_EXTRACT(p_cart_items, CONCAT('$[', i, '].variant_id'));
        SET v_quantity = JSON_EXTRACT(p_cart_items, CONCAT('$[', i, '].quantity'));


        SET v_warehouse_id = GET_Warehouse_Id(v_variant_id);
        CALL Update_Variant_Stock(v_variant_id, v_warehouse_id, v_quantity);


        INSERT INTO order_items (
            order_id,
            variant_id,
            quantity
        ) VALUES (
            v_order_id,
            v_variant_id,
            v_quantity
        );

        SET i = i + 1;
    END WHILE;

    COMMIT;


    SELECT
        o.order_id,
        o.delivery_estimate,
        p.amount as total_amount,
        p.payment_method,
        JSON_OBJECT(
            'name', c.customer_name,
            'email', c.customer_email,
            'phone', c.customer_phone_number,
            'address', JSON_OBJECT(
                'line1', a.line_1,
                'line2', a.line_2,
                'city', a.city,
                'district', a.district,
                'zipCode', a.zip_code
            )
        ) as customer_details
    FROM orders o
    JOIN customer c ON o.customer_id = c.customer_id
    JOIN address a ON o.address_id = a.address_id
    JOIN payment p ON o.payment_id = p.payment_id
    WHERE o.order_id = v_order_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `product_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `product_by_id`(IN p_product_id INT)
BEGIN
    SELECT *
    FROM product
    WHERE product_id = p_product_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `register_user`(
    IN p_customer_name VARCHAR(255),
    IN p_customer_email VARCHAR(255),
    IN p_password_hash VARCHAR(255),
    IN p_phone_number VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    INSERT INTO customer (customer_name, customer_email, password_hash, customer_phone_number)
    VALUES
    (p_customer_name, p_customer_email, p_password_hash, p_phone_number);


    SELECT LAST_INSERT_ID() AS customer_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `search`(
    IN p_search_term VARCHAR(100),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN

    SET p_search_term = CONCAT('%', p_search_term, '%');

    SELECT * FROM product
    WHERE product_name LIKE p_search_term
    LIMIT p_limit
    OFFSET p_offset;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_products` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `sp_get_products`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN

    SELECT * FROM vw_product_details
    LIMIT p_limit OFFSET p_offset;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_product_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `sp_get_product_by_id`(
    IN p_product_id INT
)
BEGIN

    SELECT
        p.*,
        c.category_name,
        GROUP_CONCAT(DISTINCT pc.category_id) as additional_categories
    FROM Product p
    LEFT JOIN Category c ON p.category_id = c.category_id
    LEFT JOIN Product_Category pc ON p.product_id = pc.product_id
    WHERE p.product_id = p_product_id
    GROUP BY p.product_id;


    SELECT
        a.attribute_name,
        pa.attribute_value
    FROM Product_Attribute pa
    JOIN Attribute a ON pa.attribute_id = a.attribute_id
    WHERE pa.product_id = p_product_id;


    SELECT
        v.variant_id,
        v.sku,
        v.price,
        v.weight,
        d.discount,
        GROUP_CONCAT(
            CONCAT(a.attribute_name, ': ', va.attribute_value)
            SEPARATOR '; '
        ) as variant_attributes,
        SUM(vw.stock_count) as total_stock
    FROM Variant v
    LEFT JOIN Discounts d ON v.discount_id = d.discount_id
    LEFT JOIN Variant_Attribute va ON v.variant_id = va.variant_id
    LEFT JOIN Attribute a ON va.attribute_id = a.attribute_id
    LEFT JOIN Variant_Warehouse vw ON v.variant_id = vw.variant_id
    WHERE v.product_id = p_product_id
    GROUP BY v.variant_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_process_payment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `sp_process_payment`(
    IN p_order_id INT,
    IN p_payment_method VARCHAR(50),
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE v_payment_id INT;

    START TRANSACTION;


    INSERT INTO Payment (payment_method, amount)
    VALUES (p_payment_method, p_amount);

    SET v_payment_id = LAST_INSERT_ID();


    UPDATE Orders
    SET payment_id = v_payment_id
    WHERE order_id = p_order_id;

    COMMIT;

    SELECT v_payment_id AS payment_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_cart_total_price` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `update_cart_total_price`(p_cart_id INT)
BEGIN
    UPDATE cart
    SET total_price = (
        SELECT COALESCE(SUM(ci.quantity * v.price), 0)
        FROM cart_items ci
        JOIN variant v ON ci.variant_id = v.variant_id
        WHERE ci.cart_id = p_cart_id
    )
    WHERE cart_id = p_cart_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Update_customer_address` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `Update_customer_address`(
    IN p_customer_id INT,
    IN p_line_1 VARCHAR(255),
    IN p_line_2 VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_district VARCHAR(100),
    IN p_zip_code VARCHAR(20)
)
BEGIN
    DECLARE v_address_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;


    IF NOT EXISTS (SELECT 1 FROM customer WHERE customer_id = p_customer_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'customer does not exist';
    END IF;


    IF NOT EXISTS (SELECT 1 FROM city WHERE city_name = p_city) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'city does not exist';
    END IF;


    SELECT address_id INTO v_address_id
    FROM customer
    WHERE customer_id = p_customer_id;

    IF v_address_id IS NULL THEN

        INSERT INTO address (line_1, line_2, city, district, zip_code)
        VALUES (p_line_1, p_line_2, p_city, p_district, p_zip_code);

        SET v_address_id = LAST_INSERT_ID();


        UPDATE customer
        SET address_id = v_address_id
        WHERE customer_id = p_customer_id;
    ELSE

        UPDATE address
        SET
            line_1 = p_line_1,
            line_2 = p_line_2,
            city = p_city,
            district = p_district,
            zip_code = p_zip_code
        WHERE address_id = v_address_id;
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Update_Variant_Stock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yutharsan`@`localhost` PROCEDURE `Update_Variant_Stock`(
    IN p_variant_id INT,
    IN p_warehouse_id INT,
    IN p_quantity INT
)
BEGIN
    DECLARE v_available_quantity INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        SET v_available_quantity = Check_Variant_Availability(p_variant_id, p_warehouse_id);

        IF v_available_quantity >= p_quantity THEN

            UPDATE variant_warehouse
            SET stock_count = stock_count - p_quantity
            WHERE variant_id = p_variant_id AND warehouse_id = p_warehouse_id;
        ELSE
            SIGNAL SQLSTATE '45002'
            SET MESSAGE_TEXT = 'INV - Insufficient Stock';
        END IF;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `cart_product_details`
--

/*!50001 DROP VIEW IF EXISTS `cart_product_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cart_product_details` AS select `ci`.`cart_id` AS `cart_id`,`ci`.`variant_id` AS `variant_id`,`p`.`product_id` AS `product_id`,`c`.`customer_email` AS `email`,(select `va`.`attribute_value` from (`variant_attribute` `va` join `attribute` `a` on((`va`.`attribute_id` = `a`.`attribute_id`))) where ((`va`.`variant_id` = `ci`.`variant_id`) and (`a`.`attribute_name` = 'color'))) AS `color`,`ci`.`quantity` AS `quantity`,`p`.`product_name` AS `product_name`,(case when (`d`.`discount` is not null) then (`v`.`price` * (1 - (`d`.`discount` / 100))) else `v`.`price` end) AS `new_price`,`v`.`price` AS `old_price`,`p`.`description` AS `description`,(select `va`.`attribute_value` from (`variant_attribute` `va` join `attribute` `a` on((`va`.`attribute_id` = `a`.`attribute_id`))) where ((`va`.`variant_id` = `ci`.`variant_id`) and (`a`.`attribute_name` = 'image'))) AS `image`,(select `c`.`category_name` from (`category` `c` join `product_category` `pc` on((`c`.`category_id` = `pc`.`category_id`))) where (`pc`.`product_id` = `p`.`product_id`) limit 1) AS `category` from (((((`cart_items` `ci` join `variant` `v` on((`ci`.`variant_id` = `v`.`variant_id`))) join `product` `p` on((`v`.`product_id` = `p`.`product_id`))) join `cart` `ca` on((`ci`.`cart_id` = `ca`.`cart_id`))) join `customer` `c` on((`ca`.`customer_id` = `c`.`customer_id`))) left join `discounts` `d` on((`v`.`discount_id` = `d`.`discount_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cart_with_email`
--

/*!50001 DROP VIEW IF EXISTS `cart_with_email`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cart_with_email` AS select `C`.`cart_id` AS `cart_id`,`C`.`customer_id` AS `customer_id`,`C`.`created_at` AS `created_at`,`C`.`total_price` AS `total_price`,`CU`.`customer_email` AS `customer_email` from (`cart` `C` join `customer` `CU` on((`C`.`customer_id` = `CU`.`customer_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `categories`
--

/*!50001 DROP VIEW IF EXISTS `categories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `categories` AS select `category`.`category_id` AS `id`,`category`.`category_name` AS `name` from `category` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `categories_with_name_and_id`
--

/*!50001 DROP VIEW IF EXISTS `categories_with_name_and_id`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `categories_with_name_and_id` AS select `P`.`product_id` AS `product_id`,`P`.`product_name` AS `product_name`,`P`.`default_variant_id` AS `default_variant_id`,`C`.`category_name` AS `category_name`,`V`.`price` AS `price`,`D`.`discount` AS `discount` from ((((`product` `P` join `product_category` `PC` on((`P`.`product_id` = `PC`.`product_id`))) join `category` `C` on((`PC`.`category_id` = `C`.`category_id`))) left join `variant` `V` on((`V`.`variant_id` = `P`.`default_variant_id`))) left join `discounts` `D` on((`V`.`discount_id` = `D`.`discount_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `order_details`
--

/*!50001 DROP VIEW IF EXISTS `order_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `order_details` AS select `o`.`order_id` AS `order_id`,`o`.`customer_id` AS `user_id`,`o`.`address_id` AS `address_id`,`o`.`payment_id` AS `payment_id`,`o`.`order_date` AS `order_date`,`o`.`delivery_estimate` AS `delivery_estimate`,`o`.`delivery_method` AS `delivery_method`,`o`.`contact_email` AS `contact_email`,`o`.`contact_phone` AS `contact_phone` from `orders` `o` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `parent_categories`
--

/*!50001 DROP VIEW IF EXISTS `parent_categories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `parent_categories` AS select `category`.`category_id` AS `id`,`category`.`category_name` AS `name` from `category` where (`category`.`parent_category_id` is null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `variant_details_with_variant_id`
--

/*!50001 DROP VIEW IF EXISTS `variant_details_with_variant_id`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `variant_details_with_variant_id` AS select `V`.`variant_id` AS `variant_id`,`V`.`product_id` AS `product_id`,`V`.`sku` AS `sku`,`V`.`price` AS `price`,`V`.`weight` AS `weight`,`V`.`discount_id` AS `discount_id`,`D`.`discount` AS `discount`,`P`.`product_name` AS `product_name`,`P`.`description` AS `description`,`C`.`category_name` AS `category_name` from ((((`variant` `V` join `product` `P` on((`V`.`product_id` = `P`.`product_id`))) join `product_category` `PC` on((`P`.`product_id` = `PC`.`product_id`))) join `category` `C` on((`PC`.`category_id` = `C`.`category_id`))) join `discounts` `D` on((`V`.`discount_id` = `D`.`discount_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `variant_search`
--

/*!50001 DROP VIEW IF EXISTS `variant_search`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `variant_search` AS select `V`.`variant_id` AS `variant_id`,`V`.`product_id` AS `product_id`,`V`.`sku` AS `sku`,`V`.`price` AS `price`,`V`.`weight` AS `weight`,`V`.`discount_id` AS `discount_id`,`P`.`product_name` AS `product_name`,`C`.`category_name` AS `category_name` from (((`variant` `V` join `product` `P` on((`V`.`product_id` = `P`.`product_id`))) join `product_category` `PC` on((`P`.`product_id` = `PC`.`product_id`))) join `category` `C` on((`PC`.`category_id` = `C`.`category_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_product_details`
--

/*!50001 DROP VIEW IF EXISTS `vw_product_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`yutharsan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_product_details` AS select `p`.`product_id` AS `id`,`p`.`product_name` AS `name`,`p`.`description` AS `description`,`c`.`category_name` AS `category`,max(`v`.`price`) AS `old_price`,round((`v`.`price` * (1 - (coalesce(`d`.`discount`,0) / 100))),2) AS `new_price`,sum(`vw`.`stock_count`) AS `available` from (((((`product` `p` left join `product_category` `pc` on((`pc`.`product_id` = `p`.`product_id`))) left join `category` `c` on((`pc`.`category_id` = `c`.`category_id`))) left join `variant` `v` on((`p`.`default_variant_id` = `v`.`variant_id`))) left join `variant_warehouse` `vw` on((`v`.`variant_id` = `vw`.`variant_id`))) left join `discounts` `d` on((`d`.`discount_id` = `v`.`discount_id`))) group by `p`.`product_id`,`p`.`product_name`,`p`.`description`,`c`.`category_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-29 22:58:25
