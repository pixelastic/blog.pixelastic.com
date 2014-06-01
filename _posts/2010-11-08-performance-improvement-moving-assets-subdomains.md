---
layout: post
title: "Performance improvement : moving assets to subdomains"
custom_v2_id: 238
---

<p><strong>Disclaimer : What I'm talking about in this blog post can be optimised. Yes, having multiple hosts is a great feature for performance improvement, but I kind of did it wrong. My recent try at the webperf contest gave me more insight on how to do it right. </strong></p>
<p><strong>I'll post more on the subject or update this post to reflect that.</strong></p>
<p> </p>
<p>I've just added to this site a performance improvement I read a long time ago but never implemented.</p>
<p>I'm talking about the multiple domains to serve static content. There are two important things to note here : parallel requests and cookies. Let me explain in a little more details what it's all about.</p>
<h4>Parallell requests</h4>
<p>Your browser is only able to perform a certain number of parallel request at the same time. It means that it can only download a certain number of files concurrently (usually 4).</p>
<p>In other words, it will start the download of, say, a CSS file, a Javascript file, and two images. Then, whenever one of this files is received, it will start downloading a new file, and so on.</p>
<p>This means that there is a certain amount of time that is "lost" in the process. You have to wait for one of the files to be downloaded before starting downloading the next.</p>
<p>The important thing to note is that the limit on the number of parallel downloads is set on a per-domain basis. It means that you can download only 4 files of <code>foo.com</code> while downloading at the same time 4 files from <code>bar.com</code>. This is the basic of what we will be using to our advantage.</p>
<p>Splitting your files accross several domains (or subdomains) allows you to get the best of parallel download. You do not really need to have your content hosted on different servers, you just need them to be accessible through different domain names, and subdomains are just perfect for that.</p>
<p>I have created four subdomains : <code>css.pixelastic.com</code>, <code>js.pixelastic.com</code>, <code>img.pixelastic.co</code>m and <code>dl.pixelastic.com</code>.</p>
<p>Each one maps to the exact same site as <code>www.pixelastic.com</code> but using different names improve the number of possible downloads and thus improve page load.</p>
<h4>Cookies</h4>
<p>All this stuff about subdomains brings me to my second point : cookies.</p>
<p>If you host all your files on the same domain, it means that all requests (be it a php page or a static css file) will send cookie information without you knowing.</p>
<p>Cookie data is usually small, like 100Ko or so, but is added to every single request made. And most of the time this information is not even useful.</p>
<p>Apart from the fact that you are slowly killing your website bandwith with useless information, your are also decreasing your page speed load for your potential user.</p>
<p>The same trick of using a subdomain applies here too, and cookies won't be sent.</p>
<p>There is one caveat that you should be aware of, though. If your site is accessible through <code>domain.com</code> and you host your files on <code>files.domain.com</code>, cookies will still be sent because <code>domain.com</code> is considered the master domain of <code>files.domain.com</code> and thus all cookies set on the main domain will also propagate to the subdomains.</p>
<p>On the other hand, if your main domain is <code>www.domain.com</code>, it is not considered a parent domain of <code>files.domain.com</code> (but rather a sibling domain).</p>
<h4>Configuring Apache</h4>
<p>If you need to edit your <code>httpd.con</code>f file, here is what I put to add my different subdomains on my local machine :</p>
<pre><code lang="apache">&lt;VirtualHost *:80&gt;<br />	ServerName pixelastic<br />	ServerAlias www.pixelastic<br />	ServerAlias css.pixelastic<br />	ServerAlias js.pixelastic<br />	ServerAlias img.pixelastic<br />	ServerAlias dl.pixelastic<br />	DocumentRoot "www/pixelastic.com"<br />	&lt;Directory "www/pixelastic.com"&gt;<br />		Options Indexes FollowSymLinks Includes ExecCGI<br />		AllowOverride All<br />		Order allow,deny<br />		Allow from all<br />	&lt;/Directory&gt;<br />&lt;/VirtualHost&gt;</code></pre>
<p> </p>