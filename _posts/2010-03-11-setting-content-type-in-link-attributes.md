---
layout: post
title: "Setting content-type in link attributes"
custom_v2_id: 56
---

<p>Reading a <a href="http://forum.alsacreations.com/topic-9-47144-3-Debat--URL-Rewriting-avec-ou-sans-ID-.html#p332138">comment on Alsacréations</a>, I've discovered that there is a <a href="http://www.w3.org/TR/html401/struct/links.html#adef-type-A">type attribute</a> defined in the link section of the HTML 4.01 spec.</p>
<p>In a nutshell, it's an optional attribute that one can add to a &lt;a&gt; tag to tell the browser the content type it is supposed to receive if following the link.</p>
<p>Unfortunatly, no browser seems to be using it, but I added this support to Caracole anyway.</p>