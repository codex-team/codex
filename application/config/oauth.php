<?php

defined( 'SYSPATH' ) or die( 'No direct script access.' );

return array(
    'vkontakte' => array(
        'APP_ID'        => '4874439',
        'APP_SECRET'    => 'w6FvjB8uQDFCNN8n4vCO',
        'SETTINGS'      => NULL,
        'REDIRECT_URI'  => 'http://'.Arr::get($_SERVER, 'SERVER_NAME').'/auth/vk',
        'GET_CODE_URI'  => 'https://oauth.vk.com/authorize/',
        'GET_TOKEN_URI' => 'https://oauth.vk.com/access_token'
    ),
    'odnoklassniki' => array(
        'APP_ID'        => NULL,
        'APP_SECRET'    => NULL,
        'APP_PUBLIC'    => NULL,
        'SETTINGS'      => NULL,
        'REDIRECT_URI'  => NULL,
        'GET_CODE_URI'  => NULL,
        'GET_TOKEN_URI' => NULL
    ),
    'facebook' => array(
        'APP_ID'        => '920338118051299',
        'APP_SECRET'    => '1aad033053c89df7d19580aac43abf5c',
        'SETTINGS'      => NULL,
        'REDIRECT_URI'  => 'http://'.Arr::get($_SERVER, 'SERVER_NAME').'/auth/facebook',
        'GET_CODE_URI'  => 'https://www.facebook.com/dialog/oauth',
        'GET_TOKEN_URI' => 'https://graph.facebook.com/oauth/access_token'
    ),
);
