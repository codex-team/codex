<div class="center_side">

    <? $link = ($mode == 'list')?'cards':'list' ?>
    <div class="top-menu clearfix" data-module="admin">
        <module-settings hidden>
            {
                "list" : "<?= $mode ?>"
            }
        </module-settings>
        <div class="top-menu__saved top-menu__saved_hidden" id="saved">saved</div>
    </div>

</div>

<?= View::factory('templates/admin/articles/feed_list', array( 'feed' => $feed )); ?>