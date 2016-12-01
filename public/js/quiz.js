
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
            this.clear();

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
                options: [],
                nextButton: nextButton
            };

            this.append(this.questionElems);

            this.currentQuestion = -1;//вопрос,который будет выводиться в конце статьи в  методе showQuestion
            this.showQuestion();
        },

        showQuestion: function (){
			var cQ = ++this.currentQuestion;
            this.questionElems.nextButton.setAttribute('disabled', true);

            this.questionElems.title.textContent = quizData.questions[cQ].title;
            this.questionElems.counter.textContent = cQ + 1 + '/' + quizData.questions.length;
			var n = quizData.questions[cQ].answers.length;
				for (var i=0;i< n;i++) //здесь вывод вариантов ответа. их добавить через optionsHolder. это нужно вынести в отдельную функцию
				//в questionElems 
				{
				
					this.createOptions(quizData.questions[cQ].answers[i], i);
					
				}
		
		//запустить цикл для массива из n вопросов
        },

        showAnswer: function(answer) {

            answer.classList.add(answer.getAttribute('data') > 0 ? 'quiz__question-label-right' :  'quiz__question-label-wrong' );

            var answerMessage = this.createElem('div', 'quiz__answer-message');

            answerMessage.textContent = quizData.questions[currentQuestion].answers[+answer.getAttribute('for')].message;

            if (answer.nextSibling) {
                this.questionElems.optionsHolder.insertBefore(answerMessage, answer.nextSibling);
            } else {
                this.append(answerMessage, this.questionElems.optionsHolder);
            }

            for (var k in this.questionElems.options) {
                this.questionElems.options[k].removeEventListener('click', gameProcessing_.getUserAnswer);
            }

            this.questionElems.nextButton.disabled = false;

            if (currentQuestion < quizData.questions.length  - 1) {
                this.questionElems.nextButton.addEventListener('click', this.showQuestion);
            } else {
                this.questionElems.nextButton.addEventListener('click', this.showResult.bind(this));
            }

        },

        showResult: function() {

            this.questionElems.nextButton.removeEventListener('click', this.showResult);

            this.clear();

            var resultTitle = this.createElem('div', 'quiz__result-title');
            resultTitle.textContent = 'Ваш результат:';

            var resultScore = this.createElem('div', 'quiz__result-score');
            resultScore.textContent = score + '/' + quizData.questions.length;

            var resultMessage = this.createElem('div', 'quiz__result-message');
            resultMessage.textContent = gameProcessing_.getMessage();

            var social = this.createElem('div', 'quiz__sharing');
            this.createSocial(social);

            var retry = this.createElem('div', 'quiz__retry-button');
            retry.textContent = 'Пройти еще раз';
            retry.addEventListener('click', init.bind(null, quizData, UI_.handler.id));

            this.append([resultTitle, resultScore, resultMessage, social, retry]);
        },

        createSocial: function(handler) {

            var vk = this.createElem('span', ['but', 'vk']);
            var tg = this.createElem('span', ['but', 'tg']);
            var tw = this.createElem('span', ['but', 'tw']);
            var fb = this.createElem('span', ['but', 'fb']);

            vk.setAttribute('data-share-type', 'vkontakte');
            tg.setAttribute('data-share-type', 'telegram');
            tw.setAttribute('data-share-type', 'twitter');
            fb.setAttribute('data-share-type', 'facebook');

            vk.setAttribute('title', 'Share on the Vkontakte');
            tg.setAttribute('title', 'Forward in Telegram');
            tw.setAttribute('title', 'Tweet');
            fb.setAttribute('title', 'Share on the Facebook');

            var vk_icon = this.createElem('i', 'icon-vkontakte');
            var tg_icon = this.createElem('i', 'icon-paper-plane');
            var tw_icon = this.createElem('i', 'icon-twitter');
            var fb_icon = this.createElem('i', 'icon-facebook-squared');

            this.append(vk_icon, vk);
            this.append(tg_icon, tg);
            this.append(tw_icon, tw);
            this.append(fb_icon, fb);

            this.append([vk,tg,tw,fb], handler);
        },

		createOptions: function (answer, i) { //для создания вариантов ответа
			
			
			var input = this.createElem('input','quiz__question-radiobutton'),
				label = this.createElem('label','quiz__question-label');
			input.setAttribute('name','r');
			input.setAttribute('id', i);
			input.setAttribute('type','radio');
			label.setAttribute('data',answer.score);
			label.setAttribute('for', i);
			label.textContent = answer.text;
			label.addEventListener('click', gameProcessing_.getUserAnswer);

            this.questionElems.options.push(label);

			this.append([input,label], this.questionElems.optionsHolder);
			
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

            if (!(elems instanceof Element)) {

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

            score += +e.currentTarget.getAttribute('data');


            UI_.showAnswer(e.currentTarget);

        },

        getMessage: function() {

            var messages = quizData.messages,
                message;

            for (var points in messages) {
                if (score < points) {
                    break;
                }

                message = messages[points];

            }

            return message;
        }

    };

    return {
        init: init
    }

})();
