---
layout: post
title: "Alternative way for multiple classes in IE6"
custom_v2_id: 333
---

<p>In a pure OOCSS style of writing CSS, let's imagine you created a css class of <code>.button</code> that visually turns a simple link into a button.</p>
<pre><code lang="html">
&lt;a href="#" class="button"&gt;I'm a button&lt;/a&gt;</code></pre>
<p>Now, if you want to define a custom version of your button, let's say a button that will trigger a very dangerous action, you might want to style it differently, so our user will think twice before hitting it.</p>
<p>You got two ways of achieving this, depending if you still support IE6 or not.</p>
<h4>Simple way for non-IE6</h4>
<p>If you don't care about IE6 (and hell, it's 2012, you shouldn't), you just have to add a second class to your button/link :</p>
<pre><code lang="html">
<p>&lt;a href="#" class="button dangerous"&gt;I'm a dangerous button&lt;/a&gt;</p>
</code></pre>
<p>And in your CSS file, just define some special styles (like a red <code>background</code>) to your dangerous button.</p>
<pre><code lang="css">
.button.dangerous { ... }</code></pre>
<p>Actually, that's the path followed by <a href="http://twitter.github.com/bootstrap/" target="_blank">Bootstrap </a>(among others). But it will not correctly work in IE6, because it does not understand multiple classes rules. Instead, IE6 will read <code>.button.dangerous {}</code> the same as <code>.dangerous {}</code>.</p>
<p>This will cause problems as soon as you'll use the <code>.important</code> class on something else than a <code>.button</code> : IE will apply the <code>.button.dangerous</code> rules to anything with the <code>.dangerous</code> class.</p>
<h4>Other way, for IE6</h4>
<p>The solution I personnaly use to fix IE6 is to use more explicit classes instead of using multiple ones. For example, instead of <code>.button.dangerous {}</code> I'll use <code>.buttonDangerous {}</code> and write my html like this :</p>
<pre><code lang="html">
&lt;a href="#" class="button buttonDangerous"&gt;I'm a dangerous button, even on IE6&lt;/a&gt;<br /></code></pre>
<p>That way, the link will have both the styles of <code>.button</code> and <code>.buttonDangerous</code>. This will assure cross compatibility with IE6, at the expense of a (arguably) less readable markup.</p>
<p>As of today, I hope that I'll never have to code for IE6 websites again, but if you ever need to, that's a little trick that can really help.</p>