<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">

<div class="columns">
	<div class = "first_column">
        <? if ( !empty($user->vk_id) ): ?>
		<p><img src = <?= $user->photo ?> width=100%> </p>
		<p> Имя: <?= $user->name; ?> </p>
		<p> Дата регистрации: <?= $user->dt_create ?> </p>
		<p> vk.com: <a href = <?= "https://vk.com/id" . $user->vk_id; ?>><?= $user->name ?></a></p>
        <? elseif ( isset($error) ): ?>
    	    <p><?= $error; ?></p>
        <? endif; ?>
    	</div>
<div class = "second_column">
    	<div class="article_list">
	    <? if ( !empty($user->vk_id) ): ?>
    	    <p> Список ваших статей: </p>
    	        <?if ( !empty($article_list) ): ?>
    	        <? foreach ($article_list as $titleList): ?>
    	            <p><a href=<?= '/article/' . $titleList['id'] ?> > <?= $titleList['title'] ?></a></p>
    	        <? endforeach; ?>
		<? else: ?>
			<?= 'У вас еще нет статей.'?>
                <? endif; ?>
	    <? endif; ?>
        </div>
</div>
</div>
