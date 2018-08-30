<link rel="stylesheet" href="/public/app/landings/editor/editor.css?v=<?= filemtime("public/app/landings/editor/editor.css") ?>">

<div class="editor-landing">
    <div class="editor-landing__info">
        <div class="editor-landing__emoji">
            <img class="editor-landing__emoji-item" src="/public/app/landings/editor/img/star-struck-emoji.png" alt="Star-struck emoji">
            <img class="editor-landing__emoji-item" src="/public/app/landings/editor/img/socks-emoji.png" alt="Socks emoji">
            <img class="editor-landing__emoji-item" src="/public/app/landings/editor/img/raised-eyebrow-emoji.png" alt="Raised eyebrow emoji">
        </div>
        <h1 class="editor-landing__title">CodeX Editor</h1>
        <div class="editor-landing__description">Next generation block styled editor. Free. Use for pleasure.</div>

        <div class="editor-landing__links clearfix">
            <a href="#" class="editor-landing__links-item">Documentation</a>
            <a href="#" class="editor-landing__links-item">Plugins</a>
        </div>
    </div>
    <div class="editor-landing__demo" data-module="editor">
        <module-settings hidden>
            {
                "blocks" : [
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "Outputs clear data at JSON",
                            "level" : 2
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
                            "level" : 2
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

        <div id="codex-editor"></div>

        <div class="editor-landing__button-wrapper">
            <div class="button editor-landing__button" id="saveButton">
                View Output
            </div>
        </div>
    </div>
    <div class="editor-landing__preview">
        <pre id="output"></pre>
    </div>
</div>