---
layout: post
title: "Using custom find and paginate methods in cakePHP 1.3"
custom_v2_id: 88
---

<p>For the blog plugin I'm writing I needed a way to fetch only blog posts that were actually published. I didn't want to write the find conditions every time I had to make a request so I tried to define a custom find method.</p>
<p>I remember having read something about that a while ago, in a blog or in a changelog and so I thought it will be quite easy to implement using some cake automagic.</p>
<p>It was not that easy, I had to override two core methods in my <code>AppModel</code>, but here the result :</p>
<h4>Using custom find methods</h4>
<p>I wanted to be able to call my custom method writing <code>$this-&gt;Post-&gt;find('published')</code> so I created a <code>__findPublished()</code> method in my Post model.</p>
<p>It basically returns a <code>find('all')</code> with custom conditions.</p>
<p>I then edited my AppModel file to hook on the default <code>find()</code> method :</p>
<pre><code lang="php">function find($type, $options = array(), $order = null, $recursive = null) {<br />	$methodName = '__find'.ucfirst($type);<br />	// Using default method if not defined<br />	if (!method_exists($this, $methodName)) {<br />		// We force default fields and order keys or we could run into trouble for undefined index<br />		$options = Set::merge(array('fields' =&gt; array(), 'order' =&gt; array()), $options);<br />		return parent::find($type, $options, $order, $recursive);<br />	}<br />	// Using custom method<br />	return $this-&gt;{$methodName}($options, $order, $recursive);<br />}<br /></code></pre>
<p>(Note that there may still be some issues with this method, especially if the $type parameter is not a string. I'm always using the <code>find()</code> method with a string as first argument but maybe you're not, or the core still use the old implementation.)</p>
<p>Anyway, what it does is testing if a <code>__findSomething()</code> method is defined, and if it is it returns its results, otherwise it just delegates to the default <code>find()</code> method.</p>
<h4>Using custom find methods in paginate</h4>
<p>So far, so good. But now how do you tell cake to use this custom find when paginating stuff ? The first part is easy (but required some digging into the core code). It appears that if the zero key of the <code>$paginate</code> var is set to a string, this will be used as the find type.</p>
<p>One easy way to do this is calling <code>array_unshift($this-&gt;paginate, 'published')</code> just before the <code>$this-&gt;paginate('Post')</code> call in the controller.</p>
<pre><code lang="php">// Getting the paginated post list<br />array_unshift($this-&gt;paginate, 'published');<br />$itemList = $this-&gt;paginate($this-&gt;model);<br />$this-&gt;set('itemList', $itemList);<br /></code></pre>
<p>You'll notice that your custom find method is used for the pagination. What you may not notice at first sight is that the total count of results is not correct. Cake still uses the default <code>find('count')</code> without using the custom method.</p>
<p>We will now need to create a <code>__paginateCountPublished()</code> method in our <code>Post </code>model that will return the total count of posts to paginate.</p>
<p>Forcing Cake to do what we want is a little trickier this time. We will need to create a <code>paginateCount()</code> method in our <code>AppModel</code>. If such a method exists for a given model, Cake will use it instead of the default <code>find('count')</code> when paginating results. By creating it in the <code>AppModel </code>we make sure that all the paginate counts use it.</p>
<p>This method takes a third argument called $extra which will contain our custom find name. If set, we will return the custom paginate count. If not set, we revert to the default way of calculating the total count (copy/pasted from the core).</p>
<p>So, here the <code>paginateCount()</code> method to add to your <code>AppModel </code>:</p>
<pre><code lang="php">function paginateCount($conditions = array(), $recursive = null, $extra = array()) {<br />        // If no custom find specified, we return the default count<br />        if (empty($extra['type'])) {<br />            $parameters = compact('conditions');<br />            if ($recursive != $this-&gt;recursive) {<br />                $parameters['recursive'] = $recursive;<br />            }<br />            return $this-&gt;find('count', array_merge($parameters, $extra));<br />        }<br /><br />        // We return the __paginateCountSomething<br />        $methodName = '__paginateCount'.ucfirst($extra['type']);<br />        return $this-&gt;{$methodName}($conditions, $recursive, $extra);<br />    }<br /></code></pre>
<p>And don't forget to create a<code> __paginateCountPublished($conditions = array(), $recursive = null, $extra = array())</code> method in your <code>Post </code>model</p>
<h4>And you're done</h4>
<p>You can now do some <code>$this-&gt;Post-&gt;find('published')</code> magic in your controller. And don't forget the <code>array_unshift()</code> tip to use the custom find in a paginate call, it have to be the first key.</p>