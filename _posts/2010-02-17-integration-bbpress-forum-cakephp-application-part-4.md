---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 4)"
custom_v2_id: 49
---

We're almost done. There is just one last thing we must do. We don't want our
dear user to have to login twice, once for the main app and once for the form,
do we ?

## Creating the Configure keys

So first, go back to your `bb-config.php` file and if you haven't already,
define the `BB_AUTH_KEY` and `BB_LOGGED_IN_KEY`.

Go to your `app/config/bootstrap.php` and create entries in `Configure `for
this same keys. I named mine `bbPress.authKey` and `bbPress.logKey`.

Now, go back to your database, open the `bb_meta` table and find the
`bb_auth_salt` and `bb_loggued_in_salt` values. Copy them to two more
`Configure `keys (`bbPress.authSalt` and `bbPress.logSalt`).

One last key to create. Head back to `bb-config.php` and add the following
line :

    
    define('BB_HASH', 'XXXXX');

Of course, set `XXXX` to a unique string. The name of your website should
suffice, it is just used to differenciate between cookies on the same domain.
Report the same value in `Configure` : `bbPress.hash`.

## Creating the cookies

You're now ready to create bbPress cookies. bbPress will need to create two
different sets of cookie.

A bbPress cookie contain a value formatted like :
`<login>|<expiration>|<hash>`

The hash is based on the user password, login, expiration and several other
keys. It also involve double hashing of the value, with different salt and key
values.

I've eased the pain of understanding how to create a cookie value, just use
the following function :

    
    function __getCookieValue($options = array()) {  
    	 // We will need the login, pass and expiration date to create the cookie  
    	 $userLogin = $options['name']; // The user login  
    	 $userPass = $options['password']; // The password encrypted in the database  
    	 $userPassFragment = substr($userPass, 8, 4);    // We will take only a small part of the password  
    	 $expiration = $options['expiration'];  
    	 $data = $userLogin.$userPassFragment."|".$expiration;    // The main data that will be used create the final hash  
      
    	 // We first get a first hash key that we will use to generate a second one  
    	 $firstKey = hash_hmac('md5', $data, $options['salt']);  
    	 // Then we create the final hash saved in the cookie  
    	 $finalHash = hash_hmac('md5', $userLogin.'|'.$expiration, $firstKey);  
      
    	 // The final data to store in the cookie  
    	 return $userLogin."|".$expiration."|".$finalHash;  
      
     }  
    

You should pass to this function an array containing a name, password and
expiration date. The password should be exactly as it is stored in the
database.

You should also pass a 4th value, named salt, that is different depending of
the type of cookie you're trying to create. For a auth cookie, use
`Configure::read('bbPress.authKey').Configure::read('bbPress.authSalt')` and
for a log cookie, use
`Configure::read('bbPress.logKey').Configure::read('bbPress.logSalt')`.

You will need to create two log cookies (for `/` and `/forum/`) and three auth
cookies (for `/forum/bb-admin`,` /forum/bb-plugins` and `/forum/my-plugins`).

Here is the complete method for creating all these cookies. Just call it in
your app whenever your want to log the current user to the forum. Just feed it
a user and password.

    
    /**  
     *    createCookies  
     *    Create the cookies that can be used to connect to the bbPress forum  
     *    bbPress does a lot of complicating stuff with hashing when creating its cookie. We replicate it here  
     *  
     *    The content of the cookie is formed in the format username|expirationDate|hash  
     *  
     *    The hash part is the most difficult, it involve double hashing based on various salt and values  
     **/  
     function createCookies($name, $pass) {  
    	 $expirationDate = time() + 1209600; // When the cookie should stop working (2 weeks)  
      
    	 // Getting the log in salt  
    	 $completeSalt = Configure::read('bbPress.logKey').Configure::read('bbPress.logSalt');  
    	 // The log in cookie name  
    	 $cookieName = "bbpress_logged_in_".Configure::read('bbPress.hash');  
    	 // Getting the value  
    	 $cookieValue = __getCookieValue(array(  
    		 'name' => $name,  
    		 'password' => $pass,  
    		 'salt' => $completeSalt,  
    		 'expiration' => $expirationDate  
    	 ));  
    	 // Setting the cookie for the correct path  
    	 setcookie($cookieName, $cookieValue, $expirationDate, "/", false, false, true);  
    	 setcookie($cookieName, $cookieValue, $expirationDate, "/forum/", false, false, true);  
      
      
      
    	 // Getting the auth salt  
    	 $completeSalt = Configure::read('bbPress.authKey').Configure::read('bbPress.authSalt');  
    	 // The auth cookie name  
    	 $cookieName = "bbpress_".Configure::read('bbPress.hash');  
    	 // Getting the value  
    	 $cookieValue = __getCookieValue(array(  
    		 'name' => $name,  
    		 'password' => $pass,  
    		 'salt' => $completeSalt,  
    		 'expiration' => $expirationDate  
    	 ));  
    	 // Setting the cookie for the correct path  
    	 setcookie($cookieName, $cookieValue, $expirationDate, '/forum/bb-admin', false, false, true);  
    	 setcookie($cookieName, $cookieValue, $expirationDate, '/forum/bb-plugins', false, false, true);  
    	 setcookie($cookieName, $cookieValue, $expirationDate, '/forum/my-plugins', false, false, true);  
     }

And for logging out, just delete the cookies :

    
    function clearCookies() {  
    	 // The name of the cookie to delete  
    	 $cookieName = "bbpress_logged_in_".Configure::read('bbPress.hash');  
    	 setcookie($cookieName, "", time()-3600, "/", false, false, true);  
    	 setcookie($cookieName, "", time()-3600, "/forum/", false, false, true);  
    	 // The auth cookie name  
    	 $cookieName = "bbpress_".Configure::read('bbPress.hash');  
    	 setcookie($cookieName, "", time()-3600, '/forum/bb-admin', false, false, true);  
    	 setcookie($cookieName, "", time()-3600, '/forum/bb-plugins', false, false, true);  
    	 setcookie($cookieName, "", time()-3600, '/forum/my-plugins', false, false, true);  
     }

Hope all that helps ! It took some time to put all this together but I hope it
could help other bakers out there.

## Downloading

For anyone interested, here is a link to download all the files :
http://www.pixelastic.com/download/bbpress.rar

Note that it can't be used as-is because it involves a bbPress install, a
custom Authentication system and also because I wrote it as part of a bigger
plugin.

So, feel free to browse the files and get what you need, but consider it as a
part of a bigger app, so you'll have to re-plug what's missing.

