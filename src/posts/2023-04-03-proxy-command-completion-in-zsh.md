---
layout: post
title: "Proxy command completion in zsh"
tags: zsh
---

Commands like `sudo` take other commands as input and run them in a specific
context. I also have a command similar, called `lazyloadNvm` that runs `nvm
use` when needed.

I wanted zsh to suggest completion for the passed commands instead of completion
for the initial command (`sudo` or `lazyloadNvm`).

The solution was to create a `_nvm-lazyload` comdef file like this:

```zsh
#compdef

function _nvm-lazyload() {
  # Remove the first word (lazyloadNvm)
  shift words
  # Update which word is currently being focused for tab completion
  (( CURRENT-- ))
  # Re-run completion with the new input
  _normal
}
```

- `shift words` removes the first element of the `words` array (`sudo git
  status` becomes `git status`)
- `(( CURRENT-- ))` decreases the index of the word focused by tab
  completion. Updating `words` doesn't automatically updates `CURRENT`
- `_normal` re-runs the completion functions with the current `words` and
  `CURRENT` context.

