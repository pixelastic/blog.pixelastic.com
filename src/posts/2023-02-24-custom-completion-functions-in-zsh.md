---
layout: post
title: "Custom completion methods in zsh"
tags: zsh
---

I needed to define a custom completion function to suggest files when typing
`vfa <TAB>`. `vfa` is my alias around `git-file-add`. I needed it to suggest
modified/added files.

## Telling zsh about the completion function

I started by telling zsh which completion method to call when completion
`git-file-add` with this code:

```zsh
compdef _git-files-dirty git-file-add
```

The convention in zsh is that completion methods should start with `_`, hence
the `_git-files-dirty`. I didn't name if `_git-file-add`, because I wanted the
name to reflect what it displayed, not the method it was completing

## Weaving it together

I created a `_.git-files-dirty` in my custom zsh config
`./config/zsh/completion/compdef` directory.

I also need to tell zsh about this path, by adding it to its `fpath`.

Note that the order here is important:

- Add the folder to `fpath`
- Run `compinit`
- Call `compdef`

## Writing the completion function

The `_git-files-dirty` file must follow a strict convention for zsh to pick
it up.

- It must start with `#compdef` on its first line
- It must contain a function named `_git-files-dirty`

The core of the function itself is free form, the important thing it need
to do is build an array of the suggestions and store it in a variable

Once the array if built, it must call `_describe -V "Header name"
{variableName}`.

Note that it should not pass the variable directly (using `$`), but actually
passing the _name_ of the variable.

The `-V` forces the suggestions to be displayed in the exact order they are
saved in the array (otherwise they are alphabetically sorted).
