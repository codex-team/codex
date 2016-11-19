/**
 * Paste plugin.
 *
 * Listens on paste event and pastes content from:
 *  - Instagram
 *  - Twitter
 *  - VK
 *  - Facebook
 *  - Image
 *  - External Link
 *
 */

/**
 * @protected
 *
 * Main tool settings.
 *
 * @type {{PLUGINS_TYPE: string, make: pasteTool.make}}
 */
var pasteTool = {


    PLUGINS_TYPE : 'DIV',

    make : function() {

        return pasteTool.ui.make();

    },

    /**
     * Ajax requests module
     */
    ajax : function (data) {

        if (!data || !data.url){
            return;
        }

        var XMLHTTP          = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
            success_function = function(){};

        data.async           = true;
        data.type            = data.type || 'GET';
        data.data            = data.data || '';
        // data['content-type'] = data['content-type'] || 'application/json; charset=utf-8';
        success_function     = data.success || success_function ;

        if (data.type == 'GET' && data.data) {

            data.url = /\?/.test(data.url) ? data.url + '&' + data.data : data.url + '?' + data.data;

        } else {

            var params = '',
                obj;

            for(var obj in data.data) {
                params += (obj + '=' + encodeURIComponent(data.data[obj]) + '&');
            }

        }

        if (data.withCredentials) {
            XMLHTTP.withCredentials = true;
        }

        if (data.beforeSend && typeof data.beforeSend == 'function') {
            data.beforeSend.call();
        }

        XMLHTTP.open( data.type, data.url, data.async );
        XMLHTTP.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        XMLHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        XMLHTTP.onreadystatechange = function() {
            if (XMLHTTP.readyState == 4 && XMLHTTP.status == 200) {
                success_function(XMLHTTP.responseText);
            }
        };

        XMLHTTP.send(params);

    },

};


/**
 * @protected
 *
 * Works with content: insert and switch.
 *
 * @type {{}}
 */
pasteTool.content = {

    instagram : function(content) {

        cEditor.content.switchBlock(cEditor.content.currentNode, content, 'paste-instagram');

        /**
         * Use instagram script to upload embed
         */
        window.instgrm.Embeds.process();
    },

    twitter : function(tweetId) {

        var blockContent = cEditor.content.currentNode.childNodes[0],
            inputForPaste = blockContent.querySelector('.ce-paste');

        inputForPaste.remove();

        /**
         * Use twitter script to render tweet
         */
        window.twttr.widgets.createTweet(tweetId, blockContent);

        cEditor.content.currentNode.dataset.type = "paste-twitter";


    }

};

/**
 * @protected
 *
 * Make elements to insert or switch
 *
 * @type {{make: pasteTool.ui.make}}
 */
pasteTool.ui = {

    make : function() {

        var plugin = pasteTool.draw.block(pasteTool.PLUGINS_TYPE, 'ce-paste', {});

        plugin.addEventListener('paste', pasteTool.callbacks.pasted, false);

        return plugin;

    },

    /**
     * Drawing html content.
     *
     * @param url
     * @returns {Element} blockquote - HTML template for Instagram Embed JS
     */
    instagramBlock : function(url) {

        var blockquote = pasteTool.draw.block('BLOCKQUOTE', 'instagram-media ce-paste__instagram', {}),
            div = pasteTool.draw.block('DIV', '', {}),
            paragraph = pasteTool.draw.block('P', 'ce-paste__instagram--p', {}),
            anchor = pasteTool.draw.block('A', '', {});

        blockquote.dataset.instgrmVersion = 4;
        anchor.href = url;

        paragraph.appendChild(anchor);
        div.appendChild(paragraph);
        blockquote.appendChild(div);

        return blockquote;

    }

};


/**
 * @protected
 *
 * Callbacks
 *
 * @type {{pasted: pasteTool.callbacks.pasted}}
 */
pasteTool.callbacks = {

    pastedData : null,

    /**
     * Saves data
     *
     * @param event
     */
    pasted : function(event) {

        var clipBoardData = event.clipboardData || window.clipboardData,
            content = clipBoardData.getData('Text');

        pasteTool.callbacks.setPastedData(content);

        pasteTool.callbacks.analize();
    },

    /**
     * Sets data
     *
     * @param {String} string - pasted content
     */
    setPastedData : function(string) {
        this.pastedData = string;
    },

    /**
     * returns pasted content as string
     */
    getPatedData : function() {
        return this.pastedData;
    },

    /**
     *
     */
    analize : function() {

        var string = this.getPatedData(),

            regexTemplates = {
                http : new RegExp("^http?.+(jpg|bmp|gif|png)"),
                instagram : new RegExp("http?.+instagram.com\/p?."),
                twitter : new RegExp("http?.+twitter.com?.+\/"),
                vk : new RegExp(""),
            },

            http  = regexTemplates.http.exec(string),
            instagram = regexTemplates.instagram.exec(string),
            twitter = regexTemplates.twitter.exec(string),
            vk = regexTemplates.vk.exec(string);

        if (http) {

            pasteTool.callbacks.uploadImage(http);

        } else if (instagram) {

            pasteTool.callbacks.instagramMedia(instagram);

        } else if (twitter) {

            pasteTool.callbacks.twitterMedia(twitter);

        } else if (vk) {

            console.log("Vk content");

        };

    },

    /**
     * @protected
     *
     * Direct upload
     *
     * @param url
     */
    uploadImage : function(url) {

        var fullUrl = url.input;

        var data = {
                url: '',
                type: "POST",
                data : {
                    url: fullUrl
                },
                success : function(data) {
                    console.log(data);
                }
            };

        pasteTool.draw(data);
    },

    /**
     * callback for instagram url's
     *
     * @param url
     */
    instagramMedia : function(url) {

        var fullUrl = url.input,
            embed_code;

        /**
         * HTML template of instagram embed
         */
        embed_code = pasteTool.ui.instagramBlock(fullUrl);

        pasteTool.content.instagram(embed_code);
    },

    twitterMedia : function(url) {

        var fullUrl = url.input,
            tweetId,
            arr;

        arr = fullUrl.split('/');
        tweetId = arr.pop();

        pasteTool.content.twitter(tweetId);
    }

};

pasteTool.draw = {

    /**
     * @protected
     *
     * Draws block with className and properties
     */
    block : function( tagname, className, properties) {

        var block = document.createElement(tagname);

        block.className = className;
        block.contentEditable = "true";

        return block;
    }

};

cEditor.tools.paste = {

    type             : 'paste',
    iconClassname    : 'ce-icon-paragraph',
    make             : pasteTool.make,
    appendCallback   : null,
    settings         : null,
    render           : null,
    save             : null,
    display          : true,
    enableLineBreaks : false,
    allowedToPaste   : false

};
