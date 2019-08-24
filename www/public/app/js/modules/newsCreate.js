'use strict';

const ajax = require('@codexteam/ajax');
const notifier = require('codex-notifier');

export default class NewsCreate {

    /**
     * Initialize news form
     *
     * @param {Object} settings - news form's parameters
     * @param {string} settings.form_url - url of form with news data
     * @param {string} settings.submit_id - id of submit button
     */
    init(settings, form) {

        this.form = form;
        this.button = document.getElementById(settings.submit_id);

        if (!this.button) {

            console.warn(`Can't find button with «${settings.submit_id}» id`);

        }

        this.formURL = settings.form_url;

        this.prepareSubmit();

    }

    /**
     * Add eventListener to news submit button, submit data on click
     */
    prepareSubmit() {

        this.button.addEventListener('click', () => {

            this.saveNews();

        }, false);

    }

    /**
     * Save news data
     */
    saveNews() {

        return ajax.post({
            url: this.formURL,
            data: this.form
        })
            .then((response) => {

                /**
                 * If data was sent successfully redirect to home page
                 */
                if (response.success) {

                    window.location.href = response.redirect;

                } else {

                    this.showErrorMessage(response.message);

                }

            })
            .catch((err) => {

                this.showErrorMessage(err);

            });

    }

    /**
     * Show any error message
     *
     * @param {string} err - form submission error message
     */
    showErrorMessage(err) {

        notifier.show({
            message: err,
            style: 'error'
        });

    }

};
