<?
    $url = !empty($article->uri) ? '/' . $article->uri : '/article/' . $article->id;
    $hasCoauthor = !is_null($article->coauthors->user_id);
    $selectedCoauthor = Model_Coauthors::get($article->id);
    $coauthor =  Model_User::get($selectedCoauthor->user_id);
?>
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
            <img class="<?= $hasCoauthor ? 'article-card__photo--with-coauthor' : '';?>" src="<?= $article->author->photo ?>" alt="<?= $article->author->name ?>">
        </a>
        <? if ($hasCoauthor): ?>
            <a class="article-card__photo" href="/user/<?= $coauthor->id ?>">
                <img class="article-card__photo--coauthor" src="<?= $coauthor->photo ?>" alt="<?= $coauthor->name ?>">
            </a>
        <? endif; ?>
        <a class="article-card__user-name" href="/user/<?= $article->author->id ?>">
            <?= $article->author->name ?>
        </a>
        <? if ($hasCoauthor): ?>
            and
        <a class="article-card__user-name" href="/user/<?= $coauthor->id ?>">
            <?= $coauthor->name ?>
        </a>
        <? endif; ?>
        <div class="article-card__read-time">
            <?= $article->read_time ?> min read
        </div>
    </footer>
</div>
