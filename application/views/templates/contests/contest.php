<div class="center_side clear">
    <article class="contest" itemscope itemtype="http://schema.org/CreativeWork ">

        <? if (!empty($contest->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($contest->dt_update)) ?>" />";
        <? endif; ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($contest->dt_create)) ?>" />

        <div class="disclaimer">конкурс от команды codex</div>
        <div class="line"></div>

        <h1 class="big_header" itemprop="headline">
            <?= $contest->title ?>
        </h1>

        <table class="contest_info">
            <tr>
                <td>начало <time><?= date('d M <b\r> Y', strtotime($contest->dt_create)) ?></time></td>
                <td>окончание <time><?= date('d M <b\r> Y', strtotime($contest->dt_close)) ?></time></td>
                <td>
                    <? if (!empty($contest->daysRemaining) && $contest->daysRemaining > 0): ?>
                        <?= $methods->num_decline($contest->daysRemaining, 'остался ' . $contest->daysRemaining . ' день', 'осталось ' . $contest->daysRemaining . ' дня', 'осталось ' . $contest->daysRemaining . ' дней'); ?>
                    <? else: ?>
                        <i class="icon-ok"></i> Скоро результаты
                    <? endif; ?>
                </td>
            </tr>
        </table>
        <div class="article_content"  itemprop="contestBody">
            <?= nl2br($contest->text) ?>
        </div>
    </article>
</div>
