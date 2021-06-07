<section class="site-section">
    <?
        const MAX_PORTION = 3;
    ?>
    <? if (!empty($allNews)): ?>
        <h2 class="site-section__title">Latest news</h2>

        <ul class="news js-emoji-included">
            <? $i = 0; ?>
            <? foreach ($allNews as $news ): ?>
                <li class="news__list_item <?= $i >= MAX_PORTION ? 'news__list_item--hidden' : ''?>" data-time="<?= $news->getPrettifiedDtDisplay() ?>">
                    <? if ($news->type == Model_News::TYPE_RELEASE): ?>
                        <span class="news__bage">✨release</span>
                    <? endif; ?>
                    <? if (LANG === 'en'): ?>
                        <?= $news->en_text ?>
                    <? else: ?>
                        <?= $news->ru_text ?>
                    <? endif; ?>
                </li>
                <? $i++; ?>
            <? endforeach; ?>
            <? if ($i > MAX_PORTION): ?>
                <span class="news__showmore" onclick="codex.showMoreNews.init( this );">Show more news</span>
            <? endif; ?>
        </ul>

        <a class="follow-telegram__button deeplinker" href="//t.me/codex_team" data-app-link="tg://resolve?domain=codex_team">
            <? include(DOCROOT . "public/app/img/icon_telegram_white.svg") ?>
            Follow @codex_team
        </a>
    <? endif; ?>
</section>
