---
layout: post
title: "A little introduction to image metadata"
custom_v2_id: 28
---

<p>For the project I'm working on, I have to save numerous<a title="IPTC" href="http://en.wikipedia.org/wiki/International_Press_Telecommunications_Council"> </a>data in image files. The <a title="Metadata" href="http://en.wikipedia.org/wiki/Metadata">metadata </a>I have to write can be in different languages and uses different encoding (mainly French, English, Spanish and Chinese).</p>
<h4>A little history</h4>
<p>There is mainly three formats to store data inside an image. The main one is called <a title="Exif" href="http://en.wikipedia.org/wiki/Exif">EXIF</a>, its main goal is to store techical data about the image like the operture, is the flash was fired, the resolution, the iso settings and so on.</p>
<p>The second one is called <a title="iptc" href="http://en.wikipedia.org/wiki/IPTC_Information_Interchange_Model">IPTC</a>. Its main goal was to store more subjective information about the file like its description, its author, copyright informations, etc.</p>
<p>IPTC is an old standard and is more or less replaced with <a title="XMP" href="http://en.wikipedia.org/wiki/Extensible_Metadata_Platform">XMP </a>nowadays becuase of numerous restrictions on it (mainly no UTF8 and internationalisation support). (A later version named IPTC-IIM was created to correct some of the minor restrictions, but it was still far from perfect).</p>
<p>It is now more or less replaced with XMP. XMP is based on XML and uses the Dublin Core tags. It is the future of metadatas because its structure allows it to be extended.</p>
<h4>And now, the problems</h4>
<p>The problem is that with this three formats, it is quite difficult to know where to store or read the information we want. Additionnaly the XMP support is not very mainstrean on the software, even Adobe (creator of the XMP format) does not support it totally accross its products.</p>
<p>A <a title="The metadata working group" href="http://www.metadataworkinggroup.org/">Metadata Working Group</a> had been formed to tell all the good people of Metadata-land what to do when faced with an image filled with metadatas. They wrote a recommendation guide telling us how to handle reconciliation (a same information is stored in more than one format, but with different values) and make our software the most compatible with existing software.</p>
<h4>What about me ?</h4>
<p>That's when I can talk about me again. I'm working on a project where I have to read a full database of images, parse their metadatas, store them in a database, and build an interface to search accross the database based on criterias like keywords, author, etc.</p>
<p>I also have to handle the web side of this and allow for easy creation of thumbnails, large and medium version with metadatas correctly written inside the file.</p>
<p>The admin panel should also allow anyone to modify one file metadata and rewrite it back into the file as well as inside the database.</p>
<p>This is kind of a big project for me, it's been 2.5 months that I'm on it and I had to learn everything from scrath : all the historical stuff, format specs, recommendation as well as Coldfusion -the language the app is built on-</p>
<p>I've learn a lot until now and I still have 15 more days to finish it. The main app is almost finished (I just have to polish on some edge cases) and then I'll have to integrate it in the existing admin panel.</p>
<p> </p>