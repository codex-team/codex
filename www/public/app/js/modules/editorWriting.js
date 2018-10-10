'use strict';


/**
 * Module for pages using Editor
 */
export default class EditorWriting {

    constructor() {

        /**
         * Editor class Instance
         */
        this.editor = null;

    }

    /**
     * Initialization. Called by Module Dispatcher
     */
    init(editorWritingSettings) {

        /**
         * Settings for Editor class
         * @type {{blocks: Object[]}}
         */
        let editorSettings = {
            blocks: editorWritingSettings.blocks
        };

        this.loadEditor(editorSettings).then((editor) => {

            this.editor = editor;

        });

    };

    /**
     * Load Editor from separate chunk
     * @param settings - settings for Editor initialization
     * @return {Promise<Editor>} - CodeX Editor promise
     */
    loadEditor(settings) {

        return import(/* webpackChunkName: "editor" */ 'classes/editor')
            .then(({default: Editor}) => {

                return new Editor(settings);

            });

    }

};