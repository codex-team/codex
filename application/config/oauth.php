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
        'APP_ID'        => NULL,
        'APP_SECRET'    => NULL,
        'SETTINGS'      => NULL,
        'REDIRECT_URI'  => NULL,
        'GET_CODE_URI'  => NULL,
        'GET_TOKEN_URI' => NULL
    ),
);
