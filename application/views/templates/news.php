<?
    $news = array(
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
<ul class="news">
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