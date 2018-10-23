<?
    $tag = 'h2';
    $level = $tag;

    if (property_exists($block, 'level')) {
        $level = $block->{'level'};
    }

    switch ($level) {
        case '2':
            $tag = 'h2';
            break;
        case '3':
            $tag = 'h3';
            break;
        case '4':
            $tag = 'h4';
            break;
    };
?>

<!-- Create block tag -->
<<?=$tag; ?>>
    <?=$block->text; ?>
</<?=$tag; ?>>
