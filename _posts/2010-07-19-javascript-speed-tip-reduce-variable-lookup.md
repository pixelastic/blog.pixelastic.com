---
layout: post
title: "Javascript speed tip : reduce variable lookup"
custom_v2_id: 195
---

It appears that, according to this video, when inside a Javascript function
(or closure), if you want to access a variable, the closer your scope is to
this variable, the faster you'll get it.

In simpler words, accessing a global variable (like `document`, or `window`)
from inside a function will always be slower that accessing a locally defined
variable.

It also means that, when inside a method of an object, accessing a variable
defined in this method will be faster that accessing a property of the parent
object, which itself will be faster that accessing a global variable.

So, for example, if you need to access at least twice a global variable like
`window `or `document `in a method, you'd better cache it in a local variable
first.

    
    function myTestFunction() {  
    	var button = document.getElementById('button');  
    	var header = document.getElementById('header');  
    }  
    

is bad and could be rewritten as :

    
    function myTestFunction() {  
    	var doc = document;  
    	var button = doc.getElementById('button');  
    	var header = doc.getElementById('header');  
    }  
    

Â

