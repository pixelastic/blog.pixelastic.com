---
layout: post
title: "Forcing joins in a cakePHP find"
custom_v2_id: 199
---

Today I had to setup a complex find relation. Here is the simplifed version of
what I had :


```sql
TABLE timestamps
int id
datetime date
string type
int user_id

```

The type field only had two types of values : `START `and `END`. As you can
guess, this was used to log the time users where using an application. Every
time a user started using the app, a `START` record was created, and when he
loggued out, an `END `record was created. So basically, the records where
working as pairs.

I wanted to get a list of all records that could be easily displayed. I wanted
to bind the timestamp model to itself, so that when querying all the start
records, I'll automatically have the end ones as related models.

Here's how I did that :


```php
$this->find('all', array(
  'conditions' => array(
    'Timestamp.type' => 'START'
  ),
  'joins' => array(
    array(
      'table' => 'timestamp',
      'alias' => 'EndTimestamp',
      'type' => 'LEFT',
      'conditions' => array(
        'EndTimestamp.type' => 'END',
        'EndTimestamp.user_id = Timestamp.user_id',
        'EndTimestamp.date > Timestamp.date',
      )
    )
  ),
  'order' => array(
    'Timestamp.date' => 'ASC'
  ),
  'group' => 'Timestamp.date'
));
```

It will fetch all the start timestamp (`fields`) in chronological order
(`order`). We will also define a custom join relation (`joins`). We set the
table name and the alias we need, and set it as a `JOIN LEFT`.

Then we add the conditions : we want only the `END `records, that belongs to
the same user, and that occurs after the `START `records. We also add a `group
`key to make sure not to get twice the same result (or it will corrupt our
results)

Note that the joins syntax needs to be wrapped in an unkeyed array. This is
because you may need to add several joins.

I had never heard of this joins key before today, but it is quite handy, I
guess I'll use it again.

