content = {

    /**
    * Module uses for toggle custom checkboxes
    * that has 'js-custom-checkbox' class and input[type="checkbox"] included
    * Example:
    * <span class="js-custom-checkbox">
    *    <input type="checkbox" name="" value="1"/>
    * </span>
    */
    customCheckboxes : {

        /**
        * This class specifies checked custom-checkbox
        * You may set it on serverisde
        */
        CHECKED_CLASS : 'checked',

        init : function () {

            var checkboxes = document.getElementsByClassName('js-custom-checkbox');

            if (checkboxes.length) for (var i = checkboxes.length - 1; i >= 0; i--) {

                checkboxes[i].addEventListener('click', codex.content.customCheckboxes.clicked, false);

            }

        },

        clicked : function () {

            var checkbox  = this,
                input     = this.querySelector('input'),
                isChecked = this.classList.contains(codex.content.customCheckboxes.CHECKED_CLASS);

            checkbox.classList.toggle(codex.content.customCheckboxes.CHECKED_CLASS);

            if (isChecked) {

                input.removeAttribute('checked');

            } else {

                input.setAttribute('checked', 'checked');

            }

        }

    },

    /**
    * Helper for 'show more news' button
    * @param {Element} button   - appender button
    */
    showMoreNews : function ( button ) {

        var PORTION = 5;

        var news = document.querySelectorAll('.news__list_item'),
            hided = [];

        for (var i = 0, newsItem; !!(newsItem = news[i]); i++) {

            if ( newsItem.classList.contains('hide') ) {

                hided.push(newsItem);

            }

        }

        hided.splice(0, PORTION).map(function (item) {

            item.classList.remove('hide');

        });

        if (!hided.length) {

            button.classList.add('hide');

        }

    },

    /**
     * Calculates offset of DOM element
     *
     * @param el
     * @returns {{top: number, left: number}}
     */
    getOffset : function ( el ) {

        var _x = 0;
        var _y = 0;

        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {

            _x += (el.offsetLeft + el.clientLeft);
            _y += (el.offsetTop + el.clientTop);
            el = el.offsetParent;

        }
        return { top: _y, left: _x };

    }
};

module.exports = content;
