---
layout: post
title: "Alternate cp and mv commands using rsync"
custom_v2_id: 355
---

Sometime you need to copy or move files, but preserve their ownership,
timestamp or simply want to update the changing bits instead of blindly moving
whole chunks of data.

I have two simple aliases to do just that. Meet `rcp` and `rmv` :


```sh
function rcp() { rsync -rahP --modify-window=1 "$@" }
function rmv() { rsync -rahP --modify-window=1 --prune-empty-dirs --remove-sent-files "$@" }
compdef _cp rcp rmv 
```

They are defined as functions and not aliases so I can define which completion
functions zsh will use (that's the `compdef` part). In that case, I want them
to use the same completion as for the basic `cp` command.

