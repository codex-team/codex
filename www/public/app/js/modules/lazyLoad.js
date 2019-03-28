/**
 * Module for lazy-loading images & videos
 */
export default class LazyLoad {

    /**
     * Classes used in module
     */
    static get classes() {

        return {
            wrapper: 'js_lazy-load',
            loaded: 'lazy-load--loaded',
            item: 'js_lazy-media'
        };

    }

    /**
     * Initialize module
     */
    init() {

        this.loadMedia();

    }

    /**
     * Find media targets on page and apply to them various lazy-loading technique depending on type: image or video
     */
    loadMedia() {

        const items = document.querySelectorAll(`.${LazyLoad.classes.item}`);

        items.forEach((item) => {

            switch (item.tagName) {

                case 'IMG':
                    this.loadImage(item);
                    break;
                case 'VIDEO':
                    this.loadVideo(item);
                    break;

            }

        });

    }

    /**
     * Images lazy-loading technique
     * @param {HTMLElement} element - target image
     */
    loadImage(element) {

        /**
         * Create temporary image with real image src.
         * When temporary image is loaded, reveal real image
         */
        const tempImage = new Image();

        tempImage.src = element.src;
        tempImage.onload = () => {

            this.addLoadedClass(element);

        };

    }

    /**
     * Videos lazy-loading technique
     * @param {HTMLElement} element - target video
     */
    loadVideo(element) {

        const tempVideo = document.createElement('video');
        const tempVideoSource = document.createElement('source');

        tempVideoSource.src = element.querySelector('source').src;
        tempVideo.appendChild(tempVideoSource);

        tempVideo.onloadeddata = () => {

            this.addLoadedClass(element);

        };

    }

    /**
     * Add loaded class when element is ready
     * @param {HTMLElement} element - media target
     */
    addLoadedClass(element) {

        element.closest(`.${LazyLoad.classes.wrapper}`).classList.add(LazyLoad.classes.loaded);

    }

}
