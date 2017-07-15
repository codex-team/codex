<header class="site-header">
    <div class="site-header__content center_side">
        <a class="site-header__menu-item" href="/">
            CodeX
        </a>
        <a class="site-header__menu-item" href="/articles">
            Articles
        </a>
        <a class="site-header__menu-item" href="/contests">
            Contests
        </a>
        <a class="site-header__social mobile-hide" href="//vk.com/codex_team" target="_blank">
            <i class="icon-vkontakte"></i>
        </a>
        <? if ($user->id): ?>
            <div class="site-header__right">
                <? if ($user->isAdmin): ?>
                    <a class="site-header__write mobile-hide" href="/article/add">
                        <i class="icon-pencil"></i>
                        Write
                    </a>
                <? endif ?>
                <a href="/user/<?= $user->id ?>">
                    <img class="site-header__photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>" id="header-avatar-updatable" />
                    Profile
                </a>
            </div>
        <? else: ?>
            <a class="site-header__right fl_r" href="/auth/github" rel="nofollow">
                <i class="site-header__github-icon icon-github-circled"></i>
                Login
            </a>
        <? endif ?>
    </div>
</header>