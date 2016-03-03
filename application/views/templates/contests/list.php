<div class="center_side clear">

    <div class="page_header">
        <h1>Конкурсы команды CodeX</h1>
        <div class="description">
            Чтобы развлечься и попрактиковаться в новых областях, мы проводим небольшие конкурсы, в которых каждый может продемонстрировать свой творческий потенциал, соревнуясь за небольшие презенты.
        </div>
    </div>


    <? if ($contests['opened']): ?>

        <div class="contests_list" data-heading="now">

            <? foreach ($contests['opened'] as $contest): ?>

                <div class="item clearfix">
                    <div class="date">
                        <time><?= date_format(date_create($contest->dt_create), 'd M'); ?></time>
                        <time><?= date_format(date_create($contest->dt_close), 'd M'); ?></time>
                    </div>
                    <div class="icon fl_l">
                        <img src="<?= $contest->list_icon ?: '/public/img/contest_icon_default@2x.png' ?>" alt="<?= $contest->title ?>">
                    </div>
                    <div class="constrain">
                        <a class="title" href="/contest/<?= $contest->id ?>"><?= $contest->title; ?></a>
                        <div class="description"><?= $contest->description ?></div>
                    </div>
                </div>

            <? endforeach; ?>

        </div>
    <? endif; ?>

    <? if ($contests['closed']): ?>

        <div class="contests_list" data-heading="past">

            <? foreach ($contests['closed'] as $contest): ?>

                <div class="item clearfix">
                    <div class="date">
                            <time><?= date_format(date_create($contest->dt_create), 'd M'); ?></time>
                            <time><?= date_format(date_create($contest->dt_close), 'd M'); ?></time>
                        </div>
                    <div class="icon fl_l">
                        <img src="<?= $contest->list_icon ?: '/public/img/contest_icon_default@2x.png' ?>" alt="<?= $contest->title ?>">
                    </div>
                    <div class="constrain">
                        <a class="title" href="/contest/<?= $contest->id ?>" ><?= $contest->title; ?></a>
                        <div class="description"><?= $contest->description ?></div>
                    </div>
                </div>

            <? endforeach; ?>

        </div>

    <? endif; ?>
</div>