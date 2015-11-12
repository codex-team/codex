<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
            <a href="/admin/article"
                <? if ($active == 'allArticles') {
                    echo 'class="current"';
                }; ?>>
                Статьи
            </a>
            <a href="/admin/users"
                <? if ($active == 'allUsers') {
                    echo 'class="current"';
                }; ?>>
                Пользователи
            </a>
        </div>
    </div>
</div>

<?= $content ?>