---
layout: post
title: "Scoping zsh variables"
tags: zsh
---

By default in zsh, if you define a `local myVariable` it will be available to
the whole script running it.

Any of those variables defined in your `.zshrc` will also be visible in your
terminal. This can create weird bugs when you accidentally defined a variable
with the same name as another zsh script.

Note that those are *not* environment variables. Even if you can read them from
your zsh terminal, they are not accessible from other tools. To explicitly make
them available as environment variables, you need to `export` them.

If you define a variable inside a function, it stays scoped to that
function, though. Also, anonymous functions are run as soon as they are defined,
and discarded afterwards.

Using those two features, we can define our variables without them being
available in the terminal global scope.

I find it a best practice to wrap any of my sourced zsh scripts in a `function
() { }` block, like this:

```zsh
local one=1
function () {
  local two=2
  export THREE=3
}
```

`one` is accessible in the whole `.zsh` script, including inside of the
function, and even during your whole terminal session (you can `echo $one`).
Other, non-zsh, scripts won't be able to read it though.

`two` is accessible only in the body of the function, and is scoped there
and won't be accessible from outside. It's perfect for small variables you need
to simplify your code but don't need laying around.

`THREE` is an environment variable, that can be used in the terminal (`echo $THREE`)
as well as in any other script you're running from the terminal. It's useful if
you need to set some global flags or editing global settings (like the `$PATH`
variable). 

