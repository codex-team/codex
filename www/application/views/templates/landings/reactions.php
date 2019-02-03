<link rel="stylesheet" href="/public/app/landings/reactions/reactions.css?v=<?= filemtime("public/app/landings/reactions/reactions.css") ?>">
<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">

<div class="reactions-page">
    <div class="reactions-page__about">
            <div class="reactions-page__logo">
                <? include(DOCROOT . "public/app/landings/reactions/img/product_hunt_cat.svg") ?>
            </div>
            <h1 class="reactions-page__name">CodeX Reactions</h2>
            <h2 class="reactions-page__info">Collect a feedback for your content without coding</h2>
            <div class="reactions-page__example"></div>
            <div class="reactions-page__button">Get started</div>
    </div>
    <div class="reactions-page__footer">
        <div class="reactions-page__footer-logo">
            <div class="reactions-page__footer-icon">
                <? include(DOCROOT . "public/app/landings/reactions/img/product_hunt_logo_orange.svg") ?>
            </div>
            <h2 class="reactions-page__footer-title">Oh, hi Mark!</h2>
        </div>
        <p class="reactions-page__footer-description">We are CodeX, and we build products <br> for developers and makers. Follow us.</p>
        <a href="https://twitter.com/codex_team?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-dnt="true" data-show-count="false">Follow @codex_team</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</div>
<script type="text/javascript" src="/public/build/main.bundle.js">
</script>
<script>
    const parent = document.querySelector('.reactions-page__example');
    let example = new codex.reactions({parent: parent, title: '', reactions: ['👍', '❤', '👎']});
</script>