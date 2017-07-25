require('../css/main.css');

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

module.exports = codex;

