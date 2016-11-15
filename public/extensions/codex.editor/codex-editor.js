/**
 * CodeX Editor
 * https://ifmo.su/editor
 * @author CodeX team team@ifmo.su
 */

"use strict";

/*jslint browser:true, devel: true*/
// jshint esnext: true

var cEditor = (function (cEditor){

    // Default settings
    cEditor.settings = {
        tools     : ['paragraph', 'header', 'picture', 'list', 'quote', 'code', 'twitter', 'instagram', 'smile'],
        textareaId: 'codex-editor',
        uploadImagesUrl: '/editor/transport/',

        // Type of block showing on empty editor
        initialBlockPlugin: "paragraph"
    };

    // Static nodes
    cEditor.nodes = {
        textarea          : null,
        wrapper           : null,
        toolbar           : null,
        inlineToolbar     : {
            wrapper : null,
            buttons : null,
            actions : null
        },
        toolbox           : null,
        notifications     : null,
        plusButton        : null,
        showSettingsButton: null,
        showTrashButton   : null,
        blockSettings     : null,
        pluginSettings    : null,
        defaultSettings   : null,
        toolbarButtons    : {}, // { type : DomEl, ... }
        redactor          : null
    };

    // Current editor state
    cEditor.state = {
        jsonOutput: [],
        blocks    : [],
        inputs    : []
    };

    /**
     * Initialization
     * @uses Promise cEditor.core.prepare
     * @param {} userSettings are :
     *          - tools [],
     *          - textareaId String
     *          ...
     */
    cEditor.start = function (userSettings) {

        // Prepare editor settings
        this.core.prepare(userSettings)

        // If all ok, make UI, bind events and parse initial-content
            .then(this.ui.make)
            .then(this.ui.addTools)
            .then(this.ui.bindEvents)
            .then(this.transport.prepare)
            // .then(this.parser.parseTextareaContent)
            .then(this.renderer.makeBlocksFromData)
            .then(this.ui.saveInputs)
            .catch(function (error) {
                cEditor.core.log('Initialization failed with error: %o', 'warn', error);
            });

    };

    return cEditor;

})({});


/**
* Redactor core methods
* Methods:
*   - init
*   - log
*   - insertAfter
*   - isDomNode
*/
cEditor.core = {

    /**
    * Editor preparing method
    * @return Promise
    */
    prepare : function (userSettings) {

        return new Promise(function(resolve, reject) {

            if ( userSettings ){

                cEditor.settings.tools = userSettings.tools || cEditor.settings.tools;

            }

            if (userSettings.data) {
                cEditor.state.blocks = userSettings.data;
            }

            cEditor.nodes.textarea = document.getElementById(userSettings.textareaId || cEditor.settings.textareaId);

            if (typeof cEditor.nodes.textarea === undefined || cEditor.nodes.textarea === null) {
                reject(Error("Textarea wasn't found by ID: #" + userSettings.textareaId));
            } else {
                resolve();
            }

        });

    },

    /**
    * Logging method
    * @param type = ['log', 'info', 'warn']
    */
    log : function (msg, type, arg) {

        type = type || 'log';

        if (!arg) {
            arg  = msg || 'undefined';
            msg  = '[codex-editor]:      %o';
        } else {
            msg  = '[codex-editor]:      ' + msg;
        }

        try{
            if ( 'console' in window && console[ type ] ){
                if ( arg ) console[ type ]( msg , arg );
                else console[ type ]( msg );
            }

        }catch(e){}

    },

    /**
    * @protected
    * Helper for insert one element after another
    */
    insertAfter : function (target, element) {
        target.parentNode.insertBefore(element, target.nextSibling);
    },

    /**
    * @const
    * Readable DOM-node types map
    */
    nodeTypes : {
        TAG     : 1,
        TEXT    : 3,
        COMMENT : 8
    },

    /**
    * @const
    * Readable keys map
    */
    keys : { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, DOWN: 40, RIGHT: 39, DELETE: 46, META: 91 },

    /**
    * @protected
    * Check object for DOM node
    */
    isDomNode : function (el) {
        return el && typeof el === 'object' && el.nodeType && el.nodeType == this.nodeTypes.TAG;
    }

};


/**
* Methods for parsing JSON reactor data to HTML blocks
*/
cEditor.renderer = {

    /**
    * Asyncronously parses input JSON to redactor blocks
    */
    makeBlocksFromData : function () {

        /**
        * If redactor is empty, add first paragraph to start writing
        */
        if (!cEditor.state.blocks.items.length) {

            cEditor.ui.addInitialBlock();
            return;

        }

        Promise.resolve()

                        /** First, get JSON from state */
                        .then(function() {
                            return cEditor.state.blocks;
                        })

                        /** Then, start to iterate they */
                        .then(cEditor.renderer.appendBlocks)

                        /** Write log if something goes wrong */
                        .catch(function(error) {
                            cEditor.core.log('Error while parsing JSON: %o', 'error', error);
                        });

    },

    /**
    * Parses JSON to blocks
    * @param {object} data
    * @return Primise -> nodeList
    */
    appendBlocks : function (data) {

        var blocks = data.items;

        /**
        * Sequence of one-by-one blocks appending
        * Uses to save blocks order after async-handler
        */
        var nodeSequence = Promise.resolve();

        for (var index = 0; index < blocks.length ; index++ ) {

            /** Add node to sequence at specified index */
            cEditor.renderer.appendNodeAtIndex(nodeSequence, blocks, index);

        }

    },

    /**
    * Append node at specified index
    */
    appendNodeAtIndex : function (nodeSequence, blocks, index) {

        /** We need to append node to sequence */
        nodeSequence

            /** first, get node async-aware */
            .then(function() {

                return cEditor.renderer.getNodeAsync(blocks , index);

            })

            /**
            * second, compose editor-block from JSON object
            */
            .then(cEditor.renderer.createBlockFromData)

            /**
            * now insert block to redactor
            */
            .then(function(blockData){

                /**
                * blockData has 'block', 'type' and 'stretched' information
                */
                cEditor.content.insertBlock(blockData);

                /** Pass created block to next step */
                return blockData.block;

            })

            /** Log if something wrong with node */
            .catch(function(error) {
                cEditor.core.log('Node skipped while parsing because %o', 'error', error);
            });

    },


    /**
    * Asynchronously returns block data from blocksList by index
    * @return Promise to node
    */
    getNodeAsync : function (blocksList, index) {

        return Promise.resolve().then(function() {

            return blocksList[index];

        });
    },

    /**
    * Creates editor block by JSON-data
    *
    * @uses render method of each plugin
    *
    * @param {object} blockData looks like
    *                            { header : {
    *                                            text: '',
    *                                            type: 'H3', ...
    *                                        }
    *                            }
    * @return {object} with type and Element
    */
    createBlockFromData : function (blockData) {

        /** New parser */
        var pluginName = blockData.type;

        /** Get first key of object that stores plugin name */
        // for (var pluginName in blockData) break;

        /** Check for plugin existance */
        if (!cEditor.tools[pluginName]) {
            throw Error(`Plugin «${pluginName}» not found`);
        }

        /** Check for plugin having render method */
        if (typeof cEditor.tools[pluginName].render != 'function') {

            throw Error(`Plugin «${pluginName}» must have «render» method`);
        }

        /** New Parser */
        var block = cEditor.tools[pluginName].render(blockData.data);

        /** Fire the render method with data */
        // var block = cEditor.tools[pluginName].render(blockData[pluginName]);

        /** is first-level block stretched */
        var stretched = cEditor.tools[pluginName].isStretched || false;

        /** Retrun type and block */
        return {
            type      : pluginName,
            block     : block,
            stretched : stretched
        };

    },

};

/**
* Methods for saving HTML blocks to JSON object
*/
cEditor.saver = {

    /**
    * Saves blocks
    * @private
    */
    saveBlocks : function () {

        /** Save html content of redactor to memory */
        cEditor.state.html = cEditor.nodes.redactor.innerHTML;

        /** Empty jsonOutput state */
        cEditor.state.jsonOutput = [];

        Promise.resolve()

                    .then(function() {
                        return cEditor.nodes.redactor.childNodes;
                    })
                    /** Making a sequence from separate blocks */
                    .then(cEditor.saver.makeQueue)

                    .then(function() {
                        // cEditor.nodes.textarea.innerHTML = cEditor.state.html;
                    })

                    .catch( function(error) {
                        console.log('Something happend');
                    });

    },

    makeQueue : function(blocks) {

        var queue = Promise.resolve();

        for(var index = 0; index < blocks.length; index++) {

            /** Add node to sequence at specified index */
            cEditor.saver.getBlockData(queue, blocks, index);

        }

    },
    /** Gets every block and makes From Data */
    getBlockData : function(queue, blocks, index) {

        queue.then(function() {
            return cEditor.saver.getNodeAsync(blocks, index);
        })

        .then(cEditor.saver.makeFormDataFromBlocks);

    },


    /**
    * Asynchronously returns block data from blocksList by index
    * @return Promise to node
    */
    getNodeAsync : function (blocksList, index) {

        return Promise.resolve().then(function() {

            return blocksList[index];

        });
    },

    makeFormDataFromBlocks : function(block) {

        var pluginName = block.dataset.type;

        /** Check for plugin existance */
        if (!cEditor.tools[pluginName]) {
            throw Error(`Plugin «${pluginName}» not found`);
        }

        /** Check for plugin having render method */
        if (typeof cEditor.tools[pluginName].save != 'function') {

            throw Error(`Plugin «${pluginName}» must have save method`);
        }

        /** Result saver */
        var blockContent = block.childNodes,
            savedData    = cEditor.tools[pluginName].save(blockContent);

        /** Marks Blocks that will be in main page */
        savedData.cover = block.classList.contains(cEditor.ui.className.BLOCK_IN_FEED_MODE);

        cEditor.state.jsonOutput.push(savedData);
    },

    /**
    * @deprecated
    * Returns Stringified JSON
    */
    getJSON : function() {

        cEditor.saver.saveBlocks();
    },

    /**
    * @deprecated
    * Returns JSON as string
    */
    getJSONString : function() {

        cEditor.saver.saveBlocks();

        setTimeout(function() {

            return cEditor.state.jsonOutput;

        }, 100);

    }

};

/**
* Methods:
*   - make
*   - addTools
*   - bindEvents
*   - addBlockHandlers
*   - saveInputs
*/

cEditor.ui = {

    className : {

        /**
        * @const {string} BLOCK_CLASSNAME - redactor blocks name
        */
        BLOCK_CLASSNAME : 'ce-block',

        /**
        * @const {String} wrapper for plugins content
        */
        BLOCK_CONTENT : 'ce-block__content',

        /**
        * @const {String} BLOCK_STRETCHED - makes block stretched
        */
        BLOCK_STRETCHED : 'ce-block--stretched',

        /**
        * @const {String} BLOCK_HIGHLIGHTED - adds background
        */
        BLOCK_HIGHLIGHTED : 'ce-block--focused',

        /**
        * @const {String} - highlights covered blocks
        */
        BLOCK_IN_FEED_MODE : 'ce-block--feed-mode',

        /**
        * @const {String} - for all default settings
        */
        SETTINGS_ITEM : 'ce-settings__item'

    },

    /**
    * @private
    * Making main interface
    */
    make : function () {

        var wrapper,
            toolbar,
            inlineToolbar,
            redactor,
            ceBlock,
            notifications,
            blockButtons,
            blockSettings,
            showSettingsButton,
            showTrashButton,
            toolbox,
            plusButton;

        /** Make editor wrapper */
        wrapper = cEditor.draw.wrapper();

        /** Append editor wrapper after initial textarea */
        cEditor.core.insertAfter(cEditor.nodes.textarea, wrapper);

        /** Append block with notifications to the document */
        notifications = cEditor.draw.alertsHolder();
        cEditor.nodes.notifications = document.body.appendChild(notifications);

        /** Make toolbar and content-editable redactor */
        toolbar               = cEditor.draw.toolbar();
        inlineToolbar         = cEditor.draw.inlineToolbar();
        plusButton            = cEditor.draw.plusButton();
        showSettingsButton    = cEditor.draw.settingsButton();
        showTrashButton       = cEditor.toolbar.settings.makeRemoveBlockButton();
        blockSettings         = cEditor.draw.blockSettings();
        blockButtons          = cEditor.draw.blockButtons();
        toolbox               = cEditor.draw.toolbox();
        redactor              = cEditor.draw.redactor();

        /** settings */
        var defaultSettings = cEditor.draw.defaultSettings(),
            pluginSettings  = cEditor.draw.pluginsSettings();

        /** Add default and plugins settings */
        blockSettings.appendChild(pluginSettings);
        blockSettings.appendChild(defaultSettings);

        /** Make blocks buttons
         * This block contains settings button and remove block button
         */
        blockButtons.appendChild(showSettingsButton);
        blockButtons.appendChild(showTrashButton);
        blockButtons.appendChild(blockSettings);

        /** Appending first-level block buttons */
        toolbar.appendChild(blockButtons);

        /** Append plus button */
        toolbar.appendChild(plusButton);

        /** Appending toolbar tools */
        toolbar.appendChild(toolbox);

        wrapper.appendChild(toolbar);

        wrapper.appendChild(redactor);

        /** Save created ui-elements to static nodes state */
        cEditor.nodes.wrapper            = wrapper;
        cEditor.nodes.toolbar            = toolbar;
        cEditor.nodes.plusButton         = plusButton;
        cEditor.nodes.toolbox            = toolbox;
        cEditor.nodes.blockSettings      = blockSettings;
        cEditor.nodes.pluginSettings     = pluginSettings;
        cEditor.nodes.defaultSettings    = defaultSettings;
        cEditor.nodes.showSettingsButton = showSettingsButton;
        cEditor.nodes.showTrashButton    = showTrashButton;

        cEditor.nodes.redactor = redactor;

        cEditor.ui.makeInlineToolbar(inlineToolbar);

        /** fill in default settings */
        cEditor.toolbar.settings.addDefaultSettings();
    },

    makeInlineToolbar : function(container) {

        /** Append to redactor new inline block */
        cEditor.nodes.inlineToolbar.wrapper = container;

        /** Draw toolbar buttons */
        cEditor.nodes.inlineToolbar.buttons = cEditor.draw.inlineToolbarButtons();

        /** Buttons action or settings */
        cEditor.nodes.inlineToolbar.actions = cEditor.draw.inlineToolbarActions();

        /** Append to inline toolbar buttons as part of it */
        cEditor.nodes.inlineToolbar.wrapper.appendChild(cEditor.nodes.inlineToolbar.buttons);
        cEditor.nodes.inlineToolbar.wrapper.appendChild(cEditor.nodes.inlineToolbar.actions);

        cEditor.nodes.wrapper.appendChild(cEditor.nodes.inlineToolbar.wrapper);
    },

    /**
    * @private
    * Append tools passed in cEditor.tools
    */
    addTools : function () {

        var tool,
            tool_button;

        /** Make toolbar buttons */
        for (var name in cEditor.tools){

            tool = cEditor.tools[name];

            if (!tool.display) {
                continue;
            }

            if (!tool.iconClassname) {
                cEditor.core.log('Toolbar icon classname missed. Tool %o skipped', 'warn', name);
                continue;
            }

            if (typeof tool.make != 'function') {
                cEditor.core.log('make method missed. Tool %o skipped', 'warn', name);
                continue;
            }

            /**
             * if tools is for toolbox
             */
            tool_button = cEditor.draw.toolbarButton(name, tool.iconClassname);

            cEditor.nodes.toolbox.appendChild(tool_button);

            /** Save tools to static nodes */
            cEditor.nodes.toolbarButtons[name] = tool_button;
        }

        /**
         * Add inline toolbar tools
         */
        cEditor.ui.addInlineToolbarTools();


    },

    addInlineToolbarTools : function() {

        var tools = {

            bold: {
                icon    : 'ce-icon-bold',
                command : 'bold'
            },

            italic: {
                icon    : 'ce-icon-italic',
                command : 'italic'
            },

            underline: {
                icon    : 'ce-icon-underline',
                command : 'underline'
            },

            link: {
                icon    : 'ce-icon-link',
                command : 'createLink',
            }
        };

        var toolButton,
            tool;

        for(var name in tools) {

            tool = tools[name];

            toolButton = cEditor.draw.toolbarButtonInline(name, tool.icon);

            cEditor.nodes.inlineToolbar.buttons.appendChild(toolButton);
            /**
             * Add callbacks to this buttons
             */
            cEditor.ui.setInlineToolbarButtonBehaviour(toolButton, tool.command);
        }

    },

    /**
    * @private
    * Bind editor UI events
    */
    bindEvents : function () {

        cEditor.core.log('ui.bindEvents fired', 'info');

        window.addEventListener('error', function (errorMsg, url, lineNumber) {
            cEditor.notifications.errorThrown(errorMsg, event);
        }, false );

        /** All keydowns on Document */
        document.addEventListener('keydown', cEditor.callback.globalKeydown, false );

        /** All keydowns on Document */
        document.addEventListener('keyup', cEditor.callback.globalKeyup, false );

        /**
        * Mouse click to radactor
        */
        cEditor.nodes.redactor.addEventListener('click', cEditor.callback.redactorClicked, false );

        /**
        * Clicks to the Plus button
        */
        cEditor.nodes.plusButton.addEventListener('click', cEditor.callback.plusButtonClicked, false);

        /**
        * Clicks to SETTINGS button in toolbar
        */
        cEditor.nodes.showSettingsButton.addEventListener('click', cEditor.callback.showSettingsButtonClicked, false );
        /**
         *  @deprecated ( but now in use for syncronization );
         *  Any redactor changes: keyboard input, mouse cut/paste, drag-n-drop text
        */
        cEditor.nodes.redactor.addEventListener('input', cEditor.callback.redactorInputEvent, false );

        /** Bind click listeners on toolbar buttons */
        for (var button in cEditor.nodes.toolbarButtons){
            cEditor.nodes.toolbarButtons[button].addEventListener('click', cEditor.callback.toolbarButtonClicked, false);
        }

    },

    addBlockHandlers : function(block) {

        if (!block) return;

        /**
        * Block keydowns
        */
        block.addEventListener('keydown', function(event) {
            cEditor.callback.blockKeydown(event, block);
        }, false);

        /**
        * Pasting content from another source
        */
        block.addEventListener('paste', function (event) {
            cEditor.callback.blockPaste(event);
        }, false);

        block.addEventListener('mouseup', function(){
            cEditor.toolbar.inline.show();
        }, false);

    },

    /** getting all contenteditable elements */
    saveInputs : function() {

        var redactor = cEditor.nodes.redactor,
            elements = [];

        /** Save all inputs in global variable state */
        cEditor.state.inputs = redactor.querySelectorAll('[contenteditable], input');
    },

    /**
    * Adds first initial block on empty redactor
    */
    addInitialBlock : function(){

        var initialBlockType = cEditor.settings.initialBlockPlugin,
            initialBlock;

        if ( !cEditor.tools[initialBlockType] ){
            cEditor.core.log('Plugin %o was not implemented and can\'t be used as initial block', 'warn', initialBlockType);
            return;
        }

        initialBlock = cEditor.tools[initialBlockType].render();

        initialBlock.setAttribute('data-placeholder', 'Write your story...');

        cEditor.content.insertBlock({
            type  : initialBlockType,
            block : initialBlock
        });

        cEditor.content.workingNodeChanged(initialBlock);

    },

    setInlineToolbarButtonBehaviour : function(button, type) {

        button.addEventListener('mousedown', function(event) {

            cEditor.toolbar.inline.toolClicked(event, type);

        }, false);
    }

};

cEditor.callback = {


    redactorSyncTimeout : null,

    globalKeydown : function(event){

        switch (event.keyCode){
            case cEditor.core.keys.TAB   : cEditor.callback.tabKeyPressed(event);       break;
            case cEditor.core.keys.ENTER : cEditor.callback.enterKeyPressed(event);     break;
            case cEditor.core.keys.ESC   : cEditor.callback.escapeKeyPressed(event);    break;
            default                      : cEditor.callback.defaultKeyPressed(event);    break;
        }

    },

    globalKeyup : function(event){

        switch (event.keyCode){
            case cEditor.core.keys.UP    :
            case cEditor.core.keys.LEFT  :
            case cEditor.core.keys.RIGHT :
            case cEditor.core.keys.DOWN  : cEditor.callback.arrowKeyPressed(event); break;
        }

    },


    tabKeyPressed : function(event){

        if ( !cEditor.toolbar.opened ) {
            cEditor.toolbar.open();
        }

        if (cEditor.toolbar.opened && !cEditor.toolbar.toolbox.opened) {
            cEditor.toolbar.toolbox.open();
        } else {
            cEditor.toolbar.toolbox.leaf();
        }

        event.preventDefault();
    },

    /**
    * ENTER key handler
    * Makes new paragraph block
    */
    enterKeyPressed : function(event){

        /** Set current node */
        var firstLevelBlocksArea = cEditor.callback.clickedOnFirstLevelBlockArea();

        if (firstLevelBlocksArea) {
            event.preventDefault();

            /**
             * it means that we lose input index, saved index before is not correct
             * therefore we need to set caret when we insert new block
             */
            cEditor.caret.inputIndex = -1;

            cEditor.callback.enterPressedOnBlock();
            return;
        }

        if (event.target.contentEditable == 'true') {

            /** Update input index */
            cEditor.caret.saveCurrentInputIndex();
        }

        if (!cEditor.content.currentNode) {
            /**
             * Enter key pressed in first-level block area
             */
            cEditor.callback.enterPressedOnBlock(event);
            return;
        }


        var currentInputIndex       = cEditor.caret.getCurrentInputIndex() || 0,
            workingNode             = cEditor.content.currentNode,
            tool                    = workingNode.dataset.type,
            isEnterPressedOnToolbar = cEditor.toolbar.opened &&
                                      cEditor.toolbar.current &&
                                      event.target == cEditor.state.inputs[currentInputIndex];

        /** The list of tools which needs the default browser behaviour */
        var enableLineBreaks = cEditor.tools[tool].enableLineBreaks;

        /** This type of block creates when enter is pressed */
        var NEW_BLOCK_TYPE = 'paragraph';

        /**
        * When toolbar is opened, select tool instead of making new paragraph
        */
        if ( isEnterPressedOnToolbar ) {

            event.preventDefault();

            cEditor.toolbar.toolbox.toolClicked(event);

            cEditor.toolbar.close();

            return;

        }

        /**
        * Allow making new <p> in same block by SHIFT+ENTER and forbids to prevent default browser behaviour
        */
        if ( event.shiftKey && !enableLineBreaks) {
            cEditor.callback.enterPressedOnBlock(cEditor.content.currentBlock, event);
            event.preventDefault();

        } else if ( (event.shiftKey && !enableLineBreaks) || (!event.shiftKey && enableLineBreaks) ){
            /** XOR */
            return;
        }

        var isLastTextNode = false,
            currentSelection = window.getSelection(),
            currentSelectedNode = currentSelection.anchorNode,
            caretAtTheEndOfText = cEditor.caret.position.atTheEnd(),
            isTextNodeHasParentBetweenContenteditable = false;

        /**
        * Workaround situation when caret at the Text node that has some wrapper Elements
        * Split block cant handle this.
        * We need to save default behavior
        */
        isTextNodeHasParentBetweenContenteditable = currentSelectedNode && currentSelectedNode.parentNode.contentEditable != "true";

        /**
        * Split blocks when input has several nodes and caret placed in textNode
        */
        if (
            currentSelectedNode.nodeType == cEditor.core.nodeTypes.TEXT &&
            !isTextNodeHasParentBetweenContenteditable
        ){

            event.preventDefault();

            cEditor.core.log('Splitting Text node...');

            cEditor.content.splitBlock(currentInputIndex);

            /** Show plus button when next input after split is empty*/
            if (!cEditor.state.inputs[currentInputIndex + 1].textContent.trim()) {
                cEditor.toolbar.showPlusButton();
            }

        } else {

            if ( currentSelectedNode && currentSelectedNode.parentNode) {

                isLastTextNode = !currentSelectedNode.parentNode.nextSibling;

            }

            if ( isLastTextNode && caretAtTheEndOfText ) {

                event.preventDefault();

                cEditor.core.log('ENTER clicked in last textNode. Create new BLOCK');

                cEditor.content.insertBlock({
                    type  : NEW_BLOCK_TYPE,
                    block : cEditor.tools[NEW_BLOCK_TYPE].render()
                }, true );

                cEditor.toolbar.move();

                /** Show plus button with empty block */
                cEditor.toolbar.showPlusButton();

            } else {

                cEditor.core.log('Default ENTER behavior.');

            }

        }

        /** get all inputs after new appending block */
        cEditor.ui.saveInputs();

    },

    escapeKeyPressed : function(event){

        /** Close all toolbar */
        cEditor.toolbar.close();

        /** Close toolbox */
        cEditor.toolbar.toolbox.close();

        event.preventDefault();

    },

    arrowKeyPressed : function(event){

        cEditor.content.workingNodeChanged();

        /* Closing toolbar */
        cEditor.toolbar.close();
        cEditor.toolbar.move();

    },

    defaultKeyPressed : function(event) {

        cEditor.toolbar.close();

        if (!cEditor.toolbar.inline.actionsOpened) {
            cEditor.toolbar.inline.close();
            cEditor.content.clearMark();
        }
    },

    redactorClicked : function (event) {

        cEditor.content.workingNodeChanged(event.target);

        cEditor.ui.saveInputs();

        var selectedText    = cEditor.toolbar.inline.getSelectionText();

        if (selectedText.length === 0) {
            cEditor.toolbar.inline.close();
        }

        /** Update current input index in memory when caret focused into existed input */
        if (event.target.contentEditable == 'true') {

            cEditor.caret.saveCurrentInputIndex();

        }

        if (cEditor.content.currentNode === null) {

            /** Set caret to the last input */
            var indexOfLastInput = cEditor.state.inputs.length - 1,
                firstLevelBlock  = cEditor.content.getFirstLevelBlock(cEditor.state.inputs[indexOfLastInput]);

            /** If input is empty, then we set caret to the last input */
            if (cEditor.state.inputs[indexOfLastInput].textContent === '' && firstLevelBlock.dataset.type == 'paragraph') {

                cEditor.caret.setToBlock(indexOfLastInput);

            } else {

                /** Create new input when caret clicked in redactors area */
                var NEW_BLOCK_TYPE = 'paragraph';

                cEditor.content.insertBlock({
                    type  : NEW_BLOCK_TYPE,
                    block : cEditor.tools[NEW_BLOCK_TYPE].render()
                });

                /** Set caret to this appended input */
                cEditor.caret.setToNextBlock(indexOfLastInput);

            }

            /**
            * Move toolbar to the right position and open
            */
            cEditor.toolbar.move();


            cEditor.toolbar.open();

        } else {

            /**
            * Move toolbar to the right position and open
            */
            cEditor.toolbar.move();

            cEditor.toolbar.open();

            /** Close all panels */
            cEditor.toolbar.settings.close();
            cEditor.toolbar.toolbox.close();
        }


        var inputIsEmpty = !cEditor.content.currentNode.textContent.trim();

        if (inputIsEmpty) {

            /** Show plus button */
            cEditor.toolbar.showPlusButton();

        } else {

            /** Hide plus buttons */
            cEditor.toolbar.hidePlusButton();
        }

        /** Mark current block*/
        cEditor.content.markBlock();

    },

    /**
     * This method allows to define, is caret in contenteditable element or not.
     * Otherwise, if we get TEXT node from range container, that will means we have input index.
     * In this case we use default browsers behaviour (if plugin allows that) or overwritten action.
     * Therefore, to be sure that we've clicked first-level block area, we should have currentNode, which always
     * specifies to the first-level block. Other cases we just ignore.
     */
    clickedOnFirstLevelBlockArea : function() {

        var selection  = window.getSelection(),
            anchorNode = selection.anchorNode,
            flag = false;


        if (selection.rangeCount == 0) {

            return true;

        } else {

            if (!cEditor.core.isDomNode(anchorNode)) {
                anchorNode = anchorNode.parentNode;
            }

            /** Already founded, without loop */
            if (anchorNode.contentEditable == 'true') {
                flag = true;
            }

            while (anchorNode.contentEditable != 'true') {
                anchorNode = anchorNode.parentNode;

                if (anchorNode.contentEditable == 'true') {
                    flag = true;
                }

                if (anchorNode == document.body) {
                    break;
                }
            }

            /** If editable element founded, flag is "TRUE", Therefore we return "FALSE" */
            return flag ? false : true;
        }

    },

    /**
    * Toolbar button click handler
    * @param this - cursor to the button
    */
    toolbarButtonClicked : function (event) {

        var button = this;

        cEditor.toolbar.current = button.dataset.type;

        cEditor.toolbar.toolbox.toolClicked(event);
        cEditor.toolbar.close();

    },

    redactorInputEvent : function (event) {

        /**
        * Clear previous sync-timeout
        */
        if (this.redactorSyncTimeout){
            clearTimeout(this.redactorSyncTimeout);
        }

        /**
        * Start waiting to input finish and sync redactor
        */
        this.redactorSyncTimeout = setTimeout(function() {

            cEditor.content.sync();

        }, 500);

    },

    /** Show or Hide toolbox when plus button is clicked */
    plusButtonClicked : function() {

        if (!cEditor.nodes.toolbox.classList.contains('opened')) {

            cEditor.toolbar.toolbox.open();

        } else {

            cEditor.toolbar.toolbox.close();

        }
    },

    /**
    * Block handlers for KeyDown events
    */
    blockKeydown : function(event, block) {

        switch (event.keyCode){

            case cEditor.core.keys.DOWN:
            case cEditor.core.keys.RIGHT:
                cEditor.callback.blockRightOrDownArrowPressed(block);
                break;

            case cEditor.core.keys.BACKSPACE:
                cEditor.callback.backspacePressed(block);
                break;

            case cEditor.core.keys.UP:
            case cEditor.core.keys.LEFT:
                cEditor.callback.blockLeftOrUpArrowPressed(block);
                break;

        }
    },

    /**
    * RIGHT or DOWN keydowns on block
    */
    blockRightOrDownArrowPressed : function (block) {

        var selection   = window.getSelection(),
            inputs      = cEditor.state.inputs,
            focusedNode = selection.anchorNode,
            focusedNodeHolder;

        /** Check for caret existance */
        if (!focusedNode){
            return false;
        }

        /** Looking for closest (parent) contentEditable element of focused node */
        while (focusedNode.contentEditable != 'true') {

            focusedNodeHolder = focusedNode.parentNode;
            focusedNode       = focusedNodeHolder;
        }

        /** Input index in DOM level */
        var editableElementIndex = 0;
        while (focusedNode != inputs[editableElementIndex]) {
            editableElementIndex ++;
        }

        /**
        * Founded contentEditable element doesn't have childs
        * Or maybe New created block
        */
        if (!focusedNode.textContent)
        {
            cEditor.caret.setToNextBlock(editableElementIndex);
            return;
        }

        /**
        * Do nothing when caret doesn not reaches the end of last child
        */
        var caretInLastChild    = false,
            caretAtTheEndOfText = false;

        var lastChild,
            deepestTextnode;

        lastChild = focusedNode.childNodes[focusedNode.childNodes.length - 1 ];

        if (cEditor.core.isDomNode(lastChild)) {

            deepestTextnode = cEditor.content.getDeepestTextNodeFromPosition(lastChild, lastChild.childNodes.length);

        } else {

            deepestTextnode = lastChild;

        }

        caretInLastChild = selection.anchorNode == deepestTextnode;
        caretAtTheEndOfText = deepestTextnode.length == selection.anchorOffset;

        if ( !caretInLastChild  || !caretAtTheEndOfText ) {
            cEditor.core.log('arrow [down|right] : caret does not reached the end');
            return false;
        }

        cEditor.caret.setToNextBlock(editableElementIndex);

    },

    /**
    * LEFT or UP keydowns on block
    */
    blockLeftOrUpArrowPressed : function (block) {

        var selection   = window.getSelection(),
            inputs      = cEditor.state.inputs,
            focusedNode = selection.anchorNode,
            focusedNodeHolder;

        /** Check for caret existance */
        if (!focusedNode){
            return false;
        }

        /**
        * LEFT or UP not at the beginning
        */
        if ( selection.anchorOffset !== 0) {
            return false;
        }

        /** Looking for parent contentEditable block */
        while (focusedNode.contentEditable != 'true') {
            focusedNodeHolder = focusedNode.parentNode;
            focusedNode       = focusedNodeHolder;
        }

        /** Input index in DOM level */
        var editableElementIndex = 0;
        while (focusedNode != inputs[editableElementIndex]) {
            editableElementIndex ++;
        }

        /**
        * Do nothing if caret is not at the beginning of first child
        */
        var caretInFirstChild   = false,
            caretAtTheBeginning = false;

        var firstChild,
            deepestTextnode;

        /**
        * Founded contentEditable element doesn't have childs
        * Or maybe New created block
        */
        if (!focusedNode.textContent) {
            cEditor.caret.setToPreviousBlock(editableElementIndex);
            return;
        }

        firstChild = focusedNode.childNodes[0];

        if (cEditor.core.isDomNode(firstChild)) {

            deepestTextnode = cEditor.content.getDeepestTextNodeFromPosition(firstChild, 0);

        } else {

            deepestTextnode = firstChild;

        }

        caretInFirstChild   = selection.anchorNode == deepestTextnode;
        caretAtTheBeginning = selection.anchorOffset === 0;

        if ( caretInFirstChild && caretAtTheBeginning ) {

            cEditor.caret.setToPreviousBlock(editableElementIndex);

        }

    },

    /**
     * Callback for enter key pressing in first-level block area
     */
    enterPressedOnBlock: function (event) {

        var NEW_BLOCK_TYPE  = 'paragraph';

        cEditor.content.insertBlock({
            type  : NEW_BLOCK_TYPE,
            block : cEditor.tools[NEW_BLOCK_TYPE].render()
        }, true );

        cEditor.toolbar.move();
        cEditor.toolbar.open();

    },

    backspacePressed: function (block) {

        var currentInputIndex = cEditor.caret.getCurrentInputIndex(),
            range,
            selectionLength,
            firstLevelBlocksCount;

        if (block.textContent.trim()) {

            range           = cEditor.content.getRange();
            selectionLength = range.endOffset - range.startOffset;

            if (cEditor.caret.position.atStart() && !selectionLength) {

                cEditor.content.mergeBlocks(currentInputIndex);

            } else {

                return;

            }
        }

        if (!selectionLength) {
            block.remove();
        }


        firstLevelBlocksCount = cEditor.nodes.redactor.childNodes.length;

        /**
        * If all blocks are removed
        */
        if (firstLevelBlocksCount === 0) {

            /** update currentNode variable */
            cEditor.content.currentNode = null;

            /** Inserting new empty initial block */
            cEditor.ui.addInitialBlock();

            /** Updating inputs state after deleting last block */
            cEditor.ui.saveInputs();

            /** Set to current appended block */
            setTimeout(function () {

                cEditor.caret.setToPreviousBlock(1);

            }, 10);

        } else {

            if (cEditor.caret.inputIndex !== 0) {

                /** Target block is not first */
                cEditor.caret.setToPreviousBlock(cEditor.caret.inputIndex);

            } else {

                /** If we try to delete first block */
                cEditor.caret.setToNextBlock(cEditor.caret.inputIndex);

            }
        }

        cEditor.toolbar.move();

        if (!cEditor.toolbar.opened) {
            cEditor.toolbar.open();
        }

        /** Updating inputs state */
        cEditor.ui.saveInputs();

        /** Prevent default browser behaviour */
        event.preventDefault();

    },

    blockPaste: function(event) {

        var currentInputIndex = cEditor.caret.getCurrentInputIndex(),
            node = cEditor.state.inputs[currentInputIndex];

        setTimeout(function() {

            cEditor.content.sanitize(node);

        }, 0);

    },

    _blockPaste: function(event) {

        var currentInputIndex = cEditor.caret.getCurrentInputIndex();

        /**
         * create an observer instance
         */
        var observer = new MutationObserver(cEditor.callback.handlePasteEvents);

        /**
         * configuration of the observer:
         */
        var config = { attributes: true, childList: true, characterData: false };

        // pass in the target node, as well as the observer options
        observer.observe(cEditor.state.inputs[currentInputIndex], config);
    },

    /**
     * Sends all mutations to paste handler
     */
    handlePasteEvents : function(mutations) {
        mutations.forEach(cEditor.content.paste);
    },

    /**
    * Clicks on block settings button
    */
    showSettingsButtonClicked : function(){

        /**
        * Get type of current block
        * It uses to append settings from tool.settings property.
        * ...
        * Type is stored in data-type attribute on block
        */
        var currentToolType = cEditor.content.currentNode.dataset.type;

        cEditor.toolbar.settings.toggle(currentToolType);

        /** Close toolbox when settings button is active */
        cEditor.toolbar.toolbox.close();
        cEditor.toolbar.settings.hideRemoveActions();

    }

};

cEditor.content = {

    currentNode : null,

    /**
    * Synchronizes redactor with original textarea
    */
    sync : function () {

        cEditor.core.log('syncing...');

        /**
        * Save redactor content to cEditor.state
        */
        cEditor.state.html = cEditor.nodes.redactor.innerHTML;

    },

    /**
    * @deprecated
    */
    getNodeFocused : function() {

        var selection = window.getSelection(),
            focused;

        if (selection.anchorNode === null) {
            return null;
        }

        if ( selection.anchorNode.nodeType == cEditor.core.nodeTypes.TAG ) {
            focused = selection.anchorNode;
        } else {
            focused = selection.focusNode.parentElement;
        }

        if ( !cEditor.parser.isFirstLevelBlock(focused) ) {

            /** Iterate with parent nodes to find first-level*/
            var parent = focused.parentNode;

            while (parent && !cEditor.parser.isFirstLevelBlock(parent)){
                parent = parent.parentNode;
            }

            focused = parent;
        }

        if (focused != cEditor.nodes.redactor){
            return focused;
        }

        return null;

    },

    /**
    * Appends background to the block
    */
    markBlock : function() {

        cEditor.content.currentNode.classList.add(cEditor.ui.className.BLOCK_HIGHLIGHTED);
    },

    /**
    * Clear background
    */
    clearMark : function() {

        if (cEditor.content.currentNode) {
            cEditor.content.currentNode.classList.remove(cEditor.ui.className.BLOCK_HIGHLIGHTED);
        }

    },

    /**
    * Finds first-level block
    * @param {Element} node - selected or clicked in redactors area node
    */
    getFirstLevelBlock : function(node) {

        if (!cEditor.core.isDomNode(node)) {
            node = node.parentNode;
        }

        if (node === cEditor.nodes.redactor || node === document.body) {

            return null;

        } else {

            while(!node.classList.contains(cEditor.ui.className.BLOCK_CLASSNAME)) {
                node = node.parentNode;
            }

            return node;
        }


    },

    /**
    * Trigger this event when working node changed
    * @param {Element} targetNode - first-level of this node will be current
    * If targetNode is first-level then we set it as current else we look for parents to find first-level
    */
    workingNodeChanged : function (targetNode) {

        /** Clear background from previous marked block before we change */
        cEditor.content.clearMark();

        if (!targetNode) {
            return;
        }

        this.currentNode = this.getFirstLevelBlock(targetNode);

    },

    /**
    * Replaces one redactor block with another
    * @protected
    * @param {Element} targetBlock - block to replace. Mostly currentNode.
    * @param {Element} newBlock
    * @param {string} newBlockType - type of new block; we need to store it to data-attribute
    *
    * [!] Function does not saves old block content.
    *     You can get it manually and pass with newBlock.innerHTML
    */
    replaceBlock : function function_name(targetBlock, newBlock, newBlockType) {

        if (!targetBlock || !newBlock || !newBlockType){
            cEditor.core.log('replaceBlock: missed params');
            return;
        }

        /** Store block type */
        newBlock.dataset.type = newBlockType;

        /** If target-block is not a frist-level block, then we iterate parents to find it */
        while(!targetBlock.classList.contains(cEditor.ui.className.BLOCK_CLASSNAME)) {
            targetBlock = targetBlock.parentNode;
        }

        /** Replacing */
        cEditor.nodes.redactor.replaceChild(newBlock, targetBlock);

        /**
        * Set new node as current
        */
        cEditor.content.workingNodeChanged(newBlock);

        /**
        * Add block handlers
        */
        cEditor.ui.addBlockHandlers(newBlock);

        /**
        * Save changes
        */
        cEditor.ui.saveInputs();

    },

    /**
    * @private
    *
    * Inserts new block to redactor
    * Wrapps block into a DIV with BLOCK_CLASSNAME class
    *
    * @param blockData          {object}
    * @param blockData.block    {Element}   element with block content
    * @param blockData.type     {string}    block plugin
    * @param needPlaceCaret     {bool}      pass true to set caret in new block
    *
    */
    insertBlock : function( blockData, needPlaceCaret ) {

        var workingBlock    = cEditor.content.currentNode,
            newBlockContent = blockData.block,
            blockType       = blockData.type,
            isStretched     = blockData.stretched;

        var newBlock = cEditor.content.composeNewBlock(newBlockContent, blockType, isStretched);

        if (workingBlock) {

            cEditor.core.insertAfter(workingBlock, newBlock);

        } else {
            /**
            * If redactor is empty, append as first child
            */
            cEditor.nodes.redactor.appendChild(newBlock);

        }

        /**
         * Block handler
         */
        cEditor.ui.addBlockHandlers(newBlock);

        /**
         * Set new node as current
         */
        cEditor.content.workingNodeChanged(newBlock);

        /**
        * Save changes
        */
        cEditor.ui.saveInputs();


        if ( needPlaceCaret ) {

            /**
             * If we don't know input index then we set default value -1
             */
            var currentInputIndex = cEditor.caret.getCurrentInputIndex() || -1;


            if (currentInputIndex == -1) {


                var editableElement = newBlock.querySelector('[contenteditable]'),
                    emptyText       = document.createTextNode('');

                editableElement.appendChild(emptyText);
                cEditor.caret.set(editableElement, 0, 0);

                cEditor.toolbar.move();
                cEditor.toolbar.showPlusButton();


            } else {

                /** Timeout for browsers execution */
                setTimeout(function () {

                    /** Setting to the new input */
                    cEditor.caret.setToNextBlock(currentInputIndex);
                    cEditor.toolbar.move();
                    cEditor.toolbar.open();

                }, 10);

            }

        }

    },

    /**
    * Replaces blocks with saving content
    * @protected
    * @param {Element} noteToReplace
    * @param {Element} newNode
    * @param {Element} blockType
    */
    switchBlock : function(blockToReplace, newBlock, blockType){

        var newBlockComposed = cEditor.content.composeNewBlock(newBlock, blockType);

        /** Replacing */
        cEditor.content.replaceBlock(blockToReplace, newBlockComposed, blockType);

        /** Save new Inputs when block is changed */
        cEditor.ui.saveInputs();
    },


    /**
    * Iterates between child noted and looking for #text node on deepest level
    * @private
    * @param {Element} block - node where find
    * @param {int} postiton - starting postion
    *      Example: childNodex.length to find from the end
    *               or 0 to find from the start
    * @return {Text} block
    * @uses DFS
    */
    getDeepestTextNodeFromPosition : function (block, position) {

        /**
        * Clear Block from empty and useless spaces with trim.
        * Such nodes we should remove
        */
        var blockChilds = block.childNodes,
            index,
            node,
            text;

        for(index = 0; index < blockChilds.length; index++)
        {
            node = blockChilds[index];

            if (node.nodeType == cEditor.core.nodeTypes.TEXT) {

                text = node.textContent.trim();

                /** Text is empty. We should remove this child from node before we start DFS
                * decrease the quantity of childs.
                */
                if (text === '') {

                    block.removeChild(node);
                    position--;
                }
            }
        }

        if (block.childNodes.length === 0) {
            return document.createTextNode('');
        }

        /** Setting default position when we deleted all empty nodes */
        if ( position < 0 )
            position = 1;

        var looking_from_start = false;

        /** For looking from START */
        if (position === 0) {
            looking_from_start = true;
            position = 1;
        }

        while ( position ) {

            /** initial verticle of node. */
            if ( looking_from_start ) {
                block = block.childNodes[0];
            } else {
                block = block.childNodes[position - 1];
            }

            if ( block.nodeType == cEditor.core.nodeTypes.TAG ){

                position = block.childNodes.length;

            } else if (block.nodeType == cEditor.core.nodeTypes.TEXT ){

                position = 0;
            }

        }

        return block;
    },

    /**
    * @private
    */
    composeNewBlock : function (block, blockType, isStretched) {

        var newBlock     = cEditor.draw.node('DIV', cEditor.ui.className.BLOCK_CLASSNAME, {}),
            blockContent = cEditor.draw.node('DIV', cEditor.ui.className.BLOCK_CONTENT, {});

        newBlock.appendChild(blockContent);

        if (isStretched) {
            blockContent.classList.add(cEditor.ui.className.BLOCK_STRETCHED);
        }
        newBlock.dataset.type = blockType;

        blockContent.appendChild(block);

        return newBlock;

    },

    /**
    * Returns Range object of current selection
    */
    getRange : function() {

        var selection = window.getSelection().getRangeAt(0);

        return selection;
    },

    /**
    * Divides block in two blocks (after and before caret)
    * @private
    * @param {Int} inputIndex - target input index
    */
    splitBlock : function(inputIndex) {

        var selection      = window.getSelection(),
            anchorNode     = selection.anchorNode,
            anchorNodeText = anchorNode.textContent,
            caretOffset    = selection.anchorOffset,
            textBeforeCaret,
            textNodeBeforeCaret,
            textAfterCaret,
            textNodeAfterCaret;

        var currentBlock = cEditor.content.currentNode.querySelector('[contentEditable]');


        textBeforeCaret     = anchorNodeText.substring(0, caretOffset);
        textAfterCaret      = anchorNodeText.substring(caretOffset);

        textNodeBeforeCaret = document.createTextNode(textBeforeCaret);

        if (textAfterCaret) {
            textNodeAfterCaret  = document.createTextNode(textAfterCaret);
        }

        var previousChilds = [],
            nextChilds     = [],
            reachedCurrent = false;

        if (textNodeAfterCaret) {
            nextChilds.push(textNodeAfterCaret);
        }

        for ( var i = 0, child; !!(child = currentBlock.childNodes[i]); i++) {

            if ( child != anchorNode ) {
                if ( !reachedCurrent ){
                    previousChilds.push(child);
                } else {
                    nextChilds.push(child);
                }
            } else {
                reachedCurrent = true;
            }

        }

        /** Clear current input */
        cEditor.state.inputs[inputIndex].innerHTML = '';

        /**
        * Append all childs founded before anchorNode
        */
        var previousChildsLength = previousChilds.length;

        for(i = 0; i < previousChildsLength; i++) {
            cEditor.state.inputs[inputIndex].appendChild(previousChilds[i]);
        }

        cEditor.state.inputs[inputIndex].appendChild(textNodeBeforeCaret);

        /**
        * Append text node which is after caret
        */
        var nextChildsLength = nextChilds.length,
            newNode          = document.createElement('div');

        for(i = 0; i < nextChildsLength; i++) {
            newNode.appendChild(nextChilds[i]);
        }

        newNode = newNode.innerHTML;

        /** This type of block creates when enter is pressed */
        var NEW_BLOCK_TYPE = 'paragraph';

        /**
        * Make new paragraph with text after caret
        */
        cEditor.content.insertBlock({
            type  : NEW_BLOCK_TYPE,
            block : cEditor.tools[NEW_BLOCK_TYPE].render({
                text : newNode,
            })
        }, true );

    },

    /**
    * Merges two blocks — current and target
    * If target index is not exist, then previous will be as target
    */
    mergeBlocks : function(currentInputIndex, targetInputIndex) {

        /** If current input index is zero, then prevent method execution */
        if (currentInputIndex === 0) {
            return;
        }

        var targetInput,
            currentInputContent = cEditor.state.inputs[currentInputIndex].innerHTML;

        if (!targetInputIndex) {

            targetInput = cEditor.state.inputs[currentInputIndex - 1];

        } else {

            targetInput = cEditor.state.inputs[targetInputIndex];

        }

        targetInput.innerHTML += currentInputContent;
    },

    /**
     * @private
     *
     * Callback for HTML Mutations
     * @param {Array} mutation - Mutation Record
     */
    paste : function(mutation) {

        var workingNode = cEditor.content.currentNode,
            tool        = workingNode.dataset.type;

        if (cEditor.tools[tool].allowedToPaste) {
            cEditor.content.sanitize(mutation.addedNodes);
        } else {
            cEditor.content.pasteTextContent(mutation.addedNodes);
        }

    },

    /**
     * @private
     *
     * gets only text/plain content of node
     * @param {Element} target - HTML node
     */
    pasteTextContent : function(nodes) {

        var node     = nodes[0],
            textNode = document.createTextNode(node.textContent);

        if (cEditor.core.isDomNode(node)) {
            node.parentNode.replaceChild(textNode, node);
        }
    },

    /**
     * @private
     *
     * Sanitizes HTML content
     * @param {Element} target - inserted element
     * @uses DFS function for deep searching
     */
    sanitize : function(target) {

        for (var i = 0; i < target.childNodes.length; i++) {
            this.dfs(target.childNodes[i]);
        }
    },

    /**
     * Clears styles
     * @param {Element|Text}
     */
    clearStyles : function(target) {

        var href,
            newNode = null,
            blockTags   = ['P', 'BLOCKQUOTE', 'UL', 'CODE', 'OL', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV', 'PRE', 'HEADER', 'SECTION'],
            allowedTags = ['P', 'B', 'I', 'A', 'U', 'BR'],
            needReplace = !allowedTags.includes(target.tagName),
            isDisplayedAsBlock = blockTags.includes(target.tagName);

        if (!cEditor.core.isDomNode(target)){
            return target;
        }

        if (!target.parentNode){
            return target;
        }

        if (needReplace) {

            if (isDisplayedAsBlock) {

                newNode = document.createElement('P');
                newNode.innerHTML = target.innerHTML;
                target.parentNode.replaceChild(newNode, target);
                target = newNode;

            } else {

                newNode = document.createTextNode(` ${target.textContent} `);
                newNode.textContent = newNode.textContent.replace(/\s{2,}/g, ' ');
                target.parentNode.replaceChild(newNode, target);

            }
        }

        /** keep href attributes of tag A */
        if (target.tagName == 'A') {
            href = target.getAttribute('href');
        }

        /** Remove all tags */
        while(target.attributes.length > 0) {
            target.removeAttribute(target.attributes[0].name);
        }

        /** return href */
        if (href) {
            target.setAttribute('href', href);
        }

        return target;

    },

    /**
     * Depth-first search Algorithm
     * returns all childs
     * @param {Element}
     */
    dfs : function(el) {

        if (!cEditor.core.isDomNode(el))
            return;

        var sanitized = this.clearStyles(el);

        for(var i = 0; i < sanitized.childNodes.length; i++) {
            this.dfs(sanitized.childNodes[i]);
        }

    },

};

cEditor.caret = {

    /**
    * @var {int} InputIndex - editable element in DOM
    */
    inputIndex : null,

    /**
    * @var {int} offset - caret position in a text node.
    */

    offset : null,

    /**
    * @var {int} focusedNodeIndex - we get index of child node from first-level block
    */

    focusedNodeIndex: null,

    /**
    * Creates Document Range and sets caret to the element.
    * @protected
    * @uses caret.save — if you need to save caret position
    * @param {Element} el - Changed Node.
    */
    set : function( el , index, offset) {

        offset = offset || this.offset || 0;
        index  = index  || this.focusedNodeIndex || 0;

        var childs = el.childNodes,
            nodeToSet;

        if ( childs.length === 0 ) {

            nodeToSet = el;

        } else {

            nodeToSet = childs[index];

        }

        /** If Element is INPUT */
        if (el.tagName == 'INPUT') {
            el.focus();
            return;
        }

        if (cEditor.core.isDomNode(nodeToSet)) {

            nodeToSet = cEditor.content.getDeepestTextNodeFromPosition(nodeToSet, nodeToSet.childNodes.length);
        }

        var range     = document.createRange(),
            selection = window.getSelection();

        setTimeout(function() {

            range.setStart(nodeToSet, offset);
            range.setEnd(nodeToSet, offset);

            selection.removeAllRanges();
            selection.addRange(range);

            cEditor.caret.saveCurrentInputIndex();

        }, 20);
    },

    /**
    * @protected
    * Updates index of input and saves it in caret object
    */
    saveCurrentInputIndex : function () {

        /** Index of Input that we paste sanitized content */
        var selection   = window.getSelection(),
            inputs      = cEditor.state.inputs,
            focusedNode = selection.anchorNode,
            focusedNodeHolder;

        if (!focusedNode){
            return;
        }

        /** Looking for parent contentEditable block */
        while (focusedNode.contentEditable != 'true') {
            focusedNodeHolder = focusedNode.parentNode;
            focusedNode       = focusedNodeHolder;
        }

        /** Input index in DOM level */
        var editableElementIndex = 0;

        while (focusedNode != inputs[editableElementIndex]) {
            editableElementIndex ++;
        }

        this.inputIndex = editableElementIndex;
    },

    /**
    * Returns current input index (caret object)
    */
    getCurrentInputIndex : function() {
        return this.inputIndex;
    },

    /**
    * @param {int} index - index of first-level block after that we set caret into next input
    */
    setToNextBlock : function(index) {

        var inputs = cEditor.state.inputs,
            nextInput = inputs[index + 1];

        if (!nextInput) {
            cEditor.core.log('We are reached the end');
            return;
        }

        /**
        * When new Block created or deleted content of input
        * We should add some text node to set caret
        */
        if (!nextInput.childNodes.length) {
            var emptyTextElement = document.createTextNode('');
            nextInput.appendChild(emptyTextElement);
        }

        cEditor.caret.inputIndex = index + 1;
        cEditor.caret.set(nextInput, 0, 0);
        cEditor.content.workingNodeChanged(nextInput);

    },

    /**
    * @param {int} index - index of target input.
    * Sets caret to input with this index
    */
    setToBlock : function(index) {

        var inputs = cEditor.state.inputs,
            targetInput = inputs[index];

        console.assert( targetInput , 'caret.setToBlock: target input does not exists');

        if ( !targetInput ) {
            return;
        }

        /**
        * When new Block created or deleted content of input
        * We should add some text node to set caret
        */
        if (!targetInput.childNodes.length) {
            var emptyTextElement = document.createTextNode('');
            targetInput.appendChild(emptyTextElement);
        }

        cEditor.caret.inputIndex = index;
        cEditor.caret.set(targetInput, 0, 0);
        cEditor.content.workingNodeChanged(targetInput);

    },

    /**
    * @param {int} index - index of input
    */
    setToPreviousBlock : function(index) {

        index = index || 0;

        var inputs = cEditor.state.inputs,
            previousInput = inputs[index - 1],
            lastChildNode,
            lengthOfLastChildNode,
            emptyTextElement;


        if (!previousInput) {
            cEditor.core.log('We are reached first node');
            return;
        }

        lastChildNode = cEditor.content.getDeepestTextNodeFromPosition(previousInput, previousInput.childNodes.length);
        lengthOfLastChildNode = lastChildNode.length;

        /**
        * When new Block created or deleted content of input
        * We should add some text node to set caret
        */
        if (!previousInput.childNodes.length) {

            emptyTextElement = document.createTextNode('');
            previousInput.appendChild(emptyTextElement);
        }
        cEditor.caret.inputIndex = index - 1;
        cEditor.caret.set(previousInput, previousInput.childNodes.length - 1, lengthOfLastChildNode);
        cEditor.content.workingNodeChanged(inputs[index - 1]);
    },

    position : {

        atStart : function() {

            var selection       = window.getSelection(),
                anchorOffset    = selection.anchorOffset,
                anchorNode      = selection.anchorNode,
                firstLevelBlock = cEditor.content.getFirstLevelBlock(anchorNode),
                pluginsRender   = firstLevelBlock.childNodes[0];

            if (!cEditor.core.isDomNode(anchorNode)) {
                anchorNode = anchorNode.parentNode;
            }

            var isFirstNode  = anchorNode === pluginsRender.childNodes[0],
                isOffsetZero = anchorOffset === 0;

            return isFirstNode && isOffsetZero;

        },

        atTheEnd : function() {

            var selection    = window.getSelection(),
                anchorOffset = selection.anchorOffset,
                anchorNode   = selection.anchorNode;

            /** Caret is at the end of input */
            return !anchorNode || !anchorNode.length || anchorOffset === anchorNode.length;
        }
    }
};

cEditor.toolbar = {

    /**
    * Margin between focused node and toolbar
    */
    defaultToolbarHeight : 49,

    defaultOffset : 34,

    opened : false,

    current : null,

    /**
    * @protected
    */
    open : function (){

        cEditor.nodes.toolbar.classList.add('opened');
        this.opened = true;

    },

    /**
    * @protected
    */
    close : function(){

        cEditor.nodes.toolbar.classList.remove('opened');
        this.opened  = false;

        this.current = null;

        for (var button in cEditor.nodes.toolbarButtons){
            cEditor.nodes.toolbarButtons[button].classList.remove('selected');
        }

        /** Close toolbox when toolbar is not displayed */
        cEditor.toolbar.toolbox.close();
        cEditor.toolbar.settings.close();

    },

    toggle : function(){

        if ( !this.opened ){

            this.open();

        } else {

            this.close();

        }

    },

    hidePlusButton : function() {
        cEditor.nodes.plusButton.classList.add('hide');
    },

    showPlusButton : function() {
        cEditor.nodes.plusButton.classList.remove('hide');
    },

    /**
    * Moving toolbar to the specified node
    */
    move : function() {

        /** Close Toolbox when we move toolbar */
        cEditor.toolbar.toolbox.close();

        if (!cEditor.content.currentNode) {
            return;
        }

        var toolbarHeight = cEditor.nodes.toolbar.clientHeight || cEditor.toolbar.defaultToolbarHeight,
            newYCoordinate = cEditor.content.currentNode.offsetTop - (cEditor.toolbar.defaultToolbarHeight / 2) + cEditor.toolbar.defaultOffset;

        cEditor.nodes.toolbar.style.transform = `translate3D(0, ${Math.floor(newYCoordinate)}px, 0)`;

        /** Close trash actions */
        cEditor.toolbar.settings.hideRemoveActions();

    },
};

cEditor.toolbar.toolbox = {

    opened : false,

    /** Shows toolbox */
    open : function() {

        /** Close setting if toolbox is opened */
        if (cEditor.toolbar.settings.opened) {
            cEditor.toolbar.settings.close();
        }

        /** display toolbox */
        cEditor.nodes.toolbox.classList.add('opened');

        /** Animate plus button */
        cEditor.nodes.plusButton.classList.add('clicked');

        /** toolbox state */
        cEditor.toolbar.toolbox.opened = true;

    },

    /** Closes toolbox */
    close : function() {

        /** Makes toolbox disapear */
        cEditor.nodes.toolbox.classList.remove('opened');

        /** Rotate plus button */
        cEditor.nodes.plusButton.classList.remove('clicked');

        /** toolbox state */
        cEditor.toolbar.toolbox.opened = false;

    },

    leaf : function(){

        var currentTool = cEditor.toolbar.current,
            tools       = Object.keys(cEditor.tools),
            barButtons  = cEditor.nodes.toolbarButtons,
            nextToolIndex,
            toolToSelect;

        if ( !currentTool ) {

            /** Get first tool from object*/
            for (toolToSelect in barButtons) break;

        } else {

            nextToolIndex = tools.indexOf(currentTool) + 1;

            if ( nextToolIndex == tools.length) nextToolIndex = 0;

            toolToSelect = tools[nextToolIndex];

        }

        for (var button in barButtons) barButtons[button].classList.remove('selected');

        barButtons[toolToSelect].classList.add('selected');

        cEditor.toolbar.current = toolToSelect;

    },

    /**
    * Transforming selected node type into selected toolbar element type
    * @param {event} event
    */
    toolClicked : function() {

        /**
        * UNREPLACEBLE_TOOLS this types of tools are forbidden to replace even they are empty
        */
        var UNREPLACEBLE_TOOLS = ['image', 'link', 'list'],
            tool               = cEditor.tools[cEditor.toolbar.current],
            workingNode        = cEditor.content.currentNode,
            currentInputIndex  = cEditor.caret.inputIndex,
            newBlockContent,
            appendCallback,
            blockData;

        /** Make block from plugin */
        newBlockContent = tool.make();

        /** information about block */
        blockData = {
            block     : newBlockContent,
            type      : tool.type,
            stretched : false
        };

        if (
            workingNode &&
            UNREPLACEBLE_TOOLS.indexOf(workingNode.dataset.type) === -1 &&
            workingNode.textContent.trim() === ''
        ){

            /** Replace current block */
            cEditor.content.switchBlock(workingNode, newBlockContent, tool.type);

        } else {

            /** Insert new Block from plugin */
            cEditor.content.insertBlock(blockData);

            /** increase input index */
            currentInputIndex++;

        }

        /** Fire tool append callback  */
        appendCallback = tool.appendCallback;

        if (appendCallback && typeof appendCallback == 'function') {
            appendCallback.call(event);
        }

        setTimeout(function() {

            /** Set caret to current block */
            cEditor.caret.setToBlock(currentInputIndex);

        }, 10);


        /**
        * Changing current Node
        */
        cEditor.content.workingNodeChanged();

        /**
        * Move toolbar when node is changed
        */
        cEditor.toolbar.move();
    },

};

/**
 * Toolbar settings button
 *
 * Holds plugins actions (settings) and default - codex settings.
 */
cEditor.toolbar.settings = {

    opened : false,

    setting : null,
    actions : null,

    cover : null,

    /**
    * Append and open settings
    */
    open : function(toolType){

        /**
        * Append settings content
        * It's stored in tool.settings
        */
        if (!cEditor.tools[toolType] || !cEditor.core.isDomNode(cEditor.tools[toolType].settings) ) {

            cEditor.core.log(`Plugin «${toolType}» has no settings`, 'warn');
            // cEditor.nodes.pluginSettings.innerHTML = `Плагин «${toolType}» не имеет настроек`;

        } else {

            cEditor.nodes.pluginSettings.appendChild(cEditor.tools[toolType].settings);

        }

        var currentBlock = cEditor.content.currentNode;

        /** Open settings block */
        cEditor.nodes.blockSettings.classList.add('opened');
        cEditor.toolbar.settings.addDefaultSettings();
        this.opened = true;
    },

    /**
    * Close and clear settings
    */
    close : function(){

        cEditor.nodes.blockSettings.classList.remove('opened');
        cEditor.nodes.pluginSettings.innerHTML = '';

        this.opened = false;

    },

    /**
    * @param {string} toolType - plugin type
    */
    toggle : function( toolType ){

        if ( !this.opened ){

            this.open(toolType);

        } else {

            this.close();

        }

    },

    /**
     * This function adds default core settings
     */
    addDefaultSettings : function() {

        /** list of default settings */
        var feedModeToggler;

        /** Clear block and append initialized settings */
        cEditor.nodes.defaultSettings.innerHTML = '';


        /** Init all default setting buttons */
        feedModeToggler = cEditor.toolbar.settings.makeFeedModeToggler();

        /**
         * Fill defaultSettings
         */

        /**
         * Button that enables/disables Feed-mode
         * Feed-mode means that block will be showed in articles-feed like cover
         */
        cEditor.nodes.defaultSettings.appendChild(feedModeToggler);

    },

    /**
     * Cover setting.
     * This tune highlights block, so that it may be used for showing target block on main page
     * Draw different setting when block is marked for main page
     * If TRUE, then we show button that removes this selection
     * Also defined setting "Click" events will be listened and have separate callbacks
     *
     * @return {Element} node/button that we place in default settings block
     */
    makeFeedModeToggler : function() {

        var isFeedModeActivated = cEditor.toolbar.settings.isFeedModeActivated(),
            setting,
            data;

        if (!isFeedModeActivated) {

            data = {
                innerHTML : '<i class="ce-icon-newspaper"></i>Вывести в ленте'
            };

        } else {

            data = {
                innerHTML : '<i class="ce-icon-newspaper"></i>Не выводить в ленте'
            };

        }

        setting = cEditor.draw.node('DIV', cEditor.ui.className.SETTINGS_ITEM, data);
        setting.addEventListener('click', cEditor.toolbar.settings.updateFeedMode, false);

        return setting;
    },

    /**
     * Updates Feed-mode
     */
    updateFeedMode : function() {

        var currentNode = cEditor.content.currentNode;

        currentNode.classList.toggle(cEditor.ui.className.BLOCK_IN_FEED_MODE);

        cEditor.toolbar.settings.close();
    },

    isFeedModeActivated : function() {

        var currentBlock = cEditor.content.currentNode;

        if (currentBlock) {
            return currentBlock.classList.contains(cEditor.ui.className.BLOCK_IN_FEED_MODE);
        } else {
            return false;
        }
    },

    /**
     * Here we will draw buttons and add listeners to components
     */
    makeRemoveBlockButton : function() {

        var removeBlockWrapper  = cEditor.draw.node('SPAN', 'ce-toolbar__remove-btn', {}),
            settingButton = cEditor.draw.node('SPAN', 'ce-toolbar__remove-setting', { innerHTML : '<i class="ce-icon-trash"></i>' }),
            actionWrapper = cEditor.draw.node('DIV', 'ce-toolbar__remove-confirmation', {}),
            confirmAction = cEditor.draw.node('DIV', 'ce-toolbar__remove-confirm', { textContent : 'Удалить блок' }),
            cancelAction  = cEditor.draw.node('DIV', 'ce-toolbar__remove-cancel', { textContent : 'Отменить удаление' });

        settingButton.addEventListener('click', cEditor.toolbar.settings.removeButtonClicked, false);

        confirmAction.addEventListener('click', cEditor.toolbar.settings.confirmRemovingRequest, false);

        cancelAction.addEventListener('click', cEditor.toolbar.settings.cancelRemovingRequest, false);

        actionWrapper.appendChild(confirmAction);
        actionWrapper.appendChild(cancelAction);

        removeBlockWrapper.appendChild(settingButton);
        removeBlockWrapper.appendChild(actionWrapper);

        /** Save setting */
        cEditor.toolbar.settings.setting = settingButton;
        cEditor.toolbar.settings.actions = actionWrapper;

        return removeBlockWrapper;

    },

    removeButtonClicked : function() {

        var action = cEditor.toolbar.settings.actions;

        if (action.classList.contains('opened')) {
            cEditor.toolbar.settings.hideRemoveActions();
        } else {
            cEditor.toolbar.settings.showRemoveActions();
        }

        cEditor.toolbar.toolbox.close();
        cEditor.toolbar.settings.close();

    },

    cancelRemovingRequest : function() {

        cEditor.toolbar.settings.actions.classList.remove('opened');
    },

    confirmRemovingRequest : function() {

        var currentBlock = cEditor.content.currentNode,
            firstLevelBlocksCount;

        currentBlock.remove();

        firstLevelBlocksCount = cEditor.nodes.redactor.childNodes.length;

        /**
        * If all blocks are removed
        */
        if (firstLevelBlocksCount === 0) {

            /** update currentNode variable */
            cEditor.content.currentNode = null;

            /** Inserting new empty initial block */
            cEditor.ui.addInitialBlock();
        }

        cEditor.ui.saveInputs();

        cEditor.toolbar.close();
    },

    showRemoveActions : function() {
        cEditor.toolbar.settings.actions.classList.add('opened');
    },

    hideRemoveActions : function() {
        cEditor.toolbar.settings.actions.classList.remove('opened');
    }

};

/**
 * This is a inline toolbar that works with selected word.
 * Ex: Wraps text to B, U, I tags and so on.
 * Also this toolbar will be used for making text a link
 */
cEditor.toolbar.inline = {

    buttonsOpened : null,
    actionsOpened : null,

    wrappersOffset : null,

    /**
     * saving selection that need for execCommand for styling
     *
     */
    storedSelection : null,

    /**
     * @protected
     *
     * Open inline toobar
     */
    show : function() {

        var selectedText = this.getSelectionText(),
            toolbar      = cEditor.nodes.inlineToolbar.wrapper,
            buttons      = cEditor.nodes.inlineToolbar.buttons;

        if (selectedText.length > 0) {

            /** Move toolbar and open */
            cEditor.toolbar.inline.move();

            /** Open inline toolbar */
            toolbar.classList.add('opened');

            /** show buttons of inline toolbar */
            cEditor.toolbar.inline.showButtons();
        }

    },

    /**
     * @protected
     *
     * Closes inline toolbar
     */
    close : function() {
        var toolbar = cEditor.nodes.inlineToolbar.wrapper;
        toolbar.classList.remove('opened');
    },

    /**
     * @private
     *
     * Moving toolbar
     */
    move : function() {

        if (!this.wrappersOffset) {
            this.wrappersOffset = this.getWrappersOffset();
        }

        var coords          = this.getSelectionCoords(),
            defaultOffset   = 0,
            toolbar         = cEditor.nodes.inlineToolbar.wrapper,
            newCoordinateX,
            newCoordinateY;

        if (toolbar.offsetHeight === 0) {
            defaultOffset = 40;
        }

        newCoordinateX = coords.x - this.wrappersOffset.left;
        newCoordinateY = coords.y + window.scrollY - this.wrappersOffset.top - defaultOffset - toolbar.offsetHeight;

        toolbar.style.transform = `translate3D(${Math.floor(newCoordinateX)}px, ${Math.floor(newCoordinateY)}px, 0)`;

        /** Close everything */
        cEditor.toolbar.inline.closeButtons();
        cEditor.toolbar.inline.closeAction();

    },

    /**
     * @private
     *
     * Tool Clicked
     */

    toolClicked : function(event, type) {

        /**
         * For simple tools we use default browser function
         * For more complicated tools, we should write our own behavior
         */
        switch (type) {
            case 'createLink' : cEditor.toolbar.inline.createLinkAction(event, type); break;
            default           : cEditor.toolbar.inline.defaultToolAction(type); break;
        }

        /**
         * highlight buttons
         * after making some action
         */
        cEditor.nodes.inlineToolbar.buttons.childNodes.forEach(cEditor.toolbar.inline.hightlight);
    },

    /**
     * @private
     *
     * Saving wrappers offset in DOM
     */
    getWrappersOffset : function() {

        var wrapper = cEditor.nodes.wrapper,
            offset  = this.getOffset(wrapper);

        this.wrappersOffset = offset;
        return offset;

    },

    /**
     * @private
     *
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
    },

    /**
     * @private
     *
     * Calculates position of selected text
     * @returns {{x: number, y: number}}
     */
    getSelectionCoords : function() {

        var sel = document.selection, range;
        var x = 0, y = 0;

        if (sel) {

            if (sel.type != "Control") {
                range = sel.createRange();
                range.collapse(true);
                x = range.boundingLeft;
                y = range.boundingTop;
            }

        } else if (window.getSelection) {

            sel = window.getSelection();

            if (sel.rangeCount) {

                range = sel.getRangeAt(0).cloneRange();
                if (range.getClientRects) {
                    range.collapse(true);
                    var rect = range.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                }

            }
        }
        return { x: x, y: y };
    },

    /**
     * @private
     *
     * Returns selected text as String
     * @returns {string}
     */
    getSelectionText : function getSelectionText(){

        var selectedText = "";

        if (window.getSelection){ // all modern browsers and IE9+
            selectedText = window.getSelection().toString();
        }

        return selectedText;
    },

    /** Opens buttons block */
    showButtons : function() {

        var buttons = cEditor.nodes.inlineToolbar.buttons;
        buttons.classList.add('opened');

        cEditor.toolbar.inline.buttonsOpened = true;

        /** highlight buttons */
        cEditor.nodes.inlineToolbar.buttons.childNodes.forEach(cEditor.toolbar.inline.hightlight);

    },

    /** Makes buttons disappear */
    closeButtons : function() {
        var buttons = cEditor.nodes.inlineToolbar.buttons;
        buttons.classList.remove('opened');

        cEditor.toolbar.inline.buttonsOpened = false;
    },

    /** Open buttons defined action if exist */
    showActions : function() {
        var action = cEditor.nodes.inlineToolbar.actions;
        action.classList.add('opened');

        cEditor.toolbar.inline.actionsOpened = true;
    },

    /** Close actions block */
    closeAction : function() {
        var action = cEditor.nodes.inlineToolbar.actions;
        action.innerHTML = '';
        action.classList.remove('opened');
        cEditor.toolbar.inline.actionsOpened = false;
    },

    /** Action for link creation or for setting anchor */
    createLinkAction : function(event, type) {

        var isActive = this.isLinkActive();

        var editable        = cEditor.content.currentNode,
            storedSelection = cEditor.toolbar.inline.storedSelection;

        if (isActive) {

            var selection   = window.getSelection(),
                anchorNode  = selection.anchorNode;

            storedSelection = cEditor.toolbar.inline.saveSelection(editable);

            /**
             * Changing stored selection. if we want to remove anchor from word
             * we should remove anchor from whole word, not only selected part.
             * The solution is than we get the length of current link
             * Change start position to - end of selection minus length of anchor
             */
            cEditor.toolbar.inline.restoreSelection(editable, storedSelection);

            cEditor.toolbar.inline.defaultToolAction('unlink');

        } else {

            /** Create input and close buttons */
            var action = cEditor.draw.inputForLink();
            cEditor.nodes.inlineToolbar.actions.appendChild(action);

            cEditor.toolbar.inline.closeButtons();
            cEditor.toolbar.inline.showActions();

            storedSelection = cEditor.toolbar.inline.saveSelection(editable);

            /**
             * focus to input
             * Solution: https://developer.mozilla.org/ru/docs/Web/API/HTMLElement/focus
             * Prevents event after showing input and when we need to focus an input which is in unexisted form
             */
            action.focus();
            event.preventDefault();

            /** Callback to link action */
            action.addEventListener('keydown', function(event){

                if (event.keyCode == cEditor.core.keys.ENTER) {

                    cEditor.toolbar.inline.restoreSelection(editable, storedSelection);
                    cEditor.toolbar.inline.setAnchor(action.value);

                    /**
                     * Preventing events that will be able to happen
                     */
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    cEditor.toolbar.inline.clearRange();
                }

            }, false);
        }
    },

    isLinkActive : function() {

        var isActive = false;

        cEditor.nodes.inlineToolbar.buttons.childNodes.forEach(function(tool) {
            var dataType = tool.dataset.type;

            if (dataType == 'link' && tool.classList.contains('hightlighted')) {
                isActive = true;
            }
        });

        return isActive;
    },

    /** default action behavior of tool */
    defaultToolAction : function(type) {
        document.execCommand(type, false, null);
    },

    /**
     * @private
     *
     * Sets URL
     *
     * @param {String} url - URL
     */
    setAnchor : function(url) {

        document.execCommand('createLink', false, url);

        /** Close after URL inserting */
        cEditor.toolbar.inline.closeAction();
    },

    /**
     * @private
     *
     * Saves selection
     */
    saveSelection : function(containerEl) {

        var range = window.getSelection().getRangeAt(0),
            preSelectionRange = range.cloneRange(),
            start;

        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);

        start = preSelectionRange.toString().length;

        return {
            start: start,
            end: start + range.toString().length
        };
    },

    /**
     * @private
     *
     * Sets to previous selection (Range)
     *
     * @param {Element} containerEl - editable element where we restore range
     * @param {Object} savedSel - range basic information to restore
     */
    restoreSelection : function(containerEl, savedSel) {

        var range     = document.createRange(),
            charIndex = 0;

        range.setStart(containerEl, 0);
        range.collapse(true);

        var nodeStack = [containerEl],
            node,
            foundStart = false,
            stop = false,
            nextCharIndex;

        while (!stop && (node = nodeStack.pop())) {

            if (node.nodeType == 3) {

                nextCharIndex = charIndex + node.length;

                if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                    range.setStart(node, savedSel.start - charIndex);
                    foundStart = true;
                }
                if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                    range.setEnd(node, savedSel.end - charIndex);
                    stop = true;
                }
                charIndex = nextCharIndex;
            } else {
                var i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    },

    /**
     * @private
     *
     * Removes all ranges from window selection
     */
    clearRange : function() {
        var selection = window.getSelection();
        selection.removeAllRanges();
    },

    /**
     * @private
     *
     * sets or removes hightlight
     */
    hightlight : function(tool) {
        var dataType = tool.dataset.type;

        if (document.queryCommandState(dataType)) {
            cEditor.toolbar.inline.setButtonHighlighted(tool);
        } else {
            cEditor.toolbar.inline.removeButtonsHighLight(tool);
        }

        /**
         *
         * hightlight for anchors
         */
        var selection = window.getSelection(),
            tag = selection.anchorNode.parentNode;

        if (tag.tagName == 'A' && dataType == 'link') {
            cEditor.toolbar.inline.setButtonHighlighted(tool);
        }
    },

    /**
     * @private
     *
     * Mark button if text is already executed
     */
    setButtonHighlighted : function(button) {
        button.classList.add('hightlighted');

        /** At link tool we also change icon */
        if (button.dataset.type == 'link') {
            var icon = button.childNodes[0];
            icon.classList.remove('ce-icon-link');
            icon.classList.add('ce-icon-unlink');
        }
    },

    /**
     * @private
     *
     * Removes hightlight
     */
    removeButtonsHighLight : function(button) {
        button.classList.remove('hightlighted');

        /** At link tool we also change icon */
        if (button.dataset.type == 'link') {
            var icon = button.childNodes[0];
            icon.classList.remove('ce-icon-unlink');
            icon.classList.add('ce-icon-link');
        }
    }

};

/**
* File transport module
*/
cEditor.transport = {

    input : null,

    /**
    * @property {Object} arguments - keep plugin settings and defined callbacks
    */
    arguments : null,

    prepare : function(){

        var input = document.createElement('INPUT');

        input.type = 'file';
        input.addEventListener('change', cEditor.transport.fileSelected);

        cEditor.transport.input = input;

    },

    /** Clear input when files is uploaded */
    clearInput : function() {

        /** Remove old input */
        this.input = null;

        /** Prepare new one */
        this.prepare();
    },

    /**
    * Callback for file selection
    */
    fileSelected : function(event){

        var input       = this,
            files       = input.files,
            filesLength = files.length,
            formdData   = new FormData(),
            file,
            i;

        formdData.append('files', files[0], files[0].name);

        cEditor.transport.ajax({
            data : formdData,
            beforeSend : cEditor.transport.arguments.beforeSend,
            success    : cEditor.transport.arguments.success,
            error      : cEditor.transport.arguments.error,
        });
    },

    /**
    * Use plugin callbacks
    * @protected
    */
    selectAndUpload : function (args) {

        this.arguments = args;
        this.input.click();

    },

    /**
    * Ajax requests module
    */
    ajax : function(params){

        var xhr = new XMLHttpRequest(),
            beforeSend = typeof params.beforeSend == 'function' ? params.beforeSend : function(){},
            success    = typeof params.success    == 'function' ? params.success : function(){},
            error      = typeof params.error      == 'function' ? params.error   : function(){};

        beforeSend();

        xhr.open('POST', cEditor.settings.uploadImagesUrl, true);

        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.onload = function () {
            if (xhr.status === 200) {
                success(xhr.responseText);
            } else {
                console.log("request error: %o", xhr);
                error();
            }
        };

        xhr.send(params.data);
        this.clearInput();

    }

};


/**
* Content parsing module
*/
cEditor.parser = {

    /**
    * Splits content by `\n` and returns blocks
    */
    getSeparatedTexttSeparatedTextFromContent : function(content) {
        return content.split('\n');
    },

    /** inserting text */
    insertPastedContent : function(content) {

        var blocks = this.getSeparatedTextFromContent(content),
            i,
            inputIndex = cEditor.caret.getCurrentInputIndex(),
            textNode,
            parsedTextContent;

        for(i = 0; i < blocks.length; i++) {

            blocks[i].trim();

            if (blocks[i]) {
                var data = cEditor.draw.pluginsRender('paragraph', blocks[i]);
                cEditor.content.insertBlock(data);
            }
        }

    },

    /**
    * Asynchronously parses textarea input string to HTML editor blocks
    */
    parseTextareaContent : function () {

        var initialContent = cEditor.nodes.textarea.value;

        if ( initialContent.trim().length === 0 ) return true;


        cEditor.parser

            /** Get child nodes async-aware */
            .getNodesFromString(initialContent)

            /** Then append nodes to the redactor */
            .then(cEditor.parser.appendNodesToRedactor)

            /** Write log if something goes wrong */
            .catch(function(error) {
                cEditor.core.log('Error while parsing content: %o', 'warn', error);
            });

    },

    /**
    * Parses string to nodeList
    * @param string inputString
    * @return Primise -> nodeList
    */
    getNodesFromString : function (inputString) {

        return Promise.resolve().then(function() {

                var contentHolder = document.createElement('div');

                contentHolder.innerHTML = inputString;

                /**
                *    Returning childNodes will include:
                *        - Elements (html-tags),
                *        - Texts (empty-spaces or non-wrapped strings )
                *        - Comments and other
                */
                return contentHolder.childNodes;

        });
    },

    /**
    * Appends nodes to the redactor
    * @param nodeList nodes - list for nodes to append
    */
    appendNodesToRedactor : function(nodes) {

        /**
        * Sequence of one-by-one nodes appending
        * Uses to save blocks order after async-handler
        */
        var nodeSequence = Promise.resolve();


        for (var index = 0; index < nodes.length ; index++ ) {

            /** Add node to sequence at specified index */
            cEditor.parser.appendNodeAtIndex(nodeSequence, nodes, index);

        }

    },

    /**
    * Append node at specified index
    */
    appendNodeAtIndex : function (nodeSequence, nodes, index) {

        /** We need to append node to sequence */
        nodeSequence

            /** first, get node async-aware */
            .then(function() {

                return cEditor.parser.getNodeAsync(nodes , index);

            })

            /**
            *    second, compose editor-block from node
            *    and append it to redactor
            */
            .then(function(node){

                var block = cEditor.parser.createBlockByDomNode(node);

                if ( cEditor.core.isDomNode(block) ) {

                    block.contentEditable = "true";

                    /** Mark node as redactor block*/
                    block.classList.add('ce-block');

                    /** Append block to the redactor */
                    cEditor.nodes.redactor.appendChild(block);

                    /** Save block to the cEditor.state array */
                    cEditor.state.blocks.push(block);

                    return block;

                }
                return null;
            })

            .then(cEditor.ui.addBlockHandlers)

            /** Log if something wrong with node */
            .catch(function(error) {
                cEditor.core.log('Node skipped while parsing because %o', 'warn', error);
            });

    },

    /**
    * Asynchronously returns node from nodeList by index
    * @return Promise to node
    */
    getNodeAsync : function (nodeList, index) {

        return Promise.resolve().then(function() {

            return nodeList.item(index);

        });
    },

    /**
    * Creates editor block by DOM node
    *
    * First-level blocks (see cEditor.settings.blockTags) saves as-is,
    * other wrapps with <p>-tag
    *
    * @param DOMnode node
    * @return First-level node (paragraph)
    */
    createBlockByDomNode : function (node) {

        /** First level nodes already appears as blocks */
        if ( cEditor.parser.isFirstLevelBlock(node) ){

            /** Save plugin type in data-type */
            node = this.storeBlockType(node);

            return node;
        }

        /** Other nodes wraps into parent block (paragraph-tag) */
        var parentBlock,
            nodeContent     = node.textContent.trim(),
            isPlainTextNode = node.nodeType != cEditor.core.nodeTypes.TAG;


        /** Skip empty textNodes with space-symbols */
        if (isPlainTextNode && !nodeContent.length) return null;

        /** Make <p> tag */
        parentBlock = cEditor.draw.block('P');

        if (isPlainTextNode){
            parentBlock.textContent = nodeContent.replace(/(\s){2,}/, '$1'); // remove double spaces
        } else {
            parentBlock.appendChild(node);
        }

        /** Save plugin type in data-type */
        parentBlock = this.storeBlockType(parentBlock);

        return parentBlock;

    },

    /**
    * It's a crutch
    * - - - - - - -
    * We need block type stored as data-attr
    * Now supports only simple blocks : P, HEADER, QUOTE, CODE
    * Remove it after updating parser module for the block-oriented structure:
    *       - each block must have stored type
    * @param {Element} node
    */
    storeBlockType : function (node) {

        switch (node.tagName) {
            case 'P' :          node.dataset.type = 'paragraph'; break;
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':          node.dataset.type = 'header'; break;
            case 'BLOCKQUOTE':  node.dataset.type = 'quote'; break;
            case 'CODE':        node.dataset.type = 'code'; break;
        }

        return node;

    },

    /**
    * Check DOM node for display style: separated block or child-view
    */
    isFirstLevelBlock : function (node) {

        return node.nodeType == cEditor.core.nodeTypes.TAG &&
               node.classList.contains(cEditor.ui.className.BLOCK_CLASSNAME);

    }

};

/**
* Creates HTML elements
*/
cEditor.draw = {

    /**
    * Base editor wrapper
    */
    wrapper : function () {

        var wrapper = document.createElement('div');

        wrapper.className += 'codex-editor';

        return wrapper;

    },

    /**
    * Content-editable holder
    */
    redactor : function () {

        var redactor = document.createElement('div');

        redactor.className += 'ce-redactor';

        return redactor;

    },

    ceBlock : function() {

        var block = document.createElement('DIV');

        block.className += 'ce_block';

        return block;

    },
    /**
    * Empty toolbar with toggler
    */
    toolbar : function () {

        var bar = document.createElement('div');

        bar.className += 'ce-toolbar';

        return bar;
    },

    /**
     * Inline toolbar
     */
    inlineToolbar : function() {

        var bar = document.createElement('DIV');

        bar.className += 'ce-toolbar-inline';

        return bar;

    },

    /**
     * Wrapper for inline toobar buttons
     */
    inlineToolbarButtons : function() {

        var wrapper = document.createElement('DIV');

        wrapper.className += 'ce-toolbar-inline__buttons';

        return wrapper;
    },

    /**
     * For some actions
     */
    inlineToolbarActions : function() {

        var wrapper = document.createElement('DIV');

        wrapper.className += 'ce-toolbar-inline__actions';

        return wrapper;

    },

    inputForLink : function() {

        var input = document.createElement('INPUT');

        input.type        = 'input';
        input.className  += 'inputForLink';
        input.placeholder = 'Type URL ...';
        input.setAttribute('form', 'defaultForm');

        input.setAttribute('autofocus', 'autofocus');

        return input;

    },

    /**
    * Block with notifications
    */
    alertsHolder : function() {

        var block = document.createElement('div');

        block.classList.add('ce_notifications-block');

        return block;

    },

    /**
    * @todo Desc
    */
    blockButtons : function() {

        var block = document.createElement('div');

        block.className += 'ce-toolbar__actions';

        return block;
    },

    /**
    * Block settings panel
    */
    blockSettings : function () {

        var settings = document.createElement('div');

        settings.className += 'ce-settings';

        return settings;
    },

    defaultSettings : function() {

        var div = document.createElement('div');

        div.classList.add('ce-settings_default');

        return div;
    },

    pluginsSettings : function() {

        var div = document.createElement('div');

        div.classList.add('ce-settings_plugin');

        return div;

    },

    plusButton : function() {

        var button = document.createElement('span');

        button.className = 'ce-toolbar__plus';
        // button.innerHTML = '<i class="ce-icon-plus"></i>';

        return button;
    },

    /**
    * Settings button in toolbar
    */
    settingsButton : function () {

        var toggler = document.createElement('span');

        toggler.className = 'ce-toolbar__settings-btn';

        /** Toggler button*/
        toggler.innerHTML = '<i class="ce-icon-cog"></i>';

        return toggler;
    },

    /**
    * Redactor tools wrapper
    */

    toolbox : function() {

        var wrapper = document.createElement('div');

        wrapper.className = 'ce-toolbar__tools';

        return wrapper;
    },

    /**
     * @protected
     *
     * Draws tool buttons for toolbox
     *
     * @param {String} type
     * @param {String} classname
     * @returns {Element}
     */
    toolbarButton : function (type, classname) {

        var button     = document.createElement("li"),
            tool_icon  = document.createElement("i"),
            tool_title = document.createElement("span");

        button.dataset.type = type;
        button.setAttribute('title', type);

        tool_icon.classList.add(classname);
        tool_title.classList.add('ce_toolbar_tools--title');


        button.appendChild(tool_icon);
        button.appendChild(tool_title);

        return button;

    },

    /**
     * @protected
     *
     * Draws tools for inline toolbar
     *
     * @param {String} type
     * @param {String} classname
     */
    toolbarButtonInline : function(type, classname) {
        var button     = document.createElement("BUTTON"),
            tool_icon  = document.createElement("I");

        button.type = "button";
        button.dataset.type = type;
        tool_icon.classList.add(classname);

        button.appendChild(tool_icon);

        return button;
    },

    /**
    * Redactor block
    */
    block : function (tagName, content) {

        var node = document.createElement(tagName);

        node.innerHTML = content || '';

        return node;

    },

    /**
     * Creates Node with passed tagName and className
     * @param {string}  tagName
     * @param {string} className
     * @param {object} properties - allow to assign properties
     */
    node : function( tagName , className , properties ){

        var el = document.createElement( tagName );

        if ( className ) el.className = className;

        if ( properties ) {

            for (var name in properties){
                el[name] = properties[name];
            }
        }

        return el;
    },

    pluginsRender : function(type, content) {

        return {
            type  : type,
            block : cEditor.tools[type].render({
                text : content
            })
        };
    }

};

/** Module which extends notifications and make different animations for logs */
cEditor.notifications = {

    /**
    * Error notificator. Shows block with message
    * @protected
    */
    errorThrown : function(errorMsg, event) {

        cEditor.notifications.send('This action is not available currently', event.type, false);

    },

    /**
    * Appends notification with different types
    * @param message {string} - Error or alert message
    * @param type {string} - Type of message notification. Ex: Error, Warning, Danger ...
    * @param append {boolean} - can be True or False when notification should be inserted after
    */
    send : function(message, type, append) {

        var notification = cEditor.draw.block('div');

        notification.textContent = message;
        notification.classList.add('ce_notification-item', 'ce_notification-' + type, 'flipInX');

        if (!append) {
            cEditor.nodes.notifications.innerHTML = '';
        }

        cEditor.nodes.notifications.appendChild(notification);

        setTimeout(function () {
            notification.remove();
        }, 3000);

    },
};


/**
* Developer plugins
*/

cEditor.tools = {

};
