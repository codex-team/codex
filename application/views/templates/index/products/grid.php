<?
    $products = array(
        array(
            'name' => 'Webpack Build Config',
            'description' => 'Clever frontend build confing with syntax linters, code styling checker and other helpfuly stuff based on our experience.',
            'logo' => 'public/app/img/products/webpack.svg',
            'tags' => array('JavaScript', 'Webpack', 'CSS'),
            'repo' => 'github.com/codex-team/webpack-build-config',
        ),
        array(
            'name' => 'SSL certs expire date checker',
            'description' => 'Python script for checking domain certificate’s expire date. Sends notification to the Telegram or Slack when day X is coming.',
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
            'pypi' => true
        ),
        array(
            'name' => 'Deploy Server',
            'description' => 'Deploy your project automatically when git branch was updated.',
            'logo' => 'public/app/img/products/deploy-server.svg',
            'tags' => array('Python', 'Git'),
            'repo' => 'github.com/codex-team/deploy-server',
            'pypi' => true
        ),
        array(
            'name' => 'JS Notifier',
            'description' => 'Lightweight notifications and alerts module for websites.',
            'logo' => 'public/app/img/products/js-notifier.svg',
            'tags' => array('JavaScript'),
            'repo' => 'github.com/codex-team/js-notifier',
            'npm' => true
        ),
        array(
            'name' => 'Hawk PHP Catcher',
            'description' => 'Exceptions end Errors Catcher for PHP.',
            'logo' => 'public/app/img/products/hawk.svg',
            'tags' => array('PHP'),
            'repo' => 'github.com/codex-team/hawk.php',
            'composer' => true
        ),
        array(
            'name' => 'CodeX Special',
            'description' => 'Module for making high-contrast version of websites. Simple usage.',
            'logo' => 'public/app/img/products/codex-special.svg',
            'tags' => array('JavaScript'),
            'repo' => 'github.com/codex-team/codex.special',
            'npm' => true
        ),
    );
?>
<div class="products-grid">
    <? foreach ($products as $product): ?>
        <div class="products-grid__item product-cell">
            <div class="product-cell__logo">
                <? include(DOCROOT . $product['logo']); ?>
            </div>
            <h4 class="product-cell__name">
                <?= $product['name'] ?>
            </h4>
            <div class="product-cell__desc">
                <?= $product['description'] ?>
            </div>
            <? if (!empty($product['tags'])): ?>
                <div class="product-cell__tags">
                    <? foreach ($product['tags'] as $tag): ?>
                        <span class="product-cell__tag">
                            <?= $tag ?>
                        </span>
                    <? endforeach ?>
                    <? if (!empty($product['pypi'])): ?>
                        <span class="product-cell__tag product-cell__tag--pypi">
                            <? include(DOCROOT . 'public/app/img/products/python.svg'); ?>
                            Available in PyPI
                        </span>
                    <? endif ?>
                    <? if (!empty($product['npm'])): ?>
                        <span class="product-cell__tag product-cell__tag--npm">
                            <? include(DOCROOT . 'public/app/img/products/npm.svg'); ?>
                            Available in NPM
                        </span>
                    <? endif ?>
                    <? if (!empty($product['composer'])): ?>
                        <span class="product-cell__tag product-cell__tag--composer">
                            <? include(DOCROOT . 'public/app/img/products/composer.svg'); ?>
                            Available in Composer
                        </span>
                    <? endif ?>
                </div>
            <? endif ?>
            <a class="product-cell__repo" href="https://<?= $product['repo'] ?>">
                <?= $product['repo']?>
            </a>
        </div>
    <? endforeach;?>
</div>
