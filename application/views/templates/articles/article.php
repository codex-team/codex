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

<div class="center_side">
    <article class="article" itemscope itemtype="http://schema.org/Article">

        <? if (isset($article->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($article->dt_update)) ?>" />
        <? endif; ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>" />

        <h1 class="article__title js-emoji-included" itemprop="headline">
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

        <div class="article_content js-emoji-included <?= !empty($article->text) ? 'article_content--old' : '' ?>" itemprop="articleBody">

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
            <p>Мы расскажем вам о крутых и интересных технологиях и приведём примеры их использования в наших проектах.</p>

            <? foreach ($popularArticles as $popularArticle): ?>
                <li><a href="/<?= $popularArticle->uri ?: ('article/' . $popularArticle->id) ; ?>" class="js-emoji-included"><?= $popularArticle->title; ?></a></li>
            <? endforeach; ?>

        </ul>

    </article>
</div>

<div class="center_side clear">
    <? if (isset($articlesFromCourse)) : ?>
        <?=View::factory('templates/articles/course_list')
            ->set('articles', $articlesFromCourse)
            ->set('course', $course)
        ?>
    <? endif; ?>
</div>

<script>
    // codex.fixColumns.init(document.getElementsByName('js-course-navigation'));
    codex.docReady(function () {

        codex.simpleCode.init(".article__code");

    });
</script>
