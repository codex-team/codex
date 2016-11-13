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
        this.short_description  = test.short_description;
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
            this.setChangeEventOnAnswersOptions(this.questions[this.currentQuestion].answers.length);

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


    getResult() {

        var data='',
            xhr,
            i;

        for (i = 0; i < Object.keys(this.userAnswers).length; i++) {

            data += this.questions[i].id + '=' + this.userAnswers[this.questions[i].id] + '&';

        }

        this.window.showLoading();

        xhr  = new XMLHttpRequest();

        xhr.open('post', ['/test/'+this.id+'/showResult'], true);

        xhr.onreadystatechange = this.processResult.bind(this, xhr);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-REQUESTED-WITH', 'xmlhttprequest');

        xhr.send(data);

    }

    /**
     * Обрабатываем результат запроса.
     *
     * В результате запроса получаем массив:
     * [0] - количеество набранных очков
     * [1] - массив <id вопроса> => true|false
     *       true если пользователь верно отвветил на вопрос, false в обратном случае
     * [2] - сообщение, выводимое вместе с результатом
     * [3] - массив <id вопроса> => <id верного варианта ответа>
     */
    processResult(xhr) {

        var result;

        if (xhr.readyState == 4)
        {
            result = JSON.parse(xhr.responseText);

            result[0] = result[0]+' из '+this.numberOfQuestions;

            this.window.showResult(result, this);

        }

    }


    setChangeEventOnAnswersOptions(n) {

        for (var i = 0; i < n; i++) {

            this.window.options.children[i].firstChild.addEventListener('change', this.getUserAnswer.bind(this));

        }

    }


    getUserAnswer() {

        this.window.answerButton.removeAttribute('disabled');

        for (var i = 0; i < this.questions[ this.currentQuestion ].answers.length; i++) {

            if (this.window.options.children[i].firstChild.checked) {
                this.userAnswers[ this.questions[ this.currentQuestion ].id ] = this.questions[ this.currentQuestion ].answers[i]['id'];
            }

        }

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

        this.main            = getElem('main');
        this.header          = getElem('question_header')
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

        this.title.innerHTML = test.questions[test.currentQuestion].title;
        this.description.innerHTML = test.questions[test.currentQuestion].description;

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

        this.title.innerHTML = test.questions[i].title;
        this.description.innerHTML = test.questions[i].description;
        this.answerButton.disabled = true;

        this.showOptions(test.questions[i], result[3], test.userAnswers);

        this.showButtons(test, result, i);
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

            p = createElem('p', 'question_option'),
            radio = createElem('input', 'radio', i+1);
            radio.setAttribute('type', 'radio');
            p.appendChild(radio);

            label = createElem('label');
            label.setAttribute('for', i+1);
            label.innerHTML = question.answers[i]['answer'];
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
     */
    showButtons(test, result, i) {
        var prev,
            to_results,
            next;

        if (i > 0){

            prev = createElem('input', 'test_button');

            prev.setAttribute('type', 'button');
            prev.setAttribute('value', '<');

            prev.classList.add('left_button');

            prev.addEventListener('click', this.showRightAnswer.bind(this, test, result, i - 1));

            prev.addEventListener('click', function (e) {
                e.currentTarget.parentNode.removeChild(e.currentTarget);
                if (next) {
                    next.parentNode.removeChild(next);
                }
                if (to_results) {
                    to_results.parentNode.removeChild(to_results);
                }
            });

            this.main.insertBefore(prev, this.backButton.parentNode);
        }

        to_results = createElem('input', 'test_button');

        to_results.setAttribute('type', 'button');
        to_results.setAttribute('value', 'К результатам');

        to_results.classList.add('attention');
        to_results.classList.add('center_button');

        to_results.addEventListener('click', this.showResult.bind(this, result, test));

        to_results.addEventListener('click', function (e) {
            e.currentTarget.parentNode.removeChild(e.currentTarget);
            if (next) {
                next.parentNode.removeChild(next);
            }
            if (prev) {
                prev.parentNode.removeChild(prev);
            }
        });

        this.main.insertBefore(to_results, this.share);

        if (i < test.numberOfQuestions - 1) {

            next = createElem('input', 'test_button');

            next.setAttribute('type', 'button');
            next.setAttribute('value', '>');

            next.classList.add('right_button');

            next.addEventListener('click', this.showRightAnswer.bind(this, test, result, i + 1));

            next.addEventListener('click', function (e) {
                e.currentTarget.parentNode.removeChild(e.currentTarget);
                if (prev) {
                    prev.parentNode.removeChild(prev);
                }
                if (to_results) {
                    to_results.parentNode.removeChild(to_results);
                }
            });
            this.main.insertBefore(next, this.share);
        }
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

        var i,
            p,
            div,
            resultDiv,
            shareScript,
            shareData;

        this.clear(this.options);

        this.share.classList.remove('invisible');
        this.header.classList.remove('invisible');

        this.title.innerHTML = test.title;
        this.description.innerHTML = test.short_description;

        for (var i = 0; i < Object.keys(result[1]).length; i++) {

            div = createElem('div', 'result_options');

            p = createElem('div', 'result_option_title');
            p.innerHTML = test.questions[i].title;

            div.appendChild(p);

            p = createElem('div', 'result_option_description');
            p.innerHTML = test.questions[i].description;

            div.appendChild(p);

            div.classList.add( result[1][i+1]?'right':'wrong' );

            div.addEventListener('click', this.showRightAnswer.bind(this, test, result, i) );
            div.addEventListener('click', function(){resultDiv.parentNode.removeChild(resultDiv)});

            this.options.appendChild(div);

        }

        resultDiv = createElem('div', 'result_div');

        p = createElem('p', 'result_message');
        p.innerHTML = result[2];

        resultDiv.appendChild(p);

        p = createElem('p', 'result_points');
        p.innerHTML = result[0];

        resultDiv.appendChild(p);

        resultDiv.classList.add('center');

        this.main.insertBefore(resultDiv, this.passButton);

        this.backButton.classList.remove('invisible');
        this.passButton.classList.remove('invisible');

        this.passButton.addEventListener('click', function(){resultDiv.parentNode.removeChild(resultDiv)});

        this.passButton.setAttribute('value', 'Ёще раз');

        shareData = {

            url: window.location.protocol + '//' + window.location.hostname + '/test/' + test.id,
            title: test.title+'. Я набрал '+result[0],
            decs: test.short_description,
            img: 'https://ifmo.su/public/img/meta_img.png'

        }

        shareScript  = createElem('script');
        shareScript.innerHTML = 'window.shareData = ' + JSON.stringify(shareData);

        this.share.appendChild(shareScript);
        codex.sharer.init();

        if (this.main.getElementsByClassName('loading')[0])
            this.main.removeChild(this.main.getElementsByClassName('loading')[0]);

    }


    clear(elem) {

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

    }

}