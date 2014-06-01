---
layout: post
title: "ZSH autocompletion for git unstage "
custom_v2_id: 341
---

<p>I recently switched to git as my main version control system (I used to use Mercurial before that). I quickly grasped the concept of the staging area and used the <code>git add</code> command extensively to add before committing.</p>
<p>And zsh ships with nice git autocompletion features, and suggests files to add with <code>git add</code> when you press Tab.</p>
<h4>Git unstage</h4>
<p>What is missing from the basic git commands is a way to unstage a file from the staging area. Well, I can do it with <code>git reset HEAD</code>, but this command is a bit tedious to type.</p>
<p>So I created an alias, named <code>git unstage</code> that does just that. I just added the following lines to my <code>~/.gitconfig</code>, under the <code>[alias]</code> header :</p>
<pre><code>unstage = reset HEAD
</code></pre>
<p>I can now easily add files to the staging area with <code>git add</code> and remove them with <code>git unstage</code></p>
<h4>Autocompletion</h4>
<p>At this point, <code>git unstage</code> autocompletion does not work. It simply suggest all files in the current directory, while I'd like it to suggest only files in the staging area.</p>
<p>When you create a git alias, you cannot simply add a zsh autocomplete method for that alias (meaning, you cannot create a <code>_git-unstage</code> method), you have to hook your custom autocomplete logic to the underlying git method your alias refers to. In this case, this is the <code>git reset</code> method.</p>
<p>So, I created my own <code>_git-reset</code> autocompletion function. Actually, I borrowed the one already defined in <code>/usr/share/zsh/functions/Completion/Unix/_git</code> and tweaked it a little bit.</p>
<p>I created a file named <code>_git-reset</code> and put it in my <code>$FPATH</code> so zsh will load it when asked for autocompletion and it will overwrite the <code>_git-reset</code> method already defined in <code>_git</code>.</p>
<p>Here is the full content of the file :</p>
<pre><code>#compdef git-reset

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
            '*::file:-&gt;files' &amp;&amp; ret=0

    case $state in
        (files)
            local commit
            if [[ -n $line[1] ]] &amp;&amp; __git_is_committish $line[1]; then
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
</code></pre>
<p>As you may have noticed this script is an almost exact copy/paste from the original <code>_git-reset</code> script. The only modification I've done is in those lines :</p>
<pre><code>    # Suggest files in index if `git reset HEAD`
    if [[ $line[1] = HEAD ]]; then
        __git_changed_files
    else
        __git_tree_files . $commit
    fi
</code></pre>
<p>What it does is checking the first argument of <code>git reset</code>, and if it's <code>HEAD</code>, it suggests files in the staging area (<code>__git_changed_files</code>) instead of files in the current repo (<code>__git_tree_files</code>).</p>
<p>It took me quite a bit of time to figure out which method to use to get files in the staging area as I had been looking for a <code>__git_staged_files</code> for quite a while and finally discovered that the <code>__git_changed_files</code> was actually what I was looking for.</p>
<h4>Conclusion</h4>
<p>The <code>git unstage</code> alias is quite common, you can find it in a lot of books and websites teaching git. But it becomes much more usable once zsh does the autocomplete for you and you can easily select files to unstage that way.</p>