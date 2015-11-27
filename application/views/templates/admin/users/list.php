<div class="center_side clear">
    <? if (count($users) == 0): ?>
        <article class="article">
            <p>ользователей нет.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($users as $user): ?>
                <? if ($user->is_removed == 0): ?>
                    <tr>
                        <td class="id"><?= $user->id ?></td>
                        <td width="40" >
                            <div class="p_rel">
                                <div class="list_user_ava">
                                    <? if (!empty($user->photo)): ?>
                                        <img src="<?= $user->photo ?>">
                                    <? endif ?>
                                    <span class="numb">
                                        <?= $user->id ?>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="user">
                            <a class="name" href="/user/<?= $user->id ?>"><?= $user->name ?></a> <br />
                            <a class="nick" href="//github.com/<?= $user->github_uri ?>" target="_blank"><i class="icon-github-circled"></i><?= $user->github_uri ?></a>
                        </td>
                        <td>
                            <? if ($user->vk_uri): ?>
                                <a href="//vk.com/<?= $user->vk_uri?>" target="_blank"><i class="icon-vkontakte"></i></a>
                            <? endif ?>
                        </td>
                        <td>
                            <? if ($user->fb_uri): ?>
                                <a href="//vk.com/<?= $user->fb_uri?>" target="_blank"><i class="icon-facebook-squared"></i></a>
                            <? endif ?>
                        </td>
                        <td class="counter">
                            <b>0</b>
                            commits
                        </td>
                        <td class="counter">
                            <b>0</b>
                            articles
                        </td>
                    </tr>
                <? endif; ?>
            <? endforeach; ?>
        </table>
    <? endif; ?>
</div>