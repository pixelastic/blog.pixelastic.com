---
layout: post
title: "Custom logging system for cakePHP"
custom_v2_id: 275
---

I do love cakePHP, but sometimes it can get tricky to get it to do exactly
what you want.

For our big app, we needed to stop using the builtin logging system to take
advantage of the syslog and log analyzer tools we had.

At first I got confused by the various log files, but after reading the cake
core code, it (kinda) makes sense. Let me explain it to you.

## CakeLog and FileLog

`CakeLog `is the cake static class that handles all the log actions. You can
call it yourself statically using `CakeLog::write()`, but cake also calls it
itself when an error is reported.

`CakeLog `internally write its content using the FileLog. This `FileLog
`writes its content to files located in `app/tmp/logs`.

## Writing errors to the syslog instead

We didn't want our logs to be saved in `app/tmp/logs` for three mains reasons
:

  1. Those files gets deleted on every deploy we did (this was how our deployment system works)
  2. Those files can get very big very fast
  3. Our app was distributed accross several servers, meaning that each server had its own set of log files

Instead, we wanted them to be written to the syslog where they would be
intercepted and stored in our main log analyzer.

To do so, we wrote a simple `SysLog `class to use instead of the `FileLog`.
Here it is :

    
```php
class SysLog {  
  /**  
  *    Writes a log to the syslog  
  *    \param    $type    Either a numerical constant or a string  
  *    \param    $message    Message to log  
  **/  
  public function write($type, $message) {  
    // We "fix" CakeLog that passes severity as a string  
    if (is_string($type)) {  
      // Mapping string to syslog priorities  
      $priorities = array(  
        'debug'    => LOG_DEBUG,  
        'info'        => LOG_INFO,  
        'notice'    => LOG_NOTICE,  
        'warning'    => LOG_WARNING,  
        'error'    => LOG_ERR,  
        'default'    => LOG_NOTICE  
      );  
      $type = (array_key_exists($type, $priorities)) ? $priorities[$type] : $priorities['default'];  
    }  
    // Writing to syslog  
    openlog(false, 0, LOG_LOCAL7);  
    syslog($type, trim($message));  
    closelog();  
  }  
}
```

Place this file in `app/lib/log/sys_log.php`. Then, in
`app/config/bootstrap.php`, place the following code :

    
```php
CakeLog::config('default', array('engine' => 'SysLog'));
```

It is important that you place the `CakeLog::config()` call in` bootstrap.php`
and not in `core.php` because of the way cake actually loads its internal. I
also manually defined the syslog facility as LOCAL7, but you can change it to
whatever you want or even update the code so the actual facility can be passed
as a parameter of the `CakeLog::config()` call (actually, that's how it's done
in my real code, but I didn't want to overcomplicate the example).

Also, note that I added a special code to handle the way CakeLog passes
parameters to the SysLog. CakeLog passes the severity as a string, so we
convert it back to the PHP constants.

With this code, all your logs will now be routed to the syslog, and your
`app/tmp/logs` directory will no longer grow in size (instead, that will be
your `/var/logs/syslog` :) )

## Where are my errors loggued now ?

Well, your errors are loggued to the syslog. But cake defines its own error
handler that will reformat the error thrown by PHP, and reroute it to the
`CakeLog`. In effect, it means that all errors with similar severity will be
grouped (`E_PARSE`, `E_ERROR`, `E_CORE_ERROR`, etc will be loggued as`
LOG_ERROR`). Also, cake will parse and reformat the message to log. It can be
problematic if you rely on your PHP config to correctly parse your logs
because you won't have the expected output.

Hopefully, cake provides a way to disable this error handler, but it was very
tricky to find and even more tricky to correctly use. I won't spend too much
time on all the details, but what you have to know is :

  1. You have to define a `define('DISABLE_DEFAULT_ERROR_HANDLING', true);` in order to disable the cake error handler and use the default PHP one
  2. This call MUST be done before your `Configure::write('debug')` call otherwise it won't work
  3. You also have to define a `Configure::write('log', E_ALL & ~E_DEPRECATED);` for this to work but...
  4. You can't define both the debug and the log value in the same call using an array, you have to define them in two different calls `debug `then `log`

So, finally, here is the final working configuration :

In `app/config/core.ph`p :

    
```php
Configure::write('log', E_ALL & ~E_DEPRECATED);  
define('DISABLE_DEFAULT_ERROR_HANDLING', true);  
```

And in` app/config/bootstrap.php` :

    
```php
CakeLog::config('default', array('engine' => 'SysLog'));
```

## Final words

I wrote this blog post because I got hit by this problem. Twice. I didn't
bloggued about it the first time, so a few weeks later when I had to change
some config values in my bootstrap.php and core.php I forgot about the
specific order of loading things. It took me a couple hours to figure it out
again.

So, to avoid running into the same issue some months from now, I took some
time to write it down, and hopefully I'll help some of you too.

