-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 14, 2016 at 01:58 PM
-- Server version: 5.5.41-log
-- PHP Version: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `difual-alpha`
--

-- --------------------------------------------------------


-- Table structure for table `Alias`
--

CREATE TABLE IF NOT EXISTS `Alias` (
  `id_alias` int(18) NOT NULL AUTO_INCREMENT,
  `uri` text NOT NULL,
  `hash` binary(16) NOT NULL,
  `type` int(6) NOT NULL,
  `id` int(18) NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_alias`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;
--
-- Table structure for table `ForbiddenAliases`
--

CREATE TABLE IF NOT EXISTS `ForbiddenAliases` (
  `id` int(18) NOT NULL AUTO_INCREMENT,
  `uri` varchar(18) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `ForbiddenAliases`
--

INSERT INTO `ForbiddenAliases` (`id`, `uri`) VALUES
(1, 'Articles'),
(2, 'Contests'),
(3, 'Article'),
(4, 'Contest'),
(5, 'Admin'),
(6, 'Users'),
(7, 'User');

-- --------------------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
