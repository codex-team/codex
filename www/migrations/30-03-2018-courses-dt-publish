ALTER TABLE `Courses` ADD `dt_publish` TIMESTAMP NULL DEFAULT NULL AFTER `dt_create`;
UPDATE `Courses` SET `dt_publish` = `dt_create` WHERE `dt_publish` IS NULL;