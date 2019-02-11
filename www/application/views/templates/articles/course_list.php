<?
    if ($mobileToggleClass) {
        $jsTogglerClass = 'js-course-menu__title--toggle';
    } else {
        $jsTogglerClass = '';
    }
?>
<section class="course-menu">

    <h2 class="course-menu__title <?= $jsTogglerClass ?>" onclick="codex.courses.toggleCourse(this);">
        <a href="/<?= $course->uri ?: 'course/' . $course->id ?>">
            <?=$course->title; ?>
        </a>
    </h2>

    <? if (!empty($articles)) : ?>
        <ul class="course-menu-list">
            <? foreach ($articles as $article) : ?>
                <?
                    $isCurrent = $article->id == $currentArticle->id;
                ?>
                <li class="course-menu-list__item <?= $isCurrent ? 'course-menu-list__item--current' : '' ?>">
                    <a href="/<?= $article->uri ?: 'article/' . $article->id ?>" class="course-menu-list__link">
                        <?= $article->title; ?>
                    </a>
                </li>
            <? endforeach; ?>
        </ul>
    <? endif; ?>
</section>