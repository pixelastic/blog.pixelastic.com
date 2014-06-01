---
layout: post
title: "Paginated search results and custom url"
custom_v2_id: 170
---

<p>I wanted for this blog a search feature, but I had some <span class="searchmatch">prerequisites</span> for it :</p>
<ul>
<li>The search url could be bookmarked</li>
<li>It should be paginated</li>
<li>It should play well with my custom url starting with /blog</li>
</ul>
<h4>Defining custom urls</h4>
<p>Here are the two routes I defined in my routes.php</p>
<pre><code lang="php">Router::connect('/blog/search/:keyword',<br />    array('controller' =&gt; 'posts', 'action' =&gt; 'search'),<br />    array(<br />        'pass' =&gt; array('keyword'),<br />        'keyword' =&gt; '[^/]+'<br />    )<br />);<br />Router::connect('/blog/search/*', array('controller' =&gt; 'posts', 'action' =&gt; 'search'));<br /></code></pre>
<p>Going to<code> /blog/search/*keyword*</code> will start a search on the keyword, while going to <code>/blog/search/ </code>would display a search form.</p>
<h4>Writing the method</h4>
<p>I started by creating a <code>search </code>action in my <code>PostController</code>, then creating a form submitting to this action, with a <code>keyword </code>input field.</p>
<p>In the <code>search </code>method, the first thing I do is checking if some POST data is submitted (coming from the search form). If so, I redirect to the same page, but passing the <code>keyword </code>as first parameter.</p>
<p>If no <code>keyword </code>is passed nor data submitted, I'll display a simple search form.</p>
<p>And finally if a <code>keyword </code>is specified, I'll do a paginated search on every posts whose <code>name </code>or <code>text </code>contains the <code>keyword</code>.</p>
<pre><code lang="php">function search() {<br />	// We redirect to get it in GET mode<br />	if (!empty($this-&gt;data)) {<br />		return $this-&gt;redirect(array('keyword' =&gt; urlencode($this-&gt;data['Post']['keyword'])));<br />	}<br />	<br />	// Search index<br />	if (empty($keyword)) {<br />		return $this-&gt;render('search_index');<br />	}<br /><br />	// Adding conditions to name and text<br />	$keyword = urldecode($keyword);<br />	$this-&gt;paginate = Set::merge(<br />		$this-&gt;paginate,<br />		array(<br />			'conditions' =&gt; array(<br />				'AND' =&gt; array(<br />					'OR' =&gt; array(<br />						'Post.name LIKE' =&gt; '%'.$keyword.'%',<br />						'Post.text LIKE' =&gt; '%'.$keyword.'%'<br />					)<br />				)<br />			)<br />		)<br />	);<br />	// Getting paginated result<br />	$itemList = $this-&gt;paginate();<br /><br />	$this-&gt;set(array(<br />		'keyword' =&gt; $keyword,<br />		'itemList' =&gt; $itemList<br />	));<br />}<br /></code></pre>
<p> </p>