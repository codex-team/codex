<div class="join-page">
    <? if (!empty($success)): ?>
        <div class="join-page__success">
            <div class="join-page__success-inner">
                <h2>Thanks!</h2>
                <p>We've received your request. We will message you.</p>
                <!--
                <p>We've received your request. Joining opened till September 20, after that we will message you. </p>
                -->
            </div>
        </div>
    <? endif ?>

    <div class="join-page__logo">
        <? include(DOCROOT . 'public/app/img/codex-logo.svg'); ?>
    </div>

    <div class="join-page__content center_side clearfix">
        <? /*
        <div class="read-in join-page__read-in">
            Read in
            <a class="read-in-item read-in-item--russian" href="<?= "/join?lang=ru" ?>">Russian</a>
        </div> */ ?>

        <h1>
            Join CodeX
        </h1>
        <p>
            CodeX is a coding club. It gathers passionate people interested in web-development, design, and learning new technologies at practice.
        </p>
        <p>
            We create and launch full-featured products on the Internet. Once a year we open our doors for new people.
        </p>
        <h2>
            Who are we looking for
        </h2>
        <p>
            It would be a pleasure to become acquainted if you want to learn one of the following categories or all of them.
        </p>
        <ul>
            <li>
                Web-development (Frontend, Backend, DevOps)
            </li>
            <li>
                Mobile development
            </li>
            <li>
                UI and UX
            </li>
            <li>
                QA engineering
            </li>
            <li>
                Marketing
            </li>
        </ul>
        <h2>
            Requirements
        </h2>
        <p>
            We don't study the basics. Everyone is learning technologies by himself. In a team, we apply and develop acquired skills on real tasks at our projects. Hence the first requirement:
        </p>
        <ul>
            <li>
                Presence of basic skills
            </li>
        </ul>
        <p>
            We work much, sleep a little. That's not quite easy, second requirement:
        </p>
        <ul>
            <li>
                Be ready to have a high workload.
            </li>
        </ul>
        <p>
            The key factor is your enthusiasm. In exchange, you will get a huge amount of experience, new skills, interesting and hard projects, an opportunity to take part in creating and launching world market products.
        </p>
        <p>
            To apply, enter email, so we can contact you, and fill a little form. Also, please write where are you from.
        </p>
        <!--
        <section class="join-component join-component--compact">
            <div class="join-component__label">
                Until the deadline
            </div>

            <time class="join-component__time">
                <span data-time="days" class="join-component__time-item">
                    <?//= $joinTimeLeft['days_left'] ?>
                </span>
                <span class="join-component__time-delimiter"></span>
                <span data-time="hrs" class="join-component__time-item">
                    <?//= $joinTimeLeft['hours_left'] ?>
                </span>
                <span class="join-component__time-delimiter join-component__time-delimiter--blinking"></span>
                <span data-time="mins" class="join-component__time-item">
                    <?//= $joinTimeLeft['minutes_left'] ?>
                </span>
            </time>
        </section>
        -->

        <? include __DIR__ . '/../blocks/form-join.php'; ?>
    </div>
</div>
