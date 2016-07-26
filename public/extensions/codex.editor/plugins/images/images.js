/**
* Image plugin for codex-editor
* @author CodeX Team <team@ifmo.su>
*
* @version 0.0.1
*/
var ceImage = {

	make : function ( data ) {

		var holder       = ceImage.ui.holder(),
			uploadButton = ceImage.ui.uploadButton(),
			input        = ceImage.ui.input();

		input.placeholder = 'Past image URL or file';

		holder.appendChild(uploadButton);
		holder.appendChild(input);

		uploadButton.addEventListener('click', ceImage.uploadButtonClicked, false );

		return holder;

	},

	render : function( data ){

		return this.make(data);

	},

	save : function ( block ){

	},

	uploadButtonClicked : function(event){

        var success = function(result) {

            var parsed   = JSON.parse(result),
                filename = parsed.filename,
                img      = cEditor.draw.block('IMG', '');

            img.classList.add('ce-plugin-image__wrapper');
            img.src = '/upload/redactor_images/' + filename;

            return img;

        }

        var error = function(result) {
            console.log('Choosen file is not image or image is corrupted');
        }

        /** Plugin callbacks */
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
