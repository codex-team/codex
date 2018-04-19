<article class="course" itemscope itemtype="http://schema.org/CreativeWork ">
    <div class="center_side clear">

        <? if (!empty($course->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($course->dt_update)) ?>" />
        <? endif; ?>

        <? if (isset($course->dt_publish)): ?>
            <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($course->dt_publish)) ?>" />
        <? else: ?>
            <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($course->dt_create)) ?>" />
        <? endif; ?>

        <div class="disclaimer">Курс от команды CodeX</div>
        <div class="line"></div>

        <h1 class="article__title" itemprop="headline">
            <?= $course->title ?>
        </h1>

        <table class="course_info">
            <tr>
                <td>дата
                    <time>
                        <?= !is_null($course->dt_publish) ? Date::fuzzy_span(strtotime($course->dt_publish)) : Date::fuzzy_span(strtotime($course->dt_create)) ?>
                    </time>
                </td>
            </tr>
        </table>

    </div>
    <div class="center_side">
        <div class="article-content"  itemprop="courseBody">
            <?= nl2br($course->text) ?>
        </div>
    </div>

    <div class="center_side">
        <?= View::factory('templates/blocks/share', array('share' => array(
            'offer' => 'Расскажите об этом курсе своим подписчикам',
            'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/course/' . $course->id,
            'title' => HTML::chars($course->title),
            'desc'  => HTML::chars($course->description),
        ))); ?>
    </div>



</article>
