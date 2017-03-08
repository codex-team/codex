<?

    $tag = 'h2';
    $type = $tag;

    if (property_exists($block, 'type')) {
        $type = $block->type;
    }

    if (property_exists($block, 'heading-styles')) {
        $type = $block->{'heading-styles'};
    }

    switch ($type) {
        case 'h1':
            $tag = 'h1';
            break;
        case 'h2':
            $tag = 'h2';
            break;
        case 'h3':
            $tag = 'h3';
            break;
        case 'h4':
            $tag = 'h4';
            break;
        case 'h5':
            $tag = 'h5';
            break;
        case 'h6':
            $tag = 'h6';
            break;
    };
?>

<!-- Create block tag -->
<<?=$tag; ?>>
    <?=$block->text; ?>
</<?=$tag; ?>>
