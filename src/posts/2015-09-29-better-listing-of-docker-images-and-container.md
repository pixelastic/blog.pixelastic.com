---
layout: post
title: "Better listing of docker images and containers"
tags: docker
---

I recently started using Docker more and more for my development needs.
I struggled a bit at first with the difference between images and containers,
and all the relative commands (`build`, `run`, `stop`, `start`).

One thing that I was really not happy about was the output of the `docker ps`
and `docker images` commands. It displays more information than I really need,
and it does not fit on small terminal screens.

![Default output][1]

So I started hacking a couple of wrapper scripts to provide a much better
display. And here is what I came up with:

![New output][2]

## Show me the code

You can find the code for each wrapper script on GitHub
([docker-container-list][3] and [docker-image-list][4]).

The idea behind each is basically the same. I get the initial output of the
command, parse it to extract the data that interests me, sort it, then display
it with colors.

The `docker ps` command has an optional argument of `--format` that lets you
choose what kind of information you'd like to display, using placeholders. The
documentation on that is not really great (some placeholders are not defined in
the doc), but overall this makes the parsing very easy.

The `docker images` command on the other hand does not provide such option,
so I resorted to split the output in ruby to get the data from the first three
columns.

For the sorting of containers, I decided to display first the running
containers, then the stopped one. For images, this is a simple alphabetical
ordering first on the name, then on the tags.

Then come the colors. I'm already using some kind of similar wrappers for the most
common `git` commands, and I'm already using colors to display tags
and hashes, so I re-used those colors here. I tried to stay consistent and use
the same color for the same kind of data in both displays (images in yellow,
hashes in blue).

I also prefixed each container with a small icon, telling me if the container is
currently running or is stopped. I use a [patched version][5] of the [Hack
font][6] here, with [Octicons][7] added.

## Aliases

Of course, typing `docker-container-list` and `docker-image-list` is way too
long, so I aliased it to 4-letters aliases. I use `docl` and `doil`, that stands
for `do`cker `c`ontainer `l` and `do`cker `i`mage `l`ist. 

![Alias output][8]

I use this notation a lot in my aliases. They are inspired by vim and follow the
{Namespace}{Object}{Action} pattern. The Namespace part here is `do` for
`docker` (I also have namespaces aliases for `apt-get`, `tmux` or `git` for
example). Then I use `i` or `c` for `i`mages and `c`ontainers. And finally `l`
for `l`ist.

I plan to write another blog post on my `git` aliases one day.


[1]: /img/files/2015-09-29/docker-ps-images-before.jpg
[2]: /img/files/2015-09-29/docker-ps-images-after.jpg
[3]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/docker-container-list
[4]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/docker-image-list
[5]: https://github.com/pixelastic/oroshi/blob/master/config/fonts/HackWithOcticons.ttf
[6]: http://sourcefoundry.org/hack/
[7]: https://octicons.github.com/
[8]: /img/files/2015-09-29/docker-ps-images-alias.jpg
