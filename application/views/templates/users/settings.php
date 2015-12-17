<div class="center_side">
    <div class="profile_settings">

        <div class="breadcrumb" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
            <a href="/user" itemprop="url"><span itemprop="title">Profile</span></a> »
            <h1 class="name" itemprop="title">Settings</h1>
        </div>

        <div class="fl_l">
            <div class="ava">
                <img src="<?= $user->photo ?>" alt="<?= $user->name ?>" id="profile-photo">
            </div>
            <br/>
            <div class="button with_icon file-transport-button" data-action="<?= Controller_Base_Ajax::ACTION_PROFILE_PHOTO ?>">
                <i class="icon-picture"></i>Change
            </div>
        </div>
        <div class="constrain">
            <form class="blank" action="/user/settings" method="POST" enctype="multipart/form-data">

                    <input type="hidden" name="csrf" value="<?= Security::token() ?>" />

                    <div class="user_settings_form">

                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" value="<?= $user->name?>" required/>

                        <label for="bio">About</label>
                        <textarea rows="2" id="bio" name="bio"><?= $user->bio?></textarea>

                        <label for="vk_uri"><i class="icon-vkontakte"></i> vk.com</label>
                        <input type="text" id="vk_uri" name="vk_uri" value="<?= $user->vk_uri?>"/>

                        <label for="instagram_uri"> <i class="icon-instagram"></i> Instagram</label>
                        <input type="text" id="instagram_uri" name="instagram_uri" value="<?=$user->instagram_uri?>"/>

                    </div>

                    <input type="submit" value="Сохранить" name="submit">
            </form>
        </div>
    </div>
</div>
