<? foreach ($feed_items as $i => $item): ?>

    <article class="feed-item <?= $item->marked ? 'feed-item_big' : ''?>" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= $item->id; ?>">

        <time class="feed-item__time"><?= date_format(date_create($item->dt_create), 'd M Y'); ?></time>

        <? if ($item::FEED_PREFIX == 'article'): ?>
            <div class="feed-item__info">
                <a class="feed-item__author" href="/user/<?= $item->author->id ?>">
                    <img class="<?= $item->coauthor->id ? 'feed-item__author_photo--with-coauthor' : ''; ?> feed-item__author_photo" src="<?= $item->author->photo ?>" alt="<?= $item->author->name ?>">
                </a>
                <? if ($item->coauthor->id): ?>
                    <a class="feed-item__author" href="/user/<?= $item->coauthor->id ?>">
                        <img class="feed-item__author_photo feed-item__author_photo--coauthor" src="<?= $item->coauthor->photo ?>" alt="<?= $item->coauthor->name ?>">
                    </a>
                <? endif; ?>
                <a class="feed-item__author_name" href="/user/<?= $item->author->id ?>"><?= $item->author->name ?></a>
                <? if ($item->coauthor->id): ?>
                    <a class="feed-item__author_name" href="/user/<?= $item->coauthor->id ?>">
                        <?= $item->coauthor->name ?>
                    </a>
                <? endif; ?>
            </div>

            <a class="feed-item__title js-emoji-included" href="/<?= $item->uri ?: 'article/' . $item->id;  ?>"><?= $item->title ?></a>

            <div class="feed-item__description">
                <?= $item->description ?>
            </div>

        <? else: ?>

            <!-- Вывод карточки курса -->
            <a class="feed-item__title" href="/<?= $item->uri ?: 'course/' . $item->id;  ?>"><?= HTML::chars($item->title) ?></a>

        <? endif; ?>

    </article>

<? endforeach; ?>