<section class="course">

    <?
        $articlesFromCourse = $item->course_articles;
        $url = $item->uri ?: 'course/' . $item->id;
    ?>

    <? if ($articlesFromCourse) : ?>
        <a href="<?= "/course/" . $item->id ?>" class="feed-item__title js-emoji-included">
            <?=$item->title; ?>
        </a>

        <ul class="courses-list courses-list--in-feed">
            <? foreach ($articlesFromCourse as $article) : ?>
                <li class="courses-list__item">
                    <a href="<?=URL::site( '/article/ ' . $article->id ); ?>" class="courses-list__link courses-list__link--black" href="">
                        <?= $article->title; ?>
                    </a>
                </li>
            <? endforeach; ?>
        </ul>

        <div class="feed-item__info">
            <time class="feed-item__time">
                <?= date_format(date_create($article->dt_publish), 'd M Y'); ?>
            </time>

            <a class="feed-item__author-photo" href="/user/<?= HTML::chars($article->author->id) ?>">
                <img src="<?= HTML::chars($article->author->photo) ?>" alt="<?= HTML::chars($article->author->name) ?>">
            </a>

            <a class="feed-item__author-name" href="/user/<?= HTML::chars($article->author->id) ?>">
                <?= HTML::chars($article->author->name) ?>
            </a>
        </div>
    <? endif; ?>

</section>