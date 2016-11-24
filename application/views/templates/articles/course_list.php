<?php

    $articles = array(
        'Система алиасов',
        'Архитектура бота для Telegram',
        'Публикация статистики из Яндекс.Метрики в Telegram',
        'Supervisor. Настраиваем автоматический перезапуск скриптов',
        'Разработка на Scala: первые шаги',
        'Простой веб-сервер с использованием Python и Flask',
        'О пользе микроразметки для вашего сайта',
        'Ошибки в процессе проектирования лэндингов',
        'Почему вам стоит знать о Redis?',
        'Получаем оповещения от GitHub'
    );

?>

<section class="courses">

    <div class="courses__title">
        <p>Курс</p>
        <h2>«Изучение Python»</h2>
    </div>

    <div class="courses__block-left">
        <ol class="courses__list">

            <? for($i = 0; $i < count($articles) / 2; $i++) : ?>
                <li><a href=""><?=$articles[$i]; ?></a></li>
            <? endfor; ?>
        </ol>
    </div>

    <div class="courses__block-right">
        <ol class="courses__list">
            <? for($i = count($articles) / 2; $i < count($articles); $i++) : ?>
                <li><a href=""><?=$articles[$i]; ?></a></li>
            <? endfor; ?>
        </ol>
    </div>
</section>