<? if (!$viewUser->is_empty() ): ?>
    <div class="center_side">
        <div class="profile_page">

            <div class="ava_wrapper">
                <div class="ava">
                    <img src="<?= $viewUser->photo ?>" alt="<?= $viewUser->name ?>">
                </div>
                <? if ($isMyPage): ?>
                    <a class="settings" href="/user/settings" title="Profile settings"><i class="gear"></i></a>
                <? endif; ?>
            </div>

            <h1><?= $viewUser->name ?></h1>
            <? if ($viewUser->bio): ?>
                    <div class="bio"><?= $viewUser->bio ?></div>
                <? endif; ?>

            <? if ($viewUser->vk_uri || $viewUser->vk_id): ?>
                <a class="social_link vk" href="//vk.com/<?= $viewUser->vk_uri ? $viewUser->vk_uri : 'id'.$viewUser->vk_id ?>" target="_blank"><i class="icon-vkontakte"></i></a>
            <? endif; ?>
            <? if ($viewUser->github_uri): ?>
                <a class="nickname <?= empty($viewUser->instagram_uri) ? 'no_insta' : ''  ?>" href="//github.com/<?= $viewUser->github_uri ?>" target="_blank"><i class="icon-github-circled"></i></a>
            <? endif ?>
            <? if ($viewUser->instagram_uri): ?>
                <a class="social_link instagram" href="//instagram.com/<?= $viewUser->instagram_uri ?>" target="_blank"><i class="icon-instagram"></i></a>
            <? endif; ?>

            <? if ($join_requests): ?>
                <div class="profile_join_requests">Заявка на вступление рассматривается</div>
            <? endif ?>

            <? if ($isMyPage): ?>
                <br />
                <a class="logout" href="/auth/logout">Logout</a>
            <? endif; ?>
    </div>

    <? if ($articles): ?>
        <?= View::factory('templates/articles/list', array( 'articles' => $articles )); ?>
    <? endif ?>

<? else: ?>
    <div class="no_data">
        <h2>Пользователь не найден</h2>
        Возможно, профиль был удален создателем или администратором.
    </div>
<? endif; ?>
