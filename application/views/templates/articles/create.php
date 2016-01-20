<div class="center_side clear">

    <article class="article">
        <form method="POST" action="/articles/create" enctype="multipart/form-data" id="edit_article_form">
            <textarea name="article_text" id="codex_editor" cols="30" rows="10"></textarea>
        </form>
            <script src="/public/extensions/codex.editor/ce_interface.js"></script>
            <script>

                function ready(f){
                    /in/.test(document.readyState) ? setTimeout(ready,9,f) : f();
                }

                /** Document is ready */
                ready(function() {
                    window.cEditor = new ce({
                        tools : []
                    });
                })

            </script>
    </article>

    <div class="article_form_buttons">

        <button onclick="copyDivContentToTextarea()" class="button master" id="save_article">Опубликовать</button>
        <button class="button" id="save_draft">Сохранить черновик</button>

    </div>
</div>

<script type="application/javascript">
    function copyDivContentToTextarea()
    {
        divValue = document.getElementById("codex_article_wrapper").innerHTML;
        document.getElementById("codex_editor").value = divValue;

        document.getElementById("edit_article_form").submit();
    }
</script>
