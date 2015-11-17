<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">

<div class="columns">
    <div class = "firstColumn">
        <div class="mainInfo">
        	<? if ( !$user->is_empty() ): ?>
            	<img src="<?= $user->photo ?>" class="userPhoto">
            	<?= $user->name; ?></br>
            	Дата регистрации: <?= $user->dt_create ?></br>
                <? if ( !empty($user->vk_id) ): ?>
                    vk.com <a href="<?= "//vk.com/id" . $user->vk_id; ?>" ><?= $user->name ?></a></br>
                <? endif; ?>
                <? if ( !empty($user->fb_id) ): ?>
                    facebook.com <a href="<?= "//facebook.com/" . $user->fb_id; ?>" ><?= $user->name ?></a>
                <? endif; ?>
        	<? elseif( !empty($user_id) ): ?>
            		<p>Такого пользователя не существует.</p>
        	<? else: ?>
            		<p>Пожалуйста <a href="/auth/vk">авторизуйтесь</a>.</p>
        	<? endif; ?>
        </div>
    </div>
    <div class="secondColumn">
        <div class="articleList">
        <? if ( !$user->is_empty() ): ?>
            <p class="headerList">Список статей:</p>
            <ul class="boxList">
            <?if ( !empty($article_list) ): ?>
                <? foreach ($article_list as $article): ?>
                    <li><a href="<?= '/article/' . $article->id ?>" > <?= $article->title ?></a></li>
                <? endforeach; ?>
            </ul>
            <? endif; ?>
       <? endif; ?>
       </div>
    </div>
</div>
