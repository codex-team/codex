
/**
 * Created by dsnos on 20.09.2016.
 */


// codex.docReady(function(){
//     bot.bindEvents();
// });

var bot = (function (bot) {

    bot.chatBox      = null;
    bot.sendButton   = null;
    bot.sendTextarea = null;

    bot.bindEvents = function () {

        bot.sendButton = document.getElementsByClassName('chat__send')[0];
        bot.sendTextarea = document.getElementsByClassName('chat__input_textarea')[0];
        bot.chatBox = document.getElementsByClassName('chat__messages')[0];

        bot.cmdList = ['/start', '/help', '/github', '/metrika', '/today', '/weekly', '/monthly'];


        /**
        * Delegate 'click' event to all commands
        */
        delegateEvent_(document, '.chat__message_text_highlighted', 'click', commandClickedEvent_ );

        bot.sendButton.addEventListener('click', sendClickedEvent_ );
        bot.sendTextarea.addEventListener('keypress', keyPressEvent_ );

        /**
        * Start random GitHub notification
        */
        setTimeout(function () {

            setInterval( sendGitHubNofify_, 15000);

        }, 10000);


    };

    /**
    * @private
    *
    * Attach event to Element in parent
    *
    * @param {Element} parentNode    - Element that holds event
    * @param {string} targetSelector - selector to filter target
    * @param {string} eventName      - name of event
    * @param {function} callback     - callback function
    */
    function delegateEvent_(parentNode, targetSelector, eventName, callback ) {

        parentNode.addEventListener(eventName, function (event) {

            var el = event.target, matched;

            while ( el && !matched ) {

                matched = el.matches(targetSelector);

                if ( !matched ) el = el.parentElement;

            }

            if (matched) {

                callback.call( event.target, event, el );

            }

        }, true);

    }


    /**
    * @private
    *
    * Returns random {int} between numbers
    */
    function random_(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    function sendGitHubNofify_() {

        var randomDelay = random_(100, 1000);

        setTimeout(appendGitHubNofify_, randomDelay);

    }

    function appendGitHubNofify_() {

        var wrapper = document.createElement('DIV'),
            message = MESSAGES_.gitHubEvent(),
            answer;

        wrapper.innerHTML = message;

        answer = bot.buildMessage('CodeX Bot', wrapper);

        appendMessage_(answer);

    }


    /**
    * @private
    */
    function commandClickedEvent_(event) {

        var commandElement = event.target,
            commandName = commandElement.textContent;

        bot.sendCommand(commandName);

    }

    /**
    * @private
    */
    function keyPressEvent_(event) {

        if ( event.keyCode != 13 ) {

            return;

        }

        event.preventDefault();
        bot.sendCommand(bot.sendTextarea.value);

    }

    /**
    * @private
    */
    function sendClickedEvent_(event) {

        bot.sendCommand(bot.sendTextarea.value);

    }

    /**
    * @private
    * @param {Element} message
    */
    function appendMessage_( message ) {

        bot.chatBox.appendChild(message);
        bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

    }

    // Functions

    bot.sendCommand = function (cmd) {

        if (!cmd.length) {

            return false;

        }

        var selfMessage = bot.buildSelfMessage(cmd),
            botAnswer = bot.buildBotAnswer(cmd);

        bot.chatBox.appendChild(selfMessage);

        setTimeout(function () {

            appendMessage_(botAnswer);

        }, 750);

        bot.sendTextarea.value = '';
        bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

    };

    bot.buildMessage = function (name, message) {

        var messageBox      = document.createElement( 'div' ),
            messageImage    = document.createElement( 'img' ),
            messageName     = document.createElement( 'div' ),
            messageText     = document.createElement( 'div' );

        messageBox.classList.add('chat__message');
        messageImage.classList.add('chat__message_photo');
        messageName.classList.add('chat__message_name');

        if (name ==  'You') {

            messageName.classList.add('chat__message_name_self');
            messageImage.setAttribute('alt', 'You');

        }
        messageText.classList.add('chat__message_text');
        messageImage.setAttribute('src', '/public/app/img/logo160.png');

        messageText.appendChild(message);

        messageName.innerHTML = name;

        messageBox.appendChild(messageImage);
        messageBox.appendChild(messageName);
        messageBox.appendChild(messageText);

        return messageBox;

    };

    bot.buildSelfMessage = function (message) {

        var span = document.createElement( 'span' );

        span.textContent = message;

        if (bot.cmdList.indexOf(message) != -1) {

            span = buildCommand_(message);

        }

        return bot.buildMessage('You', span);

    };

    function buildCommand_(message) {

        var span = document.createElement( 'span' );

        span.textContent = message;
        span.classList.add('chat__message_text_highlighted');

        return span;

    }

    bot.buildBotAnswer = function (command) {

        var wrapper = document.createElement('DIV'),
            message,
            answer;

        switch (command) {
            case '/start'   :  message = MESSAGES_.start(); break;
            case '/help'   :  message = MESSAGES_.help(); break;
            case '/github' :  message = MESSAGES_.gitHubHelp(); break;
            case '/metrika':  message = MESSAGES_.metrikaHelp(); break;
            case '/today':    message = MESSAGES_.today(); break;
            case '/weekly':   message = MESSAGES_.weekly(); break;
            case '/monthly':  message = MESSAGES_.monthly(); break;
            default :         message = MESSAGES_.default(); break;
        }

        wrapper.innerHTML = message;

        return bot.buildMessage('CodeX Bot', wrapper);

    };

    /**
    * @private
    *
    * Returns random element from arrat
    */
    function randomFrom_(arr) {

        return arr[random_(0, arr.length - 1)];

    }


    /**
    * @private
    *
    * All bot replies
    */
    var MESSAGES_ = {

        default : function () {

            var answers = [
                'Уже работаем над этим!',
                'Я так не умею',
                'Клево!',
                'Потрясающе',
                'Продолжайте',
                'Не понял',
                'Используйте команду <span class="chat__message_text_highlighted">/help</span>'
            ];

            return randomFrom_(answers);

        },

        start : function () {

            return 'Для начала можете ознакомиться со справкой, введя команду ' +
                    '<span class="chat__message_text_highlighted">/help</span>';

        },

        help : function () {

            return ''.concat(
                'Инструкция по работе с ботом. Выберите раздел для просмотра доступных команд.', '<br>',
                '<br>',
                '<span class="chat__message_text_highlighted">/metrika</span>',
                ' — Модуль Яндекс.Метрики. Умеет присылать статистику за день и неделю.',
                '<br>',
                '<br>',
                '<span class="chat__message_text_highlighted">/github</span>',
                ' — Модуль GitHub. Может присылать уведомления о новых коммитах, pull-реквестах и открытии Issues.', '<br>'
            );

        },

        gitHubHelp : function () {

            return ''.concat(
                'Модуль для работы с сервисом GitHub.', '<br>',
                '<br>',
                ' - Оповещения о новых Push-событиях', '<br>',
                ' - Оповещения о создании Pull-реквестов', '<br>',
                ' - Оповещения о создании Issues', '<br>',
                '<br>',
                'Модуль активирован для сайта codex.so'
            );

        },

        gitHubEvent : function () {

            var users = ['@neSpecc', '@guryn', '@khaydarovm', '@dn0str', '@polinashneider'],
                branches = ['master', 'master', 'master', 'redesign', 'client-updates', 'new-editor'],
                repos = ['codex.so', 'codex.editor', 'codex.bot', 'kohana.aliases', 'codex.special'],
                commits = [
                    '* meet up land mobile view improved',
                    '* styles imroved <br> * mobile view updated',
                    '* minor fixes',
                    '* next version pre-release',
                    '* fixes',
                    '* now you can write faster'
                ],
                files = [
                    'public/css/main.css',
                    'public/css/codex.js',
                    'public/extestions/codex-editor/codex-editor.js <br> public/extestions/codex-editor/codex-editor.css',
                    'application/views/templates/index.php',
                    'application/classes/Controller/Base/preDispatch.php',
                    'application/classes/Controller/Users/Index.php <br> application/classes/Controller/Users/Modify.php',
                ];

            return ''.concat(
                randomFrom_(users), ' pushed commit to ', randomFrom_(branches), ' [codex-team/', randomFrom_(repos), ']',
                '<br/>', '<br/>',
                randomFrom_(commits), '<br/>',
                '<br/>',
                'Modified files:',
                '<br/>',
                randomFrom_(files), '<br/>',
                '<br/>',
                '<a>https://github.com/codex-team/codex/compare/', random_(1111, 9999), 'dbdb34ae...0c0153afc00e<a>'
            );

        },

        metrikaHelp : function () {

            return ''.concat(
                '<span class="chat__message_text_highlighted">/today</span> — Получить значения счетчиков за день.',
                '<br>',
                '<span class="chat__message_text_highlighted">/weekly</span> — Показатели за неделю.',
                '<br>',
                '<span class="chat__message_text_highlighted">/monthly</span> — Показатели за месяц.'
            );

        },

        metrikaSuccessConnection : function () {

            return 'Яндекс.Метрика успешно подключена для сайта <mono>codex.so</i>.';

        },

        today : function () {

            return ''.concat(
                buildDate_(), '<br>',
                '<br>',
                'codex.so:', '<br>',
                '637 уникальных посетителей', '<br>',
                '2 048 просмотров'
            );

        },

        weekly : function () {

            return ''.concat(
                'С понедельника по сегодняшний день', '<br>',
                '<br>',
                'codex.so:', '<br>',
                '2 452 уникальных посетителя', '<br>',
                '10 348 просмотров'
            );

        },

        monthly : function () {

            return ''.concat(
                'Данные за текущий месяц',
                '<br>',
                '<br>',
                'codex.so:', '<br>',
                '24 132 уникальных посетителя', '<br>',
                '49 939 просмотров'
            );

        }

    };

    /**
    * @private
    */
    function buildDate_() {

        var date    = new Date(),
            dd      = date.getDate(),
            mm      = date.getMonth() + 1,
            hh      = date.getHours(),
            minmin  = date.getMinutes(),
            yyyy    = date.getFullYear(),
            today;

        if ( dd < 10 ) {

            dd = '0' + dd;

        }

        if ( mm < 10 ) {

            mm = '0' + mm;

        }

        if ( hh < 10 ) {

            hh = '0' + hh;

        }

        if ( minmin < 10 ) {

            minmin = '0' + minmin;

        }

        today = dd + '/' + mm + '/' + yyyy;

        return 'Сегодня ' + dd + '.' + mm + '.' + yyyy + '. Данные к ' + hh + ':' + minmin;

    }

    return bot;

})({});