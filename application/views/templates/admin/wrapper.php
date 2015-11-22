<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/admin/articles"
                <? if ($active == 'allArticles') {
                    echo 'class="current"';
                }; ?>>
                Articles
            </a>
            <a href="/admin/users"
                <? if ($active == 'allUsers') {
                    echo 'class="current"';
                }; ?>>
                Users
            </a>
        </div>
    </div>
</div>

<?= $content ?>