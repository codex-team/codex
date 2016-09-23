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
        
    .site_footer{
        color: #bad1ff;
        border-top: 1px solid #3590f1;
        background-color: #107AEA;
    }
    
    /**
    * Landing page styles
    */
    .landing {
        background: #107aea;        
    }
   
</style>
<link rel="stylesheet" type="text/css" href="/public/css/landings.css">
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
                        Press <span class="chat__message_text_highlighted">/help</span> to view menu
                    </div>
                </div>
            </div>
            <div class="chat__input">
                <div class="chat__send">Send</div>
                <textarea class="chat__input_textarea" placeholder="Write a message..." rows="1"></textarea>
            </div>
        </div>

    </div>
</div>