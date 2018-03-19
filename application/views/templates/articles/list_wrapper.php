<div class="center_side clear">

    <div class="page-header clearfix">

        <div class="site-section site-section--articles-list">
            <h2 class="site-section__title">Our articles</h2>
            <div class="site-section__desc">We write about our experience and researches.</div>
        </div>

        <?= View::factory('templates/blocks/follow_telegram'); ?>

    </div>

</div>

<div class="center_side feed clearfix">

    <?= View::factory('templates/articles/list', array( 'feed_items' => $feed_items)); ?>

</div>