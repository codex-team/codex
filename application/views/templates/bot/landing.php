<style type="text/css">

    /**
    * Site styles overlay
    */
    body {
        background-color: #107AEA;
    }
    .site_header {
        border-bottom: 1px solid #3590f1;
        background-color: #107AEA;
    }
    .site_header a,
    .site_footer a{
        color: #d0e6ff;
    }
        .site_header a:hover,
        .site_footer a:hover,
        .site_header .icon_link{
            color: #fff;
        }
    .site_footer{
        color: #bad1ff;
        border-top: 1px solid #3590f1;
        background-color: #107AEA;
    }
        .site_footer h5{
            color: #fff;
        }
        .site_footer .desclimer {
            color: #96b5ff;
        }
    .scroll_button{
        background: rgba(149, 192, 255, 0.22);
        color: #fff;
    }


    /**
    * Landing page styles
    */
    .landing {
        padding-bottom: 60px;
        background: #107aea;
        text-align: center;
        color: #fff;
    }
    .landing__header {
        margin: 150px 0 15px;
        font-size: 73px;
        line-height: 1.3em;
    }
    .landing__description {
        font-size: 25px;
        line-height: 1.4em
    }
    .landing__integration {
        margin: 60px 0;
        color: #a4c9ff;
        font-size: 18px;
    }
    .landing__integration_github,
    .landing__integration_yandex{
        margin: 10px 10px 0;
        vertical-align: bottom;
    }
    .landing__call{
        font-size: 3em;
        margin-top: 3em;
        line-height: 1.3em;
    }
    .landing__repo_link{
        display: inline-block;
        margin-top: 8em;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        font-size: 1.2em;
    }
        .landing__repo_link:hover{
            color: #fff;
        }
        .landing__repo_link i{
            font-size: 2em;
            vertical-align: text-bottom;
        }

    /**
    * Chat demo
    */

    .chat {
        max-width: 500px;
        margin: 0 auto;
        border-radius: 3px;
        text-align: left;
        background-color: #fff;
        color: #000;
    }
    .chat__messages{
        overflow: hidden;
        overflow-y: scroll;
        padding: 10px 0;
        max-height: 320px;
        word-wrap: break-word;
    }
    .chat__message{
        padding: 10px 20px;
    }
    .chat__input{
        padding: 20px;
    }
    .chat__empty_holder{
        min-height: 220px;
    }
    .chat__message{
        min-height: 70px;
    }
    .chat__message_text,
    .chat__message_name{
        padding-left: 70px;
    }
    .chat__message_photo{
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #eee;
    }
    .chat__message_name{
        margin-top: 2px;
        font-size: 1.04em;
        font-weight: bold;
        color: #B85D97;
    }
    .chat__message_name_self{
        color: #08cc87;
    }
    .chat__message_text_highlighted{
        color: #2b74c9;
        cursor: pointer;
    }
        .chat__message_text_highlighted:hover{
            text-decoration: underline;
        }
    .chat__input{
        border-top: 1px solid #E5E9F1;
        letter-spacing: .1px;
    }
    .chat__input_textarea{
        width: 84%;
        background: transparent;
        padding: 0;
        vertical-align: bottom;
        resize: none;
        color: #000;
    }
        .chat__input_textarea:focus{
            background: transparent;
        }
        .chat__input_textarea::-webkit-input-placeholder {
            color: #7E86A2 !important;
        }

    .chat__send{
        float: right;
        color: #2A8BE5;
        cursor: pointer;
        font-size: 1.1em;
    }

    .button__green_cta{
        padding: 22px 40px;
        border-radius: 50px;
        background: #2EFF10;
        color: #012700;
        font-size: 2em;
        letter-spacing: .2px;
        font-weight: bold;
    }
        .button__green_cta:hover{
            background: #001C32;
            color: #BEE2FF;
        }
        .button__green_cta i{
            margin: 0 .16em 0 -.4em ;
        }

    @media all and (max-width: 800px) {
        .landing {
            padding: 20px
        }
        .landing__header{
            margin-top: 50px;
            font-size: 35px;
        }
        .landing__description{
            font-size: 16px;
        }
        .landing__call{
            font-size: 2em;

        }

    }
    </style>
<div class="center_side">
    <div class="landing">
        <h1 class="landing__header">CodeX Bot</h1>
        <p class="landing__description">Telegram bot-platform for developers and managers</p>
        <div class="landing__integration">
            Easy integration with <br/>
            <img class="landing__integration_github" src="/public/img/landings/bot/logo-github.svg">
            <img class="landing__integration_yandex" src="/public/img/landings/bot/logo-yandex.svg">
        </div>
        <div class="chat">
            <div class="chat__messages">
                <div class="chat__empty_holder"></div>
                <div class="chat__message">
                    <img class="chat__message_photo" src="/public/img/logo160.png" alt="CodeX Bot">
                    <div class="chat__message_name">Codex Bot</div>
                    <div class="chat__message_text">
                        Используйте команду <span class="chat__message_text_highlighted">/help</span>, чтобы посмотреть примеры работы бота
                    </div>
                </div>
            </div>
            <div class="chat__input">
                <div class="chat__send">Send</div>
                <textarea class="chat__input_textarea" placeholder="Write a message..." rows="1"></textarea>
            </div>
        </div>
        <p class="landing__call">Simply add and enjoy</p>
        <a class="button button__green_cta" target="_blank" href="https://telegram.me/codex_bot"><i class="icon-paper-plane"></i> codex_bot</a> <br>

        <a class="landing__repo_link" target="_blank" href="https://github.com/codex-team/codex.bot"><i class="icon-github-circled"></i>View on GitHub</a>
    </div>
</div>

<script src="/public/js/bot.js?v=1468920212"></script>