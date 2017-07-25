/**
 * Module for VK community widget: https://vk.com/dev/Community
 * Adds vkWidget to page
 */

var vkWidget = function () {

    var targetId, targetView, communityId,
        VKAPIURI = 'https://vk.com/js/api/openapi.js';

    /**
     * Initialization of module
     *
     * @param  {[Object]} params: id, display: {mode, width}, communityId
     * id - element id, where widget is appended
     * mode - widget appearance ("3" - show people in the community),
     * width - set widget width to a fixed number (without 'px') or auto
     * communityId - id of VK community
     *
     * @example
        vkWidget.init({
            id: 'vk_groups',
            display: {
                'mode': 3,
                'width': 'auto'
            },
            communityId: 103229636
        });
     */

    var init = function (params) {

        targetId = params.id || null,
        targetView = params.display || { 'mode': 3, 'width': 'auto' },
        communityId = params.communityId || 103229636;

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

        vkApiScript.src = VKAPIURI;

        vkApiScript.setAttribute('async', '');

        vkApiScript.onload = showWidget;

        document.body.appendChild(vkApiScript);

    };

    /**
     * Appends VK widget width selected appearance and community id to target div
     */

    var showWidget = function () {

        window.VK.Widgets.Group(targetId, targetView, communityId);

    };

    return {
        init : init
    };

}({});

module.exports = vkWidget;