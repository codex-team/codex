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


codex.content = require('./modules/content');
codex.scrollUp = require('./modules/scrollUp');
// codex.dragndrop = require('./modules/dragndrop');
// codex.Polyfill = require('./modules/Polyfill');
// codex.xhr = require('./modules/xhr');
codex.callbacks = require('./modules/callbacks');
// codex.load = require('./modules/load');
// codex.helpers = require('./modules/helpers');
// codex.sharer = require('./modules/sharer');
// codex.fixColumns = require('./modules/fixColumns');


// codex.core = require('./modules/core');
codex.developer = require('./modules/addDeveloper');
// codex.ce = require('./modules/ce_interface');
// codex.dragndrop = require('./modules/feedDragNDrop');
// codex.simpleCode = require('./modules/simpleCodeStyling');
// codex.bot = require('./modules/bot');
// codex.editor = require('./modules/editor');
// codex.quiz = require('./modules/quiz');
// codex.quizForm = require('./modules/quizForm');
// codex.transport = require('./modules/transport');

module.exports = codex;

