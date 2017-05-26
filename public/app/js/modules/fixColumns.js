module.exports = (function () {

    /**
     * Contains array of DOM elements which we want to make fixed (position: fix)
     */
    var columns;

    var makeFixedColumns = function () {

        codex.fixColumns.columns.forEach(function (item) {

            item.style.position = '';
            item.style.top = '';

            var offset = codex.content.getOffset(item);

            if (document.body.scrollTop >= offset.top) {

                item.style.position = 'fixed';
                item.style.top = 0;

            }

        });

    };

    var init = function (columns) {

        codex.fixColumns.columns = columns;
        document.addEventListener('scroll', makeFixedColumns, false);

    };

    return {
        init : init
    };

})();