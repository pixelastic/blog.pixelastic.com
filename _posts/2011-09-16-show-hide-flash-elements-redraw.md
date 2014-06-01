---
layout: post
title: "Show and hide Flash elements without redraw"
custom_v2_id: 312
---

<p>Imagine you have a Flash element in your HTML markup. If you apply any <code>show</code>/<code>hide </code>logic to it, the flash will be reset and played back to its first frame.</p>
<p>Actually, as soon as you change the <code>display </code>property of an element, if forces all inner Flash element to be restarted.</p>
<p>There are a few ways you can work around that, and here are the two main I'm using</p>
<h4>Your Flash file is in a tab</h4>
<p>Fairly common scenario, you have tabs on your page (maybe using jQuery UI or a custom code). When you display your Flash tab, all others are hidden, and when you display another tab, the Flash one is hidden.</p>
<p>Instead of using <code>display:none</code> / <code>display:block</code>, we'll be a little more sneaky and not really "hide" the element, but simply put it out of the user view.</p>
<p>Just apply the following CSS rule to the element you want to hide. It will just display it offscreen.</p>
<pre><code lang="css">.tabHidden {<br />	position:absolute;<br />	top:0px;<br />	left:-9999em;<br />}</code></pre>
<p>Don't forget to add a <code>position:relative</code> to the HTML parent of your tab for the absolute positionning to work.</p>
<h4>You have multiple Flash files in a list</h4>
<p>This one is trickier. Imagine you have a list of elements, and each row contains a Flash file. You want to filter the list based on various criterias and only show the rows matching.</p>
<p>You can't use the previous technique here because some elements of your list will be in relative positionning while others will be in absolute positionning. And everytime you change the <code>position </code>property of your element, the Flash will be reset.</p>
<p>The trick here is to play with your element dimensions and visibility. You can change the <code>visibility </code>without triggering a redraw. As this will only make the element invisible but still taking space, you just have to put its <code>height </code>and <code>width </code>to <code>0</code> to make it effectively disappear.</p>
<pre><code lang="css">.listElementHidden {<br />	visibility:hidden;<br />	width:0px;<br />	height:0px:<br />	margin:0px;<br />}</code></pre>
<p>The <code>margin:0px</code> is here to clear any margin you might have defined around your element.</p>