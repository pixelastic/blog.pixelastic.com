---
layout: post
title: "Enabling Flash calls to distant server when working locally"
custom_v2_id: 309
---

<p>Default Flash security config prevents you from loading content from an external website when running a Flash file locally.</p>
<p>To prevent this, you have to go to <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html" target="_blank">this link</a> and add the directory where your file is located.</p>
<p>Fortunatly, you can specify a top level directory and all subdirectories will inherit the authorization.</p>
<p>If you don't do this step, your Flash file will refuse to download external content.</p>