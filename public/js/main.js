function r(f){/in/.test(document.readyState) ? setTimeout(r,9,f) : f();}


var helpers = (function(helpers) {

    helpers.setCookie = function (name, value, expires, path, domain){
        var str = name + '='+value;
        if (expires) str += '; expires=' + expires.toGMTString();
        if (path)    str += '; path=' + path;
        if (domain)  str += '; domain=' + domain;
        document.cookie = str;
    }

    helpers.getCookie = function (name) {

        var dc = document.cookie;

        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else
            begin += 2;

        var end = document.cookie.indexOf(";", begin);
        if (end == -1) end = dc.length;

        return unescape(dc.substring(begin + prefix.length, end));
    }

    return helpers;

})({});

/**
* Class for load static scripts and styles
*/
var load = function( window ){
    var version_name   = 'data-version',
        prefix  = {
            script  : 'codex_script_',
            css     : 'codex_css_'
        };

    function createSCRIPT(){

        var tag = document.createElement( 'script' );

        !! this.loadType && tag.setAttribute( this.loadType, true );

        tag.setAttribute( 'type', 'text/javascript' );
        tag.setAttribute( 'charset',  this.charset || 'windows-1251'); // Safari doesn't work without it correctly

        return tag;
    }

    function createCSS(){

        var tag = document.createElement( 'link' );

        tag.setAttribute( 'type', 'text/css' );
        tag.setAttribute( 'rel', 'stylesheet');

        return tag;
    }

    function appendToHead( tag, type ){

        var firstElementTag = document.getElementsByTagName( type );
        ( firstElementTag.length )
            ? firstElementTag[0].parentNode.insertBefore( tag, firstElementTag[0] )
            : document.head.appendChild( tag );
    }

    function setSOURCE( settings ){

        this.id = settings.id;
        this.onload = settings.callback;
        this.setAttribute( version_name,    settings.version );
        var name;
        switch( this.nodeName ){
            case 'SCRIPT':
                this.setAttribute( 'async', !!settings.async );
                if (settings.defer) this.setAttribute( 'defer' , !!settings.defer );
                if (settings.loadCallback) this.addEventListener('load' , settings.loadCallback, false);
                name = 'src';
                break;
            case 'LINK':
                name = 'href';
                break;
        }
        this.setAttribute( name, settings.url );
    }

    function createNode( old, settings ){

        !! old && old.parentNode.removeChild( old );

        var tag;

        switch( this.valueOf() ){
            case 'script':
                tag = createSCRIPT.call( settings );
                setSOURCE.call( tag, settings );
                appendToHead( tag, 'script' );
                break;
            case 'css':
                tag = createCSS.call( settings );
                setSOURCE.call( tag, settings );
                appendToHead( tag, 'link' );
                break;
        }
    }

    // Settings are:
    // {
    //      'url'       :   url,
    //      'async'     :   true/false,
    //      'callback'  :   function(){...}
    //      'instance'  :   'instance of the loadings class'
    //      'id'        :   script tag id
    //      'defer'     :   if need defer attr
    //      'version'   :   static script version
    // }
    function getElement( name, settings ){

        if (!settings.instance) cLog('Incorrect instance passed: ' + settings.url, 'DYNAMIC LOAD', 'warn');

        settings.id         = prefix[ name ] + settings.instance;
        settings.version    = ! settings.version ? 0 : settings.version;

        var elem = document.getElementById( settings.id ),
            version;

        if( ! elem ){
            createNode.call( name, elem, settings );
            return;
        } else {
            /** Class already loaded */
            cLog('Class %o already loaded', 'LOAD', 'log', settings.instance);
            typeof settings.loadCallback === 'function' && settings.loadCallback.call();
        }

        version = elem.getAttribute( version_name );

        if( ! version || version != settings.version ){
            createNode.call( name, elem, settings );
            return;
        } //load

        typeof settings.callback === 'function' && settings.callback();
    }

    function LOAD () {}

    LOAD.prototype.getScript = function( settings ){
        getElement( 'script', settings );
    };

    LOAD.prototype.getCss = function( settings ){
        getElement( 'css', settings );
    };

    return new LOAD();
}( window );


var callbacks = (function(callbacks) {

    callbacks.checkUserCanEdit = function (event) {

        var textarea       = event.target,
            isUserLogon    = helpers.getCookie('uid'),
            blankAuthBlock = document.getElementById('blankAuthBlock'),
            emailInput     = document.getElementById('blankEmailInput');

        // var blankSkillsTextarea = document.getElementById('blankSkillsTextarea'),
        //     blankWishesTextarea = document.getElementById('blankWishesTextarea'),
        //     blankSendButton     = document.getElementById('blankSendButton');

        if (!isUserLogon && !emailInput.value.length ) {

            if (!blankAuthBlock.className.includes('wobble')) {
                blankAuthBlock.className += ' wobble';
                setTimeout(function() {
                    blankAuthBlock.className = blankAuthBlock.className.replace('wobble', '');
                }, 450);

                textarea.value = '';

            };

        }

        // if (blankSkillsTextarea.value.length && blankWishesTextarea.value.length) {
        //     console.log(blankSendButton);
        //     blankSendButton.removeAttribute('disabled');
        // };


    }

    callbacks.showAdditionalFields = function (event) {

        var blankAdditionalFields = document.getElementById('blankAdditionalFields');

        if (blankAdditionalFields.className.includes('hide')) {
            blankAdditionalFields.className = blankAdditionalFields.className.replace('hide', '');
        } else {
            blankAdditionalFields.className += ' hide';
        }


    }

    callbacks.checkUser = function (event, uid) {

        var checker = document.getElementById('u' + uid);

        uid = parseInt(uid , 10);

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

                };
            }
        })
    }

    callbacks.saveProfilePhoto = {

        success: function (new_photo_name) {

                    var old_photo = document.getElementById('profile-photo');

                    old_photo.src = new_photo_name;

                }

    }

    return callbacks;

})({});


var xhr = (function(xhr){

    var objectToQueryString = function (a) {
        var prefix, s, add, name, r20, output;
        s = [];
        r20 = /%20/g;
        add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
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
        output = s.join("&").replace(r20, "+");
        return output;
    };

    var buildParams = function(prefix, obj, add) {
        var name, i, l, rbracket;
        rbracket = /\[\]$/;
        if (obj instanceof Array) {
            for (i = 0, l = obj.length; i < l; i++) {
                if (rbracket.test(prefix)) {
                    add(prefix, obj[i]);
                } else {
                    buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
                }
            }
        } else if (typeof obj == "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[ name ], add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    xhr.call = function ( data ) {

        if ( !data || !data['url'] ){

            console.warn('url wasn\'t passed into ajax method' );
            return;

        }

        var XMLHTTP              = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
            success_function     = function( r ){};

            data['type']         = data['type'] || 'GET';
            data['url']          = data['url'];
            data['content-type'] = data['contentType'] || 'text/html';
            data['async']        = data['async'] || false;
            data['data']         = data['data'] || '';
            data['formData']     = data['formData'] || false;
            success_function     = data['success'] || success_function ;

        if ( data['type'] == 'GET' && data['data'] ){

            data['url'] = /\?/.test(data['url']) ? data['url'] + '&' + data['data'] : data['url'] + '?' + data['data'];

        }

        if (data['beforeSend'] && typeof data['beforeSend'] == 'function') {
            data['beforeSend'].call();
        };

        XMLHTTP.open( data['type'], data['url'], data['async'] );
        XMLHTTP.setRequestHeader("Content-type", data['content-type'] );
        XMLHTTP.setRequestHeader("Connection", "close");
        XMLHTTP.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        XMLHTTP.onreadystatechange = function(){

            if ( XMLHTTP.readyState == 4 && XMLHTTP.status == 200 ){

                success_function(XMLHTTP.responseText);

            }
        };

        XMLHTTP.send( data['formData'] || objectToQueryString(data['data']) );


    };

    xhr.parseHTML = function(markup) {

        var doc = document.implementation.createHTMLDocument("");

        if (markup.toLowerCase().indexOf('<!doctype') > -1) {
            doc.documentElement.innerHTML = markup;
        } else {
            doc.body.innerHTML = markup;
        }
        return doc;
    }


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

        function urlencode (str) {
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
    }


    return xhr;

})({});


r(function(){

    var joinBlank = document.getElementById('joinBlank');
    if ( typeof joinBlank != 'undefined' && joinBlank != null ){
        var joinBlankTextareas = joinBlank.getElementsByTagName('textarea');
        if (joinBlankTextareas.length) {

            for (var i = joinBlankTextareas.length - 1; i >= 0; i--) {
                joinBlankTextareas[i].addEventListener('keyup', callbacks.checkUserCanEdit, false);
            };

        };
    }

    var blankShowAdditionalFieldsButton = document.getElementById('blankShowAdditionalFieldsButton');
    if ( typeof blankShowAdditionalFieldsButton != 'undefined' && blankShowAdditionalFieldsButton != null ){

        blankShowAdditionalFieldsButton.addEventListener('click', callbacks.showAdditionalFields, false);

    }


    /** <code> highlighting */
    var sourcesBlocks = document.querySelectorAll(".article_content code");
    if (sourcesBlocks.length){
        load.getScript({
            async    : true,
            url      : '/public/js/simpleCodeStyling.js',
            instance : 'simpleCodeStyling',
            loadCallback : function(response){
                simpleCode.init('.article_content code');
            }
        });
    }

    /** File transport button handlers */
    var fileTransportButtons = document.getElementsByClassName("file-transport-button");
    if (fileTransportButtons.length){
        load.getScript({
            async    : true,
            url      : '/public/js/transport.js',
            instance : 'fileTransport',
            loadCallback : function(response){

                transport.init(fileTransportButtons);

            }
        });
    }






});

document.documentElement.className = document.documentElement.className.replace("no-js","js");

/**
* Polyfilling ECMAScript 6 method String.includes
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Browser_compatibility
*/
if ( !String.prototype.includes ) {

  String.prototype.includes = function() {

    'use strict';

    return String.prototype.indexOf.apply(this, arguments) !== -1;

  };
}