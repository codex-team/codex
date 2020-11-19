ALTER TABLE `Articles` ADD `hide_from_feed` tinyint(1) NOT NULL DEFAULT '0' AFTER `is_published`;
