---
layout: post
title: "Missing bits of the official Facebook documentation"
custom_v2_id: 281
---

<p>As a complement to my post about FB.ui undocumented hard limit, here are some other parts that should be in the documentation.</p>
<h4>Custom html tag</h4>
<p>You have to add <code>xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/"</code> to your main <code>&lt;html&gt;</code> element.</p>
<p>If you don't, the <code>&lt;fb:like&gt;</code> (and possibly other <code>&lt;fb:*&gt;</code> elements) won't work in IE. I guess those unorthodox tags won't be interpreted by IE until you define the correct xmlns.</p>
<h4>Adding a #fb-root</h4>
<p>You also have to add a <code>&lt;div id="fb-root"&gt;&lt;/div&gt;</code> in your html code. I guess the Javascript API use it for some stuff, but I don't really know why.</p>
<p>The Javascript SDK logs an error message asking for this missing element if you don't have it.</p>