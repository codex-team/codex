<?php

    switch ($block->type) {
        case 'ul':
            $tag = 'ul';
            break;
        case 'ol':
            $tag = 'ol';
            break;
    };

?>
<<?=$tag; ?>>
    <? for($i = 0; $i < count($block->items); $i++) : ?>
        <li><?=$block->items[$i]; ?></li>
    <? endfor; ?>
</<?=$tag; ?>>
