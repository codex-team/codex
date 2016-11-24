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
 */
var pasteTool = {

    /**
     * SDK and Widgets from Social Networks to embed
     * */
    externalScripts : {

        instagram : {
            path : '//platform.instagram.com/en_US/embeds.js',
            loaded : false,
            class : 'ce-paste__instagram',
            render : function() {
                window.instgrm.Embeds.process();
            }
        },

        twitter : {
            path : '//platform.twitter.com/widgets.js',
            loaded : false,
            class : 'twitter-tweet',
            render : function(tweetId, blockContent) {
                window.twttr.widgets.createTweet(tweetId, blockContent);
            }
        },

        vkontakte : {
            path : null, //'https://vk.com/js/api/xd_connection.js?2',
            loaded : false
        },

        facebook : {
            path : null, //'//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.8',
            loaded : false
        }
    },

    /**
     * Call's before make
     */
    prepare : function() {

        var sdk;

        for(sdk in pasteTool.externalScripts) {

            if (!pasteTool.externalScripts[sdk].loaded && pasteTool.externalScripts[sdk].path) {
                pasteTool.importScript(pasteTool.externalScripts[sdk].path);
                pasteTool.externalScripts[sdk].loaded = true;
            }
        }
    },

    make : function() {

        return pasteTool.ui.make();

    },

    /** Saving data as JSON object*/
    save : function(data) {

        var json = {
                type : 'paste',
                data : {
                    type : null,
                },
                cover: false
            };

        if (data.classList.contains(pasteTool.externalScripts.instagram.class)) {

            json.data.type = 'instagram';
            json.data.url = data.src;

        } else if (data.classList.contains(pasteTool.externalScripts.twitter.class)) {

            json.data.type = 'twitter';
            json.data.tweetId = data.dataset.tweetId;
        }

        return json;

    },

    /** Appends script to head of document */
    importScript : function(scriptPath) {

        var script = document.createElement('SCRIPT');
        script.type = "text\/javascript";
        script.src = scriptPath;
        script.async = true;
        script.defer = true;

        document.head.appendChild(script);

        return script;
    }
};


/**
 * Works with content: insert and switch.
 */
pasteTool.content = {

    /**
     * Instagram render method renders content and switches existed DOM element
     * @param content
     */
    instagram : function(content) {

        cEditor.content.switchBlock(cEditor.content.currentNode, content, 'paste');

        var blockContent = cEditor.content.currentNode.childNodes[0];

        blockContent.classList.add('ce-paste-plugin__loader');

        pasteTool.externalScripts.instagram.render();

        blockContent.classList.remove('ce-paste-plugin__loader');

    },

    /**
     * Twitter render method appends content after block
     * @param tweetId
     */
    twitter : function(tweetId) {

        var tweet = pasteTool.ui.twitterBlock();

        cEditor.content.switchBlock(cEditor.content.currentNode, tweet, 'paste');

        var blockContent = cEditor.content.currentNode.childNodes[0];

        blockContent.classList.add('ce-paste-plugin__loader');

        pasteTool.externalScripts.twitter.render(tweetId, blockContent);

        blockContent.classList.remove('ce-paste-plugin__loader');

        /** Remove empty DIV */
        blockContent.childNodes[0].remove();

    },

    /**
     * @deprecated
     *
     * Facebook post
     *
     * @param url
     */
    facebook : function(url) {

        var facebookBlock = pasteTool.ui.makeFbBlock(url);

        cEditor.content.switchBlock(cEditor.content.currentNode, facebookBlock, 'paste-facebook');

    },

};

/**
 * Make elements to insert or switch
 *
 * @uses Core cEditor.draw module
 */
pasteTool.ui = {

    make : function() {

        var plugin = cEditor.draw.node('DIV', 'ce-paste', { contentEditable: true });

        plugin.dataset.placeholder = 'Paste link';
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

        var blockquote = cEditor.draw.node('BLOCKQUOTE', 'instagram-media ce-paste__instagram', {}),
            div        = cEditor.draw.node('DIV', '', {}),
            paragraph  = cEditor.draw.node('P', 'ce-paste__instagram--p', {}),
            anchor     = cEditor.draw.node('A', '', { href : url });

        blockquote.dataset.instgrmVersion = 4;
        anchor.href = url;

        paragraph.appendChild(anchor);
        div.appendChild(paragraph);
        blockquote.appendChild(div);

        return blockquote;

    },

    twitterBlock : function() {
        var block = cEditor.draw.node('DIV', '', {});
        return block;
    },

    /**
     * Upload image by URL
     *
     * @uses editor Image tool
     * @param filename
     * @returns {Element}
     */
    uploadedImage : function(filename) {

        var data = {
            background: false,
            border: false,
            isStretch: false,
            file: {
                url: "upload/redactor_images/" + filename,
                bigUrl: "upload/redactor_images/" + filename,
                width: null,
                height: null,
                additionalData: "null"
            },
            caption: '',
            cover: null
        };

        /** Using Image plugin make method */
        var image = cEditor.tools.image.make(data);

        return image;

    },

    /**
     * @deprecated
     *
     * @param url
     * @returns {Element}
     */
    makeFacebookBlock : function(url) {

        //<div class="fb-post" data-href="{your-post-url}"></div>
        var wrapper = cEditor.draw.node('DIV', 'fb-root', {}),
            div     = cEditor.draw.node('DIV', 'fb-post', {});

        div.dataset.href = url;

        return div;
    },

};


/**
 *
 * Callbacks
 */
pasteTool.callbacks = {

    /**
     * Saves data
     *
     * @param event
     */
    pasted : function(event) {

        var clipBoardData = event.clipboardData || window.clipboardData,
            content = clipBoardData.getData('Text');

        pasteTool.callbacks.analize(content);
    },

    /**
     * Analizes pated string and calls necessary method
     */
    analize : function(string) {

        var regexTemplates = {
                image : /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpe?g|gif|png))(?:\?([^#]*))?(?:#(.*))?/i,
                instagram : new RegExp("http?.+instagram.com\/p?."),
                twitter : new RegExp("http?.+twitter.com?.+\/"),
                facebook : /https?.+facebook.+\/\d+\?/,
                vk : /https?.+vk?.com\/feed\?w=wall\d+_\d+/,
            },

            image  = regexTemplates.image.test(string),
            instagram = regexTemplates.instagram.exec(string),
            twitter = regexTemplates.twitter.exec(string),
            facebook = regexTemplates.facebook.test(string),
            vk = regexTemplates.vk.test(string);

        if (image) {

            pasteTool.callbacks.uploadImage(string);

        } else if (instagram) {

            pasteTool.callbacks.instagramMedia(instagram);

        } else if (twitter) {

            pasteTool.callbacks.twitterMedia(twitter);

        } else if (facebook) {

            pasteTool.callbacks.facebookMedia(string);

        } else if (vk) {

            pasteTool.callbacks.vkMedia(string);

        }

    },

    /**
     * Direct upload
     *
     * @param url
     */
    uploadImage : function(path) {

        var ajaxUrl = location.protocol + '//' + location.hostname,
            file,
            image,
            current = cEditor.content.currentNode,
            beforeSend,
            success_callback;

        /** When image is uploaded to redactors folder */
        success_callback = function(data) {

            var file = JSON.parse(data);
            image = pasteTool.ui.uploadedImage(file.filename);
            cEditor.content.switchBlock(current, image, 'image');

        };

        /** Before sending XMLHTTP request */
        beforeSend = function() {
            var content = current.querySelector('.ce-block__content');
            content.classList.add('ce-plugin-image__loader');
        };

        /** Preparing data for XMLHTTP */
        var data = {
            url: ajaxUrl + '/editor/transport/',
            type: "POST",
            data : {
                file: path
            },
            beforeSend : beforeSend,
            success : success_callback
        };

        cEditor.core.ajax(data);
    },

    /**
     * callback for instagram url's
     *
     * @param url
     */
    instagramMedia : function(url) {

        var fullUrl = url.input,
            embed_code,
            script = pasteTool.externalScripts.instagram;

        /**
         * HTML template of instagram embed
         */
        embed_code = pasteTool.ui.instagramBlock(fullUrl);

        pasteTool.content.instagram(embed_code);

    },

    twitterMedia : function(url) {

        var fullUrl = url.input,
            script = pasteTool.externalScripts.twitter,
            tweetId,
            arr;

        arr = fullUrl.split('/');
        tweetId = arr.pop();

        pasteTool.content.twitter(tweetId);
    },

};

cEditor.tools.paste = {

    type             : 'paste',
    iconClassname    : 'ce-icon-instagram',
    prepare          : pasteTool.prepare,
    make             : pasteTool.make,
    appendCallback   : null,
    settings         : null,
    render           : null,
    save             : pasteTool.save,
    display          : false,
    enableLineBreaks : false,
    allowedToPaste   : false

};
