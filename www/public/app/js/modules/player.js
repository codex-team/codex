/**
 * DOM manipulation methods
 */
import $ from './dom';

/**
 * @class  Player
 * @classdesc Simple player on the overlay container
 *
 * @typedef {Player}
 * @property {String} sourceURL - video URL
 * @property {Element} toggler  - Play Button
 * @property {Element} wrapper  - In wich Element player should be added
 * @property {Element} overlay  - Player main container
 * @property {Object} CSS       - CSS dictionary
 *
 */
export default class Player {

    /**
     * @constructor
     * @param  {String} options.sourceURL        - video URL
     * @param  {Element} options.toggler         - play button
     * @param  {String} options.wrapperSelector  - xpath selector for the player holder
     */
    constructor({sourceURL, toggler, wrapperSelector}) {

        this.sourceURL = sourceURL;
        this.toggler = toggler;
        this.wrapper = document.querySelector(wrapperSelector);
        this.overlay = null;

        this.CSS = {
            overlay: 'video-overlay',
            overlayShowed: 'video-overlay--showed',
            overlayLoaded: 'video-overlay--loaded',
            closeButton: 'video-overlay__close'
        };

        /**
         * Add Play Button click listener
         */
        this.toggler.addEventListener('click', () => {

            this.showVideoOverlay();

        }, false);

    }

    /**
     * Creates player container and append it to the parent element
     */
    showVideoOverlay() {

        this.overlay = $.make('div', this.CSS.overlay);

        let video = $.make('video', null, {
                autoplay: true,
                loop: true
            }),
            source = $.make('source', null, {
                src: this.sourceURL,
                type: 'video/mp4'
            }),
            closeButton = $.make('div', this.CSS.closeButton);

        /**
         * Append <video>
         */
        video.appendChild(source);
        this.overlay.appendChild(video);

        /**
         * Bind loading callback
         */
        video.addEventListener('loadeddata', () => {

            this.videoLoaded();

        });

        /**
         * Activate close button
         */
        this.overlay.appendChild(closeButton);
        closeButton.addEventListener('click', () => {

            this.close();

        });

        /**
         * Add overlay to the wrapper
         */
        this.wrapper.appendChild(this.overlay);
        window.setTimeout(() => {

            this.overlay.classList.add(this.CSS.overlayShowed);

        }, 50);

    }

    /**
     * Video loaded callback
     * Shows player
     */
    videoLoaded() {

        this.wrapper.classList.add(this.CSS.overlayLoaded);

    }

    /**
     * Removes overlay with video
     */
    close() {

        this.overlay.remove();
        this.overlay = null;

    }

}
