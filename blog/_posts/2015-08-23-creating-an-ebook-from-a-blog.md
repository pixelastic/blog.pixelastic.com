---
layout: post
title: "Creating an ebook from a blog"
tags: epub, mobi, ebook, calibre
---

I recently stumbled upon a blog with very nice articles. I didn't have time to
read them on the screen at that moment, but would have loved to be able to read
them at my own pace on my Kindle later.

So I started my terminal and with a few commands was able to convert the whole
blog into a `mobi` file that I could load inside my Kindle.

Here is how I did it. This might give you and idea of how to solve the same kind
of problem on your own.

## Download html pages

Fortunatly, the blog I was reading had all its content displayed on only two
pages. Each page listed about 10 posts, then I had to go to the next page. The
blog was using the [manifest](https://wordpress.com/themes/manifest/) Wordpress
theme, and was hosted on [wordpress.com](https://wordpress.com/). So I guess it
was a really simple installation, with no custom plugins.

The blog itself was using some kind of javascript request to load the whole
content as I scroll, but I could access real pagination using the `/page/2/`
url.

```sh
$ wget https://blogexample.wordpress.com/ -O index.html
$ wget https://blogexample.wordpress.com/page/2/ -O page2.html
```

## Convert HTML to markdown

Once I had the `html` files, I converted them to markdown using
[html2txt](https://github.com/aaronsw/html2text).

```sh
$ html2txt index.html > index.md
$ html2txt page2.html > page2.md
```

This gave me simpler versions of the text. I then had to manually edit the files
to remove the useless content (blog title, link to comments, footer links).

I also replaced the titles (which were links) to their simple text form. I did
it once in vim, then recorded a macro and played it on the whole file. I also
did a few other cosmetic fixes on the file (fixing specials chars for example).

Here is an excerpt of the vim script I often use when editing markdown extracted
from ebooks or online sources:

```vim
" Dialogs should use the em dash (–) and not the simple dash (-)
silent! %s/\v^-/–/e

" Use common guillemets
silent! %s/“/"/e
silent! %s/”/"/e

" Same goes for apostrophes
silent! %s/’/'/e
silent! %s/‘/'/e
silent! %s/`/'/e

" Fixing ". .." and ". . ."
silent! %s/\v( ?)\. \.( ?)\./.../e

" Force space after dot and comma
silent! %s/\v(\.|,)([^ "\.])/\1 \2/e
" Force space after caps
silent! %s/\v(\l)(\u)/\1 \2/e
" Force space when case change inside a word
silent! %s/\v(\u{2})(\l)/\1 \2/e
  
" Fix lines that only contain whitespace
silent! %s/\s+$//e

" Condensate multiple new lines into only one
silent! %s/\v\n{3,}/\r\r/e
```

## Putting it all together

Now with two formatted files, I just had to merge them together and add a few
more information in the header.

```sh
$ (echo '# Ebook title\n\n' && cat index.md page2.md) > book.txt
```

Now that we have a nice text input, we just have to convert it to a `mobi`
file using the `ebook-convert` script from
[Calibre](http://calibre-ebook.com/).

Note that we need to have a `.txt` file here, `ebook-convert` won't accept
a `.md` file as input.

```sh
$ ebook-convert book.txt book.mobi \
  --formatting-type markdown \
  --paragraph-type off \
  --chapter '//h:h2'
```

And, we're almost done. We just need to add a bit of metadata to our file, so
the Kindle can correctly display it in its list of file.

```sh
$ ebook-meta book.mobi --authors="DOE John" --title="Ebook title"
```

## The end

And this is it. With just a few real simple shell scripts (`wget`, `cat`),
coupled with more complex scripts made by others (`html2txt`, `ebook-convert`)
and a bit of manual tweaking in `vim` you can easily automate some processes.

If you want to write a script that will do that for every available Wordpress
blog available out there, this will be a whole new level of complexity.
Sometimes, quick and dirty does the work just fine.
