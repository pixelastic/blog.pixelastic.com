---
layout: post
title: "Adding Grunt to Jekyll"
tags: jekyll, grunt
---

## Main build

### Directory structure

As usual in a Grunt build, we keep all our source files in a `./app` directory,
and the output build will be in `./dist`. The `./app` directory is a classical
Jekyll directory, including `_posts`, `_layouts` and markdown source files.

### Main process

Whenever you run `jekyll build` (directly or through the `grunt-jekyll` task),
your output directory will be emptied before Jekyll regenerates all its files
in it. This is an important thing to remember for our build process as it means
the `jekyll` task as to be executed first.

We'll exclude the directories holding our CSS and Javascript files from the
Jekyll build as we'll have custom grunt tasks for that.

### Javascript

Our main Jekyll layout references only on Javascript file, `/js/main.js`. To
build it, we'll simply concatenate all the needed Javascript file, and then
uglify them. The output file will be saved to the Jekyll output directory.

### CSS

The same principle will be applied to our CSS files, is one added step. We
first need to process our `scss` files into css. To that end, we'll first
generate all the `css` files in a temporary directory, and we'll read that
directory (instead of the source one) to generate the concatenated version.
Next steps are the same : cssmin and copy to jekyll output directory.

### HTML

HTML minification is the easiest part. We simply need to run `htmlmin` on all
the Jekyll output files.

## Dev build

### Main process

Ok, we have a nice build process. We generated a Jekyll website with all our
assets minified. But that's not very practical while developing. If you have
hundred of posts like I have, the Jekyll build itself will take more than 30s.
And all this processing, concatenation and minification takes time too. I'm not
even talking about the pain it is to debug a minified file.

Ok, let's update our build process so if we run `grunt build:dev` instead of
`grunt build` we have a more developer-friendly environment.

### Jekyll

Unfortunatly, there is no way to tell Jekyll to only regenerate files that
changed since last build. Everytime you `jekyll build` it will process all the
files again. So, the easiest way to speed up the Jekyll build is to limit the
number of posts to process. You won't have the exact same site you'll have in
production, but a handful of posts is usually enough to debug what you're
working on.

I like to also include the `_drafts` directory in this build, so I can see the
posts I'm currently working on and haven't yet published.

### Javascript

This one gets trickier. In our final build we had one single file holding all
the Javascript from the website. This took time to generate and was a nightmare
to debug.

What we'll do here is keep files separate and not minified.

> Euh, on fait comment ? Je peux mettre un code en devcode pour la prod avec
> juste un lien vers main.js et un code pour le dev avec la liste.
> Mais je me retrouve à devoir maintenir deux liste de fichiers, celle dans la
> tache de concatenation et celle dans le fichier index.html.
> Il doit exister une tache grunt qui peut lire un code html pour remplacer les
> déclaration de js/css avec du globbing.
> Mais ça veut alors dire qu'il faut que je modifie soit tous les fichiers une
> fois générés (gros boulot, bof). Soit que je modifie le layout avant
> génération par Jekyll. 
> Mais du coup il faut que je copie la source jekyll dans un dossier
> intermédiaire ?
> Donc :
>  - Je copie Jekyll (avec newer) dans un dossier intermédiaire pour le dev
>  - J'update les layouts pour virer le devcode et ne garder que les
>    définitions vers les fichiers sources
>  - Je ne copie toujours pas les sources avec Jekyll
>  - Dans ma tache js, je copie les JS dans Jekyll
