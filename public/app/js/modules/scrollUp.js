/**
* Module for scroll-up button
*/
module.exports = function () {

    /**
    * Page scroll offset to show scroll-up button
    */
    var SCROLL_UP_OFFSET = 100,
        button = null;

    var scrollPage = function () {

        window.scrollTo(0, 0);

    };

    var windowScrollHandler = function () {

        if (window.pageYOffset > SCROLL_UP_OFFSET) {

            button.classList.add('show');

        } else {

            button.classList.remove('show');

        }

    };

    /**
    * Init method
    * Fired after document is ready
    */
   
    var init = function () {

        /** Find scroll-up button */
        button = document.createElement('DIV');

        button.classList.add('scroll-up');
        document.body.appendChild(button);

        /** Bind click event on scroll-up button */
        button.addEventListener('click', scrollPage);

        /** Global window scroll handler */
        window.addEventListener('scroll', windowScrollHandler);

    };

    return {
        init : init
    }


}();
