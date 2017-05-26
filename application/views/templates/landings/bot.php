<link rel="stylesheet" href="/public/css/landings/bot.css?v=<?= filemtime("public/css/landings/bot.css") ?>">
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

<!-- <script src="/public/js/bot.js?v=1468920212"></script> -->
<script type="text/javascript">codex.bot.bindEvents();</script>