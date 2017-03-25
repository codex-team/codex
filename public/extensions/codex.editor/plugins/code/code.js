/**
 * Code Plugin\
 * Creates code tag and adds content to this tag
 */

var code = (function(code_plugin) {

    var baseClass = "ce-code";

    /**
     * Make initial header block
     * @param {object} JSON with block data
     * @return {Element} element to append
     */
    var make_ = function (data) {

        var tag = codex.editor.draw.node('TEXTAREA', [baseClass], {});

        if (data && data.text) {
            tag.value = data.text;
        }

        return tag;
    };

    /**
     * Escapes HTML chars
     * @param  {string} str input
     * @return {string} with escaped < , > etc symbols
     */
    var escapeHTML_ = function (str) {

        var div = document.createElement('DIV'),
            text = document.createTextNode(str);

        div.appendChild(text);

        return div.innerHTML;

    };

    /**
     * Method to render HTML block from JSON
     */
    code_plugin.render = function (data) {

        return make_(data);
    };

    /**
     * Method to extract JSON data from HTML block
     */
    code_plugin.save = function (blockContent) {

        var HTMLescaped = escapeHTML_(blockContent.value);

        var data = {
            text : HTMLescaped
        };
        return data;

    };

    code_plugin.validate = function (data) {

        if (data.text.trim() === '')
            return;

        return true;
    };

    code_plugin.destroy = function () {

        code = null;

    };

    return code_plugin;

})({});
