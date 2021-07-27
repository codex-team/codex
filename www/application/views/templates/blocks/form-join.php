<? if ( !$request ): ?>
    <form class="join-page__form" id="joinBlank" method="post" action="/process-join-form">

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
                <div>
                    <label for="name">
                        Your name
                    </label>
                    <input class="input" type="text" name="name" id="name" value="<?= HTML::chars(Arr::get($_POST, 'name')) ?>" required>

                    <label for="js-email">
                        Contact email
                    </label>
                    <input class="input" type="email" name="email" id="js-email" autocomplete="off" required>
                </div>
            <? endif ?>

            <label for="skills">Tell us about your skills</label>
            <textarea class="input" name="skills" id="skills" rows="5" required=""><?= Arr::get($_POST, 'skills') ?></textarea>

            <label for="wishes">What would you like to do in CodeX?</label>
            <textarea class="input" name="wishes" id="wishes" rows="5"><?= Arr::get($_POST, 'wishes') ?></textarea>

            <input class="input" type="text" name="targetTeam" hidden value="<?= isset($targetTeam) ? $targetTeam : 'main' ?>">

            <input class="button button--master" type="submit" id="blankSendButton" value="Send" />

        </form>

        <div class="join-page__success join-page__success--compact" id="success-message-banner" hidden>
            We will message you after the application deadline.
        </div>

<? else: ?>

    <? $lastRequest = array_pop($request); ?>

    <h4>Your application is sent:</h4>

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
