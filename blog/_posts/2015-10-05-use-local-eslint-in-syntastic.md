---
layout: post
title: "Use local eslint in syntastic"
tags: npm, vim, eslint
---

[Syntastic][1] is one of my favorite vim plugins. It helps me find code issues
in my code before committing. I heavily use it with [rubocop][2] for Ruby and
[eslint][3] for JavaScript code.

## `npm-which`

But by default, it uses the globally installed `eslint`, and I want it to use
the locally installed one. So I wrote a small script, called `npm-which` that
returns the path of the specified binary. If it can be found in the underlying
`node_modules` binaries, it will return this one, otherwise it will revert to
the global one.

The code takes advantage of the fact that every locally installed binary can be
found in `./node_modules/.bin`.

```sh
#!/usr/bin/env zsh

local npm_bin=$(npm bin)
local bin_name=$1
local local_path="${npm_bin}/${bin_name}"

[[ -f $local_path ]] && echo $local_path && return

echo $(which $bin_name)
```

You can find the up-to-date version [here][4].

## Update the vim config

I then have to tell syntastic the explicit path to the binary using the
`b:syntastic_javascript_eslint_exec` variable. I'll use a local `eslint` if one
is installed, or revert to the global one otherwise. I put that in a
`after/ftplugins/javascript.vim` file in my vim directory.

```vim
let b:syntastic_javascript_eslint_exec = StrTrim(system('npm-which eslint'))
```

`StrTrim` is a custom vim method that will trim any starting and trailing
whitespace from a vim string, and in my case the `system` call was returning
a trailing weird `^@` char.

```vim
function! StrTrim(txt)
  return substitute(a:txt, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
endfunction
```

I can now use different `eslint` versions and configurations, directly in vim,
depending on the current project I'm working on.

Edit: [Matthew Smith][5] packed all this into one [neat Syntastic plugin][6].
Thanks Matthew!


[1]: https://github.com/scrooloose/syntastic
[2]: https://github.com/bbatsov/rubocop
[3]: http://eslint.org/
[4]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/npm-which
[5]: https://twitter.com/mtscout6
[6]: https://github.com/mtscout6/syntastic-local-eslint.vim
