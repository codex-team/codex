<div class="center_side clear">
    <? if (count($feed) == 0): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($feed as $item): ?>
                <tr class="draggable list-item" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= $item->id; ?>">
                    <td class="id"><?= $item->id ?></td>
                    <td class="id"><?= $item::FEED_PREFIX ?></td>
                    <td class="title">
                        <a href="/<?= $item::FEED_PREFIX ?>/<?= $item->id ?>">
                            <b><?= $item->title ?></b>
                        </a>
                    </td>
                    <td class="date">
                        <? if(is_null($item->dt_update)): ?>
                            <?= $item->dt_create ?>
                        <? else: ?>
                            <?= $item->dt_update ?>
                        <? endif; ?>
                    </td>
                    <td class="id">
                        <?= $item->marked?'big':'small' ?>
                    </td>
                </tr>
            <? endforeach; ?>
        </table>
    <? endif; ?>
</div>
