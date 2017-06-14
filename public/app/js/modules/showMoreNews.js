var showMoreNews = function() {
	/**
    * Helper for 'show more news' button
    * @param {Element} button   - appender button
    */
    var init = function ( button ) {

        var PORTION = 5;

        var news = document.querySelectorAll('.news__list_item'),
            hided = [];

        for (var i = 0, newsItem; !!(newsItem = news[i]); i++) {

            if ( newsItem.classList.contains('news__list_item--hidden') ) {

                hided.push(newsItem);

            }

        }

        hided.splice(0, PORTION).map(function (item) {

            item.classList.remove('news__list_item--hidden');

        });

        if (!hided.length) {

            button.classList.add('news__list_item--hidden');

        }

    };

    return {
    	init : init
    }
}({})

module.exports = showMoreNews;