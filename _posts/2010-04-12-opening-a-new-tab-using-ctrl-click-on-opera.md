---
layout: post
title: "Opening a new tab using Ctrl+Click on Opera"
custom_v2_id: 72
---

<p>One thing that bugs me everytime I use Opera are the weird keyboard shortcuts. You open link in a new tab by using the middle mouse button (classic) or Shift+click (less classic, we are accustomed to use the Ctrl+Click, Shift+Click being used to open in a new window).<br /><br />Today it was bugging me one too many times, so I decided to use the power of AutoHotKey to help fix this.</p>
<p>Here is the little snippet I added to my default AutoHotKey script :</p>
<pre lang="htaccess"><code lang="ahk">;        Open page in new tab in Opera using Ctrl + Click<br />#ifWinActive, ahk_class OpWindow<br />^LButton::Send +{LButton}<br />#IfWinActive</code></pre>
<p>It basically catch every Shift+Click in Opera and return a Ctrl+Click instead, allowing me to finally open tabs the way I'm used to.</p>