<div class="center_side">

    <? $link = ($mode == 'list')?'cards':'list' ?>
    <div class="top-menu clearfix">
        <div class="top-menu__link"><a href="/admin/feed?mode=<?= $link ?>"><?= $link ?> view</a></div>
        <div class="top-menu__saved top-menu__saved_hidden" id="saved">saved</div>
    </div>

</div>

<? if ($mode == 'list'): ?>
    <div class="center_side clear">
        <?= View::factory('templates/admin/articles/feed_list', array( 'feed' => $feed )); ?>
    </div>
<? else: if($mode == 'cards'): ?>

    <div class="center_side feed clearfix">
        <?= View::factory('templates/articles/list', array( 'feed_items' => $feed)); ?>
    </div>

    <script>
        var items = document.querySelectorAll('.feed-item');

        for (var i = items.length-1; i > -1; i--) {
            items[i].classList.add('draggable');
            items[i].classList.add('list-item');
        }

    </script>

    <? endif; ?>
<? endif; ?>
<script src="/public/js/feedDragNDrop.js"></script>
<link rel="stylesheet" href="/public/css/feedDragNDrop.css">
