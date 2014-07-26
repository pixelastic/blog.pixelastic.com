---
layout: post
title: "@font-face with multiple fonts and CSSTidy"
custom_v2_id: 86
tags: font-face, woff, format, csstidy
---

The `.woff` font extension is the standard-to-go in terms of font embedding on
the web.

You should add them first in the order of fonts you're loading, before the
`.ttf`/`.otf` ones.

```css
@font-face {
  font-family: "Unibody8SmallCaps Regular";
  src: url('fonts/unibody_8-smallcaps-webfont.woff') format('woff'), url('fonts/unibody_8-smallcaps-webfont.ttf') format('truetype');
}
```

The interesting thing to note is that you cannot omit the quotes around the
`format('woff')`/`format('truetype')` part. Otherwise the font won't be
recognized (at least by FF3.6).

CSSTidy seems to have a bug when there are multiple `format() `declarations in
a rule, it removes quotes in each of them except the last one, thus making the
whole rule unparsable by the browser.

So I started, again, to dig into the CSSTidy code and see what I could do
about that.

I updated the `csstidy.php` file at around line 847 and changed the `if`
statement to look like this :


```php
if($this->sub_value != '') {
  $this->sub_value_arr[] = $this->sub_value;
  foreach($this->sub_value_arr as &$sub_value) {
    if (substr($sub_value, 0, 6) == 'format') {
      $sub_value = str_replace(array('format(', ')'), array('format("', '")'), $sub_value);
    }
  }
  $this->sub_value = '';
}
```

This way all sub values of the `src:` rule will be correctly parsed, and not
only the last one.
