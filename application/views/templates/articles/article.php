<div class="center_side clear">
    <article class="article" itemscope itemtype="http://schema.org/Article">

        <? if (isset($article->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($article->dt_update)) ?>" />
        <? endif; ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>" />

        <h1 class="big_header" itemprop="headline">
            <?= $article->title ?>
        </h1>
        <div class="article_info">
            <div class="ava_holder" itemscope itemtype="http://schema.org/Person" itemprop="author">

                <meta itemprop="url" href="https://ifmo.su/user/<?= $article->user_id ?>" />

                <time><?= Date::fuzzy_span(strtotime($article->dt_create)) ?></time>
                <span class="list_user_ava">
                    <img src="<?= $article->author->photo ?>" alt="https://ifmo.su/<?= $article->author->name ?>"  itemprop="image">
                </span>
                <a class="list_user_name" itemprop="name" href="https://ifmo.su/user/<?= $article->author->id ?>"><?= $article->author->name ?></a>
            </div>
        </div>
        <div class="article_content"  itemprop="articleBody">
            
            <!-- For articles where Codex.Editor is used -->
            <? for($i = 0; $i < count($article->blocks); $i++) : ?>
                <?= $article->blocks[$i]; ?>
            <? endfor; ?>

            <!-- For old articles -->
            <? if (!empty($article->text)) : ?>
                <?=$article->text; ?>
            <? endif; ?>

        </div>

        <div class="center_side">
            <?= View::factory('templates/blocks/share', array('share' => array(
                'offer' => 'Если вам понравилась статья, поделитесь ссылкой на нее',
                'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/article/' . $article->id,
                'title' => html_entity_decode($article->title),
                'desc'  => html_entity_decode($article->description),
            ))); ?>
        </div>

        <ul class="random_articles">
            <h3>Читайте далее</h3>
            <p>Мы расскажем вам о крутых и интересных технологиях и приведём примеры их использования в наших проектах.</p>

            <? foreach ($popularArticles as $popularArticle): ?>
                <li><a href="/<?= $popularArticle->uri ?: ('article/' . $popularArticle->id) ; ?>"><?= $popularArticle->title; ?></a></li>
            <? endforeach; ?>

        </ul>

    </article>
</div>
