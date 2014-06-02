---
layout: post
title: "Displaying a date in the correct locale with cakePHP"
custom_v2_id: 190
---

The easiest way to display a date in a given format is to use a combination of
`strftime()` and `strtotime()`.

Sometimes, you also need your date to be displayed in a specific language. For
example, for a french website, I needed a date to be displayed as "_mardi 03
août 2010_" instead of "_Wednesday, August 3rd_".

## Setting the locale

To achieve that, you just have to tell PHP which locale to use when displaying
date with `setlocale(LC_TIME, $locale)`.

The value of `$locale` is OS dependent, though. For example, on a linux
server, you have to set `fr_FR` while it is `fr` or even `french `on Windows.

Fortunatly, you can pass an array of locales to `setlocale`(, and the system
will use the first one it can find. You just have to pass an array containing
all possible values and you'll be good to go.

I wrote a little method that use the `L10n `object that comes with cakePHP to
automate the creation of such an array. Just feed him a 3-letter language code
and it will return an array of the most common locale names.


```php
function getLocales($lang) {
// Loading the L10n object
App::import('L10n');
$l10n = new L10n();

// Iso2 lang code
$iso2 = $l10n->map($lang);
$catalog = $l10n->catalog($lang);

$locales = array(
  $iso2.'_'.strtoupper($iso2).'.'.strtoupper(str_replace('-', '', $catalog['charset'])),    // fr_FR.UTF8
  $iso2.'_'.strtoupper($iso2),    // fr_FR
  $catalog['locale'],             // fre
  $catalog['localeFallback'],     // fre
  $iso2                           // fr
  );
return $locales;
}
```


You may note that I set in first position a locale with the mention of the
encoding. This is only used on Linux machines, Windows does not handle that.
That's a pity, but I'll show you how to correctly make it work underWwindows.

As a side note, `setlocale` will not `return false` if the locale is not
found, it will just fail to load it.

## Displaying date in UTF8

If your app is in UTF8 (and it should be !) you may run into problem when
trying to display a simple `strftime("%B", strtotime($date))` on Windows.

`%B` translate to the current month name. For a month like _Août_ (_August_)
the funny _û_ will not get correctly displayed, because Windows does its
locale translation in its native encoding.

You'll need to manually encode it in utf8, but if you do so on a linux
machine, as the result is already encoded in utf8 you may end in double
encoding the same string, resulting in others display errors.

Note also that if your format string itself contains utf8 encoded characters
(like` %A %d %B %Y à %Hh%M`), encoding it in utf8 again will also result in
wrong characters displayed.

What I've done is creating a simple method in an helper that will take care of
encoding the result if needed.


```php
function time($format, $date = null) {
  // On Windows, we will force the utf8 encoding of the date
  if (DIRECTORY_SEPARATOR == '\\') {
    return utf8_encode(strftime(utf8_decode($format), strtotime($date)));
  }
  // On linux, this is already taken care of by setlocale()
  return strftime($format, strtotime($date));
}

```

This way, we make sure that the date is correctly displayed in utf8, no matter
the OS, even if you already supply utf8 characters in the format string.

