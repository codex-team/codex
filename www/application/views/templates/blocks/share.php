<?
    if (empty($share['url'])) return;

    $share['title'] =  HTML::chars($share['title']);
    $share['desc']  =  HTML::chars($share['desc']);
?>
<div class="sharing" data-module="sharer">
    <textarea name="module-settings" hidden>
        {
            "buttonsSelector" : ".sharing__main-button, .sharing__button"
        }
    </textarea>
    <div class="sharing__offer">
        <?= $share['offer'] ?>
    </div>
    <span class="sharing__main-button vk" data-share-type="vkontakte"  data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>" >
        <i class="icon-vkontakte"></i>
        Поделиться
    </span>
    <span class="sharing__button tw" data-share-type="twitter"  data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>"  title="Tweet">
        <i class="icon-twitter"></i>
    </span>
    <span class="sharing__button fb" data-share-type="facebook"  data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>"  title="Share on the Facebook">
        <i class="icon-facebook-squared"></i>
    </span>
    <span class="sharing__button tg" data-share-type="telegram" data-url="<?= $share['url']; ?>" data-title="<?= $share['title']; ?>" data-desc="<?= $share['desc']; ?>" title="Forward in Telegram">
        <i class="icon-paper-plane"></i>
    </span>
</div>
