CREATE TABLE `codexdb`.`coauthors` ( `article_id` INT(10) UNSIGNED NOT NULL , `user_id` INT(10) NULL DEFAULT NULL ) ENGINE = InnoDB;
ALTER TABLE `coauthors` ADD PRIMARY KEY(`article_id`);
ALTER TABLE `coauthors` ADD INDEX(user_id);