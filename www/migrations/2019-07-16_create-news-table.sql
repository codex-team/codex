--
-- Table structure for table `News`
--

CREATE TABLE `News` (
    `id` INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INTEGER(10) UNSIGNED,
    `ru_text` VARCHAR(255) NOT NULL,
    `en_text` VARCHAR(255) NOT NULL,
    `is_release` BOOL NOT NULL DEFAULT FALSE,
    `dt_display` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `dt_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`)
        REFERENCES `Users`(`id`)
        ON DELETE RESTRICT
) ENGINE INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

--
-- Fill the `News` table with news
--

INSERT INTO `News` (`user_id`, `ru_text`, `en_text`, `is_release`, `dt_display`)
VALUES
(1, 'Новая статья: «<a href="/scala-tutorial">Разработка на Scala: первые шаги</a>»', 'Meet a new «<a href="/scala-tutorial">beginner''s guide about first steps in Scala</a>»', 0, '2016-03-19 10:09:25'),
(1, 'Статья о <a href="/supervisor">перезапуске скриптов с помощью модуля Supervisor</a>', 'Published a guide about <a href="/supervisor">script control system with Supervisor</a>', 0, '2016-03-24 10:09:25'),
(1, 'Написали о <a href="/metrika-telegram">публикации статистики из Яндекс.Метрики в Telegram</a>', 'Wrote about <a href="/metrika-telegram">   analytics data publishing from Yandex.Metrica to Telegram messenger</a>', 0, '2016-07-27 10:09:25'),
(1, 'Новая статья: «<a href="/alias-system">Система алиасов</a>»', 'New article: «<a href="/alias-system">Alias system</a>»', 0, '2016-07-15 10:09:25'),
(1, '<a href="/bot">@codex_bot</a> — Облачная платформа для интеграции сервисов в Telegram. Модули по работе с GitHub и Yandex.Metrika', '<a href="/bot">@codex_bot</a> — a cloud platform for integration of services into messengers. Apps for GitHub and Yandex.Metrika are available', 1, '2016-09-22 10:09:25'),
(1, 'Открыт <a href="/join">набор в клуб</a>', 'Published an <a href="/join">invitation to join the Team</a>', 0, '2016-10-04 10:09:25'),
(1, 'Модуль для создания контрастной версии сайта <a href="/special">CodeX Special</a>', '<a href="/special">CodeX Special</a>: module for making a high-contrast version of websites', 1, '2016-10-18 10:09:25'),
(1, 'Опубликованы <a href="/task">задания для вступающих в клуб</a>', 'Tasks for <a href="/task">joining the Team</a>', 0, '2016-10-23 10:09:25'),
(1, 'Вышла <a href="http://news.ifmo.ru/ru/science/it/news/6243/">статья о клубе</a> от редакции Университета ИТМО', 'Published a <a href="http://news.ifmo.ru/en/science/it/news/6243/">story about CodeX Team</a> from IFMO University editoral office', 0, '2016-11-30 10:09:25'),
(1, 'Опубликовали статью о том, <a href="/docker-php">как использовать Docker-контейнер</a>', 'Wrote a guide about a <a href="/docker-php">Docker-containers usage</a>', 0, '2016-12-01 10:09:25'),
(1, 'Вышла новая статья о <a href="/js-modules">модульной разработке в JavaScript</a>', 'Published a new article about <a href="/js-modules">first steps in JavaScript Modules</a>', 0, '2016-12-31 10:09:25'),
(1, 'Прошел первый открытый мастер-класс <a href="https://vk.com/codex_team?w=wall-103229636_229">CodeX Meetup</a>, посвященный основам разработки real-time приложений на Node.js и WebSockets', 'The first open master class <a href="https://vk.com/codex_team?w=wall-103229636_229">CodeX Meetup</a>, about real-time application development with Node.js and WebSockets', 0, '2017-02-17 10:09:25'),
(1, 'Помучили GPU и CPU на <a href="https://vk.com/codex_team?w=wall-103229636_232">CodeX Meetup: Chrome DevTools</a>', 'Played with GPU and CPU at the <a href="https://vk.com/codex_team?w=wall-103229636_232">CodeX Meetup: Chrome DevTools</a>', 0, '2017-03-03 10:09:25'),
(1, 'Опубликовали статью о <a href="/macos-web-server">настройке окружения для веб-разработки на macOS</a>', 'Published an entry about <a href="/macos-web-server">setting up an local environment for Web-development on macOS</a>', 0, '2017-03-13 10:09:25'),
(1, 'Прошел грандиозный <a href="https://github.com/codex-team/html-css-practice">CodeX Meetup: HTML+CSS practice</a>', 'Held a grand <a href="https://github.com/codex-team/html-css-practice">CodeX Meetup: HTML+CSS practice</a>', 0, '2017-03-17 10:09:25'),
(1, 'Написали простую инструкцию о том, <a href="/ssl">как бесплатно и просто настроить HTTPS с помощью Let''s Encrypt</a>', 'Wrote a simple guide about <a href="/ssl">setting up a HTTPS connection to the website with Let''s Encrypt</a>', 0, '2017-03-22 10:09:25'),
(1, 'Вышла статья о прошедшем мастер-классе по верстке от «<a href="http://mbradio.ru/publication/1977/">Мегабайт Медиа</a>»', 'Story about a past master class «CodeX Meetup: HTML+CSS practice» from <a href="http://mbradio.ru/publication/1977/">Megabyte Media</a>»', 0, '2017-03-29 10:09:25'),
(1, 'Поделились опытом использования Docker на <a href="https://vk.com/spbifmo?w=wall-94_31958">CodeX Meetup:Docker</a>', 'Shared our experience about using a Docker at the <a href="https://vk.com/spbifmo?w=wall-94_31958">CodeX Meetup:Docker</a>', 0, '2017-03-31 10:09:25'),
(1, 'Написали о том, <a href="/mysql-and-emoji">как подружить базу данных с Emoji</a> 😈', 'Dropped a few lines about <a href="/mysql-and-emoji">using Emoji in MySQL</a> 😈', 0, '2017-04-01 10:09:25'),
(1, '<a href="https://vk.com/codex_team?w=wall-103229636_251">CodeX Meetup: Webpack</a>', '<a href="https://vk.com/codex_team?w=wall-103229636_251">CodeX Meetup: Webpack</a>', 0, '2017-04-14 10:09:25'),
(1, 'Написали о <a href="/webpack-tutorial">сборке JavaScript модулей</a> с помощью Webpack', 'Wrote about <a href="/webpack-tutorial">bundling JavaScript-components</a> with Webpack', 0, '2017-04-15 10:09:25'),
(1, 'Вышла статья от Университета ИТМО о встрече <a href="http://news.ifmo.ru/ru/startups_and_business/initiative/news/6604/">CodeX Meetup: Docker</a>', 'Story about <a href="http://news.ifmo.ru/en/startups_and_business/initiative/news/6604/">CodeX Meetup: Docker</a>', 0, '2017-04-21 10:09:25'),
(1, 'Представляем CodeX Media — <a href="/media">платформу для создания UGC-медиа</a>', 'Meet CodeX Media — <a href="/media">Platfrom for building UGC-media</a>', 1, '2017-04-24 10:09:25'),
(1, 'Опубликовали в NPM <a href="https://www.npmjs.com/package/codex.editor.personality">плагин «Персона»</a> для CodeX Editor', 'New plugin «<a href="https://www.npmjs.com/package/codex.editor.personality">Personality</a>» for the CodeX Editor was published on NPM', 1, '2017-04-25 10:09:25'),
(1, 'Написали статью о создании <a href="/python-sockets">сокет сервера</a> на Python', 'New article about development of <a href="/python-sockets">Socket-server</a> with Python', 0, '2017-05-04 10:09:25'),
(1, 'Рассказали о том, <a href="/slack-apps-tutorial">как создать приложение для Slack</a>', 'New guide «<a href="/slack-apps-tutorial">How to create an application for Slack</a>»', 0, '2017-07-24 10:09:25'),
(1, 'Обзор обновления <a href="/github-codeowners">GitHub Code Owners</a>', 'Overview of <a href="/github-codeowners">GitHub Code Owners</a>', 0, '2017-08-02 10:09:25'),
(1, 'Рассказали об опыте <a href="https://vk.com/codex_team?w=wall-103229636_291">работы с дополненной реальностью на ARKit</a>', 'Told about our experience of <a href="https://vk.com/codex_team?w=wall-103229636_291">working with Augmented Reality with Apple ARKit</a>', 0, '2017-09-12 10:09:25'),
(1, 'Написали о том, что такое <a href="/jwt">JSON Web Token</a>', 'Read our article about <a href="/jwt">JSON Web Token</a>', 0, '2017-09-15 10:09:25'),
(1, 'Набросали гайд о том, <a href="/ssh-passwordless-login">как настроить беспарольный доступ по SSH</a>', 'We published a new guide about <a href="/ssh-passwordless-login">setting up a passwordless SSH-access</a>', 0, '2017-09-20 10:09:25'),
(1, 'Опубликованы <a href="/task">задания для вступающих в клуб</a>', '<a href="/task">Tasks for joining the Team</a> were published', 0, '2017-10-01 10:09:25'),
(1, 'Провели мастер-класс по <a href="https://vk.com/wall-103229636_326">основам модульной Frontend-разработки</a>', 'CodeX Meetup: Getting Started with the <a href="https://vk.com/wall-103229636_326">Modular Frontend Development</a>', 0, '2017-10-25 10:09:25'),
(1, 'Вышла статья о том, <a href="/viber-bot">как создать бота для Viber</a>', 'We published a new note «<a href="/viber-bot">How to create a bot for Viber</a>»', 0, '2017-11-02 10:09:25'),
(1, 'Составили инструкцию о том, <a href="/telegram-covers">как создавать обложки в Telegram-каналах</a>', 'Wrote the small guide about <a href="/telegram-covers">how to attach covers to the Telegram channel messages</a>', 0, '2017-11-18 10:09:25'),
(1, 'Новая статья «<a href="/htaccess">Базовые знания о файле .htaccess</a>»', 'Base knowledges about <a href="/htaccess">.htaccess</a> file', 0, '2017-11-20 10:09:25'),
(1, 'Рассказали о том <a href="/run-command-on-ssh-log-in">как настроить уведомления о заходах на сервер по SSH</a>»', 'New guide «<a href="/run-command-on-ssh-log-in">How to set up the notifications about ssh logins</a>»', 0, '2017-12-06 10:09:25'),
(1, 'Представляем обновленный <a href="/">сайт CodeX</a>»', 'Meet the new <a href="/">CodeX''s website</a>', 1, '2017-12-07 10:09:25'),
(1, 'Набросали инструкцию по <a href="/npm">публикации пакета в NPM</a>»', 'Instructions about <a href="/npm">how to publish an NPM package</a>', 0, '2018-02-06 10:09:25'),
(1, 'Написали статью об <a href="/telegram-auth">авторизации пользователей через Telegram</a>»', 'The new guide «<a href="/telegram-auth">Authentication via Telegram</a>»', 0, '2018-02-09 10:09:25'),
(1, 'Обзор <a href="/betterads">Better Ads Standards</a> — допустимых форматов баннеров', 'Overview of the «<a href="/betterads">Better Ads Standards</a>»', 0, '2018-02-16 10:09:25'),
(1, 'Обновления системы сборки <a href="/webpack4">Webpack 4</a>', 'Our new article about <a href="/webpack4">Webpack 4</a>', 0, '2018-02-28 10:09:25'),
(1, 'Написали гайд по внедрению <a href="/ci">Continuous Integration</a>', 'Beginners guide to the <a href="/ci">Continuous Integration</a>', 0, '2018-03-05 10:09:25'),
(1, 'Провели открытый мастер-класс <a href="https://vk.com/wall-103229636_374">CodeX Meetup: Orchestration</a> об оркестрации нескольких проектов на одном сервере.', '<a href="https://vk.com/wall-103229636_374">CodeX Meetup: Orchestration</a>', 0, '2018-03-22 10:09:25'),
(1, 'Прошел мастер-класс <a href="https://vk.com/wall-103229636_391">CodeX Meetup: Vue.js</a>  😼', '<a href="https://vk.com/wall-103229636_391">CodeX Meetup: Vue.js</a> 😼', 0, '2018-04-24 10:09:25'),
(1, 'Выпустили скрипт для <a href="/beauty-toolbar">брендирования тулбара в Safari</a>', '<a href="/beauty-toolbar">Beauty Toolbar</a> - Make the Safari Toolbar more consistent with your brand colors', 1, '2018-05-07 10:09:25'),
(1, 'Опубликовали гайд по <a href="/gpg-verification">настройке GPG-верификации коммитов</a>', 'New guide: <a href="/gpg-verification-github">GPG verification for git commits</a>', 0, '2018-05-21 10:09:25'),
(1, '<a href="https://github.com/codex-team/deeplinker">Deeplinker</a> — библиотека для создания ссылок, которые открывают нативные приложения по ссылке на сайте.', 'Made <a href="https://github.com/codex-team/deeplinker">Deeplinker</a> — library for opening native applications directly from web links', 1, '2018-05-28 10:09:25'),
(1, 'Написали про <a href="/ts-classes">классы в TypeScript</a>', '<a href="/ts-classes">TypeScript classes</a> — simply explained', 0, '2018-05-31 10:09:25'),
(1, 'Начинаем открытое бета-тестирование <a href="https://github.com/codex-team/codex.editor">CodeX Editor 2.0</a>', '<a href="https://github.com/codex-team/codex.editor">CodeX Editor 2.0.beta</a> is pre released 🤩', 1, '2018-08-05 10:09:25'),
(1, 'Разработали приложение-скриншоттер <a href="https://github.com/codex-team/capella-tray">Capella Tray</a> для macOS', '<a href="https://github.com/codex-team/capella-tray">Capella Tray for macOS</a> — upload screenshots instantly to the cloud and get link to clipboard', 1, '2018-08-11 10:09:25'),
(1, 'Подняли  <a href="http://vuejs.ifmo.su">форк vuejs.org</a> из-за блокировок Yota', 'Launched <a href="http://vuejs.ifmo.su">Vue.js Documentation fork</a> due to original IP censorship by <nobr>💩Yota</nobr>  provider ', 0, '2018-08-22 10:09:25'),
(1, 'Написали <a href="https://github.com/codex-team/email-provider">библиотеку</a> для определения почтового сервиса по email-адресу', 'Have built <a href="https://github.com/codex-team/email-provider">Email Provider</a> — library for detection email service name by email address', 1, '2018-09-06 10:09:25'),
(1, 'Набросали <a href="/elastic-search">гайд по Elasticsearch</a> для начинающих', 'Beginners guide about <a href="/elastic-search">first steps in Elasticsearch</a>', 0, '2018-09-20 10:09:25'),
(1, 'Открыт <a href="/join">набор в команду</a>', 'Have introduced <a href="/join">Joining CodeX</a> 👋 — doors are open till 7th, October', 0, '2018-09-21 10:09:25'),
(1, 'Опубликованы <a href="/tasks2018">задания для вступающих в команду</a>', '<a href="/tasks2018">Joining tasks</a> have published', 0, '2018-10-15 10:09:25'),
(1, 'Написали <a href="/proxy">инструкцию по настройке собственного прокси-сервера</a>', 'Created a new <a href="/proxy">guide for building up your own proxy server</a>', 0, '2018-10-25 10:09:25'),
(1, 'Новая заметка о том, <a href="/devops-basics">как запустить сайт на своем сервере</a>', 'Meet new <a href="/devops-basics">DevOps Basics</a> guide', 0, '2018-10-25 10:09:25'),
(1, '<a href="https://vk.com/wall-103229636_454">CodeX Meetup: TypeScript</a>', '<a href="https://vk.com/wall-103229636_454">CodeX Meetup: TypeScript</a>', 0, '2018-11-22 10:09:25'),
(1, 'Вышла статья об <a href="/npm-auto-publish">Автоматической публикации пакетов в NPM</a>', 'New article <a href="/npm-auto-publish">NPM: automatic publishing</a>', 0, '2018-12-28 10:09:25'),
(1, 'Провели эксперимент: <a href="/article/256">fs.readFileSync() или require() — что быстрее</a>', 'Made an experiment: <a href="/article/256">fs.readFileSync() or require() — what is faster</a>', 0, '2019-01-13 10:09:25'),
(1, 'Пердставили <a href="https://www.producthunt.com/posts/editor-js">Editor.js</a> на Product Hunt', '<a href="https://www.producthunt.com/posts/editor-js">Editor.js</a> launched on Product Hunt', 1, '2019-04-02 10:09:25'),
(1, 'Написали на vc.ru об <a href="https://vc.ru/dev/60626">истории создания Editor.js</a>', 'History of <a href="https://vc.ru/dev/60626">Editor.js</a> development (Ru)', 0, '2019-04-03 10:09:25'),
(1, 'Интервью Itmo News <a href="http://news.ifmo.ru/ru/startups_and_business/startup/news/8390">о выпуске Editor.js</a>', 'Interview about <a href="http://news.ifmo.ru/en/startups_and_business/startup/news/8390">Editor.js</a> release', 0, '2019-04-04 10:09:25')


