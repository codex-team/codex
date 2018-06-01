<section class="feed-item course course--progress-left">

    <?
        $articlesFromCourse = $item->course_articles;
        $courseAuthors = $item->course_authors;
        $url = $item->uri ?: 'course/' . $item->id;
        // TODO: Remove hardcode, make possible to add > 2 authors
        $multipleCourseAuthors = count($courseAuthors) > 1 ? true : false;
        $firstAuthor = $courseAuthors[0];

        if ($multipleCourseAuthors) {
            $lastAuthor = $courseAuthors[count($courseAuthors) - 1];
        }

    ?>

    <? if ($articlesFromCourse) : ?>
        <a href="<?= "/course/" . $item->id ?>" class="feed-item__title js-emoji-included">
            <?=$item->title; ?>
        </a>

        <ul class="course-list">
            <? foreach ($articlesFromCourse as $article) : ?>
                <li class="course-list__item">
                    <a href="<?=URL::site( '/article/ ' . $article->id ); ?>" class="course-list__link course-list__link--black">
                        <?= $article->title; ?>
                    </a>
                </li>
            <? endforeach; ?>
        </ul>

        <div class="feed-item__info">
            <time class="feed-item__time">
                <?= date_format(date_create($article->dt_publish), 'd M Y'); ?>
            </time>

           <a class="feed-item__author-photo" href="/user/<?= HTML::chars($firstAuthor->id) ?>">
                <img src="<?= HTML::chars($firstAuthor->photo) ?>" alt="<?= HTML::chars($firstAuthor->name) ?>">
            </a>
            <? if ($multipleCourseAuthors): ?>
                <a class="feed-item__author-photo" href="/user/<?= HTML::chars($lastAuthor->id) ?>">
                    <img src="<?= HTML::chars($lastAuthor->photo) ?>" alt="<?= HTML::chars($lastAuthor->name) ?>">
                </a>
            <? endif; ?>
            <a class="feed-item__author-name" href="/user/<?= HTML::chars($firstAuthor->id) ?>">
                <?= HTML::chars($firstAuthor->name) ?>
            </a>
            <? if ($multipleCourseAuthors): ?>
                and <a class="feed-item__author-name" href="/user/<?= HTML::chars($lastAuthor->id) ?>">
                    <?= HTML::chars($lastAuthor->name) ?>
                </a>
            <? endif; ?>

        </div>
    <? endif; ?>

</section>