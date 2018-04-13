# Aliases module for Kohana Framework

This module allows you to make useful and beautiful URLs for your service.

You don't need more `/user/<id>` or `/article/<id>` cursors in routes. Now you can use simply `/donald` and `/victory` or `/pokemon-go` like addresses for different resources.

## User Guide
Article describing this HMVC feature placed on our website <a href="https://ifmo.su/alias-system">https://ifmo.su/alias-system</a>

To include module, just place it to the `/modules` directory and push to the `Kohana::modules()` array in `bootstrap.php`
```php
Kohana::modules(array(
        'aliases' => MODPATH . 'aliases', // Aliases for URLs
        ...
));
```

All you need after is to include aliases creation and update methods into your logic.

### Resource creation

```php
$alias         = Model_Alias::generateUri( $uri );
$resource_type = Model_Uri::ARTICLE; // your own resource's type such as user, article, category and other
$resource_id   = 12345;

$article->uri = Model_Alias::addAlias($alias, $resource_type , $resource_id);
```

### Resource updating

```php
$resource_id   = $article->id;
$old_uri       = $article->uri;
$new_uri       = Model_Alias::generateUri( $uri );
$resource_type = Model_Uri::ARTICLE;


$article->uri = Model_Alias::updateAlias($old_uri, $new_uri, Model_Uri::ARTICLE, $resource_id);
```

## What about cache

Note that module's version does not include a cache scheme. You may need `memcache` or another driver to add this feature.

## Repository
<a href="https://github.com/codex-team/kohana-aliases/">https://github.com/codex-team/kohana-aliases/</a>


## About CodeX
We are small team of Web-developing fans consisting of IFMO students and graduates located in St. Petersburg, Russia.
Fell free to give us a feedback on <a href="mailto::team@ifmo.su">team@ifmo.su</a>
