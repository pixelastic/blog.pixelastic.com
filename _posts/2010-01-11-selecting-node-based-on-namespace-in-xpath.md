---
layout: post
title: "Selecting node based on namespace in xPath"
custom_v2_id: 27
---

<p>I'm used to XPath, I use it in my Javascript dev (jQuery) has well as in my cakePHP dev (the Set::extract() method), and I've always thought it was really fast, powerful and readable.</p>
<p>Today I had to parse a real-world XML file, and I discovered that when dealing with namespaces, all became suddenly much more difficult in the XPath world.</p>
<p>Here is my xml source (shortened for the sake of clarity) :</p>
<pre lang="html">&lt;?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?&gt;<br /> &lt;x:xmpmeta xmlns:x="adobe:ns:meta/"&gt;<br /> &lt;rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"&gt;<br /> <br /> &lt;rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/"&gt;<br /> &lt;dc:creator&gt;Igor Gosstroff&lt;/dc:creator&gt;<br /> &lt;dc:description xml:lang="x-default"&gt;Awesome picture&lt;/dc:description&gt;<br /> &lt;/rdf:Description&gt;<br /> <br /> &lt;rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/"&gt;<br /> &lt;xmp:Rating&gt;4&lt;/xmp:Rating&gt;<br /> &lt;/rdf:Description&gt;<br /> <br /> &lt;/rdf:RDF&gt;<br /> &lt;/x:xmpmeta&gt;                                             <br />&lt;?xpacket end="w"?&gt;</pre>
<p> </p>
<p>I wanted to select the first &lt;rdf:Description&gt; (Dublin Core).</p>
<p>First of all, you have to know that you can't do //rdf:description, you have to use a special syntax because the : is a reserved character. The solution is using the name() method : //*[name()='rdf:Description'].</p>
<p>It will return both rdf:Description nodes. I can easily get the one i'm interested in by doing //*[name()='rdf:Description'][1] but I would have liked to use a much more simple syntax and select the one with an xmlns:dc attribute.</p>
<p>And I did not find out how to do that. All the syntaxes I tried either returned nothing, threw and exception and even crash my app once.</p>
<p>I finally found a devious way to find it. I search for any xmlField whose namespace uri was http://purl.org/dc/elements/1.1/ and then get its parent. I still feel like its a dirty hack but I've allready spent too much time on it, so it will be enough for now.</p>
<pre lang="html">//*[namespace-uri()='http://purl.org/dc/elements/1.1/'][1]/../</pre>
<p> </p>