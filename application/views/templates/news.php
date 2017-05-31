<?
    $news = array(
        array(
            'text' => 'Написали статью о создании <a href="/python-sockets">сокет сервера</a> на Python',
            'date' => '4 may'
        ),
        array(
            'text' => 'Опубликовали в NPM <a href="https://www.npmjs.com/package/codex.editor.personality">плагин «Персона»</a> для CodeX Editor',
            'date' => '25 apr',
            'release' => true
        ),
        array(
            'text' => 'Представляем CodeX Media — <a href="/media">платформу для создания UGC-медиа</a>',
            'date' => '24 apr',
            'release' => true
        ),
        array(
            'text' => 'Вышла статья от Университета ИТМО о встрече <a href="http://news.ifmo.ru/ru/startups_and_business/initiative/news/6604/">CodeX Meetup: Docker</a>',
            'date' => '21 apr'
        ),
        array(
            'text' => 'Написали о <a href="/webpack-tutorial">сборке JavaScript модулей</a> с помощью Webpack',
            'date' => '15 apr'
        ),
        array(
            'text' => '<a href="https://vk.com/codex_team?w=wall-103229636_251">CodeX Meetup: Webpack</a>',
            'date' => '14 apr'
        ),
        array(
            'text' => 'Написали о том, <a href="/mysql-and-emoji">как подружить базу данных с Emoji</a> 😈',
            'date' => '1 apr'
        ),
        array(
            'text' => 'Поделились опытом использования Docker на <a href="https://vk.com/spbifmo?w=wall-94_31958">CodeX Meetup:Docker</a>',
            'date' => '31 mar'
        ),
        array(
            'text' => 'Вышла статья о прошедшем мастер-классе по верстке от «<a href="http://mbradio.ru/publication/1977/">Мегабайт Медиа</a>»',
            'date' => '29 mar'
        ),
        array(
            'text' => 'Написали простую инструкцию о том, <a href="https://ifmo.su/ssl">как бесплатно и просто настроить HTTPS с помощью Let\'s Encrypt</a>',
            'date' => '22 mar'
        ),
        array(
            'text' => 'Прошел грандиозный <a href="https://github.com/codex-team/html-css-practice">CodeX Meetup: HTML+CSS practice</a>',
            'date' => '17 mar'
        ),
        array(
            'text' => 'Опубликовали статью о <a href="/macos-web-server">настройке окружения для веб-разработки на macOS</a>',
            'date' => '13 mar'
        ),
        array(
            'text' => 'Помучили GPU и CPU на <a href="https://vk.com/codex_team?w=wall-103229636_232">CodeX Meetup: Chrome DevTools</a>',
            'date' => '3 mar'
        ),
        array(
            'text' => 'Прошел первый открытый мастер-класс <a href="https://vk.com/codex_team?w=wall-103229636_229">CodeX Meetup</a>, посвященный основам разработки real-time приложений на node.js и WebSockets',
            'date' => '17 feb'
        ),
        array(
            'text' => 'Вышла новая статья о <a href="/js-modules">модульной разработке в JavaScript</a>',
            'date' => '31 dec'
        ),
        array(
            'text' => 'Опубликовали статью о том, <a href="/docker-php">как использовать Docker-контейнер</a>',
            'date' => '1 dec'
        ),
        array(
            'text' => 'Вышла <a href="http://news.ifmo.ru/ru/science/it/news/6243/">статья о клубе</a> от редакции НИУ ИТМО',
            'date' => '30 nov'
        ),
        array(
            'text' => 'Опубликованы <a href="/task">задания для вступающих в клуб</a>',
            'date' => '23 oct'
        ),
        array(
            'text' => 'Модуль для создания контрастной версии сайта <a href="/special">CodeX Special</a>',
            'date' => '18 oct',
            'release' => true,
        ),
        array(
            'text' => 'Открыт <a href="/join">набор в клуб</a>',
            'date' => '4 oct'
        ),
        // array(
        //     'text' => 'Визуальный редактор для медиа <a href="/editor">CodeX Editor</a>',
        //     'date' => '25 sep',
        //     'release' => true,
        // ),
        array(
            'text' => '<a href="/bot">@codex_bot</a> — Облачная платформа для интеграции сервисов в Telegram. Модули по работе с GitHub и Yandex.Metrika',
            'date' => '22 sep',
            'release' => true,
        ),
        array(
            'text' => 'Новая статья: «<a href="/alias-system">Система алиасов</a>»',
            'date' => '15 jul'
        ),
        array(
            'text' => 'Написали о <a href="/metrika-telegram">публикации статистики из Яндекс.Метрики в Telegram</a>',
            'date' => '27 jul'
        ),
        array(
            'text' => 'Статья о <a href="/supervisor">перезапуске скриптов с помощью модуля Supervisor</a>',
            'date' => '24 mar'
        ),
        array(
            'text' => 'Новая статья: «<a href="/scala-tutorial">Разработка на Scala: первые шаги</a>»',
            'date' => '19 mar'
        ),
        array(
            'text' => 'Представляем <a href="/contests">раздел конкурсов</a>',
            'date' => '4 mar',
            'release' => true,
        ),

    );
?>
<ul class="news js-emoji-included">
    <?
        $MAX_PORTION = 3;
        $i = 0;
    ?>
    <? foreach ( $news as $event ): ?>
        <li class="news__list_item <?= $i >= $MAX_PORTION ? 'hide' : ''?>" data-time="<?= $event['date'] ?>">
            <? if (!empty($event['release'])): ?>
                <span class="news__bage">release</span>
            <? endif ?>
            <?= $event['text'] ?>
        </li>
        <? $i++; ?>
    <? endforeach; ?>
    <span class="news__showmore" onclick="codex.content.showMoreNews( this );">Показать больше новостей</span>
</ul>