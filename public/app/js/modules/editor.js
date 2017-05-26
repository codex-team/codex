/**
 * Created by Marco on 07.11.2015.
 */

// --- COMMON FUNCTIONS ---

// 'cdx' from 'codex' - micro framework
var cdx = {

};

cdx.all = function (selector, context) {

    var res;

    if (!cdx.isDefined(context)) {

        context = document;

    }

    if (cdx.isArray(context) || cdx.isNodeList(context)) {

        var nodeList;

        res = [];

        for (var index = 0; index < context.length; index++) {

            nodeList = cdx.all(selector, context[index]);
            res      = res.concat( cdx.nodeListToArray(nodeList) );

        }

    } else {

        res = context.querySelectorAll(selector);

    }

    return res;

};

cdx.nodeListToArray = function (nodeLsit) {

    var res = [];

    for (var index = 0; index < nodeLsit.length; index++) {

        res.push(nodeLsit.item(index));

    }

    return res;

};

cdx.el = function (selector, context) {

    return cdx.all(selector, context)[0];

};

cdx.log = function (obj, title) {

    // todo make polyfill if console.log not support etc ie <= 8

    if (!title)
        title = '';

    console.log(title + ' =>', obj);

};

cdx.isDefined = function (obj) {

    return typeof obj != 'undefined';

};

cdx.isString = function (obj) {

    return typeof obj == 'string';

};

cdx.isString = function (obj) {

    return typeof obj == 'string';

};

cdx.isArray = function (obj) {

    return obj instanceof Array;

};

cdx.isNodeList = function (obj) {

    return obj.toString() == '[object NodeList]';

};

cdx.after = function (relObj, newObj) {

    var nextEl = cdx.next(relObj);

    if (nextEl)
        cdx.before(nextEl, newObj);
    else
        cdx.append(relObj, newObj);

};

cdx.before = function (relObj, newObj) {

    relObj.parentNode.insertBefore(newObj, relObj);

};

cdx.append = function (relObj, newObj) {

    relObj.parentNode.appendChild(newObj);

};

cdx.replace = function (oldObj, newObj) {

    cdx.before(oldObj, newObj);

    return cdx.remove(oldObj);

};

cdx.prev = function (obj) {

    return obj.previousElementSibling;

};

cdx.next = function (obj) {

    return obj.nextElementSibling;

};

cdx.remove = function (obj) {

    return obj.parentNode.removeChild(obj);

};

cdx.data = function (obj, field, value) {

    var data = obj.dataset;

    if (!cdx.isDefined(field))
        return data;

    if (cdx.isDefined(value))
        obj.dataset[field] = value;

    return data[field];

};

cdx.attr = function (obj, field, value) {

    if (!cdx.isDefined(value))
        return obj.getAttribute(field);
    else
        obj.setAttribute(field, value);

};

cdx.removeAttr = function (obj, field) {

    obj.removeAttribute(field);

};

cdx.removeAttrAll = function (collection, field) {

    for (var index = 0; index < collection.length; index++) {

        cdx.removeAttr(collection[index], field);

    }

};

cdx.addClass = function (obj, className) {

    obj.classList.add(className);

};

cdx.removeClass = function (obj, className) {

    obj.classList.remove(className);

};

cdx.hasClass = function (obj, className) {

    return obj.classList.contains(className);

};

cdx.create = function (tagName) {

    return document.createElement(tagName);

};

cdx.collectionHtml = function (collection) {

    var str = '';

    for (var index = 0; index < collection.length; index++) {

        str += collection[index].outerHTML;

    }

    return str;

};

cdx.bind = function (event, selector, func) {

    var res = cdx.isString(selector) ? cdx.all(selector) : selector;

    for (var index = 0; index < res.length; index++) {

        res[index].addEventListener(event, func);

    }

};

cdx.click = function (selector, func) {

    cdx.bind('click', selector, func);

};

cdx.change = function (selector, func) {

    cdx.bind('change', selector, func);

};

cdx.each = function (collection, callback) {

    if (!callback) return;

    for (var index = 0; index < collection.length; index++) {

        callback(collection[index]);

    }

};

cdx.addhttp = function (url) {

    if (!/^(f|ht)tps?:\/\//i.test(url)) {

        url = 'http://' + url;

    }

    return url;

};

// --- EDITOR FUNCTIONS ---

var editor = {
    defultImg  : '/public/img/defEditorImg.png',
    loadingImg : '/public/img/loading.gif',

    initAddButtons : function (buttons) {

        cdx.click(buttons, function (e) {

            var buttonsNode      = this.parentNode,
                cloneButtonsNode = buttonsNode.cloneNode(true),
                newEditorNode    = editor.createEditorNode(cdx.data(this, 'type'));

            cdx.before(buttonsNode, cloneButtonsNode);
            cdx.before(buttonsNode, newEditorNode);

            editor.initAddButtons(cdx.all('.add_buttons button', cloneButtonsNode));

            e.preventDefault();

        });

    },

    //
    createEditorNode : function (type) {

        var node = cdx.el('.editor_content .node[data-type=' + type + ']').cloneNode(true);

        cdx.removeClass(node, 'hidden');
        cdx.removeClass(node, 'example');
        editor.initNodesButtons([ node ]);

        // todo clear pasted data (?)

        // обработка клавиш, общая для всех видов узлов
        editor.initNodesKeys(node);

        return node;

    },

    //
    initNodesButtons : function (nodes) {

        var node, nodeType;

        for (var index = 0; index < nodes.length; ++index) {

            node      = nodes[index];
            nodeType  = cdx.data(node, 'type');

            // init common buttons
            editor.initCommonButtons(node);

            if (nodeType == 'img') {

                editor.initImgNodeButtons(node);

            }

            if (nodeType == 'header') {

                editor.initHeaderNodeButtons(node);

            }

            if (nodeType == 'list') { // todo || orderlist

                editor.initListNodeButtons(node);

            }

        }

    },

    // init move and remove buttons
    initCommonButtons : function (node) {

        // remove
        cdx.click(cdx.all('button[data-action=remove]', node), function (e) {

            // 4 first remove add buttons before block
            cdx.remove(cdx.prev(this.parentNode.parentNode));

            // and after remove content node
            cdx.remove(this.parentNode.parentNode);

            e.preventDefault();

        });

        // move up
        cdx.click(cdx.all('button[data-action=moveup]', node), function (e) {

            var editor_node      = this.parentNode.parentNode,
                add_buttons      = cdx.next(editor_node),
                prev_editor_node = cdx.prev( cdx.prev(editor_node) );

            if (cdx.hasClass(prev_editor_node, 'node') && !cdx.hasClass(prev_editor_node, 'example')) {

                cdx.before(prev_editor_node, editor_node);
                cdx.before(add_buttons, prev_editor_node);

            }

            e.preventDefault();

        });

        // move down
        cdx.click(cdx.all('button[data-action=movedown]', node), function (e) {

            var editor_node      = this.parentNode.parentNode,
                next_editor_node = cdx.next( cdx.next(editor_node) );

            if (next_editor_node) {

                var add_buttons = cdx.next(next_editor_node);

                cdx.before(editor_node, next_editor_node);
                cdx.before(add_buttons, editor_node);

            }

            e.preventDefault();

        });

    },

    //
    setImgFromUrl : function (node, url) {

        // todo check for correct url
        // todo check is it img on url
        if (url) {

            url = cdx.addhttp(url);

            var img = cdx.el('.img', node);

            cdx.attr(img, 'src', editor.loadingImg); // while loading
            cdx.attr(img, 'src', url);
            cdx.data(img, 'from', 'url');
            cdx.removeClass(cdx.el('.delete_img', node), 'hidden');

        } else {

            cdx.attr(cdx.el('.img', node), 'src', editor.defultImg);
            cdx.addClass(cdx.el('.delete_img', node), 'hidden');

        }

    },

    // подготовка узла с картинкой
    initImgNodeButtons : function (node) {

        // show file dialog
        cdx.click(cdx.all('.change_img_btn', node), function () {

            cdx.el('.change_img_input', node).click();

        });

        // set img from url input
        cdx.change(cdx.all('.img_from_url', node), function () {

            editor.setImgFromUrl(node, this.value);

        });

        cdx.bind('keyup', cdx.all('.img_from_url', node), function () {

            editor.setImgFromUrl(node, this.value);

        });

        // than wrong img url given
        cdx.bind('error', cdx.all('.img', node), function () {

            cdx.attr(cdx.el('.img', node), 'src', editor.defultImg);
            cdx.addClass(cdx.el('.delete_img', node), 'hidden');
            cdx.log('error while load img');

        });

        // set img from file input
        cdx.change(cdx.all('.change_img_input', node), function () {

            var input = this;

            if (input.files && input.files[0]) {

                var reader = new FileReader(),
                    img    = cdx.el('.img', node);

                cdx.removeClass(cdx.el('.delete_img', node), 'hidden');
                cdx.attr(img, 'src', '/public/img/loading.gif');
                cdx.data(img, 'from', 'file');

                reader.readAsDataURL(input.files[0]);

                reader.onload = function (e) {

                    cdx.attr(img, 'src', e.target.result);

                };

            }

        });

        // delete img btn
        cdx.click(cdx.all('.delete_img', node), function () {

            cdx.attr(cdx.el('.img', node), 'src', editor.defultImg);
            cdx.addClass(this, 'hidden');

        });

    },

    // подготовка узла с заголовоком
    initHeaderNodeButtons : function (node) {

        // change header type btn
        cdx.click(cdx.all('.setting_buttons button', node), function (e) {

            var type      = cdx.data(this, 'type'),
                curHeader = cdx.el('.js_header', node);

            var newHeader = cdx.create(type);

            newHeader.textContent = curHeader.textContent;
            newHeader.classList.add(curHeader.classList);

            cdx.replace(curHeader, newHeader);

            e.preventDefault();

        });

    },

    // подготовка узла со списком
    initListNodeButtons : function (node) {

        // process key events
        var onLiKeyPres = function (liElements) {

            cdx.bind('keydown', liElements, function (e) {

                var prevEl, nextEl;

                // move up, when press ctrlKey + up arrow
                if (e.keyCode == 38 && e.ctrlKey && !e.shiftKey) {

                    prevEl = cdx.prev(this);

                    if (prevEl) {

                        cdx.after(this, prevEl);
                        this.focus();
                        editor.selectAll();

                    }

                }

                // move down, when press ctrlKey + down arrow
                if (e.keyCode == 40 && e.ctrlKey && !e.shiftKey) {

                    nextEl = cdx.next(this);

                    if (nextEl) {

                        cdx.before(this, nextEl);
                        this.focus();
                        editor.selectAll();

                    }

                }

                // when press up arrow
                if (e.keyCode == 38 && !e.ctrlKey && !e.shiftKey) {

                    prevEl = cdx.prev(this);

                    if (prevEl) {

                        prevEl.focus();
                        editor.selectAll();

                    }

                }

                // when press down arrow
                if (e.keyCode == 40 && !e.ctrlKey && !e.shiftKey) {

                    nextEl = cdx.next(this);

                    if (nextEl) {

                        nextEl.focus();
                        editor.selectAll();

                    }

                }

                // when press backspace
                if (e.keyCode == 8) {

                    prevEl = cdx.prev(this);

                    if (prevEl && !this.textContent) {

                        cdx.remove(this);
                        prevEl.focus();
                        editor.selectAll();

                    }

                }

                // when press delete
                if (e.keyCode == 46) {

                    nextEl = cdx.next(this);

                    if (nextEl && !this.textContent) {

                        cdx.remove(this);
                        nextEl.focus();
                        editor.selectAll();

                        // fix removing first word in next li
                        e.preventDefault();

                    }


                }

                // when press enter
                if (e.keyCode == 13 && !e.ctrlKey) {

                    var newLi = this.cloneNode();

                    // add new li
                    if (e.shiftKey)
                        cdx.before(this, newLi);
                    else
                        cdx.after(this, newLi);

                    newLi.focus();
                    onLiKeyPres( [ newLi ] );

                    // prevent adding child div as native behavior
                    e.preventDefault();

                }

            });

        };

        // init exists li
        onLiKeyPres( cdx.all('.content li', node) );

    },

    // - editor save functions -

    saveStart : function () {

        // log("saving...")
        // заблокировать редактор
        editor.disableEditor();

        //
        // получить все блоки с контентом
        var originNodes = cdx.all('.editor_content .node:not(.example)');
        var cloneNodes = [];

        // выбросить из них упр кнопки
        cdx.each(originNodes, function (node) {

            var cloneNode       = node.cloneNode(true),
                nodeType        = cdx.data(cloneNode, 'type'),
                setting_buttons = cdx.el('.setting_buttons', cloneNode),
                action_buttons  = cdx.el('.action_buttons', cloneNode);

            // save img and replace img tag src
            if (nodeType == 'img') editor.addImgToUploadQueue(cloneNode, node);

            if (setting_buttons) cdx.remove(setting_buttons);
            if (action_buttons)  cdx.remove(action_buttons);

            cdx.removeAttr(cdx.el('.content', cloneNode), 'contenteditable');

            // remove contenteditable from cdx.all child elements
            cdx.removeAttrAll(cdx.all('[contenteditable]', cloneNode), 'contenteditable');

            cloneNodes.push(cloneNode);

        });

        // log(cloneNodes, "cloneNodes");
        editor.cloneNodes = cloneNodes;

        //
        editor.uploadImagesFromQueue();

    },

    //
    saveFinish : function () {

        // выгрузить окончательный html в инпут для загрузки на сервер
        editor.outHtml();

        // разблокировать редактор
        editor.enableEditor();

        var form = cdx.el('#edit_article_form');

        if (form)
            form.submit();

    },

    // блокируем редактор на время сохранения
    disableEditor : function () {

        editor.saveBtnText = cdx.el('#save_article').textContent;
        cdx.el('#save_article').textContent = 'Подготовка к сохранению...';
        cdx.attr(cdx.el('#save_article'), 'disabled', 'disabled');

    },

    // разблокируем редактор после сохранения
    enableEditor : function () {

        cdx.el(('#save_article')).textContent = 'Готово!';

        // friendly mode :)
        setTimeout(function () {

            cdx.el(('#save_article')).textContent = editor.saveBtnText;
            cdx.removeAttr(cdx.el('#save_article'), 'disabled');

        }, 750);

    },

    // выгрузить окончательный html в инпут для загрузки на сервер
    outHtml : function () {

        cdx.el('#html_result').innerHTML = cdx.collectionHtml(editor.cloneNodes);

    },

    // save img and replace img tag src
    // imgOriginNode - исходный блок редактора, нужен тк в клоне к этому моменту уже нет блоков с настройками
    addImgToUploadQueue : function (imgCloneNode, imgOriginNode) {

        var img       = cdx.el('.img', imgCloneNode),
            imgSource = cdx.data(img, 'from');

        // save img from file
        if (imgSource == 'file') {

            editor.imgUploadQueue.push({
                img   : img,
                from  : 'file',
                input : cdx.el('[type=file]', imgOriginNode)
            });

        }

        // save img from url
        if (imgSource == 'url') {

            editor.imgUploadQueue.push({
                img   : img,
                from  : 'url',
                url   : cdx.el('.img_from_url', imgOriginNode).value
            });

        }

    },

    //
    imgUploadQueue : [],
    cloneNodes     : [],

    //
    uploadImagesFromQueue : function () {

        var uploadParams;

        if (uploadParams = editor.imgUploadQueue.pop())
            editor.uploadImagesFromQueueStep(uploadParams);
        else {

            editor.saveFinish();

        }

    },
    uploadImagesFromQueueStep : function (uploadParams) {

        // todo legacy support, ie <= 9
        var formData = new FormData(),
            xhr      = new XMLHttpRequest();

        // log(uploadParams, 'uploadParams')

        if (uploadParams.from == 'file') {

            formData.append('EDITOR_IMG', uploadParams.input.files[0]);

        }

        if (uploadParams.from == 'url') {

            formData.append('url', cdx.addhttp(uploadParams.url));

        }

        formData.append('source', uploadParams.from);
        xhr.open('POST', '/editorsaveimg', true);

        xhr.onload = function (e) {

             // console.log("answer", e.currentTarget.responseText);

            if (xhr.readyState == 4 && xhr.status == 200) {

                cdx.attr(uploadParams.img, 'src', e.currentTarget.responseText);
                cdx.data(uploadParams.img, 'from', 'cache');

                // запускаем следующий файл на загрузку
                editor.uploadImagesFromQueue();

            } else
                console.log('Error while ajax request:', xhr, e.currentTarget.responseText);

        };

        // send request
        xhr.send(formData);

    }
};

//
editor.prepareStoredNodes = function () {

    var nodes = cdx.all('.editor_content .node:not(.example)');

    if (nodes.length) {

        var addButtons, node, nodeType, actionBtns, settingsBtns;

        // prepare addButtons block
        addButtons = cdx.el('.editor_content .add_buttons.example').cloneNode(true);
        cdx.removeClass(addButtons, 'example');
        cdx.removeClass(addButtons, 'hidden');

        // prepare common actionBtns block
        actionBtns = cdx.el('.editor_content .node[data-type=text].example .action_buttons').cloneNode(true);

        // walk nodes
        for (var index = 0; index < nodes.length; index++) {

            node     = nodes[index];
            nodeType = cdx.data(node, 'type');

            // add addButtons block after each node
            cdx.after(node, addButtons.cloneNode(true));

            // add common buttons
            cdx.after(cdx.el('.content', node), actionBtns.cloneNode(true));

            // if node has settings buttons - add them
            settingsBtns = cdx.el('.editor_content .node[data-type=' + nodeType + '].example .setting_buttons');

            if (settingsBtns) {

                cdx.before(cdx.el('.content', node), settingsBtns.cloneNode(true));

            }

            // make editable
            if (nodeType == 'header' || nodeType == 'text') {

                cdx.attr(cdx.el('.content', node), 'contenteditable', 'true');

            }            else if (nodeType == 'list') {

                var listLi = cdx.all('li', node);

                for (var liIndex = 0; liIndex < listLi.length; liIndex++) {

                    cdx.attr(listLi[liIndex], 'contenteditable', 'true');

                }

            }

        }

    }

};

// обработка клавиш, общая для всех видов узлов
editor.initNodesKeys = function (nodes) {

    cdx.bind('keydown', cdx.all('.content', nodes), function (e) {

        var node     = this.parentNode,
            nodeType = cdx.data(node, 'type'),
            nextNode = editor.getNextNode(node),
            prevNode = editor.getPrevNode(node),
            nextFocusableNode = editor.getNexFocusabletNode(node),
            prevFocusableNode = editor.getPrevFocusableNode(node);

        // move whole node up, when press control + shift + up arrow
        if (e.keyCode == 38 && e.ctrlKey && e.shiftKey) {

            if (prevNode) {

                cdx.el('.action_buttons [data-action=moveup]', node).click();
                editor.focusNode(node);

            }

        }

        // move whole node down, when press control + shift + up arrow
        if (e.keyCode == 40 && e.ctrlKey && e.shiftKey) {

            if (nextNode) {

                cdx.el('.action_buttons [data-action=movedown]', node).click();
                editor.focusNode(node);

            }

        }

        // focus prev node, when press shift + up arrow
        if (e.keyCode == 38 && e.shiftKey && !e.ctrlKey) {

            if (prevFocusableNode) {

                editor.focusNode(prevFocusableNode);

            }

        }

        // focus next node, when press shift + down arrow
        if (e.keyCode == 40 && e.shiftKey && !e.ctrlKey) {

            if (nextFocusableNode) {

                editor.focusNode(nextFocusableNode);

            }

        }

        //  when press enter
        if (e.keyCode == 13) {

            // add text node
            if (e.ctrlKey || nodeType == 'header') {

                var addBtnsBlock, insertNode;

                // insert before
                if (e.shiftKey) {

                    addBtnsBlock = cdx.prev(node);
                    cdx.el('[data-type=text]', addBtnsBlock).click();
                    insertNode = cdx.prev(addBtnsBlock);

                }
                // insert after
                else {

                    addBtnsBlock = cdx.next(node);
                    cdx.el('[data-type=text]', addBtnsBlock).click();
                    insertNode = cdx.prev(addBtnsBlock);

                }

                editor.focusNode(insertNode);

            }
            // add one more paragraph
            else {

                if (nodeType == 'text') {

                    document.execCommand('insertHTML', false, '<p></p>');
                    editor.focusNode(node, false);

                }

            }

            // prevent adding child div as native behavior
            e.preventDefault();

        }

    });

};

editor.getNextNode = function (node) {

    return cdx.next( cdx.next(node) );

};

editor.getPrevNode = function (node) {

    return cdx.prev( cdx.prev(node) );

};


// img, video and etc nodes - are not fucusable
editor.getNexFocusabletNode = function (node) {

    var nextNode = editor.getNextNode(node);

    if (nextNode) {

        if (cdx.data(nextNode, 'focusable') == 'false')
            return editor.getNexFocusabletNode(nextNode);
        else
            return nextNode;

    }

};

// get prev node with the right type
editor.getPrevFocusableNode = function (node) {

    var prevNode = editor.getPrevNode(node);

    if (prevNode && !cdx.hasClass(prevNode, 'example')) {

        if (cdx.data(prevNode, 'focusable') == 'false')
            return editor.getPrevFocusableNode(prevNode);
        else
            return prevNode;

    }

};

editor.focusNode = function (node, selectAll) {

    var nodeType = cdx.data(node, 'type');

    if (nodeType == 'text' || nodeType == 'header') {

        cdx.el('.content', node).focus();

    }

    if (nodeType == 'list') {

        cdx.el('.content li:first-child', node).focus();

    }

    if (!cdx.isDefined(selectAll) || selectAll)
        editor.selectAll();

};

// selects cdx.all text in editing element
editor.selectAll = function () {

    window.setTimeout(function () {

        document.execCommand('selectAll', false, null);

    }, 1);

};

//
editor.init = function () {

    editor.prepareStoredNodes();
    editor.initAddButtons(cdx.all('.add_buttons button'));
    editor.initNodesButtons(cdx.all('.editor_content .node'));
    // обработка клавиш, общая для всех видов узлов
    editor.initNodesKeys(cdx.all('.editor_content .node'));

};

// --- EDITOR ---

editor.init();

cdx.click(cdx.all('#save_article'), editor.saveStart);

module.exports = editor;
