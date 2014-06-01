---
layout: post
title: "IE8 ghost :after and :before pseudo elements"
custom_v2_id: 255
---

IE8 has a strange bug (_what bugs aren't strange in IE ?_) when dealing with
`:after` and `:before` pseudo-elements.

I was adding a nice looking arrow after one of my elements using `:after`. I
wanted this arrow to only display when my element was hovered, so I wrote the
following code :

    
    <a href="#">Example</a>
    
    a {  
    	position:relative;  
    	display:block;   
    	height:30px;  
    }  
    a:after {  
    	position:absolute;  
    	content:"";  
    	top:0px;   
    	right:-15px;  
    	width:15px;  
    	height:30px;  
    	background:url(arrow.gif) top left no-repeat;   
    	display:none;  
    }  
    a:hover:after {  
    	display:block;  
    }

As you can see, nothing too fancy. I positionned my arrow using an empty
`:after` element and a `background `image. I defaulted the arrow to hidden,
and only show it when hovering the element.

## IE in action

It does work pretty well in moder browsers. It also seems to work on IE8. When
you hover the element in IE8, the arrow gets displayed. But it does not gets
hidden when you stop hovering it.

There's a kind of ghost element that keeps getting displayed. It gets removed
if you directly mouse it, or scroll your page, or alt-tab, etc. This clearly
is a display artefact.

To counter this I had to write it in an other fashion (less readable in my
opinion). Removing the default `a:after` rule and adding all properties to
`a:hover:after` :

    
    a {  
    	position:relative;  
    	display:block;  
    	height:30px;  
    }  
    a:hover:after {  
    	position:absolute;  
    	content:"";  
    	top:0px;  
    	right:-15px;  
    	width:15px;  
    	height:30px;  
    	background:url(arrow.gif) top left no-repeat;  
    	display:block;  
    }  
    

## Update

It should be noted that more generally, I gets confused and create ghost
elements and styling when we try to update the `:after`/`:before` properties
based on a rule selecting its parent.

There seems to have a little lag/delay before the properties gets applied, and
most of the time they do not.

