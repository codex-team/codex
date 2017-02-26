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

            <label for="quiz_id">Выберите тест, который относится к статье</label>
            <select name="quiz_id">
                <option value="0">Тест не выбран</option>
                <? if ($quizzes): ?>
                    <? foreach ($quizzes as $quiz): ?>
                        <option value="<?= $quiz['id']; ?>" <?= $quiz['id'] == $article->quiz_id?'selected':''; ?>>
                            <?= $quiz['title']; ?>
                        </option>
                    <? endforeach; ?>
                <? endif; ?>
            </select>

        </section>

        <section class="editor-form__section">

            <label for="courses_id">Выберите курс, к которому относится статья</label>
            <select name="courses_ids[]" multiple>
                <? foreach ($courses as $course): ?>
                    <? $is_selected = is_array($selected_courses)?in_array($course['id'], $selected_courses):false; ?>
                    <option value="<?= $course['id']; ?>" <?= $is_selected?'selected':''; ?>>
                        <?= $course['name']; ?>
                    </option>
                <? endforeach; ?>
            </select>

        </section>

        <section class="editor-form__section">

            <label for="item_below_key">Выводить над (в списке первые 5 элементов фида, если не выбрать, статья останется на своем месте)</label>
            <select name="item_below_key">
                <option value="0">---</option>
                <? foreach ($topFeed as $item): ?>
                    <option value="<?= $item::FEED_PREFIX.':'.$item->id; ?>">
                        <?= $item->title; ?>
                    </option>
                <? endforeach ?>
            </select>

        </section>

        <section class="editor-form__section">

            <input type="checkbox" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> > Опубликовать <br>

        </section>

        <section class="editor-form__section">

            <input type="checkbox" name="marked" value="1" <?= $article->marked ? 'checked' : ''; ?> > Отметить как важную <br/>

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
            uploadImagesUrl : '/editor/transport/',
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
                        uploadUrl : ''
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
        submit.addEventListener('click', function() {

            codex.editor.saver.saveBlocks();

            setTimeout(function() {

                article.innerHTML = JSON.stringify({ data: codex.editor.state.jsonOutput });

                form.submit();

            }, 100);

        }, false);

    })
</script>

<!-- Developers plugin -->
<? $plugins = ['paragraph', 'header', 'code', 'link', 'list', 'image', 'quote', 'twitter', 'instagram', 'embed']; ?>

<? foreach ($plugins as $plugin) : ?>
    <script src="https://cdn.ifmo.su/editor/v1.5/plugins/<?=$plugin . DIRECTORY_SEPARATOR . $plugin . '.js'; ?>"></script>
    <link rel="stylesheet" href="https://cdn.ifmo.su/editor/v1.5/plugins/<?=$plugin . DIRECTORY_SEPARATOR . $plugin . '.css'; ?>">
<? endforeach; ?>

<!-- Editor scripts and styles -->
<script src="https://cdn.ifmo.su/editor/v1.5/codex-editor.js"></script>
<link rel="stylesheet" href="https://cdn.ifmo.su/editor/v1.5/codex-editor.css" />
