---
layout: post
title: "Improving my keyboard"
tags: productivity, linux, xmodmap, autohotkey
---

Because I'm living in France, all my computers have a standard French keyboard
layout. It is based on the azerty layout, with all the frequent French
characters in easy access (eg: `é`, `è`, `à`, etc).

It is different from a classical qwerty layout in various ways, the most
notable being that the numbers on the number rows are activated by pressing
Shift. On a classical qwerty keyboard, pressing the `2` key will issue a `2`.
In my case it will issue a `é`. I need to press Shift+2 to get a `2`. And
AltGr+2 gets me a `~`.

Why am I talking about that ? Because I'm also a developer, and I write code
everyday. And code is not like prose, the characters with special meanings are
not the same. We use and abuse `(`, `{`, `;`, `-`, `_`  or `[`. Some of these
characters I use very often, and due to my keyboard layout, I often need to
press Shift or AltGr to get the needed char.

This, of course, struck me as not very productive. There has to be a better
way. So I dig up a bit and found `xmodmap` that is used by linux to bind
a keycode to a keysym. A keycode is what is send to your OS when you press one
of your plastic keys on your keyboard. One physical key on the keyboard equals
to a keycode. Each keycode can have one or several modifiers (like Shift,
Control or AltGr). And each of combination of keycode + modifier(s) equals one
keysym, which usually translate to a character, but can sometime have special
meaning (like Return, Backspace or the F keys).

With `xmodmap`, you can manually configure which keycode sends which keysym. So
I've updated my own `xmodmap` to move some of the special chars I use often to
place I can access easily without having to move my hands too much.

To do that, I mostly took advantage of the `AltGr` modifier that is currently
underused. This modifier is mostly applied to the number row (and pressing
`AltGr` and anything on the number row is not the easiest thing to do).

The most important change I made is to add `AltGr+i` to create a `-` (dash) and
`AltGr+o` to create a `_` (underscore). Those two chars are overused when
coding, and having them on those keys allowed me to type them much much faster
without having to move my hand on the keyboard.

The others little changes I made were to add `AltGr+h` as `#` (hash, the
mnemonic is that a capital H looks a bit like a `#`). Following the same idea
I put the pipe `|` on `AltGr+j`. I also put `\` on `AltGr+u`. These are keys
easily accessible and I use them often.

Finally, the last two important bindings are `AltGr+r` to produce a `` ` ``.
The default French keyboard layout does not have a key for the backtick, so
creating mine was a huge timesaver. The last one is `AltGr+q` to get a `~`
(tilde).

I also tried to put `[` and `]` respectively on `AltGr+k` and `AltGr+l` but
I never use them.

You find below the `xmodmap` I use. Put it in a `~/.xmodmaprc` file and run
`setxkbmap fr && xmodmap ~/.xmodmaprc` to apply them.

```ini
keycode 27 = r R r R grave
keycode 30 = u U u U backslash
keycode 31 = i I i I minus
keycode 32 = o O o O underscore
keycode 38 = q Q q Q asciitilde
keycode 43 = h H h H numbersign
keycode 44 = j J j J bar
keycode 45 = k K k K bracketleft parenleft
keycode 46 = l L l L bracketright parenright
```

As I recently had to work on a Windows machine, I installed AutoHotKey and
created this little script to emulate the same shortcuts :

```ahk
<^>!r::Send ``{Space}
<^>!u::Send \
<^>!i::Send -
<^>!o::Send _
<^>!q::Send `~{Space}
<^>!h::Send {#}
<^>!j::Send |
```

This little changes were a huge timesave for me, hope they gave you some ideas
too.
