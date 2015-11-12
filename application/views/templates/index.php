<div class="header_text">
    <? if ($auth->is_authorized()): ?>
        Добрый день, <a href="/user/<?= $user->id ?>"><?= $user->name; ?></a>
    <? endif; ?>
</div>

<div class="m_logo_wrap">
    <div class="m_logo"></div>
    <a href="/article">Статьи</a>
    <a href="/join">Подать заявку</a>
    <a href="/task">Задания</a>

    <? if ($user->id): ?>
        <a href='/auth/logout'>Выход</a><br>
        <a href="/admin/article" id="panel_link">Панель администратора</a>
    <? else: ?>
        <a href='/auth/vk'>Вход VK</a>
    <? endif; ?>

</div>
