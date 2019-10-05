---
layout: post
title: "Toggling insert/normal mode in vim with CapsLock"
custom_v2_id: 319
tags: vim, zsh, xmodmap
---

You know that CapsLock key on your keyboard ? The sole usage of this key is to
SHOUT ON TEH INTERNETS§§§. I decided to disable it completly as I never use it
on purpose.

I also wanted to use it in vim to toggle between normal and insert mode with
one key instead of the default `i`/`Esc`.

## Disabling CapsLock

Disabling CapsLock is a fairly straightforward process. The xmodmap program is
responsible for binding keyboard events to your software and you can change
the default behavior by creating an `~/.Xmodmap` file.

Just put the following code in it and the pressing the CapsLock key will no
longer block your next keys in Caps.


```ini
clear Lock
```

## Catching it in vim

Now, to get it in vim, you'll have a little more work to do. First, CapsLock
is not one of the default vim keycodes, so you won't be able to remap it to
any useful function. To use it in vim, we will hook it directly on xmodmap to
another key, one that is part of vim default keycodes.

I choose the virtual F13 key. Your physical keyboard might only have F keys
from 1 to 12, but the internal software seems to be able to react to 37 of
them. So, why not using them ?

In your `~/.Xmodmap` file, this is as easy as adding the following line


```ini
keycode 66 = F13
```

66 is the internal code for the CapsLock key. We just define that pressing the
physical CapsLock key should trigger the F13 virtual key.

Now, in `~/.vimrc`, we will tell vim to explictly listen to extended F keys
(from 13 to 37) which it does not do by default.


```vim
set <F13>=^[[25~
```

`^[[25~` is the special keyboard code sent to vim when the F13 key is
triggered. Here we just define that such a keyboard code should be interpreted
in vim as an `<F13>` vim key.

Now, you can use `<F13>` in your custom vim mappings

## Toggling normal/insert mode in vim

vim accepts two kinds of mapping. Those triggered in normal mode (using
`nnoremap`) and those triggered in insert mode (using `inoremap`).

Here we want that pressing CapsLock (or `<F13>` in vim as we defined) in
normal mode will go to insert mode, like pressing `i` does. And we also want
to get back to normal mode when pressing CapsLock in insert mode, just like
pressing `Esc` does.


```vim
nnoremap <F13> i
inoremap <F13> <Esc>l
```

Notice the `l` after Esc. It is here to prevent the caret to move back one
character when exiting insert mode.

## Fixing the shell

One last thing to fix is your shell. By defining in xmodmap that pressing
CapsLock would trigger an F13 event, it means that whatever software that
react on F13 will now react on CapsLock. Unfortunatly, zsh does react on F13.
It insert a `~` character on it (just like it does with F12).

To disable it, we'll simply define a key binding in `~/.zshrc` so pressing F13
does nothing.


```sh
bindkey -s "\e[25~" ""
```

Here it is. You can now press CapsLock anywhere and it won't have any effect.
Plus, pressing it in vim will toggle insert/normal mode.
