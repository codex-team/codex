<?
    if (empty($share['url'])) return;
?>
<div class="sharing">

    <span class="but tg fl_r" data-share-type="telegram" title="Forward in Telegram"><i class="icon-paper-plane"></i></span>
    <span class="but tw fl_r" data-share-type="twitter" title="Tweet"><i class="icon-twitter"></i></span>
    <span class="but fb fl_r" data-share-type="facebook" title="Share on the Facebook"><i class="icon-facebook-squared"></i></span>

    <span class="main_but pointer vk fl_r" data-share-type="vkontakte"><i class="icon-vkontakte"></i> Поделиться</span>

    <?= $share['offer'] ?>

</div>
<script>
    window.shareData = <?= json_encode($share) ?>;
</script>