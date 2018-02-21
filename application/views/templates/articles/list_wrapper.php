<div class="center_side clear">

    <div class="page-header clearfix">

        <div class="follow-us fl_r">
            Мы завели канал в Телеграме, где будем анонсировать новые статьи, конкурсы, наши новости и инсайды. Подписывайтесь!<br />
            <a href="//telegram.me/codex_team" target="_blank"><i class="icon_telegram"></i><span>CodeX on Telegram</span></a>
        </div>

        <h1 class="page-header__title">Статьи команды CodeX</h1>

        <div class="page-header__description">
            Здесь собраны наши заметки о приобретенном опыте и результатах наших экспериментов. А еще так мы учимся писать интересные и грамотные тексты.
        </div>

    </div>

</div>

<div class="center_side feed clearfix">

    <?= View::factory('templates/articles/list', array( 'feed_items' => $feed_items, 'coauthor_feed_items' => $coauthor_feed_items )); ?>

</div>