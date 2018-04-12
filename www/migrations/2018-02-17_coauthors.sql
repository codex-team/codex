CREATE TABLE `Coauthors` ( `article_id` INT(10) UNSIGNED NOT NULL , `user_id` INT(10) NULL DEFAULT NULL ) ENGINE = InnoDB;
ALTER TABLE `Coauthors` ADD PRIMARY KEY(`article_id`);
ALTER TABLE `Coauthors` ADD INDEX(user_id);