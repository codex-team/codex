module.exports = function ( window ) {

    var version_name   = 'data-version',
        prefix  = {
            script  : 'codex_script_',
            css     : 'codex_css_'
        };

    function createSCRIPT() {

        var tag = document.createElement( 'script' );

        !! this.loadType && tag.setAttribute( this.loadType, true );

        tag.setAttribute( 'type', 'text/javascript' );
        tag.setAttribute( 'charset',  this.charset || 'windows-1251'); // Safari doesn't work without it correctly

        return tag;

    }

    function createCSS() {

        var tag = document.createElement( 'link' );

        tag.setAttribute( 'type', 'text/css' );
        tag.setAttribute( 'rel', 'stylesheet');

        return tag;

    }

    function appendToHead( tag, type ) {

        var firstElementTag = document.getElementsByTagName( type );

        ( firstElementTag.length )
            ? firstElementTag[0].parentNode.insertBefore( tag, firstElementTag[0] )
            : document.head.appendChild( tag );

    }

    function setSOURCE( settings ) {

        this.id = settings.id;
        this.onload = settings.callback;
        this.setAttribute( version_name,    settings.version );
        var name;

        switch( this.nodeName ) {
            case 'SCRIPT':
                this.setAttribute( 'async', !!settings.async );
                if (settings.defer) this.setAttribute( 'defer', !!settings.defer );
                if (settings.loadCallback) this.addEventListener('load', settings.loadCallback, false);
                name = 'src';
                break;
            case 'LINK':
                name = 'href';
                break;
        }
        this.setAttribute( name, settings.url );

    }

    function createNode( old, settings ) {

        !! old && old.parentNode.removeChild( old );

        var tag;

        switch( this.valueOf() ) {
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
    function getElement( name, settings ) {

        if (!settings.instance) cLog('Incorrect instance passed: ' + settings.url, 'DYNAMIC LOAD', 'warn');

        settings.id         = prefix[ name ] + settings.instance;
        settings.version    = ! settings.version ? 0 : settings.version;

        var elem = document.getElementById( settings.id ),
            version;

        if( ! elem ) {

            createNode.call( name, elem, settings );
            return;

        } else {

            /** Class already loaded */
            cLog('Class %o already loaded', 'LOAD', 'log', settings.instance);
            typeof settings.loadCallback === 'function' && settings.loadCallback.call();

        }

        version = elem.getAttribute( version_name );

        if( ! version || version != settings.version ) {

            createNode.call( name, elem, settings );
            return;

        } // load

        typeof settings.callback === 'function' && settings.callback();

    }

    function LOAD() {}

    LOAD.prototype.getScript = function ( settings ) {

        getElement( 'script', settings );

    };

    LOAD.prototype.getCss = function ( settings ) {

        getElement( 'css', settings );

    };

    return new LOAD();

}( window );