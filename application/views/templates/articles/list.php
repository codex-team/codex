<div class="center_side clearfix articles_list">
    <? foreach ($articles as $i => $article): ?>
        <article class="blog_item <?= $article->marked ? 'blog_item_big' : ''?>">

            <time class="time"><?= date_format(date_create($article->dt_create), 'd M'); ?></time>

            <a class="title" href="/<?= $article->uri ?: 'article/' . $article->id;  ?>"><?= $article->title ?></a>
            <a class="author" href="/user/<?= $article->author->id ?>">
                <img src="<?= $article->author->photo ?>" />
                <span class="name"><?= $article->author->name ?></span>
            </a>

        </article>
    <? endforeach; ?>
</div>