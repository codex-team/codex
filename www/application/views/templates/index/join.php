<section class="join-component site-section">
    <h2 class="site-section__title">Join Team</h2>
    <div class="join-component__desc site-section__desc">
        We are opening the new development season and invite developers, designers, QA engineers and PR eagles.<br><br>
        Joining opened till 22nd, september 2019
    </div>

    <time class="join-component__time">
        <span data-time="days" class="join-component__time-item">
            <?= $joinTimeLeft['days_left'] ?>
        </span>
        <span class="join-component__time-delimiter"></span>
        <span data-time="hrs" class="join-component__time-item">
            <?= $joinTimeLeft['hours_left'] ?>
        </span>
        <span class="join-component__time-delimiter join-component__time-delimiter--blinking"></span>
        <span data-time="mins" class="join-component__time-item">
            <?= $joinTimeLeft['minutes_left'] ?>
        </span>
    </time>

    <a href="/join" class="join-component__button buttons">Join</a>
</section>