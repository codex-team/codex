<link rel="stylesheet" href="/public/css/editor-form.css?v=<?= filemtime("public/css/editor-form.css") ?>">

<div class="center_side">

    <form class="editor-form" method="POST" action="/<?= $contest->id && $contest->uri ? $contest->uri . '/save' : 'contest/add' ?>" enctype="multipart/form-data" id="edit_article_form" name="codex_article">

        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <input type="hidden" name="contest_id" value="<?= $contest->id; ?>">

        <section class="editor-form__section">
            <label for="title">Название конкурса</label>
            <input type="text" name="title" value="<?= $contest->title ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="uri">URI</label>
            <input type="text" name="uri" value="<?= $contest->uri ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="description">Краткое описание</label>
            <textarea name="description" cols="5" rows="5"><?= $contest->description ?: ''; ?></textarea>
        </section>

        <? if ($contest->text) : ?>

            <section class="editor-form__section">
                <label for="contest_text">Содержание</label>
                <textarea name="contest_text" id="codex_editor" cols="30" rows="10"><?= $contest->text ?: ''; ?></textarea>
            </section>

        <? else : ?>

            <section class="editor-form__section">
                <label for="contest_content">Содержание</label>
                <textarea name="contest_content" id="codex_editor" cols="30" rows="10" hidden><?= $contest->content ?: ''; ?></textarea>
            </section>

        <? endif; ?>

        <section class="editor-form__section">
            <input type="checkbox" class="contest_status" name="status" value="1" <?= $contest->status ? 'checked' : ''; ?>>
            Закончен
        </section>

        <section class="editor-form__section">
            <label for="duration">Дата окончания(YYYY-MM-DD hh:mm:ss)</label>
            <input type="text" name="duration" value="<?= $contest->dt_close ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="winner">ID победителя</label>
            <input type="text" name="winner" value="<?= $contest->winner ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="results_contest">Результаты</label>
            <textarea name="results_contest" id="codex_editor" cols="30" rows="10"><?= $contest->results ?: ''; ?></textarea>
        </section>

        <span id="submitButton" class="button master" style="margin: 40px 139px 40px">Сохранить</span>
    </form>

</div>

<!-- Developers plugin -->
<? $plugins = ['paragraph', 'header', 'code', 'link', 'list', 'image', 'quote', 'twitter', 'instagram', 'embed']; ?>

<? foreach ($plugins as $plugin) : ?>
    <script src="https://cdn.ifmo.su/editor/v1.5/plugins/<?=$plugin . DIRECTORY_SEPARATOR . $plugin . '.js'; ?>"></script>
    <link rel="stylesheet" href="https://cdn.ifmo.su/editor/v1.5/plugins/<?=$plugin . DIRECTORY_SEPARATOR . $plugin . '.css'; ?>">
<? endforeach; ?>

<!-- Editor scripts and styles -->
<script src="https://cdn.ifmo.su/editor/v1.5/codex-editor.js"></script>
<link rel="stylesheet" href="https://cdn.ifmo.su/editor/v1.5/codex-editor.css" />

<script>

    /** Document is ready */
    codex.docReady(function() {

        var submit  = document.getElementById('submitButton'),
            form    = document.forms['codex_article'],
            article = document.getElementById('codex_editor'),
            pageContent,
            blocks;

        /** If we want to edit article */
        if (article.textContent.length) {

            /** get content that was written before and render with Codex.Editor */
            pageContent = JSON.parse(article.textContent);

        }

        blocks = pageContent ? pageContent.data : [];

        var INPUT = {
            items : blocks,
            count : blocks.length
        };

        codex.editor.start({
            textareaId: 'codex_editor',
            initialBlockPlugin : 'paragraph',
            tools: {
                paragraph : {
                    type             : 'paragraph',
                    iconClassname    : 'ce-icon-paragraph',
                    render           : paragraph.render,
                    validate         : paragraph.validate,
                    save             : paragraph.save,
                    allowedToPaste   : true,
                    showInlineToolbar: true,
                    destroy             : paragraph.destroy,
                    allowRenderOnPaste  : true,
                    config              : {}
                },
                header : {
                    type             : 'header',
                    iconClassname    : 'ce-icon-header',
                    appendCallback   : header.appendCallback,
                    makeSettings     : header.makeSettings,
                    validate         : header.validate,
                    render           : header.render,
                    save             : header.save,
                    displayInToolbox : true,
                    enableLineBreaks : false,
                    destroy          : header.destroy,
                    config           : {}
                },
                code : {
                    type             : 'code',
                    iconClassname    : 'ce-icon-code',
                    appendCallback   : null,
                    makeSettings     : null,
                    render           : code.render,
                    validate         : code.validate,
                    save             : code.save,
                    destroy          : code.destroy,
                    displayInToolbox : true,
                    enableLineBreaks : true,
                    config           : {}
                },
                link : {
                    type             : 'link',
                    iconClassname    : 'ce-icon-link',
                    prepare          : link.prepare,
                    appendCallback   : link.appendCallback,
                    render           : link.render,
                    save             : link.save,
                    displayInToolbox : true,
                    enableLineBreaks : true,
                    destroy: link.destroy,
                    config           : {
                        fetchUrl : ''
                    }
                },
                list: {
                    type: 'list',
                    iconClassname: 'ce-icon-list-bullet',
                    make: list.make,
                    appendCallback: null,
                    makeSettings: list.makeSettings,
                    render: list.render,
                    validate: list.validate,
                    save: list.save,
                    destroy: list.destroy,
                    displayInToolbox: true,
                    showInlineToolbar: true,
                    enableLineBreaks: true,
                    allowedToPaste: true
                },
                quote : {
                    type             : 'quote',
                    iconClassname    : 'ce-icon-quote',
                    makeSettings     : quote.makeSettings,
                    render           : quote.render,
                    prepare          : quote.prepare,
                    validate         : quote.validate,
                    save             : quote.save,
                    displayInToolbox : true,
                    enableLineBreaks : true,
                    showInlineToolbar: true,
                    allowedToPaste   : true,
                    destroy: quote.destroy,
                    config           : {
                        defaultStyle : 'withPhoto'
                    }
                },
                image : {
                    type             : 'image',
                    iconClassname    : 'ce-icon-picture',
                    appendCallback   : image.appendCallback,
                    makeSettings     : image.makeSettings,
                    prepare          : image.prepare,
                    render           : image.render,
                    save             : image.save,
                    isStretched      : true,
                    displayInToolbox : true,
                    showInlineToolbar: true,
                    enableLineBreaks : true,
                    destroy: image.destroy,
                    renderOnPastePatterns: image.pastePatterns,
                    config : {
                        uploadImage : '/editor/transport/',
                        uploadFromUrl : ''
                    }
                },
                instagram : {
                    type             : 'instagram',
                    iconClassname    : 'ce-icon-instagram',
                    prepare          : instagram.prepare,
                    make             : instagram.make,
                    render           : instagram.render,
                    save             : instagram.save,
                    destroy: instagram.destroy,
                    renderOnPastePatterns: instagram.pastePatterns
                },
                tweet : {
                    type             : 'tweet',
                    iconClassname    : 'ce-icon-twitter',
                    prepare          : twitter.prepare,
                    make             : twitter.make,
                    render           : twitter.render,
                    save             : twitter.save,
                    showInlineToolbar: true,
                    destroy: twitter.destroy,
                    renderOnPastePatterns: twitter.pastePatterns,
                    config           : {
                        fetchUrl : ''
                    }
                },
                embed : {
                    type             : 'embed',
                    render           : embed.render,
                    save             : embed.save,
                    validate         : embed.validate,
                    destroy          : embed.destroy,
                    renderOnPastePatterns: embed.pastePatterns
                }
            },
            data : INPUT
        });

        /** Save redactors block and submit form */
        submit.addEventListener('click', function(event) {

            codex.editor.saver.saveBlocks();

            setTimeout(function() {

                if (codex.editor.state.jsonOutput.length == 0) {

                    article.innerHTML = '';

                } else {

                    article.innerHTML = JSON.stringify({ data: codex.editor.state.jsonOutput });

                }

                form.submit();

            }, 100);

        }, false);

    })
</script>