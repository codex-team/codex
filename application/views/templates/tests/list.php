<div class="center_side">

    <div class="page_header clearfix">

        <div class="follow_us fl_r">
            Мы завели канал в Телеграме, где будем анонсировать новые конкурсы, интересные статьи и инсайды. Подписывайтесь!<br />
            <a href="//telegram.me/codex_team" target="_blank"><i class="icon_telegram"></i><span>CodeX on Telegram</span></a>
        </div>

        <h1>Тесты команды CodeX</h1>
        <div class="description">
            Чтобы усвоить знания в новых областях, мы создаем небольшие тесты, в которых каждый может проверить себя.
        </div>
    </div>

    <div class="tests_list">

        <? foreach ($tests as $i => $test): ?>
        <section class="item">

            <time class="date"><?= date_format(date_create($test->date), 'd M'); ?></time>

            <div class="constrain">
                <a class="title" href="<?= 'test/' . $test->id; ?>"><?= $test->title; ?></a>
                <div class="description"><?= $test->short_description ?></div>
            </div>

        </section>
        <? endforeach; ?>

    </div>
</div>