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

        bot.cmdList = ["/start", "/help"];

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
        bot.chatBox.appendChild(botAnswer);

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
            span.classList.add("chat__message_text_highlighted");
            span.addEventListener("click", bot.commandClickedEvent);
        }

        return bot.buildMessage("You", span)

    };

    bot.buildBotAnswer = function (message) {

        var answer = "Что-то я даже и не знаю, что тебе на это сказать.";
        if (message == "/help") {
            answer = "С радостью помогу. Просто пиши сообщения.";
        }

        var span = document.createElement( 'span' );
        span.textContent = answer;

        return bot.buildMessage("Codex Bot", span);

    };

    return bot;

})({});