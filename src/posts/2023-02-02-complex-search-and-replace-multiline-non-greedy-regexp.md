---
layout: post
title: "Complex sed search and replace (multiline, regexp, non-greedy)"
tags: zsh
---

I had a large chunk of text (output from another command), and needed to
perform a search and replace on it. I usually do that either with zsh builting
`${var:gs/x/y/}` syntax or `sed`, but this time my pattern was spread on several
lines.

## Multi-line with `--null-data`

The trick here is to use `sed ---null-data` to make it operate on the full text
instead of on invidual lines. Technically, it now considers a "line" to end with
a `NUL` character, and not a `\n` anymore.

## Improve readability with `--regexp-extended`

To improve readability of my regexps, I also used `--regexp-extended` which
allows me to write capturing groups without having to escape them (`(.*)`
instead of `\(.*\)`).

## Non-greedy

`sed` does not have a non-greedy mode, which means it will always capture the
largest group it can.

The way to work around that involves writing a slightly more complex regexp by
specifically defining the one character we don't want to capture.

For example with the string `foo_bar_baz`, I might want to find the part before
the first `_` by doing `^(.*)_`. This will actually return `foo_bar` because
it's greedy.

The way to work around that is to use `^([^_]*)_` instead. This can be read as:
capture everything that is not a `_` from the start until you met a `_`.
