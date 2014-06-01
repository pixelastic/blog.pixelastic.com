---
layout: post
title: "Understanding nginx location blocks and rewrite rules"
custom_v2_id: 357
---

I recently moved a cakePHP website from an Apache server to an Nginx one. I
had to translate url rewriting rules from one syntax to the other, and here is
what I learned.

First of all, Nginx internal logic for processing rewrite rules is not as
straightforward as Apache. In Apache, rules are processed in the order in
which they appear in your config file/`.htaccess`. In Nginx, they follow a
more complex pattern.

## Initial Apache rules

First of all, here are the (simplified) set of rules I had to convert :

    
    RewriteRule ^(css|js)/packed_(.*)$ $1/packed/$2 [L]  
      
    RewriteRule ^files/([0-9]{4})/([0-9]{2})/([0-9]{2})/([[:alnum:]]{8}-[[:alnum:]]{4}-[[:alnum:]]{4}-[[:alnum:]]{4}-[[:alnum:]]{12})/(.*)\.(.{3,4})	/files/$1/$2/$3/$4.$6 [L]  
      
    RewriteCond %{REQUEST_FILENAME} !-d  
    RewriteCond %{REQUEST_FILENAME} !-f  
    RewriteRule ^(.*)$ index.php?url=$1 [QSA,L]  
      
    

The first rule deals with compressed `css` and `js` files. Minified `css` and
`js` files are saved in `/css/packed/` with a filename made of a md5 hash of
the original filenames and a timestamp. So a url of
`/css/packed_6e4f31ffc48b6_1330851887.css` will actually return the file
located in `/css/packed/6e4f31ffc48b6_1330851887.css`

The second rule is about media files uploaded on the server. Each uploaded
file is stored in the `/files/` directory, in a subfolder made from the
uploading date (like `/files/2012/08/25/`). The actual file is given a UUID
when saved, and this UUID is used as its filename on disk. The rewrite rule
allow the use of any custom filename when linking the file. This helps for SEO
purposes as well as making it more user-friendly when we present a download to
our users.Â So
`/files/2012/08/25/50483446-4b00-4d5b-8498-763e45a3e447/Subscription_form.pdf`
actually returns the file at
`/files/2012/09/06/50483446-4b00-4d5b-8498-763e45a3e447.pdf`

And the last rule is the default cakePHP rewrite rule. It first checks if the
requested url points to an existing directory or file, and if not dispatch it
to the main entry point : `index.php` with the requested url as a parameter.

## Converting it to Nginx

Rewrite rules in Nginx are usually found in `location` blocks. There are
several ways you can define a `location` block, and it affects the order in
which the rules will be parsed.

Nginx first checks for `location =` blocks. Those blocks are used to catch an
exact match of the requested url. Once such a block is found, its content is
applied, and Nginx stops looking for more matches.

    
    location = /my-exact-file.html {  
    	rewrite /my-exact-file.html http://external-website.com/  
    }

In this example, a request for `/my-exact-file.html` will be redirected to
`http://external-website.com.` Note that you need to repeat the url in both
the `location =` block and the `rewrite` rule.

The `location =` is of very limited use as it only accepts an exact match on a
string. Much more useful are the `location ~` blocks that performs matches on
regex (and the `location ~*` for a case-insensitive version).

Such blocks are tested after the `location = `ones, in the order they appear
in your configuration file. Once a block matches, Nginx applies its content
but does not stop. It keeps looking for other blocks that might match and
apply them. It's up to you, in the block content, to define if the parsing
should stop, using the `break` command.

    
    location ~ /(css|js)/packed_ {  
    	rewrite ^/(css|js)/packed_(.*)$ /$1/packed/$2 break;   
    }    
    location ~ /files {  
     	rewrite ^/files/(.*)/(.*)/(.*)\.(.*)$ /files/$1/$2.$4 break;  
    }

In the first rule I'm looking for any `/css/packed_*` or `/js/packed_*`
request, and converting them to `/css/packed/*` or `/js/packed/*`. Note the
use of backreferences in the rewrite using `$x` variables. In the second rule
I simplified the original regex from Apache to catch the `/2012/08/23/` in
`$1`, the UUID in `$2`, the filename in `$3` and the extension in `$4` and
rewriting the request to the correct file on disk.

Both rewrites ends with the `break` flag. It tells Nginx that it should stop
looking for other `location ~` blocks matching the requested url and just
serve the file. Another useful flag is `last`, which tells Nginx to restart
its whole url matching process from the beginning but this time using the
newly rewritten url.

There is one last `location` block that we can use, and it's the simple
`location`, without any prefix. These `location` blocks will be checked last,
if no `location =` orÂ `location ~` had stopped the processing. They are
especially good for a last "catch all" solution, and we are going to use them
to dispatch urls to `index.php`

    
    location / {  
     	try_files $uri /index.php?url=$request_uri;   
    }  
    

Using `location /`, we'll catch any remaining requests. The `try_files`
command will test every one of its arguments in order to see if they exist on
disk and serve them if they do. So in our example it will first check for the
requested uri, and if such a file exists, will serve it. Otherwise it will
simply dispatch it to the main `index.php` with the requested url as an
argument and cakePHP will do the rest.

There is one last thing we must do, it's telling Nginx to pass any `.php` file
to the PHP fastcgi. This is quite easy using a `location ~` block matching any
`.php` file. This will even apply to files served through `try_files`.

    
    location ~ \.php$ {  
     	fastcgi_pass   127.0.0.1:9000;  
     	fastcgi_index  index.php;  
     	fastcgi_intercept_errors on;  
    	include fastcgi.conf;  
    }  
    

## Conclusion

Wrapping your mind around the order in which Nginx applies your rewrites is
not easy at first. I hope this post helped you making sense of it.

Note that there also is the `location ^~` block but I found it to be of very
limited used as its behavior can be replicated with the more generic `location
~` blocks.

