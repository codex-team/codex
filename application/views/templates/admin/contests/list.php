<div class="center_side clear">
    <? if (count($contests) == 0): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($contests as $current_contest): ?>
<!--                TODO(#39) здесь не предусмотрен сценарий обработки удалённых статей -->
                <? //if ($current_article->is_removed != 1): ?>
                    <tr>
                        <td class="id"><?= $current_contest->id ?></td>
                        <td class="title">
                            <a href="/contest/<?= $current_contest->id ?>">
                                <b><?= $current_contest->title ?></b>
                            </a>
                        </td>
                        <td class="date">
                            <? if(is_null($current_contest->dt_update)): ?>
                                <?= $current_contest->dt_create ?>
                            <? else: ?>
                                <?= $current_contest->dt_update ?>
                            <? endif; ?>
                        </td>
                        <td class="date">
                            <b><?= $current_contest->dt_close  ?></b>
                        </td>
                        <td class="date">
                            <b><?= $current_contest->prize  ?></b>
                        </td>
                        <td class="counter">
                            <b>
                                <? if(empty($current_contest->winner->name)): ?>
                                    <?= 'Nobody' ?>
                                <? else: ?>
                                    <?= $current_contest->winner->name?>
                                <? endif; ?>
                            </b>
                            Winner
                        </td>
                        <td class="date">
                                <? if($current_contest->status == 0): ?>
                                    <?= 'Finished' ?>
                                <? elseif($current_contest->status == 1): ?>
                                    <?= 'Active' ?>
                                <? endif; ?>
                        </td>
                        <td>
                            <a href='/contests/delcontest/<?= $current_contest->id ?>'>
                                <i class="icon-cancel"></i>
                            </a>
                        </td>
                    </tr>
                <? //endif; ?>
            <? endforeach; ?>
        </table>    
    <? endif; ?>
</div>