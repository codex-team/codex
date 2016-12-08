var quizForm = (function(quiz) {

    // Форма создания теста.
    quiz.quizForm = document.forms.quizForm;

    // Список объектов блоков.
    quiz.questions = [];


    // Генератор блока (словаря со всеми входящими в блок элементами).
    quiz.generateElement = function(tag, attributes) {
        var element = document.createElement(tag);

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


    quiz.getQuestionBlock = function(number) {
        var block = {};

        block.divQuestion = quiz.generateElement('div', {'class': 'quiz-form__question'});

        block.divRight = quiz.generateElement('div', {'class': 'quiz-form__question-right'});

        block.spanNumber = quiz.generateElement('span', {
            'class': 'quiz-form__question-number',
            'textContent': 'Вопрос ' + number
        });

        block.inputHeading = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_heading',
            'class': 'quiz-form__question-heading',
            'placeholder': 'Заголовок вопроса',
            'required': ''
        });

        block.inputBody = quiz.generateElement('textarea', {
            'name': 'question_' + number + '_body',
            'class': 'quiz-form__question-body',
            'placeholder': 'Тело вопроса'
        });

        for (var i = 1; i <= 3; i++) {
            block['divAns_' + i + 'Wrap'] = quiz.generateElement('div', {
                'class': 'quiz-form__question-answer-wrap'
            });

            block['inputCorrectAns_' + i] = quiz.generateElement('input', {
                'type': 'radio',
                'name': 'question_' + number + '_correct',
                'value': '3',
                'hidden': '',
                'required': ''
            });

            block['labelCorrectAns_' + i] = quiz.generateElement('label', {
                'class': 'quiz-form__question-radio'
            });

            block['inputAns_' + i] = quiz.generateElement('input', {
                'type': 'text',
                'name': 'question_' + number + '_ans_' + i,
                'class': 'quiz-form__question-answer',
                'placeholder': 'Ответ ' + i,
                'required': ''
            });
        }

        if (number != 1) {
            block.aRemoveBlock = quiz.generateElement('a', {
                'class': 'quiz-form__question-remove-block',
                'textContent': 'Удалить'
            });
        }

        block.divQuestion.appendChild(block.divRight);

        block.divQuestion.appendChild(block.inputHeading);
        block.divQuestion.appendChild(block.inputBody);

        block.divRight.appendChild(block.spanNumber);
        if (number != 1) {
            block.divRight.appendChild(block.aRemoveBlock);
        }

        block.labelCorrectAns_1.appendChild(block.inputCorrectAns_1);
        block.labelCorrectAns_2.appendChild(block.inputCorrectAns_2);
        block.labelCorrectAns_3.appendChild(block.inputCorrectAns_3);

        block.labelCorrectAns_1.addEventListener('click', selectCorrectAnswer_, false);

        block.divAns_1Wrap.appendChild(block.labelCorrectAns_1);
        block.divAns_1Wrap.appendChild(block.inputAns_1);

        block.divAns_2Wrap.appendChild(block.labelCorrectAns_2);
        block.divAns_2Wrap.appendChild(block.inputAns_2);

        block.divAns_3Wrap.appendChild(block.labelCorrectAns_3);
        block.divAns_3Wrap.appendChild(block.inputAns_3);

        block.divQuestion.appendChild(block.divAns_1Wrap);
        block.divQuestion.appendChild(block.divAns_2Wrap);
        block.divQuestion.appendChild(block.divAns_3Wrap);

        return block;
    };

    quiz.updateLength = function() {
        document.getElementsByName('questions_length')[0].value = quiz.questions.length;
    }

    /**
    * @private
    * Функция вставки блока в DOM и в список блоков.
    * @param {object} blockData - object with block data
    * @param {Element} blockData.divQuestion - question holder
    */
    var insertBlock_ = function(blockData) {
        quiz.quizForm.insertBefore(blockData.divQuestion, document.getElementById('insertQuestion'));
        quiz.questions.push(blockData);
        quiz.updateLength();
    };


    // Функция удаления блока из DOM и из списка блоков.
    quiz.removeBlock = function(block) {
        // Удаляем блок из DOM.
        quiz.quizForm.removeChild(block.divQuestion);

        // Если блок не последний в списке:
        if (!(quiz.questions.indexOf(block) == quiz.questions.length - 1)) {
            var blockIndex = quiz.questions.indexOf(block);

            // Удаляем блок из списка.
            quiz.questions.splice(blockIndex, 1);

            // Каждому блоку в списке после удаленного сдвигаем номер на единицу.
            for (var i = blockIndex; i < quiz.questions.length; i++) {
                quiz.questions[i].spanNumber.textContent = 'Вопрос ' + (i + 1);
                quiz.questions[i].inputHeading.name = 'question_' + (i + 1) + '_heading';
                quiz.questions[i].textareaBody.name = 'question_' + (i + 1) + '_body';
                quiz.questions[i].inputCorrectAns_1.name = 'question_' + (i + 1) + '_correct';
                quiz.questions[i].inputCorrectAns_2.name = 'question_' + (i + 1) + '_correct';
                quiz.questions[i].inputCorrectAns_3.name = 'question_' + (i + 1) + '_correct';
                quiz.questions[i].labelCorrectAns_1.setAttribute('for', 'question_' + (i + 1) + '_correct_1');
                quiz.questions[i].labelCorrectAns_2.setAttribute('for', 'question_' + (i + 1) + '_correct_2');
                quiz.questions[i].labelCorrectAns_3.setAttribute('for', 'question_' + (i + 1) + '_correct_3');
                quiz.questions[i].inputAns_1.name = 'question_' + (i + 1) + '_ans_1';
                quiz.questions[i].inputAns_2.name = 'question_' + (i + 1) + '_ans_2';
                quiz.questions[i].inputAns_3.name = 'question_' + (i + 1) + '_ans_3';
            }
        // Иначе просто удаляем блок из списка.
        } else {
            quiz.questions.splice(quiz.questions.indexOf(block), 1);
        }
        quiz.updateLength();
    };

    /**
    *
    */
    quiz.init = function() {

        writeLog_();

        document.getElementById('insertQuestion').onclick = function() {
            quiz.insertBlock_(quiz.getQuestionBlock(quiz.questions.length + 1))
        };

        quiz.quizForm.onclick = function(event) {
            if (event.target.className == 'quiz-form__question-remove-block') {
                for (var i = 0; i <= quiz.questions.length; i++) {
                    if (quiz.questions[i].aRemoveBlock == event.target) {
                        quiz.removeBlock(quiz.questions[i]);
                        break;
                    }
                }
            }
        };

        addInitialQuestion_();
    }

    var writeLog_ = function () {
        console.log(12345678);
    }



    var addInitialQuestion_ = function () {
        quiz.insertBlock_(quiz.getQuestionBlock(1));
    }




    quiz.init();

    return quiz;

})({});

quizForm.init();
