'use strict';

import editor from './editor';

export default class Writing {

    init(settings) {

        editor.init(settings);

        // import(/* webpackChunkName: "codex-editor" */ './editor')
        //     .then(({default: cdxEditor}) => {
        //
        //         cdxEditor.init(settings);
        //
        //     });
    };

};