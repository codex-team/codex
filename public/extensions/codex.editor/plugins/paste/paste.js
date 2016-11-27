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
     * Upload image by URL
     *
     * @uses cEditor Image tool
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

};


/**
 *
 * Callbacks
 */
pasteTool.callbacks = {

    /**
     * Saves data
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
     * @uses Instagram tool
     * @param url
     */
    instagramMedia : function(url) {

        var fullUrl = url.input,
            data = {
                url: fullUrl
            };

        cEditor.tools.instagram.make(data);

    },

    /**
     * callback for tweets
     * @uses Twitter tool
     * @param url
     */
    twitterMedia : function(url) {

        var fullUrl = url.input,
            tweetId,
            arr,
            data;

        arr = fullUrl.split('/');
        tweetId = arr.pop();

        data = {
            tweetId: tweetId
        };

        cEditor.tools.twitter.make(data);
    },

};

cEditor.tools.paste = {

    type             : 'paste',
    iconClassname    : '',
    prepare          : pasteTool.prepare,
    make             : pasteTool.make,
    appendCallback   : null,
    settings         : null,
    render           : null,
    save             : pasteTool.save,
    displayInToolbox : false,
    enableLineBreaks : false,
    allowedToPaste   : false

};
