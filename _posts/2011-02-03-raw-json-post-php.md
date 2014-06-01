---
layout: post
title: "Getting raw JSON POST in PHP"
custom_v2_id: 263
---

<p>Sometimes you need to post raw <code>POST </code>data without following the key/value convention, like when you need to post to some webservices.</p>
<p>Accessing it from PHP can be a little obsure at first, but all that is needed is to read the input buffer by doing : <code>file_get_contents("php://input")</code></p>
<p>This can be useful when posting raw JSON without adding the overhead of all the keys.</p>