---
layout: post
title: "Preventing Firefox from auto-filling login and password fields"
custom_v2_id: 85
---

<p>When you login in an app and tell Firefox to remember your password, it will then automatically fill any password field that have a login field near it.</p>
<p>It can be quite embarassing when you are developping an admin panel where you can edit your own profile informations. The password field will be filled every time you go to that page, even if you explicitly set no value.</p>
<p>The way to circumvent this is to add an <code>autocomplete="off"</code> attribute to the field.</p>
<p>It may not validate, but is understood both by IE and FF AFAIK.</p>