<link rel="stylesheet" href="/public/css/contests.css?v=<?= filemtime("public/css/contests.css") ?>">
<div class="center_side clear">

    <div class="page-header clearfix">

        <div class="follow-us fl_r">
            Мы завели канал в Телеграме, где будем анонсировать новые конкурсы, интересные статьи и инсайды. Подписывайтесь!<br />
            <a href="//telegram.me/codex_team" target="_blank"><i class="icon_telegram"></i><span>CodeX on Telegram</span></a>
        </div>

        <h1 class="page-header__title">Курсы команды CodeX</h1>

        <div class="page-header__description">
            Чтобы развлечься и попрактиковаться в новых областях, мы делаем курсы.
        </div>

    </div>

    <? if ($courses['opened']): ?>

        <div class="contests-list" data-heading="now">
            <?= View::factory('templates/contests/list', array( 'contests' => $courses['opened'] )); ?>
        </div>

    <? endif; ?>

    <? if ($courses['closed']): ?>

        <div class="contests-list" data-heading="past">
            <?= View::factory('templates/contests/list', array( 'contests' => $courses['closed'] )); ?>
        </div>

    <? endif; ?>

</div>
