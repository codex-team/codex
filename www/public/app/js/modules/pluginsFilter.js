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
     * Plugins filter buttons
     */
    let filterButtons;
    let filterButtonActiveClass;
    let filterButtonClass;

    /**
     * Initialize module
     * @typedef {Object} settings                             - module's parameters passed from ModuleDispatcher
     * @param   {String} settings.blockToolsClass             - class of Editor Block Tools
     * @param   {String} settings.inlineToolsClass            - class of Editor Inline Tools
     * @param   {String} settings.blockFilterButtonClass      - class of button Block Tools filter
     * @param   {String} settings.inlineFilterButtonClass     - class of button Inline Tools filter
     * @param   {String} settings.allToolsFilterButtonClass   - class of button showing all types of Tools
     * @param   {String} settings.filterButtonClass           - class of all filter buttons
     * @param   {String} settings.filterButtonActiveClass     - active class selected filter button
     */
    const init = function (settings) {

        blockTools = document.querySelectorAll(settings.blockToolsClass);
        inlineTools = document.querySelectorAll(settings.inlineToolsClass);

        const pluginFilters = [
            {
                'buttonClass': settings.blockFilterButtonClass,
                'buttonAction': showBlockToolsOnly
            },
            {
                'buttonClass': settings.inlineFilterButtonClass,
                'buttonAction': showInlineToolsOnly
            },
            {
                'buttonClass': settings.allToolsFilterButtonClass,
                'buttonAction': showAllPlugins
            }
        ];

        /**
         * Add event listener if filter button exists, otherwise show console message
         */
        for (let j = 0; j < pluginFilters.length; j++) {

            const filterButton = document.querySelector(pluginFilters[j].buttonClass);
            const buttonClass  = pluginFilters[j].buttonClass;
            const filterAction = pluginFilters[j].buttonAction;

            if (filterButton) {

                filterButton.addEventListener('click', filterAction);

            } else {

                console.warn('Can\'t find button with class: «' + buttonClass + '»');

            }
        }

        /**
         * Plugins filter buttons stuff
         */
        filterButtons = document.querySelectorAll(settings.filterButtonClass);
        filterButtonActiveClass = settings.filterButtonActiveClass;
        filterButtonClass = settings.filterButtonClass;
    };

    /**
     * Show only Inline Tools, hide Blocks
     */
    const showInlineToolsOnly = function (event) {

        toggleTools(inlineTools, blockTools);

        toggleActiveButtonClass(event.target);

    };

    /**
     * Show only Blocks, hide Inline Tools
     */
    const showBlockToolsOnly = function (event) {

        toggleTools(blockTools, inlineTools);

        toggleActiveButtonClass(event.target);

    };

    /**
     * Show all types of Editor Tools
     */
    const showAllPlugins = function (event) {

        toggleTools(inlineTools, blockTools, false);

        toggleActiveButtonClass(event.target);

    };

    /**
     * Toggle button's active class
     */
    const toggleActiveButtonClass = function (target) {

        filterButtons.forEach((button) => {

            button.classList.remove(filterButtonActiveClass);

        });

        target.closest(filterButtonClass).classList.add(filterButtonActiveClass);
    };

    /**
     * Toggle Editor Block and Inline Tools into view
     * @param {HTMLCollection} toolsToShow - Block or Inline Editor's Tools to show
     * @param {HTMLCollection} toolsToHide - Block or Inline Editor's Tools to hide
     * @param {Boolean} hideOneType        - pass false to show both Block and Inline Tools
     */
    const toggleTools = function (toolsToShow, toolsToHide, hideOneType = true) {

        for (let i = 0; i < toolsToHide.length; i ++) {

            toolsToHide[i].classList.toggle('hide', hideOneType);

        }

        for (let i = 0; i < toolsToShow.length; i ++) {

            toolsToShow[i].classList.toggle('hide', false);

        }

    };

    return {
        init : init
    };

}({}));
