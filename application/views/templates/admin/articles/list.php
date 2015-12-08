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
                            <a class="name" href="/user/<?= $current_article->author->id ?>">
                                <?= $current_article->author->name ?>
                            </a> <br />
                            <a class="nick" href="//github.com/<?= $current_article->author->github_uri ?>" target="_blank">
                                <i class="icon-github-circled"></i>
                                <?= $current_article->author->github_uri ?>
                            </a>
                        </td>
                        <td class="date">
                            <? if(is_null($current_article->dt_update)): ?>
                                <?= $current_article->dt_create ?>
                            <? else: ?>
                                <?= $current_article->dt_update ?>
                            <? endif; ?>
                        </td>
                        <td class="counter">
                            <b><?= $current_article->views ?></b>
                            views
                        </td>
                        <td><a href='/article/delarticle/<?= $current_article->id ?>'><i class="icon-cancel"></i></a></td>
                    </tr>
            <? endforeach; ?>
        </table>    
    <? endif; ?>
</div>