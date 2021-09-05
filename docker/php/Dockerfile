FROM php:7.2-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    wget \
    unzip \
    libz-dev \
    libjpeg-dev libpng-dev libfreetype6-dev \
    libssl-dev libpcre3 libpcre3-dev \
    libmagickwand-dev imagemagick

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
RUN set -x \
    && cd /tmp \
    && curl -sSL -o php7.zip https://github.com/websupport-sk/pecl-memcache/archive/php7.zip \
    && unzip php7 \
    && cd pecl-memcache-php7 \
    && /usr/local/bin/phpize \
    && ./configure --with-php-config=/usr/local/bin/php-config \
    && make \
    && make install \
    && echo "extension=memcache.so" > /usr/local/etc/php/conf.d/ext-memcache.ini \
    && rm -rf /tmp/pecl-memcache-php7 php7.zip

# Install ImageMagick
# > use version 3.4.3 cause "Function Imagick::setImageOpacity() is deprecated"
# > in 3.4.4 and above. Read: https://www.php.net/manual/en/imagick.setimageopacity.php
RUN pecl install -f imagick-3.4.3
RUN docker-php-ext-enable \
    imagick

# Install redis php-exts
RUN pecl install redis
RUN docker-php-ext-enable \
    redis

# Configure GD library
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/

# Enable some php-exts
RUN docker-php-ext-install \
    mysqli \
    gettext \
    gd

# Install phpMyAdmin
RUN wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.zip
RUN unzip phpMyAdmin-5.0.2-all-languages.zip
RUN mv phpMyAdmin-5.0.2-all-languages /usr/share/phpmyadmin
RUN cp /usr/share/phpmyadmin/config.sample.inc.php /usr/share/phpmyadmin/config.inc.php && \
    sed -i "s/\['host'\] = 'localhost'/\['host'\] = 'mysql'/" /usr/share/phpmyadmin/config.inc.php

WORKDIR /var/www/codex
