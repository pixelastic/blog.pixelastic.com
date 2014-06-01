---
layout: post
title: "How to prevent a FOUC but still gracefully degrade the jQuery UI tabs"
custom_v2_id: 223
---

<p>I finally managed to fix something that was bugging me for a very long time. I'm talking about the jQuery UI tabs.</p>
<p>They are pretty useful actually, but I always hated that <abbr title="Flash Of Unstyled Content">FOUC</abbr> they produce. For one split second, you'll see all your tabs content, then they'll be neatly re-arranged in tabs.</p>
<p>What I want are my tabs displayed correctly right away, on first load.</p>
<h4>First, the markup</h4>
<p>Here's a typical tabs markup :</p>
<pre><code lang="html">&lt;div class="tabs"&gt;<br />    &lt;ul&gt;<br />        &lt;li&gt;&lt;a href="#firstTab"&gt;First tab&lt;/a&gt;&lt;/li&gt;<br />        &lt;li&gt;&lt;a href="#secondTab"&gt;Second tab&lt;/a&gt;&lt;/li&gt;<br />    &lt;/ul&gt;<br /><br />    &lt;div class="tabPanel" id="firstTab"&gt;<br />        First tab content<br />    &lt;/div&gt;<br />    <br />    &lt;div class="tabPanel" id="secondTab"&gt;<br />        Second tab content<br />    &lt;/div&gt;<br />&lt;/div&gt;<br /></code></pre><h4>CSS to hide all tabs if Javascript is disabled</h4>
<p>If your Javascript is disabled, so will jQuery UI. We will then hide the <code>&lt;ul&gt;</code> because it serves no purpose here. We will only show it if js is enabled</p>
<pre><code lang="css">.tabs ul { display:none; }<br />.js .tabs ul { display:block; }<br /></code></pre><h4>Applying jQuery UI tabs</h4>
<p>By doing a<code> $('.tabs').tabs();</code> jQuery UI will treat your <code>&lt;ul&gt;</code> as  your tab menu and all your <code>.tabPanel</code> as their corresponding contents. It will hide all your panels, except for the first one. It does so by adding a<code> .ui-tabs-panel</code> class to every <code>.tabPanel</code> as well as a <code>.ui-tabs-hide</code> to every panel it hides.</p>
<p>Right now, you should add another CSS rule to hide the unused panels :</p>
<pre><code lang="css">.ui-tabs-hide { display: none; }<br /></code></pre><p>But if you look at your page now, you'll see all your tabs content before they get hidden. That is the FOUC I was talking about. The jQuery UI documentation indicate that to remove it, you should directly add the <code>.ui-tabs-hide</code> class to panels you'll want to hide.</p>
<p>As also pointed in the doc, it will not gracefully degrade because users without Javascript won't even be able to see your other tabs. Also, it asks you to add server-side logic (HTML markup with jQuery specific classes) for something that should be handled entirely client-side.</p>
<h4>Removing the FOUC while gracefully degrade</h4>
<p>Ok, so what I did was writing two simple rules that will directly hide all unused panels while still displaying the active one, even before jQuery UI takes action.</p>
<pre><code lang="css">.js .tabPanel + .tabPanel { display:none;}<br /></code></pre><p>That way, no FOUC, and users without Javascript still see all the content. Unfortunatly, if you now try clicking on your tabs, you'll see that nothing happens and you get stuck with your default panel always visible.</p>
<h4>Fixing the jQuery UI tabs</h4>
<p>As jQuery will add new classes to my elements, I'll just have to write more specific rules that use those classes. Here's the little piece of logic I came up with :</p>
<pre><code lang="css">.js .tabPanel.ui-tabs-panel { display:block;}<br />.js .tabPanel.ui-tabs-panel.ui-tabs-hide { display:none;}<br /></code></pre><p>All the jQuery panels are shown, except for the one hidden by jQuery. All those rules being more and more specific, they will get applied once the tabs are activated but still override the previous <code>display:</code> declarations.</p>
<h4>Conclusion</h4>
<p>This is how I fixed an issue that was bugging me for years. Unfortunatly the CSS rules being dependent on the markup used, I haven't yet been able to write them in a global form that could be added to the main jQuery UI css files.</p>