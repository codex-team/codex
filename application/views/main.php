<!DOCTYPE html>
<html class="no-js" xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?= substr(I18n::$lang, 0, 2); ?>" lang="<?= substr(I18n::$lang, 0, 2); ?>">
<head>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="language" content="<?= I18n::$lang ?>" />
    <title><?= $title ? $title : $GLOBALS['SITE_NAME'] ?></title>
    <meta property="og:title" content="<?= $GLOBALS['SITE_NAME'] ?>" />
    <meta property="og:site_name" content="<?= $GLOBALS['SITE_NAME'] ?>" />

    <meta name="description" property="og:description" content="Сайт клуба веб-разработки CodeX в НИУ ИТМО">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">

    <link href='https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700,700italic&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    <? /*
        <link href='http://fonts.googleapis.com/css?family=PT+Serif+Caption&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    */ ?>

    <link rel="stylesheet" href="/public/css/normalize.css">
    <link rel="stylesheet" href="/public/css/main.css?v=<?= filemtime("public/css/main.css") ?>">
    <link rel="icon" type="image/png" href="/public/img/fav_round.png?v=994" id="favicon" />

    <meta id="metaImage" name="image" property="og:image"  content="https://ifmo.su/img/meta_img.png" />
    <link id="linkImage" rel="image_src" href="https://ifmo.su/img/meta_img.png" />

</head>
<body <? if ($_SERVER['REQUEST_URI'] == '/') {echo 'class="black_land"';}; ?>>

    <? /** Template content */ ?>
    <?= $content ?>

    <script src="/public/js/main.js?v=<?= filemtime("public/js/main.js") ?>"></script>
    <? /*
        <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter32652805 = new Ya.Metrika({ id:32652805, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="https://mc.yandex.ru/watch/32652805" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    */?>
</body>
</html>