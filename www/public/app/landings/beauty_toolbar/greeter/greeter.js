/**
 * Module that shows greetings panel
 */
var greeter = function (greeter) {

    /**
     * CSS dictionary
     * @type {{container, logo, text, close, containerShowed}}
     */
    var CSS = {
        container: 'greeter',
        containerShowed: 'greeter--showed',
        logo: 'greeter__logo',
        text: 'greeter__text',
        close: 'greeter__close'
    };

    /**
     * Elements cache
     * @type {{container, logo, text, close}}
     */
    var nodes = {
        container: null,
        logo: null,
        text: null,
        close: null
    };

    /**
     * Create the panel structure
     */
    function createStructure() {

        /**
         * Create elements
         */
        for (var el in nodes) {
            if (nodes.hasOwnProperty(el)){
                nodes[el] = document.createElement('div');
                nodes[el].classList.add(CSS[el])
            }
        }

        ['logo', 'text', 'close'].forEach(function(elName){
           nodes.container.appendChild(nodes[elName]);
        });


    }

    /**
     * Shows greetings pane
     * @param {object} options
     * @param {string} options.text - greeting text
     */
    greeter.show = function (options) {

        options = options || {};

        createStructure();

        nodes.text.innerHTML = options.text || 'Hi there!';

        document.body.appendChild(nodes.container);

        setTimeout(function () {
            nodes.container.classList.add(CSS.containerShowed);
        }, 200);

    };

    return greeter;
}({});