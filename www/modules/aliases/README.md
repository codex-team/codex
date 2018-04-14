# Aliases module for Kohana Framework

This module allows you to make useful and beautiful URLs for your service.

You don't need more `/user/<id>` or `/article/<id>` cursors in routes. Now you can use simply `/donald` and `/victory` or `/pokemon-go` like addresses for different resources.

## User Guide

Article describing this HMVC feature placed on our website [https://ifmo.su/alias-system](https://ifmo.su/alias-system).

### Installing

Firstly you need to copy this module to your project. You can download this repository and place its files to the `/modules` directory or attach it as a submodule. 

```shell
git submodule add https://github.com/codex-team/kohana-aliases modules/aliases
```

To enable module push it to `Kohana::modules()` array in `bootstrap.php`

```php
Kohana::modules(array(
    'aliases' => MODPATH . 'aliases', // Aliases for URLs
    ...
));
```

### Defining project's entities

In `classes` directory create a subdirectory `Aliases` with file `Controller.php`. You can copy [classes/Kohana/Aliases/Controller.php](classes/Kohana/Aliases/Controller.php).

Create constants for your site's entities and add them to Controllers map.

```php
const ARTICLE   = 1;
const USER      = 2;
...

const MAP = array(
    self::ARTICLE   => 'Articles',
    self::USER      => 'Users',
    ...
);
```

It means than entity `ARTICLE` requires controller with name `Articles`.

#### Subcontrollers

Aliases module suggest you two types of subcontrollers:

- `Index` for showing entities
- `Modify` for do anything else with them

##### Example

If you have entity `User`, then create two controllers

1. To show user by uri `/alice` or `/bob`:

`Controller/Users/Index.php` with action `action_show`

2. To do any editions as adding, deleting. Uri: `/my-great-article/edit` or `/not-a-good-user/ban`

`Controller/Users/Modify.php` with all other actions e.g. `action_add`, `action_edit`, `action_delete`.

All you need after is to include aliases creation and update methods into your logic.

### Resource creation

```php
$alias         = Model_Aliases::generateUri($uri);
$resource_type = Aliases_Controller::ARTICLE;       // your own resource's type such as user, article, category and other
$resource_id   = 12345;

$article->uri = Model_Aliases::addAlias($alias, $resource_type, $resource_id);
```

### Resource updating

```php
$resource_id   = $article->id;
$old_uri       = $article->uri;
$new_uri       = Model_Aliases::generateUri($uri);
$resource_type = Aliases_Controller::ARTICLE;

$article->uri = Model_Aliases::updateAlias($old_uri, $new_uri, $resource_type, $resource_id);
```

## What about cache

Note that module's version does not include a cache scheme. You may need `memcache` or another driver to add this feature.

## Repository

<a href="https://github.com/codex-team/kohana-aliases/">https://github.com/codex-team/kohana-aliases/</a>

## About CodeX

We are small team of Web-developing fans consisting of IFMO students and graduates located in St. Petersburg, Russia.
Fell free to give us a feedback on <a href="mailto::team@ifmo.su">team@ifmo.su</a>
