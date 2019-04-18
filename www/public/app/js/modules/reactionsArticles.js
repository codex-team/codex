'use strict';

const reactions = require('@codexteam/reactions');

/**
 * Module for reactions module initialization and inserting it in a specified place on an article's page
 */

export default class Reactions {

    /**
     * Initialize reactions on pages
     * @param {Object} settings - reactions parameters
     * @param {String} settings.parent - container's class name for reactions module
     * @param {String} settings.title - title for reactions module
     *
     */
    init(settings) {

        let parentElement = document.querySelector('.' + settings.parent),
            reactionsModule = new reactions({parent: parentElement, title: settings.title, reactions: ['👍', '❤', '👎']});

    };

};