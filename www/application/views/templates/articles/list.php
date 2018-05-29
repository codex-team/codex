<div class="feed">
    <? foreach ($feed_items as $i => $item): ?>

        <? if ($item::FEED_PREFIX == 'course'): ?>

            <?= View::factory('templates/articles/course_list_item', array( 'item' => $item)); ?>

        <? endif; ?>

        <? if ($item::FEED_PREFIX == 'article'): ?>

            <?= View::factory('templates/articles/article_list_item', array( 'item' => $item)); ?>

        <? endif; ?>

    <? endforeach; ?>
</div>