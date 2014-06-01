---
layout: post
title: "cakePHP i18n extract and plugins"
custom_v2_id: 65
---

<p>Cake has a lot of wonderful tools in its console. One of them is the <code>i18n extract</code> task that reads every file of your app, and extract strings that should be translated (used with <code>__()</code>, <code>__d()</code>, etc).</p>
<p>With cake 1.3 RC3 it even stored each domain string in its own <code>.pot</code> file.</p>
<p>But, as far as I know (I've posted on the google group about that, maybe someone will show me where I'm wrong), the console task is limited when dealing with plugins.</p>
<p>Let's say I have a plugin in my app. I'm using <code>__d('plugin_name', 'My plugin string')</code> in my plugin and <code>__('My app string')</code> in the main app.</p>
<p>If I run the <code>cake i18n extract</code> in my plugin directory, it will correctly generate the <code>.pot </code>file in my plugin <code>locale/</code> folder.</p>
<p>But if I run it in the main app, it will scan every plugin file and thus finding any plugin string and save them in the <code>default.pot</code> or in its own <code>plugin_name.pot</code> file (depending on the value of the merge option).</p>
<p>I don't need the <code>plugin_name.pot</code> files in <code>app/locale</code>, I already have them in <code>app/plugins/plugin_name/locale</code>. I know it's no big deal, I just have to delete the useless files created every time I run the <code>cake i18n extract</code> on the main app but it is kind of irritating.</p>
<p>So I updated the <code>cake/console/libs/tasks</code> to add a new option to the task, named '<code>plugins</code>' (value : yes/no. Default to no).</p>
<p>If set to no, the extract task will skip every plugin directory when extracting files. This way, I have no more clutter, it only extract string that are in the app.</p>
<p>All I had to do was updating the <code>execute()</code> method, and replacing the end of the method (from line 152) with this one :</p>
<pre lang="php"><code lang="php">$this-&gt;params['plugins'] = isset($this-&gt;params['plugins']) ? $this-&gt;params['plugins'] : 'no';<br />if (empty($this-&gt;__files)) {<br />	if ($this-&gt;params['plugins']=='yes') {<br />		$this-&gt;__searchFiles();<br />	} else {<br />		$this-&gt;__searchFilesExcludePlugins();<br />	}<br />}</code></pre>
<p>And then add this method to the class :</p>
<pre lang="php"><code lang="php">function __searchFilesExcludePlugins() {<br />	foreach ($this-&gt;__paths as $path) {<br />		$Folder = new Folder($path);<br />		$filelist = $Folder-&gt;tree($path);<br />		foreach($filelist[1] as &amp;$file) {<br />			// We discard plugins<br />			if (strpos(str_replace($path, '', $file), DS.'plugins')===0) continue;<br />			// We keep those that match the pattern<br />			if (!preg_match('/^.*\.(php|ctp|thtml|inc|tpl)$/i', $file)) continue;<br />			$this-&gt;__files[]= $file;<br />		}<br />	}<br />}<br /></code></pre>