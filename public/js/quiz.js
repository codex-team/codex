var quiz = (function() {

    var quizData        = null,
        currentQuestion = null;

    var init = function(quizDataInput, handler) {

        quizData = quizDataInput;

        UI_.handler = document.getElementById(handler);

        UI_.handler.classList.add('quiz');

        UI_.setupQuestionInterface();
    };

    var UI_ = {

        handler: null,

        questionElems: null,

        setupQuestionInterface: function() {

            var title,
                //description,
                options,
                counter,
                nextButton;

            title = this.createElem('div', 'quiz__question-title');

            //description = this.createElem('div', ['quiz__question-description']);

            options = this.createElem('div', 'quiz__question-options');

            counter = this.createElem('div', 'quiz__question-counter');

            nextButton = this.createElem('input', ['quiz__question-button', 'quiz__question-button_next']);

            nextButton.setAttribute('type', 'button');
            nextButton.setAttribute('Value', 'Далее →');

            questionElems = {
                counter: counter,
                title: title,
                //description: description,
                options: options,
                nextButton: nextButton
            };

            this.append(questionElems);

            this.currentQuestion = 0;

            //this.showQuestion();
        },

        showQuestion: function (){



        },

        createElem: function(tag, classes) {
            var elem = document.createElement(tag);

            if (classes instanceof Array) {
                for (var i in classes) {
                    elem.classList.add(classes[i]);
                }
            } else {
                elem.classList.add(classes);
            }

            return elem;
        },

        append: function(elems, parent) {
            parent = parent || this.handler;

            for (var i in elems) {
                this.handler.appendChild(elems[i]);
            }

        }

    };

    return {
        init: init,
    }

})();
