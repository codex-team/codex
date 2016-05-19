<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/<?= $article->id && $article->uri ? $article->uri . '/save' : 'article/add' ?>" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">
            <input type="hidden" name="csrf" value="<?= Security::token() ?>" />

            <input type="hidden" name="article_id" value="<?= $article->id ?: ''; ?>">

            <label for="title">Заголовок</label>
            <input type="text" name="title" value="<?= $article->title ?: ''; ?>">

            <label for="uri">URI</label>
            <input type="text" name="uri" value="<?= $article->uri ?: ''; ?>">

            <label for="description">Описание статьи</label>
            <textarea name="description" rows="5"><?= $article->description ?: ''; ?></textarea>

            <div class="article_content redactor_zone">
                <textarea name="article_text" id="codex_editor" style="margin: 40px 0" rows="10"><?= $article->text ?: ''; ?></textarea>
            </div>

            <p><input type="checkbox" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> > Опубликовать</p>
            <p><input type="checkbox" name="marked" value="1" <?= $article->marked ? 'checked' : ''; ?> > Отметить как важную</p>

            <label for="order">Порядок в списке (если не задавать, будет в порядке убывания даты)</label>
            <input type="text" name="order" value="<?= $article->order ?: ''; ?>">

            <input type="submit" value="Сохранить" name="submit"/>
        </form>

    </article>

</div>
<script src="/public/extensions/codex.editor/codex-editor.js"></script>
<script>

    /** Document is ready */
    docReady(function() {

        cEditor.start({
            textareaId: 'codex_editor',
            tools      : ['header', 'list', 'quote', 'code'],
        });

    })
</script>
