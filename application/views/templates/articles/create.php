<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/article/add" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">

            <label for="title">Заголовок:</label>
            <? if (isset($article)): ?>
                <input type="hidden" name="article_id" value="<?= $article->id; ?>">
                <input type="text" name="title" value="<?= $article->title; ?>">
            <? else: ?>
                <input type="text" name="title">
            <? endif; ?>

            <label for="article_text">Содержание:</label>
            <textarea name="article_text" id="codex_editor" cols="30" rows="10">
                <? if (isset($article)): ?>
                    <?= $article->text ?>
                <? else: ?>
                    <h2>Введение</h2>
                <? endif; ?>
            </textarea>

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
