'use strict';

const reactions = require('@codexteam/reactions');

/**
* Module for reactions init
*/

export default class ReactionsCreate {

    /**
     * Initialize reactions on pages
     * @param {Object} settings - reactions parameters
     * @param {String} settings.parent - container's selector for reactions module
     */
    init(settings) {

        this.parent = document.querySelector(settings.parent);

        let reactionsModule = new codex.reactions({parent: this.parent, title: '', reactions: ['👍', '❤', '👎']});
    };
};