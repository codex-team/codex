<? $url = !empty($article->uri) ? '/' . $article->uri : '/' . $article->id  ?>
<div class="article-card">
    <? if (!empty($article->cover)):?>
        <a class="article-card__cover" href="<?= $url ?>" style="background-image: url(<?= $article->cover ?>)">
        </a>
    <? endif; ?>

    <a class="article-card__title" href="<?= $url ?>">
        <?= $article->title ?>
    </a>

    <footer class="article-card__footer">
        <a class="article-card__photo" href="/user/<?= $article->author->id ?>">
            <img src="<?= $article->author->photo ?>" alt="<?= $article->author->name ?>">
        </a>
        <a class="article-card__user-name" href="/user/<?= $article->author->id ?>">
            <?= $article->author->name ?>
        </a>
        <div class="article-card__read-time">
            <?= $article->read_time ?> min read
        </div>
    </footer>
</div>
