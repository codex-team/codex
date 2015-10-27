<?php
    $path = '/var/www/alpha.difual.com/';
    exec("cd $path && git pull", $result);
    var_dump($result);
?>