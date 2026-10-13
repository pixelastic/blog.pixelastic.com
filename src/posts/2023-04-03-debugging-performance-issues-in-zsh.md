---
layout: post
title: "Debugging performance issues in zsh"
tags: zsh
---

If I add too much code in my `.zshrc`, my zsh takes longer to load. As I use
a lot of different terminal windows (splitting one main tmux window), I want
those split to happen quickly. This is why I'm trying very hard to keep the
loading time of zsh under 150ms.

## Hyperfine

One way to evaluate the current loading speed and track potential regressions
and improvement is to use [hyperfine](https://github.com/sharkdp/hyperfine)

```zsh
hyperfine --warmup 3 "zsh -i -c exit"
```

This will benchmark how long it will take on average to load zsh. The `-i` makes
it load in interactive mode (so, by sourcing `~/.zshrc`), and `-c exit` makes it
execute the exit command.

Note that if you have any commands running asynchronously in the background
(like prompt optimization), they will purposefuly not be included in the time.

## zprof

The other debugging tool is to use `zprof`, which is the zsh profiler.

Include `zmodload zsh/zprof` at the top of your `~/.zshrc` file, and `zprof` at
the bottom. Next time you'll open zsh, you'll see a table like this:

```
num  calls                time                       self            name
-----------------------------------------------------------------------------------
 1)    1         240,22   240,22   65,76%    240,22   240,22   65,76%  oroshi_tools_pyenv
 2)    1          72,98    72,98   19,98%     72,98    72,98   19,98%  oroshi_theming_index
 3)    1          14,77    14,77    4,04%     14,77    14,77    4,04%  compinit
 4)    1          14,12    14,12    3,86%     14,12    14,12    3,86%  oroshi-completion-styling
 5)    1           5,85     5,85    1,60%      5,85     5,85    1,60%  oroshi_tools_fzf
 6)    1           4,95     4,95    1,35%      4,95     4,95    1,35%  _zsh_highlight_bind_widgets
 7)    1           4,56     4,56    1,25%      3,01     3,01    0,82%  oroshi_tools_z
 8)    1           2,27     2,27    0,62%      2,27     2,27    0,62%  _zsh_highlight_load_highlighters
 9)    2           2,17     1,09    0,60%      2,17     1,09    0,60%  promptinit
10)    1           2,10     2,10    0,58%      2,10     2,10    0,58%  oroshi_tools_ls
11)    7           1,51     0,22    0,41%      1,51     0,22    0,41%  add-zsh-hook
12)    7           0,64     0,09    0,17%      0,64     0,09    0,17%  compdef
13)    2           0,63     0,31    0,17%      0,63     0,31    0,17%  is-at-least
14)    1          14,85    14,85    4,07%      0,09     0,09    0,02%  oroshi_completion_compinit
```

This shows where most of the time is spend, the number of times a specific
function is called, and if you scroll down you'll see details of the stacktrace
of each sub command.

In this example, it is clear that my `oroshi_tools_pyenv` method is too slow,
and I need to optimize it.

Note that this only tracks the time to run functions, not the time to source
files, so if you need to benchmark a specific sourced file, wrap it in
a function that you invoke immediatly.

