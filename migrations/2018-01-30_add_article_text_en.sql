ALTER TABLE `Articles` DROP `text`;

ALTER TABLE `Articles` CHANGE `json` `text` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `Articles` ADD `linked_article` INT(10) NULL DEFAULT NULL AFTER `uri`;

ALTER TABLE `Articles` ADD `lang` VARCHAR(128) NULL DEFAULT NULL AFTER `description`;
