---
layout: post
title: "Preventing Firefox from auto-filling login and password fields"
custom_v2_id: 85
tags: ie, firefox, jquery-autocomplete
---

When you login in an app and tell Firefox to remember your password, it will
then automatically fill any password field that have a login field near it.

It can be quite embarassing when you are developping an admin panel where you
can edit your own profile informations. The password field will be filled
every time you go to that page, even if you explicitly set no value.

The way to circumvent this is to add an `autocomplete="off"` attribute to the
field.

It may not validate, but is understood both by IE and FF AFAIK.