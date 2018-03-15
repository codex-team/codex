<div class="center_side clear">

    <div class="page-header clearfix">

        <div class="site-section site-section--articles-list">
            <h2 class="site-section__title">Our articles</h2>
            <div class="site-section__desc">We are writing about our experience and researches.</div>
        </div>

        <div class="follow-us">
            <div class="follow-us__contents">
                <h4 class="follow-us__title">CodeX</h4>
                <div class="follow-us__desc">Notes about web-dev and some interesting IT insights in the our lovely messenger</div>
            </div>
            <a class="follow-us__button" href="//telegram.me/codex_team" target="_blank">
                <img src="/public/app/img/icon_telegram_white.svg">
                Follow @codex_team
            </a>
        </div>

    </div>

</div>

<div class="center_side feed clearfix">

    <?= View::factory('templates/articles/list', array( 'feed_items' => $feed_items)); ?>

</div>