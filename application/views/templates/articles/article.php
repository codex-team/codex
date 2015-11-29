<div class="center_side clear">
    <article class="article">

        <h1 class="big_header">
            <?= $article->title ?>
        </h1>

        <div class="article_info">
            <time><?= Date::fuzzy_span($article->dt_create) ?></time>
            <span class="list_user_ava">
                <img src="<?= $article->author->photo ?>" alt="<?= $article->author->name ?>">
            </span>
            <a class="list_user_name" href="/user/<?= $article->author->id ?>"><?= $article->author->name ?></a>
        </div>

        <div class="article_content">
            <?= Text::auto_p($article->text) ?>
        </div>


        <? /*

        <h3>Комментарии</h3>
        <?
        if ($comments) {
            $comment_level = [];
            foreach ($comments as $comment):

                foreach ($comment_level as $current_comment_level):
                    if ($current_comment_level > $comment->parent_id) {
                        array_pop($comment_level);
                    }
                endforeach;

                $level = count($comment_level) * 39;
                $comment_level[] = $comment->id;


                if ($comment->user_id == 0) {
                    $username = 'Гость';
                } else {
                    $username = Model_User::get($comment->user_id)->name;
                };
                ?>

                <div style='margin: 0 <?= $level ?>px'>

                    <p>
                        <? if ($comment->user_id == $user->id) {?>
                            <a href='/comment/del/<?= $comment->id ?>'>[удалить]</a>
                        <? } ?>
                        <a onclick="document.getElementById('answer_to_comment').value=<?= $comment->id ?>;
                            document.getElementById('blankCommentTextarea').innerHTML='<?= $username ?>, ';
                            document.getElementById('answer_username').innerHTML='Ваш ответ на комментарий пользователя <?= $username ?>: ' +
                            '<i> <?= $comment->text ?></i>';">[ответить]</a>

                        <a href="/user/<?=Model_User::get($comment->user_id)->id ?>"><b> <?= $username ?></b></a>:
                        <?= $comment->text ?>

                    </p>

                </div>
            <? endforeach; ?>
        <? } else { ?>
             <p>Комментариев нет</p>
        <? } ?>

        <p>
        <? if ($user->id): ?>
            <h3 id="answer_username">Выскажи свое мнение</h3>

            <form method="POST" action="/comment/add">
                <input type="hidden" name="article_id" value="<?= $article->id ?>"/>
                <input type="hidden" name="parent_id" value="0" id="answer_to_comment"/>
                <label for="blankCommentTextarea">Комментарий</label>
                <textarea name="text" id="blankCommentTextarea" required></textarea>

                <p>
                    <input type="submit" class="master" value="Добавить комментарий" />
                </p>
            </form>
        <? else: ?>
            <h3>Комментарии могут оставлять только зарегистрированные пользователи</h3>
        <? endif ?>
        </p>

                *******/ ?>

    </article>
</div>
