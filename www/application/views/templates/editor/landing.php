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
    <div class="editor-landing__loved-by">
        <div class="editor-landing__loved-by-companies">
            <a rel="nofollow" class="editor-landing__loved-by-item" target="_blank" href="//tjournal.ru">
                <? include(DOCROOT . '/public/app/landings/editor/svg/tj.svg'); ?>
            </a>
            <a rel="nofollow" class="editor-landing__loved-by-item" target="_blank" href="//dtf.ru">
                <? include(DOCROOT . '/public/app/landings/editor/svg/dtf.svg'); ?>
            </a>
            <a rel="nofollow" class="editor-landing__loved-by-item" target="_blank" href="//vc.ru">
                <? include(DOCROOT . '/public/app/landings/editor/svg/vc-ru.svg'); ?>
            </a>
        </div>
    </div>
    <div class="editor-landing__plugins">
        <h2 class="editor-landing__plugins-title">
            Best plugins
        </h2>
        <p class="editor-landing__plugins-description">
            Plugins can represent any Blocks: Quotes, Galleries, Polls, Embeds, Tables — anything you need. Also they can implement Inline Tools such as Marker, Term, Comments etc.
        </p>
        <div class="editor-landing__plugins-filter">
            <a class="editor-landing__plugins-filter-button" href="#">
                <? include(DOCROOT . '/public/app/landings/editor/svg/blocks-icon.svg'); ?>
                Blocks
            </a>
            <a class="editor-landing__plugins-filter-button" href="#">
                <? include(DOCROOT . '/public/app/landings/editor/svg/inline-icon.svg'); ?>
                Inline Tools
            </a>
        </div>
        <div class="editor-plugin clearfix">
            <h3 class="editor-plugin__title">Twitter</h3>
            <span class="editor-plugin__label">Block</span>
            <div class="editor-plugin__gif"></div>
            <div class="editor-plugin__description">Include Tweets in your beautiful articles</div>
            <div class="editor-plugin__contributors">
                <a href="#" class="editor-plugin__contributors-item"></a>
                <a href="#" class="editor-plugin__contributors-item"></a>
            </div>
        </div>
        <div class="editor-plugin clearfix">
            <h3 class="editor-plugin__title">Header</h3>
            <span class="editor-plugin__label">Block</span>
            <div class="editor-plugin__gif"></div>
            <div class="editor-plugin__description">How will you live without headers?</div>
            <div class="editor-plugin__contributors">
                <a href="#" class="editor-plugin__contributors-item"></a>
                <a href="#" class="editor-plugin__contributors-item"></a>
            </div>
        </div>
    </div>
</div>