var quiz = (function() {

    var quizData        = null,
        currentQuestion = 0,
        score           = 0;

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
                optionsHolder,
                counter,
                nextButton;

            title = this.createElem('div', 'quiz__question-title');

            //description = this.createElem('div', ['quiz__question-description']);

            optionsHolder = this.createElem('div', 'quiz__question-options');

            counter = this.createElem('div', 'quiz__question-counter');

            nextButton = this.createElem('input', ['quiz__question-button', 'quiz__question-button_next']);

            nextButton.setAttribute('type', 'button');
            nextButton.setAttribute('value', 'Далее →');

            this.questionElems = {
                counter: counter,
                title: title,
                //description: description,
                optionsHolder: optionsHolder,
                options: [{input: this.createElem('input')}, {input: this.createElem('input')}, {input: this.createElem('input')}],
                nextButton: nextButton
            };

            this.append(this.questionElems);

            this.currentQuestion = 0;

            //this.showQuestion();
        },

        showQuestion: function (){

        },

        showAnswer: function(isRight) {

        },

        showResult: function() {

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

            if (elems instanceof Object) {

                for (var i in elems) {
                    if (elems[i] instanceof Element)
                        parent.appendChild(elems[i]);
                }

            } else {
                parent.appendChild(elems);
            }

        },

        clear: function(parent) {
            parent = parent || this.handler;

            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

        }

    };

    var gameProcessing_ = {

        selectedOption: null,

        getUserAnswer: function() {

            var options,
                option,
                isRight;

            options = UI_.questionElems.options;

            for (option in options) {

                if ( options[option].input.getAttribute('checked') )
                    break;

            }

            this.selectedOption = options[option];

            score += +this.selectedOption.input.getAttribute('data');

            isRight = +this.selectedOption.input.getAttribute('data') ? true : false;

            console.log(score);
            //UI_.showAnswer(isRight);

        },

    };

    return {
        init: init
    }

})();
