ALTER TABLE `articles` DROP `text`;

ALTER TABLE `Articles` CHANGE `json` `text` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `articles` ADD `linked_article` INT(10) NULL DEFAULT NULL AFTER `uri`;

ALTER TABLE `articles` ADD `lang` VARCHAR(128) NULL DEFAULT NULL AFTER `description`;