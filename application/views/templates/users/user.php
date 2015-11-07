<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
            <a href="/article">Статьи</a>
        </div>
    </div>
</div>
<div class="center_side clear">
    <p><img src="" alt="" width = 100%></p>   
    	<p><? if ($auth->is_authorized() && empty($userId)): ?></p> 
    	<p><?= 'auth'?></p>	
    	<p>Имя: <?= $auth->get_profile()->first_name . $auth->get_profile()->last_name; ?> </p>
    	   <? elseif ( isset($error) ): ?>
    	<p><?= $error; ?></p>
    	   <? else: ?>
    	<p>Идентификатор пользователя: <?= $user->id; ?> </p>
    	<p>Имя: <?= $user->name ?> </p>
    	   <? endif; ?>
    	
    		
	    	
    	
    	

      
</div>
