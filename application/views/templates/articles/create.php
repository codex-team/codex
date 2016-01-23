<div class="center_side clear">

    <article class="article">
        <form method="POST" action="/article/addarticle" enctype="multipart/form-data" id="edit_article_form">
            <input type="text" name="title">
            <textarea name="text" id="codex_editor" cols="30" rows="10"><h2>Введение</h2></textarea>
        </form>
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
    </article>

    <div class="article_form_buttons">

        <button id="save_article" class="button master">Опубликовать</button>
        <button id="codex_editor_export_btn" class="button">Сохранить черновик</button>

    </div>
</div>