<div class="header_text">
    <?php if ($auth->is_guest()): ?>
        Добрый день, <?= $auth->get_profile()->first_name; ?>
    <?php endif; ?>
</div>

<div class="m_logo_wrap">
    <div class="m_logo"></div>
    <a href="/article">Статьи</a>
      <a href="/join">Подать заявку</a>
        <a href="/task">Задания</a>

    <?php if (!$auth->is_guest()): ?>
        <a href='/auth/vk'>Вход VK</a>
    <?php else: ?>
        <a href='/auth/logout'>Выход</a>
    <?php endif; ?>

</div>