<?

    $tag = 'ul';

    if ( !empty($block->type) && strtolower($block->type) == 'ol' ) {
        $tag = 'ol';
    }

?>
<<?=$tag; ?> class="article-list">
    <? for($i = 0; $i < count($block->items); $i++) : ?>
        <li><?=$block->items[$i]; ?></li>
    <? endfor; ?>
</<?=$tag; ?>>
