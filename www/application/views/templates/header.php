<header class="site-header">
    <div class="site-header__content center_side">
        <a class="site-header__menu-item" href="/">
            CodeX
        </a>
        <a class="site-header__menu-item" href="/articles">
            Articles
        </a>
        <a class="site-header__social mobile-hide" href="//vk.com/codex_team" target="_blank">
            <i class="icon-vkontakte"></i>
        </a>
        <? if ($user->id): ?>
            <div class="site-header__right">
                <? if ($user->isAdmin): ?>
                    <? if (!empty($articleEditLink)): ?>
                        <a class="site-header__action site-header__action--edit mobile-hide" href="<?= $articleEditLink ?>">
                            <i class="icon-pencil"></i>
                            Edit
                        </a>
                    <? else: ?>
                        <a class="site-header__action site-header__action--write mobile-hide" href="/article/writing">
                            <i class="icon-pencil"></i>
                            Write
                        </a>
                    <? endif ?>
                <? endif ?>
                <a href="/user/<?= $user->id ?>">
                    <img class="site-header__photo" src="<?= HTML::chars($user->photo) ?>" alt="<?= HTML::chars($user->name) ?>" id="header-avatar-updatable" />
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
