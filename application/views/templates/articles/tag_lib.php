<div class="center_side clear">
<p>
	<? foreach ($tag_list as $current_tag): ?>
        <a <?echo 'href="/tag/'.$current_tag["name"].'"'; ?> ><span class="technic"><?= $current_tag["name"]; ?></span></a><br>
	  <? endforeach; ?>

</p>
</div>