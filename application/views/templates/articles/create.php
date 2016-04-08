<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/<?= $article->id && $article->uri ? $article->uri . '/save' : 'article/add' ?>" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">
            <input type="hidden" name="csrf" value="<?= Security::token() ?>" />

            <input type="hidden" name="article_id" value="<?= $article->id ?: ''; ?>">

            <label for="title">Заголовок:</label>
            <input type="text" name="title" value="<?= $article->title ?: ''; ?>">

            <label for="uri">Uri:</label>
            <input type="text" name="uri" value="<?= $article->uri ?: ''; ?>">

            <label for="description">Описание:</label>
            <textarea name="description" id="codex_editor" cols="5" rows="5"><?= $article->description ?: ''; ?></textarea>

            <label for="article_text">Содержание:</label>
            <textarea name="article_text" id="codex_editor" cols="30" rows="10"><?= $article->text ?: ''; ?></textarea>

            <p><input type="checkbox" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> > Опубликовать</p>

            <input type="submit" value="Сохранить" name="submit"/>
        </form>

    </article>

</div>
