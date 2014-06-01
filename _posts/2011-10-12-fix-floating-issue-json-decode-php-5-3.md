---
layout: post
title: "Fix the floating issue with json_decode in PHP 5.3"
custom_v2_id: 321
---

When dealing with online API that are handling a lot of items (like Twitter or
Facebook), you'd better be aware of a PHP limitation with `json_decode`.

`json_decode` is supposed to take a JSON string and return a PHP array or a
PHP object from it.

Unfortunatly if one of the key is an int and is bigger than the max int value,
it will be cast as float instead. And you'll lose precision in the process.

In my case it resulted in a complete unability to find a user in the database
as the id didn't match anything. This was quite hard to find as I couldn't
reproduce it on my local machine.

#### Know your system

My local system was a 64bits machine while the production servers were 32bits.
And of course, max int precision is far bigger on 64bits machines so the error
didn't pop in my tests.

If you're running PHP 5.4, the fix is easy. Just add the
`JSON_BIGINT_AS_STRING` bitmask as 4th option like this

    
    $decoded = json_decode($encoded, true, null, JSON_BIGINT_AS_STRING);

If you're running a 32bits machine with PHP 5.3 like me, it's a little more
tricky.

#### The regexp

My solution is to parse the original JSON string and add quotes around ints so
`json_decode` will keep them as string.

My first attempt was naive

    
    preg_replace('/":([0-9]+),/', '":$1,', $encoded)

This will find any int between `":` (marking the end of a key) and `,`
(marking the start of the next key), and replace it with the same string but
enclosed in quotes.

I soon found out that this did not cover all the cases, especially if the int
key was the last of the JSON, it won't be followed by a `,` but by a `}`
instead.

So, I adapted it a little bit :

    
    preg_replace('/":([0-9]+)(,|})/', '":"$1"$2', $encoded)

Ok, it worked better. Any int key in the JSON, anywhere will be enclosed in
quotes.

It was a little overkill so I decided to limit it to keys of at least 10
digits

    
    preg_replace('/":([0-9]{10,})(,|})/', '":"$1"$2', $encoded)

Better. But still not perfect.

As I soon discovered, sometimes Facebook returned JSON containing JSON itself
(in Request `data `or Credit `order_info` for example).

The previous approach would add quotes around ints in JSON escaped string and
would thus corrupt the whole key.

This time, I added a final touch. I only added quotes around int that were not
in an escaped JSON string themselves, by checking that the closing quote of
the key wasn't escaped.

    
    preg_replace('/([^\\\])":([0-9]{10,})(,|})/', '$1":"$2"$3', $encoded)

Here it is, the final fix. I might have forgotten some corner cases, but at
least it works for my current application.

Hope it helps !

  

