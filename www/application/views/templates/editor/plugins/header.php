<?
    if (property_exists($block, 'level')) {
        $level = $block->{'level'};
    }

    switch ($level) {
        case '1':
        case '3':
        case '4':
        case '5':
        case '6':
            $tag = 'h' . $block->{'level'};
            break;
        default:
            $tag = 'h2';
    };
?>

<!-- Create block tag -->
<<?= $tag ?>>
    <?= $block->text ?>
</<?= $tag ?>>
