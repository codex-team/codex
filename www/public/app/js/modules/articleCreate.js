'use strict';

const ajax = require('@codexteam/ajax');
const notifier = require('exports-loader?notifier!codex-notifier');
/**
 * Module for pages using Editor
 */
export default class EditorWriting {

    /**
     * Initialize editor on article writing page
     * @param {Object} settings - article form's parameters
     * @param {String} settings.article_textarea - textarea with article contents
     * @param {String} settings.form_name - name of form with Editor's data to send
     * @param {String} settings.form_url - url of form with Editor's data
     * @param {String} settings.submit_id - id of submit button
     */
    init(settings) {

        this.article = document.getElementById(settings.article_textarea);
        this.formName = settings.form_name;
        this.buttonId = settings.submit_id;
        this.formURL = settings.form_url;

        /**
         * Settings for Editor class
         * @type {{blocks: Object[]}}
         */
        let editorSettings = {
            blocks: this.getArticleData()
        };

        this.loadEditor(editorSettings).then((editor) => {

            this.editor = editor;

        });

        this.prepareSubmit();

    };

    /**
     * Add eventListener to article submit button, submit data on click
     */
    prepareSubmit() {
        document.getElementById(this.buttonId).addEventListener('click', () => {
            this.saveArticle();
        }, false);
    }

    /**
     * Save article's data, in case of success redirect to its uri
     */
    saveArticle() {
        /**
         * Retrieve article's data from form
         * @type {Element} this.formName - article's form name
         */
        let form = document.forms[this.formName];
        let article = this.article;

        /**
         * Call Editor's save method
         */
        this.editor.save()
            .then((savedData) => {
                article.value = JSON.stringify(savedData);
                /**
                 * Send article data via ajax
                 */
                ajax.post({
                        url: this.formURL,
                        data: form
                    })
                    /**
                     * @typedef {Object} response - response after attempt to send form via ajax
                     * @property {string} redirect - article's uri in case of success
                     * @property {string} message - article saving error in case of fail
                     * @property {number} success - article saving status, 1 - success, 0 - fail
                     */
                    .then((response) => {
                        console.log('response', response);
                        /**
                         * If response succeeded get article's uri and redirect to it
                         */
                        if (response.success) {
                            window.location.href = response.redirect;
                        } else {
                            /**
                             * If response failed show message with error text
                             */
                            console.error(response.message);
                            notifier.show({
                                message: response.message,
                                style: 'error'
                            })
                        }
                    })
                    .catch(console.error);
            });
    }

    /**
     * Get article's blocks
     */
    getArticleData() {
        /** If article exists return its data */
        if (this.article.textContent.length) {

            /**
             * Article's data
             */
            let pageContent;

            /**
             * Get content that was written before and render with Codex Editor
             */
            try {
                pageContent = JSON.parse(this.article.textContent);
            } catch (error) {
                console.error('Errors occurred while parsing Editor data', error);
            }

            return pageContent ? pageContent.blocks : [];

        }
    }

    /**
     * Load Editor from separate chunk
     * @param {Object} settings - settings for Editor initialization
     * @return {Promise<Editor>} - CodeX Editor promise
     */
    loadEditor(settings) {

        return import(/* webpackChunkName: "editor" */ 'classes/editor')
            .then(({default: Editor}) => {

                return new Editor(settings);

            });

    }

};