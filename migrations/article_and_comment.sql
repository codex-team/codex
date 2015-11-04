CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `title` varchar(140) NOT NULL,
  `description` VARCHAR(140) NOT NULL,
  `text` text NOT NULL,
  `cover` varchar(10),
  `dt_add` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `dt_edit` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `article` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `text` text NOT NULL,
  `dt_add` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `dt_edit` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `is_removed` TINYINT(1) DEFAULT FALSE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


