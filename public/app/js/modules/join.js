/**
 * Module used on join page
 * Adds wobbling effects to blankAuthBlock
 * Toggles into view blankAdditionalFields: Name and Surname, Email
 */
var join = function() {
    
    /**
    * Module initialization
    */
    var init = function() {

        var joinBlank = document.getElementById('joinBlank');

        if ( typeof joinBlank != 'undefined' && joinBlank !== null ){

            var joinBlankTextareas = joinBlank.getElementsByTagName('textarea');

            if (joinBlankTextareas.length) {

                for (var i = joinBlankTextareas.length - 1; i >= 0; i--) {

                    joinBlankTextareas[i].addEventListener('keyup', checkUserCanEdit, false);
                }

            }
        }

        var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');

        if ( typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton !== null ){

            blankShowAdditionalFieldsButton.addEventListener('click', showAdditionalFields, false);

        }
    };

    /**
     * Adds wobble effect to blankAuthBlock if user starts typing into textarea unauthorized
     * @param {Event} event 
     */
    checkUserCanEdit = function (event) {
       
        var textarea       = event.target,
            blankAuthBlock = document.getElementById('blankAuthBlock'),
            emailInput     = document.getElementById('blankEmailInput');

        if (blankAuthBlock && !emailInput.value.length ) {

            if (!blankAuthBlock.className.includes('wobble')) {

                blankAuthBlock.className += ' wobble';
                setTimeout(function () {

                    blankAuthBlock.className = blankAuthBlock.className.replace('wobble', '');

                }, 450);

                textarea.value = '';

            }

        }

    };

    /**
     * Toggles into view blankAdditionalFields: Name and Surname, Email
     * @param {Event} event 
     */
    var showAdditionalFields = function (event) {

        var blankAdditionalFields = document.getElementById('blankAdditionalFields');

        if (blankAdditionalFields.className.includes('additional_fields--hide')) {

            blankAdditionalFields.className = blankAdditionalFields.className.replace('additional_fields--hide', '');

        } else {

            blankAdditionalFields.className += ' additional_fields--hide';

        }
    };

    return {
        init : init
    }

}({})

module.exports = join;