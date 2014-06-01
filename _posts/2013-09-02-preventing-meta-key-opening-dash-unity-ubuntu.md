---
layout: post
title: "Preventing the Meta key from opening the dash in Unity Ubuntu"
custom_v2_id: 351
---

<p>Everytime I install Ubuntu on a fresh computer and try to define custom keybindings that use the meta (ie. Windows) key, I run into issues.</p>
<p>The Ubuntu UI uses the meta key to open what they call the "Dash". I never use it and want my meta key back to define my own keybindings.</p>
<p>There is no way to disable it from the default Ubuntu options. You have to install <code>compizconfig-settings-manager</code> and launch it using <code>ccsm</code>. There, go to the Ubuntu Unity Plugin and disable the "Key to show the launcher" binding.</p>
<p>You will now be free to use the meta key in your keybindings, again.</p>