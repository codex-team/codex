<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">

<div class="columns">
	<div class = "first_column">

	<!--
	     Если пользователь авторизовался через вк, тогда выводим данные из вк
	     Если передан корректный user_id, тогда выводим данные из БД
	     Если передан некорректный user_id, тогда выводим ошибку и поле для авторизации
	-->

        <? if ($auth->is_authorized() && empty($userId)): ?>
		<p> Имя: <?= $auth->get_profile()->first_name .
			    $auth->get_profile()->last_name; ?> </p>
		<p> Дата регистрации: <?= $user->dt_create ?> </p>
		<p> vk.com: <a href = <?="https://vk.com/id" . $user->vk_id; ?> >
		<?= $auth->get_profile()->first_name . $auth->get_profile()->last_name; ?>
		</a></p>
        <? elseif ( isset($error) ): ?>
    	    <p><?= $error; ?></p>

    	    <form>
                <p><label for="login"> Логин </label></p>
    	        <p><input type="text" id="login"></p>
    	        <p><label for="login"> Пароль </label></p>
    	        <p><input type="password" id="password"></p>
    	        <p><input type="submit" value="Войти"></p>
    	    </form>

        <? else: ?>

	    <p><img src = <?= $user->photo ?> width=100%> </p>
    	    <p class="userName"> Имя: <?= $user->name ?> </p>
    	    <p> Дата регистрации: <?= $user->dt_create ?> </p>
    	    <p> vk.com: <a href = <?="https://vk.com/id" . $user->vk_id; ?> >
    	    <? if ($auth->is_authorized()): ?>
 		<?= $auth->get_profile()->first_name . $auth->get_profile()->last_name; ?>
 	    <?endif;?>
 	     </a></p>
 	<?endif;?>
    </div>
    <div class = "second_column">
    	<div class="article_list">

    	    <p> Список ваших статей: </p>
    	        <?if ( !empty($article_list) ): ?>
    	        <? foreach ($article_list as $titleList): ?>
    	            <p><a href=<?= '/article/' . $titleList['id'] ?> > <?= $titleList['title'] ?></a></p>
    	        <? endforeach; ?>
                <? endif; ?>

        </div>
    </div>
</div>
</div>
