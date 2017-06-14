/**
 * codex.bestDevelopers module
 * Sets best developers values in admin/user for further output in templates/developers.php
 */
var developer = function () {

    var bind = function () {

        var chBoxes = document.querySelectorAll('.developer-checkbox');

        for (var i = chBoxes.length-1; i > -1; i--) {

            chBoxes[i].addEventListener('change', toggle);

        }

    };

    /**
     * Sends ajax data 0 or 1, whether user is best developer or not
     * @param {Event} event
     * @uses codex.core.ajax 
     */

    var toggle = function (event) {

        var data = {
            data: 'id='+event.target.id+'&value='+(event.target.checked?1:0),
            url: '/admin/developer'
        };

        codex.core.ajax(data);

    };

    return {
        bind: bind
    };

}();

module.exports = developer;
