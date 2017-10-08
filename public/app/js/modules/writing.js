/**
 *
 * @type {{start}}
 */
module.exports = ( function (Editor) {

    'use strict';

    let EditorSettings = null;
    let EditorInstance = null;
    let Instances = [];

    /**
     * Starts editor
     * @param settings
     */
    function start(settings) {

        EditorInstance = new Editor(settings);

        /** All initialized editors */
        Instances.push(EditorInstance);

    }

    function destroyEditor() {

        EditorInstance.destroy();

    }

    function destroy() {

        destroyEditor();
        EditorInstance = null;
        Instances = null;

    }

    return {
        start,
        destroy
    };

})(require('../classes/Editor'));