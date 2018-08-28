<link rel="stylesheet" href="/public/app/landings/editor/editor.css?v=<?= filemtime("public/app/landings/editor/editor.css") ?>">

<article class="editor-landing editor-form article-content">

    <h1 class="editor-landing__title" itemprop="headline">CodeX Editor</h1>
    <div class="editor-landing__disclaimer">under development</div>

    <input class="editor-form__title" id="js-editor-title" type="text" name="title" required placeholder="Story title">
    <form data-module="editor" name="editor-demo" action="/editor/preview" method="POST" enctype="multipart/form-data">
        <module-settings hidden>
            {
                "blocks" : [
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "CodeX Editor",
                            "level" : 2
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Привет. Перед вами наш обновленный редактор. На этой странице вы можете проверить его в действии — попробуйте отредактировать или дополнить материал. Код страницы содержит пример подключения и простейшей настройки."
                        }
                    }
                ],
                "button_id" : "saveButton",
                "output_id" : "output"
            }
        </module-settings>

        <? //<textarea hidden name="html" id="codex_editor" cols="30" rows="10" style="width: 100%;height: 300px;"></textarea> ?>
        <div id="codex-editor"></div>
        <textarea hidden name="article_json" id="json_result" cols="30" rows="10" style="width: 100%;height: 300px;"></textarea>

        <div class="editor_output__buttons">
            <div class="button button--master" id="saveButton">
                View Output
            </div>
        </div>

    </form>

</article>

<script>

    /**
    * Hander for article title input
    * Sets focus on ce-redator by ENTER key
    */
    var titleInput = document.getElementById('js-editor-title');

    titleInput.addEventListener('keypress',function(event) {

        var ENTER = 13,
            redactor;

        if (event.keyCode == ENTER){

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            redactor = document.querySelector('.ce-redactor');
            redactor.click();
        }

    });
</script>


<div class="editor-output-preview">

    <div class="editor-output--header">Output</div>
    <div class="editor-output--description">Yeah, it's blocks! Very useful for multiplatform coverage.</div>

    <pre id="output"></pre>
</div>

<div class="advantages clearfix">
    <div class="center_side">
        <div class="advantages__item">
            API based
        </div>
        <div class="advantages__item">
            Native JS
        </div>
        <div class="advantages__item">
            Opened
        </div>
    </div>
</div>