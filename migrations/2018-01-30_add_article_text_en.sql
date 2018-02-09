ALTER TABLE `articles` DROP `json`;

ALTER TABLE `articles` ADD `linked_article` INT(10) NULL DEFAULT NULL AFTER `uri`;

ALTER TABLE `articles` ADD `lang` VARCHAR(128) NULL DEFAULT NULL AFTER `description`;