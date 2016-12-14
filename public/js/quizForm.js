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
    * @var {object} quiz.nodes - dict of DOM elements of questions and messages
    */
    quiz.nodes = {
        'csrfToken': null,
        'quizId': null,
        'title': null,
        'description': null,
        'questions': [],
        'messages': []
    };


    /**
    * Question insert button and anchor for new questions at the same time
    * @var {Element} quiz.questionInsertButton - DOM element of question insert button
    */
    quiz.questionInsertButton = document.getElementById('questionInsertButton');


    /**
    * Message insert button and anchor for new messages at the same time
    * @var {Element} quiz.messageInsertButton - DOM element of message insert button
    */
    quiz.messageInsertButton = document.getElementById('messageInsertButton');


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
            element[attr] = attributes[attr];
        }

        return element;
    }


    /**
    * @private
    * Message block creating function
    * Creates a message JS object with DOM elements in it and appends it to the messages list
    */
    var appendMessageBlock_ = function() {
        var messageIndex = quiz.nodes.messages.length;

        var holder = newDOMElement_('div', {'class': 'quiz-form__message-holder'});

        holder.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '0.1',
            'class': 'quiz-form__message-score',
            'required': ''
        });

        holder.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__message-message',
            'placeholder': 'Сообщение',
            'required': ''
        });

        if (!messageIndex) {
            holder.destroyButton = newDOMElement_('a', {
                'class': 'quiz-form__message-destroy-button'
            }, 'Удалить');
        }

        holder.appendChild(holder.score);
        holder.appendChild(holder.message);

        if (!messageIndex) {
            holder.appendChild(holder.destroyButton);
        }

        quiz.nodes.messages.push(holder);
    };


    /**
    * @private
    * Answer block creating function
    * Creates a couple of DOM elements and appends them to question answers list
    * @param {number} questionIndex - index of question which answer to be appended to
    */
    var appendAnswerBlock_ = function(questionIndex) {
    var question = quiz.nodes.questions[questionIndex];
    var answerIndex = question.answers.length;

        var holder = newDOMElement_('div', {
            'class': 'quiz-form__question-answer-holder'
        });

        holder.text = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-text',
            'placeholder': 'Ответ ' + (answerIndex + 1),
            'required': ''
        });

        if (!answerIndex) {
            holder.destroyButton = newDOMElement_('a', {
                'class': 'quiz-form__question-answer-destroy-button'
            }, 'Удалить');
        }

        holder.score = newDOMElement_('input', {
            'type': 'number',
            'min': '0',
            'step': '0.1',
            'class': 'quiz-form__question-answer-score',
            'required': ''
        });

        holder.message = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-message',
            'placeholder': 'Сообщение',
            'required': ''
        });

        holder.appendChild(holder.text);

        if (!answerIndex) {
            holder.appendChild(holder.destroyButton);
        }

        holder.appendChild(holder.score);
        holder.appendChild(holder.message);

        question.answers.push(holder);
    }


    /**
    * @private
    * Question block creating function
    * Creates a question JS object with DOM elements in it and appends it to the questions list
    */
    var appendQuestionBlock_ = function(fromJson) {
        var questionIndex = quiz.nodes.questions.length;

        var holder = newDOMElement_('div', {
            'class': 'quiz-form__question-holder'
        });

        var number = newDOMElement_('span', {
            'class': 'quiz-form__question-number'
        }, 'Вопрос ' + (questionIndex + 1));

        if (questionNumber != 1) {
            var destroyButton = newDOMElement_('a', {
                'class': 'quiz-form__question-destroy-button'
            }, 'Удалить');
        }

        var title = newDOMElement_('input', {
            'type': 'text',
            'class': 'quiz-form__question-title',
            'placeholder': 'Текст вопроса',
            'required': ''
        });

        var addAnswerButton = newDOMElement_('a', {
            'class': 'quiz-form__question-add-answer-button'
        }, 'Добавить ответ');

        holder.answers = [];

        holder.appendChild(title);
        holder.appendChild(addAnswerButton);
        holder.appendChild(number);

        if (!questionIndex) {
            holder.appendChild(destroyButton);
        }

        quiz.nodes.questions.push(holder);

        appendAnswerBlock_(questionIndex);
    };


    /**
    * @private
    * Element shifting function
    * Sets numbers in the element with child elements to given index
    * @param {object} element - block in which numbers to be set
    * @param {number} index - index to which child elements' attributes to be set
    */
    var setBlockNumber_ = function(element, numberTo) {
        if (element.answers) {
            element.number.textContent = 'Вопрос ' + numberTo;
        } else if (element.text) {
            element.text.placeholder = 'Ответ ' + numberTo;
        }
    }


    /**
    * @private
    * DOM element inserting function
    * Inserts DOM element to DOM
    * @param {object} element - DOM element to be inserted
    */
    var insertDOMElement_ = function(element) {
        var before, parent;
        if (element.answers) {
            before = quiz.questionInsertButton;
            parent = quiz.form;
        } else if (dataBlock.question) {
            before = element.parentNode.addAnswerButton;
            parent = element.parentNode.holder;
        } else {
            before = quiz.messageInsertButton;
            parent = quiz.form;
        }

        parent.insertBefore(element, before);
    }


    /**
    * @private
    * DOM element destroying function
    * Removes the DOM element from DOM and destroys it
    * @param {object} element - DOM element to be destroyed
    */
    var destroyDOMElement_ = function(element) {
        var container;

        if (element.answers) {
            container = quiz.nodes.questions;
        } else if (element.text) {
            container = element.parentNode.answers;
        } else {
            container = quiz.nodes.messages;
        }

        element.parentNode.removeChild(element);

        var elementIndex = container.indexOf(element);

        container.splice(elementIndex, 1);
        for (var i = elementIndex; i < container.length; i++) {
            setBlockNumber_(container[i], i);
        }
    }


    var setInitialFormParams_ = function() {
        quiz.nodes.csrfToken = quiz.form.querySelector('[name="csrf_token"]').value;
        quiz.nodes.quizId = quiz.form.querySelector('[name="quiz_id"]').value;
        quiz.nodes.title = quiz.form.querySelector('[name="title"]').value;
        quiz.nodes.description = quiz.form.querySelector('[name="description"]').value;
    }


    /**
    * @private
    * Event listeners setting function
    * Set event listeners for insert and destroy buttons and form submission
    */
    var setEventListeners_ = function() {
        quiz.form.onsubmit = function(event) {
            event.preventDefault();

            setInitialFormParams_();

            var json = {
                'csrfToken': quiz.nodes.csrfToken,
                'quizId': quiz.nodes.quizId,
                'title': quiz.nodes.quizTitleInput,
                'description': quiz.nodes.description,
                'questions': [],
                'messages': []
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

            for (var message in quiz.nodes.messages) {
                var jsonMessage = {};

                jsonMessage.score = message.score.value;
                jsonMessage.message = message.message.value;

                json.messages.push(jsonMessage);
            };

            quiz.form.appendChild(newDOMElement_('input', {
                'type': 'hidden',
                'name': 'json',
                'value': JSON.stringify(json)
            }));

            quiz.form.submit();
        }


        quiz.insertQuestion.onclick = function() {
            insertDataBlock_(appendQuestionBlock_())
        };


        quiz.insertMessage.onclick = function() {
            insertDataBlock_(appendMessageBlock_());
        }


        quiz.form.onclick = function(event) {
            if (event.target.className == 'quiz-form__question-destroy' ||
                event.target.className == 'quiz-form__question-answer-destroy' ||
                event.target.className == 'quiz-form__message-destroy') {
                destroyDataBlock_(event.target.dataBlock);
            } else if (event.target.className == 'quiz-form__question-add-answer') {
                insertDataBlock_(appendAnswerBlock_(quiz.questions.indexOf(event.target.dataBlock)));
            };
        };
    }


    /**
    * @private
    * First message adding function
    * Inserts message with number 1 to the form
    */
    var addInitialMessage_ = function() {
        insertDataBlock_(appendMessageBlock_());
    }


    /**
    * @private
    * First question adding function
    * Inserts question with number 1 to the form
    */
    var addInitialQuestion_ = function() {
        insertDataBlock_(appendQuestionBlock_());
    }


    /**
    * @public
    * Initialization function
    * Initializes quiz form: inserts initial data blocks, sets initial event listeners, etc
    */
    quiz.init = function() {
        setEventListeners_();
        addInitialMessage_();
        addInitialQuestion_();
    }


    return quiz;

})({});

quizForm.init();
