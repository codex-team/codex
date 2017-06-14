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