<article class="contest" itemscope itemtype="http://schema.org/CreativeWork ">
    <div class="center_side clear">

        <? if (!empty($contest->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($contest->dt_update)) ?>" />
        <? endif; ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($contest->dt_create)) ?>" />

        <div class="disclaimer">конкурс от команды codex</div>
        <div class="line"></div>

        <h1 class="article__title" itemprop="headline">
            <?= $contest->title ?>
        </h1>

        <table class="contest_info">
            <tr>
                <td>начало <time><?= date('d M <b\r> Y', strtotime($contest->dt_create)) ?></time></td>
                <td>окончание <time><?= date('d M <b\r> Y', strtotime($contest->dt_close)) ?></time></td>
                <td>
                    <? if (!empty($contest->daysRemaining) && $contest->daysRemaining > 0): ?>
                        <?= $methods->num_decline($contest->daysRemaining, 'остался ' . $contest->daysRemaining . ' день', 'осталось ' . $contest->daysRemaining . ' дня', 'осталось ' . $contest->daysRemaining . ' дней'); ?>
                    <? elseif(!$contest->winner): ?>
                        <i class="icon-ok"></i> Скоро результаты
                    <? else: ?>
                        <i class="icon-ok"></i> Конкурс завершен
                    <? endif; ?>
                </td>
            </tr>
        </table>

        <? if ($contest->winner): ?>
            <div class="winner">
                <div class="title">победитель определен</div>
                <div class="name"><?= $contest->winner->name ?></div>
                <? if ($contest->winner->github_uri): ?>
                    <a class="nick" href="/user/<?= $contest->winner->id ?>">
                        <?= '@' . $contest->winner->github_uri ?>
                    </a>
                <? endif ?>
                <? if ($contest->results): ?>
                    <a class="toggler" href="/<?=$contest->uri ?: ('contest/'. $contest->id); ?>#results">лучшие работы <i class="icon-down-big"></i></a>
                <? endif; ?>
            </div>
        <? endif ?>
    </div>
    <div class="center_side">
        <div class="article-content"  itemprop="contestBody">
            <?= nl2br($contest->text) ?>
        </div>
    </div>
    <? if ($contest->results): ?>
        <div class="result" id="results">
            <div class="center_side">
                <h2>Результаты</h2>
            </div>
            <?= $contest->results ?>
        </div>
    <? endif ?>

    <div class="center_side">
        <?= View::factory('templates/blocks/share', array('share' => array(
            'offer' => 'Расскажите об этом конкурсе своим подписчикам',
            'url'   => 'https://' . Arr::get($_SERVER, 'HTTP_HOST', Arr::get($_SERVER, 'SERVER_NAME', 'ifmo.su')) . '/contest/' . $contest->id,
            'title' => htmlspecialchars($contest->title),
            'desc'  => htmlspecialchars($contest->description),
        ))); ?>
    </div>



</article>
