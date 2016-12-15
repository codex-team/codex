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
        'resultMessages': []
    };


    /**
    * Question insert button and anchor for new questions at the same time
    * @var {Element} quiz.questionInsertButton - DOM element of question insert button
    */
    quiz.questionInsertButton = null;


    /**
    * Result message insert button and anchor for new resultMessages at the same time
    * @var {Element} quiz.resultMessageInsertButton - DOM element of result message insert button
    */
    quiz.resultMessageInsertButton = null;


    /**
    * @private
    * DOM element creating function
    * Creates a DOM element with given attributes
    * @param {string} tag - HTML tag of the element
    * @param {object} attributes - dictionary with attributes to be added to the element
    */
    var newDOMElement_ = function(tag, attributes, text = '') {
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
    * Message block creating function
    * Creates a result message DOM element and appends it to the result messages list
    */
    var appendResultMessageBlock_ = function() {
        var message = {},
            messageIndex = quiz.nodes.resultMessages.length;

        message.holder = newDOMElement_('div', {
            'class': 'quiz-form__message-holder',
            'data-message-index': messageIndex
        });

        message.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '0.1',
            'class': 'quiz-form__message-score',
            'required': ''
        });

        message.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__message-message',
            'placeholder': 'Сообщение',
            'required': ''
        });

        if (!messageIndex) {
            message.destroyButton = newDOMElement_('span', {
                'class': 'quiz-form__message-destroy-button'
            }, 'Удалить');
        }

        message.holder.appendChild(message.score);
        message.holder.appendChild(message.message);

        if (!messageIndex) {
            message.holder.appendChild(message.destroyButton);
        }

        quiz.nodes.resultMessages.push(message);

        insertDOMElement_(message);
    };


    /**
    * @private
    * Answer block creating function
    * Creates a couple of DOM elements and appends them to question answers list
    * @param {number} questionIndex - index of question which answer to be appended to
    */
    var appendAnswerBlock_ = function(questionIndex) {
        var answer = {},
            question = quiz.nodes.questions[questionIndex],
            answerIndex = question.answers.length;

        console.log('Appending answer block of question ' + questionIndex + ' with index ' + answerIndex);

        answer.holder = newDOMElement_('div', {
            'class': 'quiz-form__question-answer-holder',
            'data-question-index': questionIndex,
            'data-answer-index': answerIndex
        });

        console.log(answer.holder);

        answer.text = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-text',
            'placeholder': 'Ответ ' + (answerIndex + 1),
            'required': ''
        });

        console.log(answer.text);

        if (!answerIndex) {
            answer.destroyButton = newDOMElement_('span', {
                'class': 'quiz-form__question-answer-destroy-button'
            }, 'Удалить');

            console.log(answer.destroyButton);
        }

        answer.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '0.1',
            'class': 'quiz-form__question-answer-score',
            'required': ''
        });

        console.log(answer.score);

        answer.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-message',
            'placeholder': 'Сообщение',
            'required': ''
        });

        console.log(answer.message);

        answer.holder.appendChild(answer.text);

        if (!answerIndex) {
            answer.holder.appendChild(answer.destroyButton);
        }

        answer.holder.appendChild(answer.score);
        answer.holder.appendChild(answer.message);

        question.answers.push(answer);

        insertDOMElement_(answer);
    }


    /**
    * @private
    * Question element creating function
    * Creates a question JS object with DOM elements in it and appends it to the questions list
    */
    var appendQuestionBlock_ = function(fromJson) {
        var question = {},
            questionIndex = quiz.nodes.questions.length;

        console.log('Appending question block with index ' + questionIndex);

        question.holder = newDOMElement_('div', {
            'class': 'quiz-form__question-holder',
            'data-question-index': questionIndex
        });

        console.log(question.holder);

        question.number = newDOMElement_('span', {
            'class': 'quiz-form__question-number'
        }, 'Вопрос ' + (questionIndex + 1));

        console.log(question.number);

        if (!questionIndex) {
            question.destroyButton = newDOMElement_('span', {
                'class': 'quiz-form__question-destroy-button'
            }, 'Удалить');

            console.log(question.destroyButton);
        }

        question.title = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-title',
            'placeholder': 'Текст вопроса',
            'required': ''
        });

        console.log(question.title);

        question.addAnswerButton = newDOMElement_('a', {
            'class': 'quiz-form__question-add-answer-button'
        }, 'Добавить ответ');

        console.log(question.addAnswerButton);

        question.answers = [];

        question.holder.appendChild(question.title);
        question.holder.appendChild(question.addAnswerButton);
        question.holder.appendChild(question.number);

        if (!questionIndex) {
            question.holder.appendChild(question.destroyButton);
        }

        quiz.nodes.questions.push(question);
        console.log(quiz.nodes.questions);

        appendAnswerBlock_(questionIndex);

        insertDOMElement_(question);
    };


    /**
    * @private
    * Object shifting function
    * Sets numbers in the object with child elements to given index
    * @param {object} obj - object in which numbers to be set
    * @param {number} index - index to which child elements' attributes to be set
    */
    var setObjectNumber_ = function(obj, numberTo) {
        if (obj.answers) {
            obj.number.textContent = 'Вопрос ' + numberTo;
        } else if (obj.text) {
            obj.text.placeholder = 'Ответ ' + numberTo;
        }
    }


    /**
    * @private
    * DOM element inserting function
    * Inserts DOM element to DOM
    * @param {object} obj - object in which DOM element to be inserted
    */
    var insertDOMElement_ = function(obj) {
        var before,
            parent;

        if (obj.answers) {
            before = quiz.questionInsertButton;
            parent = quiz.form;
        } else if (obj.text) {
            before = quiz.nodes.questions[obj.holder.dataset.questionIndex].addAnswerButton;
            parent = quiz.nodes.questions[obj.holder.dataset.questionIndex].holder;
        } else {
            before = quiz.resultMessageInsertButton;
            parent = quiz.form;
        }

        console.log(parent);
        console.log(obj.holder);
        console.log(before);
        parent.insertBefore(obj.holder, before);
    }


    /**
    * @private
    * Element object destroying function
    * Removes the DOM element of object from DOM and destroys object itself
    * @param {object} obj - object to be destroyed
    */
    var destroyObject_ = function(obj) {
        var container,
            elementIndex;

        if (obj.answers) {
            container = quiz.nodes.questions;
            elementIndex = obj.holder.dataset.questionIndex;
        } else if (obj.text) {
            container = quiz.nodes.questions[obj.holder.dataset.questionIndex].answers;
            elementIndex = obj.holder.dataset.answerIndex;
        } else {
            container = quiz.nodes.resultMessages;
            elementIndex = obj.holder.dataset.messageIndex;
        }

        obj.holder.parentNode.removeChild(obj.holder);

        container.splice(elementIndex, 1);
        for (var i = elementIndex; i < container.length; i++) {
            setObjectNumber_(container[i], i + 1);
        }
    }


    /**
    * @private
    * Event listeners setting function
    * Set event listeners for insert and destroy buttons and form submission
    */
    var setEventListeners_ = function() {
        console.log('Setting event listeners');
        quiz.form.onsubmit = function(event) {
            console.log('Setting form submission listener');
            event.preventDefault();

            var json = {
                'title': quiz.form.getElementsByName('title')[0].value,
                'description': quiz.form.getElementsByName('description')[0].value,
                'questions': [],
                'resultMessages': []
            };

            for (var question in quiz.nodes.questions) {
                var jsonQuestion = {};

                jsonQuestion.title = question.title.value;
                jsonQuestion.answers = [];

                for (var answer in question.answers) {
                    var jsonAnswer = {};

                    jsonAnswer.text = answer.text.value;
                    jsonAnswer.score = answer.score.value;
                    jsonAnswer.message = answer.message.value;

                    jsonQuestion.answers.push(jsonAnswer);
                }

                json.questions.push(jsonQuestion);
            }

            for (var message in quiz.nodes.resultMessages) {
                var jsonMessage = {};

                jsonMessage.score = message.score.value;
                jsonMessage.message = message.message.value;

                json.resultMessages.push(jsonMessage);
            };

            for (input in quiz.form.querySelectorAll('input:not([type="hidden"])')) {
                quiz.form.removeChild(input);
            }
            quiz.form.removeChild(quiz.form.getElementsByTagName('textarea')[0]);

            quiz.form.appendChild(newDOMElement_('input', {
                'type': 'hidden',
                'name': 'json',
                'value': JSON.stringify(json)
            }));

            quiz.form.submit();
        }


        quiz.questionInsertButton.onclick = function() {
            console.log('Setting question insert button click listener');
            appendQuestionBlock_();
        }


        quiz.messageInsertButton.onclick = function() {
            console.log('Setting result message insert button click listener');
            appendResultMessageBlock_();
        }


        quiz.form.onclick = function(event) {
            switch (event.target.className) {
                case 'quiz-form__question-destroy-button':
                    object = quiz.nodes.questions[event.target.parentNode.dataset.questionIndex];
                    break;

                case 'quiz-form__question-answer-destroy-button':
                    object = quiz.nodes.questions[
                        event.target.parentNode.dataset.questionIndex
                    ].answers[
                        event.target.parentNode.dataset.answerIndex
                    ];
                    break;

                case 'quiz-form__message-destroy-button':
                    object = quiz.nodes.messages[event.target.parentNode.messageIndex];
                    break;

                case 'quiz-form__question-add-answer-button':
                    appendAnswerBlock_(event.target.parentNode.dataset.questionIndex);
                    break;
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
        quiz.questionInsertButton = document.getElementById('questionInsertButton');
        quiz.resultMessageInsertButton = document.getElementById('resultMessageInsertButton');
    }


    /**
    * @public
    * Initialization function
    * Initializes quiz form: inserts initial DOM elements, sets initial event listeners, etc
    */
    quiz.init = function() {
        setInitialFormParams_();
        addInitialResultMessage_();
        addInitialQuestion_();
        setEventListeners_();
    }


    return quiz;

})({});

quizForm.init();
