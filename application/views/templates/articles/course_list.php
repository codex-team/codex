<?php

    $articles = array(
        'Система алиасов',
//        'Архитектура бота для Telegram',
        'Публикация статистики из Яндекс.Метрики в Telegram',
//        'Supervisor. Настраиваем автоматический перезапуск скриптов',
//        'Разработка на Scala: первые шаги'
    );
//        'Простой веб-сервер с использованием Python и Flask',
//        'О пользе микроразметки для вашего сайта',
//        'Ошибки в процессе проектирования лэндингов',
//        'Почему вам стоит знать о Redis?',
//        'Получаем оповещения от GitHub'

?>

<section class="course">

    <h2 class="course__title">«Изучение Python»</h2>

    <ul class="courses-list">
        <? for($i = 0; $i < count($articles); $i++) : ?>
            <li class="courses-list__item">
                <a class="courses-list__link" href=""><?=$articles[$i]; ?></a>
            </li>
        <? endfor; ?>
    </ul>

</section>