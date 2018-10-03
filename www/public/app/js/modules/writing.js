'use strict';

/**
 * Module for pages using Editor
 */
export default class Writing {

    constructor() {

        this.editor = null;

    }

    /**
     * @typedef {Object} settings - Editor initialization settings
     * @param {String} settings.output_id - ID of container where Editor's saved data will be shown
     * @param {Object[]} settings.blocks  - Editor's blocks content
     */

    /**
     * Initialization. Called by Module Dispatcher
     */
    init(settings) {

        this.loadEditor().then((editor) => {

            this.editor = editor;

            this.editor.init(settings);

            this.prepareEditor();

        });

    };

    /**
     * Load Editor from separate chunk
     */
    loadEditor() {

        return import(/* webpackChunkName: "editor" */ 'classes/editor')
            .then(({default: Editor}) => {

                return new Editor();

            });

    }

    /**
     * When Editor is ready, trigger click inside editor to show toolbar
     * Preview JSON output
     */
    prepareEditor() {

        this.editor.editor.isReady
            .then(() => {

                document.querySelector('.codex-editor__redactor').click();

                this.editor.previewData();

            })
            .catch((reason) => {

                console.log(`CodeX Editor initialization failed because of ${reason}`);

            });

    };

};