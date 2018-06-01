<section class="course <?= $onPagePositionClass ?>">

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
                    </a>
                </li>
            <? endforeach; ?>
        </ul>
    <? endif; ?>
</section>