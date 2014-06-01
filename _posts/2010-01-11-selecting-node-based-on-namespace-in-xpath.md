---
layout: post
title: "Selecting node based on namespace in xPath"
custom_v2_id: 27
---

I'm used to XPath, I use it in my Javascript dev (jQuery) has well as in my
cakePHP dev (the Set::extract() method), and I've always thought it was really
fast, powerful and readable.

Today I had to parse a real-world XML file, and I discovered that when dealing
with namespaces, all became suddenly much more difficult in the XPath world.

Here is my xml source (shortened for the sake of clarity) :

    
    <?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>  
     <x:xmpmeta xmlns:x="adobe:ns:meta/">  
     <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">  
       
     <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">  
     <dc:creator>Igor Gosstroff</dc:creator>  
     <dc:description xml:lang="x-default">Awesome picture</dc:description>  
     </rdf:Description>  
       
     <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">  
     <xmp:Rating>4</xmp:Rating>  
     </rdf:Description>  
       
     </rdf:RDF>  
     </x:xmpmeta>                                               
    <?xpacket end="w"?>


I wanted to select the first <rdf:Description> (Dublin Core).

First of all, you have to know that you can't do //rdf:description, you have
to use a special syntax because the : is a reserved character. The solution is
using the name() method : //*[name()='rdf:Description'].

It will return both rdf:Description nodes. I can easily get the one i'm
interested in by doing //*[name()='rdf:Description'][1] but I would have liked
to use a much more simple syntax and select the one with an xmlns:dc
attribute.

And I did not find out how to do that. All the syntaxes I tried either
returned nothing, threw and exception and even crash my app once.

I finally found a devious way to find it. I search for any xmlField whose
namespace uri was http://purl.org/dc/elements/1.1/ and then get its parent. I
still feel like its a dirty hack but I've allready spent too much time on it,
so it will be enough for now.

    
    //*[namespace-uri()='http://purl.org/dc/elements/1.1/'][1]/../


