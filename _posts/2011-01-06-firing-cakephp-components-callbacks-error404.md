---
layout: post
title: "Firing cakePHP components callbacks on error404"
custom_v2_id: 254
---

I often use `$this->cakeError('error404')` in my controllers to stop
processing the request (and return a 404 error) when the supplied parameters
are buggy or incomplete.

## A strange side effect

I recently spotted a strange side effect on the latest site I was developping.
It used a pretty large html footer filled with links dynamically fetched from
my database.

As all pages (no matter what model/controller they were refering to) were
using the same footer, I created a component with a simple `startup` method to
fetch them all and return them to the view. I added this component to my
`AppController` so that every controller will inherit it.

This worked nicely until I spotted that on error pages, the footer was left
mostly empty. I was because my `Component` callback was never fired.

## How's that ?

When detecting an error, cake starts using its `ErrorHandler `and thus do not
fire callbacks.

Fortunatly, you can create an `AppError `class (in `app/app_error.php`) and
overwrite the `ErrorHandler `method. Namely, the `error404`. I rewrote mine to
explicitly fire the `initialize` and `startup` methods.

    
    class AppError extends ErrorHandler {  
    	function error404($params) {  
    		$this->controller->Component->initialize($this->controller);  
    		$this->controller->Component->startup($this->controller);  
    		parent::error404($params);  
    	}  
    }

I only fired two of the callbacks, but maybe `beforeRender `and `shutdown
`should be fired too.

