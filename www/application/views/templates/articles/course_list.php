<section class="course">

    <h2 class="course__title <?= $mobileToggleClass ?>">
        <a href="<?= "/course/" . $course->id ?>">
            <?=$course->title; ?>
        </a>
    </h2>

    <? if (!empty($articles)) : ?>
        <ul class="course-list js-course-list">
            <? foreach ($articles as $article) : ?>
                <?
                    $isCurrent = $article->id == $currentArticle->id;
                ?>
                <li class="course-list__item <?= $isCurrent ? 'course-list__item--current' : '' ?>">
                    <a href="<?=URL::site($article->uri ?: '/article/ ' . $article->id ); ?>" class="course-list__link">
                        <?= $article->title; ?>
                        <div class="course-list__item-label"></div>
                    </a>
                </li>
            <? endforeach; ?>
        </ul>
    <? endif; ?>
</section>