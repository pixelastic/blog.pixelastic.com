---
layout: post
title: "-webkit-box-shadow inset value"
custom_v2_id: 66
---

<p>Webkit browsers (Safari and Chrome) have the <code>-webkit-box-shadow</code> property defined to add shadows to elements. Shadow can either be outside the box, or inside it (using the inset parameter).</p>
<p>Unfortunatly, only the latest Webkit nightlies have the <code>inset</code> parameter functionnal, Safari 4 does not.</p>
<p>Chrome does indeed have the inset parameter, but it also have <a href="http://code.google.com/p/chromium/issues/detail?id=25334">a bug</a> when used in conjunction with the <code>-webkit-border-radius</code> property : the inset shadow is visible "behind" the element where the borders are rounded.</p>
<p>This bug does not occur on Mac, but as I have no way to target a certain OS when writing CSS rules, I decided to remove <code>inset box-shadow</code> for webkit browsers on my actual projects, I may re-insert them later when both issues will be fixed.</p>