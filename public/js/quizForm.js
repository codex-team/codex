/**
* Quiz form client handler
* Author: @ndawn
* Date: 09/12/16
*/

var quizForm = (function(quiz) {

    /**
    * Quiz form
    * @var {null} quiz.form - form DOM element
    */
    quiz.form = null;


    /**
    * Nodes list
    * @var {object} quiz.nodes - dict of DOM elements of questions and result messages
    */
    quiz.nodes = {
        'title': null,
        'description': null,
        'questions': [],
        'resultMessages': [],
        'shareMessage': null
    };


    /**
    * Question insert button and anchor for new questions
    * @var {Element} quiz.questionInsertAnchor - DOM element of question insert anchor
    * @var {Element} quiz.questionInsertButton - DOM element of question insert button
    */
    quiz.questionInsertAnchor = null;
    quiz.questionInsertButton = null;


    /**
    * Result message insert button and anchor for new resultMessages
    * @var {Element} quiz.resultMessageInsertAnchor - DOM element of result message insert anchor
    * @var {Element} quiz.resultMessageInsertButton - DOM element of result message insert button
    */
    quiz.resultMessageInsertAnchor = null;
    quiz.resultMessageInsertButton = null;


    /**
    * Result messages holder element
    * @var {Element} quiz.resultMessagesHolder - DOM element of result messages holder
    */
    quiz.resultMessagesHolder = null;


    /**
    * @private
    * DOM element creating function
    * Creates a DOM element with given attributes
    * @param {string} tag - HTML tag of the element
    * @param {object} attributes - dictionary with attributes to be added to the element
    */
    var newDOMElement_ = function(tag, attributes, text) {
        text = text || '';
        var element = document.createElement(tag);
        var textNode = document.createTextNode(text);

        element.appendChild(textNode);

        for (var attr in attributes) {
            var attrNode = document.createAttribute(attr);
            attrNode.value = attributes[attr];
            element.setAttributeNode(attrNode);
        }

        return element;
    }


    /**
    * @private
    * Answer block creating function
    * Creates a couple of DOM elements and appends them to question answers list
    * @param {number} questionIndex - index of question which answer to be appended to
    */
    var appendAnswerBlock_ = function(questionIndex, answerData) {
        var answer = {};
        var question = quiz.nodes.questions[questionIndex];
        answerData = answerData || {};

        console.log(question);
        console.log(quiz.nodes.questions);
        console.log(questionIndex);
        var objectIndex = question.answers.length;

        console.log('Appending answer block of question ' + questionIndex + ' with index ' + objectIndex);

        answer.holder = newDOMElement_('tr', {
            'class': 'quiz-form__question-answer-holder',
            'data-question-index': questionIndex,
            'data-object-index': objectIndex
        });

        answer.textColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-text-column'
        });

        answer.text = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-text',
            'placeholder': 'Введите ответ',
            'value': answerData.text || '',
            'required': '',
            'form': 'null'
        });

        answer.scoreColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-score-column'
        });

        answer.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '1',
            'value': answerData.score || '0',
            'class': 'quiz-form__question-answer-score',
            'required': '',
            'form': 'null'
        });

        answer.messageColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-message-column'
        });

        answer.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-message',
            'placeholder': 'Введите комментарий к ответу',
            'value': answerData.message || '',
            'required': '',
            'form': 'null'
        });

        answer.destroyButtonColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-answer-destroy-button-column'
        });

        answer.destroyButton = newDOMElement_('button', {
            'class': 'quiz-form__question-answer-destroy-button',
            'type': 'button'
        }, '×');

        answer.textColumn.appendChild(answer.text);
        answer.scoreColumn.appendChild(answer.score);
        answer.messageColumn.appendChild(answer.message);
        answer.destroyButtonColumn.appendChild(answer.destroyButton);

        answer.holder.appendChild(answer.textColumn);
        answer.holder.appendChild(answer.scoreColumn);
        answer.holder.appendChild(answer.messageColumn);
        answer.holder.appendChild(answer.destroyButtonColumn);

        question.answers.push(answer);

        insertDOMElement_(answer);

        updateDestroyIcons_(question.answers);
    }


    /**
    * @private
    * Question element creating function
    * Creates a question JS object with DOM elements in it and appends it to the questions list
    */
    var appendQuestionBlock_ = function(questionData) {
        var question = {};
        var objectIndex = quiz.nodes.questions.length;
        questionData = questionData || {};

        console.log('Appending question block with index ' + objectIndex);

        question.holder = newDOMElement_('div', {
            'class': 'quiz-form__question-holder',
            'data-object-index': objectIndex
        });

        question.number = newDOMElement_('label', {
            'class': 'quiz-form__question-number'
        }, 'Вопрос ' + (objectIndex + 1));

        question.titleLabel = newDOMElement_('label', {
            'class': 'quiz-form__label quiz-form__question-title-label'
        }, 'Заголовок вопроса');

        question.title = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-title',
            'placeholder': 'Введите заголовок вопроса',
            'value': questionData.title || '',
            'required': '',
            'form': 'null'
        });

        question.answers = [];

        question.answersHolder = newDOMElement_('table', {
            'class': 'quiz-form__question-answers-holder'
        });

        question.answersHead = newDOMElement_('thead', {
            'class': 'quiz-form__question-answers-head'
        });

        question.answersLabel = newDOMElement_('th', {
            'class': 'quiz-form__label quiz-form__question-answers-label'
        }, 'Ответы');

        question.scoresLabel = newDOMElement_('th', {
            'class': 'quiz-form__label quiz-form__question-scores-label'
        }, 'Баллы');

        question.messagesLabel = newDOMElement_('th', {
            'class': 'quiz-form__label quiz-form__question-messages-label'
        }, 'Комментарии к ответам');

        question.destroyButtonLabel = newDOMElement_('th', {
            'class': 'quiz-form__question-destroy-buttons-label'
        });

        question.addAnswerButtonRow = newDOMElement_('tr', {
            'class': 'quiz-form__question-add-answer-button-row'
        });

        question.addAnswerButtonColumn = newDOMElement_('td', {
            'class': 'quiz-form__question-add-answer-button-column'
        });

        question.addAnswerButton = newDOMElement_('button', {
            'class': 'quiz-form__question-add-answer-button button',
            'type': 'button'
        }, 'Добавить ответ');

        question.destroyButton = newDOMElement_('button', {
            'class': 'quiz-form__question-destroy-button button',
            'type': 'button'
        }, 'Удалить вопрос');

        question.holder.appendChild(question.number);
        question.holder.appendChild(question.titleLabel);
        question.holder.appendChild(question.title);

        question.answersHead.appendChild(question.answersLabel);
        question.answersHead.appendChild(question.scoresLabel);
        question.answersHead.appendChild(question.messagesLabel);
        question.answersHead.appendChild(question.destroyButtonLabel);

        question.answersHolder.appendChild(question.answersHead);

        question.addAnswerButtonColumn.appendChild(question.addAnswerButton);

        question.addAnswerButtonRow.appendChild(question.addAnswerButtonColumn);

        question.answersHolder.appendChild(question.addAnswerButtonRow);

        question.holder.appendChild(question.answersHolder);
        question.holder.appendChild(question.destroyButton);

        quiz.nodes.questions.push(question);

        if (questionData.answers) {
            questionData.answers.map(function(current, i) {
                appendAnswerBlock_(objectIndex, current);
            })
        } else {
            appendAnswerBlock_(objectIndex);
        }

        insertDOMElement_(question);

        updateDestroyIcons_(quiz.nodes.questions);
    };


    /**
    * @private
    * Message block creating function
    * Creates a result message DOM element and appends it to the result messages list
    */
    var appendResultMessageBlock_ = function(messageData) {
        var message = {};
        var objectIndex = quiz.nodes.resultMessages.length;
        messageData = messageData || {};

        console.log('Appending result message block with index ' + objectIndex);

        message.holder = newDOMElement_('tr', {
            'class': 'quiz-form__message-holder',
            'data-object-index': objectIndex
        });

        message.messageColumn = newDOMElement_('td', {
            'class': 'quiz-form__message-message-column'
        });

        message.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__message-message',
            'placeholder': 'Введите сообщение',
            'value': messageData.message || '',
            'required': '',
            'form': 'null'
        });

        message.scoreColumn = newDOMElement_('td', {
            'class': 'quiz-form__message-score-column'
        });

        message.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '1',
            'value': messageData.score || '0',
            'class': 'quiz-form__message-score',
            'required': '',
            'form': 'null'
        });

        message.destroyButtonColumn = newDOMElement_('td', {
            'class': 'quiz-form__message-destroy-button-column'
        });

        message.destroyButton = newDOMElement_('button', {
            'class': 'quiz-form__message-destroy-button',
            'type': 'button'
        }, '×');

        message.messageColumn.appendChild(message.message);
        message.scoreColumn.appendChild(message.score);
        message.destroyButtonColumn.appendChild(message.destroyButton);

        message.holder.appendChild(message.messageColumn);
        message.holder.appendChild(message.scoreColumn);
        message.holder.appendChild(message.destroyButtonColumn);

        quiz.nodes.resultMessages.push(message);

        insertDOMElement_(message);

        updateDestroyIcons_(quiz.nodes.resultMessages);
    };


    /**
    * @private
    * Object shifting function
    * Sets numbers in the question with child elements to given index
    * @param {object} obj - object in which numbers to be set
    * @param {number} index - index to which child elements' attributes to be set
    */
    var setObjectNumber_ = function(obj, numberTo) {
        console.log(obj, numberTo);
        console.log('Shifting number of', obj, 'to', numberTo);
        obj.holder.dataset.objectIndex = numberTo - 1;

        if (obj.number) {
            obj.number.textContent = 'Вопрос ' + numberTo;
        }
    }


    /**
    * @private
    * Updating destroy icons function
    * Disables or enables destroy icon for the only element in container
    * @param {object} container - object in which icon is to be disabled or enabled
    */
    var updateDestroyIcons_ = function(container) {
        if (container.length == 1) {
            console.log('Disabling button of the first element of ', container);
            container[0].destroyButton.setAttribute('disabled', '');
        } else {
            console.log('Enabling button of the first element of ', container);
            container[0].destroyButton.removeAttribute('disabled');
        }
    }


    /**
    * @private
    * DOM element inserting function
    * Inserts DOM element to DOM
    * @param {object} obj - object in which DOM element to be inserted
    */
    var insertDOMElement_ = function(obj) {
        var before;
        var parent;

        if (obj.answers) {
            before = quiz.questionInsertAnchor;
            parent = quiz.form;
        } else if (obj.text) {
            before = quiz.nodes.questions[parseInt(obj.holder.dataset.questionIndex)].addAnswerButtonRow;
            parent = quiz.nodes.questions[parseInt(obj.holder.dataset.questionIndex)].answersHolder;
        } else {
            before = quiz.resultMessageInsertAnchor;
            parent = quiz.resultMessagesHolder;
        }

        parent.insertBefore(obj.holder, before);
    }


    /**
    * @private
    * Element object destroying function
    * Removes the DOM element of object from DOM and destroys object itself
    * @param {object} container - list where object is to be destroyed
    * @param {number} elementIndex - index of object in list
    */
    var destroyObject_ = function(container, elementIndex) {
        console.log(elementIndex);
        console.log('Destroying a child of', container, 'with index', elementIndex);

        container[elementIndex].holder.parentNode.removeChild(container[elementIndex].holder);

        container.splice(elementIndex, 1);
        for (var i = elementIndex; i < container.length; i++) {
            setObjectNumber_(container[i], i + 1);
        }

        updateDestroyIcons_(container);
    }


    /**
    * @private
    * Event listeners setting function
    * Set event listeners for insert and destroy buttons and form submission
    */
    var setEventListeners_ = function() {
        console.log('Setting event listeners');
        console.log('Setting form submission listener');

        quiz.form.onsubmit = function(event) {
            event.preventDefault();

            var json = {
                'title': quiz.form.querySelector('[name="title"]').value,
                'description': quiz.form.querySelector('[name="description"]').value,
                'questions': [],
                'resultMessages': [],
                'shareMessage': quiz.form.querySelector('[name="shareMessage"]').value
            };

            for (var i in quiz.nodes.questions) {
                var jsonQuestion = {};

                jsonQuestion.title = quiz.nodes.questions[i].title.value;
                jsonQuestion.answers = [];

                for (var j in quiz.nodes.questions[i].answers) {
                    var jsonAnswer = {};

                    jsonAnswer.text = quiz.nodes.questions[i].answers[j].text.value;
                    jsonAnswer.score = quiz.nodes.questions[i].answers[j].score.value;
                    jsonAnswer.message = quiz.nodes.questions[i].answers[j].message.value;

                    jsonQuestion.answers.push(jsonAnswer);
                }

                json.questions.push(jsonQuestion);
            }

            for (var i in quiz.nodes.resultMessages) {
                var jsonMessage = {};

                jsonMessage.score = quiz.nodes.resultMessages[i].score.value;
                jsonMessage.message = quiz.nodes.resultMessages[i].message.value;

                json.resultMessages.push(jsonMessage);
            };

            quiz.form.appendChild(newDOMElement_('input', {
                'type': 'hidden',
                'name': 'quiz_data',
                'value': JSON.stringify(json)
            }));

            quiz.form.submit();
        }

        console.log('Setting question insert button click listener');

        quiz.questionInsertButton.onclick = function() {
            appendQuestionBlock_();
        }

        console.log('Setting result message insert button click listener');

        quiz.resultMessageInsertButton.onclick = function() {
            appendResultMessageBlock_();
        }


        quiz.form.onclick = function(event) {
            console.log(event.target);
            var container;
            var elementIndex;

            if (event.target.classList.contains('quiz-form__question-destroy-button')) {
                container = quiz.nodes.questions;
                elementIndex = parseInt(event.target.parentNode.dataset.objectIndex);
            } else if (event.target.classList.contains('quiz-form__question-answer-destroy-button')) {
                container = quiz.nodes.questions[
                    parseInt(event.target.parentNode.parentNode.dataset.questionIndex)
                ].answers;
                elementIndex = parseInt(event.target.parentNode.parentNode.dataset.objectIndex);
            } else if (event.target.classList.contains('quiz-form__message-destroy-button')) {
                container = quiz.nodes.resultMessages;
                elementIndex = parseInt(event.target.parentNode.parentNode.dataset.objectIndex);
            } else if (event.target.classList.contains('quiz-form__question-add-answer-button')) {
                container = null;
                elementIndex = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.dataset.objectIndex);
            }

            if (container === null) {
                appendAnswerBlock_(elementIndex);
            } else if (container !== undefined) {
                destroyObject_(container, elementIndex);
            }
        }
    }


    /**
    * @private
    * First result message adding function
    * Inserts result message with number 1 to the form
    */
    var addInitialResultMessage_ = function() {
        console.log('Adding initial result message element');
        appendResultMessageBlock_();
    }


    /**
    * @private
    * First question adding function
    * Inserts question with number 1 to the form
    */
    var addInitialQuestion_ = function() {
        console.log('Adding initial question element');
        appendQuestionBlock_();
    }


    /**
    * @private
    * Initial form parameters setting adding function
    * Sets form variable and insert buttons
    */
    var setInitialFormParams_ = function() {
        quiz.form = document.forms.quizForm;
        quiz.questionInsertAnchor = document.getElementById('questionInsertAnchor');
        quiz.questionInsertButton = document.getElementById('questionInsertButton');
        quiz.resultMessageInsertAnchor = document.getElementById('resultMessageInsertAnchor');
        quiz.resultMessageInsertButton = document.getElementById('resultMessageInsertButton');
        quiz.resultMessagesHolder = document.getElementById('resultMessagesHolder');
    }


    /**
    * @private
    * Initial destroy icons updating function
    * Updates initially placed destroy icons
    */
    var updateInitialDestroyIcons_ = function() {
        updateDestroyIcons_(quiz.nodes.questions);
        updateDestroyIcons_(quiz.nodes.resultMessages);
        updateDestroyIcons_(quiz.nodes.questions[0].answers);
    }


    var render = function(quizData) {
        var questions = quizData.questions,
            resultMessages = quizData.resultMessages;

        document.querySelector('[name="title"]').value = quizData.title;
        document.querySelector('textarea[name="description"]').textContent = quizData.description;
        document.querySelector('[name="shareMessage"]').value = quizData.shareMessage;

        console.log(quizData);

        setInitialFormParams_();

        resultMessages.map(function(current, i) {
            appendResultMessageBlock_(current);
        });

        questions.map(function(current, i) {
            appendQuestionBlock_(current);
        });

        setEventListeners_();

        updateInitialDestroyIcons_();

    }


    /**
     * @public
     * Initialization function
     * Initializes quiz form: inserts initial DOM elements, sets initial event listeners, etc
     */
    quiz.init = function(quizData) {

        if (quizData) {
            render(quizData);
            return;
        }

        setInitialFormParams_();
        addInitialQuestion_();
        addInitialResultMessage_();
        setEventListeners_();
        updateInitialDestroyIcons_();
    }

    return quiz;

})({});
