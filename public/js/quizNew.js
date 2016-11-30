((quiz) => {

    // Форма создания теста.
    quiz.quizForm = document.forms.quizForm;

    // Список объектов блоков.
    quiz.questions = [];


    // Генератор блока (словаря со всеми входящими в блок элементами).
    quiz.generateElement = (tag, attributes) => {
        let element = document.createElement(tag);

        for (let attr in attributes) {
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


    quiz.getQuestionBlock = (number) => {
        let block = {};

        block.divBlock = quiz.generateElement('div', {'class': 'block'});

        block.h1Title = quiz.generateElement('h1', {
            'class': 'block__title',
            'textContent': 'Вопрос ' + number
        });

        block.inputQuestionHeading = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_heading',
            'class': 'block__question-heading',
            'placeholder': 'Заголовок вопроса',
            'required': ''
        });

        block.textareaQuestionBody = quiz.generateElement('textarea', {
            'name': 'question_' + number + '_body',
            'class': 'block__question-body',
            'placeholder': 'Тело вопроса'
        });

        block.inputCorrectAns_1 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '1',
            'hidden': '',
            'required': ''
        });

        block.inputCorrectAns_2 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '2',
            'hidden': '',
            'required': ''
        });

        block.inputCorrectAns_3 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '3',
            'hidden': '',
            'required': ''
        });

        block.inputAns_1 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'ans_1',
            'class': 'block__ans_1',
            'placeholder': 'Ответ 1',
            'required': ''
        });

        block.inputAns_2 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'ans_2',
            'class': 'block__ans_2',
            'placeholder': 'Ответ 2',
            'required': ''
        });

        block.inputAns_3 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'ans_3',
            'class': 'block__ans_3',
            'placeholder': 'Ответ 3',
            'required': ''
        });

        if (number != 1) {
            block.buttonRemoveBlock = quiz.generateElement('button', {
                'class': 'block__remove-block',
                'type': 'button',
                'textContent': 'Удалить вопрос'
            });
        }

        block.divBlock.appendChild(block.h1Title);
        block.divBlock.appendChild(block.inputQuestionHeading);
        block.divBlock.appendChild(block.textareaQuestionBody);
        block.divBlock.appendChild(block.inputCorrectAns_1);
        block.divBlock.appendChild(block.inputAns_1);
        block.divBlock.appendChild(block.inputCorrectAns_2);
        block.divBlock.appendChild(block.inputAns_2);
        block.divBlock.appendChild(block.inputCorrectAns_3);
        block.divBlock.appendChild(block.inputAns_3);

        if (number != 1) {
            block.divBlock.appendChild(block.buttonRemoveBlock);
        }

        return block;
    };


    // Функция вставки блока в DOM и в список блоков.
    quiz.insertBlock = (block) => {
        quiz.quizForm.insertBefore(block.divBlock, document.getElementById('insertBlock'));
        quiz.questions.push(block);
    };


    // Функция удаления блока из DOM и из списка блоков.
    quiz.removeBlock = (block) => {
        // Удаляем блок из DOM.
        quiz.quizForm.removeChild(block.divBlock);

        // Если блок не последний в списке:
        if (!(quiz.questions.indexOf(block) == quiz.questions.length - 1)) {
            let blockIndex = quiz.questions.indexOf(block);

            // Удаляем блок из списка.
            quiz.questions.splice(blockIndex, 1);

            // Каждому блоку в списке после удаленного сдвигаем номер на единицу.
            for (let i = blockIndex; i < quiz.questions.length; i++) {
                quiz.questions[i].h1Title.textContent = 'Вопрос ' + (i + 1);
            }
        // Иначе просто удаляем блок из списка.
        } else {
            quiz.questions.splice(quiz.questions.indexOf(block), 1);
        }
    };


    document.getElementById('insertBlock').onclick = () => {
        quiz.insertBlock(quiz.getQuestionBlock(quiz.questions.length + 1))
    };

    quiz.quizForm.onclick = (event) => {
        if (event.target.className == 'block__remove-block') {
            for (let i = 0; i <= quiz.questions.length; i++) {
                if (quiz.questions[i].buttonRemoveBlock == event.target) {
                    quiz.removeBlock(questions[i]);
                    break;
                }
            }
        }
    };

    quiz.insertBlock(quiz.getQuestionBlock(1));

})({});
