---
layout: post
title: "MySQL Error 1577 on Dreamhost"
custom_v2_id: 183
---

<p>Recently, when connecting to my MySQL databases on Dreamhost through Navicat, I was greeted with a "<code>1577 - Cannot proceed because system tables used by Event Scheduler were found damaged at server start</code>" error message.</p>
<p>It didn't stop me from accessing the tables actually, so I didn't bother. But today it prevent me from copying tables from one server to another, so I decided to have a deeper look into it.</p>
<p>It seems that it has to do with a mysql upgrade issue. I contacted Dreamhost about that and they told me that they just upgraded their servers to 5.1, and that they needed to be restarted. Which they do for me.</p>
<p>So if you ever run into the same problem, just contact Dreamhost support and they'll fix it for you.</p>