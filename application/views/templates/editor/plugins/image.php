<?
    $classes = array();

    if ( !empty($block->isstretch) && $block->isstretch == 'true'){
        $classes[] = 'article__image--stretched';
    }

    if ( !empty($block->border) && $block->border == 'true'){
        $classes[] = 'article__image--bordered';
    }

?>
<figure class="article__image <?= implode(' ', $classes); ?>">
    <img src="<?= $block->url; ?>" alt="<? !empty($block->caption) ? $block->caption : '' ?>">
    <? if (!empty($block->caption)): ?>
        <footer class="article__image-caption">
            <?= $block->caption; ?>
        </footer>
    <? endif; ?>
</figure>
