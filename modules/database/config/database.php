<?php defined('SYSPATH') OR die('No direct access allowed.');

return array
(
        'default' => array
        (
                'type'       => 'MySQLi',
                'connection' => array(
                        /**
                         *
                         * string   hostname     server hostname
                         * string   database     database name
                         * string   username     database username
                         * string   password     database password
                         * string   port         server port
                         * string   socket       connection socket
                         *
                         */
                        'hostname'   => 'localhost',
                        'database'   => 'codex',
                        'username'   => 'root',
                        'password'   => '',
                        'port'       => NULL,
                        'socket'     => NULL
                ),
                'table_prefix' => '',
                'charset'      => 'utf8',
                'caching'      => FALSE,
        )
);

?>