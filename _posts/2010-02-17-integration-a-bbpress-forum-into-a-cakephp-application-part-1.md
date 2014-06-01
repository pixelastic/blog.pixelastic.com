---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 1)"
custom_v2_id: 46
---

Today I had to integrate a forum into an existing cakePHP app. I didn't want
to code the whole thing from scratch and wanted to take advantage of one of
the great opensource forums out there instead.

I wanted to keep the forum as a stand-alone part, with its own admin panel,
and not mess with its core files, to allow me the possibility of updating it
if needed. But I didn't want my user to register twice, for my app and for the
forum, I wanted the whole register/login thing to be as smooth as possible.

After some trials, I finally choose bbPress, from the makers of WordPress.

I took me some time, digging into the online documentation (pretty much non-
existent), digging into existing plugins and the source code to finally script
what I needed. I had to code a cake behavior, a cake component, a bbPress
plugin, overwriting some bbPress functions but it finally works.

## Installing bbPress on a cakePHP app

First thing you need to do is installing bbPress. Just drop the files you
downloaded into `app/webroot/forum` and follow the installation instruction.
Set the admin login the same as your own admin login in your app. Type
anything you want for the password, we'll change that later.

Once this is done, you should have a working forum, and being able to access
it on `/forum`. It's a good start, isn't it ?

Now, open your favorite mysql editor (Navicat or phpmyadmin) and connect to
your database. Make sure the collation of the `bb_ tables` are the same as the
collation of your cake tables. It will allow them to correctly communicate. My
cake tables were set to `utf8_unicode_ci` and my bbPress tables were set to
`utf8_general_ci`. I had to update all the bbPress tables to make sure no
collation problems arise.

## Using the same password hashing

Now let's look at our bb_users table. You should have one entry for your admin
account. Go to your own cake `users `table, copy your password hash and paste
it in place if the bbPress one. Cake and bbPress do not use the same hashing
algorithm, so we are going to change that.

Open `forum/bb-config.php` and add the following code :

    
    define('CAKE_SALT', "XXXXX");  
    // Check password using sha1  
    function bb_check_password( $password, $hash, $user_id = '' ) {  
     	// Does it match ?  
    	return sha1(CAKE_SALT.$password)==$hash;  
    }

Of course, replace the `XXXXX `value of `CAKE_SALT` with your own
`Security.Salt` value (usually found in `app/config/core.php`). Also note that
the default hashing method used by cake is `sha1`, but if you use an alternate
`md5 `or `sha256`, you'll have to update the method above.

Doing all this, we change the way bbPress checks for a valid password. The
method gets the plain password and the hashed version stored in the database
and compare them. Cake does its comparison using its own internal salt value
and applying `sha1()` on it. We just do the same here. That way, we can now
login using the same password.

