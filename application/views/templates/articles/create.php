<div class="center_side clear">

        <form name="codex_article" method="POST" action="/<?= $article->id && $article->uri ? $article->uri . '/save' : 'article/add' ?>" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">

            <section class="article_form__inputs">
                <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
                <input type="hidden" name="article_id" value="<?= $article->id ?: ''; ?>">

                <label for="title">Заголовок</label>
                <input type="text" name="title" value="<?= $article->title ?: ''; ?>">
            </section>

            <div class="article_content redactor_zone">
                <textarea name="article_json" id="codex_editor" rows="10" hidden><?= $article->json ?: ''; ?></textarea>
            </div>

            <section class="article_form__inputs">
                <label for="uri">URI</label>
                <input type="text" name="uri" value="<?= $article->uri ?: ''; ?>" autocomplete="off">

                <label for="description">Описание статьи</label>
                <textarea name="description" rows="5"><?= $article->description ?: ''; ?></textarea>

                <input type="checkbox" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> > Опубликовать <br>
                <input type="checkbox" name="marked" value="1" <?= $article->marked ? 'checked' : ''; ?> > Отметить как важную

                <label for="order">Порядок в списке (если не задавать, будет в порядке убывания даты)</label>
                <input type="text" name="order" value="<?= $article->order ?: ''; ?>">
            </section>

            <span id="submitButton" class="button master" style="margin: 40px 119px 40px">Отправить</span>
        </form>

</div>

<script>

    /** Document is ready */
    docReady(function() {

        var submit  = document.getElementById('submitButton'),
            form    = document.forms['codex_article'],
            article = document.getElementById('codex_editor'),
            json;

        /** If we want to edit article */
        if (article.textContent != '') {

            /** get content that was written before and render with Codex.Editor */
            json = JSON.parse(article.textContent);

        } else {

            /** for new article */
            json = [];

        }
        
        var INPUT = {
            items : json,
            count : json.length,
        };

        cEditor.start({
            textareaId: 'codex_editor',
            data : INPUT
        });

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