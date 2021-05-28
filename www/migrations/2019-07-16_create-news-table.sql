--
-- Table structure for table `News`
--

CREATE TABLE `News` (
    `id` INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INTEGER(10) UNSIGNED NOT NULL,
    `ru_text` VARCHAR(255) NOT NULL,
    `en_text` VARCHAR(255) NOT NULL,
    `type` TINYINT UNSIGNED NOT NULL,
    `dt_display` TIMESTAMP NOT NULL,
    `dt_create` TIMESTAMP NULL
) ENGINE INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
