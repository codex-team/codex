<? foreach ($feed_items as $i => $item): ?>

    <article class="feed-item <?= $item->marked ? 'feed-item_big' : ''?>" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= $item->id; ?>">

        <time class="feed-item__time"><?= date_format(date_create($item->dt_create), 'd M'); ?></time>

        <? if ($item::FEED_PREFIX == 'article'): ?>

            <a class="feed-item__title js-emoji-included" href="/<?= $item->uri ?: 'article/' . $item->id;  ?>"><?= $item->title ?></a>
            <a class="feed-item__author" href="/user/<?= $item->author->id ?>">
                <img class="feed-item__author_photo" src="<?= $item->author->photo ?>" />
                <span class="feed-item__author_name"><?= $item->author->name ?></span>
            </a>

        <? else: ?>

            <!-- Вывод карточки курса -->
            <a class="feed-item__title" href="/<?= $item->uri ?: 'course/' . $item->id;  ?>"><?= $item->title ?></a>

        <? endif; ?>

    </article>

<? endforeach; ?>
