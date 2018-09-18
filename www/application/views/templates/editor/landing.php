<div class="editor-landing">
    <div class="editor-landing__info">
        <div class="editor-landing__emoji">
            <img class="editor-landing__emoji-item" src="/public/app/landings/editor/img/star-struck-emoji.png" alt="Star-struck emoji">
            <img class="editor-landing__emoji-item" src="/public/app/landings/editor/img/socks-emoji.png" alt="Socks emoji">
            <img class="editor-landing__emoji-item" src="/public/app/landings/editor/img/raised-eyebrow-emoji.png" alt="Raised eyebrow emoji">
        </div>

        <h1 class="editor-landing__title">
            CodeX Editor
        </h1>
        <div class="editor-landing__description">
            Next generation block styled editor. Free. Use for pleasure.
        </div>

        <div class="editor-landing__links clearfix">
            <a href="https://github.com/codex-team/codex.editor/blob/master/docs/usage.md" class="editor-landing__links-item" target="_blank">
                Documentation
            </a>
            <a href="https://github.com/codex-editor" class="editor-landing__links-item" target="_blank">
                Plugins
            </a>
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
                "output_id" : "output"
            }
        </module-settings>

        <div id="codex-editor"></div>
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
    <?
       /**
        * Array of plugins contributors
        */
        $contributors = array(
            'polinaShneider' => array('name' => 'PolinaShneider', 'photo' => 'https://avatars3.githubusercontent.com/u/15448200?s=460&v=4'),
            'neSpecc' => array('name' => 'neSpecc', 'photo' => 'https://avatars0.githubusercontent.com/u/3684889?v=4&s=60'),
            'n0str' => array('name' => 'n0str', 'photo' => 'https://avatars1.githubusercontent.com/u/988885?v=4&s=60'),
            'talyguryn' => array('name' => 'talyguryn', 'photo' => 'https://avatars1.githubusercontent.com/u/15259299?v=4&s=60'),
            'khaydarov' => array('name' => 'khaydarov', 'photo' => 'https://avatars1.githubusercontent.com/u/6507765?s=400&v=4')
        );

       /**
        * Array of plugins data
        */
        $plugins = array(
            array(
                'name' => 'Header',
                'type' => 'Block',
                'description' => 'How will you live without headers?',
                'demo' => 'header.png',
                'contributors' => array(
                    $contributors['neSpecc'],
                    $contributors['talyguryn'],
                    $contributors['n0str']
                ),
                'url' => 'https://github.com/codex-editor/header'
            ),
            array(
                'name' => 'Simple Image',
                'type' => 'Block',
                'description' => 'Provides image blocks for your writings.',
                'demo' => 'simple-image.png',
                'contributors' => array(
                    $contributors['talyguryn']
                ),
                'url' => 'https://github.com/codex-editor/inline-code'
            ),
            array(
                'name' => 'Quote',
                'type' => 'Block',
                'description' => 'Include quotes in your articles.',
                'demo' => 'quote.png',
                'contributors' => array(
                    $contributors['talyguryn']
                ),
                'url' => 'https://github.com/codex-editor/quote'
            ),
            array(
                'name' => 'Marker',
                'type' => 'Inline Tool',
                'description' => 'Highlight text fragments in your beautiful articles.',
                'demo' => 'marker.gif',
                'contributors' => array(
                    $contributors['polinaShneider']
                ),
                'url' => 'https://github.com/codex-editor/marker'
            ),
            array(
                'name' => 'Code',
                'type' => 'Block',
                'description' => 'Include code examples in your writings.',
                'demo' => 'code.png',
                'contributors' => array(
                    $contributors['talyguryn'],
                    $contributors['polinaShneider']
                ),
                'url' => 'https://github.com/codex-editor/code'
            ),
            array(
                'name' => 'Link',
                'type' => 'Inline Tool',
                'description' => 'Embed links in your articles.',
                'demo' => 'link.gif',
                'contributors' => array(
                    $contributors['neSpecc'],
                    $contributors['talyguryn'],
                    $contributors['khaydarov']
                ),
                'url' => 'https://github.com/codex-editor/link'
            ),
            array(
                'name' => 'List',
                'type' => 'Block',
                'description' => 'Add ordered or bulleted lists to your article.',
                'demo' => 'list.png',
                'contributors' => array(
                    $contributors['talyguryn']
                ),
                'url' => 'https://github.com/codex-editor/list'
            ),
            array(
                'name' => 'Delimiter',
                'type' => 'Block',
                'description' => 'Separate blocks of text in your articles.',
                'demo' => 'delimiter.png',
                'contributors' => array(
                    $contributors['n0str'],
                    $contributors['talyguryn'],
                    $contributors['neSpecc']
                ),
                'url' => 'https://github.com/codex-editor/delimiter'
            ),
            array(
                'name' => 'Inline Code',
                'type' => 'Inline Tool',
                'description' => 'Inline Tool for marking code-fragments.',
                'demo' => 'inline-code.gif',
                'contributors' => array(
                    $contributors['talyguryn']
                ),
                'url' => 'https://github.com/codex-editor/inline-code'
            ),
            array(
                'name' => 'HTML',
                'type' => 'Block',
                'description' => 'Include raw HTML code in your articles.',
                'demo' => 'html.png',
                'contributors' => array(
                    $contributors['talyguryn'],
                    $contributors['polinaShneider']
                ),
                'url' => 'https://github.com/codex-editor/raw'
            )

        )
    ?>
    <div class="editor-landing__plugins">
        <h2 class="editor-landing__plugins-title">
            Best plugins
        </h2>
        <p class="editor-landing__plugins-description">
            Plugins can represent any Blocks: Quotes, Galleries, Polls, Embeds, Tables — anything you need. Also they can implement Inline Tools such as Marker, Term, Comments etc.
        </p>
        <div class="editor-landing__plugins-filter" data-module="pluginsFilter">
            <module-settings hidden>
                {
                    "inlineFilterButtonClass" : ".js-inline-tools-filter",
                    "blockFilterButtonClass" : ".js-block-tools-filter",
                    "allToolsFilterButtonClass" : ".js-all-tools-filter",
                    "blockToolsClass" : ".js-block-tool",
                    "inlineToolsClass" : ".js-inline-tool"
                }
            </module-settings>

            <span class="editor-landing__plugins-filter-button js-block-tools-filter">
                <? include(DOCROOT . '/public/app/landings/editor/svg/plus-icon.svg'); ?>
                Blocks
            </span>
            <span class="editor-landing__plugins-filter-button js-inline-tools-filter">
                <? include(DOCROOT . '/public/app/landings/editor/svg/marker-icon.svg'); ?>
                Inline Tools
            </span>
            <span class="editor-landing__plugins-filter-button js-all-tools-filter">
                All
            </span>
        </div>
        <? foreach ( $plugins as $plugin ): ?>
            <div class="editor-plugin clearfix <?= $plugin['type'] === 'Block' ? 'js-block-tool' : 'js-inline-tool' ?>">
                <div class="editor-plugin__demo">
                    <img src="/public/app/landings/editor/demo/<?= $plugin['demo'] ?>" alt="<?= $plugin['name'] ?>">
                </div>
                <a href="<?= $plugin['url'] ?>" target="_blank">
                    <h3 class="editor-plugin__title">
                        <?= $plugin['name'] ?>
                    </h3>
                    <span class="editor-plugin__label">
                        <?= $plugin['type'] ?>
                    </span>
                </a>
                <div class="editor-plugin__description">
                    <?= $plugin['description'] ?>
                </div>
                <div class="editor-plugin__contributors">
                    <? foreach ( $plugin['contributors'] as $contributor ): ?>
                        <a href="https://github.com/<?= $contributor['name']; ?>" class="editor-plugin__contributors-item" title="<?= $contributor['name'] ?>" target="_blank">
                            <img src="<?= $contributor['photo'] ?>" alt="<?= $contributor['name'] ?>">
                        </a>
                    <? endforeach; ?>
                </div>
            </div>
        <? endforeach; ?>
<?
$your_plugin_code = "<span style='color:#b83370'>class</span> <span style='color:#8c74b2'>MyTool</span> {
  render() {
    <span style='color:#b83370'>return</span> document.createElement(’textarea’);
  }
  save(textarea) {
    <span style='color:#b83370;'>return</span> {
      text: textarea.value
    }
  }
}";
?>
        <div class="editor-plugin clearfix editor-plugin--your-own">
            <h3 class="editor-plugin__title">
                Your own plugin
            </h3>
            <div class="editor-plugin__demo">
                <pre><?= $your_plugin_code ?></pre>
            </div>
            <div class="editor-plugin__description">
                Just implement <i>render</i> and <i>save</i> methods.
            </div>
            <div class="editor-plugin__footer">
                To make it cool, take a look at the <a href="https://github.com/codex-team/codex.editor/blob/master/docs/api.md">API</a>.
            </div>
        </div>
        <div class="editor-landing__actions clearfix">
            <a class="editor-landing__more-plugins" href="https://github.com/codex-editor" target="_blank">
                <? /* include(DOCROOT . '/public/app/landings/editor/svg/arrow-icon.svg'); */ ?>
                View all plugins
            </a>
            <a class="editor-landing__contribute" href="#">
                <? include(DOCROOT . '/public/app/landings/editor/svg/plus-icon.svg'); ?>
                Contribute your plugin to this featured list
            </a>
        </div>
    </div>
</div>