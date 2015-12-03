<div class="center_side clear">
    <? if (count($articles) == 0): ?>
        <article class="article">
            <p>Здесь пока нет статей.</p>
        </article>
    <? else: ?>
        <table class="p_table">
            <? foreach ($articles as $current_article): ?>
                    <tr>
                        <td class="id"><?= $current_article->id ?></td>
                        <td class="title">
                            <a href="/article/<?= $current_article->id ?>">
                                <b><?= $current_article->title ?></b>
                                <? if ($current_article->is_removed): ?>
                                    <i>(deleted)</i>
                                <? endif; ?>

                                <? if ($current_article->is_published == false): ?>
                                    <i>(unpublished)</i>
                                <? endif; ?>
                            </a>
                        </td>
                        <td class="user">
                            <? foreach ($users as $user): ?>
                                <? if ($user['id'] == $current_article->user_id): ?>
                                    <a class="name" href="/user/<?= $user['id'] ?>"><?= $user['name'] ?></a> <br />
                                    <a class="nick" href="//github.com/<?= $user['github_uri'] ?>" target="_blank">
                                        <i class="icon-github-circled"></i>
                                        <?= $user['github_uri'] ?>
                                    </a>
                                <? endif; ?>
                            <? endforeach; ?>
                        </td>
                        <td class="date">
                            <?
                                if(is_null($current_article->dt_update)):
                                    echo $current_article->dt_create;
                                else:
                                    echo $current_article->dt_update;
                                endif;
                            ?>
                        </td>
                        <td class="counter">
                            <b><?= array_shift($views) ?></b>
                            views
                        </td>
                        <td><a href='/article/delarticle/<?= $current_article->id ?>'><i class="icon-cancel"></i></a></td>
                    </tr>
                <? endif; ?>
            <? endforeach; ?>
        </table>    
    <? endif; ?>
</div>