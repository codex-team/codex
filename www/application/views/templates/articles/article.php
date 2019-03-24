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
        <a class="course-navigation course-navigation--previous" href="<?= URL::site($previousArticle->uri ?: '/article/' . $previousArticle->id) ?>">
            <div class="course-navigation__icon course-navigation__icon--previous"></div>
            <div class="course-navigation__title"><?= HTML::chars($previousArticle->title) ?></div>
            <img class="course-navigation__avatar" src="<?= $previousArticle->author->photo ?>" itemprop="image">
            <div class="course-navigation__author"><?= HTML::chars($previousArticle->author->name) ?></div>
        </a>
    </div>
<? endif; ?>

<? if (isset($nextArticle)): ?>
    <div class="course-navigation-wrapper course-navigation-wrapper--next" name="js-course-navigation">
        <a class="course-navigation course-navigation--next" href="<?=URL::site($nextArticle->uri ?: '/article/' . $nextArticle->id); ?>">
            <div class="course-navigation__icon course-navigation__icon--next"></div>
            <div class="course-navigation__title"><?= HTML::chars($nextArticle->title) ?></div>
            <img class="course-navigation__avatar" src="<?= $nextArticle->author->photo ?>" itemprop="image">
            <div class="course-navigation__author"><?= HTML::chars($nextArticle->author->name) ?></div>
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
            "headline": "<?= HTML::chars($article->title) ?>",

            <? if (isset($article->dt_publish)): ?>
                "datePublished": "<?= date(DATE_ISO8601, strtotime($article->dt_publish)) ?>",
            <? else: ?>
                "datePublished": "<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>",
            <? endif; ?>

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
                "name": "<?= HTML::chars($article->author->name) ?>",
                "image": "<?= HTML::chars($article->author->photo_full) ?>"
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

    <? if (isset($article->dt_publish)): ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_publish)) ?>" />
    <? else: ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>" />
    <? endif; ?>

    <h1 class="article__title js-emoji-included" itemprop="headline">
        <?= HTML::chars($article->title) ?>
    </h1>
    <div class="article__info">
        <!-- Start of author's photo -->
        <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="authorName">
            <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $article->author->uri ? : 'user/' . $article->author->id ?>" />

            <a href="/<?= $article->author->uri ? : 'user/' . $article->author->id ?>">
                <img class="article__author-photo <?= $coauthor->id ? 'article__author-photo--with-coauthor' : '';?>" src="<?= $article->author->photo ?>" alt="<?= HTML::chars($article->author->name) ?>"  itemprop="image">
            </a>
        </div>
        <!-- End of author's photo -->
        <? if ($coauthor->id): ?>
            <!-- Start of coauthor's photo -->
            <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="coauthorName">
                <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $coauthor->uri ? : 'user/' . $coauthor->id ?>" />

                <a href="/<?= $coauthor->uri ? : 'user/' . $coauthor->id ?>">
                    <img class="article__author-photo article__author-photo--coauthor" src="<?= $coauthor->photo ?>" alt="<?= $coauthor->name ?>"  itemprop="image">
                </a>
            </div>
            <!-- End of coauthor's photo -->
        <? endif; ?>
        <div class="article__coauthors-info">
            <!-- Start of author's info -->
            <a class="article__author-name" itemprop="name" id="coauthorName" href="/<?= $article->author->uri ? : 'user/' . $article->author->id ?>">
                <?= HTML::chars($article->author->name) ?>
            </a>
            <!-- End of author's info -->
            <? if ($coauthor->id): ?>
                and
                <!-- Start of coauthor's info -->
                <a class="article__author-name" itemprop="name" id="authorName" href="/<?= $coauthor->uri ? : 'user/' . $coauthor->id ?>">
                    <?= HTML::chars($coauthor->name) ?>
                </a>
                <!-- End of coauthor's info -->
            <? endif; ?>
            <time class="article__date">
                <?= !is_null($article->dt_publish) ? Date::fuzzy_span(strtotime($article->dt_publish)) : Date::fuzzy_span(strtotime($article->dt_create)) ?>
            </time>
        </div>

        <? if (!empty($article->linked_article)): ?>

            <?
                if ($article->lang == 'en') {
                    $labelClass = 'article__read-on-item--russian';
                    $labelText = 'Russian';
                } else {
                    $labelClass = 'article__read-on-item--english';
                    $labelText = 'English';
                }

                $linkedArticle = '/article/' . $article->linked_article;
            ?>

            <div class="article__read-on">
                Read on
                <a class="article__read-on-item <?=$labelClass?>" href="<?= $linkedArticle ?>"><?= $labelText ?></a>
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
         * For articles created with Editor.js
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
            <?= $article->text; ?>
        <? endif; ?>

    </div>

    <? if(!empty($quiz)): ?>
        <?= View::factory('templates/quizzes/quiz', array('quizData' => $quiz->quiz_data)); ?>
    <? endif ?>

    <div class='reactions-page_voting'></div>


    <?= View::factory('templates/blocks/share', array('share' => array(
        'offer' => 'Если вам понравилась статья, поделитесь ссылкой на нее',
        'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'codex.so')) . '/' . $article->uri ?: 'article/' . $article->id,
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


<script type="text/javascript" src="/public/build/codex.bundle.js"></script>
<script>
    const parent = document.querySelector('.reactions-page_voting');
    let reactionsModule = new codex.reaction({parent: parent, title: '', reactions: ['👍', '❤', '👎']});
</script>