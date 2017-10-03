require('../css/main.css');

/**
 * CodeX community id at vk.com.
 * used by vkWidget module
 */
const VK_COMMUNITY_ID = 103229636;

var codex = (function (codex_) {

    codex_.settings = {};

    /**
    * Preparation method
    */
    codex_.init = function (settings) {

        /** Save settings or use defaults */
        for (var set in settings ) {

            this.settings[set] = settings[set] || this.settings[set] || null;

        }

        codex.scrollUp.init();

        codex.simpleCode.init('.article__code');

        codex.vkWidget.init({
            id: 'vk_groups',
            display: {
                'mode': 3,
                'width': 'auto'
            },
            communityId: VK_COMMUNITY_ID
        });



    };

    return codex_;

})({});

/**
* Document ready event listener
* @usage codex.docReady(function(){ # code ... } );
*/
codex.docReady = function (f) {

    return /in/.test(document.readyState) ? window.setTimeout(codex.docReady, 9, f) : f();

};

/**
* Pages
*/
codex.admin = require('./modules/admin');
codex.join = require('./modules/join');


/**
 * Modules
 */
codex.core = require('./modules/core');
codex.dragndrop = require('./modules/dragndrop');
codex.scrollUp = require('./modules/scrollUp');
codex.sharer = require('./modules/sharer');
codex.developer = require('./modules/bestDevelopers');
codex.simpleCode = require('./modules/simpleCodeStyling');
codex.showMoreNews = require('./modules/showMoreNews');
codex.polyfills = require('./modules/polyfills');
codex.ajax = require('./modules/ajax');
codex.profile = require('./modules/profile');
codex.helpers = require('./modules/helpers');
codex.quiz = require('./modules/quiz');
codex.quizForm = require('./modules/quizForm');
codex.transport = require('./modules/transport');
codex.vkWidget = require('./modules/vkWidget');
codex.editor = require('./modules/editor');
codex.loader = require('./modules/loader');

module.exports = codex;

