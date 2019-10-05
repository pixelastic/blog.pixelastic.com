---
layout: post
title: "Use the system trash with ZSH terminal"
custom_v2_id: 340
tags: autocomplete, rm, linux, zsh, rmdir
---

When you start using the terminal as your main file explorer instead of a GUI
one, you soon discover two important things.

First, it is much faster to browse accross your filesystem, copying and moving
files in the terminal that it is with your mouse. This is hard to believe at
first (how can writing text on a dull black screen be faster than
drag'n'dropping ?) but it is nonetheless true (after a bit of practice, sure).

The second thing is that it is also much much easier to **permanently delete
very important files **as deleting a file through the terminal has no trash
bin nor any other safeguard mechanism.

## Scripting a rm replacement

At first, I scripted my own rm `rm` replacement that was manually moving files
to `~/.local/share/Trash/files` (the common Trash directory) instead of
deleting them. But it was a bit naive and couldn't really work on removable
drives nor provide a "restore" mechanism.

Fortunatly, the `trash-cli` package on Ubuntu provides a set of methods to
deal with the trash from the command line. They have very explicit names such
as `trash`, `list-trash`, `restore-trash` or `empty-trash`.

## ZSH aliases

I had to resort to quite a bit of ZSH tweaking to make it a perfect `rm`
replacement. First, I added a simple alias for the `rm` command.


```sh
alias rm='trash'
```

Then I also wanted to change the default `rmdir` command. I could have used
the same type of alias (`alias rmdir='trash'`) but I would have lost the
builtin ZSH autocompletion of directories zsh provides with `rmdir`.

When you define aliases with ZSH, you can choose if you want it to
autocomplete based on the right hand side of your alias
(`NO_COMPLETE_ALIASES`) or the left hand side (`COMPLETE_ALIASES`). Yes, the
name of the options seem wrong to me too, but this is actually how it works.

I prefer setting `NO_COMPLETE_ALIASES` so I can use the correct autocompletion
on my commands with my aliases, but for the `rmdir` case this was proving to
be an issue.

## rmdir autocompletion

So, I started writing my own `rmdir` implementation in a custom script. This
was merely a wrapper to `rmdir` but putting it in its own script allowed me to
change its name and thus changing its autocomplete method.

I named it `better-rmdir`, and put it in my `$PATH`. Here is the code


```sh
#!/usr/bin/zsh
trash $@
```

As you can see, this is just a wrapper, taking the initial arguments and
passing them to `trash`.

But I also created a file named `_better-rmdir` and put it in my `$FPATH`
(this is where ZSH goes looking to autocomplete methods). I just copied the
code of the original `_directories` method (that you can probably find in
`/usr/share/zsh/functions/Completion/Unix/`), and adapted it to fit my newly
created `better-rmdir`


```sh
#compdef better-rmdir
local expl
_wanted directories expl directory _files -/ "$@" -
```


And finally, I added an alias (`alias rmdir='better-rmdir'`) and everytime I
ask for an autocomplete on `rmdir` it actually looks for the autocomplete of
`better-rmdir`, which is the code contained in `_better-rmdir` and which in
turn return only directories.

Now I have complete `rm` and `rmdir` commands in my terminal that move files
to the trash.
