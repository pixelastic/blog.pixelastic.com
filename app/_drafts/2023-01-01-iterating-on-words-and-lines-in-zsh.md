When writing zsh scripts, one often needs to iterate on elements, but depending
on how you create them, they can either be a core zsh array, a string of words,
or the output of a command, delimited by newlines.

## Iterating on an array

Iterating on arrays in zsh has a pretty straightforward syntax:

```zsh
local projects=(firost aberlaas golgoth);
for project in $projects; do
   echo "${project} is one of my projects";
 done
```

## Handling string of words

By default, zsh does not split a string in its words like other shells (Bash)
do, so iterating on words requires the use of the `${=}` syntax.

The `=` the Bash-compatible behavior by switching the `SH_WORD_SPLIT` zsh option
just for that variable.

### Iterating on the words

```zsh
local projects="firost aberlaas golgoth";
for project in ${=projects}; do
   echo "${project} is one of my projects";
 done
```

### Accessing one element specifically

Note that if you want to convert the string of words into an array, to
specifically access one of its elements, you need to wrap it in `()`.

```zsh
local projects="firost aberlaas golgoth";
local projectsArray=(${=projects})
echo "$projectsArray[2] is my second project"
```

### A note on words

Note that zsh will split by words, meaning that multiple spaces will be removed:

```zsh
local projects="   firost        aberlaas            golgoth    ";
local projectsArray=(${=projects})
echo "$projectsArray[2] is still my second project"
```

## Iterating on lines in a string

New lines are considered words separators, so technically the `${=}` could be
used to split a string by newlines. But this will *also* split by spaces, so if
your lines contain spaces, you final array will not be what you expect.

To split only by new lines and not by space, you need to use the `${(f)}`
syntax. This proves useful when parsing long output from other commands

### Iterating on the lines

```zsh
local projects="$(ls)";
for project in ${(f)projects}; do
   echo "${project} is a project file in my dir";
done
```

### Accessing one line specifically

```zsh
local projects="$(ls)";
local projectsArray=(${(f)projects})
echo "$projectsArray[2] is my second project"
```

