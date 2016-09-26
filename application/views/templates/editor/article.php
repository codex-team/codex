<div class="center_side clear">
    <article class="article" itemscope itemtype="http://schema.org/Article">

        <h1 class="big_header" itemprop="headline">
            <?= $article->title; ?>
        </h1>
        <div class="article_info">
            <div class="ava_holder" itemscope itemtype="http://schema.org/Person" itemprop="author">

                <meta itemprop="url" href="https://ifmo.su/user/<?= $article->user_id; ?>" />

            </div>
        </div>
        <div class="article_content"  itemprop="articleBody">

            <? for($i = 0; $i < count($render); $i++) : ?>
                <?= $render[$i]; ?>
            <? endfor; ?>

        </div>

    </article>
</div>
