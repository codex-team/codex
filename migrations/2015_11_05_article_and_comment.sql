DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(140) NOT NULL,
  `description` text NOT NULL,
  `text` text NOT NULL,
  `cover` varchar(30),
  `dt_add` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `dt_edit` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `article` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `dt_add` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `dt_edit` TIMESTAMP,
  `is_removed` TINYINT(1) DEFAULT FALSE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


