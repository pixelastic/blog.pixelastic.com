---
layout: post
title: "Commandline escaping magic"
custom_v2_id: 356
---

Aren't your tired of having to wrap your url in quotes when using `wget` so
the various `&` and `?` do not mess up your terminal ?

Well, I was, until I stumbled upon this god-send zsh magic : `url-quote-
magic`.

Just initiate it in your `.zshrc` with the following lines :

    
```sh
autoload -U url-quote-magic   
zle -N self-insert url-quote-magic  
```

And now, everytime you type or paste a url in `wget` it will automatically
escape the needed characters. It is quite clever and works with other commands
that would otherwise trigger your terminal globbing feature.

