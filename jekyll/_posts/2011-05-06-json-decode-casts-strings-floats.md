---
layout: post
title: "json_decode casts strings to floats"
custom_v2_id: 276
tags: json, float, json-decode, string, php
---

The PHP function [json_decode](http://fr.php.net/manual/en/function.json-
decode.php) takes a JSON string as argument and return a decoded array/object
.

However, when passing an argument that has nothing to do with a JSON string,
the function was supposed to return null. But, in practice, this didn't go so
well.

## Passing a string

Here's an example :


```php
$foo = 'foo';
$bar = json_decode($foo);
// $bar is nothing,
echo (is_null($bar)) ? "This is null" : "This is not null";
```
## Passing a float

Here, we try to decode a string. The function rejects it and returns null.


```php
$foo = 0.4;
$bar = json_decode($foo);
// $bar is a float
echo (is_float($bar)) ? "This is a float" : "This is not a float";
```
Here, we pass a floating number. And the function returns... a floating
number. Wait, what ?

This is weird, I expected it to return null, once again. But maybe it's
correct and the JSON specs says so. I didn't check, actually.

## Passing a string thats looks like a float

But the next example is even better :


```php
$foo = '0.4';
$bar = json_decode($foo);
// $bar is also a float, even if $foo was a string
echo (is_float($bar)) ? "This is a float" : "This is not a float";
```
This time I pass a string as a parameter (like example 1) but got a float as a
result (like example 2).

Well, this time I'm sure that can't be the correct behavior.

## How to deal with it

I finally wrote a little wrapper for json_decode to handle those strange cases
:


```php
function my_json_decode($var) {
  $decodedValue = json_decode($var, true);
  return is_array($decodedValue) ? $decodedValue : $var;
}
```
This will check that the result of the JSON decoding is an array, and if not
(meaning the original string was not a JSON string), it will return the
original string.
