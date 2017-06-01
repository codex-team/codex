join = {

        init : function ( textarea ) {
            textareas = document.getElementsByClassName("js-join-input");
            blankAuthBlock = document.getElementById("blankAuthBlock");

            console.log(blankAuthBlock);

            for(var i = 0; i < textareas.length; i++) {

                textareas[i].addEventListener("keyup", function() {

                    if (blankAuthBlock && this.value.length) {

                        setTimeout(function () {

                            blankAuthBlock.classList.remove('wobble');

                        }, 450);

                        this.value = '';

                        blankAuthBlock.classList.add('wobble');
                    } 
                    
                });
            }
        }
}

module.exports = join;

