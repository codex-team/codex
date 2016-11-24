<link rel="stylesheet" href="/public/css/article.css?v=<?= filemtime("public/css/article.css") ?>">

<div class="center_side clear">

    <?=View::factory('templates/articles/course_list'); ?>

    <article class="article" itemscope itemtype="http://schema.org/Article">

        <? if (isset($article->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($article->dt_update)) ?>" />
        <? endif; ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>" />

        <h1 class="article__title" itemprop="headline">
            <?= $article->title ?>
        </h1>

        <div class="article-info">
            <div class="article-info__author" itemscope itemtype="http://schema.org/Person" itemprop="author">

                <meta itemprop="url" href="https://ifmo.su/user/<?= $article->user_id ?>" />

                <time class="article-info__date"><?= Date::fuzzy_span(strtotime($article->dt_create)) ?></time>
                <img class="article-info__photo" src="<?= $article->author->photo ?>" alt="https://ifmo.su/<?= $article->author->name ?>"  itemprop="image">
                <a class="article-info__name" itemprop="name" href="https://ifmo.su/user/<?= $article->author->id ?>"><?= $article->author->name ?></a>

            </div>
        </div>

        <div class="article_content" itemprop="articleBody">

            <?
                /**
                * For articles craeted with Codex.Editor
                */
            ?>
            <? foreach ($article->blocks as $block): ?>
                <?= $block; ?>
            <? endforeach; ?>

            <?
                /**
                * For articles with HTML content (old editor mode)
                */
            ?>
            <? if (!empty($article->text)) : ?>
                <?=$article->text; ?>
            <? endif; ?>

        </div>


        <?= View::factory('templates/blocks/share', array('share' => array(
            'offer' => 'Если вам понравилась статья, поделитесь ссылкой на нее',
            'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/article/' . $article->id,
            'title' => html_entity_decode($article->title),
            'desc'  => html_entity_decode($article->description),
        ))); ?>


        <ul class="random_articles">
            <h3>Читайте далее</h3>
            <p>Мы расскажем вам о крутых и интересных технологиях и приведём примеры их использования в наших проектах.</p>

            <? foreach ($popularArticles as $popularArticle): ?>
                <li><a href="/<?= $popularArticle->uri ?: ('article/' . $popularArticle->id) ; ?>"><?= $popularArticle->title; ?></a></li>
            <? endforeach; ?>

        </ul>

    </article>

    <?=View::factory('templates/articles/course_list'); ?>
</div>
