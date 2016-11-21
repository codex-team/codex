<div class="center_side clear">
    <? if (count($courses) == 0): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($courses as $current_course): ?>
<!--                TODO(#39) здесь не предусмотрен сценарий обработки удалённых статей -->
                <? //if ($current_article->is_removed != 1): ?>
                    <tr>
                        <td class="id"><?= $current_course->id ?></td>
                        <td class="title">
                            <a href="/course/<?= $current_course->id ?>">
                                <b><?= $current_course->title ?></b>
                            </a>
                        </td>
                        <td class="date">
                            <? if(is_null($current_course->dt_update)): ?>
                                <?= $current_course->dt_create ?>
                            <? else: ?>
                                <?= $current_course->dt_update ?>
                            <? endif; ?>
                        </td>
                        <td>
                            <a href='/courses/delcourse/<?= $current_course->id ?>'>
                                <i class="icon-cancel"></i>
                            </a>
                        </td>
                    </tr>
                <? //endif; ?>
            <? endforeach; ?>
        </table>    
    <? endif; ?>
</div>