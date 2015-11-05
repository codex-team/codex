<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
            <a href="/article">Статьи</a>
        </div>
    </div>
</div>
<div class="center_side clear">
    <p><img src="<?= $userPhoto ?>" alt="" width = 100%></p>
    <p>Идентификатор пользователя: <?= $userId ?></p>
    <p>Имя: <?= $firstName ?> </p>
    <p>Фамилия: <?= $secondName ?></p>
    <p>Возраст: <?= $age ?></p>
    <p>Дата регистрации: <?= $regDate ?></p>
    <p>Информация о себе: <?= $info ?></p>
</div>