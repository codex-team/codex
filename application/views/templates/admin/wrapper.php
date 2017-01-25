<link rel="stylesheet" href="/public/css/admin.css?v=<?= filemtime("public/css/admin.css") ?>">
<div class="center_side">
    <ul class="page_menu">
        <li><a href="/admin/users">Users</a></li>
        <li><a href="/admin/articles">Articles</a></li>
        <li><a href="/admin/feed">Feed</a></li>
        <li><a href="/admin/contests">Contests</a></li>
        <li><a href="/admin/courses">Courses</a></li>
        <li><a href="/admin/requests">Requests</a></li>
    </ul>
</div>
<?= $content ?>