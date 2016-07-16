/**
* Minimal, lightview and universal code highilting
* @author Savchenko Peter (vk.com/specc)
*/
var simpleCode = (function(simpleCode) {

    simpleCode.rules = {

        tags : function (str) {
            return str.replace( /(&lt;[\/a-z]+(&gt;)?)/gi , '<span class=sc_tag>$1</span>' );
        },
        attrs : function (str) {
            return str.replace( /"([^"]+)"/gi , '"<span class=sc_attr>$1</span>"' );
        },
        strings : function (str) {
            return str.replace( /'([^']+)'/gi , '\'<span class=sc_attr>$1</span>\'' );
        },
        keywords : function (str) {
            return str.replace(/\b(var|function|typeof|return|endif|endforeach|foreach|if|for|in|while|break|do|continue|switch|case|int|void|python|from|import|install|def|virtualenv|source|sudo|git)([^a-z0-9\$_])/g, '<span class=sc_keyword>$1</span>$2');
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

        for (var rule in simpleCode.rules){
            origin = simpleCode.rules[rule](origin);
        }

        el.innerHTML = origin;

    };

    simpleCode.addStyles = function() {
        var styleInstance = 'simpleCodeStylingCss',
            style         = document.getElementById(styleInstance),
            css =   '.sc_attr{color: #F57975;}' +
                    '.sc_tag{color: #7DA3F4;}' +
                    '.sc_keyword{color: #C97AC1;}' +
                    '.sc_digt{color: #37D755;}'+
                    '.sc_var{color: #8199C6;}' +
                    '.sc_color{display: inline-block;line-height: 1em;border-bottom-width:2px;border-bottom-style:solid;}';

        if (!style) {
            style = document.createElement('style');
            style.id = styleInstance;
            style.innerHTML = css;

            document.head.appendChild(style);
        }

    };

    simpleCode.init = function(selector){

        simpleCode.addStyles();

        var code_elements = document.querySelectorAll(selector);

        for (var i = code_elements.length - 1; i >= 0; i--) {
           simpleCode.process(code_elements[i]);
        }

    };

    return simpleCode;

})({});
