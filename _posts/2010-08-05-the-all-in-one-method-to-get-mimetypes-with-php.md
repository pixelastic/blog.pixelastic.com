---
layout: post
title: "The all-in-one method to get mimetypes with PHP"
custom_v2_id: 213
---

<p>Getting the correct mimetype from a file in PHP is not an easy task. I used to find it through extension sniffing of the file combined with a known list of mimetypes.</p>
<p>Today I needed to find the correct mimetype to do some security checks on file uploaded by users. I couldn't rely on an extension-based approach because the filename could easily be faked by an uploader.</p>
<p>So I needed an other way. In fact, in PHP world there are at least 4 methods I'm aware of to get this information.</p>
<h4>mime_content_type</h4>
<p>The classic PHP function <a title="mime_content_type" href="http://fr2.php.net/manual/en/function.mime-content-type.php" target="_blank">mime_content_type</a> is supposed to return just that. Unfortunatly, it is deprecated. And not supported by Dreamhost, my host.</p>
<h4>The FileInfo functions</h4>
<p>We are now encouraged to use the <a title="Fileinfos functions" href="http://php.net/manual/en/ref.fileinfo.php" target="_blank">Fileinfo functions</a> instead of <code>mime_content_type</code>. Unfortunatly, they seems to be returning <a title="Fileinfo function dubious results" href="http://www.php.net/manual/en/ref.fileinfo.php#79063" target="_blank">strange results</a>. Alternatively, they are not supported by Dreamhost either (but it seems that you can ask them to install it on your server).</p>
<p>It is bundled into EasyPHP for Windows, but you need to enable it by uncommenting the line <code>extension=php_fileinfo.dll</code> in your <code>php.ini</code></p>
<p>And you use it like this :</p>
<pre><code lang="php">$finfo = finfo_open(FILEINFO_MIME);<br />$mimeType = finfo_file($finfo, $filepath);<br />finfo_close($finfo);<br /></code></pre>
<p>Also note that the mimetype may be returned in a <code>text/plain; charset=us-ascii</code> form. You may need to parse the result to get it in the format you need.</p>
<h4>The getimagesize function</h4>
<p>The <a title="getimagesize" href="http://fr2.php.net/manual/en/function.getimagesize.php" target="_blank">getimagesize</a> function can be called on any image file. It will return an array containing image informations like <code>width</code>, <code>height </code>and of course the <code>mimetype</code>.</p>
<p>Unfortunatly, it will cause a <code>E_WARNING</code> if called on a non-image file. You can't even catch that using a <code>try/catch</code>. You can suppress the error using <code>@</code>, tho.</p>
<p>Here's how I use it :</p>
<pre><code lang="php">$imageData = @getimagesize($filepath);<br />if (!empty($imageData['mime'])) {<br />	$mimeType = $imageData['mime'];<br />}<br /></code></pre>
<h4>Calling the system file</h4>
<p>The last method I'm aware of is simply calling the <code>file </code>command on a unix system through <code>exec</code>.</p>
<pre><code lang="php">$mimeType = exec("/usr/bin/file -i -b $filepath");<br /></code></pre>
<p>Merging all that into one do-it-all method</p>
<p>If you're not sure what your system is capable of or if you plan on distributing your code, you'd better test for all alternatives. Here's the code I'm using :</p>
<pre><code lang="php">/**<br /> *    mimetype<br /> *    Returns a file mimetype. Note that it is a true mimetype fetch, using php and OS methods. It will NOT<br /> *    revert to a guessed mimetype based on the file extension if it can't find the type.<br /> *    In that case, it will return false<br /> **/<br /> function mimetype($filepath) {<br />	 // Check only existing files<br />	 if (!file_exists($filepath) || !is_readable($filepath)) return false;<br /><br />	 // Trying finfo<br />	 if (function_exists('finfo_open')) {<br />		 $finfo = finfo_open(FILEINFO_MIME);<br />		 $mimeType = finfo_file($finfo, $filepath);<br />		 finfo_close($finfo);<br />		 // Mimetype can come in text/plain; charset=us-ascii form<br />		 if (strpos($mimeType, ';')) list($mimeType,) = explode(';', $mimeType);<br />		 return $mimeType;<br />	 }<br /><br />	 // Trying mime_content_type<br />	 if (function_exists('mime_content_type')) {<br />		 return mime_content_type($filepath);<br />	 }<br /><br />	 // Trying exec<br />	 if (function_exists('exec')) {<br />		 $mimeType = exec("/usr/bin/file -i -b $filepath");<br />		 if (!empty($mimeType)) return $mimeType;<br />	 }<br /><br />	 // Trying to get mimetype from images<br />	 $imageData = @getimagesize($filepath);<br />	 if (!empty($imageData['mime'])) {<br />		 return $imageData['mime'];<br />	 }<br /><br />	 return false;<br /> }</code></pre>
<p>Hope that helps !</p>