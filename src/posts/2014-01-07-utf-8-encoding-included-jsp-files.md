---
layout: post
title: "UTF-8 encoding for included .jsp files"
custom_v2_id: 358
tags: utf8, jsp
---

Today I had to split a gigantic `.jsp` file into several smaller files. I used
the `<@include file="./path/to/file.jsp">` syntax in order to do this.

Unfortunatly, all the included files were displayed with garbage instead of
UTF-8 characters.

So I ran the list of usual suspects : 

- `Content-Type:text/html; charset=utf-8` is correctly returned by my server. 
- `<meta charset="utf-8">` is the first element of my `<head>`. 
- No data is being fetched from a database, so it cannot come from there. 
- All my files are correctly encoded in UTF-8.

Also, I added a `<%@ page contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>` as the very first line of my main `index.jsp`. I also
added the following code to `pom.xml` to make `UTF-8` the default encoding :
[...] UTF-8

Any `UTF-8` in the main `index.jsp` was fine, but as soon as it was in an
included page it was displayed as garbaged. At first, I manually added `<%@
page pageEncoding="UTF-8"%>` to every included page and it fixed the issue. But
as I was dealing with dozen of included files, I needed a more generic
solution.

Turns out that I had to edit my `web.xml` file and add the following
configuration :


```xml
<jsp-config>
  <jsp-property-group>
    <url-pattern>*.jsp</url-pattern>
    <page-encoding>UTF-8</page-encoding>
  </jsp-property-group>
</jsp-config>
```

And it worked !
