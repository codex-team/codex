'use strict';

/**
 * Module for pages using Editor
 */
export default class Writing {

    /**
     * Initialization. Called by Module Dispatcher
     * @param settings
     */
    init(settings) {

        import(/* webpackChunkName: "editor" */ 'classes/editor')
            .then(({default: Editor}) => {

                let editor = new Editor();

                editor.init(settings);

            });

    };

};