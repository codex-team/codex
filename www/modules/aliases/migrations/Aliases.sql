--
-- Table structure for table `Aliases`
--
DROP TABLE IF EXISTS `Aliases`;
CREATE TABLE IF NOT EXISTS `Aliases` (
  `id` int(18) NOT NULL,
  `uri` text NOT NULL,
  `hash` binary(16) NOT NULL,
  `target_type` int(6) NOT NULL,
  `target_id` int(18) NOT NULL,
  `dt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


--
-- Indexes for table `Aliases`
--
ALTER TABLE `Aliases`
ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `hash` (`hash`), ADD KEY `target_id` (`target_id`), ADD KEY `target_type` (`target_type`);


--
-- AUTO_INCREMENT for table `Aliases`
--
ALTER TABLE `Aliases`
MODIFY `id` int(18) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
