const deeplinker = require('@codexteam/deeplinker');

module.exports = (() => {

    /**
     * Add listeners for deeplinker elements
     *
     * @param {string} className - find elements with target class
     */
    let init = (className = 'deeplinker') => {

        let links = document.querySelectorAll('.' + className);

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