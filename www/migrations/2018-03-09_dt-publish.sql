ALTER TABLE `Articles` ADD `dt_publish` TIMESTAMP NULL DEFAULT NULL AFTER `dt_create`;
UPDATE `Articles` SET `dt_publish` = `dt_create` WHERE `dt_publish` IS NULL