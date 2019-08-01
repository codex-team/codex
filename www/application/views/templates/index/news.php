<section class="site-section">
    <h2 class="site-section__title">Latest news</h2>

    <ul class="news js-emoji-included">
        <?
            $MAX_PORTION = 3;
            $i = 0;
        ?>
        <? foreach ( $allNews as $news ): ?>
            <li class="news__list_item <?= $i >= $MAX_PORTION ? 'news__list_item--hidden' : ''?>" data-time="<?= $news->getPrettifiedDtDisplay() ?>">
                <? if ($news->is_release): ?>
                    <span class="news__bage">✨release</span>
                <? endif ?>
                <? if (isset($news->en_text)): ?>
                    <?= $news->en_text ?>
                <? else: ?>
                    <?= $news->ru_text ?>
                <? endif ?>
            </li>
            <? $i++; ?>
        <? endforeach; ?>
        <span class="news__showmore" onclick="codex.showMoreNews.init( this );">Show more news</span>
    </ul>

</section>
