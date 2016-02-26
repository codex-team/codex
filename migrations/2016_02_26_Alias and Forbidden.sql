-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 26, 2016 at 11:42 PM
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

--
-- Table structure for table `Alias`
--

CREATE TABLE IF NOT EXISTS `Alias` (
  `string` text NOT NULL,
  `hash` bigint(18) NOT NULL,
  `type` int(6) NOT NULL,
  `id` int(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Alias`
--

INSERT INTO `Alias` (`string`, `hash`, `type`, `id`) VALUES
('contest-1', 43136068089493, 1, 1),
('contest-2', 43988959126934, 1, 2);

-- ------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Forbidden` (
  `id` int(18) NOT NULL AUTO_INCREMENT,
  `string` varchar(18) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `Forbidden`
--

INSERT INTO `Forbidden` (`id`, `string`) VALUES
(1, 'articles'),
(2, 'contests'),
(3, 'contest'),
(4, 'admin'),
(5, 'article'),
(6, 'auth'),
(7, 'user'),
(8, 'users');

