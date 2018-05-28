<?
    $products = array(
        array(
            'name' => 'Codex Shortcuts',
            'description' => 'Micro-library for dispatching keyboard shortcuts in Javascript.',
            'logo' => 'public/app/img/products/shortcuts.svg',
            'tags' => array('JavaScript'),
            'npm' => 'https://www.npmjs.com/package/@codexteam/shortcuts',
            'repo' => 'github.com/codex-team/codex.shortcuts',
        ),
        array(
            'name' => 'Module Dispatcher',
            'description' => 'Class for frontend Modules initialization from the DOM without inline scripts.',
            'logo' => 'public/app/img/products/module-dispatcher.svg',
            'tags' => array('JavaScript'),
            'npm' => 'https://www.npmjs.com/package/module-dispatcher',
            'repo' => 'github.com/codex-team/moduleDispatcher',
        ),
        array(
            'name' => 'Webpack Build Config',
            'description' => 'Smart frontend build config with syntax linters, code style checker and other helpful stuff based on our experience.',
            'logo' => 'public/app/img/products/webpack.svg',
            'tags' => array('JavaScript', 'Webpack', 'CSS'),
            'repo' => 'github.com/codex-team/webpack-build-config',
        ),
        array(
            'name' => 'SSL certs expire date checker',
            'description' => 'Python script for checking domain certificate’s expire date. Sends notifications to the Telegram or Slack when day X is coming.',
            'logo' => 'public/app/img/products/ssl-checker.svg',
            'tags' => array('Python', 'SSL'),
            'repo' => 'github.com/codex-team/check-ssl-cert-expire-date',
        ),
        array(
            'name' => 'Kohana Aliases',
            'description' => 'No more /user/<id> or /article/<id> addresses. Meet cool routing system for URLs like  /alex or /pokemon-go  for different resources.',
            'logo' => 'public/app/img/products/kohana.svg',
            'tags' => array('PHP', 'Kohana Framework'),
            'repo' => 'github.com/codex-team/kohana-aliases',
        ),
        array(
            'name' => 'HTML Slacker',
            'description' => 'Converts HTML to Slack formatted markdown.',
            'logo' => 'public/app/img/products/html-slacker.svg',
            'tags' => array('Python', 'Slack'),
            'repo' => 'github.com/codex-team/html-slacker',
            'pypi' => 'https://pypi.python.org/pypi/html-slacker'
        ),
        array(
            'name' => 'Deploy Server',
            'description' => 'Deploy your project automatically when git branch was updated.',
            'logo' => 'public/app/img/products/deploy-server.svg',
            'tags' => array('Python', 'Git'),
            'repo' => 'github.com/codex-team/deployserver',
            'pypi' => 'https://pypi.python.org/pypi/deployserver'
        ),
        array(
            'name' => 'JS Notifier',
            'description' => 'Lightweight notifications and alerts module for websites.',
            'logo' => 'public/app/img/products/js-notifier.svg',
            'tags' => array('JavaScript'),
            'repo' => 'github.com/codex-team/js-notifier',
            'npm' => 'https://www.npmjs.com/package/codex-notifier'
        ),
        array(
            'name' => 'Hawk PHP Catcher',
            'description' => 'Exceptions end Errors Catcher for PHP.',
            'logo' => 'public/app/img/products/hawk.svg',
            'tags' => array('PHP'),
            'repo' => 'github.com/codex-team/hawk.php',
            'composer' => 'https://packagist.org/packages/codex-team/hawk.php'
        ),
        array(
            'name' => 'CodeX Special',
            'description' => 'Module for making high-contrast version of websites. Simple usage.',
            'logo' => 'public/app/img/products/codex-special.svg',
            'tags' => array('JavaScript'),
            'repo' => 'github.com/codex-team/codex.special',
            'npm' => 'https://www.npmjs.com/package/codex.special'
        ),
        array(
            'name' => 'AJAX Helper',
            'description' => 'Library for working with async-aware requests.',
            'logo' => 'public/app/img/products/ajax.svg',
            'tags' => array('JavaScript'),
            'repo' => 'github.com/codex-team/ajax',
            'npm' => 'https://www.npmjs.com/package/codex.ajax'
        ),
        array(
            'name' => 'JS File transport',
            'description' => 'Module for file uploading via AJAX.',
            'logo' => 'public/app/img/products/transport.svg',
            'tags' => array('JavaScript'),
            'repo' => 'github.com/codex-team/transport',
            'npm' => 'https://www.npmjs.com/package/codex.transport'
        ),
    );
?>
<div class="products-grid">
    <? foreach ($products as $product): ?>
        <div class="products-grid__item product-cell">
            <a class="product-cell__logo" href="https://<?= $product['repo'] ?>" rel="nofollow">
                <? include(DOCROOT . $product['logo']); ?>
            </a>
            <a class="product-cell__name" href="https://<?= $product['repo'] ?>">
                <?= $product['name'] ?>
            </a>
            <div class="product-cell__desc">
                <?= HTML::chars($product['description']) ?>
            </div>
            <? if (!empty($product['tags'])): ?>
                <div class="product-cell__tags">
                    <? foreach ($product['tags'] as $tag): ?>
                        <span class="product-cell__tag">
                            <?= $tag ?>
                        </span>
                    <? endforeach ?>
                    <? if (!empty($product['pypi'])): ?>
                        <a class="product-cell__tag product-cell__tag--pypi" href="<?= $product['pypi'] ?>" target="_blank">
                            <? include(DOCROOT . 'public/app/img/products/python.svg'); ?>
                            Available in PyPI
                        </a>
                    <? endif ?>
                    <? if (!empty($product['npm'])): ?>
                        <a class="product-cell__tag product-cell__tag--npm" href="<?= $product['npm'] ?>" target="_blank">
                            <? include(DOCROOT . 'public/app/img/products/npm.svg'); ?>
                            Available in NPM
                        </a>
                    <? endif ?>
                    <? if (!empty($product['composer'])): ?>
                        <a class="product-cell__tag product-cell__tag--composer" href="<?= $product['composer'] ?>" target="_blank">
                            <? include(DOCROOT . 'public/app/img/products/composer.svg'); ?>
                            Available in Composer
                        </a>
                    <? endif ?>
                </div>
            <? endif ?>
            <a class="product-cell__repo" href="https://<?= $product['repo'] ?>" rel="nofollow">
                <?= $product['repo']?>
            </a>
        </div>
    <? endforeach;?>
</div>
