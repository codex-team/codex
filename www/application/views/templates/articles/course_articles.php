<? if ($articlesFromCourse) : ?>

    <ul class="course-menu-list">
        <? foreach ($articlesFromCourse as $article) : ?>
            <li class="course-menu-list__item">
                <a href="<?=URL::site( '/article/ ' . $article->id ); ?>" class="course-menu-list__link course-menu-list__link--black">
                    <?= $article->title; ?>
                    <span class="course-menu-list__item-label"></span>
                </a>
            </li>
        <? endforeach; ?>
    </ul>

<? endif; ?>