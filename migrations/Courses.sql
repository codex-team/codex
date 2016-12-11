-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 18 2016 г., 21:23
-- Версия сервера: 5.5.50
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `difual-alpha`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Courses`
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
-- Структура таблицы `Courses_articles`
--

CREATE TABLE IF NOT EXISTS `Courses_articles` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `article_index` int(11) NOT NULL COMMENT 'Порядковый номер статьи в курсе'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица для связи статей с курсами';

--
-- Индексы сохранённых таблиц
--

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
-- AUTO_INCREMENT для сохранённых таблиц
--

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
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
