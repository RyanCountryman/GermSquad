-- CS340 Group 49 - Anthony Parsons and Ryan Countryman  

-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 29, 2024 at 06:33 PM
-- Server version: 10.6.17-MariaDB-log
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `GermSquad`
--

-- --------------------------------------------------------

--
-- Table structure for table `FertilizerDetails`
--
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE TABLE `FertilizerDetails` (
  `detailsID` int(11) NOT NULL,
  `fertilizerID` int(11) NOT NULL,
  `growthsID` int(11) NOT NULL,
  `productionsID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `FertilizerDetails`
--

INSERT INTO `FertilizerDetails` (`detailsID`, `fertilizerID`, `growthsID`, `productionsID`) VALUES
(1, 2, 1, 1),
(2, 3, 2, 2),
(3, 1, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Fertilizers`
--

CREATE TABLE `Fertilizers` (
  `fertilizerID` int(11) NOT NULL,
  `fertilizerType` varchar(255) DEFAULT NULL,
  `nitrogen` int(11) DEFAULT NULL,
  `phosphorous` int(11) DEFAULT NULL,
  `potassium` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Fertilizers`
--

INSERT INTO `Fertilizers` (`fertilizerID`, `fertilizerType`, `nitrogen`, `phosphorous`, `potassium`) VALUES
(1, 'Liquid Big Bloom', 0, 1, 2),
(2, 'Liquid Grow Big', 3, 2, 6),
(3, 'Liquid Tiger\'s Blood', 2, 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `GrowingLocations`
--

CREATE TABLE `GrowingLocations` (
  `locationID` int(11) NOT NULL,
  `isGround` tinyint(4) NOT NULL DEFAULT 0,
  `isContainer` tinyint(4) NOT NULL DEFAULT 0,
  `containerType` varchar(45) DEFAULT NULL,
  `bedType` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `GrowingLocations`
--

INSERT INTO `GrowingLocations` (`locationID`, `isGround`, `isContainer`, `containerType`, `bedType`) VALUES
(1, 1, 0, NULL, 'Raised Bed'),
(2, 1, 0, NULL, 'Row'),
(3, 1, 0, NULL, 'Trellised Bed'),
(4, 0, 1, 'Ceramic 3 Gallons', NULL),
(5, 0, 1, 'Cloth 5 Gallons', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Growths`
--

CREATE TABLE `Growths` (
  `growthID` int(11) NOT NULL,
  `plantID` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `dailySunlight` int(11) DEFAULT NULL,
  `waterFrequency` int(11) DEFAULT NULL,
  `waterAmount` decimal(10,0) DEFAULT NULL,
  `fertilizerFrequency` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Growths`
--

INSERT INTO `Growths` (`growthID`, `plantID`, `startDate`, `dailySunlight`, `waterFrequency`, `waterAmount`, `fertilizerFrequency`) VALUES
(1, 1, '2024-03-11', 12, 2, 32, 4),
(2, 2, '2024-03-22', 16, 4, 16, 4),
(3, 3, '2024-04-04', 10, 1, 16, 7),
(4, 4, '2024-04-07', 10, 1, 16, 7);

-- --------------------------------------------------------

--
-- Table structure for table `LocationDetails`
--

CREATE TABLE `LocationDetails` (
  `locationDetailsID` int(11) NOT NULL,
  `growingLocationsID` int(11) NOT NULL,
  `growthsID` int(11) NOT NULL,
  `productionsID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `LocationDetails`
--

INSERT INTO `LocationDetails` (`locationDetailsID`, `growingLocationsID`, `growthsID`, `productionsID`) VALUES
(1, 4, 1, 1),
(2, 5, 2, 2),
(3, 1, 3, 3),
(4, 3, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Plants`
--

CREATE TABLE `Plants` (
  `plantID` int(11) NOT NULL,
  `plantType` varchar(45) NOT NULL,
  `seasonComplete` tinyint(4) DEFAULT 0,
  `waterSummation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Plants`
--

INSERT INTO `Plants` (`plantID`, `plantType`, `seasonComplete`, `waterSummation`) VALUES
(1, 'Cherry Tomato', 0, NULL),
(2, 'Chocolate Seven Pot Pepper', 0, NULL),
(3, 'HoneyNut Squash', 0, NULL),
(4, 'English Cucumbers', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Productions`
--

CREATE TABLE `Productions` (
  `productionID` int(11) NOT NULL,
  `plantID` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endProduction` date DEFAULT NULL,
  `waterFrequency` int(11) DEFAULT NULL,
  `waterAmount` decimal(10,0) DEFAULT NULL,
  `fertilizerFrequency` int(11) DEFAULT NULL,
  `yield` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Productions`
--

INSERT INTO `Productions` (`productionID`, `plantID`, `startDate`, `endProduction`, `waterFrequency`, `waterAmount`, `fertilizerFrequency`, `yield`) VALUES
(1, 1, '2024-06-01', '2024-10-23', 2, 128, 4, 2000),
(2, 2, '2024-07-01', '2024-09-25', 4, 128, 7, 850),
(3, 3, '2024-06-15', '2024-11-15', 2, 256, 7, 10000),
(4, 4, '2024-05-15', '2024-08-20', 1, 64, 7, 8000);

-- --------------------------------------------------------

--
-- Table structure for table `Seedlings`
--

CREATE TABLE `Seedlings` (
  `seedlingID` int(11) NOT NULL,
  `plantID` int(11) NOT NULL,
  `datePlanted` date NOT NULL,
  `aveTemperature` int(11) DEFAULT NULL,
  `waterFrequency` int(11) DEFAULT NULL,
  `waterAmount` decimal(10,0) DEFAULT NULL,
  `germinationTime` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Seedlings`
--

INSERT INTO `Seedlings` (`seedlingID`, `plantID`, `datePlanted`, `aveTemperature`, `waterFrequency`, `waterAmount`, `germinationTime`) VALUES
(1, 1, '2024-03-01', 70, 2, 8, 10),
(2, 2, '2024-03-15', 80, 3, 6, 7),
(3, 3, '2024-04-01', 70, 2, 8, 3),
(4, 4, '2024-04-01', 70, 2, 8, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `FertilizerDetails`
--
ALTER TABLE `FertilizerDetails`
  ADD PRIMARY KEY (`detailsID`),
  ADD KEY `fertilizerID` (`fertilizerID`),
  ADD KEY `growthsID` (`growthsID`),
  ADD KEY `productionsID` (`productionsID`);

--
-- Indexes for table `Fertilizers`
--
ALTER TABLE `Fertilizers`
  ADD PRIMARY KEY (`fertilizerID`);

--
-- Indexes for table `GrowingLocations`
--
ALTER TABLE `GrowingLocations`
  ADD PRIMARY KEY (`locationID`);

--
-- Indexes for table `Growths`
--
ALTER TABLE `Growths`
  ADD PRIMARY KEY (`growthID`),
  ADD KEY `plantID` (`plantID`);

--
-- Indexes for table `LocationDetails`
--
ALTER TABLE `LocationDetails`
  ADD PRIMARY KEY (`locationDetailsID`),
  ADD KEY `growingLocationsID` (`growingLocationsID`),
  ADD KEY `growthsID` (`growthsID`),
  ADD KEY `productionsID` (`productionsID`);

--
-- Indexes for table `Plants`
--
ALTER TABLE `Plants`
  ADD PRIMARY KEY (`plantID`);

--
-- Indexes for table `Productions`
--
ALTER TABLE `Productions`
  ADD PRIMARY KEY (`productionID`),
  ADD KEY `plantID` (`plantID`);

--
-- Indexes for table `Seedlings`
--
ALTER TABLE `Seedlings`
  ADD PRIMARY KEY (`seedlingID`),
  ADD KEY `plantID` (`plantID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `FertilizerDetails`
--
ALTER TABLE `FertilizerDetails`
  MODIFY `detailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Fertilizers`
--
ALTER TABLE `Fertilizers`
  MODIFY `fertilizerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `GrowingLocations`
--
ALTER TABLE `GrowingLocations`
  MODIFY `locationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Growths`
--
ALTER TABLE `Growths`
  MODIFY `growthID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `LocationDetails`
--
ALTER TABLE `LocationDetails`
  MODIFY `locationDetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Plants`
--
ALTER TABLE `Plants`
  MODIFY `plantID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Productions`
--
ALTER TABLE `Productions`
  MODIFY `productionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Seedlings`
--
ALTER TABLE `Seedlings`
  MODIFY `seedlingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `FertilizerDetails`
--
ALTER TABLE `FertilizerDetails`
  ADD CONSTRAINT `FertilizerDetails_ibfk_1` FOREIGN KEY (`fertilizerID`) REFERENCES `Fertilizers` (`fertilizerID`),
  ADD CONSTRAINT `FertilizerDetails_ibfk_2` FOREIGN KEY (`growthsID`) REFERENCES `Growths` (`growthID`),
  ADD CONSTRAINT `FertilizerDetails_ibfk_3` FOREIGN KEY (`productionsID`) REFERENCES `Productions` (`productionID`);

--
-- Constraints for table `Growths`
--
ALTER TABLE `Growths`
  ADD CONSTRAINT `Growths_ibfk_1` FOREIGN KEY (`plantID`) REFERENCES `Plants` (`plantID`);

--
-- Constraints for table `LocationDetails`
--
ALTER TABLE `LocationDetails`
  ADD CONSTRAINT `LocationDetails_ibfk_1` FOREIGN KEY (`growingLocationsID`) REFERENCES `GrowingLocations` (`locationID`),
  ADD CONSTRAINT `LocationDetails_ibfk_2` FOREIGN KEY (`growthsID`) REFERENCES `Growths` (`growthID`),
  ADD CONSTRAINT `LocationDetails_ibfk_3` FOREIGN KEY (`productionsID`) REFERENCES `Productions` (`productionID`);

--
-- Constraints for table `Productions`
--
ALTER TABLE `Productions`
  ADD CONSTRAINT `Productions_ibfk_1` FOREIGN KEY (`plantID`) REFERENCES `Plants` (`plantID`);

--
-- Constraints for table `Seedlings`
--
ALTER TABLE `Seedlings`
  ADD CONSTRAINT `Seedlings_ibfk_1` FOREIGN KEY (`plantID`) REFERENCES `Plants` (`plantID`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
