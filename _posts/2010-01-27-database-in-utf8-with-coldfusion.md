---
layout: post
title: "Database in UTF8 with Coldfusion"
custom_v2_id: 32
---

When setting up a Coldfusion application, do not forget to add to your
datasource the following connection string :

    
```cfm
characterEncoding=UTF8&characterSetResults=UTF8
```

It will ensure that your data is correctly saved and fetched using UTF8. This
is the coldfusion equivalent of the more commonly known `SET NAMES 'utf8';`

