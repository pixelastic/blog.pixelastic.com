---
layout: post
title: "Alternate cp and mv commands using rsync"
custom_v2_id: 355
---

<p>Sometime you need to copy or move files, but preserve their ownership, timestamp or simply want to update the changing bits instead of blindly moving whole chunks of data.</p>
<p>I have two simple aliases to do just that. Meet <code>rcp</code> and <code>rmv</code> :</p>
<pre><code lang="sh">function rcp() { rsync -rahP --modify-window=1 "$@" } <br />function rmv() { rsync -rahP --modify-window=1 --prune-empty-dirs --remove-sent-files "$@" }<br />compdef _cp rcp rmv </code></pre>
<p>They are defined as functions and not aliases so I can define which completion functions zsh will use (that's the <code>compdef</code> part). In that case, I want them to use the same completion as for the basic <code>cp</code> command.</p>