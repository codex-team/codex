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
    var appendResultMessageBlock_ = function(messageData) {
        var message = {};
        var objectIndex = quiz.nodes.resultMessages.length;
        messageData = messageData || {};

        console.log('Appending result message block with index ' + objectIndex);

        message.holder = newDOMElement_('div', {
            'class': 'quiz-form__message-holder',
            'data-object-index': objectIndex
        });

        message.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '1',
            'value': messageData.score || '0',
            'class': 'quiz-form__message-score',
            'required': ''
        });

        message.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__message-message',
            'placeholder': 'Сообщение',
            'value': messageData.message || '',
            'required': ''
        });

        if (objectIndex) {
            message.destroyButton = newDOMElement_('span', {
                'class': 'quiz-form__message-destroy-button'
            }, 'Удалить');
        }

        message.holder.appendChild(message.score);
        message.holder.appendChild(message.message);

        if (objectIndex) {
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
    var appendAnswerBlock_ = function(questionIndex, answerData) {
        var answer = {};
        var question = quiz.nodes.questions[questionIndex];
        answerData = answerData || {};

        var objectIndex = question.answers.length;

        console.log('Appending answer block of question ' + questionIndex + ' with index ' + objectIndex);

        answer.holder = newDOMElement_('div', {
            'class': 'quiz-form__question-answer-holder',
            'data-question-index': questionIndex,
            'data-object-index': objectIndex
        });

        answer.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '1',
            'value': answerData.score || '0',
            'class': 'quiz-form__question-answer-score',
            'required': ''
        });

        answer.text = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-text',
            'placeholder': 'Ответ ' + (objectIndex + 1),
            'value': answerData.text || '',
            'required': ''
        });

        if (objectIndex) {
            answer.destroyButton = newDOMElement_('span', {
                'class': 'quiz-form__question-answer-destroy-button'
            }, 'Удалить');

        }

        answer.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-message',
            'placeholder': 'Сообщение',
            'value': answerData.message || '',
            'required': ''
        });

        answer.holder.appendChild(answer.score);
        answer.holder.appendChild(answer.text);

        if (objectIndex) {
            answer.holder.appendChild(answer.destroyButton);
        }

        answer.holder.appendChild(answer.message);

        question.answers.push(answer);


        insertDOMElement_(answer);
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

        question.number = newDOMElement_('span', {
            'class': 'quiz-form__question-number'
        }, 'Вопрос ' + (objectIndex + 1));

        if (objectIndex) {
            question.destroyButton = newDOMElement_('span', {
                'class': 'quiz-form__question-destroy-button'
            }, 'Удалить');
        }

        question.title = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-title',
            'placeholder': 'Текст вопроса',
            'value': questionData.title || '',
            'required': ''
        });

        question.addAnswerButton = newDOMElement_('span', {
            'class': 'quiz-form__question-add-answer-button'
        }, 'Добавить ответ');

        question.answers = [];

        question.holder.appendChild(question.number);

        if (objectIndex) {
            question.holder.appendChild(question.destroyButton);
        }

        question.holder.appendChild(question.title);
        question.holder.appendChild(question.addAnswerButton);

        quiz.nodes.questions.push(question);

        if (questionData.answers) {
            questionData.answers.map(function(current, i) {
                appendAnswerBlock_(objectIndex, current);
            })
        } else {
            appendAnswerBlock_(objectIndex);
        }

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
        console.log('Shifting ',
                    obj,
                    ' from index ',
                    parseInt(obj.holder.dataset.objectIndex),
                    ' to index',
                    numberTo - 1);

        obj.holder.dataset.objectIndex = numberTo - 1;

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
        var before;
        var parent;

        if (obj.answers) {
            before = quiz.questionInsertButton;
            parent = quiz.form;
        } else if (obj.text) {
            before = quiz.nodes.questions[parseInt(obj.holder.dataset.questionIndex)].addAnswerButton;
            parent = quiz.nodes.questions[parseInt(obj.holder.dataset.questionIndex)].holder;
        } else {
            before = quiz.resultMessageInsertButton;
            parent = quiz.form;
        }

        parent.insertBefore(obj.holder, before);
    }


    /**
    * @private
    * Element object destroying function
    * Removes the DOM element of object from DOM and destroys object itself
    * @param {object} container - list where object to be destroyed
    * @param {number} elementIndex - index of object in list
    */
    var destroyObject_ = function(container, elementIndex) {
        container[elementIndex].holder.parentNode.removeChild(container[elementIndex].holder);

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

            for (question of quiz.nodes.questions) {
                var jsonQuestion = {};

                jsonQuestion.title = question.title.value;
                jsonQuestion.answers = [];

                for (answer of question.answers) {
                    var jsonAnswer = {};

                    jsonAnswer.text = answer.text.value;
                    jsonAnswer.score = answer.score.value;
                    jsonAnswer.message = answer.message.value;

                    jsonQuestion.answers.push(jsonAnswer);
                }

                json.questions.push(jsonQuestion);
            }

            for (message of quiz.nodes.resultMessages) {
                var jsonMessage = {};

                jsonMessage.score = message.score.value;
                jsonMessage.message = message.message.value;

                json.resultMessages.push(jsonMessage);
            };

            document.querySelectorAll('.quiz-form > *:not(.protected)').forEach(function(input, i, arr) {
                quiz.form.removeChild(input);
            });

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
            var container;
            var elementIndex = parseInt(event.target.parentNode.dataset.objectIndex);

            switch (event.target.className) {
                case 'quiz-form__question-destroy-button':
                    container = quiz.nodes.questions;
                    break;

                case 'quiz-form__question-answer-destroy-button':
                    container = quiz.nodes.questions[
                        parseInt(event.target.parentNode.dataset.questionIndex)
                    ].answers;
                    break;

                case 'quiz-form__message-destroy-button':
                    container = quiz.nodes.resultMessages;
                    break;

                case 'quiz-form__question-add-answer-button':
                    container = null;
                    break;
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
        quiz.questionInsertButton = document.getElementById('questionInsertButton');
        quiz.resultMessageInsertButton = document.getElementById('resultMessageInsertButton');
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
        addInitialResultMessage_();
        addInitialQuestion_();
        setEventListeners_();
    }

    return quiz;

})({});

