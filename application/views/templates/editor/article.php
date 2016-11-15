<link rel="stylesheet" href="/public/css/article.css?v=<?= filemtime("public/css/article.css") ?>">

<div class="center_side clear">
    <article class="article" itemscope itemtype="http://schema.org/Article">

        <h1 class="article__title" itemprop="headline">
            <?= $article->title; ?>
        </h1>

        <div class="article_content"  itemprop="articleBody">

            <? for($i = 0; $i < count($render); $i++) : ?>
                <?= $render[$i]; ?>
            <? endfor; ?>

        </div>

    </article>
</div>
