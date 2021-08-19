<style>
    body {
        background: #000;
    }
    .site-footer, .site-header {
        background: #000;
    }
</style>
<link rel="stylesheet" href="/public/app/landings/media/media.css?v=<?= filemtime("public/app/landings/media/media.css") ?>">
<div class="center_side">
    <div class="codex-media">
        <a class="codex-media__logo" href="//codex.so" title="CodeX Team">
            <? include_once(DOCROOT . 'public/app/img/codex-logo.svg'); ?>
        </a>
        <h1 class="codex-media__title">CodeX Media</h1>
        <div class="codex-media__caption">Бесплатный движок для сайтов школ</div>

        <ul class="codex-media__advants">
            <li>Удобное управление страницами и меню</li>
            <li>Блоги преподавателей и учеников</li>
            <li>Простота публикации образовательных и административных материалов</li>
        </ul>

        <a class="codex-media__link" target="_blank" href="//school332.ru">Пример</a>
        <a class="codex-media__link" href="//github.com/codex-team/codex.media">Исходный код</a>

        <footer class="codex-media__footer clearfix">
            <a class="codex-media__mail-link" href="mailto:team@codex.so?subject=CodeX Media">Подключить свою школу</a>
            <div class="codex-media__footer-caption">St. Petersburg, Russia</div>
        </footer>

    </div>
</div>
