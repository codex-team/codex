/**
* Ajax file transport module
* @author Savchenko Peter (vk.com/specc)
*/
module.exports = (function (transport) {

    transport.currentButtonClicked = {};

    transport.init = function (buttons) {

        transport.form  = document.getElementById('transportForm');
        transport.input = document.getElementById('transportInput');

        for (var i = buttons.length - 1; i >= 0; i--) {

            buttons[i].addEventListener('click', transport.buttonCallback, false);

        }

        transport.input.addEventListener('change', transport.submitCallback, false );

    };

    transport.buttonCallback = function (event) {

        var action        = this.dataset.action,
            target_id     = this.dataset.id,
            is_multiple   = !!this.dataset.multiple || false;

        transport.fillForm({
            action : action,
            id     : target_id
        });

        if ( is_multiple ) {

            transport.form.multiple = 'multiple';

        }

        transport.currentButtonClicked = this;
        transport.input.click();

    };

    /**
    * Append hidden inputs to tranport form
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

    transport.getFileObject = function ( fileInput ) {

        if ( !fileInput ) return false;
        /**
        * Workaround with IE that doesn't support File API
        * @todo test and delete this crutch
        */
        return typeof ActiveXObject == 'function' ? (new ActiveXObject('Scripting.FileSystemObject')).getFile(fileInput.value) : fileInput.files;

    };

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

    transport.validateSize = function ( fileObj, max_size) {

        return fileObj.size < max_size;

    };

    return transport;

})({});