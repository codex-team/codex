<div class="center_side clear">
    <? if (count($users) == 0): ?>
        <article class="article">
            <p>Здесь пока нет пользователей.</p>
        </article>
    <? else: ?>
        <? foreach ($users as $user): ?>
            <? if ($user['is_removed'] == 0): ?>
                 <p><?= $user['name'] ?></p>
            <? endif; ?>
        <? endforeach; ?>   
    <? endif; ?>
</div>