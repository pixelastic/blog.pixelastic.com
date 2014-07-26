---
layout: post
title: "Keeping your plugins with any new Firefox version"
custom_v2_id: 305
tags: firefox
---

The new Firefox cycle version is such that you might lose all your beloved
plugins on each new release.

Fortunatly, most of the plugins still work even when the version updates, so
you can still use them.

The easiest way to automatically enable them all is to update a boolean value
in `about:config` that will tell Firefox to not disable older plugins.

The key changes for each version, but is called
`extensions.checkCompatibility.X.Y` where `X` and `Y` are the version number
(like `X`=7 and `Y`=0 for the 7.0 release).

Create the key (as a boolean value), and set it to `false`.