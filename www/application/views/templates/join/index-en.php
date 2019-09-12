<div class="join-page">
    <? if (!empty($success)): ?>
        <div class="join-page__success">
            <div class="join-page__success-inner">
                <h2>Thanks!</h2>
                <p>We've received your request. Joining opened till September 22, after that we will message you. </p>
            </div>
        </div>
    <? endif ?>

    <div class="join-page__logo">
        <? include(DOCROOT . 'public/app/img/codex-logo.svg'); ?>
    </div>

    <div class="join-page__content center_side clearfix">
        <h1>
            Join CodeX
        </h1>
        <p>
            CodeX is a coding club. It gathers students interested in web-development, design and learning new technologies at practice.
        </p>
        <p>
            We create and launch full-featured products in the Internet. Once a year we open our doors for new people.
        </p>
        <h2>
            Who are we looking for
        </h2>
        <p>
            It would be a pleasure to become acquainted, if you want to learn one of the following categories, or all of them.
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
            We don't study basics. Everything is learned by yourself. In team we apply and develop acquired skills on real tasks and projects. Hence the first requirement:
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
            The key factor is your enthusiasm. In exchange, you will get huge amount of experience, new skills, interesting and hard projects, an opportunity to take part in creating and launching world market products.
        </p>
        <p>
            To apply, authorize via VK or enter email, so we can contact you. Also fill a little form.
        </p>

        <section class="join-component join-component--compact">
            <div class="join-component__label">
                Until the deadline
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
        </section>

        <? if ( !$request ): ?>
            <form class="join-page__form" id="joinBlank" method="post" action="/join">

                <input type="hidden" name="csrf" value="<?= Security::token() ?>">

                <? if (!empty($error)): ?>
                    <div class="join-page__error">
                        Enter an email, so we can message you.
                    </div>
                <? endif ?>

                <? if ($user->id): ?>

                    <div class="join-page__user">
                        <img class="join-page__user-photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>"/>
                        <span class="join-page__user-name"><?= $user->name ?></span>
                    </div>

                <? else: ?>

                    <div class="join-page__auth" id="js-join-auth">
                        <a class="join-page__auth-vk-button" href="/auth/vk">
                            <? include(DOCROOT . 'public/app/img/vk-logo.svg'); ?>
                            Authorize
                        </a>
                        or
                        <span class="join-page__auth-show-email" id="blankShowAdditionalFieldsButton">
                            enter email
                        </span>
                    </div>

                <? endif ?>

                <div class="hide" id="blankAdditionalFields">
                    <label for="name">
                        Name and surname
                    </label>
                    <input class="input" type="text" name="name" id="name" value="<?= Arr::get($_POST, 'name') ?>">
                    <label for="js-email">
                        Email
                    </label>
                    <input class="input" type="email" name="email" id="js-email" autocomplete="off">
                </div>

                <label for="skills">Tell us about your skills</label>
                <textarea class="input" name="skills" id="skills" rows="5" required=""><?= Arr::get($_POST, 'skills') ?></textarea>

                <label for="wishes">What would you like to do in the club?</label>
                <textarea class="input" name="wishes" id="wishes" rows="5"><?= Arr::get($_POST, 'wishes') ?></textarea>

                <input class="button button--master" type="submit" id="blankSendButton" value="Send" />

            </form>

        <? else: ?>

            <? $lastRequest = array_pop($request); ?>

            <h4>Your application is sent</h4>

            <? if (!empty($lastRequest['skills'])): ?>

                <h5>Your skills</h5>
                <p><?= $lastRequest['skills'] ?></p>

            <? endif ?>

            <? if (!empty($lastRequest['wishes'])): ?>

                <h5>Wishes</h5>
                <p><?= $lastRequest['wishes'] ?></p>

            <? endif ?>

            <div class="join-page__success join-page__success--compact">
                We will message you after the application deadline.
            </div>

        <? endif ; ?>

        <div data-module="join">
            <textarea name="module-settings" hidden>
                {}
            </textarea>
        </div>
    </div>
</div>
