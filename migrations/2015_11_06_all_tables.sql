-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3307
-- Время создания: Ноя 06 2015 г., 20:30
-- Версия сервера: 5.5.41-log
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `codex`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Articles`
--

CREATE TABLE IF NOT EXISTS `Articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `text` text,
  `description` text,
  `cover` varchar(32) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ix_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Очистить таблицу перед добавлением данных `Articles`
--

TRUNCATE TABLE `Articles`;
-- --------------------------------------------------------

--
-- Структура таблицы `Comments`
--

CREATE TABLE IF NOT EXISTS `Comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `text` text NOT NULL,
  `article_id` int(10) unsigned NOT NULL,
  `root_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ix_user_id` (`user_id`),
  KEY `ix_article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Очистить таблицу перед добавлением данных `Comments`
--

TRUNCATE TABLE `Comments`;
-- --------------------------------------------------------

--
-- Структура таблицы `Sessions`
--

CREATE TABLE IF NOT EXISTS `Sessions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `ip` varchar(128) NOT NULL,
  `dt_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Очистить таблицу перед добавлением данных `Sessions`
--

TRUNCATE TABLE `Sessions`;
-- --------------------------------------------------------

--
-- Структура таблицы `Tags`
--

CREATE TABLE IF NOT EXISTS `Tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Очистить таблицу перед добавлением данных `Tags`
--

TRUNCATE TABLE `Tags`;
-- --------------------------------------------------------

--
-- Структура таблицы `Tags_articles`
--

CREATE TABLE IF NOT EXISTS `Tags_articles` (
  `tag_id` int(10) unsigned NOT NULL,
  `article_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `ix_tag_article` (`tag_id`,`article_id`),
  KEY `ix_tag_id` (`tag_id`),
  KEY `ix_article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Очистить таблицу перед добавлением данных `Tags_articles`
--

TRUNCATE TABLE `Tags_articles`;
-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `vk_id` bigint(20) unsigned DEFAULT NULL,
  `vk_uri` varchar(128) DEFAULT NULL,
  `photo_small` varchar(128) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `photo_big` varchar(128) DEFAULT NULL,
  `role` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Очистить таблицу перед добавлением данных `Users`
--

TRUNCATE TABLE `Users`;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Articles`
--
ALTER TABLE `Articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Ограничения внешнего ключа таблицы `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`);

--
-- Ограничения внешнего ключа таблицы `Sessions`
--
ALTER TABLE `Sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Ограничения внешнего ключа таблицы `Tags_articles`
--
ALTER TABLE `Tags_articles`
  ADD CONSTRAINT `tags_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`),
  ADD CONSTRAINT `tags_articles_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
