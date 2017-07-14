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

        var settingsPhoto = document.getElementById('profile-photo-updatable'),
            headerPhoto   = document.getElementById('header-avatar-updatable');

        settingsPhoto.src = newPhotoURL;
        headerPhoto.src   = newPhotoURL;

    };

    return {
        uploadPhotoSuccess,
    };

}();
