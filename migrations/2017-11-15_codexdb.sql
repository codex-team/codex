-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Ноя 15 2017 г., 17:13
-- Версия сервера: 5.7.19
-- Версия PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `codexdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Alias`
--

CREATE TABLE `Alias` (
  `id_alias` int(18) NOT NULL,
  `uri` text NOT NULL,
  `hash` binary(16) NOT NULL,
  `type` int(6) NOT NULL,
  `id` int(18) NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Articles`
--

CREATE TABLE `Articles` (
  `id` int(10) UNSIGNED NOT NULL,
  `uri` varchar(128) NULL DEFAULT NULL,
  `title` varchar(128) NOT NULL,
  `text` text,
  `json` longtext NOT NULL,
  `description` text,
  `quiz_id` int(11) DEFAULT '0',
  `cover` varchar(32) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `deprecated` tinyint(1) NOT NULL DEFAULT '0',
  `marked` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Помечает статью в списке как важную',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT 'Порядок вывода статей'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Comments`
--

CREATE TABLE `Comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `text` text NOT NULL,
  `article_id` int(10) UNSIGNED NOT NULL,
  `root_id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Contests`
--

CREATE TABLE `Contests` (
  `id` int(11) NOT NULL,
  `uri` varchar(128) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Courses`
--

CREATE TABLE `Courses` (
  `id` int(11) NOT NULL,
  `uri` varchar(128) DEFAULT NULL,
  `title` varchar(128) NOT NULL,
  `text` text,
  `description` text,
  `cover` varchar(32) DEFAULT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `marked` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Помечает курс в списке как важный',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT 'Порядок вывода статей и курсов'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Courses_articles`
--

CREATE TABLE `Courses_articles` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `article_index` int(11) NOT NULL COMMENT 'Порядковый номер статьи в курсе'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица для связи статей с курсами';

-- --------------------------------------------------------

--
-- Структура таблицы `ForbiddenAliases`
--

CREATE TABLE `ForbiddenAliases` (
  `id` int(18) NOT NULL,
  `uri` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ForbiddenAliases`
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
(15, 'courses'),
(16, ''),
(17, 'test'),
(18, 'quiz');

-- --------------------------------------------------------

--
-- Структура таблицы `Quizzes`
--

CREATE TABLE `Quizzes` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `quiz_data` text NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Requests`
--

CREATE TABLE `Requests` (
  `id` int(11) NOT NULL,
  `uid` int(11) UNSIGNED DEFAULT NULL,
  `skills` text,
  `wishes` text,
  `dt_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Sessions`
--

CREATE TABLE `Sessions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `ip` varchar(128) NOT NULL,
  `dt_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_agent` text NOT NULL,
  `access_token` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Tags`
--

CREATE TABLE `Tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Tags_articles`
--

CREATE TABLE `Tags_articles` (
  `tag_id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `id` int(10) UNSIGNED NOT NULL,
  `uri` varchar(128) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `vk_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vk_uri` varchar(128) DEFAULT NULL,
  `fb_id` varchar(32) DEFAULT NULL,
  `fb_uri` varchar(32) DEFAULT NULL,
  `github_id` varchar(128) DEFAULT NULL,
  `github_uri` varchar(128) DEFAULT NULL,
  `photo_small` varchar(128) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `photo_big` varchar(128) DEFAULT NULL,
  `role` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` timestamp NULL DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT '0',
  `bio` tinytext,
  `instagram_uri` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Alias`
--
ALTER TABLE `Alias`
  ADD PRIMARY KEY (`id_alias`),
  ADD UNIQUE KEY `hash` (`hash`),
  ADD KEY `id` (`id`),
  ADD KEY `type` (`type`);

--
-- Индексы таблицы `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_user_id` (`user_id`);

--
-- Индексы таблицы `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_user_id` (`user_id`),
  ADD KEY `ix_article_id` (`article_id`);

--
-- Индексы таблицы `Contests`
--
ALTER TABLE `Contests`
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
-- Индексы таблицы `ForbiddenAliases`
--
ALTER TABLE `ForbiddenAliases`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Quizzes`
--
ALTER TABLE `Quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Requests`
--
ALTER TABLE `Requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Индексы таблицы `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `access_token` (`access_token`),
  ADD KEY `ix_user_id` (`user_id`);

--
-- Индексы таблицы `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Tags_articles`
--
ALTER TABLE `Tags_articles`
  ADD UNIQUE KEY `ix_tag_article` (`tag_id`,`article_id`),
  ADD KEY `ix_tag_id` (`tag_id`),
  ADD KEY `ix_article_id` (`article_id`);

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Alias`
--
ALTER TABLE `Alias`
  MODIFY `id_alias` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT для таблицы `Articles`
--
ALTER TABLE `Articles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT для таблицы `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Contests`
--
ALTER TABLE `Contests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Courses`
--
ALTER TABLE `Courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Courses_articles`
--
ALTER TABLE `Courses_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `ForbiddenAliases`
--
ALTER TABLE `ForbiddenAliases`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `Quizzes`
--
ALTER TABLE `Quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Requests`
--
ALTER TABLE `Requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT для таблицы `Sessions`
--
ALTER TABLE `Sessions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=547;

--
-- AUTO_INCREMENT для таблицы `Tags`
--
ALTER TABLE `Tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

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
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Ограничения внешнего ключа таблицы `Tags_articles`
--
ALTER TABLE `Tags_articles`
  ADD CONSTRAINT `tags_articles_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`id`),
  ADD CONSTRAINT `tags_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
