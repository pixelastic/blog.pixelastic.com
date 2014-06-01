---
layout: post
title: "git resurrect to bring back deleted files from the dead"
custom_v2_id: 350
---

<p>Ever deleted a file several commits away and then suddenly realizing that you actually need it ? Well, here's an easy way to get your file back.</p>
<p>First of all, we'll get the commit in which the file has been deleted with : <code>git log --diff-filter=D --format=format:%H -- {your_filename}</code></p>
<p><code>--diff-filter=D</code> will only keep commits where files gets deleted, <code>--format=format:%H</code> will only display the commit hash and finally the <code>--</code> is a separator between your options and the argument. Argument should be your filename, and it even accepts <code>*</code> as a wildcard.</p>
<p>Once you got the commit hash, it's just a matter of checking the file out using <code>git checkout {hash}~1 {your_filename}</code>. The <code>~1</code> targets the previous commit, right before the file gets deleted.</p>
<p>All wrapped up in a nice shell script, here is what it looks like :</p>
<pre><code lang="sh">#!/usr/bin/env bash <br />filename=$1  <br /># We first find the commit where the file was deleted <br />hash=$(git log --diff-filter=D --format=format:%H -- $filename)  <br /># We then bring it back from the dead <br />git checkout $hash~1 $filename</code></pre>
<p>I've aliased mine to <code>git resurrect</code>.</p>
