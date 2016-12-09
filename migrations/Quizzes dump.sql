-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 09 2016 г., 03:40
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

--
-- Дамп данных таблицы `Quizzes`
--

INSERT INTO `Quizzes` (`id`, `title`, `description`, `quiz_data`, `dt_create`, `dt_update`, `is_removed`) VALUES
(1, 'Тест о времени', 'Проверим, насколько ты ориентируешься во времени', '{"questions":[{"title":"Какой сейчас год?","answers":[{"text":"2007","score":"0","message":"Его не вернуть..."},{"text":"2016","score":"1","message":"Угадал!"},{"text":"2017","score":"0","message":"Потерпи еще месяцок"}]},{"title":"А какой был день, когда я создавал этот тест?","answers":[{"text":"Четверг","score":"0","message":"Тогда был уже 3 часа как не четверг.."},{"text":"Среда","score":"0","message":"Тогда я даже не думал, что буду этим заниматься"},{"text":"Пятница","score":"1","message":"Верно! 9е число"}]},{"title":"А сколько сечас времени?","answers":[{"text":"Больше полудня","score":"1","message":"Смотри, не обаманывай!"},{"text":"Около 8-ми утра","score":"1","message":"Доверюсь тебе"},{"text":"Глубокая ночь","score":"1","message":"Сочувствую..."}]}],"messages":[{"message":"Купи себе часы!","score":0},{"message":"Ты не очень ориентируешься во времени","score":1},{"message":"Можно и лучше..","score":2},{"message":"Повелитель времени!","score":3}]}', '2016-12-09 00:10:43', NULL, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
