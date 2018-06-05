<article class="feed-item clearfix <?= $item->marked ? 'feed-item--big' : ''?> <?= $item->cover ? 'feed-item--with-cover' : '' ?><?= $item->is_big_cover ? ' feed-item--with-big-cover' : ''?>" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= HTML::chars($item->id); ?>">

    <? if ($item::FEED_PREFIX == 'course'): ?>
        <?
            $url = $item->uri ?: 'course/' . $item->id;
            $articlesFromCourse = $item->course_articles;
            $courseAuthors = $item->course_authors;

            if ($articlesFromCourse) {
                $item->author = $courseAuthors[0];
            }

            if (count($courseAuthors) > 1) {
                $item->coauthor = $courseAuthors[count($courseAuthors) - 1];
            }
        ?>
    <? elseif ($item::FEED_PREFIX == 'article'): ?>
        <?
            $url = $item->uri ?: 'article/' . $item->id;
        ?>
    <? endif; ?>

    <? if ($item->cover): ?>
        <a class="feed-item__cover" href="<?= HTML::chars($url) ?>">
            <img src="<?= HTML::chars($item->cover) ?>">
        </a>
    <? endif; ?>

    <a class="feed-item__title js-emoji-included" href="/<?= HTML::chars($url)  ?>">
        <?= HTML::chars($item->title) ?>
    </a>

    <div class="feed-item__description">
        <?= HTML::chars($item->description) ?>
    </div>

    <? if ($item::FEED_PREFIX == 'course'): ?>

        <?= View::factory('templates/articles/course_articles', array( 'articlesFromCourse' => $articlesFromCourse)); ?>

    <? endif; ?>

    <div class="feed-item__info">
        <time class="feed-item__time">
            <?= date_format(date_create($item->dt_publish), 'd M Y'); ?>
        </time>

        <a class="feed-item__author-photo" href="/user/<?= HTML::chars($item->author->id) ?>">
            <img src="<?= HTML::chars($item->author->photo) ?>" alt="<?= HTML::chars($item->author->name) ?>">
        </a>
        <? if ($item->coauthor->id): ?>
            <a class="feed-item__author-photo" href="/user/<?= HTML::chars($item->coauthor->id) ?>">
                <img src="<?= HTML::chars($item->coauthor->photo) ?>" alt="<?= HTML::chars($item->coauthor->name) ?>">
            </a>
        <? endif; ?>

        <a class="feed-item__author-name" href="/user/<?= HTML::chars($item->author->id) ?>">
            <?= HTML::chars($item->author->name) ?>
        </a>
        <? if ($item->coauthor->id): ?>
            and <a class="feed-item__author-name" href="/user/<?= HTML::chars($item->coauthor->id) ?>">
                <?= HTML::chars($item->coauthor->name) ?>
            </a>
        <? endif; ?>
    </div>

</article>