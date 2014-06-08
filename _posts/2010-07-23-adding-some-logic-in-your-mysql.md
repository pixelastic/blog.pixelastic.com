---
layout: post
title: "Adding some logic in your MySQL"
custom_v2_id: 200
tags: mysql, having, group-by, distinct, timestampdiff, concat
---

I'm not an expert in SQL queries, I just know how to do simple queries and the
more advanced options I've ever used are `DISTINCT`, `HAVING `and `GROUP BY`.

For the project I'm working on, I had to add some logic to my SQL queries, to
concatenate various field and compare them.

Here is, as a reminder, how I've managed to I've managed to get the time spent
by comparing two dates :


```sql
TIMESTAMPDIFF(SECOND, Timestamp.date, EndTimestamp.date) AS timeSpent
```

And is practice is never as easy as theory, I didn't really had a timestamp
but two string fields instead (one `date `and one `time`), so here's how I
combined them


```sql
TIMESTAMPDIFF(SECOND, CONCAT(Timestamp.date, " ", Timestamp.time), CONCAT(Timestamp.date, " ", Timestamp.time)) AS timeSpent
```
