---
layout: post
title: "The all-in-one method to get mimetypes with PHP"
custom_v2_id: 213
---

Getting the correct mimetype from a file in PHP is not an easy task. I used to
find it through extension sniffing of the file combined with a known list of
mimetypes.

Today I needed to find the correct mimetype to do some security checks on file
uploaded by users. I couldn't rely on an extension-based approach because the
filename could easily be faked by an uploader.

So I needed an other way. In fact, in PHP world there are at least 4 methods
I'm aware of to get this information.

## mime_content_type

The classic PHP function
[mime_content_type](http://fr2.php.net/manual/en/function.mime-content-
type.php) is supposed to return just that. Unfortunatly, it is deprecated. And
not supported by Dreamhost, my host.

## The FileInfo functions

We are now encouraged to use the [Fileinfo
functions](http://php.net/manual/en/ref.fileinfo.php) instead of
`mime_content_type`. Unfortunatly, they seems to be returning [strange
results](http://www.php.net/manual/en/ref.fileinfo.php#79063). Alternatively,
they are not supported by Dreamhost either (but it seems that you can ask them
to install it on your server).

It is bundled into EasyPHP for Windows, but you need to enable it by
uncommenting the line `extension=php_fileinfo.dll` in your `php.ini`

And you use it like this :


```php
$finfo = finfo_open(FILEINFO_MIME);
$mimeType = finfo_file($finfo, $filepath);
finfo_close($finfo);
```


Also note that the mimetype may be returned in a `text/plain; charset=us-
ascii` form. You may need to parse the result to get it in the format you
need.

## The getimagesize function

The [getimagesize](http://fr2.php.net/manual/en/function.getimagesize.php)
function can be called on any image file. It will return an array containing
image informations like `width`, `height `and of course the `mimetype`.

Unfortunatly, it will cause a `E_WARNING` if called on a non-image file. You
can't even catch that using a `try/catch`. You can suppress the error using
`@`, tho.

Here's how I use it :


```php
$imageData = @getimagesize($filepath);
if (!empty($imageData['mime'])) {
  $mimeType = $imageData['mime'];
}
```


## Calling the system file

The last method I'm aware of is simply calling the `file `command on a unix
system through `exec`.


```php
$mimeType = exec("/usr/bin/file -i -b $filepath");
```


Merging all that into one do-it-all method

If you're not sure what your system is capable of or if you plan on
distributing your code, you'd better test for all alternatives. Here's the
code I'm using :


```php
/**
*    mimetype
*    Returns a file mimetype. Note that it is a true mimetype fetch, using php and OS methods. It will NOT
*    revert to a guessed mimetype based on the file extension if it can't find the type.
*    In that case, it will return false
**/
function mimetype($filepath) {
 // Check only existing files
 if (!file_exists($filepath) || !is_readable($filepath)) return false;

 // Trying finfo
 if (function_exists('finfo_open')) {
   $finfo = finfo_open(FILEINFO_MIME);
   $mimeType = finfo_file($finfo, $filepath);
   finfo_close($finfo);
   // Mimetype can come in text/plain; charset=us-ascii form
   if (strpos($mimeType, ';')) list($mimeType,) = explode(';', $mimeType);
   return $mimeType;
 }

 // Trying mime_content_type
 if (function_exists('mime_content_type')) {
   return mime_content_type($filepath);
 }

 // Trying exec
 if (function_exists('exec')) {
   $mimeType = exec("/usr/bin/file -i -b $filepath");
   if (!empty($mimeType)) return $mimeType;
 }

 // Trying to get mimetype from images
 $imageData = @getimagesize($filepath);
 if (!empty($imageData['mime'])) {
   return $imageData['mime'];
 }

 return false;
}
```

Hope that helps !

