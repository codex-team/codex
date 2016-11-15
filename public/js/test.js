function getElem(id) {
    return document.getElementById(id);
}

function createElem(tag, className, id) {

    var elem = document.createElement(tag);

    if (className) {
        elem.classList.add(className);
    }

    if (id) {
        elem.setAttribute('id', id);
    }

    return elem;
}

/**
 * Класс Test содержит поля, соответствующие полям таблицы в БД,
 * а так же поле для хранение вопросов с ответами в виде объекта,
 * поля которого соответствуют полям таблиц в БД.
 *
 * Поле window является классом Test_Window и отвечает за вывод
 * информации на страницу.
 */
class Test {

    constructor(test) {

        this.id                 = test.id;
        this.title              = test.title;
        this.description        = test.description;
        this.shortDescription   = test.short_description;
        this.questions          = test.questions;
        this.numberOfQuestions  = test.questions.length;
        this.window             = new Test_Window();
        this.userAnswers        = [];
        this.currentQuestion    = -1;

        this.window.passButton.addEventListener('click', this.startTest.bind(this));
        this.window.answerButton.addEventListener('click', this.goToNextQuestion.bind(this));

    }

    startTest() {
        this.currentQuestion = -1;
        this.window.startTest();
        this.goToNextQuestion();

    }

    goToNextQuestion() {

        this.currentQuestion++;

        /**
         * Если текущий вопрос не последний
         */
        if (this.currentQuestion < this.numberOfQuestions) {

            this.window.showQuestion(this);
            this.bind(this.questions[this.currentQuestion].answers.length);

            return;
        }

        /**
         * Если текущий вопрос последний
         */
        this.window.barFront.style.width = '100%';

        /**
         * Ставим Timeout, чтобы прогрессбар дошел до конца.
         * И устанавливаем кнопке "Ответить" disabled, чтобы избежать
         * отправки повторного запроса результата.
         */
        this.window.answerButton.setAttribute('disabled', true);
        setTimeout(this.getResult.bind(this), 700);

    }


    /**
     * Создаем ajax запрос.
     * Тело запроса - массив вида <id опроса> => <id выбранного ответа>
     */
    getResult() {

        var post = '';

        for (var i = 0; i < Object.keys(this.userAnswers).length; i++) {

            post += this.questions[i].id + '=' + this.userAnswers[this.questions[i].id] + '&';

        }

        var data =  {
                        url: '/test/'+this.id+'/showResult',
                        type: 'POST',
                        'content-type': 'application/x-www-form-urlencoded',
                        success: window.test.processResult,
                        data: post
                    };

        codex.core.ajax(data);

        /**
         * Показываем гифку загрузки, пока ждем ответа
         */
        this.window.showLoading();

    }

    /**
     * Обрабатываем результат запроса.
     *
     * В результате запроса получаем массив:
     * points       - количеество набранных очков
     * message      - сообщение, выводимое вместе с результатом
     * rightAnswers - массив <id вопроса> => <id верного варианта ответа>
     */
    processResult(response) {

        var result;

        result = JSON.parse(response);

        result['points'] = result['points'] + ' из ' + window.test.numberOfQuestions;

        window.test.share(result);

        window.test.window.showResult(result, window.test);

    }


    bind(n) {

        var radio;

        for (var i = 0; i < n; i++) {
            radio = this.window.options.children[i].firstChild;
            radio.addEventListener('change', this.getUserAnswer.bind(this));

        }

    }


    getUserAnswer() {

        var radio,
            question = this.questions[this.currentQuestion];

        this.window.answerButton.removeAttribute('disabled');

        for (var i = 0; i < question.answers.length; i++) {

            radio = this.window.options.children[i].firstChild;

            if (radio.checked) {
                this.userAnswers[question.id] = question.answers[i]['id'];
            }

        }

    }

    share(result) {

        window.shareData = {

            url: window.location.protocol + '//' + window.location.hostname + '/test/' + this.id,
            title: this.title+'. Я набрал '+result['points'],
            decs: this.shortDescription,
            img: 'https://ifmo.su/public/img/meta_img.png'

        };

        codex.sharer.init();
    }

}

/**
 * Класс Test_Window содержит методы, отвечающие за вывод информации на страницу
 *
 * Некоторые поля:
 * main     - основное окно
 * header   - блок вывода загооловка и опсиания вопроса
 * barFront
 * barBack  - отвечаюют за реализацияю прогресс-бара
 * options  - блок для вывода вариантов ответа
 *
 */
class Test_Window {

    constructor() {

        this.main            = getElem('test_main');
        this.header          = getElem('question_header');
        this.title           = getElem('title');
        this.description     = getElem('description');
        this.barFront        = getElem('bar_front');
        this.barBack         = getElem('bar_back');
        this.options         = getElem('options');
        this.answerButton    = getElem('answer_button');
        this.backButton      = getElem('back_button');
        this.passButton      = getElem('pass_button');
        this.share           = getElem('share');

    }

    /**
     * Прячем ненужное, показываем нужное
     */
    startTest() {

        var remove =   [this.options,
                        this.barFront,
                        this.barBack,
                        this.answerButton],

            add =      [this.backButton,
                        this.passButton,
                        this.share],

            i;

        for (i = 0; i < remove.length; i++) {
            remove[i].classList.remove('invisible');
        }

        for (i = 0; i < add.length; i++) {
            add[i].classList.add('invisible');
        }

    }

    showQuestion(test) {

        this.clear(this.options);

        this.title.textContent = test.questions[test.currentQuestion].title;
        this.description.textContent = test.questions[test.currentQuestion].description;

        this.answerButton.disabled = true;

        this.showOptions(test.questions[test.currentQuestion]);

        this.barFront.style.width = test.currentQuestion / test.numberOfQuestions * 100 + '%';

    }


    /**
     * Метод для вывода вопроса после прохождения теста,
     * с указанием верного и выбранного пользователем ответов.
     */
    showRightAnswer(test, result, i) {

        this.clear(this.options);

        this.share.classList.add('invisible');
        this.backButton.classList.add('invisible');
        this.passButton.classList.add('invisible');

        this.title.textContent = test.questions[i].title;
        this.description.textContent = test.questions[i].description;
        this.answerButton.disabled = true;

        this.showOptions(test.questions[i], result['rightAnswers'], test.userAnswers);

        this.showNavButtons(test, result, i);
    }

    /**
     * Выводим варианты ответа.
     *
     * При наличии аргументов rightAnswers и userAnswers
     * выводим варианты с указанием правильного ответа
     * и ответа пользователя
     */
    showOptions(question, rightAnswers, userAnswers) {
        var i,
            p,
            radio,
            label;

        for (i = 0; i < question.answers.length; i++) {

            p = createElem('p', 'question_option');
            radio = createElem('input', 'test_radio', i+1);
            radio.setAttribute('type', 'radio');
            p.appendChild(radio);

            label = createElem('label');
            label.setAttribute('for', i+1);
            label.textContent = question.answers[i]['answer'];
            p.appendChild(label);

            if (userAnswers && rightAnswers) {

                radio.setAttribute('disabled', true);

                if (question.answers[i]['id'] == userAnswers[question.id]) {
                    label.classList.add('selected_radio');
                    radio.setAttribute('checked', true);
                }

                if (question.answers[i]['id'] == rightAnswers[question.id]) {
                    label.classList.add('right_radio');
                    radio.setAttribute('checked', true);
                }

            } else {

                radio.setAttribute('value', i);
                radio.setAttribute('name', 'radio');

            }

            this.options.appendChild(p);

        }
    }

    /**
     * Выводим кнопки назад, вперед и "К результатам"
     * при выводе вопроса после прохождения теста
     *
     * @param test      - объект, содержащий данные о тесте
     * @param result    - объект, содержащий результат прохождения теста
     * @param i         - номер текущего вопроса
     *
     * test и result напрямую в функции не используются,
     * и нужны лишь для того, чтобы передать в функцию,
     * отображающую следующий/предыдущий вопрос
     */
    showNavButtons(test, result, i) {
        var prev,
            toResults,
            next;

        /**
         * Кнопка назад (предыдущий вопрос)
         * Создается, если вопрос не первый
         */
        if (i > 0){

            prev = createElem('input', 'test_button');

            prev.setAttribute('type', 'button');
            prev.setAttribute('value', '<');

            prev.classList.add('left_button');

            prev.addEventListener('click', this.showRightAnswer.bind(this, test, result, i - 1));

            this.main.insertBefore(prev, this.backButton.parentNode);
        }

        /**
         * К результатам
         */
        toResults = createElem('input', 'test_button');

        toResults.setAttribute('type', 'button');
        toResults.setAttribute('value', 'К результатам');

        toResults.classList.add('attention');
        toResults.classList.add('center_button');

        toResults.addEventListener('click', this.showResult.bind(this, result, test));

        this.main.insertBefore(toResults, this.share);

        /**
         * Кнопка вперед (к следующему вопросу).
         * Создается, если вопрос не последний
         */
        if (i < test.numberOfQuestions - 1) {

            next = createElem('input', 'test_button');

            next.setAttribute('type', 'button');
            next.setAttribute('value', '>');

            next.classList.add('right_button');

            next.addEventListener('click', this.showRightAnswer.bind(this, test, result, i + 1));

            this.main.insertBefore(next, this.share);
        }

        prev ? prev.addEventListener('click', this.deleteNavButtons.bind(null, prev, toResults, next)):null;
        toResults.addEventListener('click', this.deleteNavButtons.bind(null, prev, toResults, next));
        next ? next.addEventListener('click', this.deleteNavButtons.bind(null, prev, toResults, next)):null;
    }

    /**
     * Удаляем кнопки назад, вперед, к результатам при переходе к следующему вопросу
     */
    deleteNavButtons(prev, toResults, next) {

        prev ? prev.remove():null;

        toResults ? toResults.remove():null;

        next ? next.remove():null;

    }

    /**
     * Показвыем гифку с загрузкой, пока ждем ответ от сервера
     */
    showLoading() {

        this.clear(this.options);

        this.header.classList.add('invisible');
        this.answerButton.classList.add('invisible');

        var loading = createElem('div', 'loading');
        this.main.appendChild(loading);

    }

    showResult(result, test) {

        this.createResultOptions(result, test);

        this.share.classList.remove('invisible');
        this.header.classList.remove('invisible');

        this.title.textContent = test.title;
        this.description.textContent = test.shortDescription;



        this.backButton.classList.remove('invisible');
        this.passButton.classList.remove('invisible');

        this.passButton.setAttribute('value', 'Ёще раз');

        if (this.main.querySelector('.loading'))
            this.main.querySelector('.loading').remove();

    }

    createResultOptions(result, test) {
        var i, p, div,
            resultDiv,
            question;

        this.clear(this.options);

        for (i = 0; i < test.questions.length; i++) {

            question = test.questions[i];
            div = createElem('div', 'result_options');

            p = createElem('div', 'result_option_title');
            p.textContent = question.title;

            div.appendChild(p);

            p = createElem('div', 'result_option_description');
            p.textContent = question.description;

            div.appendChild(p);

            div.classList.add(
                result['rightAnswers'][question.id] == test.userAnswers[question.id]?'result_option_right':'result_option_wrong');

            div.addEventListener('click', this.showRightAnswer.bind(this, test, result, i) );
            div.addEventListener('click', this.deleteResultDiv.bind(null, resultDiv));

            this.options.appendChild(div);
        }

        resultDiv = createElem('div', 'result_div');
            p = createElem('p', 'result_message');
            p.textContent = result['message'] || 'Результат';
        resultDiv.appendChild(p);

            p = createElem('p', 'result_points');
            p.textContent = result['points'];
        resultDiv.appendChild(p);

        this.main.insertBefore(resultDiv, this.passButton);

        this.passButton.addEventListener('click', this.deleteResultDiv.bind(null, resultDiv));
    }

    deleteResultDiv(resultDiv) {
        resultDiv ? resultDiv.remove() : document.querySelector('.result_div').remove();
    }

    clear(elem) {

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

    }

}