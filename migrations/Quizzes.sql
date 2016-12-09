-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 09 2016 г., 03:36
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
-- Структура таблицы `Quizzes`
--

CREATE TABLE IF NOT EXISTS `Quizzes` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `quiz_data` text NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Quizzes`
--
ALTER TABLE `Quizzes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Quizzes`
--
ALTER TABLE `Quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
  
ALTER TABLE `Articles` 
  ADD `quiz_id` INT NULL DEFAULT '0' AFTER `description`;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
