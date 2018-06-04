<? if ($articlesFromCourse) : ?>

    <ul class="course-list">
        <? foreach ($articlesFromCourse as $article) : ?>
            <li class="course-list__item">
                <a href="<?=URL::site( '/article/ ' . $article->id ); ?>" class="course-list__link course-list__link--black">
                    <?= $article->title; ?>
                    <div class="course-list__item-label"></div>
                </a>
            </li>
        <? endforeach; ?>
    </ul>

<? endif; ?>