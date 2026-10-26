# PHP 8.4.27 fixes CVE-2026-109618 and CVE-2026-109619 (RCE in PHP-FPM)
# Read: https://www.php.net/archive/2026.php#2026-10-21-5
#
# > use Debian Bookworm cause it ships ImageMagick 6: Imagick::setImageOpacity()
# > used by pavelzotikov/social-covers-generator does not exist with ImageMagick 7
FROM php:8.4.27-fpm-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    wget \
    unzip \
    libz-dev \
    libjpeg-dev libpng-dev libfreetype6-dev \
    libssl-dev libpcre3 libpcre3-dev \
    libmagickwand-dev imagemagick

# Build fonts cache for ImageMagick. Otherwise PHP-FPM workers log
# "Fontconfig error: No writable cache directories" on every cover render
RUN fc-cache -f

# Set the locale
RUN apt-get -qq update && apt-get -qqy install locales
RUN sed -i -e 's/# ru_RU ISO-8859-5/ru_RU ISO-8859-5/' /etc/locale.gen && \
    sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=ru_RU.UTF-8 && \
    echo "LANGUAGE=ru_RU.UTF-8" >> /etc/default/locale && \
    echo "LC_ALL=ru_RU.UTF-8" >> /etc/default/locale

# Set timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN "date"

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Install memcache extension
# > version 8.x supports PHP 8
RUN pecl install memcache-8.2
RUN docker-php-ext-enable \
    memcache

# Install ImageMagick
# > Imagick::setImageOpacity() is deprecated since 3.4.4, so we disable
# > E_DEPRECATED in bootstrap. Read: https://www.php.net/manual/en/imagick.setimageopacity.php
RUN pecl install imagick-3.8.1
RUN docker-php-ext-enable \
    imagick

# Install redis php-exts
RUN pecl install redis-6.3.0
RUN docker-php-ext-enable \
    redis

# Configure GD library
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Enable some php-exts
RUN docker-php-ext-install \
    mysqli \
    gettext \
    gd

# Install phpMyAdmin
#RUN wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.zip
#RUN unzip phpMyAdmin-5.0.2-all-languages.zip
#RUN mv phpMyAdmin-5.0.2-all-languages /usr/share/phpmyadmin
#RUN cp /usr/share/phpmyadmin/config.sample.inc.php /usr/share/phpmyadmin/config.inc.php && \
#    sed -i "s/\['host'\] = 'localhost'/\['host'\] = 'mysql'/" /usr/share/phpmyadmin/config.inc.php

#WORKDIR /var/www/codex

COPY www /var/www/codex

WORKDIR /var/www/codex

RUN composer install
