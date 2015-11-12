<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">

<div class="columns">
	<div class = "first_column">
	<?//= Debug::vars($article_list);?>
        <? if ($auth->is_authorized() && empty($userId)): ?>
		<p>Имя: <?= $auth->get_profile()->first_name .
			    $auth->get_profile()->last_name; ?> </p>
        <? elseif ( isset($error) ): ?>
    	    <p><?= $error; ?></p>
    	    <form action="">
                <p><label for="login">Логин</label></p>
    	        <p><input type="text" id="login"></p>
    	        <p><label for="login">Пароль</label></p>
    	        <p><input type="password" id="password"></p>
    	        <p><input type="submit" value="Войти"></p>
    	    </form>
        <? else: ?>
	        <p><img src = <?= $user->photo ?> width=100%></p>
    	    <p class="userName">Имя: <?= $user->name ?> </p>
    	    <p>Дата регистрации: <?= $user->dt_create ?> </p>
    	    <p>Идентификатор пользователя: <?= $user->id; ?> </p>
    	    <!--<p>Идентификатор vk: <?= $user->vk_id; ?> </p>-->
    </div>
    <div class = "second_column">
    	<div class="article_list">
    	    <p>Список статей:</p>
    	    <?//= Debug::vars($article_list);?>
    	        <?if( !empty($article_list) ): ?>
    	        <? foreach ($article_list as $titleList): ?>
    	        <?// foreach ($titleList as $title): ?>
    	            <p><a href=<?= '/article/' . $titleList['id'] ?> > <?= $titleList['title'] ?></a></p>
    	        <?// endforeach; ?>
    	        <? endforeach; ?>
                <? else: ?>
                    <?//= $empty_article; ?>
                <? endif; ?>
        </div>
        <? endif; ?>
    </div>
</div>
</div>
