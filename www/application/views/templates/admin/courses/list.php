<div class="center_side clear">
    <div>
        <a class="button" href="/course/add">Добавить новый курс</a>
    </div>
    <? if (count($courses) == 0): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($courses as $current_course): ?>
                <? if ($current_course->is_removed != 1): ?>
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
                <? endif; ?>
            <? endforeach; ?>
        </table>    
    <? endif; ?>
</div>