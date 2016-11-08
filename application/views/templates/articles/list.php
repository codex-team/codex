<? foreach ($articles as $i => $article): ?>
    <article class="feed-item <?= $article->marked ? 'feed-item_big' : ''?>">

        <time class="feed-item__time"><?= date_format(date_create($article->dt_create), 'd M'); ?></time>

        <a class="feed-item__title" href="/<?= $article->uri ?: 'article/' . $article->id;  ?>"><?= $article->title ?></a>
        <a class="feed-item__author" href="/user/<?= $article->author->id ?>">
            <img class="feed-item__author_photo" src="<?= $article->author->photo ?>" />
            <span class="feed-item__author_name"><?= $article->author->name ?></span>
        </a>

    </article>
<? endforeach; ?>