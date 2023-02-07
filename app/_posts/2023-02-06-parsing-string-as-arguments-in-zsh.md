---
layout: post
title: "Parsing string as arguments in zsh"
tags: zsh
---

I had a `commandOptions` string variable that I wanted to use as arguments to
`fzf`. But `commandOptions` had all kind of spaces and quoted strings in it and
I had a hard time passing it as a set of distinct arguments and not one long
string argument.

The best solution I found was to actually display this `commandOptions` in
a multiline format, where each line was an option. Then, using the
`${(f)commandOptions}` modifier to read it.

### `get_options`

```zsh
#!/usr/bin/env zsh
local commandOptions=()
commandOptions+="--disabled"
commandOptions+="--delimiter=   "
commandOptions+="--with-nth=3"
commandOptions+="--bind=change:reload:sleep 0.1;${sourceBinary} {q} || true"

for line in $commandOptions; do
  echo $line
done
```

### `use_options`

```zsh
#!/usr/bin/env zsh
local myOptions="$(get_options)"
local selection="$(fzf ${(f)myOptions})"
```
