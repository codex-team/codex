module.exports = (function (callbacks) {

    callbacks.saveProfilePhoto = {

        success: function (new_photo_name) {

            var settings_avatar = document.getElementById('profile-photo-updatable'),
                header_avatar   = document.getElementById('header-avatar-updatable');

            settings_avatar.src = new_photo_name;
            header_avatar.src   = new_photo_name;

        }

    };

    return callbacks;

})({});