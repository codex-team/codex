<section class="site-section">
    <?php
        const MAX_PORTION = 3;
    ?>
    <?php if (!empty($allNews)): ?>
        <h2 class="site-section__title">Latest news</h2>

        <ul class="news js-emoji-included">
            <?php $i = 0; ?>
            <?php foreach ($allNews as $news ): ?>
                <li class="news__list_item <?= $i >= MAX_PORTION ? 'news__list_item--hidden' : ''?>" data-time="<?= $news->getPrettifiedDtDisplay() ?>">
                    <?php if ($news->is_release): ?>
                        <span class="news__bage">✨release</span>
                    <?php endif; ?>
                    <?php if (isset($news->en_text)): ?>
                        <?= $news->en_text ?>
                    <?php else: ?>
                        <?= $news->ru_text ?>
                    <?php endif; ?>
                </li>
                <?php $i++; ?>
            <?php endforeach; ?>
            <?php if ($i > MAX_PORTION): ?>
                <span class="news__showmore" onclick="codex.showMoreNews.init( this );">Show more news</span>
            <?php endif; ?>
        </ul>
    <?php endif; ?>
</section>
