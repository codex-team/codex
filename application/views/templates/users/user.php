<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
            <a href="/article">Статьи</a>
        </div>
    </div>
</div>
<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">  
	<div class = "first_column"> 
    	   <? if ($auth->is_authorized() && empty($userId)): ?>
    	<p>Имя: <?= $auth->get_profile()->first_name . $auth->get_profile()->last_name; ?> </p>
    	   <? elseif ( isset($error) ): ?>
    	<p><?= $error; ?></p>
    	   <? else: ?>
	<p><img src = <?= $user->photo ?> width=100%></p>
    	<p>Имя: <?= $user->name ?> </p>
    	<p>Дата регистрации: <?= $user->dt_create ?> </p>
    	<p>Идентификатор пользователя: <?= $user->id; ?> </p>
    	<!--<p>Идентификатор vk: <?= $user->vk_id; ?> </p>-->
    	</div>
    <div class = "second_column">
    	<p>Список статей:</p>
    	<? if( !empty($article_list) ): ?>
    	    <? foreach ($article_list as $title): ?>
    	        <p><a href=""><?= $title ?></a></p>
    	    <? endforeach; ?>
        <? else: ?>
            <?= $empty_article; ?>
        <? endif; ?>
    </div>
    	<? endif; ?>
</div>
