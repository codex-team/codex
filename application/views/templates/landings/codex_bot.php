<link rel="stylesheet" href="/public/app/landings/codex_bot/codex_bot.css?v=<?= filemtime("public/app/landings/codex_bot/codex_bot.css") ?>">
<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">

<div class="codex-bot center_side">

    <div class="codex-bot__about">
        <h2 class="codex-bot__info">Working team assistant</h2>
        <h1 class="codex-bot__name">@codex_bot</h2>
        <a class="codex-bot__button" href="https://slack.com/oauth/authorize?&client_id=12842278998.198477752209&scope=incoming-webhook,bot,channels:history,channels:read,commands,chat:write:bot,emoji:read,groups:read,im:history,team:read,users:read,files:read,pins:read,groups:history,groups:write,mpim:history,mpim:read,mpim:write,channels:write">
            <? include(DOCROOT . 'public/app/landings/codex_bot/img/slack-logo.svg'); ?>
            Add to <b>Slack</b>
        </a>
        <a class="codex-bot__button" href="https://t.me/codex_bot">
            <? include(DOCROOT . 'public/app/landings/codex_bot/img/telegram-logo.svg'); ?>
            Add to <b>Telegram</b>
        </a>
    </div>

    <h3 class="codex-bot__heading">
        Available integrations
    </h3>

    <?
        $apps = array(
            array(
                'name' => 'GitHub',
                'description' => 'Notifications about new issues, pull-requests, reviews. And other helpfully stuff.',
                'contributors' => array(
                    array( 'name' => 'neSpecc', 'photo' => 'https://avatars0.githubusercontent.com/u/3684889?v=4&s=60' ),
                    array( 'name' => 'talyguryn', 'photo' => 'https://avatars1.githubusercontent.com/u/15259299?v=4&s=60' ),
                    array( 'name' => 'n0str', 'photo' => 'https://avatars1.githubusercontent.com/u/988885?v=4&s=60' ),
                    array( 'name' => 'gohabereg', 'photo' => 'https://avatars3.githubusercontent.com/u/23050529?v=4&s=60' ),
                ),
                'url' => 'github.com/codex-bot/github',
                'icon' => 'public/app/landings/codex_bot/img/github-logo.svg'
            ),
            array(
                'name' => 'Yandex.Metrika',
                'description' => 'Yandex.Metrika assistant. Regular and requested reports.',
                'contributors' => array(
                    array( 'name' => 'neSpecc', 'photo' => 'https://avatars0.githubusercontent.com/u/3684889?v=4&s=60' ),
                    array( 'name' => 'talyguryn', 'photo' => 'https://avatars1.githubusercontent.com/u/15259299?v=4&s=60' ),
                    array( 'name' => 'gohabereg', 'photo' => 'https://avatars3.githubusercontent.com/u/23050529?v=4&s=60' ),
                ),
                'url' => 'github.com/codex-bot/metrika',
                'icon' => 'public/app/landings/codex_bot/img/yandex-logo.svg'
            ),
            array(
                'name' => 'Webhooks',
                'description' => 'Easy-to-setup notifications scheme. You will get special link that allows to send messages via simple POST requests.',
                'contributors' => array(
                    array( 'name' => 'neSpecc', 'photo' => 'https://avatars0.githubusercontent.com/u/3684889?v=4&s=60' ),
                    array( 'name' => 'talyguryn', 'photo' => 'https://avatars1.githubusercontent.com/u/15259299?v=4&s=60' ),
                    array( 'name' => 'gohabereg', 'photo' => 'https://avatars3.githubusercontent.com/u/23050529?v=4&s=60' ),
                ),
                'url' => 'github.com/codex-bot/notify',
                'icon' => 'public/app/landings/codex_bot/img/webhooks.svg'
            )

        )
    ?>

    <div class="codex-bot__integrations-layout">

        <? foreach ( $apps as $app ): ?>

            <div class="bot-app">
                <a class="bot-app__icon" href="//<?= $app['url'] ?>">
                    <? include(DOCROOT . $app['icon']); ?>
                </a>
                <a class="bot-app__title" href="//<?= $app['url'] ?>">
                    <?= $app['name']; ?>
                </a>
                <div class="bot-app__desc">
                    <?= $app['description']; ?>
                </div>

                <div class="bot-app__contributors">
                    <? foreach ( $app['contributors'] as $contributor ): ?>
                        <a class="bot-app__contributor" href="//github.com/<?= $contributor['name']; ?>" title="<?= $contributor['name'] ?>">
                            <img src="<?= $contributor['photo'] ?>" alt="<?= $contributor['name'] ?>">
                        </a>
                    <? endforeach; ?>
                </div>

                <a class="bot-app__link" href="//<?= $app['url'] ?>">
                    <?= $app['url'] ?>
                </a>
            </div>

        <? endforeach; ?>

         <div class="bot-app">
            <span class="bot-app__icon">
                <? include(DOCROOT . 'public/app/landings/codex_bot/img/your_own.svg'); ?>
            </span>
            <img src="">
            <div class="bot-app__title">
                Your own integration
            </div>
            <div class="bot-app__desc">
                Learn how to create application with our SDK for Python.
            </div>
            <a class="bot-app__link" href="//<?= $app['url'] ?>">
                Read guide »
            </a>
        </div>

    </div>
    <div class="codex-bot__text-block">
        <div class="text-block__title">User Guide</div>
        <div class="text-block__info">Read instructions about @codex_bot usage and building own applications with community.</div>
        <div class="codex-bot__links">
            <a class="codex-bot__links-item" href="">Getting Started </a>
            <span class="codex-bot__links-delimeter">•</span>
            <a class="codex-bot__links-item" href="">Documentation</a>
            <span class="codex-bot__links-delimeter">•</span>
            <a class="codex-bot__links-item" href="">View code</a>
        </div>
    </div>
    <div class="codex-bot__text-block">
        <div class="text-block__title">Contributors community</div>
        <div class="text-block__info">We really appreciate your help and participation with improving and building platform together. Please, leave a feedback, bug-reports and add your own stuff.</div>
        <a class="text-block__link" href="github.com/codex_bot">github.com/codex_bot</a>
    </div>

</div>
