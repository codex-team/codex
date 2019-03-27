/**
 * Import Dispatcher for Frontend Modules initialization
 */
import moduleDispatcher from 'module-dispatcher';

require('../css/main.css');

/**
 * CodeX community id at vk.com.
 * used by vkWidget module
 */
const VK_COMMUNITY_ID = 103229636;

var codex = (function (codex_) {

    'use strict';

    codex_.settings = {};

    /**
    * Preparation method
    */
    codex_.init = function (settings) {

        /** Save settings or use defaults */
        for (var set in settings ) {

            this.settings[set] = settings[set] || this.settings[set] || null;

        }

        codex.docReady(function () {

            initModules();

        });

    };

    return codex_;

})({});

/**
 * Function responsible for modules initialization
 * Called no earlier than document is ready
 */
function initModules() {

    new moduleDispatcher({
        Library : codex
    });

    codex.scrollUp.init();

    /**
     * Find elements with "deeplinker" class and add click listener
     *
     * @param {string} selector
     */
    codex.deeplinker.init('.deeplinker');

    codex.codeStyling.init('.article-code__content');

    codex.vkWidget.init({
        id: 'vk_groups',
        display: {
            'mode': 3,
            'width': 'auto'
        },
        communityId: VK_COMMUNITY_ID
    });

    /**
     * Acitve play-video buttons
     */
    let playVideoButton = document.querySelector('[name="js-show-player"]');

    if (playVideoButton) {

        const Player = require('./modules/player').default;

        new Player({
            sourceURL: 'public/app/img/products/ar-tester.mp4',
            toggler: playVideoButton,
            wrapperSelector : '.product-card--ar-tester'
        });

    }

}

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
// codex.simpleCode = require('./modules/simpleCodeStyling');
codex.showMoreNews = require('./modules/showMoreNews');
codex.polyfills = require('./modules/polyfills');
codex.ajax = require('./modules/ajax');
codex.profile = require('./modules/profile');
codex.helpers = require('./modules/helpers');
codex.quiz = require('./modules/quiz');
codex.quizForm = require('./modules/quizForm');
codex.transport = require('./modules/transport');
codex.vkWidget = require('./modules/vkWidget');
codex.codeStyling = require('./modules/codeStyling');
codex.deeplinker = require('@codexteam/deeplinker');
codex.reactions = require('./modules/reactions');
codex.pluginsFilter = require('./modules/pluginsFilter');

import EditorLanding from './modules/editorLanding';
codex.editorLanding = new EditorLanding();

import ArticleCreate from './modules/articleCreate';
codex.articleCreate = new ArticleCreate();

module.exports = codex;

