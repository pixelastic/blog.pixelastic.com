---
layout: post
title: "Opera bug : border-radius and background-color on an input"
custom_v2_id: 178
---

The form inputs of this site all have a border-radius and a background-color.
Unfortunatly, the latest Opera version just don't like that (9.5 works like a
charm).

When you apply the following rules to an input element, Opera will discard
your background color and render it as transparent instead.

    
    input {  
        border-radius:5px;  
        border:none;  
        background:#375a5e;  
    }

All three rules causes the bug. Remove one of them and the bug disappear.

## Solution

At first I thought that I could just as well remove the border-radius rule and
I won't have any more bugs. But a slightly decreased user experience for my
Opera readers.

Then I'll try to come up with a better solution. One can add a background-
image instead of a background-color. Odd enough, this won't trigger the bug.

But I wanted to avoid that, that's one more useless request to the server and
it's far more easier to change a color code in a css file that to edit an
image file.

The solution I choose was to not set a `border:none;` but to simulate it by
adding invisible border. That would add 1px around the input element, so we'll
limit it by only adding the border on one of the sides. Adding it on the right
side seemed to be the more convenient method.

So here's my updated code :

    
    input {  
    	border-radius:5px;  
    	border:none;  
    	border-right:1px solid rgba(0,0,0,0);  
    	background:#375a5e;  
    }


