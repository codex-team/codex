'use strict';

class Writing {

    init(settings) {

         import(/* webpackChunkName: "codex-editor" */ './editor')
             .then(({default: cdxEditor}) => {

                 let Editor = new cdxEditor();

                 Editor.init(settings);

             });

    };

};

module.exports = new Writing();