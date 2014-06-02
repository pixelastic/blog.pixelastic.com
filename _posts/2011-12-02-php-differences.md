---
layout: post
title: "PHP AND / OR differences with && / ||"
custom_v2_id: 328
---

Just found this weird little behavior of PHP today :


```php
$a = false;
$b = true;
$c = $a OR $b;
$d = ($a OR $b);
var_dump(compact('a', 'b', 'c', 'd'));
array(4) {
  ["a"]=>    bool(false)
  ["b"]=>    bool(true)
  ["c"]=>    bool(false)
  ["d"]=>    bool(true)
}
```

`$a OR $b` in fact returns `$a`, while `($a OR $b)` returns the result of the
parenthesis. On the other hand, `$a || $b` correctly returns the result of the
expression.

It seems that `AND `and `OR `are weak compared to `&&` and `||`.

Be aware of that, or it might backfire on you. Or just discard all `AND `/ `OR
`in favor of `&&` /` ||`

