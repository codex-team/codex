<section class="course <?= $onPagePositionClass ?>">

    <h2 class="course__title <?= $mobileToggleClass ?>">
        <a href="<?= "/course/" . $course->id ?>">
            <?=$course->title; ?>
        </a>
    </h2>

    <? if (!empty($articles)) : ?>
        <ul class="courses-list js-courses-list">
            <? foreach ($articles as $article) : ?>
                <?
                    $isCurrent = $article->id == $currentArticle->id;
                ?>
                <li class="courses-list__item <?= $isCurrent ? 'courses-list__item--current' : '' ?>">
                    <a href="<?=URL::site($article->uri ?: '/article/ ' . $article->id ); ?>" class="courses-list__link" href="">
                        <?= $article->title; ?>
                    </a>
                </li>
            <? endforeach; ?>
        </ul>
    <? endif; ?>
</section>