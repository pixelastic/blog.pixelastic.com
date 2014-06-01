---
layout: post
title: "The multi-tab admin problem"
custom_v2_id: 236
---

<p>Today I had to update an important zone file at my registrar. Because it was quite important, and because I already did an almost identical job a few months ago, I decided to copy-paste the old work.</p>
<p>So I started by opening the <code>domain A</code> zone edit page. The  I opened a new tab, and loaded the <code>domain B</code> zone edit page.</p>
<p>I selected the <code>domain B</code> content and copied it in the <code>domain A</code> page. I had to update some values, mostly IP addresses, and then validate the page.</p>
<p>Instead of updating the <code>domain A</code> zones as I expected, it updated the <code>domain B</code> zones and left the <code>domain A</code> unchanged. Can you guess why ?</p>
<h4>Session handling</h4>
<p>My guess is that everytime I opened a new page, a Session was tracking my "current" domain, the one I was editing. So opening a new tab to a new domain changed my current domain from <code>domain A</code> to <code>domain B</code>.</p>
<p>Therefore, when I updated the <code>domain A</code> zone, the next page was assuming I was editing the <code>domain B</code> page. If I had opened the tabs in reverse order, it would have worked seamlessly.</p>
<h4>Why doing that ?</h4>
<p>I have encountered a similar behavior in my own apps. By using the cakePHP Security behavior, a special security token is generated for each form. Its integrity is checked whenever a form is posted, and verify that no field has been tampered (no mandatory field has been deleted, no new field has been added).</p>
<p>This is a great security component, but because a special key is stored on the Session side, it also means that whenever you open several tabs, only the latest can be correctly checked and all other one will get rejected.</p>
<p>It bugs me at first, because I used to open several tabs whenever I need to "batch add" a lot of items. In real life, I found that I was almost the only person to do that... So I finally accepted the multi-tab restriction.</p>
<p>Getting back to my registrar : I guess they did it that way because of security reasons too, but I found it particularly counter-intuitive in that case and that could have led to serious damages.</p>