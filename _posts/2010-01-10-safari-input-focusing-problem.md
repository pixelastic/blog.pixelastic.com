---
layout: post
title: "Safari input focusing problem"
custom_v2_id: 26
---

<p>I just ran into a strange behavior on Safari 3 (Win). I'm not quite sure what caused this problem, but I tracked it down to one CSS rule.</p>
<p>The thing was that I had an input field that moved whenever I tried to focus it. It jump 3 pixels up whenever I gave him focus. I had never seen that before.</p>
<p>I finally managed to track it down to the padding:2px 0px 5px 0px; declaration. I exploded it in four (-top, -right, -bottom and -left) and it seemed that it was the padding-bottom:0px that cause the bug.</p>
<p>I finally rewrote my css (in three lines instead of one) and moved to other things.</p>
<p> </p>
<p>I post it here as a reminder, and hope it could help someone.</p>