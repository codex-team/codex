<section class="course">

    <h2 class="course__title"><?=$course->title; ?></h2>

    <ul class="courses-list">
        <? for($i = 0; isset($articles) && $i < count($articles); $i++) : ?>
            <li class="courses-list__item">
                <a href="<?=URL::site($articles[$i]->uri ?: '/article/ ' . $articles[$i]->id ); ?>" class="courses-list__link" href=""><?=$articles[$i]->title; ?></a>
            </li>
        <? endfor; ?>
    </ul>

</section>