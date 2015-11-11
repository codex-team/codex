<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">
    <?php if ($user->is_empty()): ?>
        <p>Авторизуйтесь, чтобы выполнить данное действие.</p>
    <?php else: ?>
        Информация о пользователе <?= $user->name; ?>
    <?php endif; ?>
</div>

