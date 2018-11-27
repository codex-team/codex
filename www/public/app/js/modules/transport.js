'use strict';

/**
 * Ajax file transport module
 * @author Savchenko Peter (vk.com/specc)
 * @param {Object} transport
 */
module.exports = (function (transport) {

    transport.currentButtonClicked = {};

    /**
     * @param {String} settings.buttonsClass - class of transport button handler
     */
    transport.init = function (settings) {

        let buttons = document.querySelectorAll(settings.buttonsClass);

        if (!buttons.length) {

            console.warn('Can\'t find element with class: «' + settings.buttonsClass + '»');

            return;

        }

        transport.form  = document.getElementById('transportForm');
        transport.input = document.getElementById('transportInput');

        for (var i = buttons.length - 1; i >= 0; i--) {

            buttons[i].addEventListener('click', transport.buttonCallback, false);

        }

        transport.input.addEventListener('change', transport.submitCallback, false );

    };

    /**
    * @param {Event} event
    */
    transport.buttonCallback = function () {

        var action       = this.dataset.action,
            targetId     = this.dataset.id,
            isMultiple   = !!this.dataset.multiple || false;

        transport.fillForm({
            action : action,
            id     : targetId
        });

        if ( isMultiple ) {

            transport.form.multiple = 'multiple';

        }

        transport.currentButtonClicked = this;
        transport.input.click();

    };

    /**
    * Append hidden inputs to tranport form
    * @param {Object} data
    */
    transport.fillForm = function (data) {

        var input,
            alreadyAddedInput;

        for ( var field in data ) {

            if (typeof data[field] == 'undefined') {

                continue;

            }

            alreadyAddedInput = transport.form.querySelector('input[name=' + field + ']');

            if (typeof alreadyAddedInput != 'undefined' && alreadyAddedInput !== null) {

                input = alreadyAddedInput;

            } else {

                input = document.createElement('input');

            }

            input.type = 'hidden';
            input.name = field;
            input.value = data[field];

            transport.form.appendChild(input);

        }

    };

    transport.submitCallback = function () {

        const FILE_MAX_SIZE = 30 * 1024 * 1024; // 30 MB

        var files = transport.getFileObject( this );

        for (var i = files.length - 1; i >= 0; i--) {

            /** Validate file extension */
            if ( !transport.validateExtension(files[i]) || !transport.validateMIME(files[i]) ) {

                window.console && console.warn('Wrong file type: %o', + files[i].name);
                return;

            }

            /** Validate file size */
            if ( !transport.validateSize( files[i], FILE_MAX_SIZE) ) {

                window.console && console.warn('File size exceeded limit: %o MB', files[i].size / (1024*1024).toFixed(2) );
                return;

            }

        }

        transport.currentButtonClicked.className += ' loading';
        transport.form.submit();

    };

    /**
    * Fires from transport-frame window
    * @param {Object} response
    */
    transport.response = function ( response ) {

        transport.currentButtonClicked.className = transport.currentButtonClicked.className.replace('loading', '');

        if (response.callback) {

            eval(response.callback);

        }

        if ( response.result ) {

            if ( response.result == 'error' ) {

                window.console && console.warn( response.error_description || 'error' );

            }

        }

    };
    /**
    * @param  {[Element]} fileInput
    * @return {[type]}           [description]
    */
    transport.getFileObject = function ( fileInput ) {

        if ( !fileInput ) return false;
        /**
     * Workaround with IE that doesn't support File API
     * @todo test and delete this crutch
     */
        return typeof ActiveXObject == 'function' ? (new ActiveXObject('Scripting.FileSystemObject')).getFile(fileInput.value) : fileInput.files;

    };

    /**
    * @param {Object} accept
    * @param {Object} fileObj
    * @return {Boolean}
    */
    transport.validateMIME = function ( fileObj, accept ) {


        accept = typeof accept == 'array' ? accept : ['image/jpeg', 'image/png'];

        for (var i = accept.length - 1; i >= 0; i--) {

            if ( fileObj.type == accept[i] ) return true;

        }
        return false;

    };

    transport.validateExtension = function ( fileObj, accept ) {

        var ext = fileObj.name.match(/\.(\w+)($|#|\?)/);

        if (!ext) return false;

        ext = ext[1].toLowerCase();

        accept = typeof accept == 'array' ? accept : ['jpg', 'jpeg', 'png'];

        for (var i = accept.length - 1; i >= 0; i--) {

            if ( ext == accept[i] ) return true;

        }

        return false;

    };

    transport.validateSize = function ( fileObj, maxSize ) {

        return fileObj.size < maxSize;

    };

    return transport;

})({});
