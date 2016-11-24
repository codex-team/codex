/**
 * Code Plugin\
 * Creates code tag and adds content to this tag
 */
var listTool = {

    baseClass : "tool-list",
    elementClasses : {
        li  : "tool-list-li"
    },

    /**
     * Make initial header block
     * @param {object} JSON with block data
     * @return {Element} element to append
     */
    make : function () {

        var tag = listTool.ui.make(),
            li  = listTool.ui.block("li", "tool-link-li");

        var br = document.createElement("br");

        li.appendChild(br);
        tag.appendChild(li);

        tag.classList.add('ce-list');

        return tag;

    },

    /**
     * Method to render HTML block from JSON
     */
    render : function (data) {

        var type = data.type == 'ordered' ? 'OL' : 'UL',
            tag  = listTool.ui.make(type);

        tag.classList.add('ce-list');

        data.items.forEach(function (element, index, array) {

            var newLi = listTool.ui.block("li", listTool.elementClasses.li);

            newLi.innerHTML = element;

            tag.dataset.type = data.type;
            tag.appendChild(newLi);

        });

        return tag;

    },

    /**
     * Method to extract JSON data from HTML block
     */
    save : function (blockContent){

        var json  = {
                type : 'list',
                data : {
                    type  : null,
                    items : [],
                }
            };

        for(var index = 0; index < blockContent.childNodes.length; index++)
            json.data.items[index] = blockContent.childNodes[index].textContent;

        json.data.type = blockContent.dataset.type;

        return json;

    },

    makeSettings : function(data) {

        var holder  = document.createElement('DIV'),
            selectTypeButton;

        /** Add holder classname */
        holder.className = 'ce_plugin_list--settings';

        var orderedButton = listTool.ui.button("ordered"),
            unorderedButton = listTool.ui.button("unordered");

        orderedButton.addEventListener('click', function (event) {
            listTool.changeBlockStyle(event, 'ol');
            cEditor.toolbar.settings.close();
        });

        unorderedButton.addEventListener('click', function (event) {
            listTool.changeBlockStyle(event, 'ul');
            cEditor.toolbar.settings.close();
        });

        holder.appendChild(orderedButton);
        holder.appendChild(unorderedButton);

        return holder;

    },

    changeBlockStyle : function (event, blockType) {

        var currentBlock = cEditor.content.currentNode,
            newEditable = listTool.ui.make(blockType),
            oldEditable = currentBlock.querySelector("[contenteditable]");

            newEditable.dataset.type = blockType;
            newEditable.innerHTML = oldEditable.innerHTML;
            newEditable.classList.add('ce-list');

            cEditor.content.switchBlock(currentBlock, newEditable, cEditor.tools.list.type);
    },

};

listTool.ui = {

    make : function (blockType) {

        var wrapper = this.block(blockType || 'UL', listTool.baseClass);

        wrapper.dataset.type    = 'ul';
        wrapper.contentEditable = true;

        return wrapper;

    },

    block : function (blockType, blockClass) {

        var block = document.createElement(blockType);

        if ( blockClass ) block.classList.add(blockClass);

        return block;

    },

    button : function (buttonType) {

        var types   = {
                unordered    : '<i class="ce-icon-list-bullet"></i>Обычный список',
                ordered      : '<i class="ce-icon-list-numbered"></i>Нумерованный список'
            },
            button = document.createElement('SPAN');

        button.innerHTML = types[buttonType];

        button.className   = 'ce_plugin_list--select_button';

        return button;
    }
};

/**
 * Now plugin is ready.
 * Add it to redactor tools
 */
cEditor.tools.list = {

    type             : 'list',
    iconClassname    : 'ce-icon-list-bullet',
    make             : listTool.make,
    appendCallback   : null,
    settings         : listTool.makeSettings(),
    render           : listTool.render,
    save             : listTool.save,
    displayInToolbox : true,
    enableLineBreaks : true

};
