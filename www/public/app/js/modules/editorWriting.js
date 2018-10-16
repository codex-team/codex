'use strict';

const ajax = require('@codexteam/ajax');
/**
 * Module for pages using Editor
 */
export default class EditorWriting {

    /**
     * Initialize editor on article writing page
     * @param {Object} settings - article form's parameters
     * @param {String} settings.article_holder - textarea with article contents
     * @param {String} settings.form_name - name of form with Editor's data to send
     * @param {String} settings.form_url - url of form with Editor's data
     * @param {String} settings.submit_id - id of submit button
     */
    init(settings) {

        this.article = document.getElementById(settings.article_holder);
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
        let formData = document.forms[this.formName];
        let article = this.article;
        /**
         * Call Editor's save method
         */
        codex.editorWriting.editor.save()
            .then((savedData) => {
                article.value = JSON.stringify(savedData);
                /**
                 * Send article data via ajax
                 */
                ajax.post(
                    {
                        url: this.formURL,
                        data: formData
                    })
                    .then((response) => {
                        console.log('response', response);
                        /**
                         * If response success get article's uri and redirect to it
                         */
                        if (response.success) {
                            window.location.href = response.redirect;
                        } else {
                            console.error(response.message);
                        }
                    })
                    .catch(console.error);
            });
    }

    /**
     * Get article's blocks
     * @return {Array} pageContent.blocks - article's content
     */
    getArticleData() {
        /** If article exists and we edit it */
        if (this.article.textContent.length) {

            /** get content that was written before and render with Codex.Editor */
            let pageContent = JSON.parse(this.article.textContent);

            return pageContent ? pageContent.blocks : [];

        }
    }

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