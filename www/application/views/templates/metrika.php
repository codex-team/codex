<?
/**
 * Simple analytics module
 * Uses Hawk Catcher as service
 *
 * Send error (in fact it is not an error) event
 * for each viewed page to separate project
 */
?>
<? if (!empty($_SERVER['METRIKA_HAWK_TOKEN'])): ?>
    <script src="/public/build/metrika.bundle.js?v=<?= filemtime('public/build/metrika.bundle.js') ?>" onload="(new metrika({token: '<?= $_SERVER['METRIKA_HAWK_TOKEN'] ?>', collectorEndpoint: 'wss://k1.stage.hawk.so:443/ws'})).send(new Error(window.location.pathname))" async></script>
<? endif; ?>
