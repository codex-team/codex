/**
 * Created by Marco on 07.11.2015.
 */

// --- COMMON FUNCTIONS ---

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

}

before = function(relObj, newObj){
    relObj.parentNode.insertBefore(newObj, relObj)
}

replace = function(oldObj, newObj){

}

prev = function(obj){
    return obj.previousElementSibling
}

next = function(obj){
    return obj.nextElementSibling
}

remove = function(obj){
    obj.parentNode.removeChild(obj)
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

addClass = function(obj, className) {
    obj.classList.add(className)
}

removeClass = function(obj, className) {
    obj.classList.remove(className)
}

hasClass = function(obj, className) {
    return obj.classList.contains(className)
}

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
        })
    },
    //
    createEditorNode : function (type) {
        var node = el(".editor_content .node[data-type=" + type + "]").cloneNode(true)

        removeClass(node, "hidden")
        removeClass(node, "example")
        editor.initNodesButtons([node])

        return node
    },
    //
    initNodesButtons : function (nodes) {
        var node, nodeType
        for (var index = 0; index < nodes.length; ++index) {
            node = nodes[index]
            nodeType  = data(node, "type")

            // todo init common buttons
            editor.initCommonButtons(node)

            if (nodeType == "img"){
                editor.initImgNodeButtons(node)
            }
        }
    },
    // move and remove buttons
    initCommonButtons : function (node) {
        // remove
        click(all("button[data-action=remove]", node), function () {
            // 4 first remove add buttons before block
            remove(prev(this.parentNode.parentNode))
            // and after remove content node
            remove(this.parentNode.parentNode)
        })

        // move up
        click(all("button[data-action=moveup]", node), function () {
            var editor_node = this.parentNode.parentNode
            var add_buttons = next(editor_node)
            var prev_editor_node = prev( prev(editor_node) )

            if (hasClass(prev_editor_node, "node")){
                before(prev_editor_node, editor_node)
                before(add_buttons, prev_editor_node)
            }
        })

        // move down
        click(all("button[data-action=movedown]", node), function () {
            var editor_node = this.parentNode.parentNode
            var next_editor_node = next( next(editor_node) )
            var add_buttons = next(next_editor_node)
//debugger
            if (hasClass(next_editor_node, "node")){
                log("hasClass")
                before(editor_node, next_editor_node)
                before(add_buttons, editor_node)
            }
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
    //
    initImgNodeButtons : function (node) {
        // rename file input
        fileInputName = attr(el("[type=file]", node), "name")
        attr(el("[type=file]", node), "name", fileInputName + randomBetween(100, 999).toString())

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

    // - editor save functions -

    save : function () {
            log("saving...")
        //заблокировать редактор
        el("#btn_save").textContent = "Подготовка к сохранению..."
        attr(el("#btn_save"), "disabled", "disabled")

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

            cloneNodes.push(cloneNode)
        })
        log(cloneNodes, "cloneNodes")
        editor.cloneNodes = cloneNodes
        //

        editor.uploadImagesFromQueue()

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
        //debugger
        if (uploadParams = editor.imgUploadQueue.pop())
            editor.uploadImagesFromQueueStep(uploadParams)
        else {

            // выгрузить окончательный html в инпут для загрузки на сервер
            el("#html_result").innerHTML = collectionHtml(editor.cloneNodes)
            //
            //разблокировать редактор
            el(("#btn_save")).textContent = "Готово!"

            // friendly mode :)
            setTimeout(function() {
                el(("#btn_save")).textContent = "Сохранить"
                removeAttr(el("#btn_save"), "disabled")
            }, 750);

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

                // запускаем следующий файл на загрузку
                editor.uploadImagesFromQueue()
            } else
                console.log("Error while ajax request:", xhr, e.currentTarget.responseText)
        }

        xhr.send(formData);  // multipart/form-data

    }
}


// --- EDITOR ---

editor.initAddButtons(".add_buttons button")
editor.initNodesButtons(all(".editor_content .node"))

click(all("#btn_save"), editor.save)