---
layout: post
title: "\"failed to import extension hgext.imerge\" warning on Dreamhost"
custom_v2_id: 162
---

Trying to push some new code to a Hg repository on my Dreamhost account, I had
the following error message :

    
    remote: *** failed to import extension hgext.imerge: No module named imerge  
    

I used to have the same kind of issues with an other extensions,
`hgext/hbisect` a while ago and I fixed it by forcing Hg to not use this
extension.

Here's how :

Edit your `.hgrc` file and under the `[extensions]` category, add
`hgext.imerge=!`, like this

    
    [extensions]  
    hgext/hbisect = !  
    hgext.imerge=!

This should stop the warning.

