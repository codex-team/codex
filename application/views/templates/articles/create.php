<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/article/addarticle" enctype="multipart/form-data" id="edit_article_form">

            Заголовок:
            <? if (isset($article)): ?>
                <input type="hidden" name="article_id" value="<?= $article->id; ?>">
                <input type="text" name="title" value="<?= $article->title; ?>">
            <? else: ?>
                <input type="text" name="title">
            <? endif; ?>

            Содержание:<hr>
            <textarea name="text" id="codex_editor" cols="30" rows="10">
                <? if (isset($article)): ?>
                    <?= $article->text ?>
                <? else: ?>
                    <h2>Введение</h2>
                <? endif; ?>
            </textarea>
            <hr>

            <div>
                <? if (isset($article) && $article->is_published): ?>
                    <input type="checkbox" name="is_published" value="1" checked> Опубликовать
                <? else: ?>
                    <input type="checkbox" name="is_published"> Опубликовать
                <? endif; ?>
            </div>

        </form>

    </article>

    <div class="article_form_buttons">
        <button id="codex_editor_export_btn" class="button master">Сохранить</button>
    </div>

</div>

<script src="/public/extensions/codex.editor/ce_interface.js"></script>
<script>

    function ready(f){
        /in/.test(document.readyState) ? setTimeout(ready,9,f) : f();
    }

    /** Document is ready */
    ready(function() {
        window.cEditor = new ce({
            tools : ['header']
        });
    })

</script>