-- phpMyAdmin SQL Dump
-- version 4.2.3deb1.precise~ppa.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 29, 2016 at 01:24 AM
-- Server version: 5.5.44-0+deb7u1
-- PHP Version: 5.4.45-0+deb7u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `difual-alpha`
--

-- --------------------------------------------------------

--
-- Table structure for table `Contests`
--

DROP TABLE IF EXISTS `Contests`;
CREATE TABLE IF NOT EXISTS `Contests` (
    `id` int(11) NOT NULL,
    `title` varchar(128) NOT NULL,
    `text` text,
    `results` text,
    `prize` text,
    `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `dt_update` timestamp NULL DEFAULT NULL,
    `dt_close` timestamp NULL DEFAULT NULL,
    `status` tinyint(4) NOT NULL DEFAULT '0',
    `winner` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `Contests`
--

INSERT INTO `Contests` (`id`, `title`, `text`, `results`, `prize`, `dt_create`, `dt_update`, `dt_close`, `status`, `winner`) VALUES
(2, 'Конкурс на разработку элементов интерфейса', ' <p>Данный конкурс рассчитан на развитие способностей к созданию простых и изящных элементов интерфейса. Мы ценим специалистов широкого профиля: дизайнеров, которые разбираются в продуктовой части и могут неплохо писать код, разработчиков, которые в состоянии самостоятельно и со вкусом оформить результаты своей работы — добавить новую кнопку на сайт, вывести красивое уведомление об ошибке или оформить целый раздел сайта. Демонстрации этой способности и посвящен конкурс — мы будем создавать стильные элементы интерефейса современного сайта.              </p>              <h2>Задание</h2>              <p>               Разработать UI Kit — набор основных элементов интерфейса современного веб-проекта. В наборе должны быть представлены базовые блоки: кнопки в различных состояниях, показано оформление ссылок, абзацов текста, заголовков и др. Подробный список обязательных элементов описан ниже. Рекомендуется работать в простом, легком и светлом стиле, не загромождая элементы всевозможными «дизайнерскими» изысками.              </p>             <p>               <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_850319B0628B8614F58B5EFED9AAA437205F55403FBE220EDF678AD10FB0E72F_1453644024874_uikitprom3.gif">             </p>             <p>               Полученные элементы представить на одном макете, красиво расположив их в виде модульной сетки.              </p>             <p>               Анимация — неотъемлемая часть современного дизайна. Результат вашей работы можно оценить только «в движении». Поэтому, все элементы необходимо сверстать, используя минимум стилей и тегов разметки. Верстка должна показывать задуманные анимации: кнопки и ссылки с <span class="technic">hover</span> и <span class="technic">active</span> эффектами, дропдауны, чекбоксы и другие динамичные элементы.             </p>             <h3>               Обязательные элементы             </h3>             <p>               <ul>                 <li>Кнопки во всех состояниях: <span class="technic">default</span>, <span class="technic">hover</span>, <span class="technic">active</span>, <span class="technic">disabled</span>                   <ul>                     <li>Обычная кнопка</li>                     <li>Главная кнопка ( <span class="technic">submit</span> )</li>                     <li>Кнопка с иконкой и текстом</li>                     <li>Кнопка только с иконкой</li>                     <li>Кнопка со счетчиком (например, «Поделиться» с количеством шейров )</li>                   </ul>                 </li>                 <li>Ссылки во всех состояниях</li>                 <li>2 абзаца текста</li>                 <li>Заголовки 6 уровней</li>                  <li>Линия-разделитель (<span class="technic">&lt;hr&gt;</span>)</li>                 <li>Навигация вида «хлебные крошки»</li>                 <li>Форма                   <ul>                     <li>Текстовые поля (<span class="technic">&lt;input&gt;</span> и <span class="technic">&lt;textarea&gt;</span>) — в состояниях <span class="technic">default</span> , <span class="technic">focus</span>, <span class="technic">disabled</span>, <span class="technic">error</span></li>                     <li>Заголовок поля (<span class="technic">&lt;label&gt;</span>)</li>                     <li><span class="technic">checkbox</span> — в состояниях <span class="technic">default</span> , <span class="technic">hover</span>, <span class="technic">toggled</span> (активированный флажок), <span class="technic">disabled</span> </li>                     <li>Поле вида <span class="technic">&lt;select&gt;</span> с выпадающими меню </li>                   </ul>                 </li>                 <li>Строка поиска</li>                 <li>Сообщение об ошибке</li>                 <li>Информационное сообщение </li>                 <li>Сообщение об успешной операции (например, сохранении формы)</li>                 <li>Панель с запросом подтверждения действия и кнопками «Подтвердить» и «Отмена»</li>                 <li>Таблица с данными                   <ul>                     <li>Заголовки столбцов</li>                     <li>4–5 столбцов</li>                     <li>5 строк данных</li>                   </ul>                 </li>               </ul>             </p>               <h3>Дополнительные элементы</h3>              <p>               По желанию, вы можете добавить в UI Kit любые элементы интерфейса, которые покажутся вам интересными. Например:             </p>             <p>               <ul>                 <li>Аудио-плеер</li>                 <li>Видео-плеер</li>                 <li>Карта с отмеченным объектом</li>                 <li>Блок со ссылкой на пользователя                   <ul>                     <li>Аватарка</li>                     <li>Имя пользователя</li>                     <li>Описание (Bio) пользователя</li>                   </ul>                 </li>                 <li>Кнопки социальных сетей</li>                 <li>Графики</li>                 <li>Элементы навигации </li>                 <li>Календарь для выбора даты</li>                 <li>Анимация кнопок</li>               </ul>             </p>              <h2>               Рекомендации             </h2>             <p>               Как обычно, начать следует с изучения мирового опыта. На дизайнерских сайтах можно найти различные концепты по запросам «UI kit», «GUI» и др. Например:             </p>             <p>               <ul>                 <li><a href="https://dribbble.com/search?q=flat+ui+kit">https://dribbble.com/search?q=flat+ui+kit</a></li>                 <li><a href="https://ui8.net/categories/ui-kits">https://ui8.net/categories/ui-kits</a></li>                 <li><a href="https://www.behance.net/search?content=projects&sort=appreciations&time=week&search=ui%20kit">https://www.behance.net/search?content=projects&sort=appreciations&time=week&search=ui%20kit</a></li>               </ul>             </p>              <p>               Рекомендуем ознакомиться с наиболее влиятельными гайдлайнами от компаний Apple и Google:             </p>                <p>               <ul>                 <li><a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/">iOS Human Interface Guidelines</a></li>                 <li><a href="https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/index.html">OSX Human Interface Guidelines</a></li>                 <li><a href="https://www.google.com/design/spec/material-design/introduction.html">Google Material Design Guidlines</a></li>                </ul>             </p>              <p>               Иконки можно рисовать самостоятельно, либо использовать готовые из набора Font Awesome.             </p>             <p>               <ul>                 <li><a href="http://fortawesome.github.io/Font-Awesome/cheatsheet/">Font Awesome Charsheet</a></li>                 <li><a href="https://www.ostraining.com/blog/webdesign/fontawesome-psd/">How to use FA icons in Photoshop (or whatever)</a></li>               </ul>             </p>               <h2>Приз</h2>             <p>               В качестве презента победитель получит фирменный блокнот от компании ВКонтакте, инвайт на ресурс для разработчиков «Habrahabr» и футболку клуба CodeX.              </p>             <p>                 <img src="/public/img/articles/contest-prize.jpg" alt="Приз в конкурсе для веб-разработчков ИТМО от CodeX — фирменный блокнокт ВКонтакте и клубая футболка">             </p>              <h2>               Референсы             </h2>             <p>               Приводим несколько неплохих образцов различных дизайнерских концептов.             </p>             <p><img src="/public/img/articles/contest-gui-1.jpg"></p>             <p><img src="/public/img/articles/contest-gui-2.png"></p>             <p><img src="/public/img/articles/contest-gui-3.png"></p>             <p><img src="/public/img/articles/contest-gui-4.jpg"></p>             <p><img src="/public/img/articles/contest-gui-5.jpg"></p>             \r\n<p>Дизайн-макеты и сверстанные страницы присылайте на почту <a href="mailto:team@ifmo.su?subject=Конкурс" target="_blank">team@ifmo.su</a> или отправляйте личным <a href="https://vk.com/im?media=&sel=-103229636" target="_blank">сообщением</a> нашей группе ВКонтакте.</p>\r\n<p>Желаем удачи!</p>', NULL, 'Впечатляющие призы', '2016-01-22 15:48:56', NULL, '2016-02-13 05:00:00', 1, 113);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Contests`
--
ALTER TABLE `Contests`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Contests`
--
ALTER TABLE `Contests`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;

ALTER TABLE `Contests` ADD `description` TEXT NULL DEFAULT NULL AFTER `title`, ADD `list_icon` VARCHAR(100) NULL DEFAULT NULL AFTER `description`;
