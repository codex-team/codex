/**
* Quiz form client handler
* Author: @ndawn
* Date: 09/12/16
*/

var quizForm = (function(quiz) {

    /**
    * Quiz form
    * @var {Element} quiz.form - form DOM element
    */
    quiz.form = document.forms.quizForm;


    /**
    * Questions list
    * @var {object} quiz.questions - list of objects with question data
    */
    quiz.questions = [];


    /**
    * Messages list
    * @var {object} quiz.messages - list of objects with messages data
    */
    quiz.messages = [];


    /**
    * Question insert button and anchor for new questions at the same time
    * @var {Element} quiz.insertQuestion - question insert button DOM element
    */
    quiz.insertQuestion = document.getElementById('insertQuestion');


    /**
    * Message insert button and anchor for new messages at the same time
    * @var {Element} quiz.insertMessage - message insert button DOM element
    */
    quiz.insertMessage = document.getElementById('insertMessage');


    /**
    * @private
    * DOM element creating function
    * Creates a DOM element with given attributes
    * @param {object} dataBlock - data block which contains the element
    * @param {string} tag - HTML tag of the element
    * @param {object} attributes - dictionary with attributes to be added to the element
    */
    var newDOMElement_ = function(dataBlock, tag, attributes) {
        var element = document.createElement(tag);

        element.dataBlock = dataBlock;

        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                if (attr != 'textContent') {
                    element.setAttribute(attr, attributes[attr]);
                } else {
                    element.textContent = attributes[attr];
                }
            }
        };

        return element;
    }


    /**
    * @private
    * Message data block creating function
    * Creates a message JS object with DOM elements in it and appends it to the messages list
    */
    var appendMessageBlock_ = function() {
        var message = {};
        var messageNumber = quiz.messages.length + 1;

        message.holder = newDOMElement_(message, 'div', {'class': 'quiz-form__message-holder'});

        message.score = newDOMElement_(message, 'input', {
            'type': 'number',
            'min': '0',
            'step': '0.1',
            'class': 'quiz-form__message-score',
            'required': ''
        });

        message.message = newDOMElement_(message, 'input', {
            'type': 'text',
            'class': 'quiz-form__message-message',
            'placeholder': 'Сообщение',
            'required': ''
        });

        if (messageNumber != 1) {
            message.destroy = newDOMElement_(message, 'a', {
                'class': 'quiz-form__message-destroy',
                'textContent': 'Удалить'
            });
        }

        message.holder.appendChild(message.score);
        message.holder.appendChild(message.message);
        if (messageNumber != 1) {
            message.holder.appendChild(message.destroy);
        }

        quiz.messages.push(message);

        return message;
    };


    /**
    * @private
    * Answer data block creating function
    * Creates a JS object with DOM elements in it and appends it to question data block
    * @param {number} questionNumber - number of question which answer to be appended to
    */
    var appendAnswerBlock_ = function(questionNumber) {
        var answer = {};

        answer.question = quiz.questions[questionNumber - 1];

        var answerNumber = answer.question.answers.length + 1;

        answer.holder = newDOMElement_(answer, 'div', {
            'class': 'quiz-form__question-answer-holder'
        });

        answer.text = newDOMElement_(answer, 'input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-text',
            'placeholder': 'Ответ ' + answerNumber,
            'required': ''
        });

        if (answerNumber != 1) {
            answer.destroy = newDOMElement_(answer, 'a', {
                'class': 'quiz-form__question-answer-destroy',
                'textContent': 'Удалить'
            });
        }

        answer.score = newDOMElement_(answer, 'input', {
            'type': 'number',
            'min': '0',
            'step': '0.1',
            'class': 'quiz-form__question-answer-score',
            'required': ''
        });

        answer.message = newDOMElement_(answer, 'input', {
            'type': 'text',
            'class': 'quiz-form__question-answer-message',
            'placeholder': 'Сообщение',
            'required': ''
        });

        answer.holder.appendChild(answer.text);
        if (answerNumber != 1) {
            answer.holder.appendChild(answer.destroy);
        }
        answer.holder.appendChild(answer.score);
        answer.holder.appendChild(answer.message);

        answer.question.answers.push(answer);

        return answer;
    }


    /**
    * @private
    * Question data block creating function
    * Creates a question JS object with DOM elements in it and appends it to the questions list
    */
    var appendQuestionBlock_ = function(fromJson) {
        var question = {};
        var questionNumber = quiz.questions.length + 1;

        question.holder = newDOMElement_(question, 'div', {'class': 'quiz-form__question-holder'});

        question.number = newDOMElement_(question, 'span', {
            'class': 'quiz-form__question-number',
            'textContent': 'Вопрос ' + questionNumber
        });

        if (questionNumber != 1) {
            question.destroy = newDOMElement_(question, 'a', {
                'class': 'quiz-form__question-destroy',
                'textContent': 'Удалить'
            });
        }

        question.title = newDOMElement_(question, 'input', {
            'type': 'text',
            'class': 'quiz-form__question-title',
            'placeholder': 'Текст вопроса',
            'required': ''
        });

        question.addAnswer = newDOMElement_(question, 'a', {
            'class': 'quiz-form__question-add-answer',
            'textContent': 'Добавить ответ'
        });

        question.answers = [];

        question.holder.appendChild(question.number);
        if (questionNumber != 1) {
            question.holder.appendChild(question.destroy);
        }
        question.holder.appendChild(question.title);
        question.holder.appendChild(question.addAnswer);

        quiz.questions.push(question);

        appendAnswerBlock_(questionNumber);

        return question;
    };


    /**
    * @private
    * Data block shifting function
    * Sets numbers in form params names in the data block to given number
    * @param {object} dataBlock - data block in which numbers to be set
    * @param {number} number - number to which params names to be set
    */
    var setDataBlockNumber_ = function(dataBlock, numberTo) {
        if (dataBlock.answers) {
            var numberFrom = dataBlock.number.textContent.slice(
                dataBlock.number.textContent.lastIndexOf(' ')
            );

            dataBlock.number.textContent = 'Вопрос ' + numberTo;
        } else if (dataBlock.question) {
            var questionNumber = dataBlock.question.number.textContent.slice(
                dataBlock.question.number.textContent.lastIndexOf(' ')
            );
            dataBlock.text.placeholder = 'Ответ ' + numberTo;
        }
    }


    /**
    * @private
    * Data block inserting function
    * Inserts data block DOM element to DOM
    * @param {object} dataBlock - data block object to be inserted
    */
    var insertDataBlock_ = function(dataBlock) {
        if (dataBlock.answers) {
            var before = quiz.insertQuestion;
            var parent = quiz.form;
        } else if (dataBlock.question) {
            var before = dataBlock.question.addAnswer;
            var parent = dataBlock.question.holder;
        } else {
            var before = quiz.insertMessage;
            var parent = quiz.form;
        }

        parent.insertBefore(dataBlock.holder, before);
    }


    /**
    * @private
    * Data block destroying function
    * Removes the data block DOM element from DOM and destroys the data block itself
    * @param {object} dataBlock - data block object to be destroyed
    */
    var destroyDataBlock_ = function(dataBlock) {
        if (dataBlock.answers) {
            var container = quiz.questions;
            var parent = quiz.form;
        } else if (dataBlock.question) {
            var container = dataBlock.question.answers;
            var parent = dataBloc.question.holder;
        } else {
            var container = quiz.messages;
            var parent = quiz.form;
        }

        parent.removeChild(dataBlock.holder);

        var dataBlockIndex = container.indexOf(dataBlock);
        container.splice(dataBlockIndex, 1);
        for (var i = dataBlockIndex; i <= container.length; i++) {
            setDataBlockNumber_(container[i - 1], i - 1);
        }
    }


    /**
    * @private
    * Event listeners setting function
    * Set event listeners for insert and destroy buttons and form submission
    */
    var setEventListeners_ = function() {
        quiz.form.onsubmit = function(event) {
            event.preventDefault();

            var json = {"questions": [], "messages": []};

            for (var question in quiz.questions) {
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

            for (var message in quiz.messages) {
                var jsonMessage = {};

                jsonMessage.score = message.score.value;
                jsonMessage.message = message.message.value;

                json.messages.push(jsonMessage);
            };

            while (quiz.form.lastChild) {
                if (quiz.form.lastChild.name == 'title' ||
                    quiz.form.lastChild.name == 'description') {
                        break;
                    }
                quiz.form.removeChild(quiz.form.lastChild);
            };

            quiz.form.appendChild(newDOMElement_(null, 'input', {
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
