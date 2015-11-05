<div class="m_logo_wrap">
    <div class="m_logo"></div>
    <a href="/article">Статьи</a>
      <a href="/join">Подать заявку</a>
        <a href="/task">Задания</a>
    <?php
        /** === Auth usage example: === */
        $user = Oauth::instance('vkontakte')->get_profile();
    ?>

    <?php if ($user): ?>
        <a href='/auth/vk'>Вход VK</a>
    <?php else: ?>
        <a href='/logout'>Выход</a>
    <?php endif; ?>

</div>