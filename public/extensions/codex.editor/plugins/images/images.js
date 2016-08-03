/**
* Image plugin for codex-editor
* @author CodeX Team <team@ifmo.su>
*
* @version 0.0.2
*/
var ceImage = {

    elementClasses : {
        uploadedImage : 'ce-plugin-image__uploaded',
        imageCaption  : 'ce-plugin-image__caption',
        imageWrapper  : 'ce-plugin-image__wrapper',
        formHolder    : 'ce-plugin-image__holder',
        uploadButton  : 'ce-plugin-image__button',

    },

    /** Default path to redactors images */
    path : '/upload/redactor_images/',

    make : function ( data ) {

        /**
        * If we can't find image or we've got some problems with image path, we show plugin uploader
        */
        if (!data || !data.file.url) {
            holder = ceImage.ui.formView();
        } else {
            holder = ceImage.ui.imageView(data);
        }

        return holder;
    },

    render : function( data ) {

        return this.make(data);

    },

    save : function ( block ) {

        var data = block[0],
            image = data.querySelector('.' + ceImage.elementClasses.uploadedImage),
            caption = data.querySelector('.' + ceImage.elementClasses.imageCaption);

        var json = {
            type : 'image',
            data : {
                background : false,
                border : false,
                isStrech : false,
                file : {
                    url : image.src,
                    bigUrl : null,
                    width  : image.width,
                    height : image.height,
                    additionalData :null,
                },
                caption : caption.textContent,
                cover : null,
            }
        };

        return json;
    },

    uploadButtonClicked : function(event) {

        var success = ceImage.photoUploadingCallbacks.success,
            error   = ceImage.photoUploadingCallbacks.error;

        /** Define callbacks */
        cEditor.transport.selectAndUpload({
            success,
            error,
        });
    }
};

ceImage.ui = {

    holder : function(){

        var element = document.createElement('DIV');

        element.classList.add(ceImage.elementClasses.formHolder);

        return element;
    },

    input : function(){

        var input = document.createElement('INPUT');

        return input;

    },

    uploadButton : function(){

        var button = document.createElement('SPAN');

        button.classList.add(ceImage.elementClasses.uploadButton);

        button.innerHTML = '<i class="ce-icon-picture"></i>';

        return button;

    },

    /**
    * @param {string} source - file path
    * @param {string} style - css class
    * @return {object} image - document IMG tag
    */
    image : function(source, style) {

        var image = document.createElement('IMG');

        image.classList.add(style);

        image.src = source;

        return image;
    },

    wrapper : function() {

        var div = document.createElement('div');

        div.classList.add(ceImage.elementClasses.imageWrapper);

        return div;
    },

    caption : function() {

        var div = document.createElement('div');

        div.classList.add(ceImage.elementClasses.imageCaption);

        div.contentEditable = true;

        return div;
    },

    /**
    * Draws form for image upload
    */
    formView : function() {

        var holder       = ceImage.ui.holder(),
            uploadButton = ceImage.ui.uploadButton(),
            input        = ceImage.ui.input();

        input.placeholder = 'Paste image URL or file';

        holder.appendChild(uploadButton);
        holder.appendChild(input);

        uploadButton.addEventListener('click', ceImage.uploadButtonClicked, false );

        return holder;
    },

    /**
    * wraps image and caption
    * @param {object} data - image information
    * @return wrapped block with image and caption
    */
    imageView : function(data) {

        var file = data.file.url,
            text = data.caption,
            type     = data.type,
            image    = ceImage.ui.image(file, ceImage.elementClasses.uploadedImage),
            caption  = ceImage.ui.caption(),
            wrapper  = ceImage.ui.wrapper();

        caption.textContent = text;

        /** Appeding to the wrapper */
        wrapper.appendChild(image);
        wrapper.appendChild(caption);

        return wrapper;
    }

};

ceImage.photoUploadingCallbacks = {

    /** Photo was uploaded successfully */
    success : function(result) {

        var parsed = JSON.parse(result),
            data,
            image;

        /**
        * Preparing {Object} data to draw an image
        * @uses ceImage.make method
        */
        data = {
            background : false,
            border : false,
            file : {
                url    : ceImage.path + 'o_' + parsed.filename,
                bigUrl : null,
                width  : null,
                height : null,
                additionalData : null,
            },
            caption : '',
            cover : null,
        };

        image = ceImage.make(data);

        /** Replace form to image */
        var form = cEditor.content.currentNode.querySelector('.' + ceImage.elementClasses.formHolder);

        cEditor.content.switchBlock(form, image, 'image');

    },

    /** Error callback. Sends notification to user that something happend or plugin doesn't supports method */
    error : function(result) {
        console.log('Choosen file is not image or image is corrupted');
        cEditor.notifications.errorThrown();
    },

}


/**
* Add plugin it to redactor tools
*/
cEditor.tools.image = {

    type           : 'image',
    iconClassname  : 'ce-icon-picture',
    make           : ceImage.make,
    render         : ceImage.render,
    save           : ceImage.save

};
