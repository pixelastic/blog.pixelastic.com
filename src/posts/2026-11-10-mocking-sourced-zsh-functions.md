---
title: "Mocking sourced zsh functions"
date: 2026-11-10
description: "My mock kept getting overwritten by the file my function sources. A guard and a source() wrapper failed. A zsh DEBUG trap fixed it."
tags:
  - zsh
  - testing
  - bats
---

Lately I had to write a test for a zsh function. I wanted to mock some of the
heavy calls inside it, and it got a bit more complicated than expected. So as to
not fall into the same trap (pun intended, you'll see why shortly), I decided to
document it, for future me.

## The setup

For the sake of example, imagine I have two functions in my shell (not my real
ones, but close enough).

1. `get-weather` does an HTTP call to a public endpoint and prints the raw JSON
   it gets back.
2. `get-temperature` calls it and uses `jq` to extract the temperature and
   convert it from Fahrenheit to Celsius.

`get-temperature` and `get-weather` are zsh autoloaded function; this means they
are always available in my CLI, but only loaded on demand. You don't need to
know that to understand the rest of the post, but zsh autoloaded functions are
so neat I wanted to share the info.

```zsh
# /usr/local/share/zsh/site-functions/get-temperature
local fahrenheit=$(get-weather | jq -r .temperature)
printf '%.0f\n' $(( (fahrenheit - 32) * 5 / 9 ))
```

I'm using [bats](https://github.com/bats-core/bats-core) as the test runner, so
a naive test for `get-temperature` would be:

```bats
@test "get Celsius temperature" {
  run zsh -c 'get-temperature'
  [[ "$output" == "21" ]]
}
```

Of course, this test would probably fail, as I'm not fixing the output of
`get-weather` and thus depends on real live weather data.

What I really want to test is the Fahrenheit to Celsius conversion. So I want to
mock `get-weather` so it returns a fixed temperature in Fahrenheit, so I can
assert that `get-temperature` gives me the right Celsius value.

## The naive mock

The easiest way to mock a method is to re-define a method with the exact same
name but a fixed return value. I created a dedicated `mock.zsh` file to store
it, and sourced it before the call.

```zsh
# mock.zsh
function get-weather() {
  echo '{"temperature": 64.4}';
}
```

```bats
@test "get Celsius temperature" {
  run zsh -c 'source ./mock.zsh; get-temperature'
  [[ "$output" == "18" ]]
}
```

✅ This pass.

The original temperature is now fixed, and my test actually tests the
conversion. Perfect!

## The refactor

Later on, I realized I don't really need `get-weather` in every shell. I only
need it in `get-temperature`. All I need in my path is `get-temperature`.

I moved `get-weather` to a `weather.zsh` file, and `get-temperature` now sources
it when it runs.

```zsh
# /usr/local/share/zsh/site-functions/get-temperature
source ./weather.zsh
local fahrenheit=$(get-weather | jq -r .temperature)
printf '%.0f\n' $(( (fahrenheit - 32) * 5 / 9 ))
```

Now `get-temperature`, the function I want to test, loads its own dependencies.
What about the test?

```bats
@test "get Celsius temperature" {
  run zsh -c 'source ./mock.zsh; get-temperature'
  [[ "$output" == "18" ]]
}
```

❌ This fails.

Sure, the code is cleaner, but the tests are now broken. As `get-temperature`
now sources `weather.zsh` **after** I mocked it, my mock is now useless.

This is where I realized this is going to be a bit more complex than I
anticipated.

## Attempt A: a guard in the lib

The first fix I found is to update the `weather.zsh` to only define the real
function if it isn't already defined.

```zsh
# weather.zsh
whence get-weather >/dev/null && return 0

function get-weather() {
  # ...
}
```

It works, but I don't like it.

It clutters my code files with instructions that are only relevant when in a
test runner. That's poor separation of responsibilities. Worse, it forces me to
keep only one function per file, if I want to be able to bail out of executing
the file early.

I need a better solution.

## Attempt B: mocking source()

What if I mocked `source` itself? It would source what it is asked, **then**
sources my mocks on top.

```zsh
function source() {
  # `builtin` calls the real `source`, not my wrapper, which would loop forever.
  builtin source "$@"
  builtin source ./mock.zsh
}
```

✅ It works!

Surely, this is future-proof and willalways work, right?

…

…

Right?

Well, it didn't survive another refactor. Let's imagine I now want to add a
constant in `weather.zsh` because I plan to use it in `get-temperature` later.

```zsh
# weather.zsh
typeset FAHRENHEIT_OFFSET=32

function get-weather() {
  # ...
}
```

```zsh
# /usr/local/share/zsh/site-functions/get-temperature
source ./weather.zsh
local fahrenheit=$(get-weather | jq -r .temperature)
printf '%.0f\n' $(( (fahrenheit - FAHRENHEIT_OFFSET) * 5 / 9 ))
```

❌ Tests fails now.

Why? Because my redefining `source` I created a scope around `source`, and any
variable defined in the scope stays in this scope. The builtin `source` command
doesn't have this limitation, but my cheap wrapper does.

We need another solution.

## Attempt C: a DEBUG trap

The final solution, at least the one I found and am using now, is not to mock
`source` but to use a zsh feature called a debug trap.

A `DEBUG` trap is a piece of code that zsh runs before each command:

```zsh
# Let's define a DEBUG trap
trap 'echo debug' DEBUG

# Now execute some commands
echo one
echo two
```

The output would be:

```text
debug
one
debug
two
```

The code passed to the debug trap would get executed before each command. It
means in my case I could force zsh to reload my mocks before **every** command
like this:

```zsh
trap 'source ./mock.zsh' DEBUG
```

That way, no matter how many times the function under test `source`s another
file, I will **always** source my mocks right before executing any command.

```bats
@test "get Celsius temperature" {
  run zsh -c 'trap "builtin source ./mock.zsh" DEBUG; get-temperature'
  [[ "$output" == "18" ]]
}
```

✅ This works!

As we are using the builtin source, my `FAHRENHEIT_OFFSET` is still available.

## What it costs

Surely, re-mocking everything between **every single command** adds some
overhead. From my calculation, it only added ~4% to the total time of the test
file, something I ca definitely live with.

## Where I ended up

At the end of the day, I managed to test my function, mock the underlying heavy
calls and keep my code clean. There might be an even better solution, but I
haven't found it yet.
