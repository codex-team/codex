/**
 * Profile page methods
 */
module.exports = function () {

	/**
	 * Photo uploading success-callback
	 * Fired by transport
	 * @param  {string} newPhotoURL - uploaded file URL
	 */
    var uploadPhotoSuccess = function (newPhotoURL) {

        var settings_avatar = document.getElementById('profile-photo-updatable'),
            header_avatar   = document.getElementById('header-avatar-updatable');

        settings_avatar.src = newPhotoURL;
        header_avatar.src   = newPhotoURL;

    }

    return {
    	'uploadPhotoSuccess': uploadPhotoSuccess,
    }

}();