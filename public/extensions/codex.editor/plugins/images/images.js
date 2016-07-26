/**
* Image plugin for codex-editor
* @author CodeX Team <team@ifmo.su>
*
* @version 0.0.1
*/
var ceImage = {

    /** Default file path */
    path : '/upload/redactor_images/',

	make : function ( data ) {

        /**
        * If we can't find image or we've got some problems with image path, we show plugin uploader
        */
        if (!data || !data.filename || !data.path) {

    		var holder       = ceImage.ui.holder(),
    			uploadButton = ceImage.ui.uploadButton(),
    			input        = ceImage.ui.input();

    		input.placeholder = 'Past image URL or file';

    		holder.appendChild(uploadButton);
    		holder.appendChild(input);

    		uploadButton.addEventListener('click', ceImage.uploadButtonClicked, false );

        } else {

            var filename = data.filename,
                path     = data.path,
                type     = data.type,
                image    = cEditor.draw.block('IMG', '');

            image.classList.add('ce-plugin-image__wrapper');
            image.src = path + filename;

            holder = image;
        }
        /** Return plugin uploader or image */
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
                image    = cEditor.draw.block('IMG', ''),
                selection   = window.getSelection(),
                imageHolder = selection.anchorNode;

            image.classList.add('ce-plugin-image__wrapper');
            image.src = ceImage.path + filename;

            /** Getting plugin selector block */
            while (!imageHolder.classList.contains(cEditor.ui.BLOCK_CLASSNAME)) {
                imageHolder = imageHolder.parentNode;
            }

            /** Replace plugin selector block to image */
            var wrapper = cEditor.content.composeNewBlock(image, 'image');
            cEditor.content.replaceBlock(imageHolder, wrapper, 'image');

        }

        var error = function(result) {
            console.log('Choosen file is not image or image is corrupted');
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
