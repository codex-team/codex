module.exports = (function(){

    var joinBlank = document.getElementById('joinBlank');
    if ( typeof joinBlank != 'undefined' && joinBlank !== null ){
        var joinBlankTextareas = joinBlank.getElementsByTagName('textarea');
        if (joinBlankTextareas.length) {

            for (var i = joinBlankTextareas.length - 1; i >= 0; i--) {
                joinBlankTextareas[i].addEventListener('keyup', callbacks.checkUserCanEdit, false);
            }

        }
    }

    var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');
    if ( typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton !== null ){

        blankShowAdditionalFieldsButton.addEventListener('click', callbacks.showAdditionalFields, false);

    }


    /** <code> highlighting */
    var sourcesBlocks = document.querySelectorAll(".article_content code");
    if (sourcesBlocks.length){
        load.getScript({
            async    : true,
            url      : '/public/js/simpleCodeStyling.js?v=5',
            instance : 'simpleCodeStyling',
            loadCallback : function(response){
                simpleCode.init('.article_content code');
            }
        });
    }

    /** File transport button handlers */
    var fileTransportButtons = document.getElementsByClassName("file-transport-button");
    if (fileTransportButtons.length){
        load.getScript({
            async    : true,
            url      : '/public/js/transport.js',
            instance : 'fileTransport',
            loadCallback : function(response){

                transport.init(fileTransportButtons);

            }
        });
    }

    /** Initialize scroll up button */
    codex.scrollUp.init();

});