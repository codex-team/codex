<link rel="stylesheet" href="/public/app/landings/editor/editor.css?v=<?= filemtime("public/app/landings/editor/editor.css") ?>">

<article class="editor-landing editor-form article-content">
    <div class="editor-landing__info">
        <h1 class="editor-landing__title js-emoji-included" itemprop="headline">CodeX Editor</h1>
        <div class="editor-landing__description">Next generation block styled editor. Free. Use for pleasure.</div>

        <div class="editor-landing__links clearfix">
            <a href="#" class="editor-landing__links-item">Documentation</a>
            <a href="#" class="editor-landing__links-item">Plugins</a>
        </div>
    </div>
    <form data-module="editor" name="editor-demo" action="/editor/preview" method="POST" enctype="multipart/form-data">
        <module-settings hidden>
            {
                "blocks" : [
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "Outputs clear data at JSON",
                            "level" : 3
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Use it in Web, mobile, APM, Instant Articles, speech readers — everywhere."
                        }
                    },
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "API is the feature",
                            "level" : 3
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Easy to build Plugins. Dozens of created."
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

<div class="editor-output-preview">
    <pre id="output"></pre>
</div>