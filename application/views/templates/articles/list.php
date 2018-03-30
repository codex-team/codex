<div class="feed">
    <? foreach ($feed_items as $i => $item): ?>

        <article class="feed-item <?= $item->marked ? 'feed-item--big' : ''?> <?= $item->cover ? 'feed-item--with-cover' : '' ?><?= $item->is_big_cover ? ' feed-item--with-big-cover' : ''?>" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= $item->id; ?>">

            <?
                $url = '';
                if ($item::FEED_PREFIX == 'article'){
                    $url = $item->uri ?: 'article/' . $item->id;
                } else {
                    $url = $item->uri ?: 'course/' . $item->id;
                }
            ?>

            <? if ($item->cover): ?>
                <a class="feed-item__cover <?= $item->is_big_cover ? 'feed-item__cover--big' : '' ?>" href="<?= $url ?>" style="background-image: url(<?= $item->cover ?>)"></a>
            <? endif; ?>

            <div class="feed-item__info">
                <time class="feed-item__time">
                    <?= date_format(date_create($item->dt_publish), 'd M Y'); ?>
                </time>

                <? if ($item::FEED_PREFIX == 'article'): ?>
                    <a class="feed-item__author-photo" href="/user/<?= $item->author->id ?>">
                        <img src="<?= $item->author->photo ?>" alt="<?= $item->author->name ?>">
                    </a>
                    <? if ($item->coauthor->id): ?>
                        <a class="feed-item__author-photo" href="/user/<?= $item->coauthor->id ?>">
                            <img src="<?= $item->coauthor->photo ?>" alt="<?= $item->coauthor->name ?>">
                        </a>
                    <? endif; ?>
                    <a class="feed-item__author-name" href="/user/<?= $item->author->id ?>">
                        <?= HTML::chars($item->author->name) ?>
                    </a>
                    <? if ($item->coauthor->id): ?>
                        and <a class="feed-item__author-name" href="/user/<?= $item->coauthor->id ?>">
                            <?= HTML::chars($item->coauthor->name) ?>
                        </a>
                    <? endif; ?>
                <? endif; ?>
            </div>

            <a class="feed-item__title js-emoji-included" href="/<?= $url  ?>">
                <?= HTML::chars($item->title) ?>
            </a>

            <div class="feed-item__description">
                <?= HTML::chars($item->description) ?>
            </div>

        </article>

    <? endforeach; ?>
</div>
