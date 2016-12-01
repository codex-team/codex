(function(quiz) {

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

        block.divQuestion = quiz.generateElement('div', {'class': 'question'});

        block.spanNumber = quiz.generateElement('span', {
            'class': 'question__number',
            'textContent': 'Вопрос ' + number
        });

        block.inputHeading = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_heading',
            'class': 'question__heading',
            'placeholder': 'Заголовок вопроса',
            'required': ''
        });

        block.textareaBody = quiz.generateElement('textarea', {
            'name': 'question_' + number + '_body',
            'class': 'question__body',
            'placeholder': 'Тело вопроса'
        });

        block.inputCorrectAns_1 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '1',
            'id': 'question_' + number + '_correct_1',
            'class': 'question__correct',
            'hidden': '',
            'required': ''
        });

        block.inputCorrectAns_2 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '2',
            'id': 'question_' + number + '_correct_2',
            'class': 'question__correct',
            'hidden': '',
            'required': ''
        });

        block.inputCorrectAns_3 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '3',
            'id': 'question_' + number + '_correct_3',
            'class': 'question__correct',
            'hidden': '',
            'required': ''
        });

        block.labelCorrectAns_1 = quiz.generateElement('label', {
            'for': 'question_' + number + '_correct_1',
            'class': 'question__correct'
        });

        block.labelCorrectAns_2 = quiz.generateElement('label', {
            'for': 'question_' + number + '_correct_2',
            'class': 'question__correct'
        });

        block.labelCorrectAns_3 = quiz.generateElement('label', {
            'for': 'question_' + number + '_correct_3',
            'class': 'question__correct'
        });

        block.inputAns_1 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_ans_1',
            'class': 'question__answer',
            'placeholder': 'Ответ 1',
            'required': ''
        });

        block.inputAns_2 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_ans_2',
            'class': 'question__answer',
            'placeholder': 'Ответ 2',
            'required': ''
        });

        block.inputAns_3 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_ans_3',
            'class': 'question__answer',
            'placeholder': 'Ответ 3',
            'required': ''
        });

        if (number != 1) {
            block.aRemoveBlock = quiz.generateElement('a', {
                'class': 'question__remove-block',
                'textContent': 'Удалить'
            });
        }

        block.divQuestion.appendChild(block.spanNumber);
        block.divQuestion.appendChild(block.inputHeading);
        block.divQuestion.appendChild(block.textareaBody);
        block.divQuestion.appendChild(block.inputCorrectAns_1);
        block.divQuestion.appendChild(block.labelCorrectAns_1);
        block.divQuestion.appendChild(block.inputAns_1);
        block.divQuestion.appendChild(block.inputCorrectAns_2);
        block.divQuestion.appendChild(block.labelCorrectAns_2);
        block.divQuestion.appendChild(block.inputAns_2);
        block.divQuestion.appendChild(block.inputCorrectAns_3);
        block.divQuestion.appendChild(block.labelCorrectAns_3);
        block.divQuestion.appendChild(block.inputAns_3);

        if (number != 1) {
            block.divQuestion.appendChild(block.aRemoveBlock);
        }

        return block;
    };


    // Функция вставки блока в DOM и в список блоков.
    quiz.insertBlock = function(block) {
        quiz.quizForm.insertBefore(block.divQuestion, document.getElementById('insertBlock'));
        quiz.questions.push(block);
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
                quiz.questions[i].inputAns_1.name = 'question_' + (i + 1) + '_ans_1';
                quiz.questions[i].inputAns_2.name = 'question_' + (i + 1) + '_ans_2';
                quiz.questions[i].inputAns_3.name = 'question_' + (i + 1) + '_ans_3';
            }
        // Иначе просто удаляем блок из списка.
        } else {
            quiz.questions.splice(quiz.questions.indexOf(block), 1);
        }
    };


    document.getElementById('insertBlock').onclick = function() {
        quiz.insertBlock(quiz.getQuestionBlock(quiz.questions.length + 1))
    };

    quiz.quizForm.onclick = function(event) {
        if (event.target.className == 'question__remove-block') {
            for (var i = 0; i <= quiz.questions.length; i++) {
                if (quiz.questions[i].aRemoveBlock == event.target) {
                    quiz.removeBlock(quiz.questions[i]);
                    break;
                }
            }
        }
    };

    quiz.insertBlock(quiz.getQuestionBlock(1));

})({});
