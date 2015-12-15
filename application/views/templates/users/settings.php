<div class="center_side">
    <div class="profile_page">
        <div class="ava">
            <img src="<?= $user->photo ?>" alt="<?= $user->name ?>">
        </div>
            <form class = "blank" action="/user/settings" method="POST" enctype="multipart/form-data">
                <div class="settings">
                    <input type="file" id="ava" name="ava"></br>
                    <label for="name">Имя</label>
                    <input type="text" id="name" name="name" value="<?= $user->name?>" required/>
                    <label for="vk_uri">vk</label>
                    <input type="text" id="vk_uri" name="vk_uri" value="<?= $user->vk_uri?>"/>
                    <label for="instagram_uri">Instagram</label>
                    <input type="text" id="instagram_uri" name="instagram_uri" value="<?=$user->instagram_uri?>"/>
                    <label for="bio">О себе</label>
                    <textarea rows="5" id="bio" name="bio"><?= $user->bio?></textarea>
                    <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
                    <input type="submit" value="Сохранить" name="submit">
                <div>
            </form>
    </div>
</div>
