<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="language" content="<?= I18n::$lang ?>" />
    <title><?= HTML::chars($title) ?></title>
    <meta property="og:title" content="<?= HTML::chars($title) ?>" />
    <meta property="og:site_name" content="<?= $GLOBALS['SITE_NAME'] ?>" />

    <meta name="description" property="og:description" content="<?= HTML::chars($description) ?>">

    <? if ($nofollow): ?>
        <meta name="robots" content="noindex, nofollow" />
    <? endif; ?>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">

    <link rel="stylesheet" href="/public/build/codex.bundle.css?v=<?= filemtime('public/build/codex.bundle.css') ?>">
    <link rel="icon" type="image/png" href="/public/app/img/fav_shield@3x.png?v=985" id="favicon" />

    <meta name="telegram:channel" content="@codex_team">

    <? if (isset($meta)): ?>
        <? /** @var \Opengraph\Meta $meta_item */ ?>
        <? foreach ($meta as $meta_item): ?>
            <?= $meta_item->render(); ?>
        <? endforeach; ?>
    <? endif; ?>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
    <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-180x180.png" />

    <? if (!empty($_SERVER['HAWK_TOKEN'])): ?>
        <script src="/public/build/hawk.bundle.js?v=<?= filemtime('public/build/hawk.bundle.js') ?>" onload="hawk.init('<?= $_SERVER['HAWK_TOKEN'] ?>');" async></script>
    <? endif; ?>

</head>
<body>
    <?
      $headerVars = array();
      $headerVars['articleEditLink'] = isset($articleEditLink) ? $articleEditLink : '';
    ?>
    <?= View::factory('templates/header', $headerVars)->render(); ?>

    <?= $content ?>

    <footer class="site-footer">
        <div class="center_side clearfix">
            <section class="site-footer__section">
                <h5><a href="/">CodeX</a></h5>
                Club of web-development, design and marketing. We build team learning how to create full-valued products on the global market.
            </section>
            <section class="site-footer__section site-footer__section--contacts">
                <h5>Contact team</h5>
                <ul>
                    <li><a href="mailto:all@codex.so?Subject=CodeX%20Team"><u>all@codex.so</u></a></li>
                    <!--googleoff: all-->
                    <!--noindex-->
                        <li><a href="mailto:specc.dev@gmail.com?Subject=CodeX%20Team" rel="nofollow"><u>specc.dev@gmail.com</u></a> <span class="desclimer">— Petr Savchenko</span></li>
                    <!--/noindex-->
                    <!--googleon: all-->
                </ul>
            </section>
            <section class="site-footer__section">
                <h5>Follow us</h5>
                <ul>
                    <? if (LANG === 'en'): ?>
                        <li><a href="//twitter.com/codex_team" rel="nofollow" target="_blank"><i class="icon-twitter"></i> <u>Twitter</u></a></li>
                    <? else: ?>
                        <li><a class="deeplinker" href="//vk.com/codex_team" rel="nofollow" target="_blank" data-app-link="vk://vk.com/codex_team"><i class="icon-vkontakte"></i> <u>ВКонтакте</u></a></li>
                    <? endif;?>
                    <li><a class="deeplinker" href="//instagram.com/codex_team/" rel="nofollow" target="_blank" data-app-link="instagram://user?username=codex_team"><i class="icon-instagram"></i> <u>Instagram</u></a></li>
                </ul>
            </section>
        </div>
    </footer>

    <? if ($user->id): ?>
        <div id="utils" class="hidden" style="display: none">
            <iframe name="transport"></iframe>
            <form class="ajaxfree" id="transportForm" method="post" enctype="multipart/form-data"  target="transport" action="/ajax/transport" accept-charset="utf-8" >
                <input type="file" name="files" id="transportInput"/>
            </form>
        </div>
    <? endif; ?>

    <? if ( Arr::get($_SERVER, 'SERVER_NAME') == 'codex.so'): ?>
        <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter32652805 = new Ya.Metrika({ id:32652805, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="https://mc.yandex.ru/watch/32652805" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <script type="text/javascript">(window.Image ? (new Image()) : document.createElement('img')).src = location.protocol + '//vk.com/rtrg?r=r/h9TMw6W*8InHxVrFZ4tmb*x6Z5C3xX8BdMxOLhjmn9fIv51wjPMiGmbHGJJd7sOl87xLCs94644RwgS0o2PeBS*/xssAPVS1zN/LOx/HWw2kLUkcg0ELryq4QZF0IJtKIs0pJyo6/*z0qgpPsNl0u8pQPEQ12R4jrwKFQZK4k-';</script>
    <? endif; ?>

    <script onload="codex.init();" src="/public/build/codex.bundle.js?v=<?= filemtime('public/build/codex.bundle.js') ?>" defer></script>

    <script onload="Emoji.parse();" src="/public/extensions/emoji-parser/specc-emoji.js?v=<?= filemtime('public/extensions/emoji-parser/specc-emoji.js') ?>" defer></script>

</body>
</html>
