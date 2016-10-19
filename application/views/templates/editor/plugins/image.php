<?php

    switch ($block->isStretch) {
        case 'true':
            $class = 'ce-plugin-image__uploaded--stretched';
            break;
        case 'false':
            $class = 'ce-plugin-image__uploaded--centered';
            break;
    }

?>

<img class="<?=$class; ?>" src="<?=$block->file->url; ?>" alt="">
<div class="ce-plugin-image__caption"><?=$block->caption; ?></div>