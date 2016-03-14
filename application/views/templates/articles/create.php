<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/article/add" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">

            <label for="title">Заголовок:</label>
            <? if (isset($article)): ?>
                <input type="hidden" name="article_id" value="<?= $article->id; ?>">
                <input type="text" name="title" value="<?= $article->title; ?>">
                <label for="description">Описание:</label>
                <textarea name="description" id="codex_editor" cols="5" rows="5"><?= $article->description ?></textarea>
            <? else: ?>
                <input type="text" name="title">
                <label for="description">Описание:</label>
                <textarea name="description" id="codex_editor" cols="5" rows="5"></textarea>
            <? endif; ?>

            <label for="article_text">Содержание:</label>
            <? if (isset($article)): ?>
                <textarea name="text" id="codex_editor" cols="30" rows="10"><?= $article->text ?>      </textarea>
            <? else: ?>
                <textarea name="text" id="codex_editor" cols="30" rows="10"></textarea>
            <? endif; ?>


            <div>
                <? if (isset($article) && $article->is_published): ?>
                    <p><input type="checkbox" name="is_published" value="1" checked> Опубликовать</p>
                <? else: ?>
                    <p><input type="checkbox" name="is_published"> Опубликовать</p>
                <? endif; ?>
            </div>
            <input type="submit" value="Сохранить" name="submit"/>
        </form>

    </article>

</div>
