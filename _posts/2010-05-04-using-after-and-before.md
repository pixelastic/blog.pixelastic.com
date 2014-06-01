---
layout: post
title: "Using :after and :before"
custom_v2_id: 84
---

<p><code>:after</code> and <code>:before </code>pseudo-elements allow one to add generated content before or after an other element. It can be used to add quotes around text, icons after a link to specify the language of the target page and a lot of other useful stuff like that.</p>
<p>It can also be mastered to create more powerful styling. I'll post more about that later.</p>
<p>Anyway, IE6 and IE7 don't support it. Firefox is supposed to support it from the 3.0 version but in fact it is still buggy in this release.</p>
<p>Pseudo-elements must be inline elements and can't be absolutly positionned in FF3.0, thus greatly reducing the number of fun things we could do with them in this browser.</p>
<p>It faced me with a challenge. If I wrote <code>:before</code> and <code>:after</code> rules, they would be only understood by FF3.0 but badly rendered, resulting in half the styling I expected.</p>
<p>Browsers that don't understand the rules would not apply them and keep the default rendering, compliant browsers will render all the rules, but the grey area in between is filled with FF3.0 that will think it can handle them and will finally badly render them.</p>
<p>I haven't found a way to specificaly target FF3.0, so I used an alternate method.</p>
<p>All the browsers that understand the <code>:only-of-type</code> selector also understand <code>:before</code>/<code>:after</code>. But FF3.0 and IE7 do not understand <code>:only-of-type</code>. So if I wrote a rule starting with <code>body:only-of-type</code>, it will only be applied to browsers with complete <code>:after</code> and <code>:before </code>support (excluding FF3.0). This solved my problem.</p>
<p>Unfortunatly, it will also filter out IE7 who does not understand <code>:only-of-type</code> but does understand <code>:after</code>/<code>:before</code>. I usually remove all fancy form styling for IE anyway so that's not a big deal for me, but if you really care, you just have to override the rule in a IE7 specific stylesheet.</p>