---
layout: post
title: "git resurrect to bring back deleted files from the dead"
custom_v2_id: 350
---

Ever deleted a file several commits away and then suddenly realizing that you
actually need it ? Well, here's an easy way to get your file back.

First of all, we'll get the commit in which the file has been deleted with :
`git log --diff-filter=D --format=format:%H -- {your_filename}`

`--diff-filter=D` will only keep commits where files gets deleted,Â
`--format=format:%H` will only display the commit hashÂ and finally the `--`
is a separator between your options and the argument. Argument should be your
filename, and it even accepts `*` as a wildcard.

Once you got the commit hash, it's just a matter of checking the file out
using `git checkout {hash}~1 {your_filename}`. The `~1` targets the previous
commit, right before the file gets deleted.

All wrapped up in a nice shell script, here is what it looks like :

    
    #!/usr/bin/env bashÂ   
    filename=$1    
    # We first find the commit where the file was deleted   
    hash=$(git log --diff-filter=D --format=format:%H -- $filename)    
    # We then bring it back from the dead   
    git checkout $hash~1 $filename

I've aliased mine to `git resurrect`.

