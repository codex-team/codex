<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $title; ?></title>
</head>
<body>
    <div>
        <h1><?= $title; ?></h1>
        <p><?= $message; ?></p>
    </div>

    <a href="/">Перейти на главную</a>
    <a href="#" onclick="history.back();">Назад</a>
</body>
</html>
