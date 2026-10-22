/**
 * Import Dispatcher for Frontend Modules initialization
 */
import moduleDispatcher from 'module-dispatcher';

/**
 * Import CSS
 */
import '../css/main.css';

/**
 * Import Pages
 */
import admin from './modules/admin';
import join from './modules/join';

/**
 * Import Modules
 */
import core from './modules/core';
import dragndrop from './modules/dragndrop';
import scrollUp from './modules/scrollUp';
import sharer from './modules/sharer';
import developer from './modules/bestDevelopers';
import showMoreNews from './modules/showMoreNews';
import polyfills from './modules/polyfills';
import ajax from './modules/ajax';
import profile from './modules/profile';
import helpers from './modules/helpers';
import quiz from './modules/quiz';
import quizForm from './modules/quizForm';
import transport from './modules/transport';
import vkWidget from './modules/vkWidget';
import codeStyling from './modules/codeStyling';
import deeplinker from '@codexteam/deeplinker';
import pluginsFilter from './modules/pluginsFilter';

import EditorLanding from './modules/editorLanding';
import ArticleCreate from './modules/articleCreate';
import NewsCreate from './modules/newsCreate';

/**
 * CodeX community id at vk.com.
 * used by vkWidget module
 */
const VK_COMMUNITY_ID = 103229636;

const codex = (function (codex_) {

    'use strict';

    codex_.settings = {};

    /**
    * Preparation method
    */
    codex_.init = function (settings) {

        /** Save settings or use defaults */
        for (const set in settings ) {

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
    const playVideoButton = document.querySelector('[name="js-show-player"]');

    if (playVideoButton) {

        import('./modules/player').then(module => {

            const Player = module.default;

            new Player({
                sourceURL: 'public/app/img/products/ar-tester.mp4',
                toggler: playVideoButton,
                wrapperSelector : '.product-card--ar-tester'
            });

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
 * Attach modules to codex object
 */
codex.admin = admin;
codex.join = join;
codex.core = core;
codex.dragndrop = dragndrop;
codex.scrollUp = scrollUp;
codex.sharer = sharer;
codex.developer = developer;
codex.showMoreNews = showMoreNews;
codex.polyfills = polyfills;
codex.ajax = ajax;
codex.profile = profile;
codex.helpers = helpers;
codex.quiz = quiz;
codex.quizForm = quizForm;
codex.transport = transport;
codex.vkWidget = vkWidget;
codex.codeStyling = codeStyling;
codex.deeplinker = deeplinker;
codex.pluginsFilter = pluginsFilter;
codex.editorLanding = new EditorLanding();
codex.articleCreate = new ArticleCreate();
codex.newsCreate = new NewsCreate();

export default codex;

