---
layout: post
title: "Protecting a directory using HTTP Auth on Dreamhost with cakePHP"
custom_v2_id: 258
---

<p>One can protect the browsing of a special directory with a simple set of login/password by using appropriate <code>.htaccess</code>/<code>.htpasswd</code> files.</p>
<h4>The classic way</h4>
<p>Just create an <code>.htaccess</code> in the directory you want to protect with the following lines :</p>
<pre><code lang="apache">AuthName "Restricted Access"<br />AuthType Basic<br />AuthUserFile /full/path/to/your/.htpasswd<br />&lt;Limit GET POST PUT&gt;<br />Require valid-user<br />&lt;/Limit&gt;</code></pre>
<p>And to create the .htpasswd file, run the following command :</p>
<pre><code lang="sh">htpasswd -c /full/path/to/your/.htpasswd username</code></pre>
<p>The <code>-c</code> modifier will create the file, omit it if you only want to add a new user. Also change the path to your <code>.htpasswd</code> file (moving it out of the webdir could be a good idea) and change <code>username </code>to any login you want.</p>
<p>You'll then be prompted to enter the password (twice) and your file will be generated.</p>
<h4>cakePHP and Dreamhost fixed</h4>
<p>I had an issue when protecting a folder in my <code>app/webroot/ </code>folder on Dreamhost. I'm not sure it is completly cake related nor Dreamhost related but the two together made it quite hard to debug.</p>
<p>Anyway, it appears that when issuing an HTTP Auth, Dreamhost redirect to a file named <code>/failed_auth.html</code> (this is the file you're supposed to see when your Auth fails, obviously).</p>
<p>But as I didn't have such a file in my app, everytime I tried to access my protected dir, I got my custom 404 error page.</p>
<p>To finally fix that, all I had to do was to create a real <code>failed_auth.html</code> page, or in my case, create a Route that redirect <code>failed_auth.html</code> to a custom failed auth page.</p>
<p>I guess just dropping a <code>failed_auth.html</code> file in <code>app/webroot/ </code>could have done the trick too.</p>