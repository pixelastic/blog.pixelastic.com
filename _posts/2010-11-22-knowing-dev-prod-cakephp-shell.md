---
layout: post
title: "Knowing dev from prod in a cakePHP shell"
custom_v2_id: 240
---

I wrote a cakePHP shell to synchronize an IMAP mailbox with a mysql table. I
wanted to test my shell on local first, then upload it and make a CRON job of
it.

Whenever I tried to run the shell from my development environment I was
greeted with various "_Database table is missing_" messages.

After some digging, it occurs that the shell was connecting to my prod
database, not the dev one.

## The culprit

I wrote a little snippet to automatically switch to the correct database based
on the current server name. If it was `localhost`, I used the `$dev`
credentials, while keeping the `$default` credentials for other cases (ie.
production).

This worked great and I added this little code to my `database.php` file.

But when running a shell, the `env('SERVER_ADDR')` was empty, thus my test was
always selecting the prod database.

I couldn't find anyway to guess if I was running a shell from prod or dev. I
sure had access to a lot of config informations through `env` and `$_SERVER`
but none seemed to be enough to guess the correct environment.

## Solution

I finally decided that the only way was to manually pass a flag to my shell
call to tell if it was to use the dev or prod credentials.

I decided that adding a `dev` arg to the shell call will switch to dev mode,
while not adding it will use production mode.

    
    My final shell call looked like : cake -app "path/to/app" mail_import dev  
    

And I added the following logic in my database switching logic :

    
    // Defining the Environment (prod or dev)  
    if (defined('CAKEPHP_SHELL')) {  
    	// Based on the prod/dev flag  
    	$args = env('argv');  
    	$environment = 'prod';  
    	foreach($args as $flag) {  
    		if ($flag=='dev') {  
    			$environment = 'dev';  
    			break;  
    		}  
    	}  
    } else {  
    	// Based on the server url  
    	$environment = (env('SERVER_ADDR')=='127.0.0.1') ? 'dev' : 'prod';  
    }

Note that I checked if the script was accessed through normal server/php
delegation or through the CLI usingÂ `defined('CAKEPHP_SHELL')`

