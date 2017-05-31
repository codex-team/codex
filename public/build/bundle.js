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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/***/ (function(module, exports) {

/**
* Minimal, lightview and universal code highilting
* @author Savchenko Peter (vk.com/specc)
*/
var simpleCode = (function (simpleCode) {

    simpleCode.rules = {

        comments: function (str) {

            return str.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/)/g, '<span class=sc_comment>$1</span>');

        },
        comments_inline: function (str) {

            return str.replace(/[^\w:](\/\/[^\n]+)/g, '<span class=sc_comment>$1</span>');

        },
        tags : function (str) {

            return str.replace( /(&lt;[\/a-z]+(&gt;)?)/gi, '<span class=sc_tag>$1</span>' );

        },
        attrs : function (str) {

            return str.replace( /"([^"]+)"/gi, '"<span class=sc_attr>$1</span>"' );

        },
        strings : function (str) {

            return str.replace( /'([^']+)'/gi, '\'<span class=sc_attr>$1</span>\'' );

        },
        keywords : function (str) {

            return str.replace(/\b(var|const|function|typeof|return|endif|endforeach|foreach|if|for|in|while|break|continue|switch|case|int|void|python|from|import|install|def|virtualenv|source|sudo|git)([^a-z0-9\$_])/g, '<span class=sc_keyword>$1</span>$2');

        },
        digits : function (str) {

            return str.replace(/\b(\d+)\b/g, '<span class=sc_digt>$1</span>');

        },
        vars : function (str) {

            return str.replace(/(\$[^\s\[\]\{\}\'\"\(\)]+)\b/g, '<span class=sc_var>$1</span>');

        },
        colors : function (str) {

            return str.replace(/(#[a-z0-9]{3,6})/ig, '<span class=sc_color style=border-bottom-color:$1>$1</span>');

        }

    };

    simpleCode.process = function (el) {

        var origin = el.innerHTML;

        for (var rule in simpleCode.rules) {

            origin = simpleCode.rules[rule](origin);

        }

        el.innerHTML = origin;

    };

    simpleCode.addStyles = function () {

        var styleInstance = 'simpleCodeStylingCss',
            style         = document.getElementById(styleInstance),
            css =   '.sc_attr{color: #F57975;}' +
                    '.sc_tag{color: #7DA3F4;}' +
                    '.sc_keyword{color: #d87ccf;}' +
                    '.sc_digt{color: #37D755;}'+
                    '.sc_var{color: #8199C6;}' +
                    '.sc_comment{color: #acb1bd;}' +
                    '.sc_color{display: inline-block;line-height: 1em;border-bottom-width:2px;border-bottom-style:solid;}';

        if (!style) {

            style = document.createElement('style');
            style.id = styleInstance;
            style.innerHTML = css;

            document.head.appendChild(style);

        }

    };

    simpleCode.init = function (selector) {

        simpleCode.addStyles();

        var code_elements = document.querySelectorAll(selector);

        for (var i = code_elements.length - 1; i >= 0; i--) {

            simpleCode.process(code_elements[i]);

        }

    };

    return simpleCode;

})({});

module.exports = simpleCode;


/***/ }),
/* 7 */
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
codex.sharer = __webpack_require__(14);
// codex.fixColumns = require('./modules/fixColumns');


// codex.core = require('./modules/core');
codex.developer = __webpack_require__(1);
// codex.ce = require('./modules/ce_interface');
// codex.dragndrop = require('./modules/feedDragNDrop');
codex.simpleCode = __webpack_require__(6);
// codex.bot = require('./modules/bot');
// codex.editor = require('./modules/editor');
// codex.quiz = require('./modules/quiz');
// codex.quizForm = require('./modules/quizForm');
// codex.transport = require('./modules/transport');

module.exports = codex;



/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = (function ( sharer ) {

    sharer.vkontakte = function (data) {

        var link  = 'https://vk.com/share.php?';

        link += 'url='          + data.url;
        link += '&title='       + data.title;
        link += '&description=' + data.desc;
        link += '&image='       + data.img;
        link += '&noparse=true';

        sharer.popup( link, 'vkontakte'  );

    };

    sharer.facebook = function (data) {

        var FB_APP_ID = 1740455756240878,
            link      = 'https://www.facebook.com/dialog/share?display=popup';

        link += '&app_id='       + FB_APP_ID;
        link += '&href='         + data.url;
        link += '&redirect_uri=' + document.location.href;

        sharer.popup( link, 'facebook' );

    };
    sharer.twitter = function (data) {

        var link = 'https://twitter.com/share?';

        link += 'text='      + data.title;
        link += '&url='      + data.url;
        link += '&counturl=' + data.url;

        sharer.popup( link, 'twitter' );

    };

    sharer.telegram = function (data) {

        var link  = 'https://telegram.me/share/url';

        link += '?text=' + data.title;
        link += '&url='  + data.url;

        sharer.popup( link, 'telegram' );

    };

    sharer.popup = function ( url, social_type ) {

        window.open( url, '', 'toolbar=0,status=0,width=626,height=436' );

        /**
        * Write analytics goal
        */
        if ( window.yaCounter32652805 ) {

            window.yaCounter32652805.reachGoal('article-share', function () {}, this, {type: social_type, url: url});

        }

    };

    sharer.init = function () {

        var shareButtons = document.querySelectorAll('.sharing .but, .sharing .main_but, .quiz__sharing .but');

        for (var i = shareButtons.length - 1; i >= 0; i--) {

            shareButtons[i].addEventListener('click', sharer.click, true);

        }

    };

    sharer.click = function (event) {

        var target = event.target;

        /**
        * Social provider stores in data 'shareType' attribute on share-button
        * But click may be fired on child-element in button, so we need to handle it.
        */
        var type = target.dataset.shareType || target.parentNode.dataset.shareType;

        if (!sharer[type]) return;

        /**
        * Sanitize share params
        * @todo test for taint strings
        */
        // for (key in window.shareData){
        //      window.shareData[key] = encodeURIComponent(window.shareData[key]);
        // }

        var shareData = {
            url:    target.dataset.url || target.parentNode.dataset.url,
            title:  target.dataset.title || target.parentNode.dataset.title,
            desc:   target.dataset.desc || target.parentNode.dataset.desc,
            img:    target.dataset.img || target.parentNode.dataset.title
        };

        /**
        * Fire click handler
        */

        sharer[type](shareData);

    };



    return sharer;

})({});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map