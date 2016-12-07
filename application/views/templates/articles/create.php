<link rel="stylesheet" href="/public/css/editor-form.css?v=<?= filemtime("public/css/editor-form.css") ?>">

<div class="center_side">

    <form class="editor-form" name="codex_article" method="POST" action="/<?= $article->id && $article->uri ? $article->uri . '/save' : 'article/add' ?>" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">

        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <input type="hidden" name="article_id" value="<?= $article->id ?: ''; ?>">

        <section class="editor-form__section">
            <label for="title">Заголовок</label>
            <input type="text" name="title" value="<?= $article->title ?: ''; ?>">
        </section>

        <div class="redactor_zone">
            <textarea name="article_json" id="codex_editor" rows="10" hidden><?= $article->json ?: ''; ?></textarea>
        </div>

        <section class="editor-form__section">

            <label for="uri">URI</label>
            <input type="text" name="uri" value="<?= $article->uri ?: ''; ?>" autocomplete="off">

        </section>

        <section class="editor-form__section">

            <label for="description">Описание статьи</label>
            <textarea name="description" rows="5"><?= $article->description ?: ''; ?></textarea>

        </section>

        <section class="editor-form__section">

            <label for="course_id">Выберите курс, к которому относится статья</label>
            <select name="course_id">
                <option value="0">---</option>
                <? foreach ($courses as $course): ?>
                    <option value="<?= $course['id']; ?>">
                        <?= $course['name']; ?>
                    </option>
                <? endforeach; ?>
            </select>

        </section>

        <section class="editor-form__section">

            <input type="checkbox" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> > Опубликовать <br>

        </section>

        <section class="editor-form__section">

            <input type="checkbox" name="marked" value="1" <?= $article->marked ? 'checked' : ''; ?> > Отметить как важную <br/>

        </section>

        <section class="editor-form__section">

            <label for="order">Порядок в списке (если не задавать, будет в порядке убывания даты)</label>
            <input type="text" name="order" value="<?= $article->order ?: ''; ?>">

        </section>

        <span id="submitButton" class="button master" style="margin: 40px 139px 40px">Отправить</span>
    </form>
</div>

<script>

    /** Document is ready */
    codex.docReady(function() {

        var submit  = document.getElementById('submitButton'),
            form    = document.forms['codex_article'],
            article = document.getElementById('codex_editor'),
            json;

        /** If we want to edit article */
        if (article.textContent.length) {

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

        codex.editor.start({
            textareaId: 'codex_editor',

            tools : {
                paragraph : {
                    type             : 'paragraph',
                    iconClassname    : 'ce-icon-paragraph',
                    make             : paragraphTool.make,
                    appendCallback   : null,
                    settings         : null,
                    render           : paragraphTool.render,
                    save             : paragraphTool.save,
                    displayInToolbox : false,
                    enableLineBreaks : false,
                    allowedToPaste   : true
                },
                paste : {
                    type             : 'paste',
                    iconClassname    : '',
                    prepare          : pasteTool.prepare,
                    make             : pasteTool.make,
                    appendCallback   : null,
                    settings         : null,
                    render           : null,
                    save             : pasteTool.save,
                    displayInToolbox : false,
                    enableLineBreaks : false,
                    callbacks        : pasteTool.callbacks,
                    allowedToPaste   : false
                },
                header : {
                    type             : 'header',
                    iconClassname    : 'ce-icon-header',
                    make             : headerTool.make,
                    appendCallback   : headerTool.appendCallback,
                    settings         : headerTool.makeSettings(),
                    render           : headerTool.render,
                    save             : headerTool.save
                },
                code : {
                    type             : 'code',
                    iconClassname    : 'ce-icon-code',
                    make             : codeTool.make,
                    appendCallback   : null,
                    settings         : null,
                    render           : codeTool.render,
                    save             : codeTool.save,
                    displayInToolbox : true,
                    enableLineBreaks : true
                },
                link : {
                    type             : 'link',
                    iconClassname    : 'ce-icon-link',
                    make             : linkTool.makeNewBlock,
                    appendCallback   : linkTool.appendCallback,
                    render           : linkTool.render,
                    save             : linkTool.save,
                    displayInToolbox : true,
                    enableLineBreaks : true
                },
                list : {
                    type             : 'list',
                    iconClassname    : 'ce-icon-list-bullet',
                    make             : listTool.make,
                    appendCallback   : null,
                    settings         : listTool.makeSettings(),
                    render           : listTool.render,
                    save             : listTool.save,
                    displayInToolbox : true,
                    enableLineBreaks : true
                },
                quote : {
                    type             : 'quote',
                    iconClassname    : 'ce-icon-quote',
                    make             : quoteTools.makeBlockToAppend,
                    appendCallback   : null,
                    settings         : quoteTools.makeSettings(),
                    render           : quoteTools.render,
                    save             : quoteTools.save,
                    displayInToolbox : true,
                    enableLineBreaks : true,
                    allowedToPaste   : true
                },
                image : {
                    type             : 'image',
                    iconClassname    : 'ce-icon-picture',
                    make             : ceImage.make,
                    appendCallback   : ceImage.appendCallback,
                    settings         : ceImage.makeSettings(),
                    render           : ceImage.render,
                    save             : ceImage.save,
                    isStretched      : true,
                    displayInToolbox : true,
                    enableLineBreaks : false
                },
                instagram : {
                    type             : 'instagram',
                    iconClassname    : 'ce-icon-instagram',
                    prepare          : instagramTool.prepare,
                    make             : instagramTool.make,
                    appendCallback   : null,
                    settings         : null,
                    render           : instagramTool.reneder,
                    save             : instagramTool.save,
                    displayInToolbox : false,
                    enableLineBreaks : false,
                    allowedToPaste   : false
                },
                twitter : {
                    type             : 'twitter',
                    iconClassname    : 'ce-icon-twitter',
                    prepare          : twitterTool.prepare,
                    make             : twitterTool.make,
                    appendCallback   : null,
                    settings         : null,
                    render           : twitterTool.render,
                    save             : twitterTool.save,
                    displayInToolbox : false,
                    enableLineBreaks : false,
                    allowedToPaste   : false
                }
            },
            
            data : INPUT
        });

        /** Save redactors block and submit form */
        submit.addEventListener('click', function() {

            codex.editor.saver.saveBlocks();

            setTimeout(function() {

                article.innerHTML = JSON.stringify(codex.editor.state.jsonOutput);

                form.submit();

            }, 100);

        }, false);

    })
</script>

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

<script src="/public/extensions/codex.editor/plugins/image/image.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/image/image.css" />

<script src="/public/extensions/codex.editor/plugins/paste/paste.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/paste/paste.css">

<script src="/public/extensions/codex.editor/plugins/instagram/instagram.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/instagram/instagram.css">

<script src="/public/extensions/codex.editor/plugins/twitter/twitter.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/twitter/twitter.css">

<script src="/public/extensions/codex.editor/codex-editor.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/codex-editor.css">
