<link rel="stylesheet" href="/public/css/editor.css">

<div class="center_side clear">

    <article class="article">

        <form name="codex_article" method="POST" action="/<?= $article->id && $article->uri ? $article->uri . '/save' : 'article/add' ?>" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">
            <input type="hidden" name="csrf" value="<?= Security::token() ?>" />

            <input type="hidden" name="article_id" value="<?= $article->id ?: ''; ?>">

            <label for="title">Заголовок</label>
            <input type="text" name="title" value="<?= $article->title ?: ''; ?>">

            <div class="article_content redactor_zone">
                <textarea name="article_json" id="codex_editor" rows="10" hidden><?= $article->text ?: ''; ?></textarea>
            </div>

            <label for="uri">URI</label>
            <input type="text" name="uri" value="<?= $article->uri ?: ''; ?>" autocomplete="off">

            <label for="description">Описание статьи</label>
            <textarea name="description" rows="5"><?= $article->description ?: ''; ?></textarea>

            <p><input type="checkbox" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> > Опубликовать</p>
            <p><input type="checkbox" name="marked" value="1" <?= $article->marked ? 'checked' : ''; ?> > Отметить как важную</p>

            <label for="order">Порядок в списке (если не задавать, будет в порядке убывания даты)</label>
            <input type="text" name="order" value="<?= $article->order ?: ''; ?>">

            <span id="submitButton" class="btn-submit">Отправить</span>
        </form>

    </article>

</div>

<script>

    /** Document is ready */
    docReady(function() {

        var INPUT = {
            items : [],
            count : 0,
        };

        cEditor.start({
            textareaId: 'codex_editor',
            data : INPUT
        });


        var submit  = document.getElementById('submitButton'),
            form    = document.forms['codex_article'],
            article = document.getElementById('codex_editor');

        /** Save redactors block and submit form */
        submit.addEventListener('click', function() {

            cEditor.saver.saveBlocks();

            setTimeout(function() {

                article.innerHTML = JSON.stringify(cEditor.state.jsonOutput);

                form.submit();

            }, 100);


        }, false);

    })
</script>

<script src="/public/extensions/codex.editor/codex-editor.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/editor.css">

<script src="/public/extensions/codex.editor/plugins/paragraph/paragraph.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/paragraph/paragraph.css" />

<script src="/public/extensions/codex.editor/plugins/header/header.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/header/header.css" />

<script src="/public/extensions/codex.editor/plugins/link/link.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/link/link.css" />

<script src="/public/extensions/codex.editor/plugins/code/code.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/code/code.css" />

<script src="/public/extensions/codex.editor/plugins/quote/quote.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/quote/quote.css" />

<script src="/public/extensions/codex.editor/plugins/list/list.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/list/list.css" />

<script src="/public/extensions/codex.editor/plugins/images/images.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/images/images.css" />