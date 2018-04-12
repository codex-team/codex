module.exports = (function (helpers) {

    helpers.setCookie = function (name, value, expires, path, domain) {

        var str = name + '='+value;

        if (expires) str += '; expires=' + expires.toGMTString();
        if (path)    str += '; path=' + path;
        if (domain)  str += '; domain=' + domain;
        document.cookie = str;

    };

    helpers.getCookie = function (name) {

        var dc = document.cookie;

        var prefix = name + '=';
        var begin = dc.indexOf('; ' + prefix);

        if (begin == -1) {

            begin = dc.indexOf(prefix);
            if (begin !== 0) return null;

        } else
            begin += 2;

        var end = document.cookie.indexOf(';', begin);

        if (end == -1) end = dc.length;

        return unescape(dc.substring(begin + prefix.length, end));

    };

    helpers.getOffset = function ( el ) {

        var _x = 0;
        var _y = 0;

        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {

            _x += (el.offsetLeft + el.clientLeft);
            _y += (el.offsetTop + el.clientTop);
            el = el.offsetParent;

        }
        return { top: _y, left: _x };

    };

    return helpers;

})({});