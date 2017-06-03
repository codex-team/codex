module.exports = (function (callbacks) {

    callbacks.checkUserCanEdit = function (event) {
       
        var textarea       = event.target,
            blankAuthBlock = document.getElementById('blankAuthBlock'),
            emailInput     = document.getElementById('blankEmailInput');

        // var blankSkillsTextarea = document.getElementById('blankSkillsTextarea'),
        //     blankWishesTextarea = document.getElementById('blankWishesTextarea'),
        //     blankSendButton     = document.getElementById('blankSendButton');

        if (blankAuthBlock && !emailInput.value.length ) {

            if (!blankAuthBlock.className.includes('wobble')) {

                blankAuthBlock.className += ' wobble';
                setTimeout(function () {

                    blankAuthBlock.className = blankAuthBlock.className.replace('wobble', '');

                }, 450);

                textarea.value = '';

            }

        }

        // if (blankSkillsTextarea.value.length && blankWishesTextarea.value.length) {
        //     console.log(blankSendButton);
        //     blankSendButton.removeAttribute('disabled');
        // };


    };

    callbacks.showAdditionalFields = function (event) {

        var blankAdditionalFields = document.getElementById('blankAdditionalFields');

        if (blankAdditionalFields.className.includes('hide')) {

            blankAdditionalFields.className = blankAdditionalFields.className.replace('hide', '');

        } else {

            blankAdditionalFields.className += ' hide';

        }


    };

    callbacks.checkUser = function (event, uid) {

        var checker = document.getElementById('u' + uid);

        uid = parseInt(uid, 10);

        xhr.call({
            url : '/admin/checkUser.php?uid=' + uid,
            success : function (response) {

                response = JSON.parse(response);

                if (response.result == 'success') {

                    if (response.new == 1) {

                        checker.className += ' checked bounceIn';

                    } else {

                        checker.className = checker.className.replace('checked', '');
                        checker.className = checker.className.replace('bounceIn', '');

                    }

                }

            }
        });

    };

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