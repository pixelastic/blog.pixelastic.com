---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 1)"
custom_v2_id: 46
---

<p>Today I had to integrate a forum into an existing cakePHP app. I didn't want to code the whole thing from scratch and wanted to take advantage of one of the great opensource forums out there instead.</p>
<p>I wanted to keep the forum as a stand-alone part, with its own admin panel, and not mess with its core files, to allow me the possibility of updating it if needed. But I didn't want my user to register twice, for my app and for the forum, I wanted the whole register/login thing to be as smooth as possible.</p>
<p>After some trials, I finally choose bbPress, from the makers of WordPress.</p>
<p>I took me some time, digging into the online documentation (pretty much non-existent), digging into existing plugins and the source code to finally script what I needed. I had to code a cake behavior, a cake component, a bbPress plugin, overwriting some bbPress functions but it finally works.</p>
<h4>Installing bbPress on a cakePHP app</h4>
<p>First thing you need to do is installing bbPress. Just drop the files you downloaded into <code>app/webroot/forum</code> and follow the installation instruction. Set the admin login the same as your own admin login in your app. Type anything you want for the password, we'll change that later.</p>
<p>Once this is done, you should have a working forum, and being able to access it on <code>/forum</code>. It's a good start, isn't it ?</p>
<p>Now, open your favorite mysql editor (Navicat or phpmyadmin) and connect to your database. Make sure the collation of the <code>bb_ tables</code> are the same as the collation of your cake tables. It will allow them to correctly communicate. My cake tables were set to <code>utf8_unicode_ci</code> and my bbPress tables were set to <code>utf8_general_ci</code>. I had to update all the bbPress tables to make sure no collation problems arise.</p>
<h4>Using the same password hashing</h4>
<p>Now let's look at our bb_users table. You should have one entry for your admin account. Go to your own cake <code>users </code>table, copy your password hash and paste it in place if the bbPress one. Cake and bbPress do not use the same hashing algorithm, so we are going to change that.</p>
<p>Open <code>forum/bb-config.php</code> and add the following code :</p>
<pre lang="php"><code lang="php">define('CAKE_SALT', "XXXXX");<br />// Check password using sha1<br />function bb_check_password( $password, $hash, $user_id = '' ) {<br /> 	// Does it match ?<br />	return sha1(CAKE_SALT.$password)==$hash;<br />}</code></pre> <p>Of course, replace the <code>XXXXX </code>value of <code>CAKE_SALT</code> with your own <code>Security.Salt</code> value (usually found in <code>app/config/core.php</code>). Also note that the default hashing method used by cake is <code>sha1</code>, but if you use an alternate <code>md5 </code>or <code>sha256</code>, you'll have to update the method above.</p>
<p>Doing all this, we change the way bbPress checks for a valid password. The method gets the plain password and the hashed version stored in the database and compare them. Cake does its comparison using its own internal salt value and applying <code>sha1()</code> on it. We just do the same here. That way, we can now login using the same password.</p>