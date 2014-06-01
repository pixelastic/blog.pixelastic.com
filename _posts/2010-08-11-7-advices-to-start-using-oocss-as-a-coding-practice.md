---
layout: post
title: "7 advices to start using OOCSS as a coding practice"
custom_v2_id: 201
---

<p>Not long ago, I stumbled across this <a title="Top 5 mistakes of massive CSS" href="http://www.stubbornella.org/content/2010/07/01/top-5-mistakes-of-massive-css/" target="_blank">video about massive and unmaintainable CSS files</a> from Nicole Sullivan. It made me want to try OOCSS.</p>
<p><a title="OOCSS" href="http://wiki.github.com/stubbornella/oocss/" target="_blank">OOCSS </a>is a way to code css in a way that replicates the goodies general OOP told us. Classic CSS use the cascade in selectors to emulate a concept of inheritence.</p>
<p>OOCSS puts the concept of inheritence a little step further by telling  us to create "modules" in our CSS files. Each module represent a  "widget" of our page, or should I say of our whole site.</p>
<p>It comes with a simple list of principles that could allow one to write much more flexible and maintainable code. I rewrote the whole CSS for this website (as well as the admin interface I'm using behind the doors) following those principles, and I thought I'll share it with you.</p>
<h4>Drop the <code>#id</code> selector</h4>
<p>We won't be using the <code>#id</code> selector anymore (except for some edge cases). Instead of <code>#commentList {}</code> we'll use <code>.commentList {}</code></p>
<p>This change alone lets us reuse the same element multiple times on the same page.</p>
<p>Note that we will still add <code>ids</code> in our HTML markup for form inputs or for Javascript purpose (<code>document.getElementById</code> is still the faster selection method).</p>
<h4>Don't make your selector dependent on the page structure</h4>
<p>We won't style our elements based on where they will be displayed in the page.</p>
<p>We don't care if our module will be displayed in a footer, sidebar, specific page or whatever. We just style it all the same.</p>
<p>Instead of writing <code>.sidebar .lastComments {}</code>, we will go for the shorter <code>.lastComments {}</code>.</p>
<p>This will allow us to easily display the last comments on any page, anywhere. You should carefully name your modules to something that clearly evoke what the module is supposed to display, without ambiguity.</p>
<p>If you need to tweak the display of an element in a certain part of the page, you could always write a specific selector for this specific need, that will overwrite the default rules. But this must not be your default selector.</p>
<h4>Do not use both tag and class selector on the same element</h4>
<p>Avoid the <code>div.errorMessage</code>, <code>ul.userList</code> selectors. The first one is just too specific : what happen if you ever want to style a <code>&lt;p&gt;</code> instead of a <code>&lt;div&gt;</code> ? The second one is useless, <code>&lt;ul&gt;</code> is a list by definition.</p>
<p>There is only one moment when being that specific can be useful, it is when you need to overwrite, for a specific element, rules defined for the class. Fortunatly, thanks to the OOCSS coding style, this won't happen much.</p>
<h4>Don't make your selectors over-specific</h4>
<p>This is a followup of the previous rule, but don't write overly specific rules, like .<code>userList table thead tr th a</code>. A simple <code>.userList thead a</code> is enough.</p>
<p>First, you are overly detailing each level of the markup while most of the time the uppermost and lowermost parts are enough. But you also define useless selectors like <code>tr th</code> or <code>ul li,</code> where <code>th</code> or <code>li</code> are enough (those elements can not be placed in any other parent element).</p>
<h4>Create your own reset stylesheet</h4>
<p>To avoid repeating <code>margin:0; padding:0</code> over and over in your stylesheets, you should spend some time finding a reset stylesheet that you like and then tweaking it to fit your coding practice.</p>
<p>I used to include the <a title="Tripoli CSS" href="http://devkick.com/lab/tripoli/" target="_blank">Tripoli framework</a> in my previous projects but I found that I had to reset styles it was settings far too often.</p>
<p>All reset stylesheets are not equals, some will just remove all styling from elements, letting you define them as you want. Others will also assign default rendering styles to make something both visually beautiful and cross-browser.</p>
<p>But the best reset stylesheet you'll get is the one you'll create (or, as it is quite a bit of work, tweak) yourself.</p>
<h4>Use a grid system to place elements</h4>
<p>Some years ago, I found CSS Framework like Blueprint to be a waste of time. I didn't want to clutter mu HTML markup with <em>non-semantic</em> classes for handling the styling.</p>
<p>I also found that the psd files I was given to integrate couldn't fit in grids because the sidebar was 173px wide for example.</p>
<p>Now I still don't think cluttering the HTML with <code>span-6 pull-2</code> is the best thing that happened to CSS, but I found it much better than cluttering my CSS with endless <code>overflow:hidden</code> and <code>float:left; margin-right:10px</code> declarations.</p>
<p>And I still got design from not-so-professional designers to integrate that do not seems to have any logical proportion, and can't fit them in grids. But I also work with more talented people that deliver beautiful design and they tend to be the one that fits easily into grids.</p>
<p>So it may not always be possible to use a grid system, but more often than not, it is and even if that means tweaking the original (badly designed) design a dozen pixels off, it will greatly help the CSS process.</p>
<h4>Create a global stylesheet for your main classes</h4>
<p>I also create a main stylesheet for all the classes I know I'll be reusing all accross this project (and others). I include it at the top, right after the reset one.</p>
<p>In it I'll defined general classes that could be extended by all the other inner classes later. Like a <code>.message</code> class, that I may be extending later using <code>.message.error</code> or .<code>message.success</code></p>
<h4>One final word</h4>
<p>Ok, this is it. I'm fairly new to OOCSS too, so I'm still discovering it too. So far I found that I have greatly reduce the size of my files but most importantly, my styles are way more easy to tweak for special needs than before.</p>
<p>It also helped me separate the various elements of the website, and it is much more easier to find the piece I need. Fewer classes to depends on means I know where the rules are coming from and I can write more specific selectors if need me more easily.</p>