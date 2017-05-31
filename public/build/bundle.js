var codex =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var developer = function () {

    var bind = function () {

        var chBoxes = document.querySelectorAll('.developer-checkbox');

        for (var i = chBoxes.length-1; i > -1; i--) {

            chBoxes[i].addEventListener('change', toggle);

        }

    };

    var toggle = function (event) {

        var data = {
            data: 'id='+event.target.id+'&value='+(event.target.checked?1:0),
            url: '/admin/developer'
        };

        codex.core.ajax(data);

    };

    return {
        bind: bind
    };

}();

module.exports = developer;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = (function (callbacks) {

    callbacks.checkUserCanEdit = function (event) {
        console.log(123);
        var textarea       = event.target,
            blankAuthBlock = document.getElementById('blankAuthBlock'),
            emailInput     = document.getElementById('blankEmailInput');

        // var blankSkillsTextarea = document.getElementById('blankSkillsTextarea'),
        //     blankWishesTextarea = document.getElementById('blankWishesTextarea'),
        //     blankSendButton     = document.getElementById('blankSendButton');

        if (blankAuthBlock && !emailInput.value.length ) {

            if (!blankAuthBlock.className.includes('wobble')) {

                blankAuthBlock.className += ' wobble';
                setTimeout(function () {

                    blankAuthBlock.className = blankAuthBlock.className.replace('wobble', '');

                }, 450);

                textarea.value = '';

            }

        }

        // if (blankSkillsTextarea.value.length && blankWishesTextarea.value.length) {
        //     console.log(blankSendButton);
        //     blankSendButton.removeAttribute('disabled');
        // };


    };

    callbacks.showAdditionalFields = function (event) {

        var blankAdditionalFields = document.getElementById('blankAdditionalFields');

        if (blankAdditionalFields.className.includes('hide')) {

            blankAdditionalFields.className = blankAdditionalFields.className.replace('hide', '');

        } else {

            blankAdditionalFields.className += ' hide';

        }


    };

    callbacks.checkUser = function (event, uid) {

        var checker = document.getElementById('u' + uid);

        uid = parseInt(uid, 10);

        xhr.call({
            url : '/admin/checkUser.php?uid=' + uid,
            success : function (response) {

                response = JSON.parse(response);

                if (response.result == 'success') {

                    if (response.new == 1) {

                        checker.className += ' checked bounceIn';

                    } else {

                        checker.className = checker.className.replace('checked', '');
                        checker.className = checker.className.replace('bounceIn', '');

                    }

                }

            }
        });

    };

    callbacks.saveProfilePhoto = {

        success: function (new_photo_name) {

            var settings_avatar = document.getElementById('profile-photo-updatable'),
                header_avatar   = document.getElementById('header-avatar-updatable');

            settings_avatar.src = new_photo_name;
            header_avatar.src   = new_photo_name;

        }

    };

    return callbacks;

})({});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

join = {

        init : function ( textarea ) {
            textareas = document.getElementsByClassName("js-join-input");
            blankAuthBlock = document.getElementById("blankAuthBlock");

            console.log(blankAuthBlock);

            for(var i = 0; i < textareas.length; i++) {

                textareas[i].addEventListener("keyup", function() {

                    if (blankAuthBlock && this.value.length) {

                        setTimeout(function () {

                            blankAuthBlock.classList.remove('wobble');

                        }, 450);

                        this.value = '';

                        blankAuthBlock.classList.add('wobble');
                    } 
                    
                });
            }
        }
}

module.exports = join;



/***/ }),
/* 5 */
/***/ (function(module, exports) {

scrollUp = {

    /**
    * Page scroll offset to show scroll-up button
    */
    SCROLL_UP_OFFSET: 100,

    button: null,

    scrollPage : function () {

        window.scrollTo(0, 0);

    },

    windowScrollHandler : function () {

        if (window.pageYOffset > codex.scrollUp.SCROLL_UP_OFFSET) {

            codex.scrollUp.button.classList.add('show');

        } else {

            codex.scrollUp.button.classList.remove('show');

        }

    },

    /**
    * Init method
    * Fired after document is ready
    */
    init : function () {

        /** Find scroll-up button */
        this.button = document.createElement('DIV');

        this.button.classList.add('scroll-up');
        document.body.appendChild(this.button);

        /** Bind click event on scroll-up button */
        this.button.addEventListener('click', codex.scrollUp.scrollPage);

        /** Global window scroll handler */
        window.addEventListener('scroll', codex.scrollUp.windowScrollHandler);

    }

};

module.exports = scrollUp;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);

var codex = (function (codex) {

    codex.settings = {};

    /**
    * Preparation method
    */
    codex.init = function (settings) {

        /** Save settings or use defaults */
        for (var set in settings ) {

            this.settings[set] = settings[set] || this.settings[set] || null;

        }

        codex.scrollUp.init();

    };



    return codex;


})({});

/**
* Document ready event listener
* @usage codex.docReady(function(){ # code ... } );
*/
codex.docReady = function (f) {

    return /in/.test(document.readyState) ? setTimeout(codex.docReady, 9, f) : f();

};


codex.content = __webpack_require__(3);
codex.scrollUp = __webpack_require__(5);
// codex.dragndrop = require('./modules/dragndrop');
// codex.Polyfill = require('./modules/Polyfill');
// codex.xhr = require('./modules/xhr');
codex.join = __webpack_require__(4);
codex.callbacks = __webpack_require__(2);
// codex.load = require('./modules/load');
// codex.helpers = require('./modules/helpers');
// codex.sharer = require('./modules/sharer');
// codex.fixColumns = require('./modules/fixColumns');


// codex.core = require('./modules/core');
codex.developer = __webpack_require__(1);
// codex.ce = require('./modules/ce_interface');
// codex.dragndrop = require('./modules/feedDragNDrop');
// codex.simpleCode = require('./modules/simpleCodeStyling');
// codex.bot = require('./modules/bot');
// codex.editor = require('./modules/editor');
// codex.quiz = require('./modules/quiz');
// codex.quizForm = require('./modules/quizForm');
// codex.transport = require('./modules/transport');

module.exports = codex;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map