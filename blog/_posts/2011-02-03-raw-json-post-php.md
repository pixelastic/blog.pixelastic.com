---
layout: post
title: "Getting raw JSON POST in PHP"
custom_v2_id: 263
tags: php, post, json
---

Sometimes you need to post raw `POST `data without following the key/value
convention, like when you need to post to some webservices.

Accessing it from PHP can be a little obsure at first, but all that is needed
is to read the input buffer by doing : `file_get_contents("php://input")`

This can be useful when posting raw JSON without adding the overhead of all
the keys.