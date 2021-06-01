<div class="center_side">
    <div class="landing">
        <h1 class="landing__header">CodeX Lab</h1>
        <p class="landing__description">LABLABLAB!!</p>
    </div>

    <?
        /**
         * Show auth form if user is not logged in
         */

        /** Debug variable for showing auth form */
        $FORCE_SHOW_AUTH_BUTTON = True;
    ?>
    <? if (!$user->id || $FORCE_SHOW_AUTH_BUTTON): ?>
        <div class="lab-page__telegram-auth-button">
            <? require __DIR__ . '/../auth/telegram.php'; ?>
        </div>
    <? endif; ?>
</div>
