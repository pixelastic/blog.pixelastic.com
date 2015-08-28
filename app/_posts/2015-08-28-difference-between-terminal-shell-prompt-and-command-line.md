---
layout: post
title: "Difference between terminal, shell, prompt and command line"
tags: terminal, shell, zsh, terminator, tmux
---

When I started using Linux, the command line was a whole new world to me. The
differences between a terminal, a shell, a prompt and a command line were
absolutly lost on me.

Now, a few years later, boundaries are much clearer. This post is an attempt at
clarifying them.

## What is a terminal?

A terminal, or terminal emulator, is a software program that lets you
interact with the command line through your shell. The important part is that
this is a GUI program.

`gnome-shell` is the default terminal emulator on Ubuntu, while `iTerm` is the
common choice in the Mac world (I think, I don't own a Mac). Other alternatives
include `rxvt`, `termite`, `terminology` or `terminator`.

They all look like a dark screen where you type commands, but each adds its own
features and configuration. `terminology` for example lets you play
video or music directly, and have some advanced visual effects. 

`terminator` is the one I used for a long time. It has a very useful feature
that lets you split your screen in different chunks, to avoid alt-tabbing all
the time and multi-task easily.

In the end, the terminal emulator is just a wrapper around your shell.

## What is a shell ?

The shell is the program that reads your commands (like `ls`, `pwd`, etc) and
evaluate them. Shells are mostly used as REPL (Read, Eval, Print, Loop). Meaning
it is waiting for you to type something in its prompt and pressing `Enter`. Then
it will evaluate the command and display a new prompt for you to type in a new
command.

The most basic shell is simply named `sh`, and the most common one is `bash`.
Other shells (with names like `ksh`, `zsh` or `fish`) also exists and provide
different features than `bash`. 

If you're writing shell scripts, different shells are like different scripting
languages (but they do share a common basis and are all mostly
`bash`-compatible). In your everyday life though, what a different shell might
bring you is clever tab-completion, output coloring, smart aliases, etc.

I'm personnally using `zsh`. It offers a really nice tab-completion (even through
distant `ssh` connections), and let me greatly configure what my prompt looks
like. `oh-my-zsh` is a very popular set of plugins to enhance the default `zsh`
experience. I don't personnaly use it, but I've seen countless person using it.

In the end, as all shells are just scripting languages, they are all able to do
pretty much the same thing. `bash` as the huge advantage of being a standard and
available almost on any machine, while `zsh` has a large library of plugins you
can download and install.

In the end, the shell is where you'll spend most of your time. You should invest
some time into configuring it so you get faster on the command line.

## What is a prompt ?

The prompt is simply the line that is displayed in your shell when you type
a command. The default is usually something like `user@host:/path/ $`. This gets
displayed at the start of each line and reminds you of who the current user is,
on which machine and in which path.

After a while, you're so used to it that you stop seeing it. But such a basic
prompt is not very useful.  I strongly encourage you to customise it to your
needs. As it will get displayd on every new command, it is a nice place to
display useful information.

You can even add color to it, and also make use of what is known in `zsh` as the
`RPROMPT`, the prompt on the right.

In my config, I display the path with a different color depending if I currently
have writing rights in it or not. I also color the `@` in red if the previous
command returned an error code.

When I'm in a git repository, I also change the `$` symbol to a `±`, and color
it differently depending on the status of my current index (green if clean, red
if untracked files). I also display the current branch and tag in the right
prompt, as well as symbols to tell me if I need to push or pull.

I spend a lot of time in the command line and in git repositories, and I don't
want to type `git status` or `git branch` too often. It is much better when this
information is displayed on my prompt. If you choose your colors well, your
brain will be able to parse the information really fast.

In the end, the shell is the line that gets displayed whenever you need to type
a command. It is the best place to put output of commands you often type, so you
no longer have to.

## What is a command line ?

When someone tells you to "type something in the command line", it actually
means "type something in your prompt, which is displayed by your shell, which is
loaded by your terminal emulator". The command line is all this.

At that moment, we don't really care about what your prompt looks like or if
you're using `ksh` inside `rxvt`. All we need to know is the output of the
command.

## Wrapping up

Hopefully, this made this a lot clearer for some of you. Next time, I'll try to
talk about `tmux`, which is a new layer between the terminal and the shell.



tags:
