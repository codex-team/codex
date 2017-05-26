<!DOCTYPE html>
<html>
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


    <link rel="stylesheet" href="/public/build/bundle.css">
    <link rel="stylesheet" href="/public/build/bundle.css?v=<?= filemtime('public/build/bundle.css') ?>">

    <link rel="icon" type="image/png" href="/public/img/fav_shield@3x.png?v=985" id="favicon" />

    <meta id="metaImage" name="image" property="og:image"  content="https://ifmo.su/public/img/meta_img.png" />
    <link id="linkImage" rel="image_src" href="https://ifmo.su/public/img/meta_img.png" />

    <script src="/public/build/bundle.js?v=<?= filemtime('public/build/bundle.js') ?>"></script>

</head>
<body>

    <header class="site-header">
        <div class="center_side">
            <? if ($user->id): ?>
                <a class="site-header__profile" href="/user/<?= $user->id ?>">
                    <img class="site-header__profile_photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>" id="header-avatar-updatable" />Profile
                </a>
                <? if ($user->isAdmin): ?>
                    <a class="site-header__button" href="/article/add"><i class="icon-pencil"></i>Write</a>
                <? endif ?>
            <? else: ?>
                <a class="site-header__login" href="/auth/github">
                    <i class="icon-github-circled"></i>login
                </a>
            <? endif ?>
            <div class="site-header__menu">
                <a href="/">CodeX</a>
                <a href="/articles">Articles</a>
                <a href="/contests">Contests</a>
            </div>
            <a class="site-header__social" href="//vk.com/codex_team" target="_blank"><i class="icon-vkontakte"></i></a>
        </div>
    </header>

    <?= $content ?>

    <footer class="site-footer">
        <div class="center_side clearfix">
            <section class="site-footer__section fl_l">
                <h5><a href="/">CodeX</a></h5>
                Клуб веб-разработки, дизайна и маркетинга. Мы строим команду молодых специалистов, способную создавать полноценные проекты в интернете на мировом уровне.
            </section>
            <section class="site-footer__section fl_r">
                <h5>Follow us</h5>
                <ul>
                    <li><a href="//vk.com/codex_team" target="_blank" rel="nofollow"><i class="icon-vkontakte"></i> <u>ВКонтакте</u></a></li>
                    <li><a href="//instagram.com/codex_team/" target="_blank" rel="nofollow"><i class="icon-instagram"></i> <u>Instagram</u></a></li>
                </ul>
            </section>
            <section class="site-footer__section fl_l">
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

    <script>
        codex.docReady(function () {
            codex.init();
        });
    </script>


    <? if ($user->id): ?>
        <div id="utils" class="hidden" style="display: none">
            <iframe name="transport"></iframe>
            <form class="ajaxfree" id="transportForm" method="post" enctype="multipart/form-data"  target="transport" action="/ajax/transport" accept-charset="utf-8" >
                <input type="file" name="files" id="transportInput"/>
            </form>
        </div>
    <? endif; ?>

    <? if ( Arr::get($_SERVER, 'SERVER_NAME') == 'ifmo.su'): ?>
        <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter32652805 = new Ya.Metrika({ id:32652805, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="https://mc.yandex.ru/watch/32652805" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <script type="text/javascript">(window.Image ? (new Image()) : document.createElement('img')).src = location.protocol + '//vk.com/rtrg?r=r/h9TMw6W*8InHxVrFZ4tmb*x6Z5C3xX8BdMxOLhjmn9fIv51wjPMiGmbHGJJd7sOl87xLCs94644RwgS0o2PeBS*/xssAPVS1zN/LOx/HWw2kLUkcg0ELryq4QZF0IJtKIs0pJyo6/*z0qgpPsNl0u8pQPEQ12R4jrwKFQZK4k-';</script>
    <? endif; ?>


    <script src="/public/extensions/emoji-parser/specc-emoji.js?v=<?= filemtime('public/extensions/emoji-parser/specc-emoji.js') ?>"></script>

    <script>

        codex.docReady(function () {

            Emoji.parse();

        });

    </script>

</body>
</html>
