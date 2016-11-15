/**
* Paragraph Plugin\
* Creates P tag and adds content to this tag
*/
var paragraphTool = {

    /**
    * Make initial header block
    * @param {object} JSON with block data
    * @return {Element} element to append
    */
    make : function (data) {

        var tag = document.createElement('DIV');

        tag.classList.add('ce-paragraph');

        if (data && data.text) {
            tag.innerHTML = data.text;
        }

        tag.contentEditable = true;

        /**
         * if plugin need to add placeholder
         * tag.setAttribute('data-placeholder', 'placehoder');
         */

        return tag;

    },

    /**
    * Method to render HTML block from JSON
    */
    render : function (data) {

       return paragraphTool.make(data);

    },

    /**
    * Method to extract JSON data from HTML block
    */
    save : function (blockContent){

        var json  = {
                type : 'paragraph',
                data : {
                    text : null,
                }
            };

        json.data.text = blockContent.innerHTML;

        return json;

    },

};

/**
* Now plugin is ready.
* Add it to redactor tools
*/
cEditor.tools.paragraph = {

    type             : 'paragraph',
    iconClassname    : 'ce-icon-paragraph',
    make             : paragraphTool.make,
    appendCallback   : null,
    settings         : null,
    render           : paragraphTool.render,
    save             : paragraphTool.save,
    display          : false,
    enableLineBreaks : false,
    allowedToPaste   : true

};
