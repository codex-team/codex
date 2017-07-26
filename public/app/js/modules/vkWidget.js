/**
 * Module for VK community widget: https://vk.com/dev/Community
 * Adds vkWidget to page
 */
var vkWidget = function () {

    var targetId, targetView, communityId,
        VK_API_URI = 'https://vk.com/js/api/openapi.js';

    /**
     * Initialization of module
     *
     * @param  {[Object]} params
     * @param {int} params.id - element id, where widget is appended
     * @param {int} params.display.mode - widget appearance ("3" - show people in the community)
     * @param {int|string} params.display.width - set widget width to a fixed number or auto
     * @param {int} params.communityId - id of VK community
     *
     * @example
     * vkWidget.init({
     *   id: 'vk_groups',
     *   display: {
     *       'mode': 3,
     *       'width': 'auto'
     *   },
     *   communityId: 103229636
     * });
     */
    var init = function (params) {

        targetId = params.id || null,
        targetView = params.display || { 'mode': 3, 'width': 'auto' },
        communityId = params.communityId || 0;

        if (document.getElementById(targetId) == undefined) {

            console.log('Cannot find element with id '+ targetId);
            return;

        };

        loadScript();

    };

    /**
     * Loads VK Api script to initialize a widget
     * and appends it to page
     */
    var loadScript = function () {

        var vkApiScript = document.createElement('SCRIPT');

        vkApiScript.src = VK_API_URI;

        vkApiScript.setAttribute('async', 'true');

        vkApiScript.onload = showWidget;

        document.body.appendChild(vkApiScript);

    };

    /**
     * Runs widget initiating from vkApi
     */
    var showWidget = function () {

        window.VK.Widgets.Group(targetId, targetView, communityId);

    };

    return {
        init : init
    };

}({});

module.exports = vkWidget;