<div class="center_side clear">
    <? if (count($requests) == 0): ?>
        <article class="article">
            <p>Заявок нет.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <?
                $prevIterationYear = null;
            ?>
            <? foreach ($requests as $request): ?>
                <? $currentItemYear = date('Y', strtotime($request['dt_add'])); ?>
                <? if ( $currentItemYear !== $prevIterationYear): ?>
                    <tr class="p_table__section">
                        <td colspan="6">
                            <?= $currentItemYear; ?>
                        </td>
                    </tr>
                <? endif;?>
                    <tr>
                        <td width="40" >
                            <div class="p_rel">
                                <div class="list_user_ava">
                                    <? if (!empty($request['user']->photo)): ?>
                                        <img src="<?= $request['user']->photo ?>">
                                    <? endif ?>
                                    <span class="numb">
                                        <?= $request['user']->id ?>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="user">
                            <? /* <?= $request['dt_add'] ?> */ ?>
                            <a class="name" href="/user/<?= $request['user']->id ?>"><?= $request['user']->name ?></a> <br />
                            <? if ($request['user']->github_uri): ?>
                                <a class="nick" href="//github.com/<?= $request['user']->github_uri ?>" target="_blank"><i class="icon-github-circled"></i><?= $request['user']->github_uri ?></a>
                            <? endif ?>
                            <? if ($request['email']): ?>
                                <a class="nick" href="mailto:<?= $request['email'] ?>" target="_blank"><i class="icon-link"></i><?= $request['email'] ?></a>
                            <? endif ?>
                        </td>
                        <td>
                            <? if ($request['user']->vk_uri || $request['user']->vk_id): ?>
                                <a href="//vk.com/<?= $request['user']->vk_uri ? $request['user']->vk_uri : 'id'.$request['user']->vk_id ?>" target="_blank"><i class="icon-vkontakte"></i></a>
                            <? endif ?>
                        </td>
                        <td>
                            <? if ($request['user']->fb_uri): ?>
                                <a href="//vk.com/<?= $request['user']->fb_uri?>" target="_blank"><i class="icon-facebook-squared"></i></a>
                            <? endif ?>
                        </td>
                        <td class="">
                            <?= nl2br($request['skills']); ?>
                        </td>
                        <td class="">
                            <?= nl2br($request['wishes']); ?>
                        </td>
                    </tr>
                <? $prevIterationYear = date('Y', strtotime($request['dt_add'])); ?>
            <? endforeach; ?>
        </table>
    <? endif; ?>
</div>
