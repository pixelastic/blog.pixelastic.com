---
layout: post
title: "Alternative way for multiple classes in IE6"
custom_v2_id: 333
---

In a pure OOCSS style of writing CSS, let's imagine you created a css class of
`.button` that visually turns a simple link into a button.

    
    
    <a href="#" class="button">I'm a button</a>

Now, if you want to define a custom version of your button, let's say a button
that will trigger a very dangerous action, you might want to style it
differently, so our user will think twice before hitting it.

You got two ways of achieving this, depending if you still support IE6 or not.

#### Simple way for non-IE6

If you don't care about IE6 (and hell, it's 2012, you shouldn't), you just
have to add a second class to your button/link :

    
    
    
    
    <a href="#" class="button dangerous">I'm a dangerous button</a>
    
    
    

And in your CSS file, just define some special styles (like a red
`background`) to your dangerous button.

    
    
    .button.dangerous { ... }

Actually, that's the path followed by [Bootstrap
](http://twitter.github.com/bootstrap/)(among others). But it will not
correctly work in IE6, because it does not understand multiple classes rules.
Instead, IE6 will read `.button.dangerous {}` the same as `.dangerous {}`.

This will cause problems as soon as you'll use the `.important` class on
something else than a `.button` : IE will apply the `.button.dangerous` rules
to anything with the `.dangerous` class.

#### Other way, for IE6

The solution I personnaly use to fix IE6 is to use more explicit classes
instead of using multiple ones. For example, instead of `.button.dangerous {}`
I'll use `.buttonDangerous {}` and write my html like this :

    
    
    <a href="#" class="button buttonDangerous">I'm a dangerous button, even on IE6</a>  
    

That way, the link will have both the styles of `.button` and
`.buttonDangerous`. This will assure cross compatibility with IE6, at the
expense of a (arguably) less readable markup.

As of today, I hope that I'll never have to code for IE6 websites again, but
if you ever need to, that's a little trick that can really help.

