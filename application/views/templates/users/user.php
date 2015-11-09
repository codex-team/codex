<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">
	<div class = "first_column">
		<? if ($auth->is_authorized()): ?>
			<p>Имя: <?= $auth->get_profile()->first_name . $auth->get_profile()->last_name; ?> </p>
		<? elseif ( isset($error) ): ?>
			<p><?= $error; ?></p>
		<? else: ?>
		<p><img src = <?= $user->photo ?> ></p>
		<p>Имя: <?= $user->name ?> </p>
		<p>Дата регистрации: <?= $user->dt_create ?> </p>
		<p>Идентификатор пользователя: <?= $user->id; ?> </p>
		<!--<p>Идентификатор vk: <?= $user->vk_id; ?> </p>-->
	</div>
	<div class = "second_column">
		<p>Список статей:</p>
		<?//= Debug::vars($user);//foreach ($user->article_title as $article): ?>
		<!--<a href ="" ><?= $user->article_title; ?></a>-->
		<?//endforeach; ?>
	</div>
	<? endif; ?>
</div>