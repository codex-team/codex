<div class="feed">
    <? foreach ($feed_items as $i => $item): ?>

        <?= View::factory('templates/articles/feed_list_item', array( 'item' => $item)); ?>

    <? endforeach; ?>
</div>