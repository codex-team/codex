CREATE TABLE IF NOT EXISTS `Users` (
`id` int(11) NOT NULL,
  `first_name` tinytext NOT NULL,
  `last_name` tinytext NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE `Users`
 ADD PRIMARY KEY (`id`);