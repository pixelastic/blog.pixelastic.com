---
layout: post
title: "Using both php4 and php5 with Easyphp"
custom_v2_id: 23
---

I'm mostly developing on my Windows machine, using EasyPHP (combining Apache,
Mysql and PHP). Each version of EasyPHP is bundled with a specific version of
php.

I'm now almost exclusively developping with the sweetness of php5, but I still
have from time to time to refactor a piece of code on an legacy app running on
php4.

I have finally found a way to make specific website to work on php4 instead of
php5 using the same install of EasyPHP.

The key is : running php4 as a cgi script.

I've finally found a way, by installing php4 as a cgi.

  * Download the [Windows binary of the version](http://fr.php.net/releases/) you want to emulate.
  * Create a subdirectory named php4 in your EasyPHP/apache/cgi-bin/ directory
  * Extract the php.exe, php4ts.dll, sapi/php4apache.dll, php.ini-recommended and the extensions directory in this new directory
  * Rename php.ini-recommended to php.ini (this will be the php.ini used with php4)
  * Edit your apache config file and add the line ScriptAlias /php4/ "${path}/apache/cgi-bin/php4/" after the allready defined ScriptAlias (~line 379)
  * Create a new virtualhost for the website you would like to run in php4. Mine is as follow :

```apache
<Virtualhost *:80>
 ServerName foobar
 ServerAdmin me@localhost
 DocumentRoot "${path}/www/foobar.com"

 <Directory "${path}/www/foobar.com">
 Options Indexes FollowSymLinks Includes ExecCGI
 AllowOverride All
 Order allow,deny
 Allow from all
 </Directory>

 AddHandler php4-script .php .html .htm
 Action     php4-script /php4/php.exe

 </Virtualhost>
```

This means that all .php, .html and .htm file of this virtualhost will be
parsed by the php.exe file in our /cgi-bin/php4 directory.

Don't forget to edit this php.ini if you want to tweak things, and remember
that extensions for this version are in the copied extensions/ directory.

