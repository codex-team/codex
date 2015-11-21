/**
 * Created by Marco on 07.11.2015.
 */

// --- COMMON FUNCTIONS ---

// 'c' from 'codex' - micro framework
var c = {

};

all = function (selector, context) {
    //debugger
    if (!isDefined(context)) {
        context = document
    }
    return context.querySelectorAll(selector)
}
el = function (selector, context) {
    return all(selector, context)[0]
}

log = function(obj, title){
    if (!title)
        title = ""
    console.log(title+" =>", obj)
}

isDefined = function(obj){
    return typeof obj != "undefined"
}

isString = function(obj){
    return typeof obj == "string"
}

after = function(relObj, newObj){
    var nextEl = next(relObj);

    if (nextEl)
        before(nextEl, newObj)
    else
        append(relObj, newObj)
}

before = function(relObj, newObj){
    relObj.parentNode.insertBefore(newObj, relObj)
}

append = function(relObj, newObj){
    relObj.parentNode.appendChild(newObj)
}

replace = function(oldObj, newObj){
    before(oldObj, newObj)
    return remove(oldObj)
}

prev = function(obj){
    return obj.previousElementSibling
}

next = function(obj){
    return obj.nextElementSibling
}

remove = function(obj){
    return obj.parentNode.removeChild(obj)
}

data = function(obj, field, value) {
    var data = obj.dataset

    if (!isDefined(field))
        return data

    if (isDefined(value))
        obj.dataset[field] = value

    return data[field]
}

attr = function(obj, field, value) {
    if (!isDefined(value))
        return obj.getAttribute(field)
    else
        obj.setAttribute(field, value)
}

removeAttr = function(obj, field) {
    obj.removeAttribute(field)
}

removeAttrAll = function (collection, field) {
    for (var index = 0; index < collection.length; index++) {
        removeAttr(collection[index], field)
    }
}

addClass = function(obj, className) {
    obj.classList.add(className)
}

removeClass = function(obj, className) {
    obj.classList.remove(className)
}

hasClass = function(obj, className) {
    return obj.classList.contains(className)
}

c.create = function (tagName) {
    return document.createElement(tagName)
};

function collectionHtml(collection){
    var str = ""
    for (var index = 0; index < collection.length; index++) {
        str += collection[index].outerHTML
    }

    return str
}

//parents = function(obj, selector){
//
//}

bind = function(event, selector, func){
    var res = isString(selector) ? all(selector) : selector

    for (var index = 0; index < res.length; index++) {
        res[index].addEventListener(event, func)
    }

}

click = function(selector, func){
    bind("click", selector, func)
}

change = function(selector, func){
    bind("change", selector, func)
}



function each (collection, callback){
    if (!callback)
        return

    for (var index = 0; index < collection.length; index++) {
        callback(collection[index])
    }

}

function addhttp(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
    }
    return url;
}

function random (X) {
    return Math.floor(X * (Math.random() % 1));
}

function randomBetween (MinV, MaxV) {
    return MinV + random(MaxV - MinV + 1);
}

// --- EDITOR FUNCTIONS ---

var editor = {
    defultImg : "/public/img/defEditorImg.png",
    loadingImg : "/public/img/loading.gif",

    initAddButtons : function (buttons) {
        click(buttons, function (e) {
            var buttonsNode      = this.parentNode
            var cloneButtonsNode = buttonsNode.cloneNode(true)

            var newEditorNode = editor.createEditorNode(data(this, "type"))

            before(buttonsNode, cloneButtonsNode)
            before(buttonsNode, newEditorNode)

            editor.initAddButtons(all(".add_buttons button", cloneButtonsNode))

            e.preventDefault()
        })
    },
    //
    createEditorNode : function (type) {
        var node = el(".editor_content .node[data-type=" + type + "]").cloneNode(true)

        removeClass(node, "hidden")
        removeClass(node, "example")
        editor.initNodesButtons([node])

        // todo clear pasted data
        //bind("copy", all("[contenteditable=true]", node), function (e) {
        //    log(e, "onpaste")
        //})

        // обработка клавиш, общая для всех видов узлов
        editor.initKeyPress(node);


        return node
    },

    //
    initNodesButtons : function (nodes) {
            var node, nodeType
        for (var index = 0; index < nodes.length; ++index) {
            node = nodes[index]
            nodeType  = data(node, "type")

            // init common buttons
            editor.initCommonButtons(node)

            if (nodeType == "img"){
                editor.initImgNodeButtons(node)
            }

            if (nodeType == "header"){
                editor.initHeaderNodeButtons(node)
            }

            if (nodeType == "list"){ // todo || orderlist
                editor.initListNodeButtons(node)
            }
        }
    },

    // init move and remove buttons
    initCommonButtons : function (node) {
        // remove
        click(all("button[data-action=remove]", node), function (e) {
            // 4 first remove add buttons before block
            remove(prev(this.parentNode.parentNode))
            // and after remove content node
            remove(this.parentNode.parentNode)

            e.preventDefault()
        });

        // move up
        click(all("button[data-action=moveup]", node), function (e) {
            var editor_node = this.parentNode.parentNode;
            var add_buttons = next(editor_node);
            var prev_editor_node = prev( prev(editor_node) );

            if (hasClass(prev_editor_node, "node") && !hasClass(prev_editor_node, "example")){
                before(prev_editor_node, editor_node);
                before(add_buttons, prev_editor_node);
            }

            e.preventDefault()
        });

        // move down
        click(all("button[data-action=movedown]", node), function (e) {
            var editor_node      = this.parentNode.parentNode;
            var next_editor_node = next( next(editor_node) );

            if (next_editor_node) {
                var add_buttons = next(next_editor_node);

                before(editor_node, next_editor_node);
                before(add_buttons, editor_node)
            }

            e.preventDefault()
        })

    },

    //
    setImgFromUrl : function(node, url){
        // todo check for correct url
        // todo check is it img on url
        if (url){
            url = addhttp(url)

            var img = el(".img", node)
            attr(img, "src", editor.loadingImg) // while loading
            attr(img, "src", url)
            data(img, "from", "url")
            removeClass(el(".delete_img", node), "hidden")
        } else {
            attr(el(".img", node), "src", editor.defultImg)
            addClass(el(".delete_img", node), "hidden")
        }
    },

    // подготовка узла с картинкой
    initImgNodeButtons : function (node) {
        // show file dialog
        click(all(".change_img_btn", node), function () {
            el(".change_img_input", node).click()
        })

        // set img from url input
        change(all(".img_from_url", node), function () {
            editor.setImgFromUrl(node, this.value)
        })

        bind("keyup", all(".img_from_url", node), function () {
            editor.setImgFromUrl(node, this.value)
        })

        // than wrong img url given
        bind("error", all(".img", node), function () {
            attr(el(".img", node), "src", editor.defultImg)
            addClass(el(".delete_img", node), "hidden")
            log("error while load img")
        })

        // set img from file input
        change(all(".change_img_input", node), function () {
            var input = this

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var img = el(".img", node)

                removeClass(el(".delete_img", node), "hidden")
                attr(img, "src", "/public/img/loading.gif")
                data(img, "from", "file")

                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {
                    attr(img, "src", e.target.result)
                }
            }
        })

        // delete img btn
        click(all(".delete_img", node), function () {
            attr(el(".img", node), "src", editor.defultImg)
            addClass(this, "hidden")
        })
    },

    // подготовка узла с заголовоком
    initHeaderNodeButtons : function (node) {
        // change header type btn
        click(all(".setting_buttons button", node), function (e) {
            var type = data(this, "type"),
                curHeader = el(".js_header", node);

            var newHeader = c.create(type);
            newHeader.textContent = curHeader.textContent;
            newHeader.classList.add(curHeader.classList);

            replace(curHeader, newHeader)

            e.preventDefault()
        })
    },

    // подготовка узла со списком
    initListNodeButtons : function (node) {
        // process key events
        var onLiKeyPres = function (liElements) {
            bind("keydown", liElements, function (e) {
                var prevEl, nextEl;

                // move up, when press shift + up arrow
                if (e.keyCode == 38 && e.shiftKey){
                    prevEl = prev(this);

                    if (prevEl){
                        after(this, prevEl)
                        this.focus();
                        editor.selectAll()
                    }
                }

                // move down, when press shift + down arrow
                if (e.keyCode == 40 && e.shiftKey){
                    nextEl = next(this);

                    if (nextEl){
                        before(this, nextEl)
                        this.focus();
                        editor.selectAll()
                    }
                }

                // when press up arrow
                if (e.keyCode == 38 && !e.shiftKey){
                    prevEl = prev(this);

                    if (prevEl){
                        prevEl.focus();
                        editor.selectAll()
                    }
                }

                // when press down arrow
                if (e.keyCode == 40 && !e.shiftKey){
                    nextEl = next(this);

                    if (nextEl){
                        nextEl.focus();
                        editor.selectAll()
                    }
                }

                // when press backspace
                if (e.keyCode == 8){
                    prevEl = prev(this);

                    if (prevEl && !this.textContent){
                        remove(this);
                        prevEl.focus();
                        editor.selectAll()
                    }
                }

                // when press delete
                if (e.keyCode == 46){
                    nextEl = next(this);

                    if (nextEl && !this.textContent){
                        remove(this);
                        nextEl.focus();
                        editor.selectAll();

                        // fix removing first word in next li
                        e.preventDefault()
                    }


                }

                // when press enter
                if (e.keyCode == 13){
                    var newLi = this.cloneNode();

                    // add new li
                    if (e.shiftKey)
                        before(this, newLi);
                    else
                        after(this, newLi);

                    newLi.focus();
                    onLiKeyPres( [newLi] );

                    // prevent adding child div as native behavior
                    e.preventDefault()
                }
            })
        }

        // init exists li
        onLiKeyPres( all(".content li", node) );
    },

    // - editor save functions -

    save : function () {
        //log("saving...")
        //заблокировать редактор
        editor.disableEditor()

        //
        //получить все блоки с контентом
        var originNodes = all(".editor_content .node:not(.example)")
        var cloneNodes = []

        //выбросить из них упр кнопки
        each(originNodes, function(node){
            var cloneNode       = node.cloneNode(true)
            var nodeType        = data(cloneNode, "type")
            var setting_buttons = el(".setting_buttons", cloneNode)
            var action_buttons  = el(".action_buttons", cloneNode)

            // save img and replace img tag src
            if (nodeType == "img") editor.addImgToUploadQueue(cloneNode, node)

            if (setting_buttons) remove(setting_buttons)
            if (action_buttons) remove(action_buttons)
            removeAttr(el(".content", cloneNode), "contenteditable")

            // remove contenteditable from all child elements
            removeAttrAll(all("[contenteditable]", cloneNode), "contenteditable")

            cloneNodes.push(cloneNode)
        })
        //log(cloneNodes, "cloneNodes")
        editor.cloneNodes = cloneNodes
        //

        editor.uploadImagesFromQueue()

    },

    // блокируем редактор на время сохранения
    disableEditor : function () {
        //editor.saveBtnText = el("#btn_save").textContent
        //
        //el("#btn_save").textContent = "Подготовка к сохранению..."
        //attr(el("#btn_save"), "disabled", "disabled")

        // todo remove temp dubling
        editor.saveBtnText = el("#blankSendButton").textContent
        el("#blankSendButton").textContent = "Подготовка к сохранению..."
        attr(el("#blankSendButton"), "disabled", "disabled")

    },

    // разблокируем редактор после сохранения
    enableEditor : function () {
        //el(("#btn_save")).textContent = "Готово!"
        //
        //// friendly mode :)
        //setTimeout(function() {
        //    el(("#btn_save")).textContent = "Сохранить"
        //    removeAttr(el("#btn_save"), "disabled")
        //}, 750);


        // todo remove temp dubling
        el(("#blankSendButton")).textContent = "Готово!"

        // friendly mode :)
        setTimeout(function() {
            el(("#blankSendButton")).textContent = editor.saveBtnText
            removeAttr(el("#blankSendButton"), "disabled")
        }, 750);
    },

    // выгрузить окончательный html в инпут для загрузки на сервер
    outHtml : function () {
        el("#html_result").innerHTML = collectionHtml(editor.cloneNodes)

        // todo remove temp dubling
        //el("#blankCommentTextarea").innerHTML = collectionHtml(editor.cloneNodes)
    },

    // save img and replace img tag src
    //imgOriginNode - исходный блок редактора, нужен тк в клоне к этому моменту уже нет блоков с настройками
    addImgToUploadQueue : function (imgCloneNode, imgOriginNode) {
        var img = el(".img", imgCloneNode)
        var imgSource = data(img, "from")
        //log(imgSource)

        // save img from file
        if (imgSource == "file"){
            editor.imgUploadQueue.push({
                img   : img,
                from  : "file",
                input : el("[type=file]", imgOriginNode)
            })
        }

        // save img from url
        if (imgSource == "url"){
            editor.imgUploadQueue.push({
                img   : img,
                from  : "url",
                url   : el(".img_from_url", imgOriginNode).value
            })
        }
    },
    //
    imgUploadQueue : [],
    cloneNodes     : [],
    //
    uploadImagesFromQueue : function () {
        if (uploadParams = editor.imgUploadQueue.pop())
            editor.uploadImagesFromQueueStep(uploadParams)
        else {
            // выгрузить окончательный html в инпут для загрузки на сервер
            editor.outHtml()

            //разблокировать редактор
            editor.enableEditor()

            var form = el("#edit_article_form")
            if (form)
                form.submit()
        }
    },
    uploadImagesFromQueueStep : function (uploadParams) {
        // todo legacy support, ie <= 9
        formData = new FormData();

        //log(uploadParams, 'uploadParams')

        var xhr = new XMLHttpRequest();

        if (uploadParams.from == "file"){
            formData.append("EDITOR_IMG", uploadParams.input.files[0])
            xhr.open('POST', "/saveimgfile", true);
        }
        if (uploadParams.from == "url"){
            formData.append("url", addhttp(uploadParams.url))
            xhr.open('POST', "/saveimgurl", true);
        }

        xhr.onload = function(e) {
             console.log("answer", e.currentTarget.responseText)
            if (xhr.readyState == 4 && xhr.status == 200) {
                attr(uploadParams.img, "src", e.currentTarget.responseText)
                data(uploadParams.img, "from", "cache")

                // запускаем следующий файл на загрузку
                editor.uploadImagesFromQueue()
            } else
                console.log("Error while ajax request:", xhr, e.currentTarget.responseText)
        }

        xhr.send(formData);  // multipart/form-data

    }
};

//
editor.prepareStoredNodes = function () {
    var nodes = all(".editor_content .node:not(.example)")

    if (nodes) {
        var addButtons, node, nodeType, actionBtns, settingsBtns;

        // prepare addButtons block
        addButtons = el(".editor_content .add_buttons.example").cloneNode(true);
        removeClass(addButtons, "example")
        removeClass(addButtons, "hidden")

        // prepare common actionBtns block
        actionBtns = el(".editor_content .node[data-type=text].example .action_buttons").cloneNode(true);

        // walk nodes
        for (var index = 0; index < nodes.length; index++) {
            node     = nodes[index];
            nodeType = data(node, "type")

            // add addButtons block after each node
            after(node, addButtons.cloneNode(true))

            // add common buttons
            after(el(".content", node), actionBtns.cloneNode(true))

            // if node has settings buttons - add them
            settingsBtns = el(".editor_content .node[data-type=" + nodeType + "].example .setting_buttons");
            if (settingsBtns){
                before(el(".content", node), settingsBtns.cloneNode(true))
            }

            // make editable
            if (nodeType == "header" || nodeType == "text"){
                attr(el(".content", node), "contenteditable", "true")
            } else if (nodeType == "list"){
                var listLi = all("li", node);

                for (var liIndex = 0; liIndex < listLi.length; liIndex++) {
                    attr(listLi[liIndex], "contenteditable", "true")
                }
            }
        }
    }
};

// обработка клавиш, общая для всех видов узлов
editor.initKeyPress = function(node){
    //
    bind("keydown", all(".content", node), function (e) {
        var nodeType = data(node, "type");

        // move whole node up, when press control + shift + up arrow
        if (e.keyCode == 38 && e.ctrlKey && e.shiftKey){
            el(".action_buttons [data-action=moveup]", node).click();

            this.focus();
            editor.selectAll();
        }

        // move whole node down, when press control + shift + up arrow
        if (e.keyCode == 40 && e.ctrlKey && e.shiftKey){
            el(".action_buttons [data-action=movedown]", node).click();

            this.focus();
            editor.selectAll();
        }

        // focus prev node, when press shift + up arrow
        if (e.keyCode == 38 && e.shiftKey && !e.ctrlKey){
            var prevNode = prev( prev(node) );

            if (prevNode){

                el(".content", prevNode).focus();
                editor.selectAll()
            }
        }

        // focus next node, when press shift + down arrow
        if (e.keyCode == 40 && e.shiftKey && !e.ctrlKey){
            var nextNode = next( next(node) );

            if (nextNode){

                el(".content", nextNode).focus();
                editor.selectAll()
            }
        }

        //  when press enter
        if (e.keyCode == 13){

            // add text node
            if (e.ctrlKey || nodeType == "header") {
                var addBtnsBlock, insertNode;

                // insert before
                if (e.shiftKey){
                    addBtnsBlock = prev(node);
                    el("[data-type=text]", addBtnsBlock).click();
                    insertNode = prev(addBtnsBlock);

                }
                // insert after
                else {
                    addBtnsBlock = next(node);
                    el("[data-type=text]", addBtnsBlock).click();
                    insertNode = prev(addBtnsBlock);
                }

                el(".content", insertNode).focus();
                editor.selectAll();
            }
            // add one more paragraph
            else {
                if (nodeType == "text"){

                    document.execCommand('insertHTML', false, '<p></p>');
                    el("p:last-child", node).focus()
                }
            }

            // prevent adding child div as native behavior
            e.preventDefault();
        }
    });
}

// selects all text in editing element
editor.selectAll = function () {
    window.setTimeout(function() {
        document.execCommand('selectAll', false, null)
    }, 1);
};



// --- EDITOR ---

editor.prepareStoredNodes()
editor.initAddButtons(".add_buttons button")
editor.initNodesButtons(all(".editor_content .node"))

//click(all("#btn_save"), editor.save)
click(all("#blankSendButton"), editor.save)

