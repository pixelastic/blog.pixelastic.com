---
layout: post
title: "Corrupted strings when using strtolower()"
custom_v2_id: 220
---

<p><em>Little blog post at 5am, I'll try to make it very short, I need some sleep.</em></p>
<p>To avoid getting corrupted string results when calling <code>strtolower </code>on UTF8 strings, you can call <code>mb_strtolowe</code>r instead. The <code>mb_*</code> functions are aware of the utf8 encoding.</p>
<p>Unfortunatly, sometime you just can't, because the call is made in the cakePHP core (<code>Inflector</code>). Defining a <code>CTYPE </code>locale for your whole app may be a better solution.</p>
<p>Just add a <code>setlocale(LC_CTYPE, 'C');</code> in your app and all your utf8 strings will correctly work with string functions.</p>
<p>Just note that on Windows, calling setlocale will change the locale for all threads, not just the one where PHP is running. This may cause unexpected results.</p>