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
            holder = ceImage.ui.form();
        } else {
            holder = ceImage.ui.image(data);
        }

		return holder;

	},

	render : function( data ) {

		return this.make(data);

	},

	save : function ( block ) {

	},

	uploadButtonClicked : function(event){

        var success = function(result) {

            var parsed   = JSON.parse(result),
                filename = parsed.filename,
                image    = ceImage.ui.imageHolder(ceImage.path + filename, 'ce-plugin-image__wrapper');

            /** Replace plugin form with image */
            var wrapper = cEditor.content.composeNewBlock(image, 'image'),
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

	},

	ui : {

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
        */
        imageHolder : function(source, style) {

            var image = document.createElement('IMG');

            image.classList.add(style);
            image.src = source;

            return image;
        },

        /**
        * Draws form for image upload
        */
        form : function() {

            var holder       = ceImage.ui.holder(),
                uploadButton = ceImage.ui.uploadButton(),
                input        = ceImage.ui.input();

            input.placeholder = 'Paste image URL or file';

            holder.appendChild(uploadButton);
            holder.appendChild(input);

            uploadButton.addEventListener('click', ceImage.uploadButtonClicked, false );

            return holder;

        },

        image : function(data) {

            var file = data.file.url,
                type     = data.type,
                image    = ceImage.ui.imageHolder(file, 'ce-plugin-image__wrapper');

            return image;
        }
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
