<div class="center_side clear">
    <? if (count($users) == 0): ?>
        <article class="article">
            <p>Пользователей нет.</p>
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
                                        <img src="<?= HTML::chars($user->photo) ?>">
                                    <? endif ?>
                                    <span class="numb">
                                        <?= $user->id ?>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="user">
                            <a class="name" href="/user/<?= $user->id ?>"><?= HTML::chars($user->name) ?></a> <br />
                            <? if ($user->github_uri): ?>
                                <a class="nick" href="//github.com/<?= HTML::chars($user->github_uri) ?>" target="_blank"><i class="icon-github-circled"></i><?= HTML::chars($user->github_uri) ?></a>
                            <? endif ?>
                        </td>
                        <td>
                            <? if ($user->vk_uri || $user->vk_id): ?>
                                <a href="//vk.com/<?= HTML::chars($user->vk_uri ? $user->vk_uri : 'id'.$user->vk_id) ?>" target="_blank"><i class="icon-vkontakte"></i></a>
                            <? endif ?>
                        </td>
                        <td>
                            <? if ($user->fb_uri): ?>
                                <a href="//vk.com/<?= HTML::chars($user->fb_uri) ?>" target="_blank"><i class="icon-facebook-squared"></i></a>
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
                        <td class="check">
                            <b>
                                <? $is_best = array_search($user->id, $bestDevs)!==false ?>
                                <input type="checkbox" id="<?= $user->id ?>" <?= $is_best?'checked':''; ?> class="developer-checkbox">
                            </b>
                            <label for="<?= $user->id ?>">best developer</label>
                        </td>
                    </tr>
                <? endif; ?>
            <? endforeach; ?>
        </table>
    <? endif; ?>
</div>
<script>
    codex.developer.bind();
</script>