<div class="center_side clear course-navigation-wrapper">
    <div class="course-navigation" name="js-course-navigation">
        <? if (isset($previousArticle)): ?>
            <a class="course-navigation__item course-navigation__item--previous" href="/<?= $previousArticle->uri ?: 'article/' . $previousArticle->id ?>">
                <?= HTML::chars($previousArticle->title) ?>
            </a>
        <? endif; ?>

        <? if (isset($nextArticle)): ?>
            <a class="course-navigation__item course-navigation__item--next" href="/<?= $nextArticle->uri ?: 'article/' . $nextArticle->id ?>">
                <?= HTML::chars($nextArticle->title) ?>
            </a>
        <? endif; ?>
    </div>
</div>
