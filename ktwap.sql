-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: kt_wap
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device_data_log`
--

DROP TABLE IF EXISTS `device_data_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_data_log` (
  `data_log_no` int(11) NOT NULL AUTO_INCREMENT,
  `dev_serial_no` varchar(255) NOT NULL,
  `temp` double NOT NULL,
  `h2s` double NOT NULL,
  `co` double NOT NULL,
  `recv_date` datetime NOT NULL,
  PRIMARY KEY (`data_log_no`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_data_log`
--

LOCK TABLES `device_data_log` WRITE;
/*!40000 ALTER TABLE `device_data_log` DISABLE KEYS */;
INSERT INTO `device_data_log` VALUES (1,'kt123',36.5,86.9,26.5,'2016-05-07 09:22:35'),(2,'kt123',36.5,86.9,26.5,'2016-05-07 09:24:28'),(3,'kt123',36.5,86.9,26.5,'2016-05-07 09:26:02'),(4,'KT000001',24,1016,180,'2016-05-08 14:54:57'),(5,'KT000001',24,1017,181,'2016-05-08 14:55:00'),(6,'KT000001',24,1017,181,'2016-05-08 14:55:05'),(7,'KT000001',24,1016,180,'2016-05-08 14:55:06'),(8,'KT000001',24,1017,180,'2016-05-08 14:55:09'),(9,'KT000001',24,1018,181,'2016-05-08 14:55:12'),(10,'KT000001',24,1016,180,'2016-05-08 14:55:15'),(11,'KT000001',24,1016,180,'2016-05-08 14:55:19'),(12,'KT000001',23.94,1017,180,'2016-05-08 14:55:21'),(13,'KT000001',23.94,1017,180,'2016-05-08 14:55:24'),(14,'KT000001',23.94,1017,180,'2016-05-08 14:55:27'),(15,'KT000001',23.94,1017,180,'2016-05-08 14:55:30'),(16,'KT000001',23.94,1017,180,'2016-05-08 14:55:33'),(17,'KT000001',23.94,1017,180,'2016-05-08 14:55:36'),(18,'KT000001',23.94,1017,180,'2016-05-08 14:55:39'),(19,'KT000001',23.94,1018,180,'2016-05-08 14:55:42'),(20,'KT000001',23.94,1018,180,'2016-05-08 14:55:45'),(21,'KT000001',24,1017,179,'2016-05-08 14:55:48'),(22,'KT000001',23.94,1017,179,'2016-05-08 14:55:51'),(23,'KT000001',23.94,1017,182,'2016-05-08 14:55:54'),(24,'KT000001',23.94,1017,181,'2016-05-08 14:55:57'),(25,'KT000001',23.94,1017,181,'2016-05-08 14:56:00'),(26,'KT000001',23.94,1017,181,'2016-05-08 14:56:05'),(27,'KT000001',24,1017,181,'2016-05-08 14:56:07'),(28,'KT000001',24,1017,180,'2016-05-08 14:56:09'),(29,'KT000001',24,1017,180,'2016-05-08 14:56:12'),(30,'KT000001',24,1017,180,'2016-05-08 14:56:15'),(31,'KT000001',24,1016,180,'2016-05-08 14:56:19'),(32,'KT000001',24,1016,179,'2016-05-08 14:56:21'),(33,'KT000001',24,1017,180,'2016-05-08 14:56:24'),(34,'KT000001',24,1017,180,'2016-05-08 14:56:27'),(35,'KT000001',24,1017,180,'2016-05-08 14:56:30'),(36,'KT000001',24,1017,179,'2016-05-08 14:56:33'),(37,'KT000001',24,1018,180,'2016-05-08 14:56:36'),(38,'KT000001',24,1017,180,'2016-05-08 14:56:39'),(39,'KT000001',24,1016,180,'2016-05-08 14:56:42'),(40,'KT000001',24,1016,180,'2016-05-08 14:56:45'),(41,'KT000001',24.06,1017,180,'2016-05-08 14:57:29'),(42,'KT000001',24.06,1017,179,'2016-05-08 14:57:31'),(43,'KT000001',24.06,1017,179,'2016-05-08 14:57:34'),(44,'KT000001',24.06,192,167,'2016-05-08 16:51:22'),(45,'KT000001',24.06,192,167,'2016-05-08 16:51:24');
/*!40000 ALTER TABLE `device_data_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_list`
--

DROP TABLE IF EXISTS `device_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_list` (
  `dev_no` int(11) NOT NULL AUTO_INCREMENT,
  `dev_serial_no` varchar(255) NOT NULL,
  `dev_name` varchar(255) NOT NULL,
  `dev_addr` varchar(999) NOT NULL,
  PRIMARY KEY (`dev_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_list`
--

LOCK TABLES `device_list` WRITE;
/*!40000 ALTER TABLE `device_list` DISABLE KEYS */;
INSERT INTO `device_list` VALUES (1,'kt123','부경대학교 소프트웨어 동아리 WAP','부산광역시 남구 용소로 45 부경대학교 누리관(A13) 옥상'),(2,'KT000001','부경대학교 TEST','부산시 용소로 부산삼성소프트웨어 멤버십 개같은');
/*!40000 ALTER TABLE `device_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_state_log`
--

DROP TABLE IF EXISTS `device_state_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_state_log` (
  `state_no` int(11) NOT NULL AUTO_INCREMENT,
  `dev_serial_no` varchar(255) NOT NULL,
  `state_name_no` int(11) NOT NULL,
  `state_date` datetime NOT NULL,
  PRIMARY KEY (`state_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_state_log`
--

LOCK TABLES `device_state_log` WRITE;
/*!40000 ALTER TABLE `device_state_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_state_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `limit_value_log`
--

DROP TABLE IF EXISTS `limit_value_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `limit_value_log` (
  `limit_no` int(11) NOT NULL AUTO_INCREMENT,
  `temp_limit` double NOT NULL,
  `h2s_limit` double NOT NULL,
  `co_limit` double NOT NULL,
  `set_time` datetime NOT NULL,
  PRIMARY KEY (`limit_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `limit_value_log`
--

LOCK TABLES `limit_value_log` WRITE;
/*!40000 ALTER TABLE `limit_value_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `limit_value_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` varchar(45) NOT NULL,
  `member_pwd` varchar(1024) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'xotjd183','*BC22E015ED31942AF620FFD7AD948566CF94F099'),(2,'admin','*A4B6157319038724E3560894F7F932C8886EBFCF');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_list`
--

DROP TABLE IF EXISTS `status_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_list` (
  `status_no` int(11) NOT NULL AUTO_INCREMENT,
  `stateus_name` varchar(45) NOT NULL,
  PRIMARY KEY (`status_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_list`
--

LOCK TABLES `status_list` WRITE;
/*!40000 ALTER TABLE `status_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-10 22:11:29
