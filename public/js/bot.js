/**
 * Created by dsnos on 20.09.2016.
 */

docReady(
    function(){
        console.log("docReady");
        bot.bindEvents();
    }
);

var bot = (function(bot) {

    bot.bindEvents = function (){

        console.log("bindEvents");

        bot.sendButton = document.getElementsByClassName("chat__send")[0];
        bot.sendTextarea = document.getElementsByClassName("chat__input_textarea")[0];
        bot.chatBox = document.getElementsByClassName("chat__messages")[0];

        bot.cmdList = ["/start", "/help", "/github", "/metrika", "/today", "/weekly", "/monthly"];

        var anchors = document.getElementsByClassName('chat__message_text_highlighted');
        for(var i = 0; i < anchors.length; i++) {

            var anchor = anchors[i];
            anchor.addEventListener("click", bot.commandClickedEvent);

        }

        bot.sendButton.addEventListener("click", bot.sendClickedEvent);
        bot.sendTextarea.addEventListener("keypress", bot.keyPressEvent);

    };

    // Events

    bot.commandClickedEvent = function (event) {
        var commandElement = event.target,
            commandName = commandElement.textContent;

        bot.sendCommand(commandName);
    };

    bot.keyPressEvent = function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            bot.sendCommand(bot.sendTextarea.value);
        }
    };

    bot.sendClickedEvent = function (event) {
        bot.sendCommand(bot.sendTextarea.value);
    };

    // Functions

    bot.sendCommand = function (cmd) {

        console.log("Send command: %s", cmd);

        if (cmd.length == 0) {
            return false;
        }

        var selfMessage = bot.buildSelfMessage(cmd),
            botAnswer = bot.buildBotAnswer(cmd);

        bot.chatBox.appendChild(selfMessage);

        setTimeout(function() {
            bot.chatBox.appendChild(botAnswer);
            bot.chatBox.scrollTop = bot.chatBox.scrollHeight;
        }, 1500);

        bot.sendTextarea.value = "";
        bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

    };

    bot.buildMessage = function (name, message) {
        var messageBox      = document.createElement( 'div' ),
            messageImage    = document.createElement( 'img' ),
            messageName     = document.createElement( 'div' ),
            messageText     = document.createElement( 'div' );

        messageBox.classList.add("chat__message");
        messageImage.classList.add("chat__message_photo");
        messageName.classList.add("chat__message_name");
        if (name ==  "You") {
            messageName.classList.add("chat__message_name_self");
            messageImage.setAttribute("alt", "You");
        }
        messageText.classList.add("chat__message_text");
        messageImage.setAttribute("src", "/public/img/logo160.png");

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
            span = bot.buildCommand(message)
        }

        return bot.buildMessage("You", span)

    };

    bot.buildBotAnswer = function (message) {

        var span = document.createElement( 'span' );

        if (message == "/help") {
            span.appendChild(document.createTextNode("С радостью помогу. Я умею управлять модулями "));
            span.appendChild(bot.buildCommand("/github"));
            span.appendChild(document.createTextNode(" и "));
            span.appendChild(bot.buildCommand("/metrika"));
        }
        else if (message == "/start") {
            span.appendChild(document.createTextNode("Для начала можете ознакомиться со справкой, введя команду "));
            span.appendChild(bot.buildCommand("/help"));
        }
        else if (message == "/github") {
            span.appendChild(document.createTextNode("Модуль GitHub подключен. Оповещения о новых коммитах, pull-реквестах и issues будут приходить сюда."));
            bot.sendReplyFromGithub();
        }
        else if (message == "/metrika") {
            span.appendChild(document.createTextNode("Для того, чтобы узнать статистику посещаемости вашего сайта введите команды "));
            span.appendChild(bot.buildCommand("/today"));
            span.appendChild(document.createTextNode(", "));
            span.appendChild(bot.buildCommand("/weekly"));
            span.appendChild(document.createTextNode(", "));
            span.appendChild(bot.buildCommand("/monthly"));
            bot.sendReplyFromMetrika();
        }
        else if (message == "/today") {
            span.appendChild(document.createTextNode("Сегодня ваш сайт ifmo.su посетили 30 уникальных пользователей, зафиксировано 133 просмотра."));
        }
        else if (message == "/weekly") {
            span.appendChild(document.createTextNode("Статистика за текущую неделю: 94 уникальных посетителя, 780 просмотров."));
        }
        else if (message == "/monthly") {
            span.appendChild(document.createTextNode("Данные за текущий месяц. 879 уникальных посетителей. 4815 просмотров."));
        }
        else {
            span.appendChild(document.createTextNode("Что-то я даже и не знаю, что тебе на это сказать."));
        }

        return bot.buildMessage("Codex Bot", span);

    };

    bot.buildCommand = function (message) {

        var span = document.createElement( 'span' );
        span.textContent = message;
        span.classList.add("chat__message_text_highlighted");
        span.addEventListener("click", bot.commandClickedEvent);

        return span;

    };

    bot.sendReplyFromGithub = function () {

        window.setTimeout(function () {

            var span = document.createElement( 'span' );
            span.appendChild(document.createTextNode("У вас 10 новых коммитов."));

            var message = bot.buildMessage("Codex. GitHub Notification", span);
            bot.chatBox.appendChild(message);
            bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

        }, 3000);

    };

    bot.sendReplyFromMetrika = function () {

        window.setTimeout(function () {

            var span = document.createElement( 'span' );
            span.appendChild(document.createTextNode("Яндекс.Метрика успешно подключена для вашего сайта ifmo.su."));

            var message = bot.buildMessage("Codex. Metrika Notification", span);
            bot.chatBox.appendChild(message);
            bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

        }, 3000);

    };

    return bot;

})({});