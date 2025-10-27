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
/******/ 		"codex": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"editor":"editor"}[chunkId]||chunkId) + ".bundle.js?h=" + "88a16897968953a541d8" + ""
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
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
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
/******/ 				document.head.appendChild(script);
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
/******/ 	var jsonpArray = window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/app/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@codexteam/ajax/dist/main.js":
/*!***************************************************!*\
  !*** ./node_modules/@codexteam/ajax/dist/main.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){var r=n(2),o=setTimeout;function i(){}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function u(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,a._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void s(t.promise,e)}c(t.promise,r)}else(1===e._state?c:s)(t.promise,e._value)})):e._deferreds.push(t)}function c(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void l(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,f(e)}catch(t){s(e,t)}}function s(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,c(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}}a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(i);return u(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},a.prototype.finally=r.a,a.all=function(e){return new a(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var o=r.length;function i(e,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var u=a.then;if("function"==typeof u)return void u.call(a,function(t){i(e,t)},n)}r[e]=a,0==--o&&t(r)}catch(e){n(e)}}for(var a=0;a<r.length;a++)i(a,r[a])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,n){n(e)})},a.race=function(e){return new a(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},a._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){o(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.a=a}).call(this,n(5).setImmediate)},function(e,t,n){"use strict";t.a=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n(4);var o=n(8),i=function(){var e={URLENCODED:"application/x-www-form-urlencoded; charset=utf-8",FORM:"multipart/form-data",JSON:"application/json; charset=utf-8"},t=function(e){return new Promise(function(t,n){e=a(e),e=u(e);var r=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP");r.open(e.method,e.url),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(e.headers).forEach(function(t){var n=e.headers[t];r.setRequestHeader(t,n)});var o=e.ratio;r.upload.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),r=Math.ceil(n*o/100);e.progress(r)},!1),r.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),r=Math.ceil(n*(100-o)/100)+o;e.progress(r)},!1),r.onreadystatechange=function(){if(4===r.readyState){var e=r.response;try{e=JSON.parse(e)}catch(e){}200===r.status?t(e):n(e)}},r.send(e.data)})},n=function(e){return e.method="POST",t(e)},a=function(t){if(!t.url||"string"!=typeof t.url)throw new Error("Url must be a non-empty string");if(t.method&&"string"!=typeof t.method)throw new Error("`method` must be a string or null");if(t.method=t.method?t.method.toUpperCase():"GET",t.headers&&"object"!==r(t.headers))throw new Error("`headers` must be an object or null");if(t.headers=t.headers||{},t.type&&("string"!=typeof t.type||!Object.values(e).includes(t.type)))throw new Error("`type` must be taken from module's «contentType» library");if(t.progress&&"function"!=typeof t.progress)throw new Error("`progress` must be a function or null");if(t.progress=t.progress||function(e){},t.beforeSend=t.beforeSend||function(e){},t.ratio&&"number"!=typeof t.ratio)throw new Error("`ratio` must be a number");if(t.ratio<0||t.ratio>100)throw new Error("`ratio` must be in a 0-100 interval");if(t.ratio=t.ratio||90,t.accept&&"string"!=typeof t.accept)throw new Error("`accept` must be a string with a list of allowed mime-types");if(t.accept=t.accept||"*/*",t.multiple&&"boolean"!=typeof t.multiple)throw new Error("`multiple` must be a true or false");if(t.multiple=t.multiple||!1,t.fieldName&&"string"!=typeof t.fieldName)throw new Error("`fieldName` must be a string");return t.fieldName=t.fieldName||"files",t},u=function(t){switch(t.method){case"GET":var n=c(t.data,e.URLENCODED);delete t.data,t.url=/\?/.test(t.url)?t.url+"&"+n:t.url+"?"+n;break;case"POST":case"PUT":case"DELETE":case"UPDATE":var r=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).type||e.JSON}(t);(o.isFormData(t.data)||o.isFormElement(t.data))&&(r=e.FORM),t.data=c(t.data,r),r!==i.contentType.FORM&&(t.headers["content-type"]=r)}return t},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch(arguments.length>1?arguments[1]:void 0){case e.URLENCODED:return o.urlEncode(t);case e.JSON:return o.jsonEncode(t);case e.FORM:return o.formEncode(t);default:return t}};return{contentType:e,request:t,get:function(e){return e.method="GET",t(e)},post:n,transport:function(e){return e=a(e),o.transport(e).then(function(t){return o.isObject(e.data)&&Object.keys(e.data).forEach(function(n){var r=e.data[n];t.append(n,r)}),e.data=t,n(e)})}}}();e.exports=i},function(e,t,n){"use strict";n.r(t);var r=n(1);window.Promise=window.Promise||r.a},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(6),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o=1,i={},a=!1,u=e.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(e);c=c&&c.setTimeout?c:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick(function(){f(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&f(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),r=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){f(e.data)},r=function(t){e.port2.postMessage(t)}}():u&&"onreadystatechange"in u.createElement("script")?function(){var e=u.documentElement;r=function(t){var n=u.createElement("script");n.onreadystatechange=function(){f(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():r=function(e){setTimeout(f,0,e)},c.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var a={callback:e,args:t};return i[o]=a,r(o),o++},c.clearImmediate=s}function s(e){delete i[e]}function f(e){if(a)setTimeout(f,0,e);else{var t=i[e];if(t){a=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{s(e),a=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(7))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,s=[],f=!1,l=-1;function d(){f&&c&&(f=!1,c.length?s=c.concat(s):l=-1,s.length&&p())}function p(){if(!f){var e=u(d);f=!0;for(var t=s.length;t;){for(c=s,s=[];++l<t;)c&&c[l].run();l=-1,t=s.length}c=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new m(e,t)),1!==s.length||f||u(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=n(9);e.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,t,n){t&&r(e.prototype,t),n&&r(e,n)}(e,null,[{key:"urlEncode",value:function(e){return o(e)}},{key:"jsonEncode",value:function(e){return JSON.stringify(e)}},{key:"formEncode",value:function(e){if(this.isFormData(e))return e;if(this.isFormElement(e))return new FormData(e);if(this.isObject(e)){var t=new FormData;return Object.keys(e).forEach(function(n){var r=e[n];t.append(n,r)}),t}throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement")}},{key:"isObject",value:function(e){return"[object Object]"===Object.prototype.toString.call(e)}},{key:"isFormData",value:function(e){return e instanceof FormData}},{key:"isFormElement",value:function(e){return e instanceof HTMLFormElement}},{key:"transport",value:function(e){return new Promise(function(t,n){var r=document.createElement("INPUT");r.type="file",e.multiple&&r.setAttribute("multiple","multiple"),e.accept&&r.setAttribute("accept",e.accept),r.addEventListener("change",function(n){for(var r=n.target.files,o=new FormData,i=0;i<r.length;i++)o.append(e.fieldName,r[i],r[i].name);e.beforeSend(r),t(o)},!1),r.click()})}}]),e}()},function(e,t){var n=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,escape).replace(/%20/g,"+")},r=function(e,t,o,i){return t=t||null,o=o||"&",i=i||null,e?function(e){for(var t=new Array,n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t}(Object.keys(e).map(function(a){var u,c=a;if(i&&(c=i+"["+c+"]"),"object"==typeof e[a]&&null!==e[a])u=r(e[a],null,o,c);else{t&&(c=function(e){return!isNaN(parseFloat(e))&&isFinite(e)}(c)?t+Number(c):c);var s=e[a];s=(s=0===(s=!1===(s=!0===s?"1":s)?"0":s)?"0":s)||"",u=n(c)+"="+n(s)}return u})).join(o).replace(/[!'()*]/g,""):""};e.exports=r}])});

/***/ }),

/***/ "./node_modules/@codexteam/deeplinker/dist/deeplinker.js":
/*!***************************************************************!*\
  !*** ./node_modules/@codexteam/deeplinker/dist/deeplinker.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():undefined}(window,function(){return function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var o,r,i,u,c,f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};
/**
 * Helps to set link with custom protocol (to open apps) and usual link (for webpages) to a button
 *
 * @author Taly Guryn <https://github.com/talyguryn>
 * @license MIT
 */e.exports=(o=function(e){"object"!==(void 0===e?"undefined":f(e))&&c("Passed element is not an object");var n=e.dataset.link||e.href,t=e.dataset.appLink;i(t,n)},r=function(e){e||c("Can not open app, because appLink is undefined");var n=document.createElement("iframe");n.style.display="none",document.body.appendChild(n),null!==n&&(n.src=e)},i=function(e,n){var t=!1;window.addEventListener("pagehide",function(){t=!0},!1),window.addEventListener("blur",function(){t=!0},!1),r(e),setTimeout(function(){t||u(n)},100)},u=function(e){e||c("Can not open page because link is undefined"),window.open(e,"_blank")},c=function(e){throw Error("[Deeplinker] "+e)},{click:o,init:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".deeplinker",n=document.querySelectorAll(e);n.length&&Array.prototype.slice.call(n).forEach(function(e){e.addEventListener("click",function(n){n.preventDefault(),o(e)})})},tryToOpenApp:r})}])});

/***/ }),

/***/ "./node_modules/codex-notifier/dist/bundle.js":
/*!****************************************************!*\
  !*** ./node_modules/codex-notifier/dist/bundle.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){"use strict";n(1),
/*!
 * Codex JavaScript Notification module
 * https://github.com/codex-team/js-notifier
 */
t.exports=function(){var t=n(6),e="cdx-notify--bounce-in",o=null;return{show:function(n){if(n.message){!function(){if(o)return!0;o=t.getWrapper(),document.body.appendChild(o)}();var r=null,i=n.time||8e3;switch(n.type){case"confirm":r=t.confirm(n);break;case"prompt":r=t.prompt(n);break;default:r=t.alert(n),window.setTimeout(function(){r.remove()},i)}o.appendChild(r),r.classList.add(e)}}}}()},function(t,e,n){var o=n(2);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(4)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,'.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:\'\';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:\'\';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}',""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[n].concat(i).concat([r]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var o,r,i={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),c=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),s=null,f=0,d=[],u=n(5);function l(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=i[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(h(o.parts[a],e))}else{var c=[];for(a=0;a<o.parts.length;a++)c.push(h(o.parts[a],e));i[o.id]={id:o.id,refs:1,parts:c}}}}function p(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],c={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(c):n.push(o[a]={id:a,parts:[c]})}return n}function b(t,e){var n=c(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=d[d.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),d.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=c(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,r)}}function m(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=d.indexOf(t);e>=0&&d.splice(e,1)}function x(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),y(e,t.attrs),b(t,e),e}function y(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function h(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var a=f++;n=s||(s=x(e)),o=_.bind(null,n,a,!1),r=_.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),b(t,e),e}(e),o=function(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=u(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),c=t.href;t.href=URL.createObjectURL(a),c&&URL.revokeObjectURL(c)}.bind(null,n,e),r=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=x(e),o=function(t,e){var n=e.css,o=e.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){m(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return l(n,e),function(t){for(var o=[],r=0;r<n.length;r++){var a=n[r];(c=i[a.id]).refs--,o.push(c)}t&&l(p(t,e),e);for(r=0;r<o.length;r++){var c;if(0===(c=o[r]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete i[c.id]}}}};var v,g=(v=[],function(t,e){return v[t]=e,v.filter(Boolean).join("\n")});function _(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(t,e,n){"use strict";var o,r,i,a,c,s,f,d,u;t.exports=(o="cdx-notifies",r="cdx-notify",i="cdx-notify__cross",a="cdx-notify__button--confirm",c="cdx-notify__button--cancel",s="cdx-notify__input",f="cdx-notify__button",d="cdx-notify__btns-wrapper",{alert:u=function(t){var e=document.createElement("DIV"),n=document.createElement("DIV"),o=t.message,a=t.style;return e.classList.add(r),a&&e.classList.add(r+"--"+a),e.innerHTML=o,n.classList.add(i),n.addEventListener("click",e.remove.bind(e)),e.appendChild(n),e},confirm:function(t){var e=u(t),n=document.createElement("div"),o=document.createElement("button"),r=document.createElement("button"),s=e.querySelector("."+i),l=t.cancelHandler,p=t.okHandler;return n.classList.add(d),o.innerHTML=t.okText||"Confirm",r.innerHTML=t.cancelText||"Cancel",o.classList.add(f),r.classList.add(f),o.classList.add(a),r.classList.add(c),l&&"function"==typeof l&&(r.addEventListener("click",l),s.addEventListener("click",l)),p&&"function"==typeof p&&o.addEventListener("click",p),o.addEventListener("click",e.remove.bind(e)),r.addEventListener("click",e.remove.bind(e)),n.appendChild(o),n.appendChild(r),e.appendChild(n),e},prompt:function(t){var e=u(t),n=document.createElement("div"),o=document.createElement("button"),r=document.createElement("input"),c=e.querySelector("."+i),l=t.cancelHandler,p=t.okHandler;return n.classList.add(d),o.innerHTML=t.okText||"Ok",o.classList.add(f),o.classList.add(a),r.classList.add(s),t.placeholder&&r.setAttribute("placeholder",t.placeholder),t.default&&(r.value=t.default),t.inputType&&(r.type=t.inputType),l&&"function"==typeof l&&c.addEventListener("click",l),p&&"function"==typeof p&&o.addEventListener("click",function(){p(r.value)}),o.addEventListener("click",e.remove.bind(e)),n.appendChild(r),n.appendChild(o),e.appendChild(n),e},getWrapper:function(){var t=document.createElement("DIV");return t.classList.add(o),t}})}])});

/***/ }),

/***/ "./node_modules/module-dispatcher/lib/moduleDispatcher.js":
/*!****************************************************************!*\
  !*** ./node_modules/module-dispatcher/lib/moduleDispatcher.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * CodeX Module Dispatcher — Initialize frontend Modules from the DOM without inline scripts
 * 
 * @copyright CodeX Team <team@ifmo.su>
 * @license MIT https://github.com/codex-team/dispatcher/LICENSE
 * @author @polinashneider https://github.com/polinashneider
 * @version 2.0.0
 */
!function(e,t){ true?module.exports=t():undefined}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t){var n=t.name,o=t.element,s=t.settings,i=t.moduleClass;r(this,e),this.name=n,this.element=o,this.settings=s,this.moduleClass=i}return s(e,[{key:"init",value:function(){try{console.assert(this.moduleClass.init instanceof Function,"Module «"+this.name+"» should implement init method"),this.moduleClass.init instanceof Function&&(this.moduleClass.init(this.settings,this.element),console.log("Module «"+this.name+"» initialized"))}catch(e){console.warn("Module «"+this.name+"» was not initialized because of ",e)}}},{key:"destroy",value:function(){this.moduleClass.destroy instanceof Function&&(this.moduleClass.destroy(),console.log("Module «"+this.name+"» destroyed."))}}]),e}(),u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r(this,e),this.Library=t.Library||window,this.modules=this.findModules(document),this.initModules()}return s(e,[{key:"findModules",value:function(e){for(var t=[],n=e.querySelectorAll("[data-module]"),r=n.length-1;r>=0;r--)t.push.apply(t,o(this.extractModulesData(n[r])));return t}},{key:"extractModulesData",value:function(e){var t=this,n=[],o=e.dataset.module;return o=o.replace(/\s+/," "),o.split(" ").forEach(function(o,r){var s=new i({name:o,element:e,settings:t.getModuleSettings(e,r,o),moduleClass:t.Library[o]});n.push(s)}),n}},{key:"getModuleSettings",value:function(e,t,n){var o=e.querySelector('textarea[name="module-settings"]'),r=void 0;if(!o)return null;try{r=o.value.trim(),r=JSON.parse(r)}catch(e){return console.warn("Can not parse Module «"+n+"» settings because of: "+e),console.groupCollapsed(n+" settings"),console.log(r),console.groupEnd(),null}return Array.isArray(r)?r[t]?r[t]:null:0===t?r:(console.warn("Wrong settings format. For several Modules use an array instead of object."),null)}},{key:"initModules",value:function(){console.groupCollapsed("ModuleDispatcher"),this.modules.forEach(function(e){e.init()}),console.groupEnd()}}]),e}();t.default=u}]).default});

/***/ }),

/***/ "./public/app/css/main.css":
/*!*********************************!*\
  !*** ./public/app/css/main.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./public/app/js/classes/cPreview.js":
/*!*******************************************!*\
  !*** ./public/app/js/classes/cPreview.js ***!
  \*******************************************/
/*! no static exports found */
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

    string = string.replace(/"(paragraph|quote|list|header|linkTool|code|image|delimiter|rawTool|table|embed)"/g, '"<span class=sc_toolname>$1</span>"');
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

/***/ "./public/app/js/main.js":
/*!*******************************!*\
  !*** ./public/app/js/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _moduleDispatcher = __webpack_require__(/*! module-dispatcher */ "./node_modules/module-dispatcher/lib/moduleDispatcher.js");

var _moduleDispatcher2 = _interopRequireDefault(_moduleDispatcher);

var _editorLanding = __webpack_require__(/*! ./modules/editorLanding */ "./public/app/js/modules/editorLanding.js");

var _editorLanding2 = _interopRequireDefault(_editorLanding);

var _articleCreate = __webpack_require__(/*! ./modules/articleCreate */ "./public/app/js/modules/articleCreate.js");

var _articleCreate2 = _interopRequireDefault(_articleCreate);

var _newsCreate = __webpack_require__(/*! ./modules/newsCreate */ "./public/app/js/modules/newsCreate.js");

var _newsCreate2 = _interopRequireDefault(_newsCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Import Dispatcher for Frontend Modules initialization
 */
__webpack_require__(/*! ../css/main.css */ "./public/app/css/main.css");
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
  new _moduleDispatcher2["default"]({
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
    var Player = __webpack_require__(/*! ./modules/player */ "./public/app/js/modules/player.js")["default"];

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


codex.admin = __webpack_require__(/*! ./modules/admin */ "./public/app/js/modules/admin.js");
codex.join = __webpack_require__(/*! ./modules/join */ "./public/app/js/modules/join.js");
/**
 * Modules
 */

codex.core = __webpack_require__(/*! ./modules/core */ "./public/app/js/modules/core.js");
codex.dragndrop = __webpack_require__(/*! ./modules/dragndrop */ "./public/app/js/modules/dragndrop.js");
codex.scrollUp = __webpack_require__(/*! ./modules/scrollUp */ "./public/app/js/modules/scrollUp.js");
codex.sharer = __webpack_require__(/*! ./modules/sharer */ "./public/app/js/modules/sharer.js");
codex.developer = __webpack_require__(/*! ./modules/bestDevelopers */ "./public/app/js/modules/bestDevelopers.js"); // codex.simpleCode = require('./modules/simpleCodeStyling');

codex.showMoreNews = __webpack_require__(/*! ./modules/showMoreNews */ "./public/app/js/modules/showMoreNews.js");
codex.polyfills = __webpack_require__(/*! ./modules/polyfills */ "./public/app/js/modules/polyfills.js");
codex.ajax = __webpack_require__(/*! ./modules/ajax */ "./public/app/js/modules/ajax.js");
codex.profile = __webpack_require__(/*! ./modules/profile */ "./public/app/js/modules/profile.js");
codex.helpers = __webpack_require__(/*! ./modules/helpers */ "./public/app/js/modules/helpers.js");
codex.quiz = __webpack_require__(/*! ./modules/quiz */ "./public/app/js/modules/quiz.js");
codex.quizForm = __webpack_require__(/*! ./modules/quizForm */ "./public/app/js/modules/quizForm.js");
codex.transport = __webpack_require__(/*! ./modules/transport */ "./public/app/js/modules/transport.js");
codex.vkWidget = __webpack_require__(/*! ./modules/vkWidget */ "./public/app/js/modules/vkWidget.js");
codex.codeStyling = __webpack_require__(/*! ./modules/codeStyling */ "./public/app/js/modules/codeStyling.js");
codex.deeplinker = __webpack_require__(/*! @codexteam/deeplinker */ "./node_modules/@codexteam/deeplinker/dist/deeplinker.js");
codex.pluginsFilter = __webpack_require__(/*! ./modules/pluginsFilter */ "./public/app/js/modules/pluginsFilter.js");
codex.editorLanding = new _editorLanding2["default"]();
codex.articleCreate = new _articleCreate2["default"]();
codex.newsCreate = new _newsCreate2["default"]();
module.exports = codex;

/***/ }),

/***/ "./public/app/js/modules/admin.js":
/*!****************************************!*\
  !*** ./public/app/js/modules/admin.js ***!
  \****************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/ajax.js":
/*!***************************************!*\
  !*** ./public/app/js/modules/ajax.js ***!
  \***************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/articleCreate.js":
/*!************************************************!*\
  !*** ./public/app/js/modules/articleCreate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ajax = __webpack_require__(/*! @codexteam/ajax */ "./node_modules/@codexteam/ajax/dist/main.js");

var notifier = __webpack_require__(/*! codex-notifier */ "./node_modules/codex-notifier/dist/bundle.js");
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
        blocks: this.getArticleData(),
        autofocus: true
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
        })["catch"](function (err) {
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
      return __webpack_require__.e(/*! import() | editor */ "editor").then(__webpack_require__.t.bind(null, /*! classes/editor */ "./public/app/js/classes/editor.js", 7)).then(function (_ref) {
        var Editor = _ref["default"];
        return new Editor(settings);
      });
    }
  }]);

  return EditorWriting;
}();

exports["default"] = EditorWriting;
;

/***/ }),

/***/ "./public/app/js/modules/bestDevelopers.js":
/*!*************************************************!*\
  !*** ./public/app/js/modules/bestDevelopers.js ***!
  \*************************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/codeStyling.js":
/*!**********************************************!*\
  !*** ./public/app/js/modules/codeStyling.js ***!
  \**********************************************/
/*! no static exports found */
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

  var $ = __webpack_require__(/*! ./dom */ "./public/app/js/modules/dom.js")["default"];
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
    return Promise.all([$.loadResource('JS', library.js, 'highlight'), $.loadResource('CSS', library.css, 'highlight')])["catch"](function (err) {
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

/***/ "./public/app/js/modules/core.js":
/*!***************************************!*\
  !*** ./public/app/js/modules/core.js ***!
  \***************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/dom.js":
/*!**************************************!*\
  !*** ./public/app/js/modules/dom.js ***!
  \**************************************/
/*! no static exports found */
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

exports["default"] = DOM;

/***/ }),

/***/ "./public/app/js/modules/dragndrop.js":
/*!********************************************!*\
  !*** ./public/app/js/modules/dragndrop.js ***!
  \********************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/editorLanding.js":
/*!************************************************!*\
  !*** ./public/app/js/modules/editorLanding.js ***!
  \************************************************/
/*! no static exports found */
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

var cPreview = __webpack_require__(/*! ../classes/cPreview */ "./public/app/js/classes/cPreview.js");
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

      var dataSample = [{
        type: 'header',
        data: {
          text: 'Editor.js',
          level: 2
        }
      }, {
        type: 'paragraph',
        data: {
          text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
        }
      }, {
        type: 'header',
        data: {
          text: 'Key features',
          level: 3
        }
      }, {
        type: 'list',
        data: {
          items: ['It is a block-styled editor', 'It returns clean data output in JSON', 'Designed to be extendable and pluggable with a simple API'],
          style: 'unordered'
        }
      }, {
        type: 'header',
        data: {
          text: 'What does it mean «block-styled editor»',
          level: 3
        }
      }, {
        type: 'paragraph',
        data: {
          text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
        }
      }, {
        type: 'paragraph',
        data: {
          text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
        }
      }, {
        type: 'header',
        data: {
          text: 'What does it mean clean data output',
          level: 3
        }
      }, {
        type: 'paragraph',
        data: {
          text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
        }
      }, {
        type: 'paragraph',
        data: {
          text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
        }
      }, {
        type: 'paragraph',
        data: {
          text: 'Clean data is useful to sanitize, validate and process on the backend.'
        }
      }, {
        type: 'delimiter',
        data: {}
      }, {
        type: 'paragraph',
        data: {
          text: 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it\'s core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
        }
      }, {
        type: 'image',
        data: {
          file: {
            url: 'https://codex.so/public/app/img/external/codex2x.png'
          },
          caption: '',
          stretched: false,
          withBorder: false,
          withBackground: false
        }
      }];
      this.loadEditor({
        blocks: dataSample,
        // blocks: editorLandingSettings.blocks,

        /**
         * Need to focus editor
         */
        autofocus: false,

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
          _this.previewData(); // this.editor.focus();

        },

        /**
         * Override some default Editor config properties
         */
        editorConfigOverride: {
          tools: {
            image: {
              config: {
                /**
                 * Custom uploader
                 */
                uploader: {
                  /**
                   * Fake "Upload file to the server" and return an uploaded image url
                   * @param {File} file - file selected from the device or pasted by drag-n-drop
                   * @return {Promise.<{success, file: {url}}>}
                   */
                  uploadByFile: function uploadByFile(file) {
                    return new Promise(function (resolve, reject) {
                      var reader = new FileReader();
                      reader.addEventListener('load', function () {
                        setTimeout(function () {
                          resolve({
                            success: 1,
                            file: {
                              url: reader.result
                            }
                          });
                        }, 1000);
                      }, false);
                      reader.readAsDataURL(file);
                    });
                  },

                  /**
                   * Fake "Send URL-string to the server" and return an uploaded image url
                   * @param {string} url - pasted image URL
                   * @return {Promise.<{success, file: {url}}>}
                   */
                  uploadByUrl: function uploadByUrl(url) {
                    return new Promise(function (resolve, reject) {
                      setTimeout(function () {
                        resolve({
                          success: 1,
                          file: {
                            url: url
                          }
                        });
                      }, 1000);
                    });
                  }
                }
              }
            }
          }
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
      return __webpack_require__.e(/*! import() | editor */ "editor").then(__webpack_require__.t.bind(null, /*! classes/editor */ "./public/app/js/classes/editor.js", 7)).then(function (_ref) {
        var Editor = _ref["default"];
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

exports["default"] = EditorLanding;
;

/***/ }),

/***/ "./public/app/js/modules/helpers.js":
/*!******************************************!*\
  !*** ./public/app/js/modules/helpers.js ***!
  \******************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/join.js":
/*!***************************************!*\
  !*** ./public/app/js/modules/join.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ajax = __webpack_require__(/*! @codexteam/ajax */ "./node_modules/@codexteam/ajax/dist/main.js");

var notifier = __webpack_require__(/*! codex-notifier */ "./node_modules/codex-notifier/dist/bundle.js");
/**
 * Module for /join page
 * Blocks writing without authorization
 *
 * Toggles into view blankAdditionalFields: Name and Surname, Email
 */


var join = function () {
  var animationClass = 'wobble';
  var formWrapper = document.getElementById('join-form-wrapper');
  var formElement = document.getElementById('joinForm');
  var successMessageBanner = document.getElementById('success-message-banner');
  /**
  * Module initialization
  */

  var init = function init() {
    if (typeof formElement != 'undefined' && formElement !== null) {
      var formElementTextareas = formElement.getElementsByTagName('textarea');

      if (formElementTextareas.length) {
        for (var i = formElementTextareas.length - 1; i >= 0; i--) {
          formElementTextareas[i].addEventListener('keyup', checkUserCanEdit, false);
        }
      }
    }

    var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');

    if (typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton !== null) {
      blankShowAdditionalFieldsButton.addEventListener('click', showAdditionalFields, false);
    }

    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      sendForm(formElement);
    });
  };

  var sendForm = function sendForm(form) {
    /**
     * Set loading state on form wrapper
     */
    if (formWrapper) {
      formWrapper.setAttribute('data-loading', 'true');
    }

    ajax.post({
      url: '/process-join-form',
      data: new FormData(form),
      type: ajax.contentType.FORM
    }).then(function (response) {
      /**
       * Remove loading state
       */
      if (formWrapper) {
        formWrapper.setAttribute('data-loading', 'false');
      }

      if (response.success === 1) {
        /**
         * Set submitted state to hide description
         */
        if (formWrapper) {
          formWrapper.setAttribute('data-submitted', 'true');
        }

        successMessageBanner.style.display = 'block';
        formElement.style.display = 'none';
      } else {
        notifier.show({
          message: response.message,
          style: 'error'
        });
      }

      console.log(response);
    })["catch"](function (error) {
      /**
       * Remove loading state on error
       */
      if (formWrapper) {
        formWrapper.setAttribute('data-loading', 'false');
      }

      notifier.show({
        message: 'Something went wrong',
        style: 'error'
      });
      console.error(error);
    });
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

/***/ "./public/app/js/modules/newsCreate.js":
/*!*********************************************!*\
  !*** ./public/app/js/modules/newsCreate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ajax = __webpack_require__(/*! @codexteam/ajax */ "./node_modules/@codexteam/ajax/dist/main.js");

var notifier = __webpack_require__(/*! codex-notifier */ "./node_modules/codex-notifier/dist/bundle.js");

var NewsCreate =
/*#__PURE__*/
function () {
  function NewsCreate() {
    _classCallCheck(this, NewsCreate);
  }

  _createClass(NewsCreate, [{
    key: "init",

    /**
     * Initialize news form
     *
     * @param {Object} settings - news form's parameters
     * @param {HTMLElement} form – news form to submit
     * @param {string} settings.form_url - url of form with news data
     * @param {string} settings.submit_id - id of submit button
     */
    value: function init(settings, form) {
      this.form = form;
      this.button = document.getElementById(settings.submit_id);
      this.button ? this.prepareSubmit() : console.warn("Can't find button with \xAB".concat(settings.submit_id, "\xBB id"));
      this.formURL = settings.form_url;
    }
    /**
     * Add eventListener to news submit button, submit data on click
     */

  }, {
    key: "prepareSubmit",
    value: function prepareSubmit() {
      var _this = this;

      this.button.addEventListener('click', function () {
        _this.saveNews();
      }, false);
    }
    /**
     * Save news data
     */

  }, {
    key: "saveNews",
    value: function saveNews() {
      var _this2 = this;

      return ajax.post({
        url: this.formURL,
        data: this.form
      }).then(function (response) {
        /**
         * If data was sent successfully redirect to home page
         */
        if (response.success) {
          window.location.href = response.redirect;
        } else {
          _this2.showErrorMessage(response.message);
        }
      })["catch"](function (err) {
        _this2.showErrorMessage(err);
      });
    }
    /**
     * Show any error message
     *
     * @param {string} err - form submission error message
     */

  }, {
    key: "showErrorMessage",
    value: function showErrorMessage(err) {
      notifier.show({
        message: err,
        style: 'error'
      });
    }
  }]);

  return NewsCreate;
}();

exports["default"] = NewsCreate;
;

/***/ }),

/***/ "./public/app/js/modules/player.js":
/*!*****************************************!*\
  !*** ./public/app/js/modules/player.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = undefined;

var _dom = __webpack_require__(/*! ./dom */ "./public/app/js/modules/dom.js");

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

      this.overlay = _dom2["default"].make('div', this.CSS.overlay);

      var video = _dom2["default"].make('video', null, {
        autoplay: true,
        loop: true
      }),
          source = _dom2["default"].make('source', null, {
        src: this.sourceURL,
        type: 'video/mp4'
      }),
          closeButton = _dom2["default"].make('div', this.CSS.closeButton);
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

exports["default"] = Player;

/***/ }),

/***/ "./public/app/js/modules/pluginsFilter.js":
/*!************************************************!*\
  !*** ./public/app/js/modules/pluginsFilter.js ***!
  \************************************************/
/*! no static exports found */
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

/***/ }),

/***/ "./public/app/js/modules/polyfills.js":
/*!********************************************!*\
  !*** ./public/app/js/modules/polyfills.js ***!
  \********************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/profile.js":
/*!******************************************!*\
  !*** ./public/app/js/modules/profile.js ***!
  \******************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/quiz.js":
/*!***************************************!*\
  !*** ./public/app/js/modules/quiz.js ***!
  \***************************************/
/*! no static exports found */
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
        "class": 'vk',
        icon: 'icon-vkontakte'
      }, {
        title: 'Share on the Facebook',
        shareType: 'facebook',
        "class": 'fb',
        icon: 'icon-facebook-squared'
      }, {
        title: 'Tweet',
        shareType: 'twitter',
        "class": 'tw',
        icon: 'icon-twitter'
      }, {
        title: 'Forward in Telegramm',
        shareType: 'telegram',
        "class": 'tg',
        icon: 'icon-paper-plane'
      }];
      networks.map(function (current) {
        var button = UI_.createElem('span', ['but', current["class"]]),
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

/***/ "./public/app/js/modules/quizForm.js":
/*!*******************************************!*\
  !*** ./public/app/js/modules/quizForm.js ***!
  \*******************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/scrollUp.js":
/*!*******************************************!*\
  !*** ./public/app/js/modules/scrollUp.js ***!
  \*******************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/sharer.js":
/*!*****************************************!*\
  !*** ./public/app/js/modules/sharer.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/showMoreNews.js":
/*!***********************************************!*\
  !*** ./public/app/js/modules/showMoreNews.js ***!
  \***********************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/transport.js":
/*!********************************************!*\
  !*** ./public/app/js/modules/transport.js ***!
  \********************************************/
/*! no static exports found */
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

/***/ "./public/app/js/modules/vkWidget.js":
/*!*******************************************!*\
  !*** ./public/app/js/modules/vkWidget.js ***!
  \*******************************************/
/*! no static exports found */
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

/***/ })

/******/ });