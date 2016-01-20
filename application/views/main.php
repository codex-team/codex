<!DOCTYPE html>
<html class="no-js" xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?= substr(I18n::$lang, 0, 2); ?>" lang="<?= substr(I18n::$lang, 0, 2); ?>">
<head>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="language" content="<?= I18n::$lang ?>" />
    <title><?= $title ?></title>
    <meta property="og:title" content="<?= $title ?>" />
    <meta property="og:site_name" content="<?= $GLOBALS['SITE_NAME'] ?>" />

    <meta name="description" property="og:description" content="<?= $description ?>">
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
    <? /*
    <link rel="stylesheet" href="/public/css/articles.css?v=<?= filemtime("public/css/articles.css") ?>">
    <link rel="stylesheet" href="/public/css/admin.css?v=<?= filemtime("public/css/admin.css") ?>">
    */ ?>
    <link rel="stylesheet" href="/public/extensions/codex.editor/editor.css?v=<?= filemtime("public/extensions/codex.editor/editor.css") ?>">
    <link rel="icon" type="image/png" href="/public/img/fav_shield@3x.png?v=985" id="favicon" />

    <meta id="metaImage" name="image" property="og:image"  content="https://ifmo.su/img/meta_img.png" />
    <link id="linkImage" rel="image_src" href="https://ifmo.su/img/meta_img.png" />

</head>
<body>

    <header class="site_header">
        <div class="center_side clearfix">
            <? if ($user->id): ?>
                <a class="profile fl_r" href="/user/<?= $user->id ?>">
                    <span class="ava"><img src="<?= $user->photo ?>" alt="<?= $user->name ?>" id="header-avatar-updatable" /></span>
                    <span class="text">Profile</span>
                </a>
            <? else: ?>
                <a class="icon_link login fl_r" href="/auth/github">
                    <i class="icon-github-circled"></i><span class="text">login</span>
                </a>
            <? endif ?>
            <div class="site_menu fl_l">
                <a href="/">CodeX</a>
                <a href="/articles">Articles</a>
            </div>
            <div class="social_buttons">
                <a class="icon_link social" href="//vk.com/codex_team" target="_blank"><i class="icon-vkontakte"></i></a>
            </div>
        </div>
    </header>

    <?= $content ?>

    <footer class="site_footer">
        <div class="center_side clearfix">
            <section class="fl_l codex_desc">
                <h5>CodeX</h5>
                <p>Клуб веб-разработки, дизайна и маркетинга. Мы строим команду молодых специалистов, способную создавать полноценные проекты в интернете на мировом уровне.</p>
            </section>
            <section class="fl_r">
                <h5>Follow us</h5>
                <ul>
                    <li><a href="//vk.com/codex_team" target="_blank" rel="nofollow"><i class="icon-vkontakte"></i> <u>ВКонтакте</u></a></li>
                    <li><a href="//instagram.com/codex_team/" target="_blank" rel="nofollow"><i class="icon-instagram"></i> <u>Instagram</u></a></li>
                </ul>
            </section>
            <section class="fl_l">
                <h5>Contact team</h5>
                <ul>
                    <li><a href="mailto:team@ifmo.su?Subject=CodeX%20Team"><u>team@ifmo.su</u></a></li>
                    <!--googleoff: all-->
                    <!--noindex-->
                        <li><a href="mailto:specc.dev@gmail.com?Subject=CodeX%20Team" rel="nofollow"><u>specc.dev@gmail.com</u></a> <span class="desclimer">— Савченко Петр</span></li>
                    <!--/noindex-->
                    <!--googleon: all-->
                </ul>
            </section>
        </div>
    </footer>

    <div id="utils" class="hidden">
        <iframe name="transport"></iframe>
        <form class="ajaxfree" id="transportForm" method="post" enctype="multipart/form-data"  target="transport" action="/ajax/transport" accept-charset="utf-8" >
            <input type="file" name="files" id="transportInput"/>
        </form>
    </div>


    <script src="/public/js/main.js?v=<?= filemtime("public/js/main.js") ?>"></script>
    <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter32652805 = new Ya.Metrika({ id:32652805, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="https://mc.yandex.ru/watch/32652805" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
</body>
</html>