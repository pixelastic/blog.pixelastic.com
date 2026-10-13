---
layout: post
title: "The making of programmingexcuses.sh"
tags: linux, wget, pup, bash
---

I recently discovered [programmingexcuses.com][1]
which is a funny website displaying random excuses that we often use when
confronted with a bug we didn't foresee.

I though it was a very clever idea and that it would also be cool to
have it on the command line. I quickly googled it but found no result (except
for this [API][2]).

So I decided to fill in this void.

First, I needed the list of quotes. I could get the page through `curl` easily.
Next, I needed a way to extract the content from the HTML. At first I tried it
with `grep`, `sed` and `awk` but my command line skills are still too weak and
couldn't get it to work properly.

So I ran another google search to find a command line HTML parser. And I found
[pup][3] which is to HTML what
[jq][4] is to JSON. With `pup`, I could easily get
the text I needed from the page.

Now that I was able to get one excuse, I needed the full list. So I ran a loop
of 100 calls to the website, to get a random sample of 100 quotes.

After running the list through `sort` and `uniq`, I ended up with a list of 77
quotes, which was enough.

Here the final script that got me my list :

```sh
#!/usr/bin/env zsh

for i in {00..100}; do
  curl http://programmingexcuses.com/ \
    | pup -p 'center a text{}' \
    >> excuses.txt
done

cat excuses.txt | sort | uniq > sorted_excuses.txt
```

Now, I simply put the list in a simple bash script that does a `shuf -n 1` on
it to display a random one on each invocation.

Last step was to put that in a git repo, write a readme and push it to
[github][5].

Overall, it took me about 2 pomodoros (50mn). I love how powerful command line
tools are.


[1]: http://programmingexcuses.com
[2]: https://api.githunt.io/programmingexcuses
[3]: https://github.com/EricChiang/pup
[4]: https://github.com/stedolan/jq
[5]: https://github.com/pixelastic/programmingexcuses.sh
