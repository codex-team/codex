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
        $courseAuthors = $course->course_authors;
        $multipleCourseAuthors = count($courseAuthors) > 1 ? true : false;

        if ($courseAuthors) {
            $firstAuthor = $courseAuthors[0];
        }

        if ($multipleCourseAuthors) {
            $lastAuthor = $courseAuthors[count($courseAuthors) - 1];
        }

    ?>

    <div class="article__info">
        <!-- Start of author's photo -->
        <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="authorName">
            <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $firstAuthor->uri ? : 'user/' . $firstAuthor->id ?>" />

            <a href="/<?= $firstAuthor->uri ? : 'user/' . $firstAuthor->id ?>">
                <img class="article__author-photo <?= $multipleCourseAuthors ? 'article__author-photo--with-coauthor' : '';?>" src="<?= $firstAuthor->photo ?>" alt="<?= HTML::chars($firstAuthor->name) ?>"  itemprop="image">
            </a>
        </div>
        <!-- End of author's photo -->
        <? if ($multipleCourseAuthors): ?>
            <!-- Start of coauthor's photo -->
            <div class="article__author" itemscope itemtype="http://schema.org/Person" itemprop="author" itemref="coauthorName">
                <meta itemprop="url" href="<?= Model_Methods::getDomainAndProtocol(); ?>/<?= $lastAuthor->uri ? : 'user/' . $lastAuthor->id ?>" />

                <a href="/<?= $lastAuthor->uri ? : 'user/' . $lastAuthor->id ?>">
                    <img class="article__author-photo article__author-photo--coauthor" src="<?= $lastAuthor->photo ?>" alt="<?= $lastAuthor->name ?>"  itemprop="image">
                </a>
            </div>
            <!-- End of coauthor's photo -->
        <? endif; ?>
        <div class="article__coauthors-info">
            <!-- Start of author's info -->
            <a class="article__author-name" itemprop="name" id="authorName" href="/<?= $firstAuthor->uri ? : 'user/' . $firstAuthor->id ?>">
                <?= HTML::chars($firstAuthor->name) ?>
            </a>
            <!-- End of author's info -->
            <? if ($multipleCourseAuthors): ?>
                and
                <!-- Start of coauthor's info -->
                <a class="article__author-name" itemprop="name" id="coauthorName" href="/<?= $lastAuthor->uri ? : 'user/' . $lastAuthor->id ?>">
                    <?= HTML::chars($lastAuthor->name) ?>
                </a>
                <!-- End of coauthor's info -->
            <? endif; ?>
            <time class="article__date">
                <?= !is_null($course->dt_publish) ? Date::fuzzy_span(strtotime($course->dt_publish)) : Date::fuzzy_span(strtotime($course->dt_create)) ?>
            </time>
        </div>
    </div>

    <div class="article-content js-emoji-included" itemprop="courseBody">
        <p>
            <?= HTML::chars($course->text) ?>
        </p>

        <div class="center_side">
            <div class="course course--progress-left">
                <ul class="course-list">
                    <? foreach ($articlesFromCourse as $article) : ?>
                        <li class="course-list__item">
                            <a href="<?=URL::site( '/article/ ' . $article->id ); ?>" class="course-list__link course-list__link--black">
                                <?= $article->title; ?>
                            </a>
                        </li>
                    <? endforeach; ?>
                </ul>
            </div>
        </div>
    </div>

    <?= View::factory('templates/blocks/share', array('share' => array(
        'offer' => 'Расскажите об этом курсе своим подписчикам',
        'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/course/' . $course->id,
        'title' => HTML::chars($course->title),
        'desc'  => HTML::chars($course->description),
    ))); ?>

</article>
