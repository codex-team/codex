<?
    $classes = array();

    if ( !empty($block->isstretch) && $block->isstretch == 'true'){
        $classes[] = 'article-image--stretched';
    }

    if ( !empty($block->border) && $block->border == 'true'){
        $classes[] = 'article-image--bordered';
    }

?>
<figure class="article-image <?= implode(' ', $classes); ?>">
    <img src="<?= $block->url; ?>" alt="<? !empty($block->caption) ? $block->caption : '' ?>">
    <? if (!empty($block->caption)): ?>
        <footer class="article-image-caption">
            <?= $block->caption; ?>
        </footer>
    <? endif; ?>
</figure>
