---
layout: post
title: "Selecting checked radio button with jQuery and IE8"
custom_v2_id: 310
---

Ever tried to select the checked `radio `button of a form using jQuery ? Well
I did, and hundreds of time before, and never ran into any issues.

Today's the first time, and it involves my dear friend IE8. Seems like either
jQuery or IE8 had trouble with my `radio` button selection.

I finally managed to get what I wanted but with a sightly different syntax for
IE8.

## First, the markup

    
        <form id="myForm">
          <input name="data[Payment][value]" id="payment_1500" type="radio" value="1500" />
          <label for="payment_1500">1500</label><br />
          
          <input name="data[Payment][value]" id="payment_2000" type="radio" value="2000" />
          <label for="payment_2000">2000</label><br />
          
          <input name="data[Payment][value]" id="payment_5000" type="radio" value="5000" />
          <label for="payment_5000">5000</label><br />
          
          <button id="test">Select</button>
      </form>
    

Pretty simple, isn't it ? I only have three `radio `buttons, and I would like
to get the selected value when pressing the Select `button`.

## What should work everywhere

The following code is pretty straightforward and I expected it to just work.

    
    var selected1 = $('#myForm input[name="data\\[Payment\\]\\[value\\]"]:checked');  
    var value1 = selected1.val();  
    console.log(value1);

Note that we have to double escape the `[` and `]` characters and wrap in
quotes the `name `value. Nothing fancy, just classic string protection.Â This
code works perfectly on Firefox and Chrome, and I deployed it in production
for a few weeks.

Then, I got report of users that would have love to use the form, but got an
error because no value was selected. I tested and tested it again without
finding the cause. Then it occurs to me that all those reports came from user
using IE8.

So I rebooted my VM, launched IE8 and was able to reproduce the bug on my
first try.

## What the heck is IE8 doing ?

Well, that's a deep question, and I've ask this myself countless times before.
Once more, IE is doing things in its own weird way.

After some fiddling, I managed to make it work, by just slightly altering the
syntax.

    
    var selected2 = $('#myForm input[name="data\\[Payment\\]\\[value\\]"]').filter(':checked');  
    var value2 = selected2.val();  
    console.log(value2);Â 

Yep, that's right, I simply moved the `:checked` selector in its own `filter
`call and it worked. Took me a while to figure, but this finally turned out to
be an easy fix.

You can test it yourself with [this jsFiddle
example](http://jsfiddle.net/pixelastic/WS53Q/1/). Don't forget to enable the
log panel in IE8 by pressing F12 before running the code.

