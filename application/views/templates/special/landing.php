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
        font-size: 4.7em;
        line-height: 1.3em;
    }

    .landing__description {
        font-size: 1.4em;
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
    .landing__tryout{
        display: inline-block;
        background: url('/public/img/landings/special/try-out.svg') no-repeat;
        width: 64px;
        height: 47px;
        margin: 30px 0 17px;
    }
    .landing__special_toolbar{
        display: inline-block;
    }
    .landing__repo_link{
        display: inline-block;
        margin-top: 100px;
        cursor: pointer;
        text-decoration: none;
        font-size: 1.2em;
        color: #243bff;
        font-weight: bold;
        font-size: 1.6em;
        letter-spacing: 0.3px;
    }
        .landing__repo_link:hover{

        }
        .landing__repo_link i{
            font-size: 2em;
            vertical-align: text-top;
        }

    /**
    * overlaying styles for codex-special
    */

    .codex-special__toolbar_included {
        background-color: #FFF000;
        border-top: none;
        border-radius: 35px;
        padding: 13px 13px 13px 30px
    }
    html body .codex-special__toolbar{
        font-size: 20px !important;
    }
    .codex-special__toolbar_text:hover{
        color: #BE0E0E;
    }

    .codex-special__circle {
        width: 14px;
        height: 14px;
        border-width: 10px;
        float: none;
    }
    .codex-special__circle:hover {
        width: 20px;
        height: 20px;
        border-width: 7px;
    }
    .codex-special__circle_green{
        background: #2BFF1B;
        border-color: #585955;
    }
    .codex-special__toolbar_text {
        margin-right: 30px;
    }

    /** green */
    .special-green .site_header,
    .special-green  .site_footer{
        border-color: #464134;
    }
    .special-green .site_footer .desclimer{
        color: #796647
    }
    /** black*/
    .special-white .site_header,
    .special-white  .site_footer{
        border-color: #2d2d2d;
    }
    /** blue */
    .special-blue .site_header,
    .special-blue  .site_footer{
        border-color: #a1ccf9;
    }
    .special-blue .site_footer .desclimer{
        color: #3897ef
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
        html body .codex-special__toolbar{
            font-size: 17px !important;
        }
        .codex-special__circle {
            width: 11px;
            height: 11px;
            border-width: 6px;
            float: none;
        }
        .codex-special__circle:hover {
            width: 15px;
            height: 15px;
            border-width: 4px;
        }
        .landing__repo_link{
            margin-top: 50px;
            font-size: 1.2em;
        }
    }

</style>

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
