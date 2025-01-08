---
layout: "post"
title: "Minimal .zshrc for remote servers"
tags: automation
---

Recently, I found myself connecting to remote machines quite often. I have to debug remote servers for work or connect through `ssh` to an emulation handheld console I just bought (more posts coming on that later).

But I've configured my local `zsh` so much that when I connect to a bare remote server I feel a bit lost. No colors to differentiate folders and files. No tabbing through completion. Even simple things like backspace or delete key do not always work.

So this time, I built a very minimal `.zshrc` that I intend to `scp` to a remote server whenever I need to do some work there, just to make my life easier. I tried it on the aforementioned console, and it helped a lot, so I'm gonna share it here.

### Fix the keyboard

```
export TERM=xterm-256color
bindkey "^[[3~" delete-char            # Delete
bindkey "^?" backward-delete-char # Backspace
bindkey "^[OH" beginning-of-line  # Start of line
bindkey "^[OF" end-of-line             # End of line
```

Starting with the basics, I ensure my terminal type is set to xterm-256color. It should fix most keyboard issues. But just to be sure I actually did define the keycodes for delete, backspace as well as start and end of line.

The `^[` and `^?` chars here are not real characters, but escape characters. In vim, you have to press `Ctrl-V`, followed by the actual key (so, backspace, or delete, etc) to input it correctly. I found that various servers had this mapped differently, so you might have to manually change it if it doesn't work for you.

### Completion

```
autoload -Uz compinit
compinit
zstyle ':completion:*' menu select
```

This will enable a much better completion than the default one. Now, whenever there are several possible solutions when pressing `tab`, the list of possibilities will be displayed, and you can `tab` through them as they are getting highlighted.

### Colors

```
autoload -U colors && colors
export COLOR_GREEN=2
export COLOR_PURPLE=21
export COLOR_BLUE=94
export LS_COLORS="di=38;5;${COLOR_GREEN}:ow=38;5;${COLOR_GREEN}:ex=4;38;5;${COLOR_PURPLE}:ln=34;4;${COLOR_BLUE}"
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
```

I then added a bit of color. I defined a few variables to better reference the colors. Those are mapped based on the color palette I'm using in my local `kitty`. They would probably be different on your machine, so you should also adapt it.

The `LS_COLORS` definition sets the directories in green, executable files in purple and symlinks in blue. This simple change already makes everything much easier to grok. The `zstyle` line also applies those colors to the tab completions \o/.

### Aliases

```
alias v='vi'
alias ls='ls -lhN --color=auto'
alias la='ls -lahN --color=auto'
alias ..='cd ..'
function f() {
        find . -name "*$1*" | sed 's|^./||'
}
```

I added some very minimal aliases; those that are embedded in my muscle memory. I have much more locally, but I went for the minimal amount of aliases to make me feel at home. I also didn't want to have to install any third party (even if `exa`, `fd` and `bat` would sure would have been nice).

`v` is twice as fast to type as `vi`. Some better `ls` and `la` (for hidden files). A quick way to move back one level in the tree structure, and a short alias to find files based on a pattern. Those are simple, but very effective.

### Prompt

```
PS1="[%m] %{[38;5;${COLOR_GREEN}m%}%~/%{[00m%} "
```

And finally a left-side prompt to give more information of where I am. It starts with the name of the current machine, so I can easily spot if I'm on a remote session or locally, then the current directory (in green, once again, as is my rule for directories).

The wrapping `%{` and `%}` are needed around color espace sequences, to tell `zsh` that what's inside doesn't take any space on the screen. If you omit them, you'll see that what you type is offset on the right by a large amount.

I actually like to replace the `%m` with a machine-specific prefix, to more easily see where I am.

![](/img/files/2025-01-08-minimal-zshrc/01-ef4be3e9c4.png)

Here, for example, you can see I'm connected to my handheld console (I added the SNES-like colored button), currently in the `/roms2/` directory and I'm tabbing through completions in the `./n64/games/ folder.

And that's it. A very minimal .`zshrc` for when I need to get my bearings on a new remote server and still be able to do what I want quickly.