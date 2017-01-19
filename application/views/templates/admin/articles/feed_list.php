<div class="center_side clear">
    <? if (!$feed): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($feed as $item): ?>
                <tr class="list-item" data-type="<?= $item::FEED_PREFIX; ?>" data-id="<?= $item->id; ?>">
                    <td align="center" class="draggable">
                        <svg fill="#ccc" height="9.3px" width="21px" id="Layer_1" version="1.1" viewBox="0 0 512 224" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                                <rect height="32" width="512" y="0"/>
                                <rect height="32" width="512" y="96"/>
                                <rect height="32" width="512" y="192"/>
                            </g>
                        </svg>
                    </td>
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
