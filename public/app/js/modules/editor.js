/**
 * Editor module
 */
module.exports = function () {

    'use strict';

    let path = '';

    /**
     * Loads resource
     *
     * @param  {Object} resource name and paths for js and css
     * @return {Promise}
     */
    function loadResource(resource) {

        var name      = resource.name,
            scriptUrl = resource.path.script,
            styleUrl  = resource.path.style;

        return Promise.all([
            codex.loader.importScript(scriptUrl, name),
            codex.loader.importStyle(styleUrl, name)
        ]);

    }

    /**
     * Load editor resources and append block with them to body
     *
     * @param  {Array} resources list of resources which should be loaded
     * @return {Promise}
     */
    var loadEditorResources = function (resources) {

        return Promise.all(
            resources.map(loadResource)
        );

    };
    /**
     * Starts editor
     * @param settings
     */

    function start(settings) {

        for(let i = 0; i < settings.length; i++) {

            loadPlugin(settings[i]);

        }

    }

    return {
        start
    };

}();
