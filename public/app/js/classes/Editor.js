/**
 * Constructor for CodeX Editor
 */
module.exports = ( function (codexLoader) {

    'use strict';

    let CodexEditorInstance = null;

    /**
     * Loads resource
     *
     * @param  {Object} resource name and paths for js and css
     * @return {Promise}
     */
    function loadResource(resource) {

        let name      = resource.name,
            scriptUrl = resource.path.script,
            styleUrl  = resource.path.style;

        return Promise.all([
            codexLoader.importScript(scriptUrl, name),
            codexLoader.importStyle(styleUrl, name)
        ]);

    }

    /**
     * Load editor resources and append block with them to body
     *
     * @param  {Array} resources list of resources which should be loaded
     * @return {Promise}
     */
    function loadEditorResources(resources) {

        return Promise.all(
            resources.map(loadResource)
        );

    }

    /**
     * Editor constructor
     * @param params
     * @constructor
     */
    let Editor = function (params) {

        let self = this;

        self.params = params;

        self.init(self.params);

    };

    /**
     * initializes editor, loads scripts and CSS files.
     * @param params
     */
    Editor.prototype.init = function (params) {

        let self = this,
            resources = [],
            plugins = params.plugins;

        // Editors Core
        resources.push({
            name : 'codex-editor',
            path : {
                script : params.scriptPath + 'codex-editor.js',
                style  : params.scriptPath + 'codex-editor.css'
            }
        });

        // load Plugins
        for (let i = 0, plugin; !!(plugin = plugins[i]); i++) {

            resources.push({
                name : plugin,
                path : {
                    script : params.scriptPath + 'plugins/' + plugin + '/' + plugin + '.js',
                    style  : params.scriptPath + 'plugins/' + plugin + '/' + plugin + '.css',
                }
            });

        }

        loadEditorResources(resources)
            .then(() => {

                initEditor.call(self);

            });

    };

    Editor.prototype.destroy = function () {

        destroyEditor();
        CodexEditorInstance = null;

    };

    /**
     * Initializing editor after loading resources
     * calling in Class context
     */
    function initEditor() {

        let constructorClass = this,
            preparedTools = {};

        if (window.paragraph) {

            preparedTools['paragraph'] = {
                type: 'paragraph',
                iconClassname: 'ce-icon-paragraph',
                showInlineToolbar: true,
                allowRenderOnPaste: true,
                instance: window.paragraph
            };

        }

        if (window.header) {

            preparedTools['header'] = {
                type: 'header',
                iconClassname: 'ce-icon-header',
                instance: window.header,
                displayInToolbox: true
            };

        }

        if (window.code) {

            preparedTools['code'] = {
                type: 'code',
                iconClassname: 'ce-icon-code',
                instance: window.code,
                displayInToolbox: true,
                enableLineBreaks: true
            };

        }

        CodexEditorInstance = new codex.editor({
            holderId : constructorClass.params.holderId,
            initialBlockPlugin : 'paragraph',
            hideToolbar: false,
            tools : preparedTools,
            data : []
        });

    }

    function destroyEditor() {

        CodexEditorInstance.destroy();

    }

    return Editor;

})(require('../modules/loader'));
