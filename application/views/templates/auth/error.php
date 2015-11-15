<?php
/**
 * Created by PhpStorm.
 * User: nostr
 * Date: 15.11.15
 * Time: 20:19
 */
?>

<?= View::factory('/templates/head') ?>

<link rel="stylesheet" href="/public/css/userInfo.css">
<div class="center_side clear">
    <p>
        Ошибка #<?= $error_code ?>, "<?= $error_message ?>"
    </p>
</div>


