<section class="course-menu">

    <a href="<?= "/course/" . $course->id ?>" class="course-menu__title <?= $mobileToggleClass ?>" onclick="codex.courses.toggleCourse(this);">
        <?=$course->title; ?>
    </a>

    <? if (!empty($articles)) : ?>
        <ul class="course-menu-list">
            <? foreach ($articles as $article) : ?>
                <?
                    $isCurrent = $article->id == $currentArticle->id;
                ?>
                <li class="course-menu-list__item <?= $isCurrent ? 'course-menu-list__item--current' : '' ?>">
                    <a href="<?=URL::site($article->uri ?: '/article/ ' . $article->id ); ?>" class="course-menu-list__link">
                        <?= $article->title; ?>
                        <div class="course-menu-list__item-label"></div>
                    </a>
                </li>
            <? endforeach; ?>
        </ul>
    <? endif; ?>
</section>