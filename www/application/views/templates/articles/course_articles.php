<? if ($articlesFromCourse) : ?>

    <ul class="course-menu-list course-menu-list--progress-left">
        <? foreach ($articlesFromCourse as $article) : ?>
            <li class="course-menu-list__item">
                <a href="/<?= $article->uri ?: 'article/' . $article->id ?>" class="course-menu-list__link course-menu-list__link--black">
                    <?= $article->title; ?>
                </a>
            </li>
        <? endforeach; ?>
    </ul>

<? endif; ?>