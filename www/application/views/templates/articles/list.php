<div class="feed">
    <? foreach ($feed_items as $i => $item): ?>

        <article class="feed-item clearfix <?= $item->marked ? 'feed-item--big' : ''?> <?= $item->cover ? 'feed-item--with-cover' : '' ?><?= $item->is_big_cover ? ' feed-item--with-big-cover' : ''?>" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= $item->id; ?>">

            <?
                $url = '';
                if (HTML::chars($item::FEED_PREFIX == 'article')){
                    $url = HTML::chars($item->uri) ?: 'article/' . HTML::chars($item->id);
                } else {
                    $url = HTML::chars($item->uri) ?: 'course/' . HTML::chars($item->id);
                }
            ?>

            <? if (HTML::chars($item->cover)): ?>
                <a class="feed-item__cover" href="<?= $url ?>">
                    <img src="<?= $item->cover ?>">
                </a>
            <? endif; ?>

            <a class="feed-item__title js-emoji-included" href="/<?= $url  ?>">
                <?= HTML::chars($item->title) ?>
            </a>

            <div class="feed-item__description">
                <?= HTML::chars($item->description) ?>
            </div>

            <div class="feed-item__info">
                <time class="feed-item__time">
                    <?= date_format(date_create($item->dt_publish), 'd M Y'); ?>
                </time>

                <? if (HTML::chars($item::FEED_PREFIX == 'article')): ?>
                    <a class="feed-item__author-photo" href="/user/<?= $item->author->id ?>">
                        <img src="<?= $item->author->photo ?>" alt="<?= $item->author->name ?>">
                    </a>
                    <? if (HTML::chars($item->coauthor->id)): ?>
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

        </article>

    <? endforeach; ?>
</div>