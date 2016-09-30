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
        }, 750);

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
            span = bot.mergeTextAndCommands(span, [
                "Инструкция по работе с ботом. Выберите раздел для просмотра доступных команд.",
                "<br>", "<br>",
                "/github",
                " — Модуль GitHub. Может присылать уведомления о новых коммитах, pull-реквестах и открытии Issues.",
                "<br>",
                "/metrika",
                " — Модуль Яндекс.Метрики. Умеет присылать статистику за день и неделю."
            ]);
        }
        else if (message == "/start") {
            span.appendChild(document.createTextNode("Для начала можете ознакомиться со справкой, введя команду "));
            span.appendChild(bot.buildCommand("/help"));
        }
        else if (message == "/github") {
            span = bot.mergeTextAndCommands(span, [
                "Модуль для работы с сервисом GitHub.", "<br>", "<br>",
                " - Оповещения о новых Push-событиях", "<br>",
                " - Оповещения о создании Pull-реквестов", "<br>",
                " - Оповещения о создании Issues", "<br>", "<br>",
                "Модуль активирован для сайта ifmo.su"
            ]);
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
            span = bot.mergeTextAndCommands(span, [
                bot.buildDate(), "<br>", "<br>",
                "CodeX:", "<br>",
                "66 уникальных посетителей", "<br>",
                "361 просмотров"
            ]);
        }
        else if (message == "/weekly") {
            span = bot.mergeTextAndCommands(span, [
                "С понедельника по сегодняшний день.", "<br>", "<br>",
                "CodeX:", "<br>",
                "242 уникальных посетителей", "<br>",
                "1030 просмотров"
            ]);
        }
        else if (message == "/monthly") {
            span = bot.mergeTextAndCommands(span, [
                "Данные за текущий месяц.", "<br>", "<br>",
                "CodeX:", "<br>",
                "1006 уникальных посетителей", "<br>",
                "5502 просмотров"
            ]);
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

        }, 1500);

    };

    bot.sendReplyFromMetrika = function () {

        window.setTimeout(function () {

            var span = document.createElement( 'span' );
            span.appendChild(document.createTextNode("Яндекс.Метрика успешно подключена для вашего сайта ifmo.su."));

            var message = bot.buildMessage("Codex. Metrika Notification", span);
            bot.chatBox.appendChild(message);
            bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

        }, 1500);

    };

    bot.mergeTextAndCommands = function (span, texts) {

        texts.forEach(function(text) {

            if (text == "<br>") {
                span.appendChild(document.createElement('br'));
            }
            else if (text[0] == "/") {
                span.appendChild(bot.buildCommand(text));
            }
            else {
                span.appendChild(document.createTextNode(text));
            }

        });

        return span;

    }

    bot.buildDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var hh = today.getHours();
        var minmin = today.getMinutes();

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        if(hh<10){
            hh='0'+hh;
        }
        if(minmin<10){
            minmin='0'+minmin;
        }
        var today = dd+'/'+mm+'/'+yyyy;
        return "Сегодня " + dd + "." + mm + "." + yyyy + ". Данные к " + hh + ":" + minmin;
    }

    return bot;

})({});