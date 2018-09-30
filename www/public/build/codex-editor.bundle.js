(window["webpackJsonpcodex"] = window["webpackJsonpcodex"] || []).push([["codex-editor"],{

/***/ "./public/app/js/modules/cPreview.js":
/*!*******************************************!*\
  !*** ./public/app/js/modules/cPreview.js ***!
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

    string = string.replace(/"(paragraph|quote|list|header|link|code|image|delimiter|raw)"/g, '"<span class=sc_toolname>$1</span>"');
    /** Stylize HTML tags */

    string = string.replace(/(&lt;[\/a-z]+(&gt;)?)/gi, '<span class=sc_tag>$1</span>');
    /** Stylize strings */

    string = string.replace(/"([^"]+)"/gi, '"<span class=sc_attr>$1</span>"');
    /** Boolean/Null */

    string = string.replace(/\b(true|false|null)\b/gi, '<span class=sc_bool>$1</span>');
    return string;
  }

  return {
    show: show
  };
}({});

module.exports = cPreview;

/***/ }),

/***/ "./public/app/js/modules/editor.js":
/*!*****************************************!*\
  !*** ./public/app/js/modules/editor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CodexEditor = __webpack_require__(/*! codex.editor */ "./node_modules/codex.editor/build/codex-editor.js");
/**
 * Require module to compose output JSON preview
 */


var cPreview = __webpack_require__(/*! ./cPreview */ "./public/app/js/modules/cPreview.js");
/**
 * Load Tools for the Editor
 */


var Header = __webpack_require__(/*! codex.editor.header */ "./node_modules/codex.editor.header/dist/bundle.js");

var SimpleImage = __webpack_require__(/*! codex.editor.simple-image */ "./node_modules/codex.editor.simple-image/dist/bundle.js");

var Quote = __webpack_require__(/*! codex.editor.quote */ "./node_modules/codex.editor.quote/dist/bundle.js");

var Marker = __webpack_require__(/*! codex.editor.marker */ "./node_modules/codex.editor.marker/dist/bundle.js");

var CodeTool = __webpack_require__(/*! codex.editor.code */ "./node_modules/codex.editor.code/dist/bundle.js");

var Delimiter = __webpack_require__(/*! codex.editor.delimiter */ "./node_modules/codex.editor.delimiter/dist/bundle.js");

var InlineCode = __webpack_require__(/*! codex.editor.inline-code */ "./node_modules/codex.editor.inline-code/dist/bundle.js");

var List = __webpack_require__(/*! codex.editor.list */ "./node_modules/codex.editor.list/dist/bundle.js");
/**
 * Editor instance
 */


var ceEditor;
/**
 * Container to output saved Editor data
 */

var output;

var cdxEditor =
/*#__PURE__*/
function () {
  function cdxEditor() {
    _classCallCheck(this, cdxEditor);
  }

  _createClass(cdxEditor, [{
    key: "init",

    /**
     * Initialize Editor with settings
     * @param {Object} settings           - Editor's parameters
     * @param {String} settings.output_id - ID of container where Editor's saved data will be shown
     * @param {Object[]} settings.blocks  - Editor's blocks content
     */
    value: function init(settings) {
      var _this = this;

      /**
       * Define content of Editor's blocks
       * @type {Object|{blocks}}
       */
      var editorData = settings.blocks || this.defaultEditorData();
      /**
       * Define сontainer to output Editor saved data
       * @type {HTMLElement}
       */

      output = document.getElementById(settings.output_id);

      if (output) {
        console.log('Output target with ID: «' + settings.output_id + '» was initialized successfully');
      } else {
        console.warn('Can\'t find output target with ID: «' + settings.output_id + '»');
      }
      /**
       * Instantiate new Editor with set of Tools
       */


      ceEditor = new CodexEditor({
        tools: {
          image: SimpleImage,
          header: {
            class: Header,
            inlineToolbar: ['link', 'marker', 'bold'],
            config: {
              placeholder: 'Title'
            }
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: Quote.DEFAULT_QUOTE_PLACEHOLDER,
              captionPlaceholder: Quote.DEFAULT_CAPTION_PLACEHOLDER
            }
          },
          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+D'
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C'
          },
          marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M'
          },
          delimiter: Delimiter
        },
        data: {
          blocks: editorData
        },
        onReady: function onReady() {
          _this.prepareEditor();
        },
        onChange: function onChange() {
          _this.previewData();
        }
      });
    }
  }, {
    key: "defaultEditorData",

    /**
     * Define default Editor's data if none was passed
     * @returns {Object[]} blocks
     */
    value: function defaultEditorData() {
      return {
        blocks: [{
          type: 'header',
          data: {
            text: '',
            level: 2
          }
        }]
      };
    }
  }, {
    key: "previewData",

    /**
     * Shows JSON output of editor saved data
     */
    value: function previewData() {
      ceEditor.saver.save().then(function (savedData) {
        cPreview.show(savedData, output);
      });
    }
  }, {
    key: "prepareEditor",

    /**
     * When editor is ready, trigger click inside editor to show toolbar
     * Preview JSON output
     */
    value: function prepareEditor() {
      document.querySelector('.codex-editor__redactor').click();
      this.previewData();
    }
  }]);

  return cdxEditor;
}();

;
module.exports = new cdxEditor();

/***/ })

}]);
//# sourceMappingURL=codex-editor.bundle.js.map