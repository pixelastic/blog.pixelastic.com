---
layout: post
title: "CSS rule to target only Firefox"
custom_v2_id: 68
---

I just found (via [enure.net](http://enure.net/post/article/serve-css-to-only-
firefox)) a CSS rule using proprietary Mozilla filter that would allow one to
specifically target Mozilla.

I'm not a huge fan of CSS hacks like that, I usually restrain them to the bare
minimum of IE conditional comments. But in some edge cases, it is sometimes
useful, if you really don't have other options.

I'd like to find the equivalent rules (using proprietary rules, no parser bug)
for Safari, Chrome and Opera

    
    @-moz-document url-prefix() {   
    	p { color: red; }  
    }  
    

