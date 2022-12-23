<?
    $classes = array();

    if ( !empty($block->stretched) && $block->stretched == 'true'){
        $classes[] = 'article-image--stretched';
    }

    if ( !empty($block->withBorder) && $block->withBorder == 'true'){
        $classes[] = 'article-image--bordered';
    }

    if ( !empty($block->withBackground) && $block->withBackground == 'true'){
        $classes[] = 'article-image--backgrounded';
    }
?>

<figure class="article-image <?= implode(' ', $classes) ?>">
    <? $ext = pathinfo($block->file['url'], PATHINFO_EXTENSION); ?>        
    <? if ($ext == 'mp4' || $ext == 'mov'): ?>
        <? $mime = 'video/'. ($ext === 'mov' ? 'quicktime' : $ext) ?>
        <video autoplay loop muted playsinline>
           <source src="<?= $block->file['url'] ?>" type="<?= $mime ?>">
        </video>
    <? else: ?>
        <img src="<?= $block->file['url'] ?>" alt="<? !empty($block->caption) ? $block->caption : '' ?>">
    <? endif ?>

    <? if (!empty($block->caption)): ?>
        <footer class="article-image-caption">
            <?= $block->caption ?>
        </footer>
    <? endif ?>
</figure>
