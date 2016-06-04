/**
* Some UI experiments for CodeX Editor
* @author Savchenko Peter (vk.com/specc)
*/

var ce = function(textareaId) {

    this.resultTextarea = document.getElementById(textareaId);

    if (typeof this.resultTextarea == undefined || this.resultTextarea == null ){

        console.warn('Textarea not found with ID %o', textareaId);
        return this;

    }

    this.toolbarOpened = false;
    this.tools = ['header', 'picture', 'list', 'quote', 'code', 'twitter', 'instagram', 'smile'];
    this.BUTTONS_TOGGLED_CLASSNANE = 'buttons_toggled';

    /** Bind all events */
    this.bindEvents();

}

/**
* All events binds in one place
*/
ce.prototype.bindEvents = function () {

    var _this = this;

    window.addEventListener('keydown', function (event) {
        _this.globalKeydownCallback(event);
    }, false );

}

/**
* All window keydowns handles here
*/
ce.prototype.globalKeydownCallback = function (event) {

    switch (event.keyCode){
        case 9: this.tabKeyPressed(event); break; // TAB
        case 13: this.enterKeyPressed(event); break; // Enter
    }

}

/**
* @todo: check if currently focused in contenteditable element
*/
ce.prototype.tabKeyPressed = function(event) {

    var toolbar = document.getElementsByClassName('add_buttons');

    if ( !toolbar[0].className.includes(this.BUTTONS_TOGGLED_CLASSNANE) ){
        toolbar[0].className += ' ' + this.BUTTONS_TOGGLED_CLASSNANE;
        this.toolbarOpened = true;
    } else {
        toolbar[0].className = toolbar[0].className.replace(this.BUTTONS_TOGGLED_CLASSNANE, '');
        this.toolbarOpened = false
    }

    event.preventDefault();

}

/**
* Handle Enter key. Adds new Node;
*/
ce.prototype.enterKeyPressed = function(event) {

      console.log('ENTER');

}