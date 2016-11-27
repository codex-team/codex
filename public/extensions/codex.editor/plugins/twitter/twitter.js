/**
 * Twitter plugin
 * @version 1.0.0
 */

var twitterTool = {

    /**
     * Prepare twitter scripts
     */
    prepare : function() {

        var script = "//platform.twitter.com/widgets.js";

        /**
         * Load script
         */
        cEditor.core.importScript(script);

    },

    make : function(data) {

        if (!data.tweetId)
            return;

        twitterTool.content.twitter(data.tweetId);
    },

    save : function() {

    },

    render : function(data) {
        return twitterTool.make(data);
    }

};

twitterTool.content = {

    /**
     * Twitter render method appends content after block
     * @param tweetId
     */
    twitter : function(tweetId) {

        var tweet = twitterTool.content.twitterBlock();

        cEditor.content.switchBlock(cEditor.content.currentNode, tweet, 'twitter');

        var blockContent = cEditor.content.currentNode.childNodes[0];
        blockContent.classList.add('ce-paste-plugin__loader');

        window.twttr.widgets.createTweet(tweetId, blockContent);
        blockContent.classList.remove('ce-paste-plugin__loader');

        /** Remove empty DIV */
        blockContent.childNodes[0].remove();

    },

    twitterBlock : function() {
        var block = cEditor.draw.node('DIV', '', {});
        return block;
    }
};

cEditor.tools.twitter = {

    type             : 'twitter',
    iconClassname    : 'ce-icon-twitter',
    prepare          : twitterTool.prepare,
    make             : twitterTool.make,
    appendCallback   : null,
    settings         : null,
    render           : twitterTool.render,
    save             : twitterTool.save,
    displayInToolbox : false,
    enableLineBreaks : false,
    allowedToPaste   : false

};
