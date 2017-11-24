<a class="embed-link" href="<?= $block->url; ?>" target="_blank" rel="nofollow">
    <img class="embed-link__image" src="<?= $block->image; ?>">
    <div class="embed-link__title">
        <?= $block->title; ?>
    </div>
    <span class="embed-link__domain">
        <?= parse_url($block->url, PHP_URL_HOST); ?>
    </span>
    <div class="embed-link__description">
        <?=$block->description; ?>
    </div>
</a>
