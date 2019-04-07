'use strict';

/**
* Module for reactions init
*/

export default class Reactions {

    /**
     * Initialize reactions on pages
     * @param {Object} settings - reactions parameters
     * @param {String} settings.parent - container's selector for reactions module
     */
    init(settings) {

        let parentElement = document.querySelector(settings.parent),
            reactionsModule = new codex.reactions({parent: parentElement, title: '', reactions: ['👍', '❤', '👎']});
    };
};