--
-- Database: `codex`
--

-- --------------------------------------------------------

--
-- Table structure for table `Requests`
--

CREATE TABLE IF NOT EXISTS `Requests` (
    `id` int(11) NOT NULL,
    `uid` int(11) unsigned DEFAULT NULL,
    `skills` text,
    `wishes` text,
    `dt_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requests`
--
--
ALTER TABLE `Requests`
ADD PRIMARY KEY (`id`), ADD KEY `uid` (`uid`);

ALTER TABLE `Requests`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;