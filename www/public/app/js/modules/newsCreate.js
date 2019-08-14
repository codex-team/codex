'use strict';

const ajax = require('@codexteam/ajax');

export default class NewsCreate {

    /**
     * Initialize news form
     *
     * @param {Object} settings - news form's parameters
     * @param {String} settings.form_url - url of form with Editor's data
     * @param {String} settings.submit_id - id of submit button
     */
    init(settings, form) {

        this.form = form;
        this.button = document.getElementById(settings.submit_id);
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
             * If data was sent successfully get article's uri and redirect to it
             */
                if (response.success) {

                    window.location.href = response.redirect;

                } else {

                    console.log(response.message);

                }

            })
            .catch((err) => {

                console.log(err);

            });

    }

};
