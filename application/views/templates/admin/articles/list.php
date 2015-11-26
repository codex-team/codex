<div class="center_side clear">
    <? if (count($articles) == 0): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="admin_tables">
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Автор</th>
                <th>Дата</th>
                <th>Просмотры</th>
                <td></td>
                <td></td>
            </tr>
            <? foreach ($articles as $current_article): ?>
<!--                TODO(#39) здесь не предусмотрен сценарий обработки удалённых статей -->
                <? if ($current_article->is_removed != 1): ?>
                    <tr>
                        <td><?= $current_article->id ?></td>
                        <td class="title">
                            <a href="/articles/<?= $current_article->id ?>">
                                <?= $current_article->title ?>
                            </a>
                        </td>
                        <td><?= $current_article->user_id ?></td>
                        <td>
                            <?  //Выводим дату изменений, если таковые были.
                                if(is_null($current_article->dt_update)):
                                    echo $current_article->dt_create;
                                else:
                                    echo $current_article->dt_update;
                                endif;
                            ?>
                        </td>
                        <td>Без просмотров</td>
<!--                        TODO(#44) Выводить счётчик просмотров-->
                        <td>Редактировать</td>
                        <td><a href='/article/delarticle/<?= $current_article->id ?>'>Удалить</a></td>
                    </tr>
                <? endif; ?>
            <? endforeach; ?>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="note_for_dates">Дата последних изменений.</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>    
    <? endif; ?>
</div>