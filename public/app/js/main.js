require('../css/main.css');

var codex = (function (codex) {

    codex.settings = {};

    /**
    * Preparation method
    */
    codex.init = function (settings) {

        /** Save settings or use defaults */
        for (var set in settings ) {

            this.settings[set] = settings[set] || this.settings[set] || null;

        }

        codex.scrollUp.init();

    };



    return codex;


})({});

/**
* Document ready event listener
* @usage codex.docReady(function(){ # code ... } );
*/
codex.docReady = function (f) {

    return /in/.test(document.readyState) ? setTimeout(codex.docReady, 9, f) : f();

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

codex.content = require('./modules/content');

// codex.Polyfill = require('./modules/Polyfill');
// codex.xhr = require('./modules/xhr');

// codex.callbacks = require('./modules/callbacks');
// codex.load = require('./modules/load');
// codex.helpers = require('./modules/helpers');

// codex.fixColumns = require('./modules/fixColumns');







codex.quiz = require('./modules/quiz');
codex.quizForm = require('./modules/quizForm');
// codex.transport = require('./modules/transport');

module.exports = codex;

