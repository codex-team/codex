<div class="center_side">
    <div class="settings">
        <div class="ava">
            <img src="<?= $user->photo ?>" alt="<?= $user->name ?>">
        </div>
        <div class="user_edit_form">
            <form action="/user/edit" method="POST" enctype="multipart/form-data">
                <p>Изменить аву<br/>
                <input type="file" id="ava" name="ava"></p>
                <label for="name">Имя</label>
                <input type="text" id="name" name="name" value="<?= $user->name?>" required>
                <label for="vk_uri">Ссылка вк</label>
                <input type="text" id="vk_uri" name="vk_uri" value="https://vk.com/<?= $user->vk_uri?>">
                <label for="instagram_uri">Instagram</label>
                <input type="text" id="instagram_uri" name="instagram_uri" value="https://instagram.com/<?=$user->instagram_uri?>">
                <label for="bio">О себе</label>
                <input type="text" id="bio" name="bio" value="<?= $user->bio?>">
                <input type="submit" value="Сохранить">
            </form>
        </div>
    </div>
</div>
