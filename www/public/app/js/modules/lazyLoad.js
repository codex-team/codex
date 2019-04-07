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
            itemAttribute: 'data-lazy-src'
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

        const items = document.querySelectorAll(`[${LazyLoad.classes.itemAttribute}]`);

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
        const imageSrc = element.getAttribute(LazyLoad.classes.itemAttribute);

        tempImage.src = imageSrc;
        tempImage.onload = () => {

            element.src = imageSrc;
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
        const videoSrc = element.getAttribute(LazyLoad.classes.itemAttribute);

        tempVideoSource.src = videoSrc;
        tempVideo.appendChild(tempVideoSource);

        tempVideo.onloadeddata = () => {

            element.querySelector('source').src = videoSrc;
            this.addLoadedClass(element);
            element.load();

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
