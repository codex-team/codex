<div class="center_side">
    <div class="profile">

        <div class="profile-ava">

            <img class="profile-ava__photo" src="<?= htmlspecialchars($viewUser->photo) ?>" alt="<?= htmlspecialchars($viewUser->name) ?>">

            <? if ($isMyPage): ?>
                <a class="profile-ava__settings" href="/user/settings" title="Profile settings"><i class="gear"></i></a>
            <? endif; ?>

        </div>

        <h1 class="profile__name"><?= $viewUser->name ?></h1>

        <? if ($viewUser->bio): ?>
            <div class="profile__bio"><?= $viewUser->bio ?></div>
        <? endif; ?>

        <? if ($viewUser->vk_uri || $viewUser->vk_id): ?>
            <a class="profile__social vk" href="//vk.com/<?= htmlspecialchars($viewUser->vk_uri ? $viewUser->vk_uri : 'id'.$viewUser->vk_id) ?>" target="_blank"><i class="icon-vkontakte"></i></a>
        <? endif; ?>
        <? if ($viewUser->github_uri): ?>
            <a class="profile__social github <?= empty($viewUser->instagram_uri) ? 'profile__social_no_isnta' : ''  ?>" href="//github.com/<?= htmlspecialchars($viewUser->github_uri) ?>" target="_blank"><i class="icon-github-circled"></i></a>
        <? endif ?>
        <? if ($viewUser->instagram_uri): ?>
            <a class="profile__social instagram" href="//instagram.com/<?= htmlspecialchars($viewUser->instagram_uri) ?>" target="_blank"><i class="icon-instagram"></i></a>
        <? endif; ?>

        <? if ($join_requests): ?>
            <div class="profile_join_requests">Заявка на вступление рассматривается</div>
        <? endif ?>

        <? if ($isMyPage): ?>
            <br />
            <a class="profile__logout" href="/auth/logout">Logout</a>
        <? endif; ?>
    </div>
</div>

<? if ($feed_items): ?>
    <div class="center_side">
        <div class="feed">
            <?= View::factory('templates/articles/list', array( 'feed_items' => $feed_items )); ?>
        </div>
    </div>
<? endif ?>