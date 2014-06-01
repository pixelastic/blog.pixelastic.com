---
layout: post
title: "Changing Firefox language"
custom_v2_id: 82
---

<p>I'm French, live in France, but usually prefer having my software in English.</p>
<p>This is so because english words are generally shorter (and thus fits more easily in a GUI) and most of the time french translations aren't optimal.</p>
<p>I just download the latest Firefox version from their website, and without knowing it, it was a French localized one. They do some sniffing on the user agent string and automatically download the corresponding file.</p>
<p>That seems a great idea, but I prefer my software in english, so I searched for a <code>en-US.xpi</code> file to update firefox. It does exists for any other language, but not for <code>en-US</code>, this being the default language, as stated in <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=485860">this bug report</a>.</p>
<p>It seems the only way to have an english Firefox is to download the english version, there is no way to change it afterwards.</p>
<p>You can type <code>about:config</code> and change the <code>general.useragent.locale</code> value to <code>en-US</code> but it does not update the main language, only tell plugins to use that language (AFAIK).</p>
<p>Changing the language in the options only change the user agent string.</p>
<p>Well, I had to backup my profiles, uninstall FF, download the english version and reinstall it.</p>