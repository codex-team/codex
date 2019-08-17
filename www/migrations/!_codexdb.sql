-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 28, 2018 at 08:59 AM
-- Server version: 5.5.53-0+deb8u1
-- PHP Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `alpha-ifmo-su`
--

-- --------------------------------------------------------

--
-- Table structure for table `Aliases`
--

DROP TABLE IF EXISTS `Aliases`;
CREATE TABLE IF NOT EXISTS `Aliases` (
`id_alias` int(18) NOT NULL,
  `uri` text NOT NULL,
  `hash` binary(16) NOT NULL,
  `type` int(6) NOT NULL,
  `id` int(18) NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=1210 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Articles`
--

DROP TABLE IF EXISTS `Articles`;
CREATE TABLE IF NOT EXISTS `Articles` (
`id` int(10) unsigned NOT NULL,
  `uri` varchar(128) NULL DEFAULT NULL,
  `linked_article` int(10) DEFAULT NULL,
  `title` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL,
  `text` longtext CHARACTER SET utf8mb4,
  `description` text,
  `lang` varchar(128) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT '0',
  `cover` varchar(128) DEFAULT NULL,
  `is_big_cover` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_publish` timestamp NULL DEFAULT NULL,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `deprecated` tinyint(1) NOT NULL DEFAULT '0',
  `marked` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Помечает статью в списке как важную',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT 'Порядок вывода статей'
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Coauthors`
--

DROP TABLE IF EXISTS `Coauthors`;
CREATE TABLE IF NOT EXISTS `Coauthors` (
  `article_id` int(10) unsigned NOT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Contests`
--

DROP TABLE IF EXISTS `Contests`;
CREATE TABLE IF NOT EXISTS `Contests` (
`id` int(11) NOT NULL,
  `uri` varchar(128) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

DROP TABLE IF EXISTS `Courses`;
CREATE TABLE IF NOT EXISTS `Courses` (
`id` int(11) NOT NULL,
  `uri` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `text` text,
  `description` text,
  `cover` varchar(128) DEFAULT NULL,
  `is_big_cover` tinyint(1) NOT NULL DEFAULT '0',
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_publish` timestamp NULL DEFAULT NULL,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `marked` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Помечает курс в списке как важный',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT 'Порядок вывода статей и курсов'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Courses_articles`
--

DROP TABLE IF EXISTS `Courses_articles`;
CREATE TABLE IF NOT EXISTS `Courses_articles` (
`id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `article_index` int(11) NOT NULL COMMENT 'Порядковый номер статьи в курсе'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Таблица для связи статей с курсами';

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

CREATE TABLE `News` (
    `id` INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INTEGER(10) UNSIGNED NOT NULL,
    `ru_text` VARCHAR(255) NOT NULL,
    `en_text` VARCHAR(255) NOT NULL,
    `type` TINYINT UNSIGNED NOT NULL,
    `dt_display` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `dt_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Quizzes`
--

DROP TABLE IF EXISTS `Quizzes`;
CREATE TABLE IF NOT EXISTS `Quizzes` (
`id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `quiz_data` text NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Requests`
--

DROP TABLE IF EXISTS `Requests`;
CREATE TABLE IF NOT EXISTS `Requests` (
`id` int(11) NOT NULL,
  `uid` int(11) unsigned DEFAULT NULL,
  `skills` text,
  `wishes` text,
  `dt_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
CREATE TABLE IF NOT EXISTS `Sessions` (
`id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `ip` varchar(128) NOT NULL,
  `dt_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_agent` text NOT NULL,
  `access_token` varchar(128) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1195 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
CREATE TABLE IF NOT EXISTS `Tags` (
`id` int(10) unsigned NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Tags_articles`
--

DROP TABLE IF EXISTS `Tags_articles`;
CREATE TABLE IF NOT EXISTS `Tags_articles` (
  `tag_id` int(10) unsigned NOT NULL,
  `article_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
`id` int(10) unsigned NOT NULL,
  `uri` varchar(128) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Aliases`
--
ALTER TABLE `Aliases`
 ADD PRIMARY KEY (`id_alias`), ADD UNIQUE KEY `hash` (`hash`), ADD KEY `id` (`id`), ADD KEY `type` (`type`);

--
-- Indexes for table `Articles`
--
ALTER TABLE `Articles`
 ADD PRIMARY KEY (`id`), ADD KEY `ix_user_id` (`user_id`);

--
-- Indexes for table `Coauthors`
--
ALTER TABLE `Coauthors`
 ADD PRIMARY KEY (`article_id`), ADD KEY `user_id` (`user_id`);

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
-- Indexes for table `Courses`
--
ALTER TABLE `Courses`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Courses_articles`
--
ALTER TABLE `Courses_articles`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Quizzes`
--
ALTER TABLE `Quizzes`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Aliases`
--
ALTER TABLE `Aliases`
MODIFY `id_alias` int(18) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1210;
--
-- AUTO_INCREMENT for table `Articles`
--
ALTER TABLE `Articles`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=229;
--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Contests`
--
ALTER TABLE `Contests`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `Courses`
--
ALTER TABLE `Courses`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Courses_articles`
--
ALTER TABLE `Courses_articles`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Quizzes`
--
ALTER TABLE `Quizzes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Requests`
--
ALTER TABLE `Requests`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=229;
--
-- AUTO_INCREMENT for table `Sessions`
--
ALTER TABLE `Sessions`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1195;
--
-- AUTO_INCREMENT for table `Tags`
--
ALTER TABLE `Tags`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=376;
