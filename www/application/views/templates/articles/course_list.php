<section class="course">

    <h2 class="course__title"><?=$course->title; ?></h2>

    <? if (!empty($articles)) : ?>
        <ul class="courses-list">
            <? foreach ($articles as $article) : ?>
                <li class="courses-list__item">
                    <a href="<?=URL::site($article->uri ?: '/article/ ' . $article->id ); ?>" class="courses-list__link" href=""><?=$article->title; ?></a>
                </li>
            <? endforeach; ?>
        </ul>
    <? endif; ?>
</section>