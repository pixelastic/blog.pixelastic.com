---
layout: post
title: "How to hide/show elements based on Javascript"
custom_v2_id: 221
---

<p>Sometimes you have a really great design with some really fancy Javascript goodness, like drag'n'drop and other shiny Ajaxy stuff.</p>
<p>But when you browse the website with Javascript disabled, none of that works and you end up with interface elements that should'nt be here because they do not work.</p>
<p>In those case, you'd rather display a nice message to your user, telling him that he can't use the feature withou Javascript enabled.</p>
<h4>But how do you do that ?</h4>
<p>Well, I myself load two different stylesheets. Remember that your website should be working without Javascript, this is just the last layer you add.</p>
<p>My default stylesheet will load all the rules for when Javascript is not enabled. No fancy <code>cursor:move</code> here.</p>
<p>Then I load a second stylesheet using Javascript, using <code>document.write()</code> in the <code>&lt;head&gt;</code>. And that's in this one that I write rules that overload the previous one. I add every styling that deals with Javascript-enabled features here.</p>
<h4>Limitations</h4>
<p>I may be changing the way I load the JS stylesheet in the future. I don't really like relying on <code>document.write</code> because it is <em>evil</em>. I also don't like the idea of getting one extra request.</p>
<p>I could add a <code>js</code> class to my body element (like <a title="Modernizr" href="http://www.modernizr.com/" target="_blank">modernizr</a> does with all its CSS3 properties) and then target elements by prepending <code>.js</code> to the rule.</p>
<p>But it means adding rules in my main CSS file for users without JS that will still be downloading those extra useless bytes.</p>
<p>I haven't yet figured which way was the best (or should I say, the worst)</p>
<h4>Convenient methodes</h4>
<p>Whatever way you choose, one thing that really helped me was two real simple classes : <code>jsOn </code>and <code>jsOff </code>that I add to elements.</p>
<p>Elements with <code>jsOn </code>will only be visible if Javascript is enabled and hidden otherwise, while element with <code>jsOff </code>will do the opposite.</p>
<p>Assuming you mark your body element with a <code>js</code> class if Javascript is enabled, here's how to do it :</p>
<pre><code lang="css">.jsOn { display:none; }<br />.js .jsOn { display:block; }<br />.jsOff { display:block;}<br />.js .jsOff { display:none; }<br /></code></pre>
<p>Hope all that helps at least someone.</p>