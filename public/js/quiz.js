/**
 * Модуль quiz с единственным публичным методом quiz.init()
 */
quiz = (function() {

    var quizData            = null,
        numberOfQuestions   = null,
        currentQuestion     = -1,
        score               = 0;


    /**
     * Публичный метод init.
     *
     * @param {object} quizDataInput  - объект с информацией о тесте
     * @param {string} handler - id элемента, в который будет выводиться тест
     */
    var init = function(quizDataInput, handler) {

        quizData = quizDataInput;
        numberOfQuestions = quizData.questions.length;


        UI_.prepare(handler);
        UI_.setupQuestionInterface();
    };

    var UI_ = {

        handler: null,
        currentQuestionObj: null,

        //Объект, в котором будут храниться DOM-элементы, связанные с отображением вопроса
        questionElems: null,

        prepare: function(handler) {
            UI_.handler = document.getElementById(handler);
            UI_.handler.classList.add('quiz');
        },

        /**
         * Создаем элементы для вывода теста, заносим их в UI_.questionElems и выводим на страницу.
         */
        setupQuestionInterface: function() {
            this.clear();

            var title,
                optionsHolder,
                counter,
                nextButton;

            title = this.createElem('div', 'quiz__question-title');

            optionsHolder = this.createElem('div', 'quiz__question-options');

            counter = this.createElem('div', 'quiz__question-counter');

            nextButton = this.createElem('input', ['quiz__question-button', 'quiz__question-button_next']);

            nextButton.setAttribute('type', 'button');
            nextButton.setAttribute('value', 'Далее →');

            this.questionElems = {
                counter: counter,
                title: title,
                optionsHolder: optionsHolder,
                options: [],
                nextButton: nextButton
            };

            this.append(this.questionElems);

            this.showQuestion();
        },

        /**
         * Выводим текущий вопрос на страницу (вопрос, варианты ответа и счетчик)
         */
        showQuestion: function (){

            this.clear(this.questionElems.optionsHolder);
            this.questionElems.options = [];

            this.currentQuestionObj = quizData.questions[++currentQuestion];

            this.questionElems.nextButton.setAttribute('disabled', true);

            this.questionElems.title.textContent = this.currentQuestionObj.title;
            this.questionElems.counter.textContent = currentQuestion + 1 + '/' + numberOfQuestions;

            for (var i in this.currentQuestionObj.answers) {
                this.createOption(this.currentQuestionObj.answers[i], i);
            }
        },

        /**
         * Добавляем стили и выводим сообщение для выбранного варианта ответа
         * Открываем доступ к следующему вопросу
         *
         * @param answer - DOM-элемент выбранного ответа
         */
        showAnswer: function(answer) {

            var answerStyle = answer.getAttribute('data') > 0 ? '_right' :  '_wrong';
            answer.classList.add('quiz__question-label'+answerStyle);

            var answerMessage = this.createElem('div', 'quiz__answer-message');

            answerMessage.textContent = this.currentQuestionObj.answers[+answer.getAttribute('for')].message;

            this.insertAfter(answerMessage, answer);

            for (var k in this.questionElems.options) {
                this.questionElems.options[k].removeEventListener('click', gameProcessing_.getUserAnswer);
            }

            this.questionElems.nextButton.disabled = false;

            if (currentQuestion < numberOfQuestions  - 1) {
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

        /**
         * Создаем кнопки социальных сетей и добавляем их в handler
         *
         * @param {Element} handler
         */
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

        /**
         * Создаем i-й вариант ответа и выводим в UI_.questionElems.optionsHolder
         * И добавляем в UI_.questionElems.options
         *
         * @param {Object} answer - объект варианта ответа
         * @param {int} i - его номер в вопросе
         */
        createOption: function (answer, i) {

            var input = this.createElem('input','quiz__question-radiobutton'),
                label = this.createElem('label','quiz__question-label');

            input.setAttribute('name','r');
            input.setAttribute('id', i);
            input.setAttribute('type','radio');

            label.setAttribute('data',answer.score);
            label.setAttribute('for', i);
            label.textContent = answer.text;

            //Вешаем слушатель на вариант ответа
            label.addEventListener('click', gameProcessing_.getUserAnswer);

            this.questionElems.options.push(label);

            this.append([input,label], this.questionElems.optionsHolder);

        },

        /**
         * Создает новый DOM-элемент с набором переданных классов
         *
         * @param {string} tag - имя тега
         * @param {string|Array} classes - имя или массив имен классов
         * @returns {Element}
         */
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

        /**
         * Добавляет элементы в переданный элемент
         *
         * @param {Element|Array} elems - элемент или массив элементов
         * @param {Element|null} parent - родитель или UI_.handler, если передан NULL
         */
        append: function(elems, parent) {

            parent = parent || this.handler;

            if (!(elems instanceof Element)) {

                for (var i in elems) {
                    if (elems[i] instanceof Element) {
                        parent.appendChild(elems[i]);
                    }
                }

            } else {
                parent.appendChild(elems);
            }

        },


        /**
         * Вставляет элемент после переданного элемента
         *
         * @param {Element} elem
         * @param {Element} elemBefore
         */
        insertAfter: function(elem, elemBefore) {
            if (elemBefore.nextSibling) {
                this.questionElems.optionsHolder.insertBefore(elem, elemBefore.nextSibling);
            } else {
                this.append(elem, elemBefore.parentNode);
            }
        },

        /**
         * Удалаяет все дочерние элементы элемента parent
         *
         * @param {Element} parent
         */
        clear: function(parent) {
            parent = parent || this.handler;

            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

        }

    };

    var gameProcessing_ = {

        /**
         * Добавляет баллы за ответ
         *
         * @param {Object} e - объект события клика по варианту ответа
         */
        getUserAnswer: function(e) {
            score += +e.currentTarget.getAttribute('data');


            UI_.showAnswer(e.currentTarget);

        },

        /**
         * Получает сообщение о результате для набранного количества баллов
         *
         * @returns {string} message
         */
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