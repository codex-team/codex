CREATE TABLE IF NOT EXISTS `Sessions` (
`id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `ip` varchar(128) NOT NULL,
  `dt_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_agent` text NOT NULL,
  `access_token` varchar(128) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


ALTER TABLE `Sessions`
 ADD PRIMARY KEY (`id`), ADD KEY `ix_user_id` (`user_id`);

ALTER TABLE `Sessions`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

ALTER TABLE `Sessions` ADD UNIQUE(`access_token`);