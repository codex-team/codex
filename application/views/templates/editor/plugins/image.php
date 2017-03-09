<?
    $classes = array();

    if ( !empty($block->isstretch) && $block->isstretch == 'true'){
        $classes[] = 'article__image--stretched';
    }

    if ( !empty($block->border) && $block->border == 'true'){
        $classes[] = 'article__image--bordered';
    }

?>

<img class="article__image <?= implode(' ', $classes); ?>" src="<?=$block->file['url']; ?>" alt="">
<div class="article__image-caption"><?=$block->caption; ?></div>