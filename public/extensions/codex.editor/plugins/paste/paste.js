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

    /** scripts state */
    externalScripts : {

        instagram : {
            path : '//platform.instagram.com/en_US/embeds.js',
            loaded : false,
            render : function() {
                window.instgrm.Embeds.process();
            }
        },

        twitter : {
            path : '//platform.twitter.com/widgets.js',
            loaded : false,
            render : function(tweetId, blockContent) {
                window.twttr.widgets.createTweet(tweetId, blockContent);
            }
        },

        vkontakte : {
            path : 'https://vk.com/js/api/xd_connection.js?2',
            loaded : false
        },

        facebook : {
            path : '//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.8',
            loaded : false
        }
    },

    make : function() {

        return pasteTool.ui.make();

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
 * @protected
 *
 * Works with content: insert and switch.
 */
pasteTool.content = {

    /**
     * Instagram render method renders content and switches existed DOM element
     * @param content
     */
    instagram : function(content) {

        cEditor.content.switchBlock(cEditor.content.currentNode, content, 'paste-instagram');

        if (!window.instgrm) {

            /** If script is not loaded yet */
            setTimeout(pasteTool.externalScripts.instagram.render, 200);

        } else {
            pasteTool.externalScripts.instagram.render();
        }

    },

    /**
     * Twitter render method appends content after block
     * @param tweetId
     */
    twitter : function(tweetId) {

        var blockContent = cEditor.content.currentNode.childNodes[0],
            inputForPaste = blockContent.querySelector('.ce-paste');

        inputForPaste.classList.add('ce-plugin-image__loader');

        if (!window.twttr) {

            /** if script is not loaded yet */
            setTimeout(function() {
                pasteTool.externalScripts.twitter.render(tweetId, blockContent);
                inputForPaste.remove();
            }, 100);

        } else {

            pasteTool.externalScripts.twitter.render(tweetId, blockContent);
            inputForPaste.remove();
        }

        cEditor.content.currentNode.dataset.type = "paste-twitter";
    },

    facebook : function(url) {

        var facebookBlock = pasteTool.ui.makeFbBlock(url);

        cEditor.content.switchBlock(cEditor.content.currentNode, facebookBlock, 'paste-facebook');

    },

};

/**
 * @protected
 *
 * Make elements to insert or switch
 *
 * @uses Core cEditor.draw module
 * @type {{make: pasteTool.ui.make}}
 */
pasteTool.ui = {

    make : function() {

        var plugin = cEditor.draw.node('DIV', 'ce-paste', { contentEditable: true });

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

        var image = cEditor.tools.image.make(data);

        return image;

    },

    makeFbBlock : function(url) {

        //<div class="fb-post" data-href="{your-post-url}"></div>
        var wrapper = cEditor.draw.node('DIV', 'fb-root', {}),
            div     = cEditor.draw.node('DIV', 'fb-post', {});

        div.dataset.href = url;

        return div;
    },

};


/**
 * @protected
 *
 * Callbacks
 * @type {{pasted: pasteTool.callbacks.pasted}}
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
     *
     */
    analize : function(string) {

        var regexTemplates = {
                http : /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpe?g|gif|png))(?:\?([^#]*))?(?:#(.*))?/i,
                instagram : new RegExp("http?.+instagram.com\/p?."),
                twitter : new RegExp("http?.+twitter.com?.+\/"),
                facebook : /https?.+facebook.+\/\d+\?/,
                vk : /https?.+vk?.com\/feed\?w=wall\d+_\d+/,
            },

            http  = regexTemplates.http.test(string),
            instagram = regexTemplates.instagram.exec(string),
            twitter = regexTemplates.twitter.exec(string),
            facebook = regexTemplates.facebook.test(string),
            vk = regexTemplates.vk.test(string);

        if (http) {

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
     * @protected
     *
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

        if (!script.loaded) {
            pasteTool.importScript(script.path);
            script.loaded = true;
        }

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

        if (!script.loaded) {
            pasteTool.importScript(script.path);
            script.loaded = true;
        }

        arr = fullUrl.split('/');
        tweetId = arr.pop();

        pasteTool.content.twitter(tweetId);
    },

    facebookMedia : function(url) {

        var script = pasteTool.externalScripts.facebook,
            postId;

        FB.init({
            appId : '1577740102496910',
            xfbml : true,
            version: 'v2.3'
        });

        pasteTool.content.facebook(url);
    },

    vkMedia : function(url) {
        var arr = url.split('w=wall'),
            id_post = arr[1],
            script = pasteTool.externalScripts.vkontakte,
            state;

        if (!script.loaded) {
            state = pasteTool.importScript(script.path);
            script.loaded = true;
        }

        /** Initialize VK Javascript SKD */
        setTimeout(function() {

            VK.init(function() {
                console.log('here');
            }, function() {
                console.log('her');
            }, '5.60');

        }, 200);

        VK.api('wall.getById', {
            posts : id_post,
            copy_history_depth: 2,

        }, function(data) {
            console.log(data);
        });

    }

};

cEditor.tools.paste = {

    type             : 'paste',
    iconClassname    : 'ce-icon-instagram',
    make             : pasteTool.make,
    appendCallback   : null,
    settings         : null,
    render           : null,
    save             : null,
    display          : true,
    enableLineBreaks : false,
    allowedToPaste   : false

};
