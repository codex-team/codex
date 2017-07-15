<<<<<<< HEAD
<link rel="stylesheet" href="/public/css/landings/bot.css?v=<?= filemtime("public/css/landings/bot.css") ?>">
<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">

<div class="center_side">
    <div class="landing">
        <div class="landing__about about">
            <img class="about__img" src="/public/img/landings/bot/codex_bot_logo.png">
            <div class="description">
                <h2 class="description__info">Working team assistant</h2>
                <div class="description__name">@codex_bot</div>
                <div class="links">
                    <a class="links__item links__item--first" href="">Getting Started </a>
                    <a class="links__item" href="">Documentation</a>
                    <a class="links__item" href="">View code</a>
                </div>
            </div>
            <div class="buttons">
                <a class="buttons__item" href="">
                    <img class="buttons__item-img" src="/public/img/landings/bot/slack_cmyk.png">
                    Add to <br><b>Slack</b>
                </a>
                <a class="buttons__item" href="">
                    <img class="buttons__item-img" src="/public/img/landings/bot/TelegramLogo2.png">
                    Add to <br><b>Telegram</b>
                </a>
            </div>
        </div>
        <div class="landing__integrations">
            <div class="integrations__links-block">
                <h2 class="integrations__title">Available integrations</h2>
                <a class="integrations__link" href="">How to create your own</a>
            </div>
            <div class="integrations__item-block">
                <div class="integrations__item integrations__item--first">
                    <img class="integrations__item-logo" src="/public/img/landings/bot/github.png">
                    <div class="integrations__item-content">
                        <div class="integrations__item-title"><b>GitHub</b></div>
                        <div class="integrations__item-desc">
                            Notifications about new issues, pull-requests, reviews. And other helpfully stuff.
                        </div>
                        <div class="integrations__item-footer">
                            <div class="contributers">
                                <div class="contributers__item"></div>
                                <div class="contributers__item"></div>
                                <div class="contributers__item"></div>
                                <div class="contributers__item"></div>
                            </div>
                            <a class="integrations__footer-link" href="">github.com/codex-bot/github</a>
                        </div>
                    </div>
                </div>
                <div class="integrations__item">
                    <div class="integrations__item-content">
                        <div class="integrations__item-title">
                            <img class="metrika-img" src="/public/img/landings/bot/yandex_eng_logo@1,5x.png">
                        </div>
                        <div class="integrations__item-desc">
                            Yandex.Metrika assistant. Regular and requested reports.
                        </div>
                        <div class="integrations__item-footer">
                            <div class="contributers">
                                <div class="contributers__item"></div>
                                <div class="contributers__item"></div>
                                <div class="contributers__item"></div>
                            </div>
                            <a class="integrations__footer-link" href="">github.com/codex-bot/metrika</a>
                        </div>
=======
<link rel="stylesheet" href="/public/app/landings/bot/bot.css?v=<?= filemtime("public/app/landings/bot/bot.css") ?>">
<div class="center_side">
    <div class="landing">
        <h1 class="landing__header">CodeX Bot</h1>
        <p class="landing__description">Telegram bot-platform for developers and managers</p>
        <div class="landing__integration">
            Easy integration with <br/>
            <img class="landing__integration_github" src="/public/app/landings/bot/img/logo-github.svg">
            <img class="landing__integration_yandex" src="/public/app/landings/bot/img/logo-yandex.svg">
        </div>
        <div class="chat">
            <div class="chat__messages">
                <div class="chat__empty_holder"></div>
                <div class="chat__message">
                    <img class="chat__message_photo" src="/public/app/img/logo160.png" alt="CodeX Bot">
                    <div class="chat__message_name">Codex Bot</div>
                    <div class="chat__message_text">
                        Используйте команду <span class="chat__message_text_highlighted">/help</span>, чтобы посмотреть примеры работы бота
>>>>>>> master
                    </div>
                </div>
            </div>
        </div>
    </div>
<<<<<<< HEAD
</div>
=======
</div>
<script src="/public/app/landings/bot/bot.js?v=1468920212"></script>
<script type="text/javascript">
codex.docReady(function(){
    bot.bindEvents();
});
</script>
>>>>>>> master
