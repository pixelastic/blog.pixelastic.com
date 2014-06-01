---
layout: post
title: "Using both php4 and php5 with Easyphp"
custom_v2_id: 23
---

<p>I'm mostly developing on my Windows machine, using EasyPHP (combining Apache, Mysql and PHP). Each version of EasyPHP is bundled with a specific version of php.</p>
<p>I'm now almost exclusively developping with the sweetness of php5, but I still have from time to time to refactor a piece of code on an legacy app running on php4.</p>
<p>I have finally found a way to make specific website to work on php4 instead of php5 using the same install of EasyPHP.</p>
<p>The key is : running php4 as a cgi script.</p>
<p>I've finally found a way, by installing php4 as a cgi.</p>
<ul>
<li>Download the <a href="http://fr.php.net/releases/">Windows binary of the version</a> you want to emulate.</li>
<li>Create a subdirectory named php4 in your EasyPHP/apache/cgi-bin/ directory </li>
<li>Extract the php.exe, php4ts.dll, sapi/php4apache.dll, php.ini-recommended and the extensions directory in this new directory </li>
<li>Rename php.ini-recommended to php.ini (this will be the php.ini used with php4) </li>
<li>Edit your apache config file and add the line ScriptAlias /php4/ "${path}/apache/cgi-bin/php4/" after the allready defined ScriptAlias (~line 379)</li>
<li>Create a new virtualhost for the website you would like to run in php4. Mine is as follow :</li>
</ul>
<pre>&lt;Virtualhost *:80&gt; <br /> ServerName foobar <br /> ServerAdmin me@localhost <br /> DocumentRoot "${path}/www/foobar.com" <br /> <br /> &lt;Directory "${path}/www/foobar.com"&gt; <br /> Options Indexes FollowSymLinks Includes ExecCGI <br /> AllowOverride All <br /> Order allow,deny <br /> Allow from all <br /> &lt;/Directory&gt; <br /> <br /> AddHandler php4-script .php .html .htm <br /> Action     php4-script /php4/php.exe <br /> <br /> &lt;/Virtualhost&gt; </pre>
<p>This means that all .php, .html and .htm file of this virtualhost will be parsed by the php.exe file in our /cgi-bin/php4 directory.</p>
<p>Don't forget to edit this php.ini if you want to tweak things, and remember that extensions for this version are in the copied extensions/ directory.</p>