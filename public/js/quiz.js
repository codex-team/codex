
 quiz = (function() {

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

            this.questionElems = {//из чего состоит вопрос
                counter: counter,
                title: title,
                //description: description,
                optionsHolder: optionsHolder,
                nextButton: nextButton
            };

            this.append(this.questionElems);

            this.currentQuestion = -1;//вопрос,который будет выводиться в конце статьи в  методе showQuestion
            this.showQuestion();
        },

        showQuestion: function (){
			var cQ = ++this.currentQuestion;
			this.questionElems.counter.innerHTML = ' ';//this.currentQuestion; 
			var n = quizData.questions[cQ].answers.length;
				for (var i=0;i< n;i++) //здесь вывод вариантов ответа. их добавить через optionsHolder. это нужно вынести в отдельную функцию
				//в questionElems 
				{
				
					this.createOptions(quizData.questions[cQ].answers[i], i);
					
				}
		
		//запустить цикл для массива из n вопросов
        },

        showAnswer: function(isRight) {

        },

        showResult: function() {

        },
		
		createOptions: function (answer,i) { //для создания вариантов ответа
			
			
			var input = this.createElem('input','quiz__question-radiobutton'),
				label = this.createElem('label','quiz__question-label');
			input.setAttribute('name','r');
			input.setAttribute('id', i);
			input.setAttribute('type','radio');
			label.setAttribute('data',answer.score);
			label.setAttribute('for', i);
			label.textContent = answer.text;
			label.addEventListener('click', gameProcessing_.getUserAnswer);
			
			this.append([input,label]);
			
		},

        createElem: function(tag, classes) { //сюда нужно передать имя тега,он возвращает созданный dom элемент с нужными атрибутами
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

        getUserAnswer: function(e) {

			console.log('score: '+e.currentTarget.getAttribute('data'));

        },

    };

    return {
        init: init
    }

})();
