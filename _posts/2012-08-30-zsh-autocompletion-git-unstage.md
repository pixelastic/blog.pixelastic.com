---
layout: post
title: "ZSH autocompletion for git unstage "
custom_v2_id: 341
---

I recently switched to git as my main version control system (I used to use
Mercurial before that). I quickly grasped the concept of the staging area and
used the `git add` command extensively to add before committing.

And zsh ships with nice git autocompletion features, and suggests files to add
with `git add` when you press Tab.

## Git unstage

What is missing from the basic git commands is a way to unstage a file from
the staging area. Well, I can do it with `git reset HEAD`, but this command is
a bit tedious to type.

So I created an alias, named `git unstage` that does just that. I just added
the following lines to my `~/.gitconfig`, under the `[alias]` header :

    
```ini
unstage = reset HEAD
```

I can now easily add files to the staging area with `git add` and remove them
with `git unstage`

## Autocompletion

At this point, `git unstage` autocompletion does not work. It simply suggest
all files in the current directory, while I'd like it to suggest only files in
the staging area.

When you create a git alias, you cannot simply add a zsh autocomplete method
for that alias (meaning, you cannot create a `_git-unstage` method), you have
to hook your custom autocomplete logic to the underlying git method your alias
refers to. In this case, this is the `git reset` method.

So, I created my own `_git-reset` autocompletion function. Actually, I
borrowed the one already defined in
`/usr/share/zsh/functions/Completion/Unix/_git` and tweaked it a little bit.

I created a file named `_git-reset` and put it in my `$FPATH` so zsh will load
it when asked for autocompletion and it will overwrite the `_git-reset` method
already defined in `_git`.

Here is the full content of the file :

    
```sh
#compdef git-reset

_git-reset () {
    local curcontext=$curcontext state line
    typeset -A opt_args

    _arguments -C -S -A '-*' \
            '(-q --quiet)'{-q,--quiet}'[be quiet, only report errors]' \
            '::commit:__git_revisions' \
        - reset-head \
            '(        --soft --hard --merge --keep)--mixed[reset the index but not the working tree (default)]' \
            '(--mixed        --hard --merge --keep)--soft[do not touch the index file nor the working tree]' \
            '(--mixed --soft        --merge --keep)--hard[match the working tree and index to the given tree]' \
            '(--mixed --soft --hard         --keep)--merge[reset out of a conflicted merge]' \
            '(--mixed --soft --hard --merge       )--keep[like --hard, but keep local working tree changes]' \
        - reset-paths \
            '(-p --patch)'{-p,--patch}'[select diff hunks to remove from the index]' \
            '*::file:->files' && ret=0

    case $state in
        (files)
            local commit
            if [[ -n $line[1] ]] && __git_is_committish $line[1]; then
                commit=$line[1]
            else
                commit=HEAD
            fi
            # Suggest files in index if `git reset HEAD`
            if [[ $line[1] = HEAD ]]; then
                __git_changed_files
            else
                __git_tree_files . $commit
            fi
            ret=0
            ;;
    esac
}

_git-reset "$@"
```
    

As you may have noticed this script is an almost exact copy/paste from the
original `_git-reset` script. The only modification I've done is in those
lines :

    
```sh
# Suggest files in index if `git reset HEAD`
if [[ $line[1] = HEAD ]]; then
    __git_changed_files
else
    __git_tree_files . $commit
fi
```

What it does is checking the first argument of `git reset`, and if it's
`HEAD`, it suggests files in the staging area (`__git_changed_files`) instead
of files in the current repo (`__git_tree_files`).

It took me quite a bit of time to figure out which method to use to get files
in the staging area as I had been looking for a `__git_staged_files` for quite
a while and finally discovered that the `__git_changed_files` was actually
what I was looking for.

## Conclusion

The `git unstage` alias is quite common, you can find it in a lot of books and
websites teaching git. But it becomes much more usable once zsh does the
autocomplete for you and you can easily select files to unstage that way.

