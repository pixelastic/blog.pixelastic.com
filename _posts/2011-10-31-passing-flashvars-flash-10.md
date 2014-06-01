---
layout: post
title: "Passing flashVars with Flash 10 in IE"
custom_v2_id: 323
---

I've spent the last two days debugging a weird issue involving https, IE and
Flash.

In the end, I boiled the issue down to IE and Flash 10, https wasn't involved
(in fact, that was a different issue).

## Markup hell

It is known that to have a real crossbrowser markup to embed Flash we need an
IE specific version and a non-IE one.

What I didn't know was that `flashvars `needed to be passed in two different
formats between Flash player 10 and Flash player 11.

11 expect the classic `flashvars `parameter while 10 expect them to be passed
as simili GET parameters to the movie url.

## Final HTML markup

In the end, here is the PHP code I use to generate my SWF markup :

    
```php
sprintf(  
  '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="%1$s" height="%2$s" id="%3$s">  
    <param name="movie" value="%4$s?%6$s" />  
    %5$s  
    <!--[if !IE]>-->  
      <object type="application/x-shockwave-flash" data="%4$s" width="%1$s" height="%2$s">  
      %5$s  
    <!--<![endif]-->  
    %7$s  
    <!--[if !IE]>--></object><!--<![endif]-->  
  </object>  
',  
$width, $height, $id, $url, $params, $flashVars, $alternateContent);
```

Where :

  * `$width` and `$height` are the size (in pixel) of your movie
  * `$id` is the html/css id of the main object element (as used in `swfObject.getObjectById`)
  * `$url` is the url address of your swf file
  * `$params` is a string containing all the `<param name="name" value="value" />` that you want to pass. Usually it will contain the `wmode`, `allowfullscreen`, `allowscriptaccess `and `flashvars `keys.
  * `$flashVars` is a duplicate of the `flashVars `key of `$params` and should contain a string in the form `foo=bar&baz=nyan` to be passed to the swf in Flash 10
  * `$alternateContent` is the html text to be displayed when Flash is not installed in the browse

I hope that this markup will help you, because I spent a damn long time
testing all that stuff, jungling between VM and IE instances.

