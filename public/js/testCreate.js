// Блок-якорь, относительно которого будут вставляться блоки.
let anchor = document.getElementById('anchor');

// Список объектов блоков.
let questions = [];

// Счетчик вопросов.
let counter = 1;

// Генератор блока (словаря со всеми входящими в блок элементами).
let getQuestionBlock = (number) => {
    let blockElements = {};

    blockElements.div__block = document.createElement('div');
    blockElements.div__block.className = 'block';

    if (number != 1) {
        blockElements.button__close = document.createElement('button');
        blockElements.button__close.className = 'close';
        blockElements.button__close.textContent = 'Удалить вопрос';
    }

    blockElements.h1__number = document.createElement('h1');
    blockElements.h1__number.textContent = 'Вопрос ' + number;

    blockElements.input__heading = document.createElement('input');
    blockElements.input__heading.type = 'text';
    blockElements.input__heading.placeholder = 'Заголовок вопроса';
    blockElements.input__heading.setAttribute('required', '');

    blockElements.textarea__body = document.createElement('textarea');
    blockElements.textarea__body.placeholder = 'Тело вопроса';

    blockElements.input__correct_ans_1 = document.createElement('input');
    blockElements.input__correct_ans_1.type = 'radio';
    blockElements.input__correct_ans_1.name = 'question_' + number + '_correct';
    blockElements.input__correct_ans_1.value = '1';
    blockElements.input__correct_ans_1.setAttribute('required', '');

    blockElements.input__correct_ans_2 = document.createElement('input');
    blockElements.input__correct_ans_2.type = 'radio';
    blockElements.input__correct_ans_2.name = 'question_' + number + '_correct';
    blockElements.input__correct_ans_2.value = '2';
    blockElements.input__correct_ans_2.setAttribute('required', '');

    blockElements.input__correct_ans_3 = document.createElement('input');
    blockElements.input__correct_ans_3.type = 'radio';
    blockElements.input__correct_ans_3.name = 'question_' + number + '_correct';
    blockElements.input__correct_ans_3.value = '3';
    blockElements.input__correct_ans_3.setAttribute('required', '');

    blockElements.input__ans_1 = document.createElement('input');
    blockElements.input__ans_1.type = 'text';
    blockElements.input__ans_1.name = 'ans_1';
    blockElements.input__ans_1.placeholder = 'Ответ 1';
    blockElements.input__ans_1.setAttribute('required', '');

    blockElements.input__ans_2 = document.createElement('input');
    blockElements.input__ans_2.type = 'text';
    blockElements.input__ans_2.name = 'ans_2';
    blockElements.input__ans_2.placeholder = 'Ответ 2';
    blockElements.input__ans_2.setAttribute('required', '');

    blockElements.input__ans_3 = document.createElement('input');
    blockElements.input__ans_3.type = 'text';
    blockElements.input__ans_3.name = 'ans_3';
    blockElements.input__ans_3.placeholder = 'Ответ 3';
    blockElements.input__ans_3.setAttribute('required', '');

    if (number != 1) {
        blockElements.div__block.appendChild(blockElements.button__close);
    }
    blockElements.div__block.appendChild(blockElements.h1__number);
    blockElements.div__block.appendChild(blockElements.input__heading);
    blockElements.div__block.appendChild(blockElements.textarea__body);
    blockElements.div__block.appendChild(blockElements.input__correct_ans_1);
    blockElements.div__block.appendChild(blockElements.input__ans_1);
    blockElements.div__block.appendChild(blockElements.input__correct_ans_2);
    blockElements.div__block.appendChild(blockElements.input__ans_2);
    blockElements.div__block.appendChild(blockElements.input__correct_ans_3);
    blockElements.div__block.appendChild(blockElements.input__ans_3);

    return blockElements;
};


// Функция вставки блока в DOM и в список блоков.
let insertBlock = (block) => {
    document.getElementById('testCreate').insertBefore(block.div__block, anchor);
    questions.push(block);
};

// Функция удаления блока из DOM и из списка блоков.
let removeBlock = (block) => {
    // Удаляем блок из DOM.
    anchor.parentNode.removeChild(block.div__block);

    // Если блок не последний в списке:
    if (!(questions.indexOf(block) == questions.length - 1)) {
        let blockIndex = questions.indexOf(block);

        // Удаляем блок из списка.
        questions.splice(blockIndex, 1);

        // Каждому блоку в списке после удаленного сдвигаем номер на единицу.
        for (let i = blockIndex; i < questions.length; i++) {
            questions[i].h1__number.textContent = 'Вопрос ' + (i + 1);
        }
    // Иначе просто удаляем блок из списка.
    } else {
        questions.splice(questions.indexOf(block), 1);
    }

    counter--;
};


((test) => {

    // Часть вставки/удаления блоков.
    {

        document.getElementById('insertBlock').onclick = () => {
            insertBlock(getQuestionBlock(counter++))
        };

        document.getElementById('testCreate').onclick = (event) => {
            let target = event.target;

            if (target.className == 'close') {
                for (let i = 0; i <= questions.length; i++) {
                    if (questions[i].button__close == target) {
                        removeBlock(questions[i]);
                        break;
                    }
                }
            }
        };

        insertBlock(getQuestionBlock(counter++));

    }

    // Часть взаимодействия с сервером.
    document.getElementById('submit').onclick = () => {

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/test/create', true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');

        jsonQuestions = [];

        questions.forEach((question) => {
            let correct;

            if (question.input__correct_ans_1.checked) {
                correct = question.input__correct_ans_1.value;
            } else if (question.input__correct_ans_2.checked) {
                correct = question.input__correct_ans_2.value;
            } else if (question.input__correct_ans_3.checked) {
                correct = question.input__correct_ans_3.value;
            }

            jsonQuestions.push({
                'number': questions.indexOf(question) + 1,
                'heading': question.input__heading.value,
                'body': question.textarea__body.value,
                'ans_1': question.input__ans_1.value,
                'ans_2': question.input__ans_2.value,
                'ans_3': question.input__ans_3.value,
                'correct': parseInt(correct)
            });
        });

        jsonTest = JSON.stringify({
            'name': document.querySelector('input[name="test.name"]').value,
            'description': document.querySelector('textarea[name="test.description"]').value,
            'questions': jsonQuestions
        });

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let testCreate = document.getElementById('testCreate');
                while (testCreate.firstChild) {
                    testCreate.removeChild(testCreate.firstChild);
                };
                if (JSON.parse(xhr.responseText).success) {
                    testCreate.insertAdjacentHTML('beforeend', '<h1 class="big_header">Тест успешно создан</h1>');
                } else if (JSON.parse(xhr.responseText).error) {
                    testCreate.insertAdjacentHTML('beforeend', '<h1 class="big_header">Произошла ошибка</h1>');
                }
            }
        }

        xhr.send(jsonTest);

    };

})({});
