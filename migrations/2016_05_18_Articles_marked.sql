ALTER TABLE `Articles` ADD `marked` TINYINT(1) NOT NULL DEFAULT '0' COMMENT 'Помечает статью в списке как важную' ;
ALTER TABLE `Articles` ADD `order` INT(11) NOT NULL DEFAULT '0' COMMENT 'Порядок вывода статей. 0 означает сортировку по дате' ;

