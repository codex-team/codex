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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Admin page methods
 */
module.exports = function (admin) {

	/**
	 * Initializes dragndrop module
	 * @uses  codex.dragndrop
	 */
	function initDragNDrop() {

		codex.dragndrop({
		    droppableClass: 'list-item',

		    findDraggable: function (e) {

		        var target = e.target.closest('.draggable');

		        if (target) return target.closest('.list-item');

		        return null;

		    },

		    makeAvatar: function (elem) {

		        var avatar = {};

		        avatar.elem = elem.cloneNode(true);
		        avatar.elem.classList.add('dnd-avatar');

		        elem.parentNode.insertBefore(avatar.elem, elem.nextSibling);
		        elem.classList.add('no-display');

		        avatar.rollback = function () {

		            avatar.elem.parentNode.removeChild(avatar.elem);
		            elem.classList.remove('no-display');

		        };

		        return avatar;

		    },

		    targetChanged: function (target, newTarget, avatar) {

		        if (!newTarget) return;

		        var targetPosition = newTarget.compareDocumentPosition(avatar.elem);

		        if (targetPosition&4) {

		            newTarget.parentNode.insertBefore(avatar.elem, newTarget);

		        } else if (targetPosition&2) {

		            newTarget.parentNode.insertBefore(avatar.elem, newTarget.nextSibling);

		        }

		    },

		    move: function () {},

		    targetReached: function (target, avatar, elem) {

		        target.parentNode.insertBefore(elem, target.nextSibling);

		        avatar.elem.parentNode.removeChild(avatar.elem);
		        elem.classList.remove('no-display');

		        var item_id = elem.dataset.id,
		            item_type = elem.dataset.type,
		            item_below_value = null,
		            nextSibling;

		        if (nextSibling = elem.nextElementSibling)
		            item_below_value = nextSibling.dataset.type+':'+nextSibling.dataset.id;

		        var ajaxData = {
		            success: function () {

		                document.getElementById('saved').classList.remove('top-menu__saved_hidden');
		                setTimeout(function () {

		                    document.getElementById('saved').classList.add('top-menu__saved_hidden');

		                }, 1000);

		            },
		            type: 'POST',
		            url: '/admin/feed',
		            data: JSON.stringify({
		                item_id: item_id,
		                item_type: item_type,
		                item_below_value: item_below_value
		            })
		        };


		        codex.core.ajax(ajaxData);

		    }
		});
		// body...
	}

	/**
	 * Module initialization
	 * @param  {Object} 	 params 			- init params
	 * @param  {String|null} params.listType 	- feed list type ("cars"|"list")
	 */
	admin.init = function( params ){

		codex.core.log('Initialized.', 'Module admin');

		if ( params.listType == 'cards' ){

			 var items = document.querySelectorAll('.feed-item');

	        for (var i = items.length-1; i > -1; i--) {
	            items[i].classList.add('draggable');
	            items[i].classList.add('list-item');
	        }

		}

		initDragNDrop();

	}

	return admin;

}({})

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

core = {

      /** Logging method */
    log : function (str, prefix, type, arg) {

        var staticLength = 32;

        if (prefix) {

            prefix = prefix.length < staticLength ? prefix : prefix.substr( 0, staticLength - 2 );

            while (prefix.length < staticLength - 1) {

                prefix += ' ';

            }

            prefix += ':';
            str = prefix + str;

        }

        type = type || 'log';

        try {

            if ('console' in window && window.console[ type ]) {

                if (arg) console[type](str, arg);
                else console[type](str);

            }

        } catch(e) {}

    },


    /**
    * Native ajax method.
    */
    ajax : function (data) {

        if (!data || !data.url) {

            return;

        }

        var XMLHTTP          = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
            success_function = function () {};

        data.async           = true;
        data.type            = data.type || 'GET';
        data.data            = data.data || '';
        data['content-type'] = data['content-type'] || 'application/json; charset=utf-8';
        success_function     = data.success || success_function ;

        if (data.type == 'GET' && data.data) {

            data.url = /\?/.test(data.url) ? data.url + '&' + data.data : data.url + '?' + data.data;

        }

        if (data.withCredentials) {

            XMLHTTP.withCredentials = true;

        }

        if (data.beforeSend && typeof data.beforeSend == 'function') {

            data.beforeSend.call();

        }

        XMLHTTP.open( data.type, data.url, data.async );
        XMLHTTP.setRequestHeader('Content-type', data['content-type'] );
        XMLHTTP.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        XMLHTTP.onreadystatechange = function () {

            if (XMLHTTP.readyState == 4 && XMLHTTP.status == 200) {

                success_function(XMLHTTP.responseText);

            }

        };

        XMLHTTP.send(data.data);

    }

};
module.exports = core;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (settings) {

    var defaultHandlers = {
        findDraggable: function (e) {

            return e.target.closest('.'+draggableClass);

        },

        findDroppable: function (e) {

            return document.elementFromPoint(e.clientX, e.clientY).closest('.'+droppableClass);

        },

        /**
         * The simplest makeAvatar method.
         *
         * Just set elem to avatar.elem. And remembers element position in document.
         * If drop isn`t success, returns elem to start position.
         */
        makeAvatar: function (elem) {

            var avatar = {};

            var avatarRollback = function () {

                avatar.elem.classList.remove('dnd-default-avatar');

                if (avatar.nextSibling)
                    avatar.parentNode.insertBefore(avatar.elem, avatar.nextSibling);
                else
                    avatar.parentNode.appendChild(avatar.elem);

                delete(dragObj.avatar);

            };

            avatar = {
                elem: elem,
                parentNode: elem.parentNode,
                nextSibling: elem.nextElementSibling,
                rollback: avatarRollback
            };

            // Set avatar position: absolute; for drag'n'drop
            avatar.elem.classList.add('dnd-default-avatar');

            return avatar;

        },

        /**
         * Highlights droppable elements under cursor with border
         */
        targetChanged: function (target, newTarget) {

            if (target) target.classList('dnd-default-target-highlight');

            if (newTarget) newTarget.classList.add('dnd-default-target-highlight');

        },

        move: function (e, avatar, shift) {

            avatar.elem.style.left = e.pageX - shift.x + 'px';
            avatar.elem.style.top = e.pageY - shift.y + 'px';

        },

        /**
         * Inserts elem into document if drop is success
         */
        targetReached: function (target, avatar, elem) {

            target.classList.remove('dnd-default-target-highlight');
            target.parentNode.insertBefore(elem, target.nextElementSibling);
            avatar.elem.classList.remove('dnd-default-avatar');

        }
    };

    var draggableClass  = settings.draggableClass   || 'draggable',
        droppableClass   = settings.droppableClass    || 'droppable',
        findDraggable   = settings.findDraggable    || defaultHandlers.findDraggable,
        findDroppable    = settings.findDroppable     || defaultHandlers.findDroppable,
        makeAvatar      = settings.makeAvatar       || defaultHandlers.makeAvatar,
        targetChanged   = settings.targetChanged    || defaultHandlers.targetChanged,
        move            = settings.move             || defaultHandlers.move,
        targetReached   = settings.targetReached    || defaultHandlers.targetReached;

    var dragObj = {};

    var onMouseDown = function (e) {

        /**
         * Check mouse (which=1 - right mouse button) or touch (which=0 - touch) event.
         */
        if (e.which > 1) return;

        e = touchSupported(e);

        dragObj.clickedAt = {
            x: e.pageX,
            y: e.pageY
        };

        dragObj.elem = findDraggable(e);

        if (!dragObj.elem) return;

        toggleSelection();

        var coords = getCoords(dragObj.elem);

        dragObj.shift = {
            x: e.pageX - coords.x,
            y: e.pageY - coords.y
        };

    };

    var onMouseMove = function (e) {

        if (!dragObj.elem) return;

        // Prevent touchmove scroll
        e.preventDefault();

        e = touchSupported(e);

        // Check mouse offset. If x or y offset <5, assume that it`s accidental move
        if (Math.abs(e.pageX - dragObj.clickedAt.x) < 5 && Math.abs(e.pageY - dragObj.clickedAt.y) < 5) return;

        if (!dragObj.avatar) {

            dragObj.avatar = makeAvatar(dragObj.elem);

        }

        var newTarget = findDroppable(e);

        if (newTarget != dragObj.target) {

            targetChanged(dragObj.target, newTarget, dragObj.avatar);

            dragObj.target = newTarget;

        }


        move(e, dragObj.avatar, dragObj.shift);

    };

    var onMouseUp = function (e) {

        if (e.which > 1) return;

        if (!dragObj.avatar) {

            dragObj = {};
            return;

        }

        e = touchSupported(e);

        var target = findDroppable(e);

        if (target)
            targetReached(target, dragObj.avatar, dragObj.elem, e);
        else
            dragObj.avatar.rollback();

        dragObj = {};

        toggleSelection();

    };

    var getCoords = function (elem) {

        var rect = elem.getBoundingClientRect();

        return {
            x: rect.left + pageXOffset,
            y: rect.top + pageYOffset
        };

    };

    var touchSupported = function (e) {

        if (e.changedTouches)
            var touch = e.changedTouches[0];

        else
            return e;

        e.pageX = touch.pageX;
        e.pageY = touch.pageY;

        e.clientX = touch.clientX;
        e.clientY = touch.clientY;

        e.screenX = touch.screenX;
        e.screenY = touch.screenY;

        e.target = touch.target;

        return e;

    };

    var toggleSelection = function () {

        document.body.classList.toggle('no-selection');

    };


    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('touchstart', onMouseDown);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);

    document.ondragstart = function () {

        return false;

    };

};


/***/ }),
/* 5 */,
/* 6 */
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
/* 7 */
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
/* 8 */
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

/***/ }),
/* 9 */
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
/* 10 */
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


/**
* Pages
*/
codex.admin = __webpack_require__(1);
codex.join = __webpack_require__(6);


/**
 * Modules
 */
codex.core = __webpack_require__(3);
codex.dragndrop = __webpack_require__(4);
codex.scrollUp = __webpack_require__(7);
codex.sharer = __webpack_require__(8);
codex.developer = __webpack_require__(2);
codex.simpleCode = __webpack_require__(9);

codex.content = __webpack_require__(16);

// codex.Polyfill = require('./modules/Polyfill');
// codex.xhr = require('./modules/xhr');

// codex.callbacks = require('./modules/callbacks');
// codex.load = require('./modules/load');
// codex.helpers = require('./modules/helpers');

// codex.fixColumns = require('./modules/fixColumns');







// codex.quiz = require('./modules/quiz');
// codex.quizForm = require('./modules/quizForm');
// codex.transport = require('./modules/transport');

module.exports = codex;



/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map