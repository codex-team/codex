<div class="center_side">
    <div class="profile-settings">

        <div class="breadcrumb" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
            <a href="/user" itemprop="url"><span itemprop="title">Profile</span></a> »
            <h1 class="name" itemprop="title">Settings</h1>
        </div>

        <div class="fl_l align_c">
            <div class="profile-settings__ava">
                <img src="<?= HTML::chars($user->photo) ?>" alt="<?= HTML::chars($user->name) ?>" id="profile-photo-updatable">
            </div>
            <br/>
            <div data-module="transport" class="button file-transport-button" data-action="<?= Controller_Base_Ajax::TRANSPORT_ACTION_PROFILE_PHOTO ?>">
                <textarea name="module-settings" hidden>
                    {
                        "buttonsClass": ".file-transport-button"
                    }
                </textarea>
                <i class="icon-picture"></i>Change
            </div>
        </div>

        <div class="constrain">

            <form class="profile-settings__form" action="/user/settings" method="POST" enctype="multipart/form-data">

                <input type="hidden" name="csrf" value="<?= Security::token() ?>" />

                <label for="name">Name</label>
                <input class="input" type="text" id="name" name="name" value="<?= HTML::chars($user->name) ?>" required/>

                <label for="bio">About</label>
                <textarea class="input" rows="2" id="bio" name="bio"><?= HTML::chars($user->bio) ?></textarea>

                <label for="alias">Alias</label>
                <input class="input" type="text" id="alias" name="alias" value="<?= HTML::chars($user->uri) ?>" required/>

                <label for="vk_uri"><i class="icon-vkontakte"></i> vk.com</label>
                <input class="input" type="text" id="vk_uri" name="vk_uri" value="<?= HTML::chars($user->vk_uri) ?>"/>

                <label for="instagram_uri"> <i class="icon-instagram"></i> Instagram</label>
                <input class="input" type="text" id="instagram_uri" name="instagram_uri" value="<?= HTML::chars($user->instagram_uri) ?>"/>

                <br>

                <input class="button button--master" type="submit" value="Сохранить">

            </form>

        </div>

    </div>
</div>
