---
layout: post
title: "The :visited pseudo-class specificity gotcha"
custom_v2_id: 334
---

<p>In a <a title="Alternative way to handle multiple classes in ie6" href="/blog/333:alternative-multiples-classes-ie6">previous post</a>, I bloggued about the way to emulate OOCSS behavior with multiple classes in IE6.</p>
<p>Today, I'll do a follow up and write about a possible gotcha involving the <code>:visited</code> pseudo class.</p>
<p>Following the previous example let's imagine you have a styling for your defauls links (<code>a { color:blue; }</code>), one for the default buttons (<code>.button { ... }</code> ) and one for a custom button that extend the <code>.button</code> (<code>.customButton { ... }</code>)</p>
<p>Now, imagine that you'll want to style all <code>:visited</code> links the same way non-visited links are styled. You might write something like :</p>
<pre><code lang="css">
a, a:visited { color:blue; }
</code></pre>
<p>Unfortunatly, this will have some nasty side effects on your <code>.button</code> and <code>.customButton</code> rules because <code>a:visited</code> will have precedence over <code>.button</code> and <code>.customButton</code></p>
<p>You can find more information about CSS specificity in this <a title="CSS: Specificity Wars" href="http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html">Star Wars</a> post.</p>
<p>Your first solution could be to add even more specificity to your own rules, to override the <code>a:visited</code> one, like so :</p>
<pre><code lang="css">
.button, .button:visited { ... }
.customButton, .customButton:visited { ... }
</code></pre>
<p>This will work, of course, but you're only adding complexity to your specificities, and this get more and more tedious the more you add other customised buttons.</p>
<p>In fact, there is a much better way, one that you could throw in your <code>reset.css</code> if it isn't there already :</p>
<pre><code lang="css">
a:visited { color:inherit; }
</code></pre>
<p>That way, all your visited links will inherit their color from their non-visited version. This mean that visited <code>.button</code> will use the <code>.button</code> color, visited <code>.customButton</code> will use <code>.customButton</code> color and simple visited links will use the <code>a</code> color.</p>
<p>Of course, if you defined a <code>background-color</code> in your <code>a</code>, you should define a <code>background-color:inherit</code> in your <code>a:visited</code> too.</p>