<div class="header_text">
    <? if ($user->id): ?>
        Добрый день, <a href="/user/<?= $user->id ?>"><?= $user->name; ?></a>
    <? endif; ?>
    <br>
    <? var_dump($user->id); ?>
</div>

<div class="m_logo_wrap">
    <div class="m_logo"></div>
    <a href="/article">Статьи</a>
    <a href="/join">Подать заявку</a>
    <a href="/task">Задания</a>

    <? if ($user->id): ?>
        <a href='/auth/logout'>Выход</a>
    <? else: ?>
        <a href='/auth/vk'>Вход VK</a>
    <? endif; ?>

</div>