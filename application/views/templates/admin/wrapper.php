<link rel="stylesheet" href="/public/css/admin.css?v=<?= filemtime("public/css/admin.css") ?>">
<div class="center_side">
    <ul class="page_menu">
        <li><a href="/admin/users">Users</a></li>
        <li><a href="/admin/articles">Articles</a></li>
        <a href="#"><label><input type="checkbox">Показывать только активные</label></a>
    </ul>
</div>
<?= $content ?>