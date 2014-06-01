---
layout: post
title: "Changing Firefox language"
custom_v2_id: 82
---

I'm French, live in France, but usually prefer having my software in English.

This is so because english words are generally shorter (and thus fits more
easily in a GUI) and most of the time french translations aren't optimal.

I just download the latest Firefox version from their website, and without
knowing it, it was a French localized one. They do some sniffing on the user
agent string and automatically download the corresponding file.

That seems a great idea, but I prefer my software in english, so I searched
for a `en-US.xpi` file to update firefox. It does exists for any other
language, but not for `en-US`, this being the default language, as stated in
[this bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=485860).

It seems the only way to have an english Firefox is to download the english
version, there is no way to change it afterwards.

You can type `about:config` and change the `general.useragent.locale` value to
`en-US` but it does not update the main language, only tell plugins to use
that language (AFAIK).

Changing the language in the options only change the user agent string.

Well, I had to backup my profiles, uninstall FF, download the english version
and reinstall it.

