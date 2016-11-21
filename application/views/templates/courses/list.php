<? foreach ($courses as $course): ?>

    <div class="item clearfix">
        <div class="date">
            <time><?= date_format(date_create($course->dt_create), 'd M'); ?></time>
        </div>
        <div class="icon fl_l">
            <img src="<?= $course->list_icon ?: '/public/img/contest_icon_default@2x.png' ?>" alt="<?= $course->title ?>">
        </div>
        <div class="constrain">
            <a class="title" href="<?= $course->uri  ?: 'contest/' . $course->id; ?>"><?= $course->title; ?></a>
            <div class="description"><?= $course->description ?></div>
        </div>
    </div>

<? endforeach; ?>