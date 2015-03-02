---
layout: post
title: 编译安装lnmp
categories: code
---

##编译安装PHP
1. 安装一些需要的库

		yum -y install gcc gcc-c++ libxml2 libxml2-devel autoconf libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel openssl-devel bzip2-devel libcurl-devel t1lib-devel gmp-devel libc-client-devel openldap-devel expat-devel libxslt-devel libmcrypt libmcrypt-devel libedit

2. 添加web执行用户
		
		groupadd www
		useradd -g www www

3. 安装第三方包(无法用yum安装的库)

		wget http://softlayer.dl.sourceforge.net/sourceforge/mcrypt/libmcrypt-2.5.8.tar.gz
		tar zxf libmcrypt-2.5.8.tar.gz
		./configure && make && make install

4. 配置configure(phg源码自行下载)

		./configure --prefix=<要安装php的目录> --with-config-file-path=<要安装php的目录>/etc --with-config-file-scan-dir=<要安装php的目录>/etc/php.d --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysql=mysqlnd --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-iconv-dir --with-freetype-dir --with-jpeg-dir --with-png-dir --with-zlib --with-libxml-dir=/usr --with-curl --with-gd --with-openssl --with-mhash --with-xmlrpc --with-mcrypt --without-pear --with-gettext --enable-xml --disable-rpath --enable-magic-quotes --enable-safe-mode --enable-bcmath --enable-shmop --enable-sysvsem --enable-inline-optimization --enable-mbregex --enable-mbstring --enable-ftp --enable-gd-native-ttf --enable-pcntl --enable-sockets --enable-zip --enable-soap --disable-fileinfo

5. 安装后配置

		cp php.ini-production <要安装php的目录>/etc/php.ini
		cp <要安装php的目录>/etc/php-fpm.conf.default <要安装php的目录>/etc/php-fpm.conf
		mkdir <要安装php的目录>/etc/php.d
		cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
		chmod u+x /etc/init.d/php-fpm
		service php-fpm start
		chkconfig php-fpm on

##编译安装Nginx

>  可以参考官网 http://www.nginx.cn/install

1. 下载需要的包

		wget http://nginx.org/download/nginx-1.7.9.tar.gz
		wget http://zlib.net/zlib-1.2.8.tar.gz
		wget http://cznic.dl.sourceforge.net/project/pcre/pcre/8.34/pcre-8.34.tar.gz

2. 配置configure

		./configure \
		--sbin-path=/usr/local/nginx/nginx \
		--conf-path=/usr/local/nginx/nginx.conf \
		--pid-path=/usr/local/nginx/nginx.pid \
		--user=www \
		--group=www \
		--with-http_ssl_module \
		--with-pcre=<pcre包的源码路径>/pcre-8.34 \
		--with-zlib=<zlib包的源码路径>/zlib-1.2.8

3. 编译的nginx没有启动脚本,自己写一个,或者下载一个.

##编译安装Mysql

>  可以参考博文 http://www.cnblogs.com/xiongpq/p/3384681.html

1. 源码下载

		wget http://cdn.mysql.com/Downloads/MySQL-5.6/mysql-5.6.14.tar.gz

2. 编译环境安装

		 yum -y install make gcc-c++ cmake bison-devel  ncurses-devel

3. make配置

		cmake \
		-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
		-DMYSQL_DATADIR=/usr/local/mysql/data \
		-DSYSCONFDIR=/etc \
		-DWITH_MYISAM_STORAGE_ENGINE=1 \
		-DWITH_INNOBASE_STORAGE_ENGINE=1 \
		-DWITH_MEMORY_STORAGE_ENGINE=1 \
		-DWITH_READLINE=1 \
		-DMYSQL_UNIX_ADDR=/var/lib/mysql/mysql.sock \
		-DMYSQL_TCP_PORT=3306 \
		-DENABLED_LOCAL_INFILE=1 \
		-DWITH_PARTITION_STORAGE_ENGINE=1 \
		-DEXTRA_CHARSETS=all \
		-DDEFAULT_CHARSET=utf8 \
		-DDEFAULT_COLLATION=utf8_general_ci

4. 安装

		make && make install

5. 添加mysql执行用户

		groupadd mysql
		useradd -g mysql mysql
		chown -R mysql:mysql /usr/local/mysql

> lnmp环境安装后的配置请参考官方文档或者google