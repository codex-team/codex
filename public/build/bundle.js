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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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
	            items[i].classList.add('feed-item--dnd');
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

var ajax = function () {

    var xhr = function( xhr ) {

        var objectToQueryString = function (a) {

            var prefix, s, add, name, r20, output;

            s = [];
            r20 = /%20/g;
            add = function (key, value) {

                // If value is a function, invoke it and return its value
                value = ( typeof value == 'function' ) ? value() : ( value === null ? '' : value );
                s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);

            };
            if (a instanceof Array) {

                for (name in a) {

                    add(name, a[name]);

                }

            } else {

                for (prefix in a) {

                    buildParams(prefix, a[ prefix ], add);

                }

            }
            output = s.join('&').replace(r20, '+');
            return output;

        };

        var buildParams = function (prefix, obj, add) {

            var name, i, l, rbracket;

            rbracket = /\[\]$/;
            if (obj instanceof Array) {

                for (i = 0, l = obj.length; i < l; i++) {

                    if (rbracket.test(prefix)) {

                        add(prefix, obj[i]);

                    } else {

                        buildParams(prefix + '[' + ( typeof obj[i] === 'object' ? i : '' ) + ']', obj[i], add);

                    }

                }

            } else if (typeof obj == 'object') {

                // Serialize object item.
                for (name in obj) {

                    buildParams(prefix + '[' + name + ']', obj[ name ], add);

                }

            } else {

                // Serialize scalar item.
                add(prefix, obj);

            }

        };

        xhr.call = function ( data ) {

            if ( !data || !data.url ) {

                console.warn('url wasn\'t passed into ajax method' );
                return;

            }

            var XMLHTTP              = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
                successCallback;

            data.type         = data.type || 'GET';
            data.url          = data.url;
            data.async        = data.async || false;
            data.data         = data.data || '';
            data.formData     = data.formData || false;
            data['content-type'] = data.contentType || 'text/html';
            successCallback      = data.success || successCallback ;

            if ( data.type == 'GET' && data.data ) {

                data.url = /\?/.test(data.url) ? data.url + '&' + data.data : data.url + '?' + data.data;

            }

            if (data.beforeSend && typeof data.beforeSend == 'function') {

                data.beforeSend.call();

            }

            XMLHTTP.open( data.type, data.url, data.async );
            XMLHTTP.setRequestHeader('Content-type', data['content-type'] );
            XMLHTTP.setRequestHeader('Connection', 'close');
            XMLHTTP.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            XMLHTTP.onreadystatechange = function () {

                if ( XMLHTTP.readyState == 4 && XMLHTTP.status == 200 && successCallback) {

                    successCallback.call(XMLHTTP.responseText);

                }

            };

            XMLHTTP.send( data.formData || objectToQueryString(data.data) );

        };


        xhr.parseHTML = function (markup) {

            var doc = document.implementation.createHTMLDocument('');

            if (markup.toLowerCase().indexOf('<!doctype') > -1) {

                doc.documentElement.innerHTML = markup;

            } else {

                doc.body.innerHTML = markup;

            }
            return doc;

        };

        /**
         * Adapted from {@link http://www.bulgaria-web-developers.com/projects/javascript/serialize/}
         * Changes:
         *     Ensures proper URL encoding of name as well as value
         *     Preserves element order
         *     XHTML and JSLint-friendly
         *     Disallows disabled form elements and reset buttons as per HTML4 [successful controls]{@link http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2}
         *         (as used in jQuery). Note: This does not serialize <object>
         *         elements (even those without a declare attribute) or
         *         <input type="file" />, as per jQuery, though it does serialize
         *         the <button>'s (which are potential HTML4 successful controls) unlike jQuery
         * @license MIT/GPL
        */
        xhr.serialize = function (form) {

            'use strict';

            var i, j, len, jLen, formElement, q = [];

            function urlencode(str) {

                // http://kevin.vanzonneveld.net
                // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
                // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
                return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
                    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');

            }
            function addNameValue(name, value) {

                q.push(urlencode(name) + '=' + urlencode(value));

            }
            if (!form || !form.nodeName || form.nodeName.toLowerCase() !== 'form') {

                throw 'You must supply a form element';

            }
            for (i = 0, len = form.elements.length; i < len; i++) {

                formElement = form.elements[i];
                if (formElement.name === '' || formElement.disabled) {

                    continue;

                }
                switch (formElement.nodeName.toLowerCase()) {
                    case 'input':
                        switch (formElement.type) {
                            case 'text':
                            case 'email':
                            case 'hidden':
                            case 'password':
                            case 'button': // Not submitted when submitting form manually, though jQuery does serialize this and it can be an HTML4 successful control
                            case 'submit':
                                addNameValue(formElement.name, formElement.value);
                                break;
                            case 'checkbox':
                            case 'radio':
                                if (formElement.checked) {

                                    addNameValue(formElement.name, formElement.value);

                                }
                                break;
                            case 'file':
                            // addNameValue(formElement.name, formElement.value); // Will work and part of HTML4 "successful controls", but not used in jQuery
                                break;
                            case 'reset':
                                break;
                        }
                        break;
                    case 'textarea':
                        addNameValue(formElement.name, formElement.value);
                        break;
                    case 'select':
                        switch (formElement.type) {
                            case 'select-one':
                                addNameValue(formElement.name, formElement.value);
                                break;
                            case 'select-multiple':
                                for (j = 0, jLen = formElement.options.length; j < jLen; j++) {

                                    if (formElement.options[j].selected) {

                                        addNameValue(formElement.name, formElement.options[j].value);

                                    }

                                }
                                break;
                        }
                        break;
                    case 'button': // jQuery does not submit these, though it is an HTML4 successful control
                        switch (formElement.type) {
                            case 'reset':
                            case 'submit':
                            case 'button':
                                addNameValue(formElement.name, formElement.value);
                                break;
                        }
                        break;
                }

            }
            
            return q.join('&');

        };

	}

    return {
    	xhr : xhr
    }
}({})
module.exports = ajax;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

module.exports =  function() {

      /** Logging method */
    var log = function (str, prefix, type, arg) {

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

    };

    /**
    * Native ajax method.
    */
    var ajax = function (data) {

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

    };


    return {
        ajax : ajax,
        log : log       
    }

}();

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

var join = function() {

    var init = function() {

        var joinBlank = document.getElementById('joinBlank');

        if ( typeof joinBlank != 'undefined' && joinBlank !== null ){

            var joinBlankTextareas = joinBlank.getElementsByTagName('textarea');

            if (joinBlankTextareas.length) {

                for (var i = joinBlankTextareas.length - 1; i >= 0; i--) {

                    joinBlankTextareas[i].addEventListener('keyup', checkUserCanEdit, false);
                }

            }
        }

        var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');

        if ( typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton !== null ){

            blankShowAdditionalFieldsButton.addEventListener('click', showAdditionalFields, false);

        }
    };

    checkUserCanEdit = function (event) {
       
        var textarea       = event.target,
            blankAuthBlock = document.getElementById('blankAuthBlock'),
            emailInput     = document.getElementById('blankEmailInput');

        if (blankAuthBlock && !emailInput.value.length ) {

            if (!blankAuthBlock.className.includes('wobble')) {

                blankAuthBlock.className += ' wobble';
                setTimeout(function () {

                    blankAuthBlock.className = blankAuthBlock.className.replace('wobble', '');

                }, 450);

                textarea.value = '';

            }

        }

    };

    var showAdditionalFields = function (event) {

        var blankAdditionalFields = document.getElementById('blankAdditionalFields');

        if (blankAdditionalFields.className.includes('additional_fields--hide')) {

            blankAdditionalFields.className = blankAdditionalFields.className.replace('additional_fields--hide', '');

        } else {

            blankAdditionalFields.className += ' additional_fields--hide';

        }
    };

    return {
        init : init
    }

}({})

module.exports = join;


/***/ }),
/* 7 */
/***/ (function(module, exports) {


var polyfills = function() {

        /**
        * Polyfilling ECMAScript 6 method String.includes
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Browser_compatibility
        */
        if ( !String.prototype.includes ) {

            String.prototype.includes = function () {

            'use strict';

            return String.prototype.indexOf.apply(this, arguments) !== -1;

            };

        }


        /**
        * Polyfill for Element.prototype.matches method
        */
        if (!Element.prototype.matches) {

            Element.prototype.matches = Element.prototype.matchesSelector ||
                                        Element.prototype.webkitMatchesSelector ||
                                        Element.prototype.mozMatchesSelector ||
                                        Element.prototype.msMatchesSelector;

        }

        /**
        * Polyfill for Element.prototype.closest method
        */
        if (!Element.prototype.closest) {

            Element.prototype.closest = function (selector) {

                var node = this;

                while (node) {

                    if (node.matches(selector)) return node;
                    node = node.parentElement;

                }

                return null;

            };

        };

}({});

module.exports = polyfills;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Profile page methods
 */
module.exports = function () {

	/**
	 * Photo uploading success-callback
	 * Fired by transport
	 * @param  {string} newPhotoURL - uploaded file URL
	 */
    var uploadPhotoSuccess = function (newPhotoURL) {

        var settings_avatar = document.getElementById('profile-photo-updatable'),
            header_avatar   = document.getElementById('header-avatar-updatable');

        settings_avatar.src = newPhotoURL;
        header_avatar.src   = newPhotoURL;

    }

    return {
    	'uploadPhotoSuccess': uploadPhotoSuccess,
    }

}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Модуль quiz с единственным публичным методом quiz.init()
 */
module.exports = (function () {

    var quizData            = null,
        numberOfQuestions   = null,
        currentQuestion     = null,
        score               = null,
        maxScore            = null;


    /**
     * Публичный метод init.
     *
     * @param {object} quizDataInput  - объект с информацией о тесте
     * @param {string} holder - id элемента, в который будет выводиться тест
     */
    var init = function (quizDataInput, holder) {

        quizData = quizDataInput;
        numberOfQuestions = quizData.questions.length;
        currentQuestion = 0;
        score = 0;

        gameProcessing_.prepare();
        UI_.prepare(holder);
        UI_.setupQuestionInterface();

    };

    var UI_ = {

        holder: null,
        currentQuestionObj: null,

        // Объект, в котором будут храниться DOM-элементы, связанные с отображением вопроса
        questionElems: null,

        prepare: function (holder) {

            UI_.holder = document.getElementById(holder);
            UI_.holder.classList.add('quiz');
            UI_.holder.classList.add('clearfix');

        },

        /**
         * Создаем элементы для вывода теста, заносим их в UI_.questionElems и выводим на страницу.
         */
        setupQuestionInterface: function () {

            UI_.clear();

            var title,
                optionsHolder,
                counter,
                nextButton;

            title = UI_.createElem('div', 'quiz__question-title');

            optionsHolder = UI_.createElem('div', 'quiz__question-options');

            counter = UI_.createElem('div', 'quiz__question-counter');

            nextButton = UI_.createElem('input', ['quiz__question-button', 'quiz__question-button_next']);

            nextButton.setAttribute('type', 'button');
            nextButton.setAttribute('value', 'Далее →');

            UI_.questionElems = {
                counter: counter,
                title: title,
                optionsHolder: optionsHolder,
                options: [],
                nextButton: nextButton
            };

            UI_.append(UI_.questionElems);

            UI_.showQuestion();

        },

        /**
         * Выводим текущий вопрос на страницу (вопрос, варианты ответа и счетчик)
         */
        showQuestion: function () {

            UI_.clear(UI_.questionElems.optionsHolder);
            UI_.questionElems.options = [];
            UI_.questionElems.nextButton.removeEventListener('click', UI_.showQuestion);
            UI_.currentQuestionObj = quizData.questions[currentQuestion];

            UI_.questionElems.nextButton.setAttribute('disabled', true);

            UI_.questionElems.title.textContent = UI_.currentQuestionObj.title;
            UI_.questionElems.counter.textContent = currentQuestion + 1 + '/' + numberOfQuestions;

            UI_.currentQuestionObj.answers.map(UI_.createOption);

        },

        answerSelected: function (answer) {

            answer.classList.add('quiz__question-answer_selected');

            UI_.questionElems.options.map(function (current, i) {

                current.removeEventListener('click', gameProcessing_.getUserAnswer);

            });

            UI_.questionElems.nextButton.disabled = false;

            if (currentQuestion < numberOfQuestions  - 1) {

                UI_.questionElems.nextButton.addEventListener('click', UI_.showQuestion);

            } else {

                UI_.questionElems.nextButton.addEventListener('click', UI_.showResult);

            }

            UI_.showAnswer(answer);

            currentQuestion++;

        },
        /**
         * Добавляем стили и выводим сообщение для выбранного варианта ответа
         * Открываем доступ к следующему вопросу
         *
         * @param answer - DOM-элемент выбранного ответа
         */
        showAnswer: function (answer) {

            var answerStyle = answer.dataset.score > 0 ? '_right' :  '_wrong',
                answerIndex = answer.dataset.index;

            answer.classList.add('quiz__question-answer' + answerStyle);

            var answerMessage = UI_.createElem('div', 'quiz__answer-message');

            answerMessage.textContent = UI_.currentQuestionObj.answers[answerIndex].message;

            UI_.insertAfter(answerMessage, answer);

            if (answer.dataset.score == 0) {

                UI_.showCorrectAnswers();

            }

        },

        showCorrectAnswers: function () {

            UI_.questionElems.options.map(function (answer, i) {

                if (answer.dataset.score > 0) {

                    answer.classList.add('quiz__question-answer_right');

                } else {

                    answer.classList.add('quiz__question-answer_wrong');

                }

            });

        },

        showResult: function () {

            var result =  score + '/' + maxScore;

            UI_.questionElems.nextButton.removeEventListener('click', UI_.showResult);

            UI_.clear();

            var resultScore = UI_.createElem('div', 'quiz__result-score');

            resultScore.textContent = result;

            var resultMessage = UI_.createElem('div', 'quiz__result-message');

            resultMessage.textContent = gameProcessing_.getMessage();

            var social = UI_.createElem('div', 'quiz__sharing');

            UI_.createSocial(social, result);

            var retry = UI_.createElem('div', 'quiz__retry-button');

            retry.textContent = 'Пройти еще раз';
            retry.addEventListener('click', init.bind(null, quizData, UI_.holder.id));

            UI_.append([resultScore, resultMessage, social, retry]);

            codex.sharer.init();

        },

        /**
         * Создаем кнопки социальных сетей и добавляем их в holder
         *
         * @param {Element} holder
         */
        createSocial: function (holder, result) {

            var networks = [
                {
                    title: 'Share on the VK',
                    shareType: 'vkontakte',
                    class: 'vk',
                    icon: 'icon-vkontakte'
                },
                {
                    title: 'Share on the Facebook',
                    shareType: 'facebook',
                    class: 'fb',
                    icon: 'icon-facebook-squared'
                },
                {
                    title: 'Tweet',
                    shareType: 'twitter',
                    class: 'tw',
                    icon: 'icon-twitter'
                },
                {
                    title: 'Forward in Telegramm',
                    shareType: 'telegram',
                    class: 'tg',
                    icon: 'icon-paper-plane'
                }
            ];

            networks.map(function (current, i) {

                var button = UI_.createElem('span', ['but', current.class]),
                    icon   = UI_.createElem('i', current.icon),
                    shareMessage = null;

                button.dataset.shareType = current.shareType;
                button.setAttribute('title', current.title);

                if (quizData.shareMessage) {

                    shareMessage =  quizData.shareMessage.replace('$score', result);

                }

                shareMessage = shareMessage || 'Я набрал ' + result + ' в ' + (quizData.title || 'тесте от команды CodeX');

                button.dataset.url      = window.location.href;
                button.dataset.title    = shareMessage;
                button.dataset.desc     = quizData.description || '';

                UI_.append(icon, button);
                UI_.append(button, holder);

            });

        },

        /**
         * Создаем i-й вариант ответа и выводим в UI_.questionElems.optionsHolder
         * И добавляем в UI_.questionElems.options
         *
         * @param {Object} answer - объект варианта ответа
         * @param {int} i - его номер в вопросе
         */
        createOption: function (answer, i) {

            var answerObj = UI_.createElem('div', 'quiz__question-answer');

            answerObj.dataset.score = answer.score;
            answerObj.dataset.index = i;
            answerObj.textContent = answer.text;

            // Вешаем слушатель на вариант ответа
            answerObj.addEventListener('click', gameProcessing_.getUserAnswer);

            UI_.questionElems.options.push(answerObj);

            UI_.append(answerObj, UI_.questionElems.optionsHolder);

        },

        /**
         * Создает новый DOM-элемент с набором переданных классов
         *
         * @param {string} tag - имя тега
         * @param {string|Array} classes - имя или массив имен классов
         * @returns {Element}
         */
        createElem: function (tag, classes) {

            var elem = document.createElement(tag);

            if (!classes) {

                return elem;

            }

            if (classes instanceof Array) {

                for (var i in classes) {

                    elem.classList.add(classes[i]);

                }

            } else {

                elem.classList.add(classes);

            }

            return elem;

        },

        /**
         * Добавляет элементы в переданный элемент
         *
         * @param {Element|Array} elems - элемент или массив элементов
         * @param {Element|null} parent - родитель или UI_.holder, если передан NULL
         */
        append: function (elems, parent) {

            parent = parent || UI_.holder;

            if (!(elems instanceof Element)) {

                for (var i in elems) {

                    if (elems[i] instanceof Element) {

                        parent.appendChild(elems[i]);

                    }

                }

            } else {

                parent.appendChild(elems);

            }

        },


        /**
         * Вставляет элемент после переданного элемента
         *
         * @param {Element} elem
         * @param {Element} elemBefore
         */
        insertAfter: function (elem, elemBefore) {

            if (elemBefore.nextSibling) {

                UI_.questionElems.optionsHolder.insertBefore(elem, elemBefore.nextSibling);

            } else {

                UI_.append(elem, elemBefore.parentNode);

            }

        },

        /**
         * Удалаяет все дочерние элементы элемента parent
         *
         * @param {Element} parent
         */
        clear: function (parent) {

            parent = parent || UI_.holder;

            while (parent.firstChild) {

                parent.removeChild(parent.firstChild);

            }

        }

    };

    var gameProcessing_ = {

        prepare: function () {

            maxScore = 0;

            quizData.questions.map(function (current, i) {

                current.answers.map(function (current, i) {

                    maxScore += parseFloat(current.score);

                });

            });

        },

        /**
         * Добавляет баллы за ответ
         *
         * @param {Object} e - объект события клика по варианту ответа
         */
        getUserAnswer: function (e) {

            var answer = e.currentTarget;

            score += parseFloat(answer.dataset.score);

            UI_.answerSelected(answer);

        },

        /**
         * Получает сообщение о результате для набранного количества баллов
         *
         * @returns {string} message
         */
        getMessage: function () {

            var messages = quizData.resultMessages,
                message;

            messages.sort(function (a, b) {

                return a['score'] - b['score'];

            });

            if (!messages.length) {

                return;

            }

            for (var i in messages) {

                if (score < messages[i]['score']) {

                    break;

                }

                message = messages[i]['message'];

            }

            return message;

        }

    };

    return {
        init: init
    };

})();


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
* Quiz form client handler
* Author: @ndawn
* Date: 09/12/16
*/

module.exports = (function (quiz) {

    /**
    * Quiz form
    * @var {null} quiz.form - form DOM element
    */
    quiz.form = null;


    /**
    * Nodes list
    * @var {object} quiz.nodes - dict of DOM elements of questions and result messages
    */
    quiz.nodes = {
        'title': null,
        'description': null,
        'questions': [],
        'resultMessages': [],
        'shareMessage': null
    };


    /**
    * Question insert button and anchor for new questions
    * @var {Element} quiz.questionInsertAnchor - DOM element of question insert anchor
    * @var {Element} quiz.questionInsertButton - DOM element of question insert button
    */
    quiz.questionInsertAnchor = null;
    quiz.questionInsertButton = null;


    /**
    * Result message insert button and anchor for new resultMessages
    * @var {Element} quiz.resultMessageInsertAnchor - DOM element of result message insert anchor
    * @var {Element} quiz.resultMessageInsertButton - DOM element of result message insert button
    */
    quiz.resultMessageInsertAnchor = null;
    quiz.resultMessageInsertButton = null;


    /**
    * Result messages holder element
    * @var {Element} quiz.resultMessagesHolder - DOM element of result messages holder
    */
    quiz.resultMessagesHolder = null;


    /**
    * @private
    * DOM element creating function
    * Creates a DOM element with given attributes
    * @param {string} tag - HTML tag of the element
    * @param {object} attributes - dictionary with attributes to be added to the element
    */
    var newDOMElement_ = function (tag, attributes, text) {

        text = text || '';
        var element = document.createElement(tag);
        var textNode = document.createTextNode(text);

        element.appendChild(textNode);

        for (var attr in attributes) {

            var attrNode = document.createAttribute(attr);

            attrNode.value = attributes[attr];
            element.setAttributeNode(attrNode);

        }

        return element;

    };


    /**
    * @private
    * Answer block creating function
    * Creates a couple of DOM elements and appends them to question answers list
    * @param {number} questionIndex - index of question which answer to be appended to
    */
    var appendAnswerBlock_ = function (questionIndex, answerData) {

        var answer = {};
        var question = quiz.nodes.questions[questionIndex];
        var objectIndex = question.answers.length;

        answerData = answerData || {};

        answer.holder = newDOMElement_('tr', {
            'class': 'quiz-form__question-answer-holder',
            'data-question-index': questionIndex,
            'data-object-index': objectIndex
        });

        answer.textColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-text-column'
        });

        answer.text = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-text',
            'value': answerData.text || '',
            'required': '',
            'form': 'null'
        });

        answer.scoreColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-score-column'
        });

        answer.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '1',
            'value': answerData.score || '0',
            'class': 'quiz-form__question-answer-score',
            'required': '',
            'form': 'null'
        });

        answer.messageColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-message-column'
        });

        answer.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-message',
            'value': answerData.message || '',
            'required': '',
            'form': 'null'
        });

        answer.destroyButtonColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-destroy-button-column'
        });

        answer.destroyButton = newDOMElement_('span', {
            'class': 'quiz-form__question-answer-destroy-button'
        });

        answer.destroyButtonCross = newDOMElement_('img', {
            'class': 'quiz-form__button-cross',
            'src': '/public/app/img/quizzes/cross.svg'
        });

        answer.textColumn.appendChild(answer.text);
        answer.scoreColumn.appendChild(answer.score);
        answer.messageColumn.appendChild(answer.message);

        answer.destroyButton.appendChild(answer.destroyButtonCross);

        answer.destroyButtonColumn.appendChild(answer.destroyButton);

        answer.holder.appendChild(answer.textColumn);
        answer.holder.appendChild(answer.scoreColumn);
        answer.holder.appendChild(answer.messageColumn);
        answer.holder.appendChild(answer.destroyButtonColumn);

        question.answers.push(answer);

        insertDOMElement_(answer);

        updateDestroyIcons_(question.answers);

    };


    /**
    * @private
    * Question element creating function
    * Creates a question JS object with DOM elements in it and appends it to the questions list
    */
    var appendQuestionBlock_ = function (questionData) {

        var question = {};
        var objectIndex = quiz.nodes.questions.length;

        questionData = questionData || {};

        question.holder = newDOMElement_('div', {
            'class': 'quiz-form__question-holder',
            'data-object-index': objectIndex
        });

        question.number = newDOMElement_('label', {
            'class': 'quiz-form__question-number'
        }, 'Вопрос ' + (objectIndex + 1));

        question.destroyButton = newDOMElement_('span', {
            'class': 'quiz-form__question-destroy-button'
        });

        question.destroyButtonCross = newDOMElement_('img', {
            'class': 'quiz-form__button-cross',
            'src': '/public/app/img/quizzes/cross.svg'
        });

        question.titleLabel = newDOMElement_('label', {
            'class': 'quiz-form__label quiz-form__question-title-label'
        }, 'Заголовок вопроса');

        question.title = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-title',
            'value': questionData.title || '',
            'required': '',
            'form': 'null'
        });

        question.answers = [];

        question.answersHolder = newDOMElement_('table', {
            'class': 'quiz-form__question-answers-holder'
        });

        question.answersHead = newDOMElement_('thead', {
            'class': 'quiz-form__question-answers-head'
        });

        question.answersLabel = newDOMElement_('th', {
            'class': 'quiz-form__label quiz-form__question-answers-label'
        }, 'Ответы');

        question.scoresLabel = newDOMElement_('th', {
            'class': 'quiz-form__label quiz-form__question-scores-label'
        }, 'Баллы');

        question.messagesLabel = newDOMElement_('th', {
            'class': 'quiz-form__label quiz-form__question-messages-label'
        }, 'Комментарии к ответам');

        question.destroyButtonLabel = newDOMElement_('th', {
            'class': 'quiz-form__question-destroy-buttons-label'
        });

        question.addAnswerButtonRow = newDOMElement_('tr', {
            'class': 'quiz-form__question-add-answer-button-row'
        });

        question.addAnswerButtonColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-add-answer-button-column'
        });

        question.addAnswerButton = newDOMElement_('span', {
            'class': 'quiz-form__question-add-answer-button'
        }, 'Добавить ответ');

        question.addAnswerButtonPlus = newDOMElement_('img', {
            'class': 'quiz-form__button-plus',
            'src': '/public/app/img/quizzes/plus.svg'
        });

        question.holder.appendChild(question.number);

        question.destroyButton.appendChild(question.destroyButtonCross);

        question.holder.appendChild(question.destroyButton);
        question.holder.appendChild(question.titleLabel);
        question.holder.appendChild(question.title);

        question.answersHead.appendChild(question.answersLabel);
        question.answersHead.appendChild(question.scoresLabel);
        question.answersHead.appendChild(question.messagesLabel);
        question.answersHead.appendChild(question.destroyButtonLabel);

        question.answersHolder.appendChild(question.answersHead);

        question.addAnswerButton.insertBefore(
            question.addAnswerButtonPlus,
            question.addAnswerButton.firstChild
        );

        question.addAnswerButtonColumn.appendChild(question.addAnswerButton);

        question.addAnswerButtonRow.appendChild(question.addAnswerButtonColumn);

        question.answersHolder.appendChild(question.addAnswerButtonRow);

        question.holder.appendChild(question.answersHolder);

        quiz.nodes.questions.push(question);

        if (questionData.answers) {

            questionData.answers.map(function (current, i) {

                appendAnswerBlock_(objectIndex, current);

            });

        } else {

            appendAnswerBlock_(objectIndex);
            appendAnswerBlock_(objectIndex);
            appendAnswerBlock_(objectIndex);

        }

        insertDOMElement_(question);

        updateDestroyIcons_(quiz.nodes.questions);

    };


    /**
    * @private
    * Message block creating function
    * Creates a result message DOM element and appends it to the result messages list
    */
    var appendResultMessageBlock_ = function (messageData) {

        var message = {};
        var objectIndex = quiz.nodes.resultMessages.length;

        messageData = messageData || {};

        message.holder = newDOMElement_('tr', {
            'class': 'quiz-form__message-holder',
            'data-object-index': objectIndex
        });

        message.messageColumn = newDOMElement_('td', {
            'class': 'quiz-form__message-message-column'
        });

        message.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__message-message',
            'value': messageData.message || '',
            'required': '',
            'form': 'null'
        });

        message.scoreColumn = newDOMElement_('td', {
            'class': 'quiz-form__message-score-column'
        });

        message.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '1',
            'value': messageData.score || '0',
            'class': 'quiz-form__message-score',
            'required': '',
            'form': 'null'
        });

        message.destroyButtonColumn = newDOMElement_('td', {
            'class': 'quiz-form__message-destroy-button-column'
        });

        message.destroyButton = newDOMElement_('span', {
            'class': 'quiz-form__message-destroy-button'
        });

        message.destroyButtonCross = newDOMElement_('img', {
            'class': 'quiz-form__button-cross',
            'src': '/public/app/img/quizzes/cross.svg'
        });

        message.messageColumn.appendChild(message.message);
        message.scoreColumn.appendChild(message.score);

        message.destroyButton.appendChild(message.destroyButtonCross);

        message.destroyButtonColumn.appendChild(message.destroyButton);

        message.holder.appendChild(message.messageColumn);
        message.holder.appendChild(message.scoreColumn);
        message.holder.appendChild(message.destroyButtonColumn);

        quiz.nodes.resultMessages.push(message);

        insertDOMElement_(message);

        updateDestroyIcons_(quiz.nodes.resultMessages);

    };


    /**
    * @private
    * Object shifting function
    * Sets numbers in the question with child elements to given index
    * @param {object} obj - object in which numbers to be set
    * @param {number} index - index to which child elements' attributes to be set
    */
    var setObjectNumber_ = function (obj, numberTo) {

        obj.holder.dataset.objectIndex = numberTo - 1;

        if (obj.number) {

            obj.number.textContent = 'Вопрос ' + numberTo;

        }

    };


    /**
    * @private
    * Updating destroy icons function
    * Disables or enables destroy icon for the only element in container
    * @param {object} container - object in which icon is to be disabled or enabled
    */
    var updateDestroyIcons_ = function (container) {

        if (container.length <= 1) {

            container[0].destroyButton.style.display = 'none';

            if (container[0].firstChild) {

                container[0].firstChild.style.display = 'none';

            }

        } else {

            container[0].destroyButton.style.display = '';

            if (container[0].firstChild) {

                container[0].firstChild.style.display = '';

            }

        }

    };


    /**
    * @private
    * DOM element inserting function
    * Inserts DOM element to DOM
    * @param {object} obj - object in which DOM element to be inserted
    */
    var insertDOMElement_ = function (obj) {

        var before;
        var parent;

        if (obj.answers) {

            before = quiz.questionInsertAnchor;
            parent = quiz.form;

        } else if (obj.text) {

            before = quiz.nodes.questions[parseInt(obj.holder.dataset.questionIndex)].addAnswerButtonRow;
            parent = quiz.nodes.questions[parseInt(obj.holder.dataset.questionIndex)].answersHolder;

        } else {

            before = quiz.resultMessageInsertAnchor;
            parent = quiz.resultMessagesHolder;

        }

        parent.insertBefore(obj.holder, before);

    };


    /**
    * @private
    * Element object destroying function
    * Removes the DOM element of object from DOM and destroys object itself
    * @param {object} container - list where object is to be destroyed
    * @param {number} elementIndex - index of object in list
    */
    var destroyObject_ = function (container, elementIndex) {

        container[elementIndex].holder.parentNode.removeChild(container[elementIndex].holder);

        container.splice(elementIndex, 1);
        for (var i = elementIndex; i < container.length; i++) {

            setObjectNumber_(container[i], i + 1);

        }

        updateDestroyIcons_(container);

    };


    /**
    * @private
    * Event listeners setting function
    * Set event listeners for insert and destroy buttons and form submission
    */
    var setEventListeners_ = function () {

        quiz.form.onsubmit = function (event) {

            event.preventDefault();

            var json = {
                'title': quiz.form.querySelector('[name="title"]').value,
                'description': quiz.form.querySelector('[name="description"]').value,
                'questions': [],
                'resultMessages': [],
                'shareMessage': quiz.form.querySelector('[name="shareMessage"]').value
            };

            for (var i in quiz.nodes.questions) {

                var jsonQuestion = {};

                jsonQuestion.title = quiz.nodes.questions[i].title.value;
                jsonQuestion.answers = [];

                for (var j in quiz.nodes.questions[i].answers) {

                    var jsonAnswer = {};

                    jsonAnswer.text = quiz.nodes.questions[i].answers[j].text.value;
                    jsonAnswer.score = quiz.nodes.questions[i].answers[j].score.value;
                    jsonAnswer.message = quiz.nodes.questions[i].answers[j].message.value;

                    jsonQuestion.answers.push(jsonAnswer);

                }

                json.questions.push(jsonQuestion);

            }

            for (var i in quiz.nodes.resultMessages) {

                var jsonMessage = {};

                jsonMessage.score = quiz.nodes.resultMessages[i].score.value;
                jsonMessage.message = quiz.nodes.resultMessages[i].message.value;

                json.resultMessages.push(jsonMessage);

            };

            quiz.form.appendChild(newDOMElement_('input', {
                'type': 'hidden',
                'name': 'quiz_data',
                'value': JSON.stringify(json)
            }));

            quiz.form.submit();

        };

        quiz.questionInsertButton.onclick = function () {

            appendQuestionBlock_();

        };

        quiz.resultMessageInsertButton.onclick = function () {

            appendResultMessageBlock_();

        };


        quiz.form.onclick = function (event) {

            var container;
            var elementIndex;

            if (event.target.classList.contains('quiz-form__question-destroy-button')) {

                container = quiz.nodes.questions;
                elementIndex = parseInt(event.target.parentNode.dataset.objectIndex);

            } else if (event.target.parentNode.classList.contains('quiz-form__question-destroy-button')) {

                container = quiz.nodes.questions;
                elementIndex = parseInt(event.target.parentNode.parentNode.dataset.objectIndex);

            } else if (event.target.classList.contains('quiz-form__question-answer-destroy-button')) {

                container = quiz.nodes.questions[
                    parseInt(event.target.parentNode.parentNode.dataset.questionIndex)
                ].answers;
                elementIndex = parseInt(event.target.parentNode.parentNode.dataset.objectIndex);

            } else if (event.target.parentNode.classList.contains('quiz-form__question-answer-destroy-button')) {

                container = quiz.nodes.questions[
                    parseInt(event.target.parentNode.parentNode.parentNode.dataset.questionIndex)
                ].answers;
                elementIndex = parseInt(event.target.parentNode.parentNode.parentNode.dataset.objectIndex);

            } else if (event.target.classList.contains('quiz-form__message-destroy-button')) {

                container = quiz.nodes.resultMessages;
                elementIndex = parseInt(event.target.parentNode.parentNode.dataset.objectIndex);

            } else if (event.target.classList.contains('quiz-form__question-add-answer-button')) {

                container = null;
                elementIndex = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.dataset.objectIndex);

            }

            if (container === null) {

                appendAnswerBlock_(elementIndex);

            } else if (container !== undefined) {

                destroyObject_(container, elementIndex);

            }

        };

    };


    /**
    * @private
    * First result message adding function
    * Inserts result message with number 1 to the form
    */
    var addInitialResultMessage_ = function () {

        appendResultMessageBlock_();

    };


    /**
    * @private
    * First question adding function
    * Inserts question with number 1 to the form
    */
    var addInitialQuestion_ = function () {

        appendQuestionBlock_();

    };


    /**
    * @private
    * Initial form parameters setting adding function
    * Sets form variable and insert buttons
    */
    var setInitialFormParams_ = function () {

        quiz.form = document.forms.quizForm;
        quiz.questionInsertAnchor = document.getElementById('questionInsertAnchor');
        quiz.questionInsertButton = document.getElementById('questionInsertButton');
        quiz.resultMessageInsertAnchor = document.getElementById('resultMessageInsertAnchor');
        quiz.resultMessageInsertButton = document.getElementById('resultMessageInsertButton');
        quiz.resultMessagesHolder = document.getElementById('resultMessagesHolder');

    };


    /**
    * @private
    * Initial destroy icons updating function
    * Updates initially placed destroy icons
    */
    var updateInitialDestroyIcons_ = function () {

        updateDestroyIcons_(quiz.nodes.questions);
        updateDestroyIcons_(quiz.nodes.resultMessages);
        updateDestroyIcons_(quiz.nodes.questions[0].answers);

    };


    var render = function (quizData) {

        var questions = quizData.questions,
            resultMessages = quizData.resultMessages;

        document.querySelector('[name="title"]').value = quizData.title;
        document.querySelector('textarea[name="description"]').textContent = quizData.description;
        document.querySelector('[name="shareMessage"]').value = quizData.shareMessage;

        setInitialFormParams_();

        resultMessages.map(function (current, i) {

            appendResultMessageBlock_(current);

        });

        questions.map(function (current, i) {

            appendQuestionBlock_(current);

        });

        setEventListeners_();

        updateInitialDestroyIcons_();

    };


    /**
     * @public
     * Initialization function
     * Initializes quiz form: inserts initial DOM elements, sets initial event listeners, etc
     */
    quiz.init = function (quizData) {

        if (quizData) {

            render(quizData);
            return;

        }

        setInitialFormParams_();
        addInitialQuestion_();
        addInitialResultMessage_();
        setEventListeners_();
        updateInitialDestroyIcons_();

    };

    return quiz;

})({});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function () {

    /**
    * Page scroll offset to show scroll-up button
    */
    var SCROLL_UP_OFFSET = 100,
        button = null;

    var scrollPage = function () {

        window.scrollTo(0, 0);

    };

    var windowScrollHandler = function () {

        if (window.pageYOffset > SCROLL_UP_OFFSET) {

            button.classList.add('show');

        } else {

            button.classList.remove('show');

        }

    };

    /**
    * Init method
    * Fired after document is ready
    */
   
    var init = function () {

        /** Find scroll-up button */
        button = document.createElement('DIV');

        button.classList.add('scroll-up');
        document.body.appendChild(button);

        /** Bind click event on scroll-up button */
        button.addEventListener('click', scrollPage);

        /** Global window scroll handler */
        window.addEventListener('scroll', windowScrollHandler);

    };

    return {
        init : init
    }


}();


/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

var showMoreNews = function() {
	/**
    * Helper for 'show more news' button
    * @param {Element} button   - appender button
    */
    var init = function ( button ) {

        var PORTION = 5;

        var news = document.querySelectorAll('.news__list_item'),
            hided = [];

        for (var i = 0, newsItem; !!(newsItem = news[i]); i++) {

            if ( newsItem.classList.contains('news__list_item--hidden') ) {

                hided.push(newsItem);

            }

        }

        hided.splice(0, PORTION).map(function (item) {

            item.classList.remove('news__list_item--hidden');

        });

        if (!hided.length) {

            button.classList.add('news__list_item--hidden');

        }

    };

    return {
    	init : init
    }
}({})

module.exports = showMoreNews;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

/**
* Ajax file transport module
* @author Savchenko Peter (vk.com/specc)
*/
module.exports = (function (transport) {

    transport.currentButtonClicked = {};

    transport.init = function (buttons) {

        transport.form  = document.getElementById('transportForm');
        transport.input = document.getElementById('transportInput');

        for (var i = buttons.length - 1; i >= 0; i--) {

            buttons[i].addEventListener('click', transport.buttonCallback, false);

        }

        transport.input.addEventListener('change', transport.submitCallback, false );

    };

    transport.buttonCallback = function (event) {

        var action        = this.dataset.action,
            target_id     = this.dataset.id,
            is_multiple   = !!this.dataset.multiple || false;

        transport.fillForm({
            action : action,
            id     : target_id
        });

        if ( is_multiple ) {

            transport.form.multiple = 'multiple';

        }

        transport.currentButtonClicked = this;
        transport.input.click();

    };

    /**
    * Append hidden inputs to tranport form
    */
    transport.fillForm = function (data) {

        var input,
            alreadyAddedInput;

        for ( var field in data ) {

            if (typeof data[field] == 'undefined') {

                continue;

            }

            alreadyAddedInput = transport.form.querySelector('input[name=' + field + ']');

            if (typeof alreadyAddedInput != 'undefined' && alreadyAddedInput !== null) {

                input = alreadyAddedInput;

            } else {

                input = document.createElement('input');

            }

            input.type = 'hidden';
            input.name = field;
            input.value = data[field];

            transport.form.appendChild(input);

        }

    };

    transport.submitCallback = function () {

        const FILE_MAX_SIZE = 30 * 1024 * 1024; // 30 MB

        var files = transport.getFileObject( this );

        for (var i = files.length - 1; i >= 0; i--) {

            /** Validate file extension */
            if ( !transport.validateExtension(files[i]) || !transport.validateMIME(files[i]) ) {

                window.console && console.warn('Wrong file type: %o', + files[i].name);
                return;

            }

            /** Validate file size */
            if ( !transport.validateSize( files[i], FILE_MAX_SIZE) ) {

                window.console && console.warn('File size exceeded limit: %o MB', files[i].size / (1024*1024).toFixed(2) );
                return;

            }

        }

        transport.currentButtonClicked.className += ' loading';
        transport.form.submit();

    };

    /**
    * Fires from transport-frame window
    */
    transport.response = function ( response ) {
        
        transport.currentButtonClicked.className = transport.currentButtonClicked.className.replace('loading', '');

        if (response.callback) {

            eval(response.callback);

        }

        if ( response.result ) {

            if ( response.result == 'error' ) {

                window.console && console.warn( response.error_description || 'error' );

            }

        }

    };

    transport.getFileObject = function ( fileInput ) {

        if ( !fileInput ) return false;
        /**
        * Workaround with IE that doesn't support File API
        * @todo test and delete this crutch
        */
        return typeof ActiveXObject == 'function' ? (new ActiveXObject('Scripting.FileSystemObject')).getFile(fileInput.value) : fileInput.files;

    };

    transport.validateMIME = function ( fileObj, accept ) {

        accept = typeof accept == 'array' ? accept : ['image/jpeg', 'image/png'];

        for (var i = accept.length - 1; i >= 0; i--) {

            if ( fileObj.type == accept[i] ) return true;

        }
        return false;

    };

    transport.validateExtension = function ( fileObj, accept ) {

        var ext = fileObj.name.match(/\.(\w+)($|#|\?)/);

        if (!ext) return false;

        ext = ext[1].toLowerCase();

        accept = typeof accept == 'array' ? accept : ['jpg', 'jpeg', 'png'];

        for (var i = accept.length - 1; i >= 0; i--) {

            if ( ext == accept[i] ) return true;

        }

        return false;

    };

    transport.validateSize = function ( fileObj, max_size) {

        return fileObj.size < max_size;

    };

    return transport;

})({});

/***/ }),
/* 16 */
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
codex.core = __webpack_require__(4);
codex.dragndrop = __webpack_require__(5);
codex.scrollUp = __webpack_require__(11);
codex.sharer = __webpack_require__(12);
codex.developer = __webpack_require__(3);
codex.simpleCode = __webpack_require__(14);

codex.showMoreNews = __webpack_require__(13);

codex.polyfills = __webpack_require__(7);
codex.ajax = __webpack_require__(2);

codex.profile = __webpack_require__(8);
// codex.load = require('./modules/load');
// codex.helpers = require('./modules/helpers');

// codex.fixColumns = require('./modules/fixColumns');







codex.quiz = __webpack_require__(9);
codex.quizForm = __webpack_require__(10);
codex.transport = __webpack_require__(15);

module.exports = codex;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map