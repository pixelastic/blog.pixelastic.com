---
layout: post
title: "Openid redirect not working on Opera"
custom_v2_id: 228
tags: google, openid, opera
---

I had a hard time firguring out while my openId login method does not work
correctly with Opera.

I either ended up on the redirect page forever, or did not get redirected back
to my website after Google check, or finally even get blackholed back on my
own site.

I only occured with Opera.

I've read on various places that the security settings of Opera are made to
prevent an automatic redirect to a website to be able to write cookie. This is
a fair defense, but it does break the whole openId concept. Or at least my
implementation.

Some sites manages to get it to work, even on Opera (stackoverflow for
example).

I'll hide the openId login method for my Opera users until this is fixed or I
find a solution.