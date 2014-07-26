---
layout: post
title: "You should always test on older browser versions"
custom_v2_id: 81
tags: multiple, firefox, firefox, css
---

You probably already have installed on your computer various web browsers (FF,
IE, Safari, Opera and Chrome) to test your websites. You most certainly also
have multiple installs of IE (or are using IETester) because the underlying
engine of those browser is very different from one version to another.

Firefox, Safari, Opera and Chrome users are more educated to the "always
update to latest version" paradygm so you rarely have to debug old and obscure
version of those browsers.

At least it was what I thought until I was stucked with an old 3.0 version of
Firefox on my laptop (mostly due to my inability to upgrade to the latest
version. I'm still new to the linux world and my laptop is running ubuntu).
Anyway, it made me understand that even if you are willing to upgrade you
can't always do it and old browser versions should be supported too.

In a recent CSS experiment, I managed to style checkboxes and radio buttons in
pure CSS. Unfortunatly, because I was using some "advanced" CSS selectors,
FF3.0 wasn't able to render it correctly, in fact it was able to render only
half the rules, making the whole thing totally unusable.

That was a perfect example of an old browser I had to debug. I will not dive
into the details of the CSS (mostly because I haven't fixed it completly), and
this post was only to remind you (and me) to always check on previous browser
versions.

Next post will be explaining how to test on multiple Firefox versions side by
side.