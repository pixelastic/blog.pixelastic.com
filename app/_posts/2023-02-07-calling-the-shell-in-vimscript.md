---
layout: post
title: "Calling external scripts in the shell in vimscript"
tags: vim
---

Some of my vimscripts need to call external commands, through the shell CLI.
I learned some quirks the hard way, and documenting them here

## The basics

Calling an external command is done through `system('external-command')`. If you
need to pass arguments you must wrap them in `shellescape(myArgument)` or it
will mess up spaces and quotes.

## The quirks

If you `echom` the result and see it through `:messages`, you might see some
`^@` weird characters. Those are how vim displays new lines, but not how they
 are encoded in the result.

To split the result on new lines, you should run `split(myResult,
"\n")` and not `split(myResult, '^@')`.
