<link rel="stylesheet" href="/public/app/landings/beauty_toolbar/beauty_toolbar.css?v=<?= filemtime("public/app/landings/beauty_toolbar/beauty_toolbar.css") ?>">
<div class="sct">
    <div class="sct__header">
        <div class="sct__center-side">
            <div class="sct__rotator">
                <div class="sct__rotator-item sct__rotator-item--first" style="background-image: url('/public/app/landings/beauty_toolbar/8.jpg') ">
                </div>
                <div class="sct__rotator-item sct__rotator-item--main" style="background-image: url('/public/app/landings/beauty_toolbar/2.jpg') ">
                </div>
                <div class="sct__rotator-item sct__rotator-item--last" style="background-image: url('/public/app/landings/beauty_toolbar/6.jpg') ">
                </div>
            </div>
            <h1>Safari Beauty Toolbar</h1>
            <h2>Make the Safari Toolbar more consistent with your brand colors</h2>
            <div class="sct__header-caption">
                Tiny zero-dependencies JavaScript module
            </div>
            <a class="sct__button sct__button--github" href="https://github.com/neSpecc/safari-beauty-toolbar">
                View on the GitHub
            </a>
            <br />
            <a class="sct__link sct__link--yarn" href="https://yarnpkg.com/en/package/safari-beauty-toolbar">
                Available via Yarn
            </a>
            <a class="sct__link sct__link--npm" href="https://www.npmjs.com/package/safari-beauty-toolbar">
                Available via NPM
            </a>
        </div>
    </div>
    <div class="sct__center-side">
        <div class="sct__try" id="js-demo" hidden>
            <h3>Try it yourself</h3>
            <div class="sct__table">
                <div class="sct__table-cell">
                    <label>
                        Set up an any color
                    </label>
                    <div class="sct__colors">
                        <span class="sct__colors-item sct__colors-item--red" onclick="demo.reset('red')"></span>
                        <span class="sct__colors-item sct__colors-item--blue" onclick="demo.reset('#519AFF')"></span>
                        <span class="sct__colors-item sct__colors-item--yellow" onclick="demo.reset('#F3FF6F')"></span>
                        <span class="sct__colors-item sct__colors-item--green" onclick="demo.reset('#62FF99')"></span>
                        <span class="sct__colors-item sct__colors-item--pink" onclick="demo.reset('#FFC5FA')"></span>
                        <!--<input value="#CFEDEE">-->
                    </div>
<code><span class="hcode--keyword">const</span> <span class="hcode--object">toolbarColor</span> = <span class="hcode--keyword">new</span> <span class="hcode--object">SBToolbar</span>({
    <span class="hcode--property">color</span>: <span class="hcode--string" id="js-color-value">"red"</span>
});
</code>
                </div>
                <div class="sct__table-cell">
                    <label>
                        Animation effect
                    </label>
                    <span class="sct__button" onclick="demo.animate(this)">
            Try animation
          </span>
<code><span class="hcode--object">toolbarColor</span>.<span class="hcode--method">animate</span>({
    <span class="hcode--property">colors</span>: [<span class="hcode--string">"#ff0a8a"</span>, <span class="hcode--string">"blue"</span>, <span class="hcode--string">"#61ffa7"</span>, <span class="hcode--string">"yellow"</span>],
    <span class="hcode--property">speed</span>: <span class="hcode--number">600</span>
});
</code>
                </div>
                <div class="sct__table-cell">
                    <label>
                        Blinking effect
                    </label>
                    <span class="sct__button" onclick="demo.blink(this)">
            Try to blink
          </span>
<code><span class="hcode--object">toolbarColor</span>.<span class="hcode--method">blink</span>({
    <span class="hcode--property">interval</span>: <span class="hcode--number">300</span>,
    <span class="hcode--property">transitionSpeed</span>: <span class="hcode--number">1000</span>
});
</code>
                </div>
                <div class="sct__table-cell">
                    <label>
                        Progress animation
                    </label>
                    <span class="sct__button" onclick="demo.progress(this)">
            Start progress
          </span>
<code><span class="hcode--object">toolbarColor</span>.<span class="hcode--method">startProgress</span>({
    <span class="hcode--property">color</span>: <span class="hcode--string">"rgb(49, 82, 92)"</span>,
    <span class="hcode--property">estimate</span>: <span class="hcode--number">3500</span>
});
</code>
                </div>
            </div>
            <div class="sct__docs">
                Read a few lines of the <a href="https://github.com/neSpecc/safari-beauty-toolbar">documentation</a>.
            </div>
        </div>
        <div class="sct__how">
            <h3>How it works</h3>
            <p>
                Module works only on Safari browser on macOS and iOS because they have a little transparency on the Toolbar.
                So we can add the colorful layer and place it under the Toolbar. That's it. This tool just simplifies the trick.
            </p>
            <div class="sct__gifs">
                <div class="sct__gifs-item">
                    <video autoplay loop muted playsinline>
                        <source src="/public/app/landings/beauty_toolbar/desktop.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="sct__gifs-item">
                    <video autoplay loop muted playsinline>
                        <source src="/public/app/landings/beauty_toolbar/mobile.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
        <div class="sct__greeting">
            <? if ($isFromPH): ?>
                <div class="sct__greeting-logo"></div>
            <? endif; ?>
            <p>
                Hi there! We are small team of dev-enthusiasts, working on non-profit <a href="/" target="_blank" onclick="window.yaCounter32652805 && window.yaCounter32652805.reachGoal('sbt-products');">products</a>. <br/>
                Just setting up our <a href="https://twitter.com/codex_team" target="_blank" onclick="window.yaCounter32652805 && window.yaCounter32652805.reachGoal('sbt-twitter');">twitter</a>.
                Let’s be connected!
            </p>
            <a href="https://twitter.com/codex_team?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-dnt="true" data-show-count="false">Follow @codex_team</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    </div>
</div>

<script src="https://cdn.rawgit.com/neSpecc/safari-beauty-toolbar/18a9d7ec/build/sct.min.js"></script>
<script src="/public/app/landings/beauty_toolbar/demo.js?v=<?= filemtime("public/app/landings/beauty_toolbar/demo.js") ?>" onload="demo.init(); new Rotator('sct__rotator-item');"></script>