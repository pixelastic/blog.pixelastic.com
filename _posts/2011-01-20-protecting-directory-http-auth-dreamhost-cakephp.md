---
layout: post
title: "Protecting a directory using HTTP Auth on Dreamhost with cakePHP"
custom_v2_id: 258
---

One can protect the browsing of a special directory with a simple set of
login/password by using appropriate `.htaccess`/`.htpasswd` files.

## The classic way

Just create an `.htaccess` in the directory you want to protect with the
following lines :

    
```apache
AuthName "Restricted Access"  
AuthType Basic  
AuthUserFile /full/path/to/your/.htpasswd  
<Limit GET POST PUT>  
Require valid-user  
</Limit>
```

And to create the .htpasswd file, run the following command :

    
```sh
htpasswd -c /full/path/to/your/.htpasswd username
```

The `-c` modifier will create the file, omit it if you only want to add a new
user. Also change the path to your `.htpasswd` file (moving it out of the
webdir could be a good idea) and change `username `to any login you want.

You'll then be prompted to enter the password (twice) and your file will be
generated.

## cakePHP and Dreamhost fixed

I had an issue when protecting a folder in my `app/webroot/ `folder on
Dreamhost. I'm not sure it is completly cake related nor Dreamhost related but
the two together made it quite hard to debug.

Anyway, it appears that when issuing an HTTP Auth, Dreamhost redirect to a
file named `/failed_auth.html` (this is the file you're supposed to see when
your Auth fails, obviously).

But as I didn't have such a file in my app, everytime I tried to access my
protected dir, I got my custom 404 error page.

To finally fix that, all I had to do was to create a real `failed_auth.html`
page, or in my case, create a Route that redirect `failed_auth.html` to a
custom failed auth page.

I guess just dropping a `failed_auth.html` file in `app/webroot/ `could have
done the trick too.

