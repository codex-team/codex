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
        bot.chatBox = document.getElementsByClassName("chat__messages")[0]

        bot.cmdHelp = bot.createCmdObject("/help");
        bot.cmdStart = bot.createCmdObject("/start");

        var anchors = document.getElementsByClassName('chat__message_text_highlighted');
        for(var i = 0; i < anchors.length; i++) {

            var anchor = anchors[i];
            anchor.addEventListener("click", bot.clickEvent);

        }

        bot.sendButton.addEventListener("click", bot.sendClickEvent);
        bot.sendTextarea.addEventListener("keypress", bot.keyPress);

    };

    bot.clickEvent = function (event) {
        bot.sendCommand(event.target.innerHTML);
    };

    bot.sendClickEvent = function (event) {
        bot.sendCommand(bot.sendTextarea.value);
    };

    bot.sendCommand = function (cmd) {

        console.log("Send command: " + cmd);

        if (cmd.length == 0) {
            return false;
        }

        messages = document.getElementsByClassName("chat__messages")[0];

        selfMessage = bot.highlightCommands(cmd);

        messages.appendChild(bot.buildMessage("You", cmd, selfMessage));
        messages.appendChild(bot.response(cmd));

        bot.sendTextarea.value = "";
        bot.chatBox.scrollTop = bot.chatBox.scrollHeight;

    };

    bot.buildMessage = function (name, message, selfMessage) {
        var messageBox      = document.createElement( 'div' ),
            messageImage    = document.createElement( 'img' ),
            messageName     = document.createElement( 'div' ),
            messageText     = document.createElement( 'div' );

        messageBox.classList.add("chat__message");
        messageImage.classList.add("chat__message_photo");
        messageName.classList.add("chat__message_name");
        if (name ==  "You") {
            messageName.classList.add("chat__message_name_self");
        }
        messageText.classList.add("chat__message_text");

        messageImage.setAttribute("src", "/public/img/logo160.png");
        messageImage.setAttribute("alt", "You");

        if (typeof selfMessage == "boolean") {
            messageText.innerHTML = message;
        }
        else {
            messageText.appendChild(selfMessage);
        }

        messageName.innerHTML = name;

        messageBox.appendChild(messageImage);
        messageBox.appendChild(messageName);
        messageBox.appendChild(messageText);

        return messageBox;
    };

    bot.highlightCommands = function (message) {

        span = document.createElement( 'span' );
        span.classList.add("chat__message_text_highlighted");
        span.innerHTML = message;
        span.addEventListener("click", bot.clickEvent);

        if (message == "/help") { return span; }
        if (message == "/start") { return span; }

        return false;
    };

    bot.response = function (cmd) {

        message = "Что-то я даже и не знаю, что тебе на это сказать.";
        if (cmd == "/help") {
            message = "С радостью помогу. Просто пиши сообщения.";
        }

        return bot.buildMessage("Codex Bot", message, false);

    };

    bot.createCmdObject = function (message, event) {
        span = document.createElement( 'span' );
        span.classList.add("chat__message_text_highlighted");
        span.innerHTML = message;
        span.addEventListener("click", bot.clickEvent);
        return span;
    };

    bot.keyPress = function (event) {
        if (event.keyCode == 13) {
            console.log("Enter pressed.");
            event.preventDefault();
            bot.sendCommand(bot.sendTextarea.value);
        }
    };

    return bot;

})({});