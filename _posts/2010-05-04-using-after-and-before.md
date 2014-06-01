---
layout: post
title: "Using :after and :before"
custom_v2_id: 84
---

`:after` and `:before `pseudo-elements allow one to add generated content
before or after an other element. It can be used to add quotes around text,
icons after a link to specify the language of the target page and a lot of
other useful stuff like that.

It can also be mastered to create more powerful styling. I'll post more about
that later.

Anyway, IE6 and IE7 don't support it. Firefox is supposed to support it from
the 3.0 version but in fact it is still buggy in this release.

Pseudo-elements must be inline elements and can't be absolutly positionned in
FF3.0, thus greatly reducing the number of fun things we could do with them in
this browser.

It faced me with a challenge. If I wrote `:before` and `:after` rules, they
would be only understood by FF3.0 but badly rendered, resulting in half the
styling I expected.

Browsers that don't understand the rules would not apply them and keep the
default rendering, compliant browsers will render all the rules, but the grey
area in between is filled with FF3.0 that will think it can handle them and
will finally badly render them.

I haven't found a way to specificaly target FF3.0, so I used an alternate
method.

All the browsers that understand the `:only-of-type` selector also understand
`:before`/`:after`. But FF3.0 and IE7 do not understand `:only-of-type`. So if
I wrote a rule starting with `body:only-of-type`, it will only be applied to
browsers with complete `:after` and `:before `support (excluding FF3.0). This
solved my problem.

Unfortunatly, it will also filter out IE7 who does not understand `:only-of-
type` but does understand `:after`/`:before`. I usually remove all fancy form
styling for IE anyway so that's not a big deal for me, but if you really care,
you just have to override the rule in a IE7 specific stylesheet.

