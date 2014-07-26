---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 3)"
custom_v2_id: 48
tags: cakephp, bbpress
---

Let's go back to bbPress now. With the previous post, you should be able to
create bbPress user directly from your app.

## Redirecting bbPress to the cakePHP app actions

What we'll be doing now is adding some hooks on every user-related action on
bbPress to redirect them to their equivalent in your app. No need to have two
different login form, hey ?

Create a new php file in your `app/webroot/forum/my-plugins/` directory, and
copy and paste the following code :


```php
/*
Plugin Name: cakePHP User
Description:  Remaps each login/register/forgotpass action to those of your own application
Version: 0.1
Author: Pixelastic
Author URI: http://www.pixelastic.com/

License: CC-GNU-GPL http://creativecommons.org/licenses/GPL/2.0/

*/

define( 'APP_URL', 'http://www.myapp.com/' );
/**
 *    __convertToAppUrl
 *    Convert a given bbPress URI to one mapped to the main application
 **/
function cake_convertToAppUrl($uri) {
   // We explode the path in different subdirs
   $paths = explode('/', $uri);
   $nbrPath = count($paths);

   // We get the last part of the url
   $endUri = substr($uri, strrpos($uri, "/")+1);

   $mappedUrl = array(
     // Register
     'register.php' => 'users/add',
     // Lost password
     'password-reset.php' => 'users/pass',
     // Login
     'bb-login.php' => 'users/login',
     // Logout
     'bb-login.php?action=logout' => 'users/logout',
     // Profile editing
     'edit' => 'users/edit/'.$paths[$nbrPath-2]
   );

   // If there is a mapping, we return it, otherwise we don't touch the uri
   return (!empty($mappedUrl[$endUri])) ? APP_URL.$mappedUrl[$endUri] : $uri;
}
// We filter both bb_uri and bb_get_uri
add_filter('bb_uri', 'cake_convertToAppUrl', 1);
add_filter('bb_get_uri', 'cake_convertToAppUrl', 1);
```

It will hook every method that ask for a url and convert the result to return
the corresponding url in your own app.

Don't forget to enable this plugin in your bbPress admin panel.

Of course, feel free to change the destination url to reflect those of your
app.

## Additional information

Note that the` users/edit/ `method takes the bbPress `nicename `as argument,
so you should have to convert it before displaying the edit form.

I also edited my template and added an hidden field in the bbPress login form
to check if the login was coming from the app or the forum and redirect
accordingly.
