<?
    if (empty($share['url'])) return;
?>
<div class="sharing">

    <span class="but tg fl_r" data-share-type="telegram" data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>" title="Forward in Telegram"><i class="icon-paper-plane"></i></span>
    <span class="but tw fl_r" data-share-type="twitter"  data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>"  title="Tweet"><i class="icon-twitter"></i></span>
    <span class="but fb fl_r" data-share-type="facebook"  data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>"  title="Share on the Facebook"><i class="icon-facebook-squared"></i></span>

    <span class="main_but pointer vk fl_r" data-share-type="vkontakte"  data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>" ><i class="icon-vkontakte"></i> Поделиться</span>

    <?= $share['offer'] ?>

</div>
<script>
    codex.sharer.init();
</script>