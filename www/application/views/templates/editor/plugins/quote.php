<?

    if ( $block->alignment == 'center' ) {
        $centerClass = 'align_c';
    } else {
        $centerClass = '';
    }

?>

<blockquote class="article-quote <?= $centerClass ?>">
    <?= $block->text; ?>
</blockquote>
