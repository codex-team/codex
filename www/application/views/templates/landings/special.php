<link rel="stylesheet" href="/public/app/landings/special/special.css?v=<?= filemtime("public/app/landings/special/special.css") ?>">
<div class="center_side">
    <div class="landing">
        <h1 class="landing__header">CodeX Special</h1>
        <p class="landing__description">Модуль для создания контрастной версии сайта</p>
        <div class="landing__tryout"></div><br/>
        <div class="landing__special_toolbar" id="js-codex-special"></div><br/>
        <a class="landing__repo_link" target="_blank" href="https://github.com/codex-team/codex.special"><i class="icon-github-circled"></i>Get it for free</a>
    </div>
</div>

<script src="/public/extensions/codex.special/codex-special.v.1.0.min.js"></script>

<script type="text/javascript">
    codexSpecial.init({
        blockId : 'js-codex-special',
        lang : 'en',
    });
</script>
