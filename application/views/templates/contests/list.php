<? foreach ($contests as $contest): ?>

    <div class="item clearfix">
        <div class="date">
            <time><?= date_format(date_create($contest->dt_create), 'd M'); ?></time>
            <time><?= date_format(date_create($contest->dt_close), 'd M'); ?></time>
        </div>
        <div class="icon fl_l">
            <img src="<?= $contest->list_icon ?: '/public/app/img/contest_icon_default@2x.png' ?>" alt="<?= $contest->title ?>">
        </div>
        <div class="constrain">
            <a class="title" href="<?= $contest->uri  ?: 'contest/' . $contest->id; ?>"><?= $contest->title; ?></a>
            <div class="description"><?= $contest->description ?></div>
        </div>
    </div>

<? endforeach; ?>