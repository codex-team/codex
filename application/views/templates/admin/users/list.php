<div class="center_side clear">
    <? if (count($users) == 0): ?>
        <article class="article">
            <p>ользователей нет.</p>
        </article>
    <? else: ?>
        <table class="admin_tables">
            <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Права</th>
                <th>Github ID</th>
                <th>Дата</th>
                <td></td>
                <td></td>
            </tr>
            <? foreach ($users as $user): ?>
                <? if ($user->is_removed == 0): ?>
                    <tr>
                        <td><?= $user->id ?></td>
                        <td class="name">
                            <a href="/user/<?= $user->id ?>">
                                <?= $user->name ?>
                            </a>
                        </td>
                        <td><?= $user->role ?></td>
                        <td><?= $user->github_id ?></td>
                        <td>
                            <?  //Выводим дату изменений, если таковые были.
                                if(is_null($user->dt_update)):
                                    echo $user->dt_create;
                                else:
                                    echo $user->dt_update;
                                endif;
                            ?>
                        </td>
                        <td>Редактировать</td>
                        <td><a href='/admin/users/<?= $user->id ?>/deluser'>Удалить</a></td>
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
            </tr>
        </table>    
    <? endif; ?>
</div>