/**
 * Модуль quiz с единственным публичным методом quiz.init()
 */
module.exports = (function () {

    var quizData            = null,
        numberOfQuestions   = null,
        currentQuestion     = null,
        score               = null,
        maxScore            = null;


    /**
     * Публичный метод init.
     *
     * @param {Object} settings - настройки теста
     * @param {Object} settings.quizDataInput - объект с информацией о тесте
     * @param {string} settings.holder - id элемента, в который будет выводиться тест
     */
    var init = function (settings) {

        quizData = settings.quizDataInput;
        numberOfQuestions = quizData.questions.length;
        currentQuestion = 0;
        score = 0;

        gameProcessing_.prepare();
        UI_.prepare(settings.holder);
        UI_.setupQuestionInterface();

    };

    var UI_ = {

        holder: null,
        currentQuestionObj: null,

        // Объект, в котором будут храниться DOM-элементы, связанные с отображением вопроса
        questionElems: null,

        prepare: function (holder) {

            UI_.holder = document.getElementById(holder);
            UI_.holder.classList.add('quiz');
            UI_.holder.classList.add('clearfix');

        },

        /**
         * Создаем элементы для вывода теста, заносим их в UI_.questionElems и выводим на страницу.
         */
        setupQuestionInterface: function () {

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
        showQuestion: function () {

            UI_.clear(UI_.questionElems.optionsHolder);
            UI_.questionElems.options = [];
            UI_.questionElems.nextButton.removeEventListener('click', UI_.showQuestion);
            UI_.currentQuestionObj = quizData.questions[currentQuestion];

            UI_.questionElems.nextButton.setAttribute('disabled', true);

            UI_.questionElems.title.textContent = UI_.currentQuestionObj.title;
            UI_.questionElems.counter.textContent = currentQuestion + 1 + '/' + numberOfQuestions;

            UI_.currentQuestionObj.answers.map(UI_.createOption);

        },

        answerSelected: function (answer) {

            answer.classList.add('quiz__question-answer_selected');

            UI_.questionElems.options.map(function (current) {

                current.removeEventListener('click', gameProcessing_.getUserAnswer);

            });

            UI_.questionElems.nextButton.disabled = false;

            if (currentQuestion < numberOfQuestions  - 1) {

                UI_.questionElems.nextButton.addEventListener('click', UI_.showQuestion);

            } else {

                UI_.questionElems.nextButton.addEventListener('click', UI_.showResult);

            }

            UI_.showAnswer(answer);

            currentQuestion++;

        },
        /**
         * Добавляем стили и выводим сообщение для выбранного варианта ответа
         * Открываем доступ к следующему вопросу
         *
         * @param {Element} answer - DOM-элемент выбранного ответа
         */
        showAnswer: function (answer) {

            var answerStyle = answer.dataset.score > 0 ? '_right' :  '_wrong',
                answerIndex = answer.dataset.index;

            answer.classList.add('quiz__question-answer' + answerStyle);

            var answerMessage = UI_.createElem('div', 'quiz__answer-message');

            answerMessage.textContent = UI_.currentQuestionObj.answers[answerIndex].message;

            UI_.insertAfter(answerMessage, answer);

            if (answer.dataset.score == 0) {

                UI_.showCorrectAnswers();

            }

        },

        showCorrectAnswers: function () {

            UI_.questionElems.options.map(function (answer) {

                if (answer.dataset.score > 0) {

                    answer.classList.add('quiz__question-answer_right');

                } else {

                    answer.classList.add('quiz__question-answer_wrong');

                }

            });

        },

        showResult: function () {

            var result =  score + '/' + maxScore;

            UI_.questionElems.nextButton.removeEventListener('click', UI_.showResult);

            UI_.clear();

            var resultScore = UI_.createElem('div', 'quiz__result-score');

            resultScore.textContent = result;

            var resultMessage = UI_.createElem('div', 'quiz__result-message');

            resultMessage.textContent = gameProcessing_.getMessage();

            var social = UI_.createElem('div', 'quiz__sharing');

            UI_.createSocial(social, result);

            var retry = UI_.createElem('div', 'quiz__retry-button');

            retry.textContent = 'Пройти еще раз';
            retry.addEventListener('click', init.bind(null, quizData, UI_.holder.id));

            UI_.append([resultScore, resultMessage, social, retry]);

            codex.sharer.init(
                {'buttonsSelector' : '.but.vk, .but.fb, .but.tw, .but.tg'}
            );

        },

        /**
         * Создаем кнопки социальных сетей и добавляем их в holder
         *
         * @param {Element} holder
         */
        createSocial: function (holder, result) {

            var networks = [
                {
                    title: 'Share on the VK',
                    shareType: 'vkontakte',
                    class: 'vk',
                    icon: 'icon-vkontakte'
                },
                {
                    title: 'Share on the Facebook',
                    shareType: 'facebook',
                    class: 'fb',
                    icon: 'icon-facebook-squared'
                },
                {
                    title: 'Tweet',
                    shareType: 'twitter',
                    class: 'tw',
                    icon: 'icon-twitter'
                },
                {
                    title: 'Forward in Telegramm',
                    shareType: 'telegram',
                    class: 'tg',
                    icon: 'icon-paper-plane'
                }
            ];

            networks.map(function (current) {

                var button = UI_.createElem('span', ['but', current.class]),
                    icon   = UI_.createElem('i', current.icon),
                    shareMessage = null;

                button.dataset.shareType = current.shareType;
                button.setAttribute('title', current.title);

                if (quizData.shareMessage) {

                    shareMessage =  quizData.shareMessage.replace('$score', result);

                }

                shareMessage = shareMessage || 'Я набрал ' + result + ' в ' + (quizData.title || 'тесте от команды CodeX');

                button.dataset.url      = window.location.href;
                button.dataset.title    = shareMessage;
                button.dataset.desc     = quizData.description || '';

                UI_.append(icon, button);
                UI_.append(button, holder);

            });

        },

        /**
         * Создаем i-й вариант ответа и выводим в UI_.questionElems.optionsHolder
         * И добавляем в UI_.questionElems.options
         *
         * @param {Object} answer - объект варианта ответа
         * @param {int} i - его номер в вопросе
         */
        createOption: function (answer, i) {

            var answerObj = UI_.createElem('div', 'quiz__question-answer');

            answerObj.dataset.score = answer.score;
            answerObj.dataset.index = i;
            answerObj.textContent = answer.text;

            // Вешаем слушатель на вариант ответа
            answerObj.addEventListener('click', gameProcessing_.getUserAnswer);

            UI_.questionElems.options.push(answerObj);

            UI_.append(answerObj, UI_.questionElems.optionsHolder);

        },

        /**
         * Создает новый DOM-элемент с набором переданных классов
         *
         * @param {string} tag - имя тега
         * @param {string|Array} classes - имя или массив имен классов
         * @returns {Element}
         */
        createElem: function (tag, classes) {

            var elem = document.createElement(tag);

            if (!classes) {

                return elem;

            }

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
         * @param {Element|null} parent - родитель или UI_.holder, если передан NULL
         */
        append: function (elems, parent) {

            parent = parent || UI_.holder;

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
        insertAfter: function (elem, elemBefore) {

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
        clear: function (parent) {

            parent = parent || UI_.holder;

            while (parent.firstChild) {

                parent.removeChild(parent.firstChild);

            }

        }

    };

    var gameProcessing_ = {

        prepare: function () {

            maxScore = 0;

            quizData.questions.map(function (question) {

                question.answers.map(function (answer) {

                    maxScore += parseFloat(answer.score);

                });

            });

        },

        /**
         * Добавляет баллы за ответ
         *
         * @param {Object} e - объект события клика по варианту ответа
         */
        getUserAnswer: function (e) {

            var answer = e.currentTarget;

            score += parseFloat(answer.dataset.score);

            UI_.answerSelected(answer);

        },

        /**
         * Получает сообщение о результате для набранного количества баллов
         *
         * @returns {string} message
         */
        getMessage: function () {

            var messages = quizData.resultMessages,
                message;

            messages.sort(function (a, b) {

                return a['score'] - b['score'];

            });

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
    };

})();
