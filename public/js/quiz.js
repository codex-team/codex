/**
 * Модуль quiz с единственным публичным методом quiz.init()
 */
quiz = (function() {

    var quizData            = null,
        numberOfQuestions   = null,
        currentQuestion     = null,
        score               = null;


    /**
     * Публичный метод init.
     *
     * @param {object} quizDataInput  - объект с информацией о тесте
     * @param {string} handler - id элемента, в который будет выводиться тест
     */
    var init = function(quizDataInput, handler) {

        quizData = quizDataInput;
        numberOfQuestions = quizData.questions.length;
        currentQuestion = 0;
        score = 0;

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
            UI_.clear();

            var title,
                optionsHolder,
                counter,
                nextButton;

            title = UI_.createElem('div', 'quiz__question-title');

            optionsHolder = UI_.createElem('div', 'quiz__question-options');

            counter = UI_.createElem('div', 'quiz__question-counter');

            nextButton = UI_.createElem('input', ['quiz__question-button', 'quiz__question-button_next']);

            nextButton.setAttribute('type', 'button');
            nextButton.setAttribute('value', 'Далее →');

            UI_.questionElems = {
                counter: counter,
                title: title,
                optionsHolder: optionsHolder,
                options: [],
                nextButton: nextButton
            };

            UI_.append(UI_.questionElems);

            UI_.showQuestion();
        },

        /**
         * Выводим текущий вопрос на страницу (вопрос, варианты ответа и счетчик)
         */
        showQuestion: function (){

            UI_.clear(UI_.questionElems.optionsHolder);
            UI_.questionElems.options = [];
            UI_.questionElems.nextButton.removeEventListener('click', UI_.showQuestion);
            UI_.currentQuestionObj = quizData.questions[currentQuestion];

            UI_.questionElems.nextButton.setAttribute('disabled', true);

            UI_.questionElems.title.textContent = UI_.currentQuestionObj.title;
            UI_.questionElems.counter.textContent = currentQuestion + 1 + '/' + numberOfQuestions;

            UI_.currentQuestionObj.answers.map(UI_.createOption);
        },

        /**
         * Добавляем стили и выводим сообщение для выбранного варианта ответа
         * Открываем доступ к следующему вопросу
         *
         * @param answer - DOM-элемент выбранного ответа
         */
        showAnswer: function(answer) {

            var answerStyle = answer.dataset.score > 0 ? '_right' :  '_wrong',
                answerIndex = parseInt(answer.getAttribute('for'));

            answer.classList.add('quiz__question-label' + answerStyle);

            UI_.questionElems.options[answerIndex].input.setAttribute('checked', true);

            var answerMessage = UI_.createElem('div', 'quiz__answer-message');

            answerMessage.textContent = UI_.currentQuestionObj.answers[answerIndex].message;

            UI_.insertAfter(answerMessage, answer);

            for (var k in UI_.questionElems.options) {
                UI_.questionElems.options[k].label.removeEventListener('click', gameProcessing_.getUserAnswer);
                UI_.questionElems.options[k].input.disabled = true;
            }

            UI_.questionElems.nextButton.disabled = false;

            if (currentQuestion < numberOfQuestions  - 1) {
                UI_.questionElems.nextButton.addEventListener('click', UI_.showQuestion);
            } else {
                UI_.questionElems.nextButton.addEventListener('click', UI_.showResult.bind(UI_));
            }

            currentQuestion++;
        },

        showResult: function() {

            UI_.questionElems.nextButton.removeEventListener('click', UI_.showResult);

            UI_.clear();

            var resultTitle = UI_.createElem('div', 'quiz__result-title');
            resultTitle.textContent = 'Ваш результат:';

            var resultScore = UI_.createElem('div', 'quiz__result-score');
            resultScore.textContent = score + '/' + quizData.questions.length;

            var resultMessage = UI_.createElem('div', 'quiz__result-message');
            resultMessage.textContent = gameProcessing_.getMessage();

            var social = UI_.createElem('div', 'quiz__sharing');
            UI_.createSocial(social);

            var retry = UI_.createElem('div', 'quiz__retry-button');
            retry.textContent = 'Пройти еще раз';
            retry.addEventListener('click', init.bind(null, quizData, UI_.handler.id));

            UI_.append([resultTitle, resultScore, resultMessage, social, retry]);
        },

        /**
         * Создаем кнопки социальных сетей и добавляем их в handler
         *
         * @param {Element} handler
         */
        createSocial: function(handler) {

            var vk = UI_.createElem('span', ['but', 'vk']);
            var tg = UI_.createElem('span', ['but', 'tg']);
            var tw = UI_.createElem('span', ['but', 'tw']);
            var fb = UI_.createElem('span', ['but', 'fb']);

            vk.setAttribute('data-share-type', 'vkontakte');
            tg.setAttribute('data-share-type', 'telegram');
            tw.setAttribute('data-share-type', 'twitter');
            fb.setAttribute('data-share-type', 'facebook');

            vk.setAttribute('title', 'Share on the Vkontakte');
            tg.setAttribute('title', 'Forward in Telegram');
            tw.setAttribute('title', 'Tweet');
            fb.setAttribute('title', 'Share on the Facebook');

            var vk_icon = UI_.createElem('i', 'icon-vkontakte');
            var tg_icon = UI_.createElem('i', 'icon-paper-plane');
            var tw_icon = UI_.createElem('i', 'icon-twitter');
            var fb_icon = UI_.createElem('i', 'icon-facebook-squared');

            UI_.append(vk_icon, vk);
            UI_.append(tg_icon, tg);
            UI_.append(tw_icon, tw);
            UI_.append(fb_icon, fb);

            UI_.append([vk,tg,tw,fb], handler);
        },

        /**
         * Создаем i-й вариант ответа и выводим в UI_.questionElems.optionsHolder
         * И добавляем в UI_.questionElems.options
         *
         * @param {Object} answer - объект варианта ответа
         * @param {int} i - его номер в вопросе
         */
        createOption: function (answer, i) {

            var input = UI_.createElem('input','quiz__question-radiobutton'),
                label = UI_.createElem('label','quiz__question-label');

            input.setAttribute('name','r');
            input.setAttribute('id', i+'_'+answer.text);
            input.setAttribute('type','radio');

            label.dataset.score = answer.score;
            label.setAttribute('for', i+'_'+answer.text);
            label.textContent = answer.text;

            //Вешаем слушатель на вариант ответа
            label.addEventListener('click', gameProcessing_.getUserAnswer);

            UI_.questionElems.options.push({label:label, input: input});

            UI_.append([input,label], UI_.questionElems.optionsHolder);

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

            parent = parent || UI_.handler;

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
                UI_.questionElems.optionsHolder.insertBefore(elem, elemBefore.nextSibling);
            } else {
                UI_.append(elem, elemBefore.parentNode);
            }
        },

        /**
         * Удалаяет все дочерние элементы элемента parent
         *
         * @param {Element} parent
         */
        clear: function(parent) {
            parent = parent || UI_.handler;

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

            var answer = e.currentTarget;

            score += answer.dataset.score;


            UI_.showAnswer(answer);

        },

        /**
         * Получает сообщение о результате для набранного количества баллов
         *
         * @returns {string} message
         */
        getMessage: function() {

            var messages = quizData.messages,
                message;

            if (!messages.length) {
                return;
            }

            for (var i in messages) {
                if (score < messages[i]['score']) {
                    break;
                }

                message = messages[i]['message'];
            }

            return message;
        }

    };

    return {
        init: init
    }

})();
