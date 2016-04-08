-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 08, 2016 at 07:31 PM
-- Server version: 5.5.41-log
-- PHP Version: 5.6.3

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

--
-- Table structure for table `ForbiddenAliases`
--

CREATE TABLE IF NOT EXISTS `ForbiddenAliases` (
  `id` int(18) NOT NULL AUTO_INCREMENT,
  `uri` varchar(18) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `ForbiddenAliases`
--

INSERT INTO `ForbiddenAliases` (`id`, `uri`) VALUES
(1, 'articles'),
(2, 'contests'),
(4, 'contest'),
(5, 'admin'),
(6, 'users'),
(7, 'user'),
(8, 'editor'),
(9, 'auth'),
(10, 'article');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
