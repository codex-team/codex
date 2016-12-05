/**
 * Instagram plugin
 * @version 1.0.0
 */
var instagramTool = {

    /**
     * Prepare before usage
     * Load important scripts to render embed
     */
    prepare : function() {

        var script = "//platform.instagram.com/en_US/embeds.js";

        /**
         * Load widget
         */
        cEditor.core.importScript(script, 'instagramAPI');
    },

    /**
     * Make instagram embed via Widgets method
     */
    make : function(data) {

        if (!data.url)
            return;


        var block = instagramTool.content.instagramBlock(data.url);
        instagramTool.content.render(block);
    },

    /**
     * Saving JSON output.
     * Upload data via ajax
     */
    save : function(blockContent) {

        var data;

        /** Example */
        data = {
            media:true,
            conversation:false,
            user:{
            },
            url: blockContent.src
        };

        return data;

    },

    /**
     * Render data
     */
    render : function(data) {
        return instagramTool.make(data);
    }

};

instagramTool.content = {

    render : function(content) {

        cEditor.content.switchBlock(cEditor.content.currentNode, content, 'instagram');

        var blockContent = cEditor.content.currentNode.childNodes[0];
        blockContent.classList.add('instagram__loader');

        window.instgrm.Embeds.process();

        setTimeout(function(){
            blockContent.classList.remove('instagram__loader');
        }, 500);
    },

    /**
     * Drawing html content.
     *
     * @param url
     * @returns {Element} blockquote - HTML template for Instagram Embed JS
     */
    instagramBlock : function(url) {

        var blockquote = cEditor.draw.node('BLOCKQUOTE', 'instagram-media instagram', {}),
            div        = cEditor.draw.node('DIV', '', {}),
            paragraph  = cEditor.draw.node('P', 'ce-paste__instagram--p', {}),
            anchor     = cEditor.draw.node('A', '', { href : url });

        blockquote.dataset.instgrmVersion = 4;

        paragraph.appendChild(anchor);
        div.appendChild(paragraph);
        blockquote.appendChild(div);

        return blockquote;

    },

};

cEditor.tools.instagram = {

    type             : 'instagram',
    iconClassname    : 'ce-icon-instagram',
    prepare          : instagramTool.prepare,
    make             : instagramTool.make,
    appendCallback   : null,
    settings         : null,
    render           : instagramTool.reneder,
    save             : instagramTool.save,
    displayInToolbox : false,
    enableLineBreaks : false,
    allowedToPaste   : false

};
