---
layout: post
title: "Enabling Flash calls to distant server when working locally"
custom_v2_id: 309
---

Default Flash security config prevents you from loading content from an
external website when running a Flash file locally.

To prevent this, you have to go to [this link](http://www.macromedia.com/suppo
rt/documentation/en/flashplayer/help/settings_manager04.html) and add the
directory where your file is located.

Fortunatly, you can specify a top level directory and all subdirectories will
inherit the authorization.

If you don't do this step, your Flash file will refuse to download external
content.

