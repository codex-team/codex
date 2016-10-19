<style type="text/css">

    /**
    * Landing page styles
    */
    .landing {
        padding-bottom: 60px;
        text-align: center;
    }

    .landing__header {
        margin: 130px 0 15px;
        font-size: 61px;
        line-height: 1.3em;
    }

    .landing__description {
        font-size: 18px;
        line-height: 0.4em
    }

    .landing__cta {
    cursor: pointer;
    font-size: 18px;
    }

    .landing__cta a:hover {
        color: #111111;
    }

    .landing__cta_link {
        text-decoration: underline;
        display: block;
    }

    @media all and (max-width: 800px) {
        .landing {
            padding: 20px
        }
        .landing__header{
            margin-top: 50px;
            font-size: 35px;
        }
        .landing__description{
            font-size: 16px;
        }
        .landing__cta {
            font-size: 16px;
        }
    }

    /**
    * overlaying styles for codex-special
    */
    #codex-special__block {
        width: 320px;
        margin: 92px auto 30px auto;
    }

    .codex-special__toolbar_included {
        background-color: #fff812;
        border-top: none;
        border-radius: 26px;
    }

    .codex-special__circle {
        width: 9px;
        height: 9px;
    }

    .codex-special__toolbar_text {
        margin-right: 70px;
    }
</style>

<div class="center_side">
    <div class="landing">
        <h1 class="landing__header">CodeX Special</h1>
        <p class="landing__description">Модуль для создания контрастной версии сайта</p>
        <div class="landing__cta">
            <div id="codex-special__block"></div>
            <a class="landing__cta_link">Get it for free</a>
        </div>
    </div>
</div>

<script src="/public/extensions/codex.special/codex-special.v.1.0.min.js"></script>

<script type="text/javascript">

codexSpecial.init({
    blockId : 'codex-special__block',
    lang : 'en',
});

</script>
