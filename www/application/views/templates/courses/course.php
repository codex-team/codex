<article class="article course-page" itemscope itemtype="http://schema.org/CreativeWork ">

    <? if (!empty($course->dt_update)): ?>
        <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($course->dt_update)) ?>" />
    <? endif; ?>

    <? if (isset($course->dt_publish)): ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($course->dt_publish)) ?>" />
    <? else: ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($course->dt_create)) ?>" />
    <? endif; ?>

    <h1 class="article__title js-emoji-included" itemprop="headline">
        <?= HTML::chars($course->title) ?>
    </h1>

    <?
        $articlesFromCourse = $course->course_articles;
        $courseAuthors      = $course->course_authors;

        $singleAuthor       = count($courseAuthors) == 1;
        $twoAuthors         = count($courseAuthors) == 2;
        $multipleAuthors    = count($courseAuthors) > 2;

        if ($articlesFromCourse) {
            $course->author = $courseAuthors[0];
        }

        if ($twoAuthors) {
            $coauthor = $courseAuthors[1];
        }

    ?>

    <div class="article__info">
        <? if ($articlesFromCourse): ?>

            <? if ($singleAuthor): ?>
                <!-- Start of author's photo -->
                <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="authorName">
                    <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $course->author->uri ? : 'user/' . $course->author->id ?>" />

                    <a href="/<?= $course->author->uri ? : 'user/' . $course->author->id ?>">
                        <img class="article__author-photo <?= $twoAuthors ? 'article__author-photo--with-coauthor' : '';?>" src="<?= $course->author->photo ?>" alt="<?= HTML::chars($course->author->name) ?>"  itemprop="image">
                    </a>
                </div>
                <!-- End of author's photo -->
            <? endif; ?>

            <? if ($twoAuthors): ?>
                <!-- Start of author's photo -->
                <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="authorName">
                    <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $course->author->uri ? : 'user/' . $course->author->id ?>" />

                    <a href="/<?= $course->author->uri ? : 'user/' . $course->author->id ?>">
                        <img class="article__author-photo <?= $twoAuthors ? 'article__author-photo--with-coauthor' : '';?>" src="<?= $course->author->photo ?>" alt="<?= HTML::chars($course->author->name) ?>"  itemprop="image">
                    </a>
                </div>
                <!-- End of author's photo -->
                <!-- Start of coauthor's photo -->
                <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="coauthorName">
                    <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $coauthor->uri ? : 'user/' . $coauthor->id ?>" />

                    <a href="/<?= $coauthor->uri ? : 'user/' . $coauthor->id ?>">
                        <img class="article__author-photo article__author-photo--coauthor" src="<?= $coauthor->photo ?>" alt="<?= $coauthor->name ?>"  itemprop="image">
                    </a>
                </div>
                <!-- End of coauthor's photo -->
            <? endif; ?>

            <? if ($multipleAuthors): ?>
                <? foreach ($courseAuthors as $item): ?>
                    <!-- Start of coauthor's photo -->
                    <div class="article__author article__author--multiple" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="coauthorName">
                        <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $item->uri ? : 'user/' . $item->id ?>" />

                        <a href="/<?= $item->uri ? : 'user/' . $item->id ?>">
                            <img class="article__author-photo article__author-photo--coauthor" src="<?= $item->photo ?>" alt="<?= $item->name ?>"  itemprop="image">
                        </a>
                    </div>
                    <!-- End of coauthor's photo -->
                <? endforeach; ?>
            <? endif; ?>

            <div class="article__coauthors-info">
                <? if ($singleAuthor): ?>
                    <!-- Start of author's info -->
                    <a class="article__author-name" itemprop="name" id="coauthorName" href="/<?= $course->author->uri ? : 'user/' . $course->author->id ?>">
                        <?= HTML::chars($course->author->name) ?>
                    </a>
                    <!-- End of author's info -->
                <? endif; ?>

                <? if ($twoAuthors): ?>
                    <!-- Start of author's info -->
                    <a class="article__author-name" itemprop="name" id="coauthorName" href="/<?= $course->author->uri ? : 'user/' . $course->author->id ?>">
                        <?= HTML::chars($course->author->name) ?>
                    </a>
                    <!-- End of author's info -->
                    and
                    <!-- Start of coauthor's info -->
                    <a class="article__author-name" itemprop="name" id="authorName" href="/<?= $coauthor->uri ? : 'user/' . $coauthor->id ?>">
                        <?= HTML::chars($coauthor->name) ?>
                    </a>
                    <!-- End of coauthor's info -->
                <? endif; ?>

                <time class="article__date">
                    <?= !is_null($course->dt_publish) ? Date::fuzzy_span(strtotime($course->dt_publish)) : Date::fuzzy_span(strtotime($course->dt_create)) ?>
                </time>
            </div>
        <? endif; ?>
    </div>

    <div class="article-content js-emoji-included" itemprop="courseBody">
        <p>
            <?= HTML::chars($course->text) ?>
        </p>
    </div>

    <div class="course-page__feed-wrapper">
        <div class="feed">
            <? foreach ($articlesFromCourse as $i => $item): ?>

                <?= View::factory('templates/articles/feed_list_item', array( 'item' => $item)); ?>

            <? endforeach; ?>
        </div>
    </div>

    <?= View::factory('templates/blocks/share', array('share' => array(
        'offer' => 'Расскажите об этом курсе своим подписчикам',
        'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/course/' . $course->id,
        'title' => HTML::chars($course->title),
        'desc'  => HTML::chars($course->description),
    ))); ?>

</article>
