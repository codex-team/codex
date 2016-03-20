<div class="center_side clear">
    <article class="article" itemscope itemtype="http://schema.org/Article">

        <? if (isset($article->dt_update)): ?>
            <meta itemprop="dateModified" content="<?= date(DATE_ISO8601, strtotime($article->dt_update)) ?>" />
        <? endif; ?>
        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($article->dt_create)) ?>" />

        <h1 class="big_header" itemprop="headline">
            <?= $article->title ?>
        </h1>
        <div class="article_info">
            <div class="ava_holder" itemscope itemtype="http://schema.org/Person" itemprop="author">

                <meta itemprop="url" href="https://ifmo.su/user/<?= $article->user_id ?>" />

                <time><?= Date::fuzzy_span(strtotime($article->dt_create)) ?></time>
                <span class="list_user_ava">
                    <img src="<?= $article->author->photo ?>" alt="https://ifmo.su/<?= $article->author->name ?>"  itemprop="image">
                </span>
                <a class="list_user_name" itemprop="name" href="https://ifmo.su/user/<?= $article->author->id ?>"><?= $article->author->name ?></a>
            </div>
        </div>
        <div class="article_content"  itemprop="articleBody">

            <?= nl2br($article->text) ?>
            <ul class="random_articles">

                <h3>Читайте далее</h3>
                <p>Мы расскажем вам о крутых и интересных технологиях и приведём примеры их использования в наших проектах.</p>

                <? foreach ($popularArticles as $popularArticle): ?>
                    <li><a href="<?= $popularArticle->uri ?>"><?= $popularArticle->title; ?></a></li>
                <? endforeach; ?>

            </ul>

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
                            <a href='/article/delcomment/<?= $comment->id ?>'>[удалить]</a>
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

        <h3 id="answer_username">Выскажи свое мнение</h3>

        <form method="POST" action="/article/addcomment">
            <input type="hidden" name="article_id" value="<?= $article->id ?>"/>
            <input type="hidden" name="parent_id" value="0" id="answer_to_comment"/>
            <label for="blankCommentTextarea">Комментарий</label>
            <textarea name="text" id="blankCommentTextarea" required></textarea>

            <p>
                <button class="master" id="blankSendButton">Добавить комментарий</button>
            </p>
        </form>
        </p>

                *******/ ?>

    </article>
</div>
