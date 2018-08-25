/**
 * codex.showMoreNews module
 * Used in news block
 * Reveals more news when appender button is fired
 * Usage onclick="codex.showMoreNews.init( this );"
 */
var showMoreNews = function () {

    /**
     * Helper for 'show more news' button
     * @param {Element} button   - appender button
     */
    var init = function ( button ) {

        var PORTION = 5; // Amount of news shown each time appender button is fired

        var news = document.querySelectorAll('.news__list_item'),
            hided = [];

        for (var i = 0, newsItem; !!(newsItem = news[i]); i++) {

            if ( newsItem.classList.contains('news__list_item--hidden') ) {

                hided.push(newsItem);

            }

        }

        /**
         * @param {Element} item
         * Remove PORTION of first elements from array hided
         */
        hided.splice(0, PORTION).map(function (item) {

            item.classList.remove('news__list_item--hidden');

        });

        if (!hided.length) {

            button.classList.add('news__list_item--hidden');

        }

    };

    return {
        init : init
    };

}({});

module.exports = showMoreNews;
