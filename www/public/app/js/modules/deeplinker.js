const deeplinker = require('@codexteam/deeplinker');

module.exports = (() => {

    /**
     * Add listeners for deeplinker elements
     *
     * @param {string} selector - find elements by target selector
     */
    let init = (selector = '.deeplinker') => {

        let links = document.querySelectorAll(selector);

        if (!links) {

            return;

        }

        links.forEach(link => {

            link.addEventListener('click', (event) => {

                event.preventDefault();
                deeplinker.click(link);

            });

        });

    };

    return {
        init
    };

})();