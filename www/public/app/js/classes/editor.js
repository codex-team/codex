/**
 * CodeX Editor bundle
 */
import EditorJS from '@editorjs/editorjs';

/**
 * Block Tools for the Editor
 */
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';

/**
 * Inline Tools for the Editor
 */
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Translate from '@editorjs/translate-inline';

import * as _ from '../utils';


/**
 * Class for working with CodeX Editor
 */
export default class Editor {

    /**
     * Initialize Editor
     * @param settings - Editor data settings
     * @param {Object[]} settings.blocks - Editor's blocks content
     * @param {function} settings.onChange - Modifications callback for the Editor
     * @param {function} settings.onReady - Editor is ready callback
     * @param {boolean} settings.autofocus - focus Editor on ready
     * @param {EditorConfig} settings.editorConfigOverride - any properties to override the default Editor config
     */
    constructor(settings) {

        /**
         * CodeX Editor instance
         * @type {EditorJS|null}
         */
        this.editor = null;

        /**
         * Define content of Editor's blocks
         * @type {Object|{blocks}}
         */
        const editorData = settings.blocks || this.defaultEditorData();

        /**
         * Instantiate new CodeX Editor with set of Tools
         */
        this.editor = new EditorJS(_.mergeDeep({
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link', 'marker', 'Translate'],
                },

                image: {
                    class: ImageTool,
                    inlineToolbar: true,
                    config: {
                        types: 'image/jpeg, image/jpg, image/png, image/gif, video/mp4, video/quicktime',
                        field: 'media',
                        endpoints: {
                            byFile: '/editor/transport',
                            byUrl: '/editor/transport',
                        }
                    },
                },

                list: {
                    class: List,
                    inlineToolbar: true
                },

                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/editor/fetchUrl', // Your backend endpoint for url data fetching
                    }
                },

                code: {
                    class: CodeTool,
                    shortcut: 'CMD+SHIFT+D'
                },

                quote: {
                    class: Quote,
                    inlineToolbar: true,
                },

                delimiter: Delimiter,

                embed: Embed,

                table: {
                    class: Table,
                    inlineToolbar: true
                },

                rawTool: RawTool,

                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C'
                },

                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M'
                },

                Translate: {
                    class: Translate,
                    config: {
                        endpoint: '/editor/translate?text=',
                    },
                    shortcut: 'CMD+SHIFT+S'
                }
            },

            data: {
                blocks: editorData
            },

            onChange: () => {

                if (settings.onChange instanceof Function) {

                    settings.onChange();

                }

            },

            onReady: () => {

                if (settings.onReady instanceof Function) {

                    settings.onReady();

                }

            },

            autofocus: settings.autofocus,
        }, settings.editorConfigOverride || {}));

    }

    /**
     * Return Editor data
     * @return {Promise.<{}>}
     */
    save() {

        return this.editor.saver.save();

    }

    /**
     * Click on Editor's node to focus after Editor has loaded
     */
    focus() {

        document.querySelector('.codex-editor__redactor').click();

    }

    /**
     * Define default Editor's data if none was passed
     * @returns {Object[]} blocks
     */
    defaultEditorData() {

        return [
            // {
            //     type: 'header',
            //     data: {
            //         text: '',
            //         level: 2
            //     }
            // }
        ];

    }

};
