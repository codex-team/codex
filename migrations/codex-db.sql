-- phpMyAdmin SQL Dump
-- version 4.2.3deb1.precise~ppa.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 08, 2016 at 06:25 PM
-- Server version: 5.5.44-0+deb7u1
-- PHP Version: 5.4.45-0+deb7u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `codex-db`
--
CREATE DATABASE IF NOT EXISTS `codexdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `codexdb`;

-- --------------------------------------------------------

--
-- Table structure for table `Alias`
--

CREATE TABLE IF NOT EXISTS `Alias` (
`id_alias` int(18) NOT NULL,
  `uri` text NOT NULL,
  `hash` binary(16) NOT NULL,
  `type` int(6) NOT NULL,
  `id` int(18) NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Articles`
--

CREATE TABLE IF NOT EXISTS `Articles` (
`id` int(10) unsigned NOT NULL,
  `uri` varchar(128) NULL,
  `title` varchar(128) NOT NULL,
  `text` text,
  `json` longtext NOT NULL,
  `description` text,
  `cover` varchar(32) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `deprecated` tinyint(1) NOT NULL DEFAULT '0',
  `marked` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Помечает статью в списке как важную',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT 'Порядок вывода статей'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE IF NOT EXISTS `Comments` (
`id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `text` text NOT NULL,
  `article_id` int(10) unsigned NOT NULL,
  `root_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Contests`
--

CREATE TABLE IF NOT EXISTS `Contests` (
`id` int(11) NOT NULL,
  `uri` varchar(128) NULL,
  `title` varchar(128) NOT NULL,
  `description` text,
  `list_icon` varchar(100) DEFAULT NULL,
  `text` text,
  `results` text,
  `prize` text,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `dt_close` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `winner` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE IF NOT EXISTS `Courses` (
  `id` int(10) unsigned NOT NULL,
  `uri` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `text` text,
  `description` text,
  `cover` varchar(32) DEFAULT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `marked` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Помечает курс в списке как важный'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Courses_articles`
--

CREATE TABLE IF NOT EXISTS `Courses_articles` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `article_index` int(11) NOT NULL COMMENT 'Порядковый номер статьи в курсе'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица для связи статей с курсами';

-- --------------------------------------------------------

--
-- Table structure for table `ForbiddenAliases`
--

CREATE TABLE IF NOT EXISTS `ForbiddenAliases` (
`id` int(18) NOT NULL,
  `uri` varchar(18) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `ForbiddenAliases`
--

INSERT INTO `ForbiddenAliases` (`id`, `uri`) VALUES
(1, 'articles'),
(2, 'contests'),
(3, 'contest'),
(4, 'admin'),
(5, 'users'),
(6, 'user'),
(7, 'editor'),
(8, 'auth'),
(9, 'article'),
(10, 'bot'),
(11, 'join'),
(12, 'special'),
(13, 'task'),
(14, 'course'),
(15, 'courses');

-- --------------------------------------------------------

--
-- Table structure for table `Requests`
--

CREATE TABLE IF NOT EXISTS `Requests` (
`id` int(11) NOT NULL,
  `uid` int(11) unsigned DEFAULT NULL,
  `skills` text,
  `wishes` text,
  `dt_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

CREATE TABLE IF NOT EXISTS `Sessions` (
`id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `ip` varchar(128) NOT NULL,
  `dt_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_agent` text NOT NULL,
  `access_token` varchar(128) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE IF NOT EXISTS `Tags` (
`id` int(10) unsigned NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Tags_articles`
--

CREATE TABLE IF NOT EXISTS `Tags_articles` (
  `tag_id` int(10) unsigned NOT NULL,
  `article_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
`id` int(10) unsigned NOT NULL,
  `uri` varchar(128) NULL,
  `name` varchar(128) NOT NULL,
  `vk_id` bigint(20) unsigned DEFAULT NULL,
  `vk_uri` varchar(128) DEFAULT NULL,
  `fb_id` varchar(32) DEFAULT NULL,
  `fb_uri` varchar(32) DEFAULT NULL,
  `github_id` varchar(128) DEFAULT NULL,
  `github_uri` varchar(128) DEFAULT NULL,
  `photo_small` varchar(128) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `photo_big` varchar(128) DEFAULT NULL,
  `role` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `bio` tinytext,
  `instagram_uri` varchar(64) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--
-- Indexes for table `Alias`
--
ALTER TABLE `Alias`
 ADD PRIMARY KEY (`id_alias`), ADD UNIQUE KEY `hash` (`hash`), ADD KEY `id` (`id`), ADD KEY `type` (`type`);

--
-- Indexes for table `Articles`
--
ALTER TABLE `Articles`
 ADD PRIMARY KEY (`id`), ADD KEY `ix_user_id` (`user_id`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
 ADD PRIMARY KEY (`id`), ADD KEY `ix_user_id` (`user_id`), ADD KEY `ix_article_id` (`article_id`);

--
-- Indexes for table `Contests`
--
ALTER TABLE `Contests`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ForbiddenAliases`
--
ALTER TABLE `ForbiddenAliases`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Requests`
--
ALTER TABLE `Requests`
 ADD PRIMARY KEY (`id`), ADD KEY `uid` (`uid`);

--
-- Indexes for table `Sessions`
--
ALTER TABLE `Sessions`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `access_token` (`access_token`), ADD KEY `ix_user_id` (`user_id`);

--
-- Indexes for table `Tags`
--
ALTER TABLE `Tags`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tags_articles`
--
ALTER TABLE `Tags_articles`
 ADD UNIQUE KEY `ix_tag_article` (`tag_id`,`article_id`), ADD KEY `ix_tag_id` (`tag_id`), ADD KEY `ix_article_id` (`article_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
 ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Courses_articles`
--
ALTER TABLE `Courses_articles`
  ADD PRIMARY KEY (`id`);


--
-- AUTO_INCREMENT for table `Alias`
--
ALTER TABLE `Alias`
MODIFY `id_alias` int(18) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Articles`
--
ALTER TABLE `Articles`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Contests`
--
ALTER TABLE `Contests`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ForbiddenAliases`
--
ALTER TABLE `ForbiddenAliases`
MODIFY `id` int(18) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `Requests`
--
ALTER TABLE `Requests`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Sessions`
--
ALTER TABLE `Sessions`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Tags`
--
ALTER TABLE `Tags`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `Courses_articles`
--
ALTER TABLE `Courses_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `Courses`
--
ALTER TABLE `Courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
  
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Articles`
--
ALTER TABLE `Articles`
ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`),
ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Tags_articles`
--
ALTER TABLE `Tags_articles`
ADD CONSTRAINT `tags_articles_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`id`),
ADD CONSTRAINT `tags_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
