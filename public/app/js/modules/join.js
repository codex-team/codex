    join.checkUserCanEdit = function (event) {
        console.log(123);
        var textarea       = event.target,
            blankAuthBlock = document.getElementById('blankAuthBlock'),
            emailInput     = document.getElementById('blankEmailInput');

        // var blankSkillsTextarea = document.getElementById('blankSkillsTextarea'),
        //     blankWishesTextarea = document.getElementById('blankWishesTextarea'),
        //     blankSendButton     = document.getElementById('blankSendButton');

        textareas = document.getElementsByClassName("js-join-input");
        if (textareas.length > 0) {console.log("It works!");}

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
