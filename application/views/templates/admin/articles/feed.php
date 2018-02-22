<div class="center_side">

    <? $link = ($mode == 'list')?'cards':'list' ?>
    <div class="top-menu clearfix">
        <div class="top-menu__link"><a href="/admin/feed?mode=<?= $link ?>"><?= $link ?> view</a></div>
        <div class="top-menu__saved top-menu__saved_hidden" id="saved">saved</div>
    </div>

</div>

<? if ($mode == 'list'): ?>

    <?= View::factory('templates/admin/articles/feed_list', array( 'feed' => $feed )); ?>

<? elseif($mode == 'cards'): ?>

    <div class="center_side feed clearfix">
        <?= View::factory('templates/articles/list', array( 'feedItems' => $feed)); ?>
    </div>

<? endif; ?>

<script>
    codex.admin.init({
        listType : "<?= $mode ?>"
    });
</script>