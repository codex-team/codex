<div class="header_text">
    <? if ($auth->is_authorized()): ?>
        Добрый день, <a href="/user/<?= $user->id ?>"><?= $user->name; ?></a>
    <? endif; ?>
</div>

<?
    /** Dao MySQL Test */
    $userId  = 1;
    $daoTest = Dao_Users::select()->where('id', '=', $userId)->limit(1)->execute();
    $daoTestCachedDefault = Dao_Users::select()->where('id', '=', $userId)->limit(1)->cached(Date::MINUTE * 5)->execute();
    $daoTestCachedMemcache = Dao_Users::select()->where('id', '=', $userId)->limit(1)->cached(Date::MINUTE * 5, $userId, array('userById'))->execute();
?>
<?= Debug::vars( $daoTest ); ?>
<?= Debug::vars( $daoTestCachedDefault ); ?>
<?= Debug::vars( $daoTestCachedMemcache ); ?>

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
        <a href='/auth/facebook'>Вход FB</a>
    <?php endif; ?>

</div>
