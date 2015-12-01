<? if (!$viewUser->is_empty() ): ?>
    <div class="center_side">
        <div class="profile_page">
            <div class="ava">
                <img src="<?= $viewUser->photo ?>" alt="<?= $viewUser->name ?>">
            </div>
            <h1><?= $viewUser->name ?></h1>
            <? if (!empty($viewUser->github_uri)): ?>
                <a class="nickname" href="//github.com/<?= $viewUser->github_uri ?>" target="_blank">
                <i class="icon-github-circled"></i><?= $viewUser->github_uri ?></a><br/>
            <? endif ?>
            <? if (!empty($viewUser->bio)): ?>
                <div class="bio"><?= $viewUser->bio ?></div><br />
            <? endif; ?>
            <? if (!empty($viewUser->vk_uri)): ?>
                <a class="social_link vk" href="//vk.com/<?= $viewUser->vk_uri ?>" target="_blank">
                <i class="icon-vkontakte"></i> <?= $viewUser->vk_uri ?></a><br />
            <? endif; ?>
            <? if (!empty($viewUser->fb_uri)): ?>
                <a class="social_link vk" href="//facebook.com/<?= $viewUser->fb_uri ?>" target="_blank">
                <i class="icon-facebook-squared"></i><?= $viewUser->fb_uri ?></a><br />
            <? endif; ?>
            <? if (!empty($viewUser->instagram_uri)): ?>
                <a class="social_link instagram" href="//instagram.com/<?= $viewUser->instagram_uri ?>" target="_blank">
                <i class="icon-instagram"></i><?= $viewUser->instagram_uri ?></a><br />
            <? endif; ?>
            <? if ($isMyPage): ?>
                <a class="settings_link" href="/user/settings" target="_self">Настройки</a><br />
                <form action="/auth/logout">
                    <input type="submit" value="Выйти">
                </form>
            <? endif; ?>
        </div>
    </div>
<? else: ?>
    <div class="no_data">
        <h2>Пользователь не найден</h2>
        Возможно, профиль был удален создателем или администратором.
    </div>
<? endif; ?>
