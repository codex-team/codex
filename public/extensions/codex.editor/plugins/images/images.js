/**
* Image plugin for codex-editor
* @author CodeX Team <team@ifmo.su>
*
* @version 0.0.1
*/
var ceImage = {

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
            image = data.getElementsByTagName('img')[0],
            caption = data.getElementsByTagName('div')[0];

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
        }

        return json;

	},

	uploadButtonClicked : function(event){

        var success = function(result) {

            var parsed   = JSON.parse(result),
                filename = parsed.filename,
                image    = ceImage.ui.image(ceImage.path + 'o_' + filename, 'ce-plugin-image__uploaded'),
                caption  = ceImage.ui.caption(),
                img_wrapper = ceImage.ui.wrapper();

            img_wrapper.appendChild(image);
            img_wrapper.appendChild(caption);

            /** Replace plugin form with image */
            var wrapper = cEditor.content.composeNewBlock(img_wrapper, 'image'),
                nodeToReplace = cEditor.content.currentNode;

            cEditor.content.replaceBlock(nodeToReplace, wrapper, 'image');

        }

        var error = function(result) {
            console.log('Choosen file is not image or image is corrupted');
            cEditor.notifications.errorThrown();
        }

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

        element.classList.add('ce-plugin-image__holder');

        return element;

    },

    input : function(){

        var input = document.createElement('INPUT');

        return input;

    },

    uploadButton : function(){

        var button = document.createElement('SPAN');

        button.classList.add('ce-plugin-image__button');

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

        div.classList.add('ce-plugin-image__wrapper');

        return div;
    },

    caption : function() {

        var div = document.createElement('div');

        div.classList.add('ce-plugin-image--caption');
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
    * appends into div image and caption
    * @param {object} data - image information
    * @return wrapped block with image and caption
    */
    imageView : function(data) {

        var file = data.file.url,
            text = data.caption,
            type     = data.type,
            image    = ceImage.ui.image(file, 'ce-plugin-image__uploaded'),
            caption  = ceImage.ui.caption(),
            wrapper  = ceImage.ui.wrapper();

        caption.textContent = text;

        /** Appeding to the wrapper */
        wrapper.appendChild(image);
        wrapper.appendChild(caption);

        return wrapper;
    }
};


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
