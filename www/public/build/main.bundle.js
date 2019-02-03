<<<<<<< HEAD
var codex =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"1":"editor"}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/public/build/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpcodex"] = window["webpackJsonpcodex"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * DOM manipulations methods
 */
var DOM =
/*#__PURE__*/
function () {
  function DOM() {
    _classCallCheck(this, DOM);
  }

  _createClass(DOM, null, [{
    key: "make",

    /**
     * Helper for making Elements with classname and attributes
     * @param  {string} tagName           - new Element tag name
     * @param  {array|string} classNames  - list or name of CSS classname(s)
     * @param  {Object} attributes        - any attributes
     * @return {Element}
     */
    value: function make(tagName, classNames, attributes) {
      var el = document.createElement(tagName);

      if (Array.isArray(classNames)) {
        var _el$classList;

        (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classNames));
      } else if (classNames) {
        el.classList.add(classNames);
      }

      for (var attrName in attributes) {
        el[attrName] = attributes[attrName];
      }

      return el;
    }
    /**
     * Replaces node with
     * @param {Element} nodeToReplace
     * @param {Element} replaceWith
     */

  }, {
    key: "replace",
    value: function replace(nodeToReplace, replaceWith) {
      return nodeToReplace.parentNode.replaceChild(replaceWith, nodeToReplace);
    }
    /**
     * getElementById alias
     * @param {String} elementId
     */

  }, {
    key: "get",
    value: function get(elementId) {
      return document.getElementById(elementId);
    }
    /**
     * Loads static resourse: CSS or JS
     * @param {string} type  - CSS|JS
     * @param {string} path  - resource path
     * @param {string} inctanceName - unique name of resource
     * @return Promise
     */

  }, {
    key: "loadResource",
    value: function loadResource(type, path, instanceName) {
      /**
       * Imported resource ID prefix
       * @type {String}
       */
      var resourcePrefix = 'cdx-resourse';
      return new Promise(function (resolve, reject) {
        if (!type || !['JS', 'CSS'].includes(type)) {
          reject("Unexpected resource type passed. \xABCSS\xBB or \xABJS\xBB expected, \xAB".concat(type, "\xBB passed"));
        }

        var node;
        /** Script is already loaded */

        if (!instanceName) {
          reject('Instance name is missed');
        } else if (document.getElementById("".concat(resourcePrefix, "-").concat(type.toLowerCase(), "-").concat(instanceName))) {
          resolve(path);
        }

        if (type === 'JS') {
          node = document.createElement('script');
          node.async = true;
          node.defer = true;
          node.charset = 'utf-8';
        } else {
          node = document.createElement('link');
          node.rel = 'stylesheet';
        }

        node.id = "".concat(resourcePrefix, "-").concat(type.toLowerCase(), "-").concat(instanceName);
        var timerLabel = "Resource loading ".concat(type, " ").concat(instanceName);
        console.time(timerLabel);

        node.onload = function () {
          console.timeEnd(timerLabel);
          resolve(path);
        };

        node.onerror = function () {
          console.timeEnd(timerLabel);
          reject(path);
        };

        if (type === 'JS') {
          node.src = path;
        } else {
          node.href = path;
        }

        document.head.appendChild(node);
      });
    }
  }]);

  return DOM;
}();

exports.default = DOM;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _moduleDispatcher = __webpack_require__(3);

var _moduleDispatcher2 = _interopRequireDefault(_moduleDispatcher);

var _editorLanding = __webpack_require__(4);

var _editorLanding2 = _interopRequireDefault(_editorLanding);

var _articleCreate = __webpack_require__(6);

var _articleCreate2 = _interopRequireDefault(_articleCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import Dispatcher for Frontend Modules initialization
 */
__webpack_require__(9);
/**
 * CodeX community id at vk.com.
 * used by vkWidget module
 */


var VK_COMMUNITY_ID = 103229636;

var codex = function (codex_) {
  'use strict';

  codex_.settings = {};
  /**
  * Preparation method
  */

  codex_.init = function (settings) {
    /** Save settings or use defaults */
    for (var set in settings) {
      this.settings[set] = settings[set] || this.settings[set] || null;
    }

    codex.docReady(function () {
      initModules();
    });
  };

  return codex_;
}({});
/**
 * Function responsible for modules initialization
 * Called no earlier than document is ready
 */


function initModules() {
  new _moduleDispatcher2.default({
    Library: codex
  });
  codex.scrollUp.init();
  /**
   * Find elements with "deeplinker" class and add click listener
   *
   * @param {string} selector
   */

  codex.deeplinker.init('.deeplinker');
  codex.codeStyling.init('.article-code__content');
  codex.vkWidget.init({
    id: 'vk_groups',
    display: {
      'mode': 3,
      'width': 'auto'
    },
    communityId: VK_COMMUNITY_ID
  });
  /**
   * Acitve play-video buttons
   */

  var playVideoButton = document.querySelector('[name="js-show-player"]');

  if (playVideoButton) {
    var Player = __webpack_require__(10).default;

    new Player({
      sourceURL: 'public/app/img/products/ar-tester.mp4',
      toggler: playVideoButton,
      wrapperSelector: '.product-card--ar-tester'
    });
  }
}
/**
* Document ready event listener
* @usage codex.docReady(function(){ # code ... } );
*/


codex.docReady = function (f) {
  return /in/.test(document.readyState) ? window.setTimeout(codex.docReady, 9, f) : f();
};
/**
* Pages
*/


codex.admin = __webpack_require__(11);
codex.join = __webpack_require__(12);
/**
 * Modules
 */

codex.core = __webpack_require__(13);
codex.dragndrop = __webpack_require__(14);
codex.scrollUp = __webpack_require__(15);
codex.sharer = __webpack_require__(16);
codex.developer = __webpack_require__(17); // codex.simpleCode = require('./modules/simpleCodeStyling');

codex.showMoreNews = __webpack_require__(18);
codex.polyfills = __webpack_require__(19);
codex.ajax = __webpack_require__(20);
codex.profile = __webpack_require__(21);
codex.helpers = __webpack_require__(22);
codex.quiz = __webpack_require__(23);
codex.quizForm = __webpack_require__(24);
codex.transport = __webpack_require__(25);
codex.vkWidget = __webpack_require__(26);
codex.codeStyling = __webpack_require__(27);
codex.deeplinker = __webpack_require__(28);
codex.reactions = __webpack_require__(29);
codex.pluginsFilter = __webpack_require__(30);
codex.editorLanding = new _editorLanding2.default();
codex.articleCreate = new _articleCreate2.default();
module.exports = codex;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * CodeX Module Dispatcher — Initialize frontend Modules from the DOM without inline scripts
 * 
 * @copyright CodeX Team <team@ifmo.su>
 * @license MIT https://github.com/codex-team/dispatcher/LICENSE
 * @author @polinashneider https://github.com/polinashneider
 * @version 0.0.1
 */
!function(e,t){ true?module.exports=t():undefined}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t){var n=t.name,o=t.element,s=t.settings,i=t.moduleClass;r(this,e),this.name=n,this.element=o,this.settings=s,this.moduleClass=i}return s(e,[{key:"init",value:function(){try{console.assert(this.moduleClass.init instanceof Function,"Module «"+this.name+"» should implement init method"),this.moduleClass.init instanceof Function&&(this.moduleClass.init(this.settings,this.element),console.log("Module «"+this.name+"» initialized"))}catch(e){console.warn("Module «"+this.name+"» was not initialized because of ",e)}}},{key:"destroy",value:function(){this.moduleClass.destroy instanceof Function&&(this.moduleClass.destroy(),console.log("Module «"+this.name+"» destroyed."))}}]),e}(),u=function(){function e(t){r(this,e),this.Library=t.Library||window,this.modules=this.findModules(document),this.initModules()}return s(e,[{key:"findModules",value:function(e){for(var t=[],n=e.querySelectorAll("[data-module]"),r=n.length-1;r>=0;r--)t.push.apply(t,o(this.extractModulesData(n[r])));return t}},{key:"extractModulesData",value:function(e){var t=this,n=[],o=e.dataset.module;return o=o.replace(/\s+/," "),o.split(" ").forEach(function(o,r){var s=new i({name:o,element:e,settings:t.getModuleSettings(e,r,o),moduleClass:t.Library[o]});n.push(s)}),n}},{key:"getModuleSettings",value:function(e,t,n){var o=e.querySelector("module-settings"),r=void 0;if(!o)return null;try{r=o.textContent.trim(),r=JSON.parse(r)}catch(e){return console.warn("Can not parse Module «"+n+"» settings bacause of: "+e),console.groupCollapsed(n+" settings"),console.log(r),console.groupEnd(),null}return Array.isArray(r)?r[t]?r[t]:null:0===t?r:(console.warn("Wrong settings format. For several Modules use an array instead of object."),null)}},{key:"initModules",value:function(){console.groupCollapsed("ModuleDispatcher"),this.modules.forEach(function(e){e.init()}),console.groupEnd()}}]),e}();t.default=u}])});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module to compose output JSON preview
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cPreview = __webpack_require__(5);
/**
 * Module for pages using Editor
 */


var EditorLanding =
/*#__PURE__*/
function () {
  function EditorLanding() {
    _classCallCheck(this, EditorLanding);

    /**
     * Editor class Instance
     */
    this.editor = null;
    /**
     * DOM elements
     */

    this.nodes = {
      /**
      * Container to output saved Editor data
      */
      outputWrapper: null
    };
  }
  /**
   * @typedef {Object} editorLandingSettings - Editor landing class settings
   * @property {String} editorLandingSettings.output_id - ID of container where Editor's saved data will be shown
   * @property {function} editorLandingSettings.onChange - Modifications callback for the Editor
   */

  /**
   * Initialization. Called by Module Dispatcher
   */


  _createClass(EditorLanding, [{
    key: "init",
    value: function init(editorLandingSettings) {
      var _this = this;

      /**
       * Prepare node to output Editor data preview
       * @type {HTMLElement} - JSON preview container
       */
      this.nodes.outputWrapper = document.getElementById(editorLandingSettings.output_id);

      if (!this.nodes.outputWrapper) {
        console.warn('Can\'t find output target with ID: «' + editorLandingSettings.output_id + '»');
      }

      this.loadEditor({
        blocks: editorLandingSettings.blocks,

        /**
         * Bind onchange callback to preview JSON data
         */
        onChange: function onChange() {
          _this.previewData();
        },

        /**
         * When Editor is ready, preview JSON output with initial data
         */
        onReady: function onReady() {
          _this.previewData();

          _this.editor.focus();
        }
      }).then(function (editor) {
        _this.editor = editor;
      });
    }
  }, {
    key: "loadEditor",

    /**
     * Load Editor from separate chunk
     * @param settings - settings for Editor initialization
     * @return {Promise<Editor>} - CodeX Editor promise
     */
    value: function loadEditor(settings) {
      return __webpack_require__.e(/* import() | editor */ 1).then(__webpack_require__.t.bind(null, 1, 7)).then(function (_ref) {
        var Editor = _ref.default;
        return new Editor(settings);
      });
    }
    /**
     * Shows JSON output of editor saved data
     */

  }, {
    key: "previewData",
    value: function previewData() {
      var _this2 = this;

      this.editor.save().then(function (savedData) {
        cPreview.show(savedData, _this2.nodes.outputWrapper);
      });
    }
  }]);

  return EditorLanding;
}();

exports.default = EditorLanding;
;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module to compose output JSON preview
 */
var cPreview = function () {
  /**
   * Shows JSON in pretty preview
   * @param {object} output - what to show
   * @param {Element} holder - where to show
   */
  function show(output, holder) {
    /** Make JSON pretty */
    output = JSON.stringify(output, null, 4);
    /** Encode HTML entities */

    output = encodeHTMLEntities(output);
    /** Stylize! */

    output = stylize(output);
    holder.innerHTML = output;
  }

  ;
  /**
   * Converts '>', '<', '&' symbols to entities
   */

  function encodeHTMLEntities(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /**
   * Some styling magic
   */


  function stylize(string) {
    /** Stylize JSON keys */
    string = string.replace(/"(\w+)"\s?:/g, '"<span class=sc_key>$1</span>" :');
    /** Stylize tool names */

    string = string.replace(/"(paragraph|quote|list|header|link|code|image|delimiter|raw|table)"/g, '"<span class=sc_toolname>$1</span>"');
    /** Stylize HTML tags */

    string = string.replace(/(&lt;[\/a-z]+(&gt;)?)/gi, '<span class=sc_tag>$1</span>');
    /** Stylize strings */

    string = string.replace(/"([^"]+)"/gi, '"<span class=sc_attr>$1</span>"');
    /** Boolean/Null */

    string = string.replace(/\b(true|false|null)\b/gi, '<span class=sc_bool>$1</span>');
    string = string.replace(/\b(\d+)\b/gi, '<span class=sc_digit>$1</span>');
    return string;
  }

  return {
    show: show
  };
}({});

module.exports = cPreview;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ajax = __webpack_require__(7);

var notifier = __webpack_require__(8);
/**
 * Module for pages using Editor
 */


var EditorWriting =
/*#__PURE__*/
function () {
  function EditorWriting() {
    _classCallCheck(this, EditorWriting);
  }

  _createClass(EditorWriting, [{
    key: "init",

    /**
     * Initialize editor on article writing page
     * @param {Object} settings - article form's parameters
     * @param {String} settings.article_textarea - textarea with article contents
     * @param {String} settings.form_url - url of form with Editor's data
     * @param {String} settings.submit_id - id of submit button
     */
    value: function init(settings, form) {
      var _this = this;

      this.form = form;
      this.article = document.getElementById(settings.article_textarea);
      this.button = document.getElementById(settings.submit_id);
      this.formURL = settings.form_url;
      /**
       * Settings for Editor class
       * @type {{blocks: Object[]}}
       */

      var editorSettings = {
        blocks: this.getArticleData()
      };
      this.loadEditor(editorSettings).then(function (editor) {
        _this.editor = editor;
      });
      this.prepareSubmit();
    }
  }, {
    key: "prepareSubmit",

    /**
     * Add eventListener to article submit button, submit data on click
     */
    value: function prepareSubmit() {
      var _this2 = this;

      this.button.addEventListener('click', function () {
        _this2.saveArticle();
      }, false);
    }
    /**
     * Save article's data, in case of success redirect to its uri
     */

  }, {
    key: "saveArticle",
    value: function saveArticle() {
      var _this3 = this;

      var article = this.article;
      /**
       * Call Editor's save method
       */

      this.editor.save().then(function (savedData) {
        article.value = JSON.stringify(savedData);
        /**
         * Send article data via ajax
         */

        Promise.resolve().then(function () {
          _this3.button.classList.add('loading');
        }).then(function () {
          return ajax.post({
            url: _this3.formURL,
            data: _this3.form
          });
        })
        /**
         * @typedef {Object} responseData - response after attempt to send form via ajax
         * @property {string} redirect    - article's uri in case of success
         * @property {string} message     - article saving error in case of fail
         * @property {number} success     - article saving status, 1 - success, 0 - fail
         */

        /**
         * @param {responseData} response - ajax-response after form is sent
         */
        .then(function (response) {
          /**
           * If data was sent successfully get article's uri and redirect to it
           */
          if (response.success) {
            window.location.href = response.redirect;
          } else {
            _this3.showErrorMessage(response.message);
          }
        }).catch(function (err) {
          _this3.showErrorMessage(err);
        });
      });
    }
    /**
     * If article's form submission via ajax failed show message with error text
     * @param {String} err - form submission error message
     */

  }, {
    key: "showErrorMessage",
    value: function showErrorMessage(err) {
      console.error(err);
      notifier.show({
        message: err,
        style: 'error'
      });
      this.button.classList.remove('loading');
    }
    /**
     * If we want to edit existing article, get its data
     */

  }, {
    key: "getArticleData",
    value: function getArticleData() {
      /** If article exists return its data */
      if (this.article.textContent.length) {
        /**
         * Article's data
         */
        var pageContent;
        /**
         * Get content that was written before and render with Codex Editor
         */

        try {
          pageContent = JSON.parse(this.article.textContent);
        } catch (error) {
          console.error('Errors occurred while parsing Editor data', error);
        }

        return pageContent ? pageContent.blocks : [];
      }
    }
    /**
     * Load Editor from separate chunk
     * @param {Object} settings - settings for Editor initialization
     * @return {Promise<Editor>} - CodeX Editor promise
     */

  }, {
    key: "loadEditor",
    value: function loadEditor(settings) {
      return __webpack_require__.e(/* import() | editor */ 1).then(__webpack_require__.t.bind(null, 1, 7)).then(function (_ref) {
        var Editor = _ref.default;
        return new Editor(settings);
      });
    }
  }]);

  return EditorWriting;
}();

exports.default = EditorWriting;
;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){var r=n(2),o=setTimeout;function i(){}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function u(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,a._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void s(t.promise,e)}c(t.promise,r)}else(1===e._state?c:s)(t.promise,e._value)})):e._deferreds.push(t)}function c(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void l(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,f(e)}catch(t){s(e,t)}}function s(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,c(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}}a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(i);return u(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},a.prototype.finally=r.a,a.all=function(e){return new a(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var o=r.length;function i(e,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var u=a.then;if("function"==typeof u)return void u.call(a,function(t){i(e,t)},n)}r[e]=a,0==--o&&t(r)}catch(e){n(e)}}for(var a=0;a<r.length;a++)i(a,r[a])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,n){n(e)})},a.race=function(e){return new a(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},a._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){o(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.a=a}).call(this,n(5).setImmediate)},function(e,t,n){"use strict";t.a=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n(4);var o=n(8),i=function(){var e={URLENCODED:"application/x-www-form-urlencoded; charset=utf-8",FORM:"multipart/form-data",JSON:"application/json; charset=utf-8"},t=function(e){return new Promise(function(t,n){e=a(e),e=u(e);var r=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP");r.open(e.method,e.url),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(e.headers).forEach(function(t){var n=e.headers[t];r.setRequestHeader(t,n)});var o=e.ratio;r.upload.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),r=Math.ceil(n*o/100);e.progress(r)},!1),r.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),r=Math.ceil(n*(100-o)/100)+o;e.progress(r)},!1),r.onreadystatechange=function(){if(4===r.readyState){var e=r.response;try{e=JSON.parse(e)}catch(e){}200===r.status?t(e):n(e)}},r.send(e.data)})},n=function(e){return e.method="POST",t(e)},a=function(t){if(!t.url||"string"!=typeof t.url)throw new Error("Url must be a non-empty string");if(t.method&&"string"!=typeof t.method)throw new Error("`method` must be a string or null");if(t.method=t.method?t.method.toUpperCase():"GET",t.headers&&"object"!==r(t.headers))throw new Error("`headers` must be an object or null");if(t.headers=t.headers||{},t.type&&("string"!=typeof t.type||!Object.values(e).includes(t.type)))throw new Error("`type` must be taken from module's «contentType» library");if(t.progress&&"function"!=typeof t.progress)throw new Error("`progress` must be a function or null");if(t.progress=t.progress||function(e){},t.ratio&&"number"!=typeof t.ratio)throw new Error("`ratio` must be a number");if(t.ratio<0||t.ratio>100)throw new Error("`ratio` must be in a 0-100 interval");if(t.ratio=t.ratio||90,t.accept&&"string"!=typeof t.accept)throw new Error("`accept` must be a string with a list of allowed mime-types");if(t.accept=t.accept||"*/*",t.multiple&&"boolean"!=typeof t.multiple)throw new Error("`multiple` must be a true or false");if(t.multiple=t.multiple||!1,t.fieldName&&"string"!=typeof t.fieldName)throw new Error("`fieldName` must be a string");return t.fieldName=t.fieldName||"files",t},u=function(t){switch(t.method){case"GET":var n=c(t.data,e.URLENCODED);delete t.data,t.url=/\?/.test(t.url)?t.url+"&"+n:t.url+"?"+n;break;case"POST":case"PUT":case"DELETE":case"UPDATE":var r=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).type||e.JSON}(t);(o.isFormData(t.data)||o.isFormElement(t.data))&&(r=e.FORM),t.data=c(t.data,r),r!==i.contentType.FORM&&(t.headers["content-type"]=r)}return t},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch(arguments.length>1?arguments[1]:void 0){case e.URLENCODED:return o.urlEncode(t);case e.JSON:return o.jsonEncode(t);case e.FORM:return o.formEncode(t);default:return t}};return{contentType:e,request:t,get:function(e){return e.method="GET",t(e)},post:n,transport:function(e){return e=a(e),o.transport(e).then(function(t){return o.isObject(e.data)&&Object.keys(e.data).forEach(function(n){var r=e.data[n];t.append(n,r)}),e.data=t,n(e)})}}}();e.exports=i},function(e,t,n){"use strict";n.r(t);var r=n(1);window.Promise=window.Promise||r.a},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(6),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o=1,i={},a=!1,u=e.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(e);c=c&&c.setTimeout?c:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick(function(){f(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&f(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),r=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){f(e.data)},r=function(t){e.port2.postMessage(t)}}():u&&"onreadystatechange"in u.createElement("script")?function(){var e=u.documentElement;r=function(t){var n=u.createElement("script");n.onreadystatechange=function(){f(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():r=function(e){setTimeout(f,0,e)},c.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var a={callback:e,args:t};return i[o]=a,r(o),o++},c.clearImmediate=s}function s(e){delete i[e]}function f(e){if(a)setTimeout(f,0,e);else{var t=i[e];if(t){a=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{s(e),a=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(7))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,s=[],f=!1,l=-1;function d(){f&&c&&(f=!1,c.length?s=c.concat(s):l=-1,s.length&&p())}function p(){if(!f){var e=u(d);f=!0;for(var t=s.length;t;){for(c=s,s=[];++l<t;)c&&c[l].run();l=-1,t=s.length}c=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new m(e,t)),1!==s.length||f||u(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=n(9);e.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,t,n){t&&r(e.prototype,t),n&&r(e,n)}(e,null,[{key:"urlEncode",value:function(e){return o(e)}},{key:"jsonEncode",value:function(e){return JSON.stringify(e)}},{key:"formEncode",value:function(e){if(this.isFormData(e))return e;if(this.isFormElement(e))return new FormData(e);if(this.isObject(e)){var t=new FormData;return Object.keys(e).forEach(function(n){var r=e[n];t.append(n,r)}),t}throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement")}},{key:"isObject",value:function(e){return"[object Object]"===Object.prototype.toString.call(e)}},{key:"isFormData",value:function(e){return e instanceof FormData}},{key:"isFormElement",value:function(e){return e instanceof HTMLFormElement}},{key:"transport",value:function(e){return new Promise(function(t,n){var r=document.createElement("INPUT");r.type="file",e.multiple&&r.setAttribute("multiple","multiple"),e.accept&&r.setAttribute("accept",e.accept),r.addEventListener("change",function(n){for(var r=n.target.files,o=new FormData,i=0;i<r.length;i++)o.append(e.fieldName,r[i],r[i].name);t(o)},!1),r.click()})}}]),e}()},function(e,t){var n=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,escape).replace(/%20/g,"+")},r=function(e,t,o,i){return t=t||null,o=o||"&",i=i||null,e?function(e){for(var t=new Array,n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t}(Object.keys(e).map(function(a){var u,c=a;if(i&&(c=i+"["+c+"]"),"object"==typeof e[a]&&null!==e[a])u=r(e[a],null,o,c);else{t&&(c=function(e){return!isNaN(parseFloat(e))&&isFinite(e)}(c)?t+Number(c):c);var s=e[a];s=(s=0===(s=!1===(s=!0===s?"1":s)?"0":s)?"0":s)||"",u=n(c)+"="+n(s)}return u})).join(o).replace(/[!'()*]/g,""):""};e.exports=r}])});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var notifier=function(e){function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";e.exports=function(){var e={wrapper:"cdx-notifies",notification:"cdx-notify",crossBtn:"cdx-notify__cross",okBtn:"cdx-notify__button--confirm",cancelBtn:"cdx-notify__button--cancel",input:"cdx-notify__input",btn:"cdx-notify__button",btnsWrapper:"cdx-notify__btns-wrapper"},t=function(t){var n=document.createElement("DIV"),r=document.createElement("DIV"),c=t.message,i=t.style;return n.classList.add(e.notification),i&&n.classList.add(e.notification+"--"+i),n.innerHTML=c,r.classList.add(e.crossBtn),r.addEventListener("click",n.remove.bind(n)),n.appendChild(r),n};return{alert:t,confirm:function(n){var r=t(n),c=document.createElement("div"),i=document.createElement("button"),a=document.createElement("button"),o=r.querySelector(e.crossBtn),d=n.cancelHandler,s=n.okHandler;return c.classList.add(e.btnsWrapper),i.innerHTML=n.okText||"Confirm",a.innerHTML=n.cancelText||"Cancel",i.classList.add(e.btn),a.classList.add(e.btn),i.classList.add(e.okBtn),a.classList.add(e.cancelBtn),d&&"function"==typeof d&&(a.addEventListener("click",d),o.addEventListener("click",d)),s&&"function"==typeof s&&i.addEventListener("click",s),i.addEventListener("click",r.remove.bind(r)),a.addEventListener("click",r.remove.bind(r)),c.appendChild(i),c.appendChild(a),r.appendChild(c),r},prompt:function(n){var r=t(n),c=document.createElement("div"),i=document.createElement("button"),a=document.createElement("input"),o=r.querySelector(e.crossBtn),d=n.cancelHandler,s=n.okHandler;return c.classList.add(e.btnsWrapper),i.innerHTML=n.okText||"Ok",i.classList.add(e.btn),i.classList.add(e.okBtn),a.classList.add(e.input),n.placeholder&&a.setAttribute("placeholder",n.placeholder),n.default&&(a.value=n.default),n.inputType&&(a.type=n.inputType),d&&"function"==typeof d&&o.addEventListener("click",d),s&&"function"==typeof s&&i.addEventListener("click",function(){s(a.value)}),i.addEventListener("click",r.remove.bind(r)),c.appendChild(a),c.appendChild(i),r.appendChild(c),r},wrapper:function(){var t=document.createElement("DIV");return t.classList.add(e.wrapper),t}}}()},function(e,t){},function(e,t,n){"use strict";/*!
 * Codex JavaScript Notification module
 * https://github.com/codex-team/js-notifier
 *
 * Codex Team - https://ifmo.su
 *
 * MIT License | (c) Codex 2017
 */
e.exports=function(){function e(){if(i)return!0;i=r.wrapper(),document.body.appendChild(i)}function t(t){if(t.message){e();var n=null,a=t.time||8e3;switch(t.type){case"confirm":n=r.confirm(t);break;case"prompt":n=r.prompt(t);break;default:n=r.alert(t),window.setTimeout(function(){n.remove()},a)}i.appendChild(n),n.classList.add(c)}}n(1);var r=n(0),c="cdx-notify--bounce-in",i=null;return{show:t}}()}]);

/*** EXPORTS FROM exports-loader ***/
module.exports = notifier;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dom = __webpack_require__(0);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Player =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param  {String} options.sourceURL        - video URL
   * @param  {Element} options.toggler         - play button
   * @param  {String} options.wrapperSelector  - xpath selector for the player holder
   */
  function Player(_ref) {
    var _this = this;

    var sourceURL = _ref.sourceURL,
        toggler = _ref.toggler,
        wrapperSelector = _ref.wrapperSelector;

    _classCallCheck(this, Player);

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

    this.toggler.addEventListener('click', function () {
      _this.showVideoOverlay();
    }, false);
  }
  /**
   * Creates player container and append it to the parent element
   */


  _createClass(Player, [{
    key: "showVideoOverlay",
    value: function showVideoOverlay() {
      var _this2 = this;

      this.overlay = _dom2.default.make('div', this.CSS.overlay);

      var video = _dom2.default.make('video', null, {
        autoplay: true,
        loop: true
      }),
          source = _dom2.default.make('source', null, {
        src: this.sourceURL,
        type: 'video/mp4'
      }),
          closeButton = _dom2.default.make('div', this.CSS.closeButton);
      /**
       * Append <video>
       */


      video.appendChild(source);
      this.overlay.appendChild(video);
      /**
       * Bind loading callback
       */

      video.addEventListener('loadeddata', function () {
        _this2.videoLoaded();
      });
      /**
       * Activate close button
       */

      this.overlay.appendChild(closeButton);
      closeButton.addEventListener('click', function () {
        _this2.close();
      });
      /**
       * Add overlay to the wrapper
       */

      this.wrapper.appendChild(this.overlay);
      window.setTimeout(function () {
        _this2.overlay.classList.add(_this2.CSS.overlayShowed);
      }, 50);
    }
    /**
     * Video loaded callback
     * Shows player
     */

  }, {
    key: "videoLoaded",
    value: function videoLoaded() {
      this.wrapper.classList.add(this.CSS.overlayLoaded);
    }
    /**
     * Removes overlay with video
     */

  }, {
    key: "close",
    value: function close() {
      this.overlay.remove();
      this.overlay = null;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
      findDraggable: function findDraggable(e) {
        var target = e.target.closest('.draggable');
        if (target) return target.closest('.list-item');
        return null;
      },
      makeAvatar: function makeAvatar(elem) {
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
      targetChanged: function targetChanged(target, newTarget, avatar) {
        if (!newTarget) return;
        var targetPosition = newTarget.compareDocumentPosition(avatar.elem);

        if (targetPosition & 4) {
          newTarget.parentNode.insertBefore(avatar.elem, newTarget);
        } else if (targetPosition & 2) {
          newTarget.parentNode.insertBefore(avatar.elem, newTarget.nextSibling);
        }
      },
      move: function move() {},
      targetReached: function targetReached(target, avatar, elem) {
        target.parentNode.insertBefore(elem, target.nextSibling);
        avatar.elem.parentNode.removeChild(avatar.elem);
        elem.classList.remove('no-display');
        var itemId = elem.dataset.id,
            itemType = elem.dataset.type,
            itemBelowValue = null,
            nextSibling;

        if (nextSibling == elem.nextElementSibling) {
          itemBelowValue = nextSibling.dataset.type + ':' + nextSibling.dataset.id;
        }

        var ajaxData = {
          success: function success() {
            document.getElementById('saved').classList.remove('top-menu__saved_hidden');
            window.setTimeout(function () {
              document.getElementById('saved').classList.add('top-menu__saved_hidden');
            }, 1000);
          },
          type: 'POST',
          url: '/admin/feed',
          data: JSON.stringify({
            'item_id': itemId,
            'item_type': itemType,
            'item_below_value': itemBelowValue
          })
        };
        codex.core.ajax(ajaxData);
      }
    }); // body...
  }
  /**
   * Module initialization
   * @param  {Object}      params             - init params
   * @param  {String|null} params.listType    - feed list type ("cards"|"list")
   */


  admin.init = function (params) {
    codex.core.log('Initialized.', 'Module admin');

    if (params.listType === 'cards') {
      var items = document.querySelectorAll('.feed-item');

      for (var i = items.length - 1; i > -1; i--) {
        items[i].classList.add('draggable');
        items[i].classList.add('feed-item--dnd');
        items[i].classList.add('list-item');
      }
    }

    initDragNDrop();
  };

  return admin;
}({});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module for /join page
 * Blocks writing without authorization
 *
 * Toggles into view blankAdditionalFields: Name and Surname, Email
 */
var join = function () {
  var animationClass = 'wobble';
  /**
  * Module initialization
  */

  var init = function init() {
    var joinBlank = document.getElementById('joinBlank');

    if (typeof joinBlank != 'undefined' && joinBlank !== null) {
      var joinBlankTextareas = joinBlank.getElementsByTagName('textarea');

      if (joinBlankTextareas.length) {
        for (var i = joinBlankTextareas.length - 1; i >= 0; i--) {
          joinBlankTextareas[i].addEventListener('keyup', checkUserCanEdit, false);
        }
      }
    }

    var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');

    if (typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton !== null) {
      blankShowAdditionalFieldsButton.addEventListener('click', showAdditionalFields, false);
    }
  };
  /**
   * Adds wobble-effect to Auth block if user starts typing into textarea unauthorized
   * @param {Event} event
   */


  var checkUserCanEdit = function checkUserCanEdit(event) {
    var textarea = event.target,
        blankAuthBlock = document.getElementById('js-join-auth'),
        emailInput = document.getElementById('js-email');

    if (blankAuthBlock && !emailInput.value.length) {
      blankAuthBlock.classList.add(animationClass);
      window.setTimeout(function () {
        return blankAuthBlock.classList.remove(animationClass);
      }, 450);
      textarea.value = '';
    }
  };
  /**
   * Toggles into view blankAdditionalFields: Name and Surname, Email
   * @param {Event} event
   */


  var showAdditionalFields = function showAdditionalFields() {
    var blankAdditionalFields = document.getElementById('blankAdditionalFields');
    blankAdditionalFields.classList.toggle('hide');
  };

  return {
    init: init
  };
}({});

module.exports = join;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* Significant core methods
*/
module.exports = function () {
  /** Logging method */
  var log = function log(str, prefix, type, arg) {
    var staticLength = 32;

    if (prefix) {
      prefix = prefix.length < staticLength ? prefix : prefix.substr(0, staticLength - 2);

      while (prefix.length < staticLength - 1) {
        prefix += ' ';
      }

      prefix += ':';
      str = prefix + str;
    }

    type = type || 'log';

    try {
      if ('console' in window && window.console[type]) {
        if (arg) console[type](str, arg);else console[type](str);
      }
    } catch (e) {}
  };
  /**
  * Native ajax method.
  * @param {Object} data
  */


  var ajax = function ajax(data) {
    if (!data || !data.url) {
      return;
    }

    var XMLHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
        successFunction = function successFunction() {};

    data.async = true;
    data.type = data.type || 'GET';
    data.data = data.data || '';
    data['content-type'] = data['content-type'] || 'application/json; charset=utf-8';
    successFunction = data.success || successFunction;

    if (data.type == 'GET' && data.data) {
      data.url = /\?/.test(data.url) ? data.url + '&' + data.data : data.url + '?' + data.data;
    }

    if (data.withCredentials) {
      XMLHTTP.withCredentials = true;
    }

    if (data.beforeSend && typeof data.beforeSend == 'function') {
      data.beforeSend.call();
    }

    XMLHTTP.open(data.type, data.url, data.async);
    XMLHTTP.setRequestHeader('Content-type', data['content-type']);
    XMLHTTP.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    XMLHTTP.onreadystatechange = function () {
      if (XMLHTTP.readyState == 4 && XMLHTTP.status == 200) {
        successFunction(XMLHTTP.responseText);
      }
    };

    XMLHTTP.send(data.data);
  };

  return {
    ajax: ajax,
    log: log
  };
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (settings) {
  var defaultHandlers = {
    findDraggable: function findDraggable(e) {
      return e.target.closest('.' + draggableClass);
    },
    findDroppable: function findDroppable(e) {
      return document.elementFromPoint(e.clientX, e.clientY).closest('.' + droppableClass);
    },

    /**
     * The simplest makeAvatar method.
     *
     * Just set elem to avatar.elem. And remembers element position in document.
     * If drop isn`t success, returns elem to start position.
     */
    makeAvatar: function makeAvatar(elem) {
      var avatar = {};

      var avatarRollback = function avatarRollback() {
        avatar.elem.classList.remove('dnd-default-avatar');
        if (avatar.nextSibling) avatar.parentNode.insertBefore(avatar.elem, avatar.nextSibling);else avatar.parentNode.appendChild(avatar.elem);
        delete dragObj.avatar;
      };

      avatar = {
        elem: elem,
        parentNode: elem.parentNode,
        nextSibling: elem.nextElementSibling,
        rollback: avatarRollback
      }; // Set avatar position: absolute; for drag'n'drop

      avatar.elem.classList.add('dnd-default-avatar');
      return avatar;
    },

    /**
     * Highlights droppable elements under cursor with border
     */
    targetChanged: function targetChanged(target, newTarget) {
      if (target) target.classList('dnd-default-target-highlight');
      if (newTarget) newTarget.classList.add('dnd-default-target-highlight');
    },
    move: function move(e, avatar, shift) {
      avatar.elem.style.left = e.pageX - shift.x + 'px';
      avatar.elem.style.top = e.pageY - shift.y + 'px';
    },

    /**
     * Inserts elem into document if drop is success
     */
    targetReached: function targetReached(target, avatar, elem) {
      target.classList.remove('dnd-default-target-highlight');
      target.parentNode.insertBefore(elem, target.nextElementSibling);
      avatar.elem.classList.remove('dnd-default-avatar');
    }
  };
  var draggableClass = settings.draggableClass || 'draggable',
      droppableClass = settings.droppableClass || 'droppable',
      findDraggable = settings.findDraggable || defaultHandlers.findDraggable,
      findDroppable = settings.findDroppable || defaultHandlers.findDroppable,
      makeAvatar = settings.makeAvatar || defaultHandlers.makeAvatar,
      targetChanged = settings.targetChanged || defaultHandlers.targetChanged,
      move = settings.move || defaultHandlers.move,
      targetReached = settings.targetReached || defaultHandlers.targetReached;
  var dragObj = {};

  var onMouseDown = function onMouseDown(e) {
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

  var onMouseMove = function onMouseMove(e) {
    if (!dragObj.elem) return; // Prevent touchmove scroll

    e.preventDefault();
    e = touchSupported(e); // Check mouse offset. If x or y offset <5, assume that it`s accidental move

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

  var onMouseUp = function onMouseUp(e) {
    if (e.which > 1) return;

    if (!dragObj.avatar) {
      dragObj = {};
      return;
    }

    e = touchSupported(e);
    var target = findDroppable(e);
    if (target) targetReached(target, dragObj.avatar, dragObj.elem, e);else dragObj.avatar.rollback();
    dragObj = {};
    toggleSelection();
  };

  var getCoords = function getCoords(elem) {
    var rect = elem.getBoundingClientRect();
    return {
      x: rect.left + window.pageXOffset,
      y: rect.top + window.pageYOffset
    };
  };

  var touchSupported = function touchSupported(e) {
    if (e.changedTouches) var touch = e.changedTouches[0];else return e;
    e.pageX = touch.pageX;
    e.pageY = touch.pageY;
    e.clientX = touch.clientX;
    e.clientY = touch.clientY;
    e.screenX = touch.screenX;
    e.screenY = touch.screenY;
    e.target = touch.target;
    return e;
  };

  var toggleSelection = function toggleSelection() {
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* Module for scroll-up button
*/
module.exports = function () {
  /**
  * Page scroll offset to show scroll-up button
  */
  var SCROLL_UP_OFFSET = 100,
      button = null;

  var scrollPage = function scrollPage() {
    window.scrollTo(0, 0);
  };

  var windowScrollHandler = function windowScrollHandler() {
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


  var init = function init() {
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
    init: init
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module for social sharing
 */
module.exports = function (sharer) {
  /**
   * @param  {Object} data - Info about item we want to share
   */
  sharer.vkontakte = function (data) {
    var link = 'https://vk.com/share.php?';
    link += 'url=' + data.url;
    link += '&title=' + data.title;
    link += '&description=' + data.desc;
    link += '&image=' + data.img;
    link += '&noparse=true';
    sharer.popup(link, 'vkontakte');
  };

  sharer.facebook = function (data) {
    var FB_APP_ID = 1740455756240878,
        link = 'https://www.facebook.com/dialog/share?display=popup';
    link += '&app_id=' + FB_APP_ID;
    link += '&href=' + data.url;
    link += '&redirect_uri=' + document.location.href;
    sharer.popup(link, 'facebook');
  };

  sharer.twitter = function (data) {
    var link = 'https://twitter.com/share?';
    link += 'text=' + data.title;
    link += '&url=' + data.url;
    link += '&counturl=' + data.url;
    sharer.popup(link, 'twitter');
  };

  sharer.telegram = function (data) {
    var link = 'https://telegram.me/share/url';
    link += '?text=' + data.title;
    link += '&url=' + data.url;
    sharer.popup(link, 'telegram');
  };
  /**
   * @param  {String} url
   * @param  {String} socialType
   */


  sharer.popup = function (url, socialType) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    /**
    * Write analytics goal
    */

    if (window.yaCounter32652805) {
      window.yaCounter32652805.reachGoal('article-share', function () {}, this, {
        type: socialType,
        url: url
      });
    }
  };
  /**
   * Init sharer
   * @param {Object} settings
   * @param {String} settings.buttonsSelector - button selector on which elements should bind sharing
   */


  sharer.init = function (settings) {
    console.assert(settings.buttonsSelector, 'Sharer: buttons selector is missed');
    var shareButtons = document.querySelectorAll(settings.buttonsSelector);

    for (var i = shareButtons.length - 1; i >= 0; i--) {
      shareButtons[i].addEventListener('click', sharer.click, true);
    }
  };
  /**
   * @param  {Event} event
   */


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
      url: target.dataset.url || target.parentNode.dataset.url,
      title: target.dataset.title || target.parentNode.dataset.title,
      desc: target.dataset.desc || target.parentNode.dataset.desc,
      img: target.dataset.img || target.parentNode.dataset.title
    };
    /**
    * Fire click handler
    */

    sharer[type](shareData);
  };

  return sharer;
}({});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * codex.bestDevelopers module
 * Sets best developers values in admin/user for further output in templates/developers.php
 */
var developer = function () {
  var init = function init() {
    var chBoxes = document.querySelectorAll('.developer-checkbox');

    for (var i = chBoxes.length - 1; i > -1; i--) {
      chBoxes[i].addEventListener('change', toggle);
    }
  };
  /**
   * Sends ajax data 0 or 1, whether user is best developer or not
   * @param {Event} event
   * @uses codex.core.ajax
   */


  var toggle = function toggle(event) {
    var data = {
      data: 'id=' + event.target.id + '&value=' + (event.target.checked ? 1 : 0),
      url: '/admin/developer'
    };
    codex.core.ajax(data);
  };

  return {
    init: init
  };
}();

module.exports = developer;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * codex.showMoreNews module
 * Used in news block
 * Reveals more news when appender button is fired
 * Usage onclick="codex.showMoreNews.init( this );"
 */
var showMoreNews = function () {
  /**
   * Helper for 'show more news' button
   * @param {Element} button   - appender button
   */
  var init = function init(button) {
    var PORTION = 5; // Amount of news shown each time appender button is fired

    var news = document.querySelectorAll('.news__list_item'),
        hided = [];

    for (var i = 0, newsItem; !!(newsItem = news[i]); i++) {
      if (newsItem.classList.contains('news__list_item--hidden')) {
        hided.push(newsItem);
      }
    }
    /**
     * @param {Element} item
     * Remove PORTION of first elements from array hided
     */


    hided.splice(0, PORTION).map(function (item) {
      item.classList.remove('news__list_item--hidden');
    });

    if (!hided.length) {
      button.classList.add('news__list_item--hidden');
    }
  };

  return {
    init: init
  };
}({});

module.exports = showMoreNews;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var polyfills = function () {
  /**
   * Polyfilling ECMAScript 6 method String.includes
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Browser_compatibility
   */
  if (!String.prototype.includes) {
    String.prototype.includes = function () {
      'use strict';

      return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
  }
  /**
   * Polyfill for Element.prototype.matches method
   */


  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
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
  }

  ;
}({});

module.exports = polyfills;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ajax = function () {
  var xhr_ = function xhr_(xhr) {
    var objectToQueryString = function objectToQueryString(a) {
      var prefix, s, add, name, r20, output;
      s = [];
      r20 = /%20/g;

      add = function add(key, value) {
        // If value is a function, invoke it and return its value
        if (typeof value == 'function') {
          value = value();
        } else {
          value = value === null ? '' : value;
        }

        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };

      if (a instanceof Array) {
        for (name in a) {
          add(name, a[name]);
        }
      } else {
        for (prefix in a) {
          buildParams(prefix, a[prefix], add);
        }
      }

      output = s.join('&').replace(r20, '+');
      return output;
    };

    var buildParams = function buildParams(prefix, obj, add) {
      var name, i, l, rbracket;
      rbracket = /\[\]$/;

      if (obj instanceof Array) {
        for (i = 0, l = obj.length; i < l; i++) {
          if (rbracket.test(prefix)) {
            add(prefix, obj[i]);
          } else {
            buildParams(prefix + '[' + (_typeof(obj[i]) === 'object' ? i : '') + ']', obj[i], add);
          }
        }
      } else if (_typeof(obj) == 'object') {
        // Serialize object item.
        for (name in obj) {
          buildParams(prefix + '[' + name + ']', obj[name], add);
        }
      } else {
        // Serialize scalar item.
        add(prefix, obj);
      }
    };

    xhr.call = function (data) {
      if (!data || !data.url) {
        console.warn('url wasn\'t passed into ajax method');
        return;
      }

      var XMLHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
          successCallback;
      data.type = data.type || 'GET';
      data.url = data.url;
      data.async = data.async || false;
      data.data = data.data || '';
      data.formData = data.formData || false;
      data['content-type'] = data.contentType || 'text/html';
      successCallback = data.success || successCallback;

      if (data.type == 'GET' && data.data) {
        data.url = /\?/.test(data.url) ? data.url + '&' + data.data : data.url + '?' + data.data;
      }

      if (data.beforeSend && typeof data.beforeSend == 'function') {
        data.beforeSend.call();
      }

      XMLHTTP.open(data.type, data.url, data.async);
      XMLHTTP.setRequestHeader('Content-type', data['content-type']);
      XMLHTTP.setRequestHeader('Connection', 'close');
      XMLHTTP.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      XMLHTTP.onreadystatechange = function () {
        if (XMLHTTP.readyState == 4 && XMLHTTP.status == 200 && successCallback) {
          successCallback.call(XMLHTTP.responseText);
        }
      };

      XMLHTTP.send(data.formData || objectToQueryString(data.data));
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

      var i,
          j,
          len,
          jLen,
          formElement,
          q = [];

      function urlencode(str) {
        // http://kevin.vanzonneveld.net
        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
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

          case 'button':
            // jQuery does not submit these, though it is an HTML4 successful control
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
  };

  return {
    xhr: xhr_
  };
}({});

module.exports = ajax;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Profile page methods
 */
module.exports = function () {
  /**
   * Photo uploading success-callback
   * Fired by transport
   * @param  {string} newPhotoURL - uploaded file URL
   */
  var uploadPhotoSuccess = function uploadPhotoSuccess(newPhotoURL) {
    var settingsPhoto = document.getElementById('profile-photo-updatable'),
        headerPhoto = document.getElementById('header-avatar-updatable');
    settingsPhoto.src = newPhotoURL;
    headerPhoto.src = newPhotoURL;
  };

  return {
    uploadPhotoSuccess: uploadPhotoSuccess
  };
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helpers) {
  helpers.setCookie = function (name, value, expires, path, domain) {
    var str = name + '=' + value;
    if (expires) str += '; expires=' + expires.toGMTString();
    if (path) str += '; path=' + path;
    if (domain) str += '; domain=' + domain;
    document.cookie = str;
  };

  helpers.getCookie = function (name) {
    var dc = document.cookie;
    var prefix = name + '=';
    var begin = dc.indexOf('; ' + prefix);

    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
    } else begin += 2;

    var end = document.cookie.indexOf(';', begin);
    if (end == -1) end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
  };

  helpers.getOffset = function (el) {
    var _x = 0;
    var _y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft + el.clientLeft;
      _y += el.offsetTop + el.clientTop;
      el = el.offsetParent;
    }

    return {
      top: _y,
      left: _x
    };
  };

  return helpers;
}({});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Модуль quiz с единственным публичным методом quiz.init()
 */
module.exports = function () {
  var quizData = null,
      numberOfQuestions = null,
      currentQuestion = null,
      score = null,
      maxScore = null;
  /**
   * Публичный метод init.
   *
   * @param {Object} settings - настройки теста
   * @param {Object} settings.quizDataInput - объект с информацией о тесте
   * @param {string} settings.holder - id элемента, в который будет выводиться тест
   */

  var init = function init(settings) {
    quizData = settings.quizDataInput;
    numberOfQuestions = quizData.questions.length;
    currentQuestion = 0;
    score = 0;
    gameProcessing_.prepare();
    UI_.prepare(settings.holder);
    UI_.setupQuestionInterface();
  };

  var UI_ = {
    holder: null,
    currentQuestionObj: null,
    // Объект, в котором будут храниться DOM-элементы, связанные с отображением вопроса
    questionElems: null,
    prepare: function prepare(holder) {
      UI_.holder = document.getElementById(holder);
      UI_.holder.classList.add('quiz');
      UI_.holder.classList.add('clearfix');
    },

    /**
     * Создаем элементы для вывода теста, заносим их в UI_.questionElems и выводим на страницу.
     */
    setupQuestionInterface: function setupQuestionInterface() {
      UI_.clear();
      var title, optionsHolder, counter, nextButton;
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
    showQuestion: function showQuestion() {
      UI_.clear(UI_.questionElems.optionsHolder);
      UI_.questionElems.options = [];
      UI_.questionElems.nextButton.removeEventListener('click', UI_.showQuestion);
      UI_.currentQuestionObj = quizData.questions[currentQuestion];
      UI_.questionElems.nextButton.setAttribute('disabled', true);
      UI_.questionElems.title.textContent = UI_.currentQuestionObj.title;
      UI_.questionElems.counter.textContent = currentQuestion + 1 + '/' + numberOfQuestions;
      UI_.currentQuestionObj.answers.map(UI_.createOption);
    },
    answerSelected: function answerSelected(answer) {
      answer.classList.add('quiz__question-answer_selected');
      UI_.questionElems.options.map(function (current) {
        current.removeEventListener('click', gameProcessing_.getUserAnswer);
      });
      UI_.questionElems.nextButton.disabled = false;

      if (currentQuestion < numberOfQuestions - 1) {
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
     * @param {Element} answer - DOM-элемент выбранного ответа
     */
    showAnswer: function showAnswer(answer) {
      var answerStyle = answer.dataset.score > 0 ? '_right' : '_wrong',
          answerIndex = answer.dataset.index;
      answer.classList.add('quiz__question-answer' + answerStyle);
      var answerMessage = UI_.createElem('div', 'quiz__answer-message');
      answerMessage.textContent = UI_.currentQuestionObj.answers[answerIndex].message;
      UI_.insertAfter(answerMessage, answer);

      if (answer.dataset.score == 0) {
        UI_.showCorrectAnswers();
      }
    },
    showCorrectAnswers: function showCorrectAnswers() {
      UI_.questionElems.options.map(function (answer) {
        if (answer.dataset.score > 0) {
          answer.classList.add('quiz__question-answer_right');
        } else {
          answer.classList.add('quiz__question-answer_wrong');
        }
      });
    },
    showResult: function showResult() {
      var result = score + '/' + maxScore;
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
      codex.sharer.init({
        'buttonsSelector': '.but.vk, .but.fb, .but.tw, .but.tg'
      });
    },

    /**
     * Создаем кнопки социальных сетей и добавляем их в holder
     *
     * @param {Element} holder
     */
    createSocial: function createSocial(holder, result) {
      var networks = [{
        title: 'Share on the VK',
        shareType: 'vkontakte',
        class: 'vk',
        icon: 'icon-vkontakte'
      }, {
        title: 'Share on the Facebook',
        shareType: 'facebook',
        class: 'fb',
        icon: 'icon-facebook-squared'
      }, {
        title: 'Tweet',
        shareType: 'twitter',
        class: 'tw',
        icon: 'icon-twitter'
      }, {
        title: 'Forward in Telegramm',
        shareType: 'telegram',
        class: 'tg',
        icon: 'icon-paper-plane'
      }];
      networks.map(function (current) {
        var button = UI_.createElem('span', ['but', current.class]),
            icon = UI_.createElem('i', current.icon),
            shareMessage = null;
        button.dataset.shareType = current.shareType;
        button.setAttribute('title', current.title);

        if (quizData.shareMessage) {
          shareMessage = quizData.shareMessage.replace('$score', result);
        }

        shareMessage = shareMessage || 'Я набрал ' + result + ' в ' + (quizData.title || 'тесте от команды CodeX');
        button.dataset.url = window.location.href;
        button.dataset.title = shareMessage;
        button.dataset.desc = quizData.description || '';
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
    createOption: function createOption(answer, i) {
      var answerObj = UI_.createElem('div', 'quiz__question-answer');
      answerObj.dataset.score = answer.score;
      answerObj.dataset.index = i;
      answerObj.textContent = answer.text; // Вешаем слушатель на вариант ответа

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
    createElem: function createElem(tag, classes) {
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
    append: function append(elems, parent) {
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
    insertAfter: function insertAfter(elem, elemBefore) {
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
    clear: function clear(parent) {
      parent = parent || UI_.holder;

      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
  };
  var gameProcessing_ = {
    prepare: function prepare() {
      maxScore = 0;
      quizData.questions.map(function (question) {
        question.answers.map(function (answer) {
          maxScore += parseFloat(answer.score);
        });
      });
    },

    /**
     * Добавляет баллы за ответ
     *
     * @param {Object} e - объект события клика по варианту ответа
     */
    getUserAnswer: function getUserAnswer(e) {
      var answer = e.currentTarget;
      score += parseFloat(answer.dataset.score);
      UI_.answerSelected(answer);
    },

    /**
     * Получает сообщение о результате для набранного количества баллов
     *
     * @returns {string} message
     */
    getMessage: function getMessage() {
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
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* Quiz form client handler
* Author: @ndawn
* Date: 09/12/16
*/
module.exports = function (quiz) {
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

  var newDOMElement_ = function newDOMElement_(tag, attributes, text) {
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


  var appendAnswerBlock_ = function appendAnswerBlock_(questionIndex, answerData) {
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


  var appendQuestionBlock_ = function appendQuestionBlock_(questionData) {
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
    question.addAnswerButton.insertBefore(question.addAnswerButtonPlus, question.addAnswerButton.firstChild);
    question.addAnswerButtonColumn.appendChild(question.addAnswerButton);
    question.addAnswerButtonRow.appendChild(question.addAnswerButtonColumn);
    question.answersHolder.appendChild(question.addAnswerButtonRow);
    question.holder.appendChild(question.answersHolder);
    quiz.nodes.questions.push(question);

    if (questionData.answers) {
      questionData.answers.map(function (current) {
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


  var appendResultMessageBlock_ = function appendResultMessageBlock_(messageData) {
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


  var setObjectNumber_ = function setObjectNumber_(obj, numberTo) {
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


  var updateDestroyIcons_ = function updateDestroyIcons_(container) {
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


  var insertDOMElement_ = function insertDOMElement_(obj) {
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


  var destroyObject_ = function destroyObject_(container, elementIndex) {
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


  var setEventListeners_ = function setEventListeners_() {
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
      }

      ;
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
        container = quiz.nodes.questions[parseInt(event.target.parentNode.parentNode.dataset.questionIndex)].answers;
        elementIndex = parseInt(event.target.parentNode.parentNode.dataset.objectIndex);
      } else if (event.target.parentNode.classList.contains('quiz-form__question-answer-destroy-button')) {
        container = quiz.nodes.questions[parseInt(event.target.parentNode.parentNode.parentNode.dataset.questionIndex)].answers;
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


  var addInitialResultMessage_ = function addInitialResultMessage_() {
    appendResultMessageBlock_();
  };
  /**
  * @private
  * First question adding function
  * Inserts question with number 1 to the form
  */


  var addInitialQuestion_ = function addInitialQuestion_() {
    appendQuestionBlock_();
  };
  /**
  * @private
  * Initial form parameters setting adding function
  * Sets form variable and insert buttons
  */


  var setInitialFormParams_ = function setInitialFormParams_() {
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


  var updateInitialDestroyIcons_ = function updateInitialDestroyIcons_() {
    updateDestroyIcons_(quiz.nodes.questions);
    updateDestroyIcons_(quiz.nodes.resultMessages);
    updateDestroyIcons_(quiz.nodes.questions[0].answers);
  };

  var render = function render(quizData) {
    var questions = quizData.questions,
        resultMessages = quizData.resultMessages;
    document.querySelector('[name="title"]').value = quizData.title;
    document.querySelector('textarea[name="description"]').textContent = quizData.description;
    document.querySelector('[name="shareMessage"]').value = quizData.shareMessage;
    setInitialFormParams_();
    resultMessages.map(function (current) {
      appendResultMessageBlock_(current);
    });
    questions.map(function (current) {
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


  quiz.init = function (settings) {
    if (settings.quizData) {
      render(settings.quizData);
      return;
    }

    setInitialFormParams_();
    addInitialQuestion_();
    addInitialResultMessage_();
    setEventListeners_();
    updateInitialDestroyIcons_();
  };

  return quiz;
}({});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
* Ajax file transport module
* @author Savchenko Peter (vk.com/specc)
* @param {Object} transport
*/

module.exports = function (transport) {
  transport.currentButtonClicked = {};
  /**
   * @param {String} settings.buttonsClass - class of transport button handler
   */

  transport.init = function (settings) {
    var buttons = document.querySelectorAll(settings.buttonsClass);

    if (!buttons.length) {
      console.warn('Can\'t find element with class: «' + settings.buttonsClass + '»');
      return;
    }

    transport.form = document.getElementById('transportForm');
    transport.input = document.getElementById('transportInput');

    for (var i = buttons.length - 1; i >= 0; i--) {
      buttons[i].addEventListener('click', transport.buttonCallback, false);
    }

    transport.input.addEventListener('change', transport.submitCallback, false);
  };
  /**
   * @param {Event} event
   */


  transport.buttonCallback = function () {
    var action = this.dataset.action,
        targetId = this.dataset.id,
        isMultiple = !!this.dataset.multiple || false;
    transport.fillForm({
      action: action,
      id: targetId
    });

    if (isMultiple) {
      transport.form.multiple = 'multiple';
    }

    transport.currentButtonClicked = this;
    transport.input.click();
  };
  /**
  * Append hidden inputs to tranport form
  * @param {Object} data
  */


  transport.fillForm = function (data) {
    var input, alreadyAddedInput;

    for (var field in data) {
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
    var FILE_MAX_SIZE = 30 * 1024 * 1024; // 30 MB

    var files = transport.getFileObject(this);

    for (var i = files.length - 1; i >= 0; i--) {
      /** Validate file extension */
      if (!transport.validateExtension(files[i]) || !transport.validateMIME(files[i])) {
        window.console && console.warn('Wrong file type: %o', +files[i].name);
        return;
      }
      /** Validate file size */


      if (!transport.validateSize(files[i], FILE_MAX_SIZE)) {
        window.console && console.warn('File size exceeded limit: %o MB', files[i].size / (1024 * 1024).toFixed(2));
        return;
      }
    }

    transport.currentButtonClicked.className += ' loading';
    transport.form.submit();
  };
  /**
  * Fires from transport-frame window
  * @param {Object} response
  */


  transport.response = function (response) {
    transport.currentButtonClicked.className = transport.currentButtonClicked.className.replace('loading', '');

    if (response.callback) {
      eval(response.callback);
    }

    if (response.result) {
      if (response.result == 'error') {
        window.console && console.warn(response.error_description || 'error');
      }
    }
  };
  /**
   * @param  {[Element]} fileInput
   * @return {[type]}           [description]
   */


  transport.getFileObject = function (fileInput) {
    if (!fileInput) return false;
    /**
    * Workaround with IE that doesn't support File API
    * @todo test and delete this crutch
    */

    return typeof ActiveXObject == 'function' ? new ActiveXObject('Scripting.FileSystemObject').getFile(fileInput.value) : fileInput.files;
  };
  /**
   * @param {Object} accept
   * @param {Object} fileObj
   * @return {Boolean}
   */


  transport.validateMIME = function (fileObj, accept) {
    accept = typeof accept == 'array' ? accept : ['image/jpeg', 'image/png'];

    for (var i = accept.length - 1; i >= 0; i--) {
      if (fileObj.type == accept[i]) return true;
    }

    return false;
  };

  transport.validateExtension = function (fileObj, accept) {
    var ext = fileObj.name.match(/\.(\w+)($|#|\?)/);
    if (!ext) return false;
    ext = ext[1].toLowerCase();
    accept = typeof accept == 'array' ? accept : ['jpg', 'jpeg', 'png'];

    for (var i = accept.length - 1; i >= 0; i--) {
      if (ext == accept[i]) return true;
    }

    return false;
  };

  transport.validateSize = function (fileObj, maxSize) {
    return fileObj.size < maxSize;
  };

  return transport;
}({});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module for VK community widget: https://vk.com/dev/Community
 * Adds vkWidget to page
 */
var vkWidget = function () {
  var targetId,
      targetView,
      communityId,
      VK_API_URI = 'https://vk.com/js/api/openapi.js';
  /**
   * Initialization of module
   *
   * @param  {[Object]} params
   * @param {int} params.id - element id, where widget is appended
   * @param {int} params.display.mode - widget appearance ("3" - show people in the community)
   * @param {int|string} params.display.width - set widget width to a fixed number or auto
   * @param {int} params.communityId - id of VK community
   *
   * @example
   * vkWidget.init({
   *   id: 'vk_groups',
   *   display: {
   *       'mode': 3,
   *       'width': 'auto'
   *   },
   *   communityId: 103229636
   * });
   */

  var init = function init(params) {
    targetId = params.id || null, targetView = params.display || {
      'mode': 3,
      'width': 'auto'
    }, communityId = params.communityId || 0;

    if (document.getElementById(targetId) == undefined) {
      console.log('Cannot find element with id ' + targetId);
      return;
    }

    ;
    loadScript();
  };
  /**
   * Loads VK Api script to initialize a widget
   * and appends it to page
   */


  var loadScript = function loadScript() {
    var vkApiScript = document.createElement('SCRIPT');
    vkApiScript.src = VK_API_URI;
    vkApiScript.setAttribute('async', 'true');
    vkApiScript.onload = showWidget;
    document.body.appendChild(vkApiScript);
  };
  /**
   * Runs widget initiating from vkApi
   */


  var showWidget = function showWidget() {
    window.VK.Widgets.Group(targetId, targetView, communityId);
  };

  return {
    init: init
  };
}({});

module.exports = vkWidget;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Code Styling module
 */
module.exports = function codeStyling() {
  'use strict';
  /**
   * DOM manipulations helper
   */

  var $ = __webpack_require__(0).default;
  /**
   * Extrnal library for code styling
   * @link https://highlightjs.org
   * @type {Object}
   */


  var library = {
    js: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
    css: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github-gist.min.css'
  };
  /**
   * Loads styling library
   */

  var prepare = function prepare() {
    return Promise.all([$.loadResource('JS', library.js, 'highlight'), $.loadResource('CSS', library.css, 'highlight')]).catch(function (err) {
      return console.warn('Cannot load code styling module: ', err);
    }).then(function () {
      return console.log('Code Styling is ready');
    });
  };
  /**
   * Finds code blocks and fires highlighting
   * @param {String} codeBlocksSelector - where to find <code> blocks
   */


  var init = function init(codeBlocksSelector) {
    var codeBlocks = document.querySelectorAll(codeBlocksSelector);

    if (codeBlocks) {
      prepare().then(function () {
        if (!window.hljs) {
          console.warn('Code Styling script loaded but not ready');
          return;
        }

        for (var i = codeBlocks.length - 1; i >= 0; i--) {
          window.hljs.highlightBlock(codeBlocks[i]);
        }
      });
    }
  };

  return {
    init: init
  };
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():undefined}(window,function(){return function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var o,r,i,u,c,f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};
/**
=======
var codex=function(e){function t(t){for(var n,r,s=t[0],a=t[1],i=0,l=[];i<s.length;i++)r=s[i],o[r]&&l.push(o[r][0]),o[r]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(u&&u(t);l.length;)l.shift()()}var n={},o={1:0};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var s=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=s);var a,i=document.createElement("script");i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.src=function(e){return r.p+""+({0:"editor"}[e]||e)+".bundle.js"}(e),a=function(t){i.onerror=i.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+s+")");a.type=r,a.request=s,n[1](a)}o[e]=void 0}};var u=setTimeout(function(){a({type:"timeout",target:i})},12e4);i.onerror=i.onload=a,document.head.appendChild(i)}return Promise.all(t)},r.m=e,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/public/build/",r.oe=function(e){throw console.error(e),e};var s=window.webpackJsonpcodex=window.webpackJsonpcodex||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=a;return r(r.s=2)}([function(e,t,n){"use strict";function o(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,s;return t=e,s=[{key:"make",value:function(e,t,n){var r,s=document.createElement(e);Array.isArray(t)?(r=s.classList).add.apply(r,o(t)):t&&s.classList.add(t);for(var a in n)s[a]=n[a];return s}},{key:"replace",value:function(e,t){return e.parentNode.replaceChild(t,e)}},{key:"get",value:function(e){return document.getElementById(e)}},{key:"loadResource",value:function(e,t,n){return new Promise(function(o,r){var s;e&&["JS","CSS"].includes(e)||r("Unexpected resource type passed. «CSS» or «JS» expected, «".concat(e,"» passed")),n?document.getElementById("".concat("cdx-resourse","-").concat(e.toLowerCase(),"-").concat(n))&&o(t):r("Instance name is missed"),"JS"===e?((s=document.createElement("script")).async=!0,s.defer=!0,s.charset="utf-8"):(s=document.createElement("link")).rel="stylesheet",s.id="".concat("cdx-resourse","-").concat(e.toLowerCase(),"-").concat(n);var a="Resource loading ".concat(e," ").concat(n);console.time(a),s.onload=function(){console.timeEnd(a),o(t)},s.onerror=function(){console.timeEnd(a),r(t)},"JS"===e?s.src=t:s.href=t,document.head.appendChild(s)})}}],(n=null)&&r(t.prototype,n),s&&r(t,s),e}();t.default=s},,function(e,t,n){"use strict";var o=a(n(3)),r=a(n(4)),s=a(n(6));function a(e){return e&&e.__esModule?e:{default:e}}n(9);var i,u=103229636,l=((i={}).settings={},i.init=function(e){for(var t in e)this.settings[t]=e[t]||this.settings[t]||null;l.docReady(function(){!function(){new o.default({Library:l}),l.scrollUp.init(),l.deeplinker.init(".deeplinker"),l.codeStyling.init(".article-code__content"),l.vkWidget.init({id:"vk_groups",display:{mode:3,width:"auto"},communityId:u});var e=document.querySelector('[name="js-show-player"]');if(e){var t=n(10).default;new t({sourceURL:"public/app/img/products/ar-tester.mp4",toggler:e,wrapperSelector:".product-card--ar-tester"})}}()})},i);l.docReady=function(e){return/in/.test(document.readyState)?window.setTimeout(l.docReady,9,e):e()},l.admin=n(11),l.join=n(12),l.core=n(13),l.dragndrop=n(14),l.scrollUp=n(15),l.sharer=n(16),l.developer=n(17),l.showMoreNews=n(18),l.polyfills=n(19),l.ajax=n(20),l.profile=n(21),l.helpers=n(22),l.quiz=n(23),l.quizForm=n(24),l.transport=n(25),l.vkWidget=n(26),l.codeStyling=n(27),l.deeplinker=n(28),l.pluginsFilter=n(29),l.editorLanding=new r.default,l.articleCreate=new s.default,e.exports=l},function(e,t,n){
/*!
 * CodeX Module Dispatcher — Initialize frontend Modules from the DOM without inline scripts
 * 
 * @copyright CodeX Team <team@ifmo.su>
 * @license MIT https://github.com/codex-team/dispatcher/LICENSE
 * @author @polinashneider https://github.com/polinashneider
 * @version 0.0.1
 */
"undefined"!=typeof self&&self,e.exports=function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=function(){function e(t){var n=t.name,o=t.element,s=t.settings,a=t.moduleClass;r(this,e),this.name=n,this.element=o,this.settings=s,this.moduleClass=a}return s(e,[{key:"init",value:function(){try{console.assert(this.moduleClass.init instanceof Function,"Module «"+this.name+"» should implement init method"),this.moduleClass.init instanceof Function&&(this.moduleClass.init(this.settings,this.element),console.log("Module «"+this.name+"» initialized"))}catch(e){console.warn("Module «"+this.name+"» was not initialized because of ",e)}}},{key:"destroy",value:function(){this.moduleClass.destroy instanceof Function&&(this.moduleClass.destroy(),console.log("Module «"+this.name+"» destroyed."))}}]),e}(),i=function(){function e(t){r(this,e),this.Library=t.Library||window,this.modules=this.findModules(document),this.initModules()}return s(e,[{key:"findModules",value:function(e){for(var t=[],n=e.querySelectorAll("[data-module]"),r=n.length-1;r>=0;r--)t.push.apply(t,o(this.extractModulesData(n[r])));return t}},{key:"extractModulesData",value:function(e){var t=this,n=[],o=e.dataset.module;return(o=o.replace(/\s+/," ")).split(" ").forEach(function(o,r){var s=new a({name:o,element:e,settings:t.getModuleSettings(e,r,o),moduleClass:t.Library[o]});n.push(s)}),n}},{key:"getModuleSettings",value:function(e,t,n){var o=e.querySelector("module-settings"),r=void 0;if(!o)return null;try{r=o.textContent.trim(),r=JSON.parse(r)}catch(e){return console.warn("Can not parse Module «"+n+"» settings bacause of: "+e),console.groupCollapsed(n+" settings"),console.log(r),console.groupEnd(),null}return Array.isArray(r)?r[t]?r[t]:null:0===t?r:(console.warn("Wrong settings format. For several Modules use an array instead of object."),null)}},{key:"initModules",value:function(){console.groupCollapsed("ModuleDispatcher"),this.modules.forEach(function(e){e.init()}),console.groupEnd()}}]),e}();t.default=i}])},function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.editor=null,this.nodes={outputWrapper:null}}var t,s,a;return t=e,(s=[{key:"init",value:function(e){var t=this;this.nodes.outputWrapper=document.getElementById(e.output_id),this.nodes.outputWrapper||console.warn("Can't find output target with ID: «"+e.output_id+"»"),this.loadEditor({blocks:e.blocks,onChange:function(){t.previewData()},onReady:function(){t.previewData(),t.editor.focus()}}).then(function(e){t.editor=e})}},{key:"loadEditor",value:function(e){return n.e(0).then(n.t.bind(null,1,7)).then(function(t){return new(0,t.default)(e)})}},{key:"previewData",value:function(){var e=this;this.editor.save().then(function(t){r.show(t,e.nodes.outputWrapper)})}}])&&o(t.prototype,s),a&&o(t,a),e}();t.default=s},function(e,t,n){"use strict";var o=function(){return{show:function(e,t){e=function(e){return e=(e=(e=(e=(e=(e=e.replace(/"(\w+)"\s?:/g,'"<span class=sc_key>$1</span>" :')).replace(/"(paragraph|quote|list|header|link|code|image|delimiter|raw|table)"/g,'"<span class=sc_toolname>$1</span>"')).replace(/(&lt;[\/a-z]+(&gt;)?)/gi,"<span class=sc_tag>$1</span>")).replace(/"([^"]+)"/gi,'"<span class=sc_attr>$1</span>"')).replace(/\b(true|false|null)\b/gi,"<span class=sc_bool>$1</span>")).replace(/\b(\d+)\b/gi,"<span class=sc_digit>$1</span>")}(e=(e=JSON.stringify(e,null,4)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),t.innerHTML=e}}}();e.exports=o},function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(7),s=n(8),a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,a,i;return t=e,(a=[{key:"init",value:function(e,t){var n=this;this.form=t,this.article=document.getElementById(e.article_textarea),this.button=document.getElementById(e.submit_id),this.formURL=e.form_url;var o={blocks:this.getArticleData()};this.loadEditor(o).then(function(e){n.editor=e}),this.prepareSubmit()}},{key:"prepareSubmit",value:function(){var e=this;this.button.addEventListener("click",function(){e.saveArticle()},!1)}},{key:"saveArticle",value:function(){var e=this,t=this.article;this.editor.save().then(function(n){t.value=JSON.stringify(n),Promise.resolve().then(function(){e.button.classList.add("loading")}).then(function(){return r.post({url:e.formURL,data:e.form})}).then(function(t){t.success?window.location.href=t.redirect:e.showErrorMessage(t.message)}).catch(function(t){e.showErrorMessage(t)})})}},{key:"showErrorMessage",value:function(e){console.error(e),s.show({message:e,style:"error"}),this.button.classList.remove("loading")}},{key:"getArticleData",value:function(){if(this.article.textContent.length){var e;try{e=JSON.parse(this.article.textContent)}catch(e){console.error("Errors occurred while parsing Editor data",e)}return e?e.blocks:[]}}},{key:"loadEditor",value:function(e){return n.e(0).then(n.t.bind(null,1,7)).then(function(t){return new(0,t.default)(e)})}}])&&o(t.prototype,a),i&&o(t,i),e}();t.default=a},function(e,t,n){window,e.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){var o=n(2),r=setTimeout;function s(){}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function i(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,a._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(e){return void l(t.promise,e)}u(t.promise,o)}else(1===e._state?u:l)(t.promise,e._value)})):e._deferreds.push(t)}function u(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void d(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,c(e)}catch(t){l(e,t)}}function l(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)i(e,e._deferreds[t]);e._deferreds=null}function d(e,t){var n=!1;try{e(function(e){n||(n=!0,u(t,e))},function(e){n||(n=!0,l(t,e))})}catch(e){if(n)return;n=!0,l(t,e)}}a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(s);return i(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},a.prototype.finally=o.a,a.all=function(e){return new a(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var r=o.length;function s(e,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var i=a.then;if("function"==typeof i)return void i.call(a,function(t){s(e,t)},n)}o[e]=a,0==--r&&t(o)}catch(e){n(e)}}for(var a=0;a<o.length;a++)s(a,o[a])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,n){n(e)})},a.race=function(e){return new a(function(t,n){for(var o=0,r=e.length;o<r;o++)e[o].then(t,n)})},a._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){r(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.a=a}).call(this,n(5).setImmediate)},function(e,t,n){"use strict";t.a=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n(4);var r=n(8),s=function(){var e={URLENCODED:"application/x-www-form-urlencoded; charset=utf-8",FORM:"multipart/form-data",JSON:"application/json; charset=utf-8"},t=function(e){return new Promise(function(t,n){e=a(e),e=i(e);var o=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP");o.open(e.method,e.url),o.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(e.headers).forEach(function(t){var n=e.headers[t];o.setRequestHeader(t,n)});var r=e.ratio;o.upload.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),o=Math.ceil(n*r/100);e.progress(o)},!1),o.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),o=Math.ceil(n*(100-r)/100)+r;e.progress(o)},!1),o.onreadystatechange=function(){if(4===o.readyState){var e=o.response;try{e=JSON.parse(e)}catch(e){}200===o.status?t(e):n(e)}},o.send(e.data)})},n=function(e){return e.method="POST",t(e)},a=function(t){if(!t.url||"string"!=typeof t.url)throw new Error("Url must be a non-empty string");if(t.method&&"string"!=typeof t.method)throw new Error("`method` must be a string or null");if(t.method=t.method?t.method.toUpperCase():"GET",t.headers&&"object"!==o(t.headers))throw new Error("`headers` must be an object or null");if(t.headers=t.headers||{},t.type&&("string"!=typeof t.type||!Object.values(e).includes(t.type)))throw new Error("`type` must be taken from module's «contentType» library");if(t.progress&&"function"!=typeof t.progress)throw new Error("`progress` must be a function or null");if(t.progress=t.progress||function(e){},t.beforeSend=t.beforeSend||function(e){},t.ratio&&"number"!=typeof t.ratio)throw new Error("`ratio` must be a number");if(t.ratio<0||t.ratio>100)throw new Error("`ratio` must be in a 0-100 interval");if(t.ratio=t.ratio||90,t.accept&&"string"!=typeof t.accept)throw new Error("`accept` must be a string with a list of allowed mime-types");if(t.accept=t.accept||"*/*",t.multiple&&"boolean"!=typeof t.multiple)throw new Error("`multiple` must be a true or false");if(t.multiple=t.multiple||!1,t.fieldName&&"string"!=typeof t.fieldName)throw new Error("`fieldName` must be a string");return t.fieldName=t.fieldName||"files",t},i=function(t){switch(t.method){case"GET":var n=u(t.data,e.URLENCODED);delete t.data,t.url=/\?/.test(t.url)?t.url+"&"+n:t.url+"?"+n;break;case"POST":case"PUT":case"DELETE":case"UPDATE":var o=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).type||e.JSON}(t);(r.isFormData(t.data)||r.isFormElement(t.data))&&(o=e.FORM),t.data=u(t.data,o),o!==s.contentType.FORM&&(t.headers["content-type"]=o)}return t},u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch(arguments.length>1?arguments[1]:void 0){case e.URLENCODED:return r.urlEncode(t);case e.JSON:return r.jsonEncode(t);case e.FORM:return r.formEncode(t);default:return t}};return{contentType:e,request:t,get:function(e){return e.method="GET",t(e)},post:n,transport:function(e){return e=a(e),r.transport(e).then(function(t){return r.isObject(e.data)&&Object.keys(e.data).forEach(function(n){var o=e.data[n];t.append(n,o)}),e.data=t,n(e)})}}}();e.exports=s},function(e,t,n){"use strict";n.r(t);var o=n(1);window.Promise=window.Promise||o.a},function(e,t,n){(function(e){var o=void 0!==e&&e||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function s(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new s(r.call(setTimeout,o,arguments),clearTimeout)},t.setInterval=function(){return new s(r.call(setInterval,o,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},s.prototype.unref=s.prototype.ref=function(){},s.prototype.close=function(){this._clearFn.call(o,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(6),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var o,r=1,s={},a=!1,i=e.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(e);u=u&&u.setTimeout?u:e,"[object process]"==={}.toString.call(e.process)?o=function(e){t.nextTick(function(){c(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&c(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),o=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){c(e.data)},o=function(t){e.port2.postMessage(t)}}():i&&"onreadystatechange"in i.createElement("script")?function(){var e=i.documentElement;o=function(t){var n=i.createElement("script");n.onreadystatechange=function(){c(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():o=function(e){setTimeout(c,0,e)},u.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var a={callback:e,args:t};return s[r]=a,o(r),r++},u.clearImmediate=l}function l(e){delete s[e]}function c(e){if(a)setTimeout(c,0,e);else{var t=s[e];if(t){a=!0;try{!function(e){var t=e.callback,o=e.args;switch(o.length){case 0:t();break;case 1:t(o[0]);break;case 2:t(o[0],o[1]);break;case 3:t(o[0],o[1],o[2]);break;default:t.apply(n,o)}}(t)}finally{l(e),a=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(7))},function(e,t){var n,o,r=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function i(e){if(n===setTimeout)return setTimeout(e,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(e){n=s}try{o="function"==typeof clearTimeout?clearTimeout:a}catch(e){o=a}}();var u,l=[],c=!1,d=-1;function f(){c&&u&&(c=!1,u.length?l=u.concat(l):d=-1,l.length&&p())}function p(){if(!c){var e=i(f);c=!0;for(var t=l.length;t;){for(u=l,l=[];++d<t;)u&&u[d].run();d=-1,t=l.length}u=null,c=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===a||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new m(e,t)),1!==l.length||c||i(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=h,r.addListener=h,r.once=h,r.off=h,r.removeListener=h,r.removeAllListeners=h,r.emit=h,r.prependListener=h,r.prependOnceListener=h,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var r=n(9);e.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,t,n){n&&o(e,n)}(e,0,[{key:"urlEncode",value:function(e){return r(e)}},{key:"jsonEncode",value:function(e){return JSON.stringify(e)}},{key:"formEncode",value:function(e){if(this.isFormData(e))return e;if(this.isFormElement(e))return new FormData(e);if(this.isObject(e)){var t=new FormData;return Object.keys(e).forEach(function(n){var o=e[n];t.append(n,o)}),t}throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement")}},{key:"isObject",value:function(e){return"[object Object]"===Object.prototype.toString.call(e)}},{key:"isFormData",value:function(e){return e instanceof FormData}},{key:"isFormElement",value:function(e){return e instanceof HTMLFormElement}},{key:"transport",value:function(e){return new Promise(function(t,n){var o=document.createElement("INPUT");o.type="file",e.multiple&&o.setAttribute("multiple","multiple"),e.accept&&o.setAttribute("accept",e.accept),o.addEventListener("change",function(n){for(var o=n.target.files,r=new FormData,s=0;s<o.length;s++)r.append(e.fieldName,o[s],o[s].name);e.beforeSend(o),t(r)},!1),o.click()})}}]),e}()},function(e,t){var n=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,escape).replace(/%20/g,"+")},o=function(e,t,r,s){return t=t||null,r=r||"&",s=s||null,e?function(e){for(var t=new Array,n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t}(Object.keys(e).map(function(a){var i,u=a;if(s&&(u=s+"["+u+"]"),"object"==typeof e[a]&&null!==e[a])i=o(e[a],null,r,u);else{t&&(u=function(e){return!isNaN(parseFloat(e))&&isFinite(e)}(u)?t+Number(u):u);var l=e[a];l=(l=0===(l=!1===(l=!0===l?"1":l)?"0":l)?"0":l)||"",i=n(u)+"="+n(l)}return i})).join(r).replace(/[!'()*]/g,""):""};e.exports=o}])},function(e,t,n){window,e.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";n(1),
/*!
 * Codex JavaScript Notification module
 * https://github.com/codex-team/js-notifier
 */
e.exports=function(){var e=n(6),t=null;return{show:function(n){if(n.message){!function(){if(t)return!0;t=e.getWrapper(),document.body.appendChild(t)}();var o=null,r=n.time||8e3;switch(n.type){case"confirm":o=e.confirm(n);break;case"prompt":o=e.prompt(n);break;default:o=e.alert(n),window.setTimeout(function(){o.remove()},r)}t.appendChild(o),o.classList.add("cdx-notify--bounce-in")}}}}()},function(e,t,n){var o=n(2);"string"==typeof o&&(o=[[e.i,o,""]]),n(4)(o,{hmr:!0,transform:void 0,insertInto:void 0}),o.locals&&(e.exports=o.locals)},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,'.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:\'\';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:\'\';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}',""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n,o=e[1]||"",r=e[3];if(!r)return o;if(t&&"function"==typeof btoa){var s=(n=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[o].concat(a).concat([s]).join("\n")}return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var s=this[r][0];"number"==typeof s&&(o[s]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var o,r,s={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),i=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),u=null,l=0,c=[],d=n(5);function f(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=s[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(g(o.parts[a],t))}else{var i=[];for(a=0;a<o.parts.length;a++)i.push(g(o.parts[a],t));s[o.id]={id:o.id,refs:1,parts:i}}}}function p(e,t){for(var n=[],o={},r=0;r<e.length;r++){var s=e[r],a=t.base?s[0]+t.base:s[0],i={css:s[1],media:s[2],sourceMap:s[3]};o[a]?o[a].parts.push(i):n.push(o[a]={id:a,parts:[i]})}return n}function m(e,t){var n=i(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=c[c.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=i(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,r)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function v(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),y(t,e.attrs),m(e,t),t}function y(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,o,r,s;if(t.transform&&e.css){if(!(s=t.transform(e.css)))return function(){};e.css=s}if(t.singleton){var a=l++;n=u||(u=v(t)),o=_.bind(null,n,a,!1),r=_.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",y(t,e.attrs),m(e,t),t}(t),o=function(e,t,n){var o=n.css,r=n.sourceMap,s=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||s)&&(o=d(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(a),i&&URL.revokeObjectURL(i)}.bind(null,n,t),r=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),o=function(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){h(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return f(n,t),function(e){for(var o=[],r=0;r<n.length;r++){var a=n[r];(i=s[a.id]).refs--,o.push(i)}for(e&&f(p(e,t),t),r=0;r<o.length;r++){var i;if(0===(i=o[r]).refs){for(var u=0;u<i.parts.length;u++)i.parts[u]();delete s[i.id]}}}};var b,w=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function _(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=w(t,r);else{var s=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,s=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(s)?e:(r=0===s.indexOf("//")?s:0===s.indexOf("/")?n+s:o+s.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(e,t,n){"use strict";var o,r,s,a,i,u;e.exports=(o="cdx-notify",r="cdx-notify__cross",s="cdx-notify__button--confirm",a="cdx-notify__button",i="cdx-notify__btns-wrapper",{alert:u=function(e){var t=document.createElement("DIV"),n=document.createElement("DIV"),s=e.message,a=e.style;return t.classList.add(o),a&&t.classList.add(o+"--"+a),t.innerHTML=s,n.classList.add(r),n.addEventListener("click",t.remove.bind(t)),t.appendChild(n),t},confirm:function(e){var t=u(e),n=document.createElement("div"),o=document.createElement("button"),l=document.createElement("button"),c=t.querySelector("."+r),d=e.cancelHandler,f=e.okHandler;return n.classList.add(i),o.innerHTML=e.okText||"Confirm",l.innerHTML=e.cancelText||"Cancel",o.classList.add(a),l.classList.add(a),o.classList.add(s),l.classList.add("cdx-notify__button--cancel"),d&&"function"==typeof d&&(l.addEventListener("click",d),c.addEventListener("click",d)),f&&"function"==typeof f&&o.addEventListener("click",f),o.addEventListener("click",t.remove.bind(t)),l.addEventListener("click",t.remove.bind(t)),n.appendChild(o),n.appendChild(l),t.appendChild(n),t},prompt:function(e){var t=u(e),n=document.createElement("div"),o=document.createElement("button"),l=document.createElement("input"),c=t.querySelector("."+r),d=e.cancelHandler,f=e.okHandler;return n.classList.add(i),o.innerHTML=e.okText||"Ok",o.classList.add(a),o.classList.add(s),l.classList.add("cdx-notify__input"),e.placeholder&&l.setAttribute("placeholder",e.placeholder),e.default&&(l.value=e.default),e.inputType&&(l.type=e.inputType),d&&"function"==typeof d&&c.addEventListener("click",d),f&&"function"==typeof f&&o.addEventListener("click",function(){f(l.value)}),o.addEventListener("click",t.remove.bind(t)),n.appendChild(l),n.appendChild(o),t.appendChild(n),t},getWrapper:function(){var e=document.createElement("DIV");return e.classList.add("cdx-notifies"),e}})}])},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,r=n(0),s=(o=r)&&o.__esModule?o:{default:o};function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=function(){function e(t){var n=this,o=t.sourceURL,r=t.toggler,s=t.wrapperSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.sourceURL=o,this.toggler=r,this.wrapper=document.querySelector(s),this.overlay=null,this.CSS={overlay:"video-overlay",overlayShowed:"video-overlay--showed",overlayLoaded:"video-overlay--loaded",closeButton:"video-overlay__close"},this.toggler.addEventListener("click",function(){n.showVideoOverlay()},!1)}var t,n,o;return t=e,(n=[{key:"showVideoOverlay",value:function(){var e=this;this.overlay=s.default.make("div",this.CSS.overlay);var t=s.default.make("video",null,{autoplay:!0,loop:!0}),n=s.default.make("source",null,{src:this.sourceURL,type:"video/mp4"}),o=s.default.make("div",this.CSS.closeButton);t.appendChild(n),this.overlay.appendChild(t),t.addEventListener("loadeddata",function(){e.videoLoaded()}),this.overlay.appendChild(o),o.addEventListener("click",function(){e.close()}),this.wrapper.appendChild(this.overlay),window.setTimeout(function(){e.overlay.classList.add(e.CSS.overlayShowed)},50)}},{key:"videoLoaded",value:function(){this.wrapper.classList.add(this.CSS.overlayLoaded)}},{key:"close",value:function(){this.overlay.remove(),this.overlay=null}}])&&a(t.prototype,n),o&&a(t,o),e}();t.default=i},function(e,t,n){"use strict";e.exports=function(e){return e.init=function(e){if(codex.core.log("Initialized.","Module admin"),"cards"===e.listType)for(var t=document.querySelectorAll(".feed-item"),n=t.length-1;n>-1;n--)t[n].classList.add("draggable"),t[n].classList.add("feed-item--dnd"),t[n].classList.add("list-item");codex.dragndrop({droppableClass:"list-item",findDraggable:function(e){var t=e.target.closest(".draggable");return t?t.closest(".list-item"):null},makeAvatar:function(e){var t={};return t.elem=e.cloneNode(!0),t.elem.classList.add("dnd-avatar"),e.parentNode.insertBefore(t.elem,e.nextSibling),e.classList.add("no-display"),t.rollback=function(){t.elem.parentNode.removeChild(t.elem),e.classList.remove("no-display")},t},targetChanged:function(e,t,n){if(t){var o=t.compareDocumentPosition(n.elem);4&o?t.parentNode.insertBefore(n.elem,t):2&o&&t.parentNode.insertBefore(n.elem,t.nextSibling)}},move:function(){},targetReached:function(e,t,n){e.parentNode.insertBefore(n,e.nextSibling),t.elem.parentNode.removeChild(t.elem),n.classList.remove("no-display");var o=n.dataset.id,r=n.dataset.type,s=null;null==n.nextElementSibling&&(s=(void 0).dataset.type+":"+(void 0).dataset.id);var a={success:function(){document.getElementById("saved").classList.remove("top-menu__saved_hidden"),window.setTimeout(function(){document.getElementById("saved").classList.add("top-menu__saved_hidden")},1e3)},type:"POST",url:"/admin/feed",data:JSON.stringify({item_id:o,item_type:r,item_below_value:s})};codex.core.ajax(a)}})},e}({})},function(e,t,n){"use strict";var o,r,s=(o=function(e){var t=e.target,n=document.getElementById("js-join-auth"),o=document.getElementById("js-email");n&&!o.value.length&&(n.classList.add("wobble"),window.setTimeout(function(){return n.classList.remove("wobble")},450),t.value="")},r=function(){document.getElementById("blankAdditionalFields").classList.toggle("hide")},{init:function(){var e=document.getElementById("joinBlank");if(null!=e){var t=e.getElementsByTagName("textarea");if(t.length)for(var n=t.length-1;n>=0;n--)t[n].addEventListener("keyup",o,!1)}var s=document.getElementById("blankShowAdditionalFieldsButton");null!=s&&s.addEventListener("click",r,!1)}});e.exports=s},function(e,t,n){"use strict";e.exports={ajax:function(e){if(e&&e.url){var t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),n=function(){};e.async=!0,e.type=e.type||"GET",e.data=e.data||"",e["content-type"]=e["content-type"]||"application/json; charset=utf-8",n=e.success||n,"GET"==e.type&&e.data&&(e.url=/\?/.test(e.url)?e.url+"&"+e.data:e.url+"?"+e.data),e.withCredentials&&(t.withCredentials=!0),e.beforeSend&&"function"==typeof e.beforeSend&&e.beforeSend.call(),t.open(e.type,e.url,e.async),t.setRequestHeader("Content-type",e["content-type"]),t.setRequestHeader("X-Requested-With","XMLHttpRequest"),t.onreadystatechange=function(){4==t.readyState&&200==t.status&&n(t.responseText)},t.send(e.data)}},log:function(e,t,n,o){if(t){for(t=t.length<32?t:t.substr(0,30);t.length<31;)t+=" ";e=(t+=":")+e}n=n||"log";try{"console"in window&&window.console[n]&&(o?console[n](e,o):console[n](e))}catch(e){}}}},function(e,t,n){"use strict";e.exports=function(e){var t={findDraggable:function(e){return e.target.closest("."+n)},findDroppable:function(e){return document.elementFromPoint(e.clientX,e.clientY).closest("."+o)},makeAvatar:function(e){var t={};return(t={elem:e,parentNode:e.parentNode,nextSibling:e.nextElementSibling,rollback:function(){t.elem.classList.remove("dnd-default-avatar"),t.nextSibling?t.parentNode.insertBefore(t.elem,t.nextSibling):t.parentNode.appendChild(t.elem),delete c.avatar}}).elem.classList.add("dnd-default-avatar"),t},targetChanged:function(e,t){e&&e.classList("dnd-default-target-highlight"),t&&t.classList.add("dnd-default-target-highlight")},move:function(e,t,n){t.elem.style.left=e.pageX-n.x+"px",t.elem.style.top=e.pageY-n.y+"px"},targetReached:function(e,t,n){e.classList.remove("dnd-default-target-highlight"),e.parentNode.insertBefore(n,e.nextElementSibling),t.elem.classList.remove("dnd-default-avatar")}},n=e.draggableClass||"draggable",o=e.droppableClass||"droppable",r=e.findDraggable||t.findDraggable,s=e.findDroppable||t.findDroppable,a=e.makeAvatar||t.makeAvatar,i=e.targetChanged||t.targetChanged,u=e.move||t.move,l=e.targetReached||t.targetReached,c={},d=function(e){if(!(e.which>1)&&(e=h(e),c.clickedAt={x:e.pageX,y:e.pageY},c.elem=r(e),c.elem)){v();var t=m(c.elem);c.shift={x:e.pageX-t.x,y:e.pageY-t.y}}},f=function(e){if(c.elem&&(e.preventDefault(),e=h(e),!(Math.abs(e.pageX-c.clickedAt.x)<5&&Math.abs(e.pageY-c.clickedAt.y)<5))){c.avatar||(c.avatar=a(c.elem));var t=s(e);t!=c.target&&(i(c.target,t,c.avatar),c.target=t),u(e,c.avatar,c.shift)}},p=function(e){if(!(e.which>1))if(c.avatar){e=h(e);var t=s(e);t?l(t,c.avatar,c.elem,e):c.avatar.rollback(),c={},v()}else c={}},m=function(e){var t=e.getBoundingClientRect();return{x:t.left+window.pageXOffset,y:t.top+window.pageYOffset}},h=function(e){if(!e.changedTouches)return e;var t=e.changedTouches[0];return e.pageX=t.pageX,e.pageY=t.pageY,e.clientX=t.clientX,e.clientY=t.clientY,e.screenX=t.screenX,e.screenY=t.screenY,e.target=t.target,e},v=function(){document.body.classList.toggle("no-selection")};document.addEventListener("mousedown",d),document.addEventListener("touchstart",d),document.addEventListener("mousemove",f),document.addEventListener("touchmove",f),document.addEventListener("mouseup",p),document.addEventListener("touchend",p),document.ondragstart=function(){return!1}}},function(e,t,n){"use strict";var o,r,s;e.exports=(o=null,r=function(){window.scrollTo(0,0)},s=function(){window.pageYOffset>100?o.classList.add("show"):o.classList.remove("show")},{init:function(){(o=document.createElement("DIV")).classList.add("scroll-up"),document.body.appendChild(o),o.addEventListener("click",r),window.addEventListener("scroll",s)}})},function(e,t,n){"use strict";var o;e.exports=((o={}).vkontakte=function(e){var t="https://vk.com/share.php?";t+="url="+e.url,t+="&title="+e.title,t+="&description="+e.desc,t+="&image="+e.img,t+="&noparse=true",o.popup(t,"vkontakte")},o.facebook=function(e){var t="https://www.facebook.com/dialog/share?display=popup";t+="&app_id=1740455756240878",t+="&href="+e.url,t+="&redirect_uri="+document.location.href,o.popup(t,"facebook")},o.twitter=function(e){var t="https://twitter.com/share?";t+="text="+e.title,t+="&url="+e.url,t+="&counturl="+e.url,o.popup(t,"twitter")},o.telegram=function(e){var t="https://telegram.me/share/url";t+="?text="+e.title,t+="&url="+e.url,o.popup(t,"telegram")},o.popup=function(e,t){window.open(e,"","toolbar=0,status=0,width=626,height=436"),window.yaCounter32652805&&window.yaCounter32652805.reachGoal("article-share",function(){},this,{type:t,url:e})},o.init=function(e){console.assert(e.buttonsSelector,"Sharer: buttons selector is missed");for(var t=document.querySelectorAll(e.buttonsSelector),n=t.length-1;n>=0;n--)t[n].addEventListener("click",o.click,!0)},o.click=function(e){var t=e.target,n=t.dataset.shareType||t.parentNode.dataset.shareType;if(o[n]){var r={url:t.dataset.url||t.parentNode.dataset.url,title:t.dataset.title||t.parentNode.dataset.title,desc:t.dataset.desc||t.parentNode.dataset.desc,img:t.dataset.img||t.parentNode.dataset.title};o[n](r)}},o)},function(e,t,n){"use strict";var o,r=(o=function(e){var t={data:"id="+e.target.id+"&value="+(e.target.checked?1:0),url:"/admin/developer"};codex.core.ajax(t)},{init:function(){for(var e=document.querySelectorAll(".developer-checkbox"),t=e.length-1;t>-1;t--)e[t].addEventListener("change",o)}});e.exports=r},function(e,t,n){"use strict";var o={init:function(e){for(var t,n=document.querySelectorAll(".news__list_item"),o=[],r=0;t=n[r];r++)t.classList.contains("news__list_item--hidden")&&o.push(t);o.splice(0,5).map(function(e){e.classList.remove("news__list_item--hidden")}),o.length||e.classList.add("news__list_item--hidden")}};e.exports=o},function(e,t,n){"use strict";var o=(String.prototype.includes||(String.prototype.includes=function(){return-1!==String.prototype.indexOf.apply(this,arguments)}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector),void(Element.prototype.closest||(Element.prototype.closest=function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null})));e.exports=o},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r={xhr:function(e){var t=function e(t,n,r){var s,a,i,u;if(u=/\[\]$/,n instanceof Array)for(a=0,i=n.length;a<i;a++)u.test(t)?r(t,n[a]):e(t+"["+("object"===o(n[a])?a:"")+"]",n[a],r);else if("object"==o(n))for(s in n)e(t+"["+s+"]",n[s],r);else r(t,n)};e.call=function(e){if(e&&e.url){var n,o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");e.type=e.type||"GET",e.url=e.url,e.async=e.async||!1,e.data=e.data||"",e.formData=e.formData||!1,e["content-type"]=e.contentType||"text/html",n=e.success||n,"GET"==e.type&&e.data&&(e.url=/\?/.test(e.url)?e.url+"&"+e.data:e.url+"?"+e.data),e.beforeSend&&"function"==typeof e.beforeSend&&e.beforeSend.call(),o.open(e.type,e.url,e.async),o.setRequestHeader("Content-type",e["content-type"]),o.setRequestHeader("Connection","close"),o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.onreadystatechange=function(){4==o.readyState&&200==o.status&&n&&n.call(o.responseText)},o.send(e.formData||function(e){var n,o,r,s,a;if(o=[],a=/%20/g,r=function(e,t){t="function"==typeof t?t():null===t?"":t,o[o.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)},e instanceof Array)for(s in e)r(s,e[s]);else for(n in e)t(n,e[n],r);return o.join("&").replace(a,"+")}(e.data))}else console.warn("url wasn't passed into ajax method")},e.parseHTML=function(e){var t=document.implementation.createHTMLDocument("");return e.toLowerCase().indexOf("<!doctype")>-1?t.documentElement.innerHTML=e:t.body.innerHTML=e,t},
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
e.serialize=function(e){var t,n,o,r,s,a=[];function i(e){return encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")}function u(e,t){a.push(i(e)+"="+i(t))}if(!e||!e.nodeName||"form"!==e.nodeName.toLowerCase())throw"You must supply a form element";for(t=0,o=e.elements.length;t<o;t++)if(""!==(s=e.elements[t]).name&&!s.disabled)switch(s.nodeName.toLowerCase()){case"input":switch(s.type){case"text":case"email":case"hidden":case"password":case"button":case"submit":u(s.name,s.value);break;case"checkbox":case"radio":s.checked&&u(s.name,s.value)}break;case"textarea":u(s.name,s.value);break;case"select":switch(s.type){case"select-one":u(s.name,s.value);break;case"select-multiple":for(n=0,r=s.options.length;n<r;n++)s.options[n].selected&&u(s.name,s.options[n].value)}break;case"button":switch(s.type){case"reset":case"submit":case"button":u(s.name,s.value)}}return a.join("&")}}};e.exports=r},function(e,t,n){"use strict";e.exports={uploadPhotoSuccess:function(e){var t=document.getElementById("profile-photo-updatable"),n=document.getElementById("header-avatar-updatable");t.src=e,n.src=e}}},function(e,t,n){"use strict";var o;e.exports=((o={}).setCookie=function(e,t,n,o,r){var s=e+"="+t;n&&(s+="; expires="+n.toGMTString()),o&&(s+="; path="+o),r&&(s+="; domain="+r),document.cookie=s},o.getCookie=function(e){var t=document.cookie,n=e+"=",o=t.indexOf("; "+n);if(-1==o){if(0!==(o=t.indexOf(n)))return null}else o+=2;var r=document.cookie.indexOf(";",o);return-1==r&&(r=t.length),unescape(t.substring(o+n.length,r))},o.getOffset=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft+e.clientLeft,n+=e.offsetTop+e.clientTop,e=e.offsetParent;return{top:n,left:t}},o)},function(e,t,n){"use strict";var o,r,s,a,i,u,l,c;e.exports=(o=null,r=null,s=null,a=null,i=null,u=function(e){o=e.quizDataInput,r=o.questions.length,s=0,a=0,c.prepare(),l.prepare(e.holder),l.setupQuestionInterface()},l={holder:null,currentQuestionObj:null,questionElems:null,prepare:function(e){l.holder=document.getElementById(e),l.holder.classList.add("quiz"),l.holder.classList.add("clearfix")},setupQuestionInterface:function(){var e,t,n,o;l.clear(),e=l.createElem("div","quiz__question-title"),t=l.createElem("div","quiz__question-options"),n=l.createElem("div","quiz__question-counter"),(o=l.createElem("input",["quiz__question-button","quiz__question-button_next"])).setAttribute("type","button"),o.setAttribute("value","Далее →"),l.questionElems={counter:n,title:e,optionsHolder:t,options:[],nextButton:o},l.append(l.questionElems),l.showQuestion()},showQuestion:function(){l.clear(l.questionElems.optionsHolder),l.questionElems.options=[],l.questionElems.nextButton.removeEventListener("click",l.showQuestion),l.currentQuestionObj=o.questions[s],l.questionElems.nextButton.setAttribute("disabled",!0),l.questionElems.title.textContent=l.currentQuestionObj.title,l.questionElems.counter.textContent=s+1+"/"+r,l.currentQuestionObj.answers.map(l.createOption)},answerSelected:function(e){e.classList.add("quiz__question-answer_selected"),l.questionElems.options.map(function(e){e.removeEventListener("click",c.getUserAnswer)}),l.questionElems.nextButton.disabled=!1,s<r-1?l.questionElems.nextButton.addEventListener("click",l.showQuestion):l.questionElems.nextButton.addEventListener("click",l.showResult),l.showAnswer(e),s++},showAnswer:function(e){var t=e.dataset.score>0?"_right":"_wrong",n=e.dataset.index;e.classList.add("quiz__question-answer"+t);var o=l.createElem("div","quiz__answer-message");o.textContent=l.currentQuestionObj.answers[n].message,l.insertAfter(o,e),0==e.dataset.score&&l.showCorrectAnswers()},showCorrectAnswers:function(){l.questionElems.options.map(function(e){e.dataset.score>0?e.classList.add("quiz__question-answer_right"):e.classList.add("quiz__question-answer_wrong")})},showResult:function(){var e=a+"/"+i;l.questionElems.nextButton.removeEventListener("click",l.showResult),l.clear();var t=l.createElem("div","quiz__result-score");t.textContent=e;var n=l.createElem("div","quiz__result-message");n.textContent=c.getMessage();var r=l.createElem("div","quiz__sharing");l.createSocial(r,e);var s=l.createElem("div","quiz__retry-button");s.textContent="Пройти еще раз",s.addEventListener("click",u.bind(null,o,l.holder.id)),l.append([t,n,r,s]),codex.sharer.init({buttonsSelector:".but.vk, .but.fb, .but.tw, .but.tg"})},createSocial:function(e,t){[{title:"Share on the VK",shareType:"vkontakte",class:"vk",icon:"icon-vkontakte"},{title:"Share on the Facebook",shareType:"facebook",class:"fb",icon:"icon-facebook-squared"},{title:"Tweet",shareType:"twitter",class:"tw",icon:"icon-twitter"},{title:"Forward in Telegramm",shareType:"telegram",class:"tg",icon:"icon-paper-plane"}].map(function(n){var r=l.createElem("span",["but",n.class]),s=l.createElem("i",n.icon),a=null;r.dataset.shareType=n.shareType,r.setAttribute("title",n.title),o.shareMessage&&(a=o.shareMessage.replace("$score",t)),a=a||"Я набрал "+t+" в "+(o.title||"тесте от команды CodeX"),r.dataset.url=window.location.href,r.dataset.title=a,r.dataset.desc=o.description||"",l.append(s,r),l.append(r,e)})},createOption:function(e,t){var n=l.createElem("div","quiz__question-answer");n.dataset.score=e.score,n.dataset.index=t,n.textContent=e.text,n.addEventListener("click",c.getUserAnswer),l.questionElems.options.push(n),l.append(n,l.questionElems.optionsHolder)},createElem:function(e,t){var n=document.createElement(e);if(!t)return n;if(t instanceof Array)for(var o in t)n.classList.add(t[o]);else n.classList.add(t);return n},append:function(e,t){if(t=t||l.holder,e instanceof Element)t.appendChild(e);else for(var n in e)e[n]instanceof Element&&t.appendChild(e[n])},insertAfter:function(e,t){t.nextSibling?l.questionElems.optionsHolder.insertBefore(e,t.nextSibling):l.append(e,t.parentNode)},clear:function(e){for(e=e||l.holder;e.firstChild;)e.removeChild(e.firstChild)}},c={prepare:function(){i=0,o.questions.map(function(e){e.answers.map(function(e){i+=parseFloat(e.score)})})},getUserAnswer:function(e){var t=e.currentTarget;a+=parseFloat(t.dataset.score),l.answerSelected(t)},getMessage:function(){var e,t=o.resultMessages;if(t.sort(function(e,t){return e.score-t.score}),t.length){for(var n in t){if(a<t[n].score)break;e=t[n].message}return e}}},{init:u})},function(e,t,n){"use strict";e.exports=function(e){e.form=null,e.nodes={title:null,description:null,questions:[],resultMessages:[],shareMessage:null},e.questionInsertAnchor=null,e.questionInsertButton=null,e.resultMessageInsertAnchor=null,e.resultMessageInsertButton=null,e.resultMessagesHolder=null;var t=function(e,t,n){n=n||"";var o=document.createElement(e),r=document.createTextNode(n);for(var s in o.appendChild(r),t){var a=document.createAttribute(s);a.value=t[s],o.setAttributeNode(a)}return o},n=function(n,o){var r={},i=e.nodes.questions[n],u=i.answers.length;o=o||{},r.holder=t("tr",{class:"quiz-form__question-answer-holder","data-question-index":n,"data-object-index":u}),r.textColumn=t("td",{class:"quiz-form__question-answer-text-column"}),r.text=t("input",{type:"text",class:"quiz-form__question-answer-text",value:o.text||"",required:"",form:"null"}),r.scoreColumn=t("td",{class:"quiz-form__question-answer-score-column"}),r.score=t("input",{type:"number",min:"0",step:"1",value:o.score||"0",class:"quiz-form__question-answer-score",required:"",form:"null"}),r.messageColumn=t("td",{class:"quiz-form__question-answer-message-column"}),r.message=t("input",{type:"text",class:"quiz-form__question-answer-message",value:o.message||"",required:"",form:"null"}),r.destroyButtonColumn=t("td",{class:"quiz-form__question-answer-destroy-button-column"}),r.destroyButton=t("span",{class:"quiz-form__question-answer-destroy-button"}),r.destroyButtonCross=t("img",{class:"quiz-form__button-cross",src:"/public/app/img/quizzes/cross.svg"}),r.textColumn.appendChild(r.text),r.scoreColumn.appendChild(r.score),r.messageColumn.appendChild(r.message),r.destroyButton.appendChild(r.destroyButtonCross),r.destroyButtonColumn.appendChild(r.destroyButton),r.holder.appendChild(r.textColumn),r.holder.appendChild(r.scoreColumn),r.holder.appendChild(r.messageColumn),r.holder.appendChild(r.destroyButtonColumn),i.answers.push(r),a(r),s(i.answers)},o=function(o){var r={},i=e.nodes.questions.length;o=o||{},r.holder=t("div",{class:"quiz-form__question-holder","data-object-index":i}),r.number=t("label",{class:"quiz-form__question-number"},"Вопрос "+(i+1)),r.destroyButton=t("span",{class:"quiz-form__question-destroy-button"}),r.destroyButtonCross=t("img",{class:"quiz-form__button-cross",src:"/public/app/img/quizzes/cross.svg"}),r.titleLabel=t("label",{class:"quiz-form__label quiz-form__question-title-label"},"Заголовок вопроса"),r.title=t("input",{type:"text",class:"quiz-form__question-title",value:o.title||"",required:"",form:"null"}),r.answers=[],r.answersHolder=t("table",{class:"quiz-form__question-answers-holder"}),r.answersHead=t("thead",{class:"quiz-form__question-answers-head"}),r.answersLabel=t("th",{class:"quiz-form__label quiz-form__question-answers-label"},"Ответы"),r.scoresLabel=t("th",{class:"quiz-form__label quiz-form__question-scores-label"},"Баллы"),r.messagesLabel=t("th",{class:"quiz-form__label quiz-form__question-messages-label"},"Комментарии к ответам"),r.destroyButtonLabel=t("th",{class:"quiz-form__question-destroy-buttons-label"}),r.addAnswerButtonRow=t("tr",{class:"quiz-form__question-add-answer-button-row"}),r.addAnswerButtonColumn=t("td",{class:"quiz-form__question-add-answer-button-column"}),r.addAnswerButton=t("span",{class:"quiz-form__question-add-answer-button"},"Добавить ответ"),r.addAnswerButtonPlus=t("img",{class:"quiz-form__button-plus",src:"/public/app/img/quizzes/plus.svg"}),r.holder.appendChild(r.number),r.destroyButton.appendChild(r.destroyButtonCross),r.holder.appendChild(r.destroyButton),r.holder.appendChild(r.titleLabel),r.holder.appendChild(r.title),r.answersHead.appendChild(r.answersLabel),r.answersHead.appendChild(r.scoresLabel),r.answersHead.appendChild(r.messagesLabel),r.answersHead.appendChild(r.destroyButtonLabel),r.answersHolder.appendChild(r.answersHead),r.addAnswerButton.insertBefore(r.addAnswerButtonPlus,r.addAnswerButton.firstChild),r.addAnswerButtonColumn.appendChild(r.addAnswerButton),r.addAnswerButtonRow.appendChild(r.addAnswerButtonColumn),r.answersHolder.appendChild(r.addAnswerButtonRow),r.holder.appendChild(r.answersHolder),e.nodes.questions.push(r),o.answers?o.answers.map(function(e){n(i,e)}):(n(i),n(i),n(i)),a(r),s(e.nodes.questions)},r=function(n){var o={},r=e.nodes.resultMessages.length;n=n||{},o.holder=t("tr",{class:"quiz-form__message-holder","data-object-index":r}),o.messageColumn=t("td",{class:"quiz-form__message-message-column"}),o.message=t("input",{type:"text",class:"quiz-form__message-message",value:n.message||"",required:"",form:"null"}),o.scoreColumn=t("td",{class:"quiz-form__message-score-column"}),o.score=t("input",{type:"number",min:"0",step:"1",value:n.score||"0",class:"quiz-form__message-score",required:"",form:"null"}),o.destroyButtonColumn=t("td",{class:"quiz-form__message-destroy-button-column"}),o.destroyButton=t("span",{class:"quiz-form__message-destroy-button"}),o.destroyButtonCross=t("img",{class:"quiz-form__button-cross",src:"/public/app/img/quizzes/cross.svg"}),o.messageColumn.appendChild(o.message),o.scoreColumn.appendChild(o.score),o.destroyButton.appendChild(o.destroyButtonCross),o.destroyButtonColumn.appendChild(o.destroyButton),o.holder.appendChild(o.messageColumn),o.holder.appendChild(o.scoreColumn),o.holder.appendChild(o.destroyButtonColumn),e.nodes.resultMessages.push(o),a(o),s(e.nodes.resultMessages)},s=function(e){e.length<=1?(e[0].destroyButton.style.display="none",e[0].firstChild&&(e[0].firstChild.style.display="none")):(e[0].destroyButton.style.display="",e[0].firstChild&&(e[0].firstChild.style.display=""))},a=function(t){var n,o;t.answers?(n=e.questionInsertAnchor,o=e.form):t.text?(n=e.nodes.questions[parseInt(t.holder.dataset.questionIndex)].addAnswerButtonRow,o=e.nodes.questions[parseInt(t.holder.dataset.questionIndex)].answersHolder):(n=e.resultMessageInsertAnchor,o=e.resultMessagesHolder),o.insertBefore(t.holder,n)},i=function(){e.form.onsubmit=function(n){n.preventDefault();var o={title:e.form.querySelector('[name="title"]').value,description:e.form.querySelector('[name="description"]').value,questions:[],resultMessages:[],shareMessage:e.form.querySelector('[name="shareMessage"]').value};for(var r in e.nodes.questions){var s={};for(var a in s.title=e.nodes.questions[r].title.value,s.answers=[],e.nodes.questions[r].answers){var i={};i.text=e.nodes.questions[r].answers[a].text.value,i.score=e.nodes.questions[r].answers[a].score.value,i.message=e.nodes.questions[r].answers[a].message.value,s.answers.push(i)}o.questions.push(s)}for(var r in e.nodes.resultMessages){var u={};u.score=e.nodes.resultMessages[r].score.value,u.message=e.nodes.resultMessages[r].message.value,o.resultMessages.push(u)}e.form.appendChild(t("input",{type:"hidden",name:"quiz_data",value:JSON.stringify(o)})),e.form.submit()},e.questionInsertButton.onclick=function(){o()},e.resultMessageInsertButton.onclick=function(){r()},e.form.onclick=function(t){var o,r;t.target.classList.contains("quiz-form__question-destroy-button")?(o=e.nodes.questions,r=parseInt(t.target.parentNode.dataset.objectIndex)):t.target.parentNode.classList.contains("quiz-form__question-destroy-button")?(o=e.nodes.questions,r=parseInt(t.target.parentNode.parentNode.dataset.objectIndex)):t.target.classList.contains("quiz-form__question-answer-destroy-button")?(o=e.nodes.questions[parseInt(t.target.parentNode.parentNode.dataset.questionIndex)].answers,r=parseInt(t.target.parentNode.parentNode.dataset.objectIndex)):t.target.parentNode.classList.contains("quiz-form__question-answer-destroy-button")?(o=e.nodes.questions[parseInt(t.target.parentNode.parentNode.parentNode.dataset.questionIndex)].answers,r=parseInt(t.target.parentNode.parentNode.parentNode.dataset.objectIndex)):t.target.classList.contains("quiz-form__message-destroy-button")?(o=e.nodes.resultMessages,r=parseInt(t.target.parentNode.parentNode.dataset.objectIndex)):t.target.classList.contains("quiz-form__question-add-answer-button")&&(o=null,r=parseInt(t.target.parentNode.parentNode.parentNode.parentNode.dataset.objectIndex)),null===o?n(r):void 0!==o&&function(e,t){e[t].holder.parentNode.removeChild(e[t].holder),e.splice(t,1);for(var n=t;n<e.length;n++)o=e[n],r=n+1,o.holder.dataset.objectIndex=r-1,o.number&&(o.number.textContent="Вопрос "+r);var o,r;s(e)}(o,r)}},u=function(){e.form=document.forms.quizForm,e.questionInsertAnchor=document.getElementById("questionInsertAnchor"),e.questionInsertButton=document.getElementById("questionInsertButton"),e.resultMessageInsertAnchor=document.getElementById("resultMessageInsertAnchor"),e.resultMessageInsertButton=document.getElementById("resultMessageInsertButton"),e.resultMessagesHolder=document.getElementById("resultMessagesHolder")},l=function(){s(e.nodes.questions),s(e.nodes.resultMessages),s(e.nodes.questions[0].answers)};return e.init=function(e){if(e.quizData)return t=e.quizData,n=t.questions,s=t.resultMessages,document.querySelector('[name="title"]').value=t.title,document.querySelector('textarea[name="description"]').textContent=t.description,document.querySelector('[name="shareMessage"]').value=t.shareMessage,u(),s.map(function(e){r(e)}),n.map(function(e){o(e)}),i(),void l();var t,n,s;u(),o(),r(),i(),l()},e}({})},function(module,exports,__webpack_require__){"use strict";module.exports=function(transport){return transport.currentButtonClicked={},transport.init=function(e){var t=document.querySelectorAll(e.buttonsClass);if(t.length){transport.form=document.getElementById("transportForm"),transport.input=document.getElementById("transportInput");for(var n=t.length-1;n>=0;n--)t[n].addEventListener("click",transport.buttonCallback,!1);transport.input.addEventListener("change",transport.submitCallback,!1)}else console.warn("Can't find element with class: «"+e.buttonsClass+"»")},transport.buttonCallback=function(){var e=this.dataset.action,t=this.dataset.id,n=!!this.dataset.multiple||!1;transport.fillForm({action:e,id:t}),n&&(transport.form.multiple="multiple"),transport.currentButtonClicked=this,transport.input.click()},transport.fillForm=function(e){var t,n;for(var o in e)void 0!==e[o]&&((t=null!=(n=transport.form.querySelector("input[name="+o+"]"))?n:document.createElement("input")).type="hidden",t.name=o,t.value=e[o],transport.form.appendChild(t))},transport.submitCallback=function(){for(var e=transport.getFileObject(this),t=e.length-1;t>=0;t--){if(!transport.validateExtension(e[t])||!transport.validateMIME(e[t]))return void(window.console&&console.warn("Wrong file type: %o",+e[t].name));if(!transport.validateSize(e[t],31457280))return void(window.console&&console.warn("File size exceeded limit: %o MB",e[t].size/1048576..toFixed(2)))}transport.currentButtonClicked.className+=" loading",transport.form.submit()},transport.response=function(response){transport.currentButtonClicked.className=transport.currentButtonClicked.className.replace("loading",""),response.callback&&eval(response.callback),response.result&&"error"==response.result&&window.console&&console.warn(response.error_description||"error")},transport.getFileObject=function(e){return!!e&&("function"==typeof ActiveXObject?new ActiveXObject("Scripting.FileSystemObject").getFile(e.value):e.files)},transport.validateMIME=function(e,t){for(var n=(t="array"==typeof t?t:["image/jpeg","image/png"]).length-1;n>=0;n--)if(e.type==t[n])return!0;return!1},transport.validateExtension=function(e,t){var n=e.name.match(/\.(\w+)($|#|\?)/);if(!n)return!1;n=n[1].toLowerCase();for(var o=(t="array"==typeof t?t:["jpg","jpeg","png"]).length-1;o>=0;o--)if(n==t[o])return!0;return!1},transport.validateSize=function(e,t){return e.size<t},transport}({})},function(e,t,n){"use strict";var o,r,s,a,i,u=(a=function(){var e=document.createElement("SCRIPT");e.src="https://vk.com/js/api/openapi.js",e.setAttribute("async","true"),e.onload=i,document.body.appendChild(e)},i=function(){window.VK.Widgets.Group(o,r,s)},{init:function(e){o=e.id||null,r=e.display||{mode:3,width:"auto"},s=e.communityId||0,null!=document.getElementById(o)?a():console.log("Cannot find element with id "+o)}});e.exports=u},function(e,t,n){"use strict";var o,r,s;e.exports=(o=n(0).default,r="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",s="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github-gist.min.css",{init:function(e){var t=document.querySelectorAll(e);t&&Promise.all([o.loadResource("JS",r,"highlight"),o.loadResource("CSS",s,"highlight")]).catch(function(e){return console.warn("Cannot load code styling module: ",e)}).then(function(){return console.log("Code Styling is ready")}).then(function(){if(window.hljs)for(var e=t.length-1;e>=0;e--)window.hljs.highlightBlock(t[e]);else console.warn("Code Styling script loaded but not ready")})}})},function(e,t,n){window,e.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var o,r,s,a,i,u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};
/**
>>>>>>> dfe73aa79381f22a881ab92142b8786ee54ab8be
 * Helps to set link with custom protocol (to open apps) and usual link (for webpages) to a button
 *
 * @author Taly Guryn <https://github.com/talyguryn>
 * @license MIT
<<<<<<< HEAD
 */e.exports=(o=function(e){"object"!==(void 0===e?"undefined":f(e))&&c("Passed element is not an object");var n=e.dataset.link||e.href,t=e.dataset.appLink;i(t,n)},r=function(e){e||c("Can not open app, because appLink is undefined");var n=document.createElement("iframe");n.style.display="none",document.body.appendChild(n),null!==n&&(n.src=e)},i=function(e,n){var t=!1;window.addEventListener("pagehide",function(){t=!0},!1),window.addEventListener("blur",function(){t=!0},!1),r(e),setTimeout(function(){t||u(n)},100)},u=function(e){e||c("Can not open page because link is undefined"),window.open(e,"_blank")},c=function(e){throw Error("[Deeplinker] "+e)},{click:o,init:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".deeplinker",n=document.querySelectorAll(e);n.length&&Array.prototype.slice.call(n).forEach(function(e){e.addEventListener("click",function(n){n.preventDefault(),o(e)})})},tryToOpenApp:r})}])});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=22)}([function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(r){function o(){var t;try{t=e.storage.debug}catch(t){}return!t&&void 0!==r&&"env"in r&&(t=r.env.DEBUG),t}(e=t.exports=n(33)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},e.formatArgs=function(t){var n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),!n)return;var r="color: "+this.color;t.splice(1,0,r,"color: inherit");var o=0,i=0;t[0].replace(/%[a-zA-Z%]/g,function(t){"%%"!==t&&"%c"===t&&(i=++o)}),t.splice(i,0,r)},e.save=function(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}},e.load=o,e.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},e.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(t){}}(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},e.enable(o())}).call(this,n(32))},function(t,e,n){function r(t){if(t)return function(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}(t)}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o=0;o<r.length;o++)if((n=r[o])===e||n.fn===e){r.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n)for(var r=0,o=(n=n.slice(0)).length;r<o;++r)n[r].apply(this,e);return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){var r,o=n(40),i=n(16),s=n(46),a=n(47),c=n(48);"undefined"!=typeof ArrayBuffer&&(r=n(49));var u="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),f="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),h=u||f;e.protocol=3;var p=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},l=o(p),d={type:"error",data:"parser error"},y=n(50);function g(t,e,n){for(var r=new Array(t.length),o=a(t.length,n),i=function(t,n,o){e(n,function(e,n){r[t]=n,o(e,r)})},s=0;s<t.length;s++)i(s,t[s],o)}e.encodePacket=function(t,n,r,o){"function"==typeof n&&(o=n,n=!1),"function"==typeof r&&(o=r,r=null);var i=void 0===t.data?void 0:t.data.buffer||t.data;if("undefined"!=typeof ArrayBuffer&&i instanceof ArrayBuffer)return function(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=p[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return r(s.buffer)}(t,n,o);if(void 0!==y&&i instanceof y)return function(t,n,r){if(!n)return e.encodeBase64Packet(t,r);if(h)return function(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=new FileReader;return o.onload=function(){e.encodePacket({type:t.type,data:o.result},n,!0,r)},o.readAsArrayBuffer(t.data)}(t,n,r);var o=new Uint8Array(1);o[0]=p[t.type];var i=new y([o.buffer,t.data]);return r(i)}(t,n,o);if(i&&i.base64)return function(t,n){var r="b"+e.packets[t.type]+t.data.data;return n(r)}(t,o);var s=p[t.type];return void 0!==t.data&&(s+=r?c.encode(String(t.data),{strict:!1}):String(t.data)),o(""+s)},e.encodeBase64Packet=function(t,n){var r,o="b"+e.packets[t.type];if(void 0!==y&&t.data instanceof y){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];n(o+t)},i.readAsDataURL(t.data)}try{r=String.fromCharCode.apply(null,new Uint8Array(t.data))}catch(e){for(var s=new Uint8Array(t.data),a=new Array(s.length),c=0;c<s.length;c++)a[c]=s[c];r=String.fromCharCode.apply(null,a)}return o+=btoa(r),n(o)},e.decodePacket=function(t,n,r){if(void 0===t)return d;if("string"==typeof t){if("b"===t.charAt(0))return e.decodeBase64Packet(t.substr(1),n);if(r&&!1===(t=function(t){try{t=c.decode(t,{strict:!1})}catch(t){return!1}return t}(t)))return d;var o=t.charAt(0);return Number(o)==o&&l[o]?t.length>1?{type:l[o],data:t.substring(1)}:{type:l[o]}:d}o=new Uint8Array(t)[0];var i=s(t,1);return y&&"blob"===n&&(i=new y([i])),{type:l[o],data:i}},e.decodeBase64Packet=function(t,e){var n=l[t.charAt(0)];if(!r)return{type:n,data:{base64:!0,data:t.substr(1)}};var o=r.decode(t.substr(1));return"blob"===e&&y&&(o=new y([o])),{type:n,data:o}},e.encodePayload=function(t,n,r){"function"==typeof n&&(r=n,n=null);var o=i(t);if(n&&o)return y&&!h?e.encodePayloadAsBlob(t,r):e.encodePayloadAsArrayBuffer(t,r);if(!t.length)return r("0:");g(t,function(t,r){e.encodePacket(t,!!o&&n,!1,function(t){r(null,function(t){return t.length+":"+t}(t))})},function(t,e){return r(e.join(""))})},e.decodePayload=function(t,n,r){if("string"!=typeof t)return e.decodePayloadAsBinary(t,n,r);var o;if("function"==typeof n&&(r=n,n=null),""===t)return r(d,0,1);for(var i,s,a="",c=0,u=t.length;c<u;c++){var f=t.charAt(c);if(":"===f){if(""===a||a!=(i=Number(a)))return r(d,0,1);if(a!=(s=t.substr(c+1,i)).length)return r(d,0,1);if(s.length){if(o=e.decodePacket(s,n,!1),d.type===o.type&&d.data===o.data)return r(d,0,1);if(!1===r(o,c+i,u))return}c+=i,a=""}else a+=f}return""!==a?r(d,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,n){if(!t.length)return n(new ArrayBuffer(0));g(t,function(t,n){e.encodePacket(t,!0,!0,function(t){return n(null,t)})},function(t,e){var r=e.reduce(function(t,e){var n;return t+(n="string"==typeof e?e.length:e.byteLength).toString().length+n+2},0),o=new Uint8Array(r),i=0;return e.forEach(function(t){var e="string"==typeof t,n=t;if(e){for(var r=new Uint8Array(t.length),s=0;s<t.length;s++)r[s]=t.charCodeAt(s);n=r.buffer}o[i++]=e?0:1;var a=n.byteLength.toString();for(s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(r=new Uint8Array(n),s=0;s<r.length;s++)o[i++]=r[s]}),n(o.buffer)})},e.encodePayloadAsBlob=function(t,n){g(t,function(t,n){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);t=r.buffer,e[0]=0}var i=(t instanceof ArrayBuffer?t.byteLength:t.size).toString(),s=new Uint8Array(i.length+1);for(o=0;o<i.length;o++)s[o]=parseInt(i[o]);if(s[i.length]=255,y){var a=new y([e.buffer,s.buffer,t]);n(null,a)}})},function(t,e){return n(new y(e))})},e.decodePayloadAsBinary=function(t,n,r){"function"==typeof n&&(r=n,n=null);for(var o=t,i=[];o.byteLength>0;){for(var a=new Uint8Array(o),c=0===a[0],u="",f=1;255!==a[f];f++){if(u.length>310)return r(d,0,1);u+=a[f]}o=s(o,2+u.length),u=parseInt(u);var h=s(o,0,u);if(c)try{h=String.fromCharCode.apply(null,new Uint8Array(h))}catch(t){var p=new Uint8Array(h);h="";for(f=0;f<p.length;f++)h+=String.fromCharCode(p[f])}i.push(h),o=s(o,u)}var l=i.length;i.forEach(function(t,o){r(e.decodePacket(t,n,!0),o,l)})}},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e,n){var r=n(1)("socket.io-parser"),o=n(2),i=n(35),s=n(11),a=n(12);function c(){}e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=c,e.Decoder=h;var u=e.ERROR+'"encode error"';function f(t){var n=""+t.type;if(e.BINARY_EVENT!==t.type&&e.BINARY_ACK!==t.type||(n+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(n+=t.nsp+","),null!=t.id&&(n+=t.id),null!=t.data){var o=function(t){try{return JSON.stringify(t)}catch(t){return!1}}(t.data);if(!1===o)return u;n+=o}return r("encoded %j as %s",t,n),n}function h(){this.reconstructor=null}function p(t){this.reconPack=t,this.buffers=[]}function l(t){return{type:e.ERROR,data:"parser error: "+t}}c.prototype.encode=function(t,n){(r("encoding packet %j",t),e.BINARY_EVENT===t.type||e.BINARY_ACK===t.type)?function(t,e){i.removeBlobs(t,function(t){var n=i.deconstructPacket(t),r=f(n.packet),o=n.buffers;o.unshift(r),e(o)})}(t,n):n([f(t)])},o(h.prototype),h.prototype.add=function(t){var n;if("string"==typeof t)n=function(t){var n=0,o={type:Number(t.charAt(0))};if(null==e.types[o.type])return l("unknown packet type "+o.type);if(e.BINARY_EVENT===o.type||e.BINARY_ACK===o.type){for(var i="";"-"!==t.charAt(++n)&&(i+=t.charAt(n),n!=t.length););if(i!=Number(i)||"-"!==t.charAt(n))throw new Error("Illegal attachments");o.attachments=Number(i)}if("/"===t.charAt(n+1))for(o.nsp="";++n;){var a=t.charAt(n);if(","===a)break;if(o.nsp+=a,n===t.length)break}else o.nsp="/";var c=t.charAt(n+1);if(""!==c&&Number(c)==c){for(o.id="";++n;){var a=t.charAt(n);if(null==a||Number(a)!=a){--n;break}if(o.id+=t.charAt(n),n===t.length)break}o.id=Number(o.id)}if(t.charAt(++n)){var u=function(t){try{return JSON.parse(t)}catch(t){return!1}}(t.substr(n)),f=!1!==u&&(o.type===e.ERROR||s(u));if(!f)return l("invalid payload");o.data=u}return r("decoded %s as %j",t,o),o}(t),e.BINARY_EVENT===n.type||e.BINARY_ACK===n.type?(this.reconstructor=new p(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!a(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(n=this.reconstructor.takeBinaryData(t))&&(this.reconstructor=null,this.emit("decoded",n))}},h.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},p.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=i.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},p.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(t,e,n){(function(e){var r=n(38);t.exports=function(t){var n=t.xdomain,o=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!n||r))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!o&&i)return new XDomainRequest}catch(t){}if(!n)try{return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}}).call(this,n(0))},function(t,e,n){var r=n(3),o=n(2);function i(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}t.exports=i,o(i.prototype),i.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},i.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},i.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},i.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},i.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},i.prototype.onData=function(t){var e=r.decodePacket(t,this.socket.binaryType);this.onPacket(e)},i.prototype.onPacket=function(t){this.emit("packet",t)},i.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),i=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(i).concat([o]).join("\n")}return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");-1!=o&&-1!=i&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=n.exec(t||""),a={},c=14;c--;)a[r[c]]=s[c]||"";return-1!=o&&-1!=i&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,n){(function(e){t.exports=function(t){return n&&e.Buffer.isBuffer(t)||r&&(t instanceof e.ArrayBuffer||o(t))};var n="function"==typeof e.Buffer&&"function"==typeof e.Buffer.isBuffer,r="function"==typeof e.ArrayBuffer,o=r&&"function"==typeof e.ArrayBuffer.isView?e.ArrayBuffer.isView:function(t){return t.buffer instanceof e.ArrayBuffer}}).call(this,n(0))},function(t,e,n){var r=n(36),o=n(19),i=n(2),s=n(6),a=n(20),c=n(21),u=n(1)("socket.io-client:manager"),f=n(18),h=n(55),p=Object.prototype.hasOwnProperty;function l(t,e){if(!(this instanceof l))return new l(t,e);t&&"object"==typeof t&&(e=t,t=void 0),(e=e||{}).path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(!1!==e.reconnection),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new h({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var n=e.parser||s;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this.autoConnect=!1!==e.autoConnect,this.autoConnect&&this.open()}t.exports=l,l.prototype.emitAll=function(){for(var t in this.emit.apply(this,arguments),this.nsps)p.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},l.prototype.updateSocketIds=function(){for(var t in this.nsps)p.call(this.nsps,t)&&(this.nsps[t].id=this.generateId(t))},l.prototype.generateId=function(t){return("/"===t?"":t+"#")+this.engine.id},i(l.prototype),l.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},l.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},l.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},l.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},l.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},l.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},l.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},l.prototype.open=l.prototype.connect=function(t,e){if(u("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;u("opening %s",this.uri),this.engine=r(this.uri,this.opts);var n=this.engine,o=this;this.readyState="opening",this.skipReconnect=!1;var i=a(n,"open",function(){o.onopen(),t&&t()}),s=a(n,"error",function(e){if(u("connect_error"),o.cleanup(),o.readyState="closed",o.emitAll("connect_error",e),t){var n=new Error("Connection error");n.data=e,t(n)}else o.maybeReconnectOnOpen()});if(!1!==this._timeout){var c=this._timeout;u("connect attempt will timeout after %d",c);var f=setTimeout(function(){u("connect attempt timed out after %d",c),i.destroy(),n.close(),n.emit("error","timeout"),o.emitAll("connect_timeout",c)},c);this.subs.push({destroy:function(){clearTimeout(f)}})}return this.subs.push(i),this.subs.push(s),this},l.prototype.onopen=function(){u("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(a(t,"data",c(this,"ondata"))),this.subs.push(a(t,"ping",c(this,"onping"))),this.subs.push(a(t,"pong",c(this,"onpong"))),this.subs.push(a(t,"error",c(this,"onerror"))),this.subs.push(a(t,"close",c(this,"onclose"))),this.subs.push(a(this.decoder,"decoded",c(this,"ondecoded")))},l.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},l.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},l.prototype.ondata=function(t){this.decoder.add(t)},l.prototype.ondecoded=function(t){this.emit("packet",t)},l.prototype.onerror=function(t){u("error",t),this.emitAll("error",t)},l.prototype.socket=function(t,e){var n=this.nsps[t];if(!n){n=new o(this,t,e),this.nsps[t]=n;var r=this;n.on("connecting",i),n.on("connect",function(){n.id=r.generateId(t)}),this.autoConnect&&i()}function i(){~f(r.connecting,n)||r.connecting.push(n)}return n},l.prototype.destroy=function(t){var e=f(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},l.prototype.packet=function(t){u("writing packet %j",t);var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(n){for(var r=0;r<n.length;r++)e.engine.write(n[r],t.options);e.encoding=!1,e.processPacketQueue()}))},l.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},l.prototype.cleanup=function(){u("cleanup");for(var t=this.subs.length,e=0;e<t;e++){this.subs.shift().destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},l.prototype.close=l.prototype.disconnect=function(){u("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},l.prototype.onclose=function(t){u("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},l.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)u("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();u("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var n=setTimeout(function(){t.skipReconnect||(u("attempting reconnect"),t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(u("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(u("reconnect success"),t.onreconnect())}))},e);this.subs.push({destroy:function(){clearTimeout(n)}})}},l.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}},function(t,e,n){(function(t){var r=n(7),o=n(39),i=n(51),s=n(52);e.polling=function(e){var n=!1,s=!1,a=!1!==e.jsonp;if(t.location){var c="https:"===location.protocol,u=location.port;u||(u=c?443:80),n=e.hostname!==location.hostname||u!==e.port,s=e.secure!==c}if(e.xdomain=n,e.xscheme=s,"open"in new r(e)&&!e.forceJSONP)return new o(e);if(!a)throw new Error("JSONP disabled");return new i(e)},e.websocket=s}).call(this,n(0))},function(t,e,n){var r=n(8),o=n(4),i=n(3),s=n(5),a=n(17),c=n(1)("engine.io-client:polling");t.exports=f;var u=null!=new(n(7))({xdomain:!1}).responseType;function f(t){var e=t&&t.forceBase64;u&&!e||(this.supportsBinary=!1),r.call(this,t)}s(f,r),f.prototype.name="polling",f.prototype.doOpen=function(){this.poll()},f.prototype.pause=function(t){var e=this;function n(){c("paused"),e.readyState="paused",t()}if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(c("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){c("pre-pause polling complete"),--r||n()})),this.writable||(c("we are currently writing - waiting to pause"),r++,this.once("drain",function(){c("pre-pause writing complete"),--r||n()}))}else n()},f.prototype.poll=function(){c("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},f.prototype.onData=function(t){var e=this;c("polling got data %s",t);i.decodePayload(t,this.socket.binaryType,function(t,n,r){if("opening"===e.readyState&&e.onOpen(),"close"===t.type)return e.onClose(),!1;e.onPacket(t)}),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():c('ignoring poll - transport state "%s"',this.readyState))},f.prototype.doClose=function(){var t=this;function e(){c("writing close packet"),t.write([{type:"close"}])}"open"===this.readyState?(c("transport open - closing"),e()):(c("transport not open - deferring close"),this.once("open",e))},f.prototype.write=function(t){var e=this;this.writable=!1;var n=function(){e.writable=!0,e.emit("drain")};i.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,n)})},f.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";return!1!==this.timestampRequests&&(t[this.timestampParam]=a()),this.supportsBinary||t.sid||(t.b64=1),t=o.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(n=":"+this.port),t.length&&(t="?"+t),e+"://"+(-1!==this.hostname.indexOf(":")?"["+this.hostname+"]":this.hostname)+n+this.path+t}},function(t,e,n){(function(e){var r=n(45),o=Object.prototype.toString,i="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===o.call(Blob),s="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===o.call(File);t.exports=function t(n){if(!n||"object"!=typeof n)return!1;if(r(n)){for(var o=0,a=n.length;o<a;o++)if(t(n[o]))return!0;return!1}if("function"==typeof e&&e.isBuffer&&e.isBuffer(n)||"function"==typeof ArrayBuffer&&n instanceof ArrayBuffer||i&&n instanceof Blob||s&&n instanceof File)return!0;if(n.toJSON&&"function"==typeof n.toJSON&&1===arguments.length)return t(n.toJSON(),!0);for(var c in n)if(Object.prototype.hasOwnProperty.call(n,c)&&t(n[c]))return!0;return!1}}).call(this,n(41).Buffer)},function(t,e,n){"use strict";var r,o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i=64,s={},a=0,c=0;function u(t){var e="";do{e=o[t%i]+e,t=Math.floor(t/i)}while(t>0);return e}function f(){var t=u(+new Date);return t!==r?(a=0,r=t):t+"."+u(a++)}for(;c<i;c++)s[o[c]]=c;f.encode=u,f.decode=function(t){var e=0;for(c=0;c<t.length;c++)e=e*i+s[t.charAt(c)];return e},t.exports=f},function(t,e){var n=[].indexOf;t.exports=function(t,e){if(n)return t.indexOf(e);for(var r=0;r<t.length;++r)if(t[r]===e)return r;return-1}},function(t,e,n){var r=n(6),o=n(2),i=n(54),s=n(20),a=n(21),c=n(1)("socket.io-client:socket"),u=n(4),f=n(16);t.exports=l;var h={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},p=o.prototype.emit;function l(t,e,n){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,this.flags={},n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open()}o(l.prototype),l.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[s(t,"open",a(this,"onopen")),s(t,"packet",a(this,"onpacket")),s(t,"close",a(this,"onclose"))]}},l.prototype.open=l.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},l.prototype.send=function(){var t=i(arguments);return t.unshift("message"),this.emit.apply(this,t),this},l.prototype.emit=function(t){if(h.hasOwnProperty(t))return p.apply(this,arguments),this;var e=i(arguments),n={type:(void 0!==this.flags.binary?this.flags.binary:f(e))?r.BINARY_EVENT:r.EVENT,data:e,options:{}};return n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(c("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),this.flags={},this},l.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},l.prototype.onopen=function(){if(c("transport is open - connecting"),"/"!==this.nsp)if(this.query){var t="object"==typeof this.query?u.encode(this.query):this.query;c("sending connect packet with query %s",t),this.packet({type:r.CONNECT,query:t})}else this.packet({type:r.CONNECT})},l.prototype.onclose=function(t){c("close (%s)",t),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},l.prototype.onpacket=function(t){var e=t.nsp===this.nsp,n=t.type===r.ERROR&&"/"===t.nsp;if(e||n)switch(t.type){case r.CONNECT:this.onconnect();break;case r.EVENT:case r.BINARY_EVENT:this.onevent(t);break;case r.ACK:case r.BINARY_ACK:this.onack(t);break;case r.DISCONNECT:this.ondisconnect();break;case r.ERROR:this.emit("error",t.data)}},l.prototype.onevent=function(t){var e=t.data||[];c("emitting event %j",e),null!=t.id&&(c("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?p.apply(this,e):this.receiveBuffer.push(e)},l.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var o=i(arguments);c("sending ack %j",o),e.packet({type:f(o)?r.BINARY_ACK:r.ACK,id:t,data:o})}}},l.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e?(c("calling ack %s with %j",t.id,t.data),e.apply(this,t.data),delete this.acks[t.id]):c("bad ack %s",t.id)},l.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},l.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)p.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},l.prototype.ondisconnect=function(){c("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},l.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},l.prototype.close=l.prototype.disconnect=function(){return this.connected&&(c("performing disconnect (%s)",this.nsp),this.packet({type:r.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},l.prototype.compress=function(t){return this.flags.compress=t,this},l.prototype.binary=function(t){return this.flags.binary=t,this}},function(t,e){t.exports=function(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n)}}}},function(t,e){var n=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(23);var r=n(28);e.default=r.default},function(t,e,n){var r=n(24);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(26)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(e=t.exports=n(9)(!1)).i(n(25),""),e.push([t.i,".reactions {\n  display: flex;\n  justify-content: center;\n  color: var(--text-color);\n  font-family: var(--font-stack);\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n@media (max-width: 1000px) {\n\n.reactions {\n    flex-direction: column\n}\n  }\n\n.reactions__title {\n    align-self: center;\n    margin-right: 18px;\n    font-size: 15px;\n    letter-spacing: 0.1px;\n  }\n\n@media (max-width: 1000px) {\n\n.reactions__title {\n      margin-bottom: 10px\n  }\n    }\n\n.reactions__container {\n    display: flex;\n  }\n\n@media (max-width: 1000px) {\n\n.reactions__container {\n      flex-wrap: wrap;\n      justify-content: center\n  }\n    }\n\n.reactions__counter {\n    margin: 10px 20px 10px 0;\n  }\n\n.reactions__counter-emoji {\n      display: inline-block;\n      vertical-align: middle;\n      width: 40px;\n      height: 40px;\n      line-height: 40px;\n      text-align: center;\n      margin-right: 11px;\n      border: solid 1px var(--border-color);\n      border-radius: 35px;\n      box-sizing: border-box;\n      font-size: 20px;\n      cursor: pointer;\n      letter-spacing: -1.5px;\n      will-change: transform, filter, box-shadow, background-color, border-color;\n    }\n\n.reactions__counter-emoji--picked {\n        background-color: var(--background-color);\n        border-color: var(--border-color--selected);\n        -webkit-animation: cr-select 600ms ease 1;\n                animation: cr-select 600ms ease 1;\n      }\n\n.reactions__counter-emoji--picked:hover {\n          -webkit-animation: cr-select 600ms ease-out 1 !important;\n                  animation: cr-select 600ms ease-out 1 !important;\n        }\n\n.reactions__counter-emoji:hover {\n        border-color: var(--border-color--hover);\n        -webkit-animation: cr-hover 1000ms ease infinite;\n                animation: cr-hover 1000ms ease infinite;\n      }\n\n.reactions__counter-votes {\n      display: inline-block;\n      min-width: 15px;\n      vertical-align: middle;\n    }\n\n.reactions__counter-votes--picked{\n        font-weight: 600;\n      }\n\n@-webkit-keyframes cr-hover {\n  0% {\n    box-shadow: 0 0 0 10px #FFFACC;\n  }\n\n  40% {\n    box-shadow: 0 0 0 25px rgba(255, 250, 204, 0.4), 0 0 0 10px #FFFACC;\n  }\n\n  40.05% {\n    box-shadow: 0 0 0 5px rgba(255, 250, 204, 0.4), 0 0 0 10px #FFFACC;\n  }\n}\n\n@keyframes cr-hover {\n  0% {\n    box-shadow: 0 0 0 10px #FFFACC;\n  }\n\n  40% {\n    box-shadow: 0 0 0 25px rgba(255, 250, 204, 0.4), 0 0 0 10px #FFFACC;\n  }\n\n  40.05% {\n    box-shadow: 0 0 0 5px rgba(255, 250, 204, 0.4), 0 0 0 10px #FFFACC;\n  }\n}\n\n@-webkit-keyframes cr-select {\n  20% {\n    -webkit-transform: scale(1.7);\n            transform: scale(1.7);\n    -webkit-filter: blur(1px);\n            filter: blur(1px);\n  }\n\n}\n\n@keyframes cr-select {\n  20% {\n    -webkit-transform: scale(1.7);\n            transform: scale(1.7);\n    -webkit-filter: blur(1px);\n            filter: blur(1px);\n  }\n\n}",""])},function(t,e,n){(t.exports=n(9)(!1)).push([t.i,':root  {\n  --text-color: #8b8b8b;\n  --border-color: #d7d7d4;\n  --border-color--hover: #F4E964;\n  --border-color--selected: #ebe8bf;\n  --background-color: #fffacc;\n  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n}',""])},function(t,e,n){var r={},o=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),i=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),s=null,a=0,c=[],u=n(27);function f(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=r[o.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](o.parts[s]);for(;s<o.parts.length;s++)i.parts.push(g(o.parts[s],e))}else{var a=[];for(s=0;s<o.parts.length;s++)a.push(g(o.parts[s],e));r[o.id]={id:o.id,refs:1,parts:a}}}}function h(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=e.base?i[0]+e.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}function p(t,e){var n=i(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=i(t.insertAt.before,n);n.insertBefore(e,o)}}function l(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function d(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return n.nc}();r&&(t.attrs.nonce=r)}return y(e,t.attrs),p(t,e),e}function y(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function g(t,e){var n,r,o,i;if(e.transform&&t.css){if(!(i="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=i}if(e.singleton){var c=a++;n=s||(s=d(e)),r=v.bind(null,n,c,!1),o=v.bind(null,n,c,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),p(t,e),e}(e),r=function(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=u(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,e),o=function(){l(n),n.href&&URL.revokeObjectURL(n.href)}):(n=d(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){l(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=h(t,e);return f(n,e),function(t){for(var o=[],i=0;i<n.length;i++){var s=n[i];(a=r[s.id]).refs--,o.push(a)}t&&f(h(t,e),e);for(i=0;i<o.length;i++){var a;if(0===(a=o[i]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete r[a.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function v(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,o);else{var i=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(29),o=n(57),i=n(58),s=n(59),a=n(60),c=function(){function t(e){var n,r=this;if(this.reactions={},this.nodes={wrap:null,container:null},this.id=new o.default(e.id),this.nodes.wrap=i.default.make("div",t.CSS.wrapper),n=e.parent instanceof HTMLElement?e.parent:document.querySelector(e.parent),e.title){var s=this.createTitle(e.title);this.nodes.wrap.append(s)}this.nodes.container=i.default.make("div",t.CSS.container),e.reactions.forEach(function(t){var e=r.getEmojiHash(t);e in r.reactions||(r.reactions[e]=r.addReaction(t,e))}),this.nodes.wrap.append(this.nodes.container),t.socket.send({type:"initialization",title:e.title,options:e.reactions.reduce(function(t,e){return t[r.getEmojiHash(e)]=0,t},{}),id:this.id,userId:t.userId});var c=a.default.getInt(this.getStorageKey());if(c&&c in this.reactions&&this.update({reaction:c,userId:t.userId}),t.socket.socket.on("update",function(t){t&&t.id===r.id.toString()&&r.update(t)}),!n)throw new Error("Parent element is not found");n.append(this.nodes.wrap),a.default.setItem("reactionsUserId",t.userId)}return Object.defineProperty(t,"CSS",{get:function(){return{emoji:"reactions__counter-emoji",picked:"reactions__counter-emoji--picked",reactionContainer:"reactions__counter",title:"reactions__title",votes:"reactions__counter-votes",votesPicked:"reactions__counter-votes--picked",container:"reactions__container",wrapper:"reactions"}},enumerable:!0,configurable:!0}),t.setUserId=function(e){t.userId=String(e)},t.prototype.addReaction=function(e,n){var r=this,o=i.default.make("div",t.CSS.reactionContainer),s=i.default.make("div",t.CSS.emoji,{textContent:e});s.addEventListener("click",function(){return r.reactionClicked(n)});var a=i.default.make("span",t.CSS.votes,{textContent:0});return o.append(s),o.append(a),this.nodes.container.append(o),{emoji:s,counter:a}},t.prototype.reactionClicked=function(e){this.update({userId:t.userId,reaction:e}),this.saveValue(e,void 0!==this.picked)},t.prototype.vote=function(t){var e=+this.reactions[t].counter.textContent+1;this.reactions[t].counter.textContent=e.toString()},t.prototype.unvote=function(t){var e=+this.reactions[t].counter.textContent-1;this.reactions[t].counter.textContent=e.toString()},t.prototype.createTitle=function(e){return i.default.make("span",t.CSS.title,{textContent:e})},t.prototype.saveValue=function(e,n){var r={type:n?"vote":"unvote",reaction:e.toString(),id:this.id,userId:t.userId};t.socket.send(r)},t.prototype.update=function(e){if(e.options&&this.setOptions(e.options),e.userId===t.userId){if(!e.reaction)return this.applyVotedStyles(),void a.default.removeItem(this.getStorageKey());if(void 0===this.picked)return this.picked=+e.reaction,this.applyVotedStyles(this.picked),void(e.options||this.vote(+e.reaction));if(this.picked!==e.reaction){var n=this.picked;return this.picked=+e.reaction,e.options||(this.unvote(n),this.vote(this.picked)),void this.applyVotedStyles(this.picked)}e.options||(this.applyVotedStyles(),this.unvote(+e.reaction),this.picked=void 0)}},t.prototype.applyVotedStyles=function(e){Object.values(this.reactions).forEach(function(e){var n=e.emoji,r=e.counter;n.classList.remove(t.CSS.picked),r.classList.remove(t.CSS.votesPicked)}),e&&(this.reactions[e].emoji.classList.add(t.CSS.picked),this.reactions[e].counter.classList.add(t.CSS.votesPicked))},t.prototype.setOptions=function(t){for(var e in this.reactions){var n=+t[e];void 0!==n&&(this.reactions[e].counter.textContent=n.toString())}},Object.defineProperty(t.prototype,"picked",{get:function(){return this._picked},set:function(t){a.default.setItem(this.getStorageKey(),t),this._picked=t},enumerable:!0,configurable:!0}),t.prototype.getStorageKey=function(){return"User:"+t.userId+":PickedOn:"+this.id.toString()},t.prototype.getEmojiHash=function(t){for(var e=1,n=0;n<t.length;n++)e+=3*e+t.codePointAt(n);return e},t.userId=a.default.getItem("reactionsUserId")||s.default.getRandomValue().toString(),t.socket=new r.default("https://reactions.ifmo.su/"),t}();e.default=c},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(30),i=function(t){function e(e){var n=t.call(this)||this;return n.socket=o(e),n.socket.on("message",function(t){return n.message(t)}),n}return r(e,t),e.prototype.send=function(t){t.origin=location.origin,this.socket.send(t)},e.prototype.message=function(t){this.emit("message",t)},e}(n(56));e.default=i},function(t,e,n){var r=n(31),o=n(6),i=n(13),s=n(1)("socket.io-client");t.exports=e=c;var a=e.managers={};function c(t,e){"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,o=r(t),c=o.source,u=o.id,f=o.path,h=a[u]&&f in a[u].nsps;return e.forceNew||e["force new connection"]||!1===e.multiplex||h?(s("ignoring socket cache for %s",c),n=i(c,e)):(a[u]||(s("new io instance for %s",c),a[u]=i(c,e)),n=a[u]),o.query&&!e.query&&(e.query=o.query),n.socket(o.path,e)}e.protocol=o.protocol,e.connect=c,e.Manager=n(13),e.Socket=n(19)},function(t,e,n){(function(e){var r=n(10),o=n(1)("socket.io-client:url");t.exports=function(t,n){var i=t;n=n||e.location,null==t&&(t=n.protocol+"//"+n.host);"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(o("protocol-less url %s",t),t=void 0!==n?n.protocol+"//"+t:"https://"+t),o("parse %s",t),i=r(t));i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443"));i.path=i.path||"/";var s=-1!==i.host.indexOf(":")?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+s+":"+i.port,i.href=i.protocol+"://"+s+(n&&n.port===i.port?"":":"+i.port),i}}).call(this,n(0))},function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(t){r=s}}();var c,u=[],f=!1,h=-1;function p(){f&&c&&(f=!1,c.length?u=c.concat(u):h=-1,u.length&&l())}function l(){if(!f){var t=a(p);f=!0;for(var e=u.length;e;){for(c=u,u=[];++h<e;)c&&c[h].run();h=-1,e=u.length}c=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function y(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new d(t,e)),1!==u.length||f||a(l)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e,n){function r(t){var n;function r(){if(r.enabled){var t=r,o=+new Date,i=o-(n||o);t.diff=i,t.prev=n,t.curr=o,n=o;for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&s.unshift("%O");var c=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;c++;var o=e.formatters[r];if("function"==typeof o){var i=s[c];n=o.call(t,i),s.splice(c,1),c--}return n}),e.formatArgs.call(t,s),(r.log||e.log||console.log.bind(console)).apply(t,s)}}return r.namespace=t,r.enabled=e.enabled(t),r.useColors=e.useColors(),r.color=function(t){var n,r=0;for(n in t)r=(r<<5)-r+t.charCodeAt(n),r|=0;return e.colors[Math.abs(r)%e.colors.length]}(t),r.destroy=o,"function"==typeof e.init&&e.init(r),e.instances.push(r),r}function o(){var t=e.instances.indexOf(this);return-1!==t&&(e.instances.splice(t,1),!0)}(e=t.exports=r.debug=r.default=r).coerce=function(t){return t instanceof Error?t.stack||t.message:t},e.disable=function(){e.enable("")},e.enable=function(t){var n;e.save(t),e.names=[],e.skips=[];var r=("string"==typeof t?t:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&("-"===(t=r[n].replace(/\*/g,".*?"))[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")));for(n=0;n<e.instances.length;n++){var i=e.instances[n];i.enabled=e.enabled(i.namespace)}},e.enabled=function(t){if("*"===t[t.length-1])return!0;var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1},e.humanize=n(34),e.instances=[],e.names=[],e.skips=[],e.formatters={}},function(t,e){var n=1e3,r=60*n,o=60*r,i=24*o,s=365.25*i;function a(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}t.exports=function(t,e){e=e||{};var c=typeof t;if("string"===c&&t.length>0)return function(t){if((t=String(t)).length>100)return;var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(!e)return;var a=parseFloat(e[1]);switch((e[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*s;case"days":case"day":case"d":return a*i;case"hours":case"hour":case"hrs":case"hr":case"h":return a*o;case"minutes":case"minute":case"mins":case"min":case"m":return a*r;case"seconds":case"second":case"secs":case"sec":case"s":return a*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}(t);if("number"===c&&!1===isNaN(t))return e.long?function(t){return a(t,i,"day")||a(t,o,"hour")||a(t,r,"minute")||a(t,n,"second")||t+" ms"}(t):function(t){if(t>=i)return Math.round(t/i)+"d";if(t>=o)return Math.round(t/o)+"h";if(t>=r)return Math.round(t/r)+"m";if(t>=n)return Math.round(t/n)+"s";return t+"ms"}(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,n){(function(t){var r=n(11),o=n(12),i=Object.prototype.toString,s="function"==typeof t.Blob||"[object BlobConstructor]"===i.call(t.Blob),a="function"==typeof t.File||"[object FileConstructor]"===i.call(t.File);e.deconstructPacket=function(t){var e=[],n=t.data,i=t;return i.data=function t(e,n){if(!e)return e;if(o(e)){var i={_placeholder:!0,num:n.length};return n.push(e),i}if(r(e)){for(var s=new Array(e.length),a=0;a<e.length;a++)s[a]=t(e[a],n);return s}if("object"==typeof e&&!(e instanceof Date)){var s={};for(var c in e)s[c]=t(e[c],n);return s}return e}(n,e),i.attachments=e.length,{packet:i,buffers:e}},e.reconstructPacket=function(t,e){return t.data=function t(e,n){if(!e)return e;if(e&&e._placeholder)return n[e.num];if(r(e))for(var o=0;o<e.length;o++)e[o]=t(e[o],n);else if("object"==typeof e)for(var i in e)e[i]=t(e[i],n);return e}(t.data,e),t.attachments=void 0,t},e.removeBlobs=function(t,e){var n=0,i=t;!function t(c,u,f){if(!c)return c;if(s&&c instanceof Blob||a&&c instanceof File){n++;var h=new FileReader;h.onload=function(){f?f[u]=this.result:i=this.result,--n||e(i)},h.readAsArrayBuffer(c)}else if(r(c))for(var p=0;p<c.length;p++)t(c[p],p,c);else if("object"==typeof c&&!o(c))for(var l in c)t(c[l],l,c)}(i),n||e(i)}}).call(this,n(0))},function(t,e,n){t.exports=n(37),t.exports.parser=n(3)},function(t,e,n){(function(e){var r=n(14),o=n(2),i=n(1)("engine.io-client:socket"),s=n(18),a=n(3),c=n(10),u=n(4);function f(t,n){if(!(this instanceof f))return new f(t,n);n=n||{},t&&"object"==typeof t&&(n=t,t=null),t?(t=c(t),n.hostname=t.host,n.secure="https"===t.protocol||"wss"===t.protocol,n.port=t.port,t.query&&(n.query=t.query)):n.host&&(n.hostname=c(n.host).host),this.secure=null!=n.secure?n.secure:e.location&&"https:"===location.protocol,n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.agent=n.agent||!1,this.hostname=n.hostname||(e.location?location.hostname:"localhost"),this.port=n.port||(e.location&&location.port?location.port:this.secure?443:80),this.query=n.query||{},"string"==typeof this.query&&(this.query=u.decode(this.query)),this.upgrade=!1!==n.upgrade,this.path=(n.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!n.forceJSONP,this.jsonp=!1!==n.jsonp,this.forceBase64=!!n.forceBase64,this.enablesXDR=!!n.enablesXDR,this.timestampParam=n.timestampParam||"t",this.timestampRequests=n.timestampRequests,this.transports=n.transports||["polling","websocket"],this.transportOptions=n.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=n.policyPort||843,this.rememberUpgrade=n.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=n.onlyBinaryUpgrades,this.perMessageDeflate=!1!==n.perMessageDeflate&&(n.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=n.pfx||null,this.key=n.key||null,this.passphrase=n.passphrase||null,this.cert=n.cert||null,this.ca=n.ca||null,this.ciphers=n.ciphers||null,this.rejectUnauthorized=void 0===n.rejectUnauthorized||n.rejectUnauthorized,this.forceNode=!!n.forceNode;var r="object"==typeof e&&e;r.global===r&&(n.extraHeaders&&Object.keys(n.extraHeaders).length>0&&(this.extraHeaders=n.extraHeaders),n.localAddress&&(this.localAddress=n.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}t.exports=f,f.priorWebsocketSuccess=!1,o(f.prototype),f.protocol=a.protocol,f.Socket=f,f.Transport=n(8),f.transports=n(14),f.parser=n(3),f.prototype.createTransport=function(t){i('creating transport "%s"',t);var e=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(this.query);e.EIO=a.protocol,e.transport=t;var n=this.transportOptions[t]||{};return this.id&&(e.sid=this.id),new r[t]({query:e,socket:this,agent:n.agent||this.agent,hostname:n.hostname||this.hostname,port:n.port||this.port,secure:n.secure||this.secure,path:n.path||this.path,forceJSONP:n.forceJSONP||this.forceJSONP,jsonp:n.jsonp||this.jsonp,forceBase64:n.forceBase64||this.forceBase64,enablesXDR:n.enablesXDR||this.enablesXDR,timestampRequests:n.timestampRequests||this.timestampRequests,timestampParam:n.timestampParam||this.timestampParam,policyPort:n.policyPort||this.policyPort,pfx:n.pfx||this.pfx,key:n.key||this.key,passphrase:n.passphrase||this.passphrase,cert:n.cert||this.cert,ca:n.ca||this.ca,ciphers:n.ciphers||this.ciphers,rejectUnauthorized:n.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:n.perMessageDeflate||this.perMessageDeflate,extraHeaders:n.extraHeaders||this.extraHeaders,forceNode:n.forceNode||this.forceNode,localAddress:n.localAddress||this.localAddress,requestTimeout:n.requestTimeout||this.requestTimeout,protocols:n.protocols||void 0})},f.prototype.open=function(){var t;if(this.rememberUpgrade&&f.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},f.prototype.setTransport=function(t){i("setting transport %s",t.name);var e=this;this.transport&&(i("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},f.prototype.probe=function(t){i('probing transport "%s"',t);var e=this.createTransport(t,{probe:1}),n=!1,r=this;function o(){if(r.onlyBinaryUpgrades){var o=!this.supportsBinary&&r.transport.supportsBinary;n=n||o}n||(i('probe transport "%s" opened',t),e.send([{type:"ping",data:"probe"}]),e.once("packet",function(o){if(!n)if("pong"===o.type&&"probe"===o.data){if(i('probe transport "%s" pong',t),r.upgrading=!0,r.emit("upgrading",e),!e)return;f.priorWebsocketSuccess="websocket"===e.name,i('pausing current transport "%s"',r.transport.name),r.transport.pause(function(){n||"closed"!==r.readyState&&(i("changing transport and sending upgrade packet"),p(),r.setTransport(e),e.send([{type:"upgrade"}]),r.emit("upgrade",e),e=null,r.upgrading=!1,r.flush())})}else{i('probe transport "%s" failed',t);var s=new Error("probe error");s.transport=e.name,r.emit("upgradeError",s)}}))}function s(){n||(n=!0,p(),e.close(),e=null)}function a(n){var o=new Error("probe error: "+n);o.transport=e.name,s(),i('probe transport "%s" failed because of error: %s',t,n),r.emit("upgradeError",o)}function c(){a("transport closed")}function u(){a("socket closed")}function h(t){e&&t.name!==e.name&&(i('"%s" works - aborting "%s"',t.name,e.name),s())}function p(){e.removeListener("open",o),e.removeListener("error",a),e.removeListener("close",c),r.removeListener("close",u),r.removeListener("upgrading",h)}f.priorWebsocketSuccess=!1,e.once("open",o),e.once("error",a),e.once("close",c),this.once("close",u),this.once("upgrading",h),e.open()},f.prototype.onOpen=function(){if(i("socket open"),this.readyState="open",f.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){i("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},f.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(i('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else i('packet received with socket readyState "%s"',this.readyState)},f.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},f.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},f.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){i("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},f.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},f.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},f.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(i("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},f.prototype.write=f.prototype.send=function(t,e,n){return this.sendPacket("message",t,e,n),this},f.prototype.sendPacket=function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}},f.prototype.close=function(){if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var t=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():e()}):this.upgrading?r():e()}function e(){t.onClose("forced close"),i("socket closing - telling transport to close"),t.transport.close()}function n(){t.removeListener("upgrade",n),t.removeListener("upgradeError",n),e()}function r(){t.once("upgrade",n),t.once("upgradeError",n)}return this},f.prototype.onError=function(t){i("socket error %j",t),f.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},f.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){i('socket close with reason: "%s"',t);clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),this.writeBuffer=[],this.prevBufferLen=0}},f.prototype.filterUpgrades=function(t){for(var e=[],n=0,r=t.length;n<r;n++)~s(this.transports,t[n])&&e.push(t[n]);return e}}).call(this,n(0))},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}},function(t,e,n){(function(e){var r=n(7),o=n(15),i=n(2),s=n(5),a=n(1)("engine.io-client:polling-xhr");function c(){}function u(t){if(o.call(this,t),this.requestTimeout=t.requestTimeout,this.extraHeaders=t.extraHeaders,e.location){var n="https:"===location.protocol,r=location.port;r||(r=n?443:80),this.xd=t.hostname!==e.location.hostname||r!==t.port,this.xs=t.secure!==n}}function f(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function h(){for(var t in f.requests)f.requests.hasOwnProperty(t)&&f.requests[t].abort()}t.exports=u,t.exports.Request=f,s(u,o),u.prototype.supportsBinary=!0,u.prototype.request=function(t){return(t=t||{}).uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new f(t)},u.prototype.doWrite=function(t,e){var n="string"!=typeof t&&void 0!==t,r=this.request({method:"POST",data:t,isBinary:n}),o=this;r.on("success",e),r.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=r},u.prototype.doPoll=function(){a("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},i(f.prototype),f.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var n=this.xhr=new r(t),o=this;try{a("xhr open %s: %s",this.method,this.uri),n.open(this.method,this.uri,this.async);try{if(this.extraHeaders)for(var i in n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0),this.extraHeaders)this.extraHeaders.hasOwnProperty(i)&&n.setRequestHeader(i,this.extraHeaders[i])}catch(t){}if("POST"===this.method)try{this.isBinary?n.setRequestHeader("Content-type","application/octet-stream"):n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{n.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in n&&(n.withCredentials=!0),this.requestTimeout&&(n.timeout=this.requestTimeout),this.hasXDR()?(n.onload=function(){o.onLoad()},n.onerror=function(){o.onError(n.responseText)}):n.onreadystatechange=function(){if(2===n.readyState)try{var t=n.getResponseHeader("Content-Type");o.supportsBinary&&"application/octet-stream"===t&&(n.responseType="arraybuffer")}catch(t){}4===n.readyState&&(200===n.status||1223===n.status?o.onLoad():setTimeout(function(){o.onError(n.status)},0))},a("xhr data %s",this.data),n.send(this.data)}catch(t){return void setTimeout(function(){o.onError(t)},0)}e.document&&(this.index=f.requestsCount++,f.requests[this.index]=this)},f.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},f.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},f.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},f.prototype.cleanup=function(t){if(void 0!==this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=c:this.xhr.onreadystatechange=c,t)try{this.xhr.abort()}catch(t){}e.document&&delete f.requests[this.index],this.xhr=null}},f.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type")}catch(t){}t="application/octet-stream"===e&&this.xhr.response||this.xhr.responseText}catch(t){this.onError(t)}null!=t&&this.onData(t)},f.prototype.hasXDR=function(){return void 0!==e.XDomainRequest&&!this.xs&&this.enablesXDR},f.prototype.abort=function(){this.cleanup()},f.requestsCount=0,f.requests={},e.document&&(e.attachEvent?e.attachEvent("onunload",h):e.addEventListener&&e.addEventListener("beforeunload",h,!1))}).call(this,n(0))},function(t,e){t.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var r in t)n.call(t,r)&&e.push(r);return e}},function(t,e,n){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var r=n(42),o=n(43),i=n(44);function s(){return c.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(s()<e)throw new RangeError("Invalid typed array length");return c.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=c.prototype:(null===t&&(t=new c(e)),t.length=e),t}function c(t,e,n){if(!(c.TYPED_ARRAY_SUPPORT||this instanceof c))return new c(t,e,n);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return h(this,t)}return u(this,t,e,n)}function u(t,e,n,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,n,r){if(e.byteLength,n<0||e.byteLength<n)throw new RangeError("'offset' is out of bounds");if(e.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");e=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r);c.TYPED_ARRAY_SUPPORT?(t=e).__proto__=c.prototype:t=p(t,e);return t}(t,e,n,r):"string"==typeof e?function(t,e,n){"string"==typeof n&&""!==n||(n="utf8");if(!c.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|d(e,n),o=(t=a(t,r)).write(e,n);o!==r&&(t=t.slice(0,o));return t}(t,e,n):function(t,e){if(c.isBuffer(e)){var n=0|l(e.length);return 0===(t=a(t,n)).length?t:(e.copy(t,0,0,n),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||function(t){return t!=t}(e.length)?a(t,0):p(t,e);if("Buffer"===e.type&&i(e.data))return p(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function f(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function h(t,e){if(f(e),t=a(t,e<0?0:0|l(e)),!c.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)t[n]=0;return t}function p(t,e){var n=e.length<0?0:0|l(e.length);t=a(t,n);for(var r=0;r<n;r+=1)t[r]=255&e[r];return t}function l(t){if(t>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|t}function d(t,e){if(c.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return M(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return q(t).length;default:if(r)return M(t).length;e=(""+e).toLowerCase(),r=!0}}function y(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function g(t,e,n,r,o){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof e&&(e=c.from(e,r)),c.isBuffer(e))return 0===e.length?-1:m(t,e,n,r,o);if("number"==typeof e)return e&=255,c.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):m(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function m(t,e,n,r,o){var i,s=1,a=t.length,c=e.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;s=2,a/=2,c/=2,n/=2}function u(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(o){var f=-1;for(i=n;i<a;i++)if(u(t,i)===u(e,-1===f?0:i-f)){if(-1===f&&(f=i),i-f+1===c)return f*s}else-1!==f&&(i-=i-f),f=-1}else for(n+c>a&&(n=a-c),i=n;i>=0;i--){for(var h=!0,p=0;p<c;p++)if(u(t,i+p)!==u(e,p)){h=!1;break}if(h)return i}return-1}function v(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r))>o&&(r=o):r=o;var i=e.length;if(i%2!=0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var s=0;s<r;++s){var a=parseInt(e.substr(2*s,2),16);if(isNaN(a))return s;t[n+s]=a}return s}function b(t,e,n,r){return Y(M(e,t.length-n),t,n,r)}function w(t,e,n,r){return Y(function(t){for(var e=[],n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}(e),t,n,r)}function k(t,e,n,r){return w(t,e,n,r)}function C(t,e,n,r){return Y(q(e),t,n,r)}function A(t,e,n,r){return Y(function(t,e){for(var n,r,o,i=[],s=0;s<t.length&&!((e-=2)<0);++s)n=t.charCodeAt(s),r=n>>8,o=n%256,i.push(o),i.push(r);return i}(e,t.length-n),t,n,r)}function x(t,e,n){return 0===e&&n===t.length?r.fromByteArray(t):r.fromByteArray(t.slice(e,n))}function E(t,e,n){n=Math.min(t.length,n);for(var r=[],o=e;o<n;){var i,s,a,c,u=t[o],f=null,h=u>239?4:u>223?3:u>191?2:1;if(o+h<=n)switch(h){case 1:u<128&&(f=u);break;case 2:128==(192&(i=t[o+1]))&&(c=(31&u)<<6|63&i)>127&&(f=c);break;case 3:i=t[o+1],s=t[o+2],128==(192&i)&&128==(192&s)&&(c=(15&u)<<12|(63&i)<<6|63&s)>2047&&(c<55296||c>57343)&&(f=c);break;case 4:i=t[o+1],s=t[o+2],a=t[o+3],128==(192&i)&&128==(192&s)&&128==(192&a)&&(c=(15&u)<<18|(63&i)<<12|(63&s)<<6|63&a)>65535&&c<1114112&&(f=c)}null===f?(f=65533,h=1):f>65535&&(f-=65536,r.push(f>>>10&1023|55296),f=56320|1023&f),r.push(f),o+=h}return function(t){var e=t.length;if(e<=_)return String.fromCharCode.apply(String,t);var n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=_));return n}(r)}e.Buffer=c,e.SlowBuffer=function(t){+t!=t&&(t=0);return c.alloc(+t)},e.INSPECT_MAX_BYTES=50,c.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=s(),c.poolSize=8192,c._augment=function(t){return t.__proto__=c.prototype,t},c.from=function(t,e,n){return u(null,t,e,n)},c.TYPED_ARRAY_SUPPORT&&(c.prototype.__proto__=Uint8Array.prototype,c.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&c[Symbol.species]===c&&Object.defineProperty(c,Symbol.species,{value:null,configurable:!0})),c.alloc=function(t,e,n){return function(t,e,n,r){return f(e),e<=0?a(t,e):void 0!==n?"string"==typeof r?a(t,e).fill(n,r):a(t,e).fill(n):a(t,e)}(null,t,e,n)},c.allocUnsafe=function(t){return h(null,t)},c.allocUnsafeSlow=function(t){return h(null,t)},c.isBuffer=function(t){return!(null==t||!t._isBuffer)},c.compare=function(t,e){if(!c.isBuffer(t)||!c.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,r=e.length,o=0,i=Math.min(n,r);o<i;++o)if(t[o]!==e[o]){n=t[o],r=e[o];break}return n<r?-1:r<n?1:0},c.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(t,e){if(!i(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return c.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var r=c.allocUnsafe(e),o=0;for(n=0;n<t.length;++n){var s=t[n];if(!c.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(r,o),o+=s.length}return r},c.byteLength=d,c.prototype._isBuffer=!0,c.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)y(this,e,e+1);return this},c.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},c.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},c.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?E(this,0,t):function(t,e,n){var r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return R(this,e,n);case"utf8":case"utf-8":return E(this,e,n);case"ascii":return S(this,e,n);case"latin1":case"binary":return B(this,e,n);case"base64":return x(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}.apply(this,arguments)},c.prototype.equals=function(t){if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===c.compare(this,t)},c.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(t+=" ... ")),"<Buffer "+t+">"},c.prototype.compare=function(t,e,n,r,o){if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),e<0||n>t.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&e>=n)return 0;if(r>=o)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,r>>>=0,o>>>=0,this===t)return 0;for(var i=o-r,s=n-e,a=Math.min(i,s),u=this.slice(r,o),f=t.slice(e,n),h=0;h<a;++h)if(u[h]!==f[h]){i=u[h],s=f[h];break}return i<s?-1:s<i?1:0},c.prototype.includes=function(t,e,n){return-1!==this.indexOf(t,e,n)},c.prototype.indexOf=function(t,e,n){return g(this,t,e,n,!0)},c.prototype.lastIndexOf=function(t,e,n){return g(this,t,e,n,!1)},c.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-e;if((void 0===n||n>o)&&(n=o),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return v(this,t,e,n);case"utf8":case"utf-8":return b(this,t,e,n);case"ascii":return w(this,t,e,n);case"latin1":case"binary":return k(this,t,e,n);case"base64":return C(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,e,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var _=4096;function S(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(127&t[o]);return r}function B(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function R(t,e,n){var r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=e;i<n;++i)o+=D(t[i]);return o}function T(t,e,n){for(var r=t.slice(e,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function P(t,e,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function O(t,e,n,r,o,i){if(!c.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function U(t,e,n,r){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-n,2);o<i;++o)t[n+o]=(e&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function I(t,e,n,r){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-n,4);o<i;++o)t[n+o]=e>>>8*(r?o:3-o)&255}function j(t,e,n,r,o,i){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function F(t,e,n,r,i){return i||j(t,0,n,4),o.write(t,e,n,r,23,4),n+4}function N(t,e,n,r,i){return i||j(t,0,n,8),o.write(t,e,n,r,52,8),n+8}c.prototype.slice=function(t,e){var n,r=this.length;if(t=~~t,e=void 0===e?r:~~e,t<0?(t+=r)<0&&(t=0):t>r&&(t=r),e<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t),c.TYPED_ARRAY_SUPPORT)(n=this.subarray(t,e)).__proto__=c.prototype;else{var o=e-t;n=new c(o,void 0);for(var i=0;i<o;++i)n[i]=this[i+t]}return n},c.prototype.readUIntLE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r},c.prototype.readUIntBE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=this[t+--e],o=1;e>0&&(o*=256);)r+=this[t+--e]*o;return r},c.prototype.readUInt8=function(t,e){return e||P(t,1,this.length),this[t]},c.prototype.readUInt16LE=function(t,e){return e||P(t,2,this.length),this[t]|this[t+1]<<8},c.prototype.readUInt16BE=function(t,e){return e||P(t,2,this.length),this[t]<<8|this[t+1]},c.prototype.readUInt32LE=function(t,e){return e||P(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},c.prototype.readUInt32BE=function(t,e){return e||P(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},c.prototype.readIntLE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r>=(o*=128)&&(r-=Math.pow(2,8*e)),r},c.prototype.readIntBE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=e,o=1,i=this[t+--r];r>0&&(o*=256);)i+=this[t+--r]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*e)),i},c.prototype.readInt8=function(t,e){return e||P(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},c.prototype.readInt16LE=function(t,e){e||P(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},c.prototype.readInt16BE=function(t,e){e||P(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},c.prototype.readInt32LE=function(t,e){return e||P(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},c.prototype.readInt32BE=function(t,e){return e||P(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},c.prototype.readFloatLE=function(t,e){return e||P(t,4,this.length),o.read(this,t,!0,23,4)},c.prototype.readFloatBE=function(t,e){return e||P(t,4,this.length),o.read(this,t,!1,23,4)},c.prototype.readDoubleLE=function(t,e){return e||P(t,8,this.length),o.read(this,t,!0,52,8)},c.prototype.readDoubleBE=function(t,e){return e||P(t,8,this.length),o.read(this,t,!1,52,8)},c.prototype.writeUIntLE=function(t,e,n,r){(t=+t,e|=0,n|=0,r)||O(this,t,e,n,Math.pow(2,8*n)-1,0);var o=1,i=0;for(this[e]=255&t;++i<n&&(o*=256);)this[e+i]=t/o&255;return e+n},c.prototype.writeUIntBE=function(t,e,n,r){(t=+t,e|=0,n|=0,r)||O(this,t,e,n,Math.pow(2,8*n)-1,0);var o=n-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+n},c.prototype.writeUInt8=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,1,255,0),c.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},c.prototype.writeUInt16LE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):U(this,t,e,!0),e+2},c.prototype.writeUInt16BE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):U(this,t,e,!1),e+2},c.prototype.writeUInt32LE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):I(this,t,e,!0),e+4},c.prototype.writeUInt32BE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):I(this,t,e,!1),e+4},c.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);O(this,t,e,n,o-1,-o)}var i=0,s=1,a=0;for(this[e]=255&t;++i<n&&(s*=256);)t<0&&0===a&&0!==this[e+i-1]&&(a=1),this[e+i]=(t/s>>0)-a&255;return e+n},c.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);O(this,t,e,n,o-1,-o)}var i=n-1,s=1,a=0;for(this[e+i]=255&t;--i>=0&&(s*=256);)t<0&&0===a&&0!==this[e+i+1]&&(a=1),this[e+i]=(t/s>>0)-a&255;return e+n},c.prototype.writeInt8=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,1,127,-128),c.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},c.prototype.writeInt16LE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):U(this,t,e,!0),e+2},c.prototype.writeInt16BE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):U(this,t,e,!1),e+2},c.prototype.writeInt32LE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,4,2147483647,-2147483648),c.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):I(this,t,e,!0),e+4},c.prototype.writeInt32BE=function(t,e,n){return t=+t,e|=0,n||O(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),c.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):I(this,t,e,!1),e+4},c.prototype.writeFloatLE=function(t,e,n){return F(this,t,e,!0,n)},c.prototype.writeFloatBE=function(t,e,n){return F(this,t,e,!1,n)},c.prototype.writeDoubleLE=function(t,e,n){return N(this,t,e,!0,n)},c.prototype.writeDoubleBE=function(t,e,n){return N(this,t,e,!1,n)},c.prototype.copy=function(t,e,n,r){if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var o,i=r-n;if(this===t&&n<e&&e<r)for(o=i-1;o>=0;--o)t[o+e]=this[o+n];else if(i<1e3||!c.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+n];else Uint8Array.prototype.set.call(t,this.subarray(n,n+i),e);return i},c.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!c.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;var i;if(e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0),"number"==typeof t)for(i=e;i<n;++i)this[i]=t;else{var s=c.isBuffer(t)?t:M(new c(t,r).toString()),a=s.length;for(i=0;i<n-e;++i)this[i+e]=s[i%a]}return this};var L=/[^+\/0-9A-Za-z-_]/g;function D(t){return t<16?"0"+t.toString(16):t.toString(16)}function M(t,e){var n;e=e||1/0;for(var r=t.length,o=null,i=[],s=0;s<r;++s){if((n=t.charCodeAt(s))>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(s+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=65536+(o-55296<<10|n-56320)}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function q(t){return r.toByteArray(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(L,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function Y(t,e,n,r){for(var o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}}).call(this,n(0))},function(t,e,n){"use strict";e.byteLength=function(t){var e=u(t),n=e[0],r=e[1];return 3*(n+r)/4-r},e.toByteArray=function(t){for(var e,n=u(t),r=n[0],s=n[1],a=new i(function(t,e,n){return 3*(e+n)/4-n}(0,r,s)),c=0,f=s>0?r-4:r,h=0;h<f;h+=4)e=o[t.charCodeAt(h)]<<18|o[t.charCodeAt(h+1)]<<12|o[t.charCodeAt(h+2)]<<6|o[t.charCodeAt(h+3)],a[c++]=e>>16&255,a[c++]=e>>8&255,a[c++]=255&e;2===s&&(e=o[t.charCodeAt(h)]<<2|o[t.charCodeAt(h+1)]>>4,a[c++]=255&e);1===s&&(e=o[t.charCodeAt(h)]<<10|o[t.charCodeAt(h+1)]<<4|o[t.charCodeAt(h+2)]>>2,a[c++]=e>>8&255,a[c++]=255&e);return a},e.fromByteArray=function(t){for(var e,n=t.length,o=n%3,i=[],s=0,a=n-o;s<a;s+=16383)i.push(h(t,s,s+16383>a?a:s+16383));1===o?(e=t[n-1],i.push(r[e>>2]+r[e<<4&63]+"==")):2===o&&(e=(t[n-2]<<8)+t[n-1],i.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"="));return i.join("")};for(var r=[],o=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,c=s.length;a<c;++a)r[a]=s[a],o[s.charCodeAt(a)]=a;function u(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");return-1===n&&(n=e),[n,n===e?0:4-n%4]}function f(t){return r[t>>18&63]+r[t>>12&63]+r[t>>6&63]+r[63&t]}function h(t,e,n){for(var r,o=[],i=e;i<n;i+=3)r=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(255&t[i+2]),o.push(f(r));return o.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},function(t,e){e.read=function(t,e,n,r,o){var i,s,a=8*o-r-1,c=(1<<a)-1,u=c>>1,f=-7,h=n?o-1:0,p=n?-1:1,l=t[e+h];for(h+=p,i=l&(1<<-f)-1,l>>=-f,f+=a;f>0;i=256*i+t[e+h],h+=p,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=r;f>0;s=256*s+t[e+h],h+=p,f-=8);if(0===i)i=1-u;else{if(i===c)return s?NaN:1/0*(l?-1:1);s+=Math.pow(2,r),i-=u}return(l?-1:1)*s*Math.pow(2,i-r)},e.write=function(t,e,n,r,o,i){var s,a,c,u=8*i-o-1,f=(1<<u)-1,h=f>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,l=r?0:i-1,d=r?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=f):(s=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-s))<1&&(s--,c*=2),(e+=s+h>=1?p/c:p*Math.pow(2,1-h))*c>=2&&(s++,c/=2),s+h>=f?(a=0,s=f):s+h>=1?(a=(e*c-1)*Math.pow(2,o),s+=h):(a=e*Math.pow(2,h-1)*Math.pow(2,o),s=0));o>=8;t[n+l]=255&a,l+=d,a/=256,o-=8);for(s=s<<o|a,u+=o;u>0;t[n+l]=255&s,l+=d,s/=256,u-=8);t[n+l-d]|=128*y}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e){t.exports=function(t,e,n){var r=t.byteLength;if(e=e||0,n=n||r,t.slice)return t.slice(e,n);if(e<0&&(e+=r),n<0&&(n+=r),n>r&&(n=r),e>=r||e>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(n-e),s=e,a=0;s<n;s++,a++)i[a]=o[s];return i.buffer}},function(t,e){function n(){}t.exports=function(t,e,r){var o=!1;return r=r||n,i.count=t,0===t?e():i;function i(t,n){if(i.count<=0)throw new Error("after called too many times");--i.count,t?(o=!0,e(t),e=r):0!==i.count||o||e(null,n)}}},function(t,e){
/*! https://mths.be/utf8js v2.1.2 by @mathias */
var n,r,o,i=String.fromCharCode;function s(t){for(var e,n,r=[],o=0,i=t.length;o<i;)(e=t.charCodeAt(o++))>=55296&&e<=56319&&o<i?56320==(64512&(n=t.charCodeAt(o++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--):r.push(e);return r}function a(t,e){if(t>=55296&&t<=57343){if(e)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value");return!1}return!0}function c(t,e){return i(t>>e&63|128)}function u(t,e){if(0==(4294967168&t))return i(t);var n="";return 0==(4294965248&t)?n=i(t>>6&31|192):0==(4294901760&t)?(a(t,e)||(t=65533),n=i(t>>12&15|224),n+=c(t,6)):0==(4292870144&t)&&(n=i(t>>18&7|240),n+=c(t,12),n+=c(t,6)),n+=i(63&t|128)}function f(){if(o>=r)throw Error("Invalid byte index");var t=255&n[o];if(o++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function h(t){var e,i;if(o>r)throw Error("Invalid byte index");if(o==r)return!1;if(e=255&n[o],o++,0==(128&e))return e;if(192==(224&e)){if((i=(31&e)<<6|f())>=128)return i;throw Error("Invalid continuation byte")}if(224==(240&e)){if((i=(15&e)<<12|f()<<6|f())>=2048)return a(i,t)?i:65533;throw Error("Invalid continuation byte")}if(240==(248&e)&&(i=(7&e)<<18|f()<<12|f()<<6|f())>=65536&&i<=1114111)return i;throw Error("Invalid UTF-8 detected")}t.exports={version:"2.1.2",encode:function(t,e){for(var n=!1!==(e=e||{}).strict,r=s(t),o=r.length,i=-1,a="";++i<o;)a+=u(r[i],n);return a},decode:function(t,e){var a=!1!==(e=e||{}).strict;n=s(t),r=n.length,o=0;for(var c,u=[];!1!==(c=h(a));)u.push(c);return function(t){for(var e,n=t.length,r=-1,o="";++r<n;)(e=t[r])>65535&&(o+=i((e-=65536)>>>10&1023|55296),e=56320|1023&e),o+=i(e);return o}(u)}}},function(t,e){!function(){"use strict";for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=new Uint8Array(256),r=0;r<t.length;r++)n[t.charCodeAt(r)]=r;e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3==2?i=i.substring(0,i.length-1)+"=":o%3==1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,r,o,i,s,a=.75*t.length,c=t.length,u=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var f=new ArrayBuffer(a),h=new Uint8Array(f);for(e=0;e<c;e+=4)r=n[t.charCodeAt(e)],o=n[t.charCodeAt(e+1)],i=n[t.charCodeAt(e+2)],s=n[t.charCodeAt(e+3)],h[u++]=r<<2|o>>4,h[u++]=(15&o)<<4|i>>2,h[u++]=(3&i)<<6|63&s;return f}}()},function(t,e){var n=void 0!==n?n:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder&&MozBlobBuilder,r=function(){try{return 2===new Blob(["hi"]).size}catch(t){return!1}}(),o=r&&function(){try{return 2===new Blob([new Uint8Array([1,2])]).size}catch(t){return!1}}(),i=n&&n.prototype.append&&n.prototype.getBlob;function s(t){return t.map(function(t){if(t.buffer instanceof ArrayBuffer){var e=t.buffer;if(t.byteLength!==e.byteLength){var n=new Uint8Array(t.byteLength);n.set(new Uint8Array(e,t.byteOffset,t.byteLength)),e=n.buffer}return e}return t})}function a(t,e){e=e||{};var r=new n;return s(t).forEach(function(t){r.append(t)}),e.type?r.getBlob(e.type):r.getBlob()}function c(t,e){return new Blob(s(t),e||{})}"undefined"!=typeof Blob&&(a.prototype=Blob.prototype,c.prototype=Blob.prototype),t.exports=r?o?Blob:c:i?a:void 0},function(t,e,n){(function(e){var r=n(15),o=n(5);t.exports=u;var i,s=/\n/g,a=/\\n/g;function c(){}function u(t){r.call(this,t),this.query=this.query||{},i||(e.___eio||(e.___eio=[]),i=e.___eio),this.index=i.length;var n=this;i.push(function(t){n.onData(t)}),this.query.j=this.index,e.document&&e.addEventListener&&e.addEventListener("beforeunload",function(){n.script&&(n.script.onerror=c)},!1)}o(u,r),u.prototype.supportsBinary=!1,u.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),r.prototype.doClose.call(this)},u.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e,"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},u.prototype.doWrite=function(t,e){var n=this;if(!this.form){var r,o=document.createElement("form"),i=document.createElement("textarea"),c=this.iframeId="eio_iframe_"+this.index;o.className="socketio",o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",o.target=c,o.method="POST",o.setAttribute("accept-charset","utf-8"),i.name="d",o.appendChild(i),document.body.appendChild(o),this.form=o,this.area=i}function u(){f(),e()}function f(){if(n.iframe)try{n.form.removeChild(n.iframe)}catch(t){n.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+n.iframeId+'">';r=document.createElement(t)}catch(t){(r=document.createElement("iframe")).name=n.iframeId,r.src="javascript:0"}r.id=n.iframeId,n.form.appendChild(r),n.iframe=r}this.form.action=this.uri(),f(),t=t.replace(a,"\\\n"),this.area.value=t.replace(s,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===n.iframe.readyState&&u()}:this.iframe.onload=u}}).call(this,n(0))},function(t,e,n){(function(e){var r,o=n(8),i=n(3),s=n(4),a=n(5),c=n(17),u=n(1)("engine.io-client:websocket"),f=e.WebSocket||e.MozWebSocket;if("undefined"==typeof window)try{r=n(53)}catch(t){}var h=f;function p(t){t&&t.forceBase64&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=f&&!t.forceNode,this.protocols=t.protocols,this.usingBrowserWebSocket||(h=r),o.call(this,t)}h||"undefined"!=typeof window||(h=r),t.exports=p,a(p,o),p.prototype.name="websocket",p.prototype.supportsBinary=!0,p.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=this.protocols,n={agent:this.agent,perMessageDeflate:this.perMessageDeflate};n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket?e?new h(t,e):new h(t):new h(t,e,n)}catch(t){return this.emit("error",t)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},p.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},p.prototype.write=function(t){var n=this;this.writable=!1;for(var r=t.length,o=0,s=r;o<s;o++)!function(t){i.encodePacket(t,n.supportsBinary,function(o){if(!n.usingBrowserWebSocket){var i={};if(t.options&&(i.compress=t.options.compress),n.perMessageDeflate)("string"==typeof o?e.Buffer.byteLength(o):o.length)<n.perMessageDeflate.threshold&&(i.compress=!1)}try{n.usingBrowserWebSocket?n.ws.send(o):n.ws.send(o,i)}catch(t){u("websocket closed before onclose event")}--r||a()})}(t[o]);function a(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}},p.prototype.onClose=function(){o.prototype.onClose.call(this)},p.prototype.doClose=function(){void 0!==this.ws&&this.ws.close()},p.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";return this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||(t.b64=1),(t=s.encode(t)).length&&(t="?"+t),e+"://"+(-1!==this.hostname.indexOf(":")?"["+this.hostname+"]":this.hostname)+n+this.path+t},p.prototype.check=function(){return!(!h||"__initialize"in h&&this.name===p.prototype.name)}}).call(this,n(0))},function(t,e){},function(t,e){t.exports=function(t,e){for(var n=[],r=(e=e||0)||0;r<t.length;r++)n[r-e]=t[r];return n}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var o={emitDelay:10,strictMode:!1},i=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?o:arguments[0];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=void 0,r=void 0;n=e.hasOwnProperty("emitDelay")?e.emitDelay:o.emitDelay,this._emitDelay=n,r=e.hasOwnProperty("strictMode")?e.strictMode:o.strictMode,this._strictMode=r,this._listeners={},this.events=[]}return r(t,[{key:"_addListenner",value:function(t,e,n){if("function"!=typeof e)throw TypeError("listener must be a function");-1===this.events.indexOf(t)?(this._listeners[t]=[{once:n,fn:e}],this.events.push(t)):this._listeners[t].push({once:n,fn:e})}},{key:"on",value:function(t,e){this._addListenner(t,e,!1)}},{key:"once",value:function(t,e){this._addListenner(t,e,!0)}},{key:"off",value:function(t,e){var n=this,r=this.events.indexOf(t);t&&-1!==r&&(e?function(){var o=[],i=n._listeners[t];i.forEach(function(t,n){t.fn===e&&o.unshift(n)}),o.forEach(function(t){i.splice(t,1)}),i.length||(n.events.splice(r,1),delete n._listeners[t])}():(delete this._listeners[t],this.events.splice(r,1)))}},{key:"_applyEvents",value:function(t,e){var n=this._listeners[t];if(n&&n.length){var r=[];n.forEach(function(t,n){t.fn.apply(null,e),t.once&&r.unshift(n)}),r.forEach(function(t){n.splice(t,1)})}else if(this._strictMode)throw"No listeners specified for event: "+t}},{key:"emit",value:function(t){for(var e=this,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];this._emitDelay?setTimeout(function(){e._applyEvents.call(e,t,r)},this._emitDelay):this._applyEvents(t,r)}},{key:"emitSync",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];this._applyEvents(t,n)}},{key:"destroy",value:function(){this._listeners={},this.events=[]}}]),t}();t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){this.id=t||this.getURL()}return t.prototype.getURL=function(){return document.location.host+document.location.pathname},t.prototype.toJSON=function(){return String(this.id)},t.prototype.toString=function(){return String(this.id)},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.make=function(t,e,n){var r,o=document.createElement(t);for(var i in e&&(Array.isArray(e)?(r=o.classList).add.apply(r,e):o.classList.add(e)),n)n.hasOwnProperty(i)&&(o[i]=n[i]);return o},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.getRandomValue=function(){return window.crypto.getRandomValues(new Uint32Array(1))[0]},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.getInt=function(e){var n=parseInt(t.getItem(e),10);return isNaN(n)?void 0:n},t.getItem=function(t){return localStorage.getItem(t.toString())||void 0},t.setItem=function(t,e){localStorage.setItem(t.toString(),String(e))},t.removeItem=function(t){localStorage.removeItem(t.toString())},t}();e.default=r}]).default});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Plugins filter on editor landing page
 */

module.exports = function () {
  /**
   * Block plugins
   */
  var blockTools;
  /**
   * Inline Tool plugins
   */

  var inlineTools;
  /**
   * Initialize module
   * @typedef {Object} settings                             - module's parameters passed from ModuleDispatcher
   * @param   {String} settings.blockToolsClass             - class of Editor Block Tools
   * @param   {String} settings.inlineToolsClass            - class of Editor Inline Tools
   * @param   {String} settings.blockFilterButtonClass      - class of button Block Tools filter
   * @param   {String} settings.inlineFilterButtonClass     - class of button Inline Tools filter
   * @param   {String} settings.allToolsFilterButtonClass   - class of button showing all types of Tools
   */

  var init = function init(settings) {
    blockTools = document.querySelectorAll(settings.blockToolsClass);
    inlineTools = document.querySelectorAll(settings.inlineToolsClass);
    var pluginFilters = [{
      'buttonClass': settings.blockFilterButtonClass,
      'buttonAction': showBlockToolsOnly
    }, {
      'buttonClass': settings.inlineFilterButtonClass,
      'buttonAction': showInlineToolsOnly
    }, {
      'buttonClass': settings.allToolsFilterButtonClass,
      'buttonAction': showAllPlugins
    }];
    /**
     * Add event listener if filter button exists, otherwise show console message
     */

    for (var j = 0; j < pluginFilters.length; j++) {
      var filterButton = document.querySelector(pluginFilters[j].buttonClass);
      var buttonClass = pluginFilters[j].buttonClass;
      var filterAction = pluginFilters[j].buttonAction;

      if (filterButton) {
        filterButton.addEventListener('click', filterAction);
      } else {
        console.warn('Can\'t find button with class: «' + buttonClass + '»');
      }
    }
  };
  /**
   * Show only Inline Tools, hide Blocks
   */


  var showInlineToolsOnly = function showInlineToolsOnly() {
    toggleTools(inlineTools, blockTools);
  };
  /**
   * Show only Blocks, hide Inline Tools
   */


  var showBlockToolsOnly = function showBlockToolsOnly() {
    toggleTools(blockTools, inlineTools);
  };
  /**
   * Show all types of Editor Tools
   */


  var showAllPlugins = function showAllPlugins() {
    toggleTools(inlineTools, blockTools, false);
  };
  /**
   * Toggle Editor Block and Inline Tools into view
   * @param {HTMLCollection} toolsToShow - Block or Inline Editor's Tools to show
   * @param {HTMLCollection} toolsToHide - Block or Inline Editor's Tools to hide
   * @param {Boolean} hideOneType        - pass false to show both Block and Inline Tools
   */


  var toggleTools = function toggleTools(toolsToShow, toolsToHide) {
    var hideOneType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    for (var i = 0; i < toolsToHide.length; i++) {
      toolsToHide[i].classList.toggle('hide', hideOneType);
    }

    for (var _i = 0; _i < toolsToShow.length; _i++) {
      toolsToShow[_i].classList.toggle('hide', false);
    }
  };

  return {
    init: init
  };
}({});

/***/ })
/******/ ]);
=======
 */e.exports=(o=function(e){"object"!==(void 0===e?"undefined":u(e))&&i("Passed element is not an object");var t=e.dataset.link||e.href,n=e.dataset.appLink;s(n,t)},r=function(e){e||i("Can not open app, because appLink is undefined");var t=document.createElement("iframe");t.style.display="none",document.body.appendChild(t),null!==t&&(t.src=e)},s=function(e,t){var n=!1;window.addEventListener("pagehide",function(){n=!0},!1),window.addEventListener("blur",function(){n=!0},!1),r(e),setTimeout(function(){n||a(t)},100)},a=function(e){e||i("Can not open page because link is undefined"),window.open(e,"_blank")},i=function(e){throw Error("[Deeplinker] "+e)},{click:o,init:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".deeplinker",t=document.querySelectorAll(e);t.length&&Array.prototype.slice.call(t).forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),o(e)})})},tryToOpenApp:r})}])},function(e,t,n){"use strict";var o,r,s,a,i,u;e.exports=(s=function(){u(r,o)},a=function(){u(o,r)},i=function(){u(r,o,!1)},u=function(e,t){for(var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=0;o<t.length;o++)t[o].classList.toggle("hide",n);for(var r=0;r<e.length;r++)e[r].classList.toggle("hide",!1)},{init:function(e){o=document.querySelectorAll(e.blockToolsClass),r=document.querySelectorAll(e.inlineToolsClass);for(var t=[{buttonClass:e.blockFilterButtonClass,buttonAction:a},{buttonClass:e.inlineFilterButtonClass,buttonAction:s},{buttonClass:e.allToolsFilterButtonClass,buttonAction:i}],n=0;n<t.length;n++){var u=document.querySelector(t[n].buttonClass),l=t[n].buttonClass,c=t[n].buttonAction;u?u.addEventListener("click",c):console.warn("Can't find button with class: «"+l+"»")}}})}]);
>>>>>>> dfe73aa79381f22a881ab92142b8786ee54ab8be
