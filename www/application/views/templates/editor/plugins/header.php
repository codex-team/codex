<?

    if (property_exists($block, 'level')) {
        $level = $block->{'level'};
    }

    switch ($level) {
        case '3':
        case '4':
            $tag = 'h' . $block->{'level'};
            break;
        default:
            $tag = 'h2';
    };
?>

<!-- Create block tag -->
<<?=$tag; ?>>
    <?=$block->text; ?>
</<?=$tag; ?>>
