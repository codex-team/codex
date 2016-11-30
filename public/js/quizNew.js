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

        block.divWrap = quiz.generateElement('div', {'class': 'wrap'});

        block.h1Number = quiz.generateElement('h1', {
            'textContent': 'Вопрос ' + number
        });

        block.inputHeading = quiz.generateElement('input', {
            'type': 'text',
            'name': 'question_' + number + '_heading',
            'placeholder': 'Заголовок вопроса',
            'required': ''
        });

        block.textareaBody = quiz.generateElement('textarea', {
            'name': 'question_' + number + '_body',
            'placeholder': 'Тело вопроса'
        });

        block.inputCorrectAns_1 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '1',
            'required': ''
        });

        block.inputCorrectAns_2 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '2',
            'required': ''
        });

        block.inputCorrectAns_3 = quiz.generateElement('input', {
            'type': 'radio',
            'name': 'question_' + number + '_correct',
            'value': '3',
            'required': ''
        });

        block.inputAns_1 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'ans_1',
            'placeholder': 'Ответ 1',
            'required': ''
        });

        block.inputAns_2 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'ans_2',
            'placeholder': 'Ответ 2',
            'required': ''
        });

        block.inputAns_3 = quiz.generateElement('input', {
            'type': 'text',
            'name': 'ans_3',
            'placeholder': 'Ответ 3',
            'required': ''
        });

        if (number != 1) {
            block.buttonClose = quiz.generateElement('button', {
                'class': 'removeBlock',
                'textContent': 'Удалить вопрос'
            });
        }

        block.divWrap.appendChild(block.h1Number);
        block.divWrap.appendChild(block.inputHeading);
        block.divWrap.appendChild(block.textareaBody);
        block.divWrap.appendChild(block.inputCorrectAns_1);
        block.divWrap.appendChild(block.inputAns_1);
        block.divWrap.appendChild(block.inputCorrectAns_2);
        block.divWrap.appendChild(block.inputAns_2);
        block.divWrap.appendChild(block.inputCorrectAns_3);
        block.divWrap.appendChild(block.inputAns_3);

        if (number != 1) {
            block.divWrap.appendChild(block.buttonClose);
        }

        return block;
    };


    // Функция вставки блока в DOM и в список блоков.
    quiz.insertBlock = (block) => {
        quiz.quizForm.insertBefore(block.divWrap, document.getElementById('nextBlock'));
        quiz.questions.push(block);
    };


    // Функция удаления блока из DOM и из списка блоков.
    quiz.removeBlock = (block) => {
        // Удаляем блок из DOM.
        quiz.quizForm.removeChild(block.divWrap);

        // Если блок не последний в списке:
        if (!(quiz.questions.indexOf(block) == quiz.questions.length - 1)) {
            let blockIndex = quiz.questions.indexOf(block);

            // Удаляем блок из списка.
            quiz.questions.splice(blockIndex, 1);

            // Каждому блоку в списке после удаленного сдвигаем номер на единицу.
            for (let i = blockIndex; i < quiz.questions.length; i++) {
                quiz.questions[i].h1Number.textContent = 'Вопрос ' + (i + 1);
            }
        // Иначе просто удаляем блок из списка.
        } else {
            quiz.questions.splice(quiz.questions.indexOf(block), 1);
        }
    };

    // Часть вставки/удаления блоков.
    document.getElementById('nextBlock').onclick = () => {
        quiz.insertBlock(quiz.getQuestionBlock(quiz.questions.length + 1))
    };

    quiz.quizForm.onclick = (event) => {
        if (event.target.className == 'close') {
            for (let i = 0; i <= quiz.questions.length; i++) {
                if (quiz.questions[i].buttonClose == event.target) {
                    quiz.removeBlock(questions[i]);
                    break;
                }
            }
        }
    };

    quiz.insertBlock(quiz.getQuestionBlock(1));


    // Часть взаимодействия с сервером.
    quiz.quizForm.onsubmit = (event) => {
        event.preventDefault();

        let xhr = new XMLHttpRequest();
        xhr.open('get', '/quiz/save', true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        let data = new FormData(quiz.quizForm);
        data.set('questions_length', quiz.questions.length);


        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                while (quiz.quizForm.firstChild) {
                    quiz.quizForm.removeChild(quiz.quizForm.firstChild);
                };
                let jsonResponse = JSON.parse(xhr.responseText);
                if (jsonResponse.id) {
                    console.log(jsonResponse.message);
                    quiz.quizForm.insertAdjacentHTML('beforeend',
                        `<h1 class="article__title">${jsonResponse.ru}</h1>
                        <h6 class="article__sub">id загруженного теста: ${jsonResponse.id}</h6>`
                    );
                } else {
                    console.log(jsonResponse.message);
                    quiz.quizForm.insertAdjacentHTML('beforeend',
                        `<h1 class="article__title">${jsonResponse.ru}</h1>`
                    );
                }
            }
        }

        xhr.send(data);

    };

})({});
