/**
 */
module.exports = function () {

    let prefixJS  = 'cdx-script-';
    let prefixCSS = 'cdx-style-';

    function importScript(scriptPath, instanceName) {

        return new Promise(function (resolve, reject) {

            let script;

            /** Script is already loaded */
            if ( !instanceName ) {

                reject('Instance name is missed');

            } else if ( document.getElementById(prefixJS + instanceName) ) {

                resolve(scriptPath);

            }

            script = document.createElement('SCRIPT');
            script.async = true;
            script.defer = true;
            script.id    = prefixJS + instanceName;

            script.onload = function () {

                resolve(scriptPath);

            };

            script.onerror = function () {

                reject(scriptPath);

            };

            script.src = scriptPath;
            document.head.appendChild(script);

        });

    }

    function importStyle(stylePath, instanceName) {

        return new Promise(function (resolve, reject) {

            let style;

            /** Style is already loaded */
            if ( !instanceName ) {

                reject('Instance name is missed');

            } else if ( document.getElementById(prefixCSS + instanceName) ) {

                resolve(stylePath);

            }

            style = document.createElement('LINK');
            style.type = 'text/css';
            style.href = stylePath;
            style.rel  = 'stylesheet';
            style.id   = prefixCSS + instanceName;

            style.onload = function () {

                resolve(stylePath);

            };

            style.onerror = function () {

                reject(stylePath);

            };

            style.src = stylePath;
            document.head.appendChild(style);

        });

    }

    return {
        importScript,
        importStyle
    };

}();
