---
layout: post
title: "Spectrum, a script to see your terminal 256 colors"
custom_v2_id: 342
---

Here is a little script I hacked together to display in your terminal all the
colors available in the 256 color spectrum, as well as a visual representation
of them.

![Screenshot of spectrum output](http://s3.pixelastic.com/files/2012/09/06
/504834cb-df14-4fa6-a08c-763445a3e447/spectrum2.png)

The `oh-my-zsh` project actually ships with a method named `spectrum` that
does pretty much the same thing, but I found that it was hard to actually get
a real feel of what the color where with the original output. So I coded this
one.

It does not display the colors in the range `{000..015}` because those are
dependent on your terminal configuration. Also, the output is split in blocks
of 6 lines, with 2 blocks displayed side by side. You can modify those values
in the script if you want to make it easier to read on you screen. I use 2 and
6 because it is what is the more readable on my tiny netbook screen.

Ok, enough talk, here is the script


```sh
#!/usr/bin/zsh
# Display the terminal 255 colors by blocks

# Long space is long
local space=" "
for i in {0..22}; do space=$space" "; done

# Number of color lines per block
local lines=6
# Number of blocks per terminal line
local blocks=2

# Tmp var to hold the current line in a block
local m=0
# Tmp var to hold how many blocks are filled
local b=0
typeset -A grid

# We want to display the blocks side by side, so it means we'll have to create
# each line one my one then display all of them, and after that jump to the
# next set of blocks
for color in {016..255}; do
    # Current line in a block
    m=$((($color-16)%$lines))

    # Appending the displayed color to the line
    grid[$m]=$grid[$m]"^[[01m^[[38;5;${color}m#${color} ^[[48;5;${color}m${space}^[[00m  "

    # Counting how many blocks are filled
    [[ $m = 5 ]] && b=$(($b+1))

    # Enough blocks for this line, display them
    if [[ $b = $blocks ]]; then
        # Reset block counter
        b=0;
        # Display each line
        for j in {0..5}; do
            echo $grid[$j]
            grid[$j]=""
        done
        echo ""
    fi
done

# Display each remaining blocks
for j in {0..5}; do
    echo $grid[$j]
    grid[$j]=""
done
```

Oh and one last word. You might want to pipe the output to `less` to make it
easier to read if you're on a small screen like me.

