ALTER TABLE `articles` ADD `text_en` LONGTEXT NULL DEFAULT NULL AFTER `text`;
ALTER TABLE `articles` CHANGE `json` `text` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE `articles` ADD `title_en` VARCHAR(128) NULL DEFAULT NULL AFTER `title`;
ALTER TABLE `articles` CHANGE `text` `text_ru` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE `articles` CHANGE `title` `title_ru` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE `articles` CHANGE `description` `description_ru` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;