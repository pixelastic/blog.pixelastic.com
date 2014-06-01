---
layout: post
title: "Keeping your plugins with any new Firefox version"
custom_v2_id: 305
---

<p>The new Firefox cycle version is such that you might lose all your beloved plugins on each new release.</p>
<p>Fortunatly, most of the plugins still work even when the version updates, so you can still use them.</p>
<p>The easiest way to automatically enable them all is to update a boolean value in <code>about:config</code> that will tell Firefox to not disable older plugins.</p>
<p>The key changes for each version, but is called <code>extensions.checkCompatibility.X.Y</code> where <code>X</code> and <code>Y</code> are the version number (like <code>X</code>=7 and <code>Y</code>=0 for the 7.0 release).</p>
<p>Create the key (as a boolean value), and set it to <code>false</code>.</p>