/**
* Polyfilling ECMAScript 6 method String.includes
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Browser_compatibility
*/
if ( !String.prototype.includes ) {

    String.prototype.includes = function () {

        'use strict';

        return String.prototype.indexOf.apply(this, arguments) !== -1;

    };

}


/**
 * Polyfill for Element.prototype.matches method
 */
if (!Element.prototype.matches) {

    Element.prototype.matches = Element.prototype.matchesSelector ||
                                Element.prototype.webkitMatchesSelector ||
                                Element.prototype.mozMatchesSelector ||
                                Element.prototype.msMatchesSelector;

}

/**
 * Polyfill for Element.prototype.closest method
 */
if (!Element.prototype.closest) {

    Element.prototype.closest = function (selector) {

        var node = this;

        while (node) {

            if (node.matches(selector)) return node;
            node = node.parentElement;

        }

        return null;

    };

};