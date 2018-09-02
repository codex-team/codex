'use strict';

/**
 * Plugins filter on editor landing page
 */
module.exports = (function () {

    /**
     * Block plugins
     */
    let blockTools;

    /**
     * Inline Tool plugins
     */
    let inlineTools;

    /**
     * Button to show only Block plugins
     */
    let blockFilterButton;

    /**
     * Button to show only Inline Tool plugins
     */
    let inlineFilterButton;

    /**
     * Button to show all types of plugins
     */
    let allToolsFilterButton;

    /**
     * Initialize module
     * @param {Object} settings                             - module's parameters passed from ModuleDispatcher
     * @param {String} settings.blockToolsClass             - class of Editor Block Tools
     * @param {String} settings.inlineToolsClass            - class of Editor Inline Tools
     * @param {String} settings.blockFilterButtonClass      - class of button Block Tools filter
     * @param {String} settings.inlineFilterButtonClass     - class of button Inline Tools filter
     * @param {String} settings.allToolsFilterButtonClass   - class of button showing all types of Tools
     */
    const init = function (settings) {

        blockTools = document.querySelectorAll(settings.blockToolsClass);
        inlineTools = document.querySelectorAll(settings.inlineToolsClass);
        blockFilterButton = document.querySelector(settings.blockFilterButtonClass);
        inlineFilterButton = document.querySelector(settings.inlineFilterButtonClass);
        allToolsFilterButton = document.querySelector(settings.allToolsFilterButtonClass);

        /**
         * Add event listeners if filter buttons exist, otherwise show console messages
         */
        if (blockFilterButton) {

            blockFilterButton.addEventListener('click', function () {

                showBlockToolsOnly();

            });

        } else {

            console.warn('Can\'t find button with class: «' + settings.blockFilterButtonClass + '»');

        }

        if (inlineFilterButton) {

            inlineFilterButton.addEventListener('click', function () {

                showInlineToolsOnly();

            });

        } else {

            console.warn('Can\'t find output target with class: «' + settings.inlineFilterButtonClass + '»');

        }

        if (allToolsFilterButton) {

            allToolsFilterButton.addEventListener('click', function () {

                showAllPlugins();

            });

        } else {

            console.warn('Can\'t find output target with class: «' + settings.allToolsFilterButtonClass + '»');

        }

    };

    /**
     * Show only Blocks, hide Inline Tools
     */
    const showBlockToolsOnly = function () {

        for (let i = 0; i < inlineTools.length; i ++) {

            inlineTools[i].classList.add('hide');

        }

        for (let i = 0; i < blockTools.length; i ++) {

            blockTools[i].classList.remove('hide');

        }

    };

    /**
     * Show only Inline Tools, hide Blocks
     */
    const showInlineToolsOnly = function () {

        for (let i = 0; i < blockTools.length; i ++) {

            blockTools[i].classList.add('hide');

        }

        for (let i = 0; i < inlineTools.length; i ++) {

            inlineTools[i].classList.remove('hide');

        }

    };

    /**
     * Show all types of Editor Tools
     */
    const showAllPlugins = function () {

        for (let i = 0; i < blockTools.length; i ++) {

            blockTools[i].classList.remove('hide');

        }

        for (let i = 0; i < inlineTools.length; i ++) {

            inlineTools[i].classList.remove('hide');

        }

    };

    return {
        init : init
    };

}({}));