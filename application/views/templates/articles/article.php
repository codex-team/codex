<div class="center_side clear">
    <? if (isset($articlesFromCourse)): ?>
        <?= View::factory('templates/articles/course_list')
            ->set('articles', $articlesFromCourse)
            ->set('course', $course)
        ?>
    <? endif; ?>
</div>

<? if (isset($previousArticle)): ?>
    <div class="course-navigation-wrapper course-navigation-wrapper--previous" name="js-course-navigation">
        <a class="course-navigation course-navigation--previous" href="<?=URL::site($previousArticle->uri ?: '/article/' . $previousArticle->id); ?>">
            <div class="course-navigation__icon course-navigation__icon--previous"></div>
            <div class="course-navigation__title"><?=$previousArticle->title; ?></div>
            <img class="course-navigation__avatar" src="<?=$previousArticle->author->photo; ?>" itemprop="image">
            <div class="course-navigation__author"><?=$previousArticle->author->name; ?></div>
        </a>
    </div>
<? endif; ?>

<? if (isset($nextArticle)): ?>
    <div class="course-navigation-wrapper course-navigation-wrapper--next" name="js-course-navigation">
        <a class="course-navigation course-navigation--next" href="<?=URL::site($nextArticle->uri ?: '/article/' . $nextArticle->id); ?>">
            <div class="course-navigation__icon course-navigation__icon--next"></div>
            <div class="course-navigation__title"><?=$nextArticle->title; ?></div>
            <img class="course-navigation__avatar" src="<?=$nextArticle->author->photo; ?>" itemprop="image">
            <div class="course-navigation__author"><?=$nextArticle->author->name; ?></div>
        </a>
    </div>
<? endif; ?>

<article class="article" itemscope itemtype="http://schema.org/Article">

    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $article->uri ?>"
            },
            "headline": "<?= $article->title; ?>",
            "datePublished": "<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>",

            <? if (isset($article->cover)): ?>
                "image": {
                    "@type": "ImageObject",
                    "url": "<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $article->cover ?>"
                },
            <? endif; ?>
            
            <? if (isset($article->dt_update)): ?>
                "dateModified": "<?= date(DATE_ISO8601, strtotime($article->dt_update)) ?>",
            <? endif; ?>

            "author": {
                "@type": "Person",
                "name": "<?= $article->author->name ?>",
                "image": "<?= $article->author->photo_full ?>"
            },
            "publisher": {
                "@type": "Organization",
                "name": "CodeX",
                "logo": {
                    "@type": "ImageObject",
                    "url": "<?= Model_Methods::getDomainAndProtocol(); ?>/public/app/img/meta_img.png"
                }
            }
        }
    </script>

    <? if (isset($article->dt_update)): ?>
        <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($article->dt_update)) ?>" />
    <? endif; ?>
    <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>" />

    <h1 class="article__title js-emoji-included" itemprop="headline">
        <?= $article->title ?>
    </h1>

    <div class="article__info">
        <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author">
            <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $article->author->uri ? : 'user/' . $article->author->id ?>" />

            <a href="/<?= $article->author->uri ? : 'user/' . $article->author->id ?>">
                <img class="article__author-photo" src="<?= $article->author->photo ?>" alt="<?= $article->author->name ?>"  itemprop="image">
            </a>
            <a class="article__author-name" itemprop="name" href="/<?= $article->author->uri ? : 'user/' . $article->author->id ?>">
                <?= $article->author->name ?>
            </a>
            <time class="article__date">
                <?= Date::fuzzy_span(strtotime($article->dt_create)) ?>
            </time>
        </div>

        <? if (!empty($article->englishText)): ?>
            <div class="article__read-on">
                Read on
                <span class="article__read-on-item article__read-on-item--english">English</span>
                <span class="article__read-on-item article__read-on-item--russian">Russian</span>
            </div>
        <? else: ?>
            <div class="article__read-time">
                <?= $article->read_time ?> min read
            </div>
        <? endif; ?>
    </div>

    <div class="article-content js-emoji-included" itemprop="articleBody">

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
        <? if (!empty($article->text) && empty($article->blocks)) : ?>
            <?=$article->text; ?>
        <? endif; ?>

    </div>

    <? if(!empty($quiz)): ?>
        <?= View::factory('templates/quizzes/quiz', array('quizData' => $quiz->quiz_data)); ?>
    <? endif ?>

    <?= View::factory('templates/blocks/share', array('share' => array(
        'offer' => 'Если вам понравилась статья, поделитесь ссылкой на нее',
        'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/' . $article->uri ?: 'article/' . $article->id,
        'title' => html_entity_decode($article->title),
        'desc'  => html_entity_decode($article->description),
    ))); ?>

    <div class="vk_groups" id="vk_groups"></div>

    <ul class="random_articles">
        <h3>Читайте далее</h3>
        <p>Мы рассказываем об интересных технологиях и делимся опытом их использования.</p>

        <? foreach ($popularArticles as $popularArticle): ?>
            <?= View::factory('templates/articles/card', array('article'=> $popularArticle))->render(); ?>
             <? /*<li><a href="/<?= $popularArticle->uri ?: ('article/' . $popularArticle->id) ; ?>" class="js-emoji-included"><?= $popularArticle->title; ?></a></li> */ ?>
        <? endforeach; ?>

    </ul>

</article>


<div class="center_side clear">
    <? if (isset($articlesFromCourse)) : ?>
        <?=View::factory('templates/articles/course_list')
            ->set('articles', $articlesFromCourse)
            ->set('course', $course)
        ?>
    <? endif; ?>
</div>