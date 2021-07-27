const ajax = require('@codexteam/ajax');
const notifier = require('codex-notifier');

/**
 * Module for /join page
 * Blocks writing without authorization
 *
 * Toggles into view blankAdditionalFields: Name and Surname, Email
 */
var join = function () {

    const animationClass = 'wobble';

    const formElement = document.getElementById('joinForm');
    const successMessageBanner = document.getElementById('success-message-banner');

    /**
    * Module initialization
    */
    var init = function () {

        if ( typeof formElement != 'undefined' && formElement !== null ) {

            var formElementTextareas = formElement.getElementsByTagName('textarea');

            if (formElementTextareas.length) {

                for (var i = formElementTextareas.length - 1; i >= 0; i--) {

                    formElementTextareas[i].addEventListener('keyup', checkUserCanEdit, false);

                }

            }

        }

        var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');

        if ( typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton !== null ) {

            blankShowAdditionalFieldsButton.addEventListener('click', showAdditionalFields, false);

        }

        formElement.addEventListener('submit', (event) => {

            event.preventDefault();
            event.stopPropagation();

            sendForm(formElement);

        });

    };

    const sendForm = function (form) {

        ajax.post({
            url: '/process-join-form',
            data: new FormData(form),
            type: ajax.contentType.FORM
        })
            .then((response) => {

                if (response.success === 1) {

                    successMessageBanner.style.display = 'block';
                    formElement.style.display = 'none';

                }  else {

                    notifier.show({
                        message: response.message,
                        style: 'error'
                    });

                }

                console.log(response);

            })
            .catch((error) => {

                notifier.show({
                    message: 'Something went wrong',
                    style: 'error'
                });

                console.error(error);

            });

    };

    /**
     * Adds wobble-effect to Auth block if user starts typing into textarea unauthorized
     * @param {Event} event
     */
    let checkUserCanEdit = function (event) {

        var textarea       = event.target,
            blankAuthBlock = document.getElementById('js-join-auth'),
            emailInput     = document.getElementById('js-email');

        if (blankAuthBlock && !emailInput.value.length ) {

            blankAuthBlock.classList.add(animationClass);

            window.setTimeout(() => blankAuthBlock.classList.remove(animationClass), 450);

            textarea.value = '';

        }

    };

    /**
     * Toggles into view blankAdditionalFields: Name and Surname, Email
     * @param {Event} event
     */
    var showAdditionalFields = function () {

        var blankAdditionalFields = document.getElementById('blankAdditionalFields');

        blankAdditionalFields.classList.toggle('hide');

    };

    return {
        init : init
    };

}({});

module.exports = join;
