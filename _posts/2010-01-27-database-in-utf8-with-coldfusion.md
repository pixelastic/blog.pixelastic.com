---
layout: post
title: "Database in UTF8 with Coldfusion"
custom_v2_id: 32
---

<p>When setting up a Coldfusion application, do not forget to add to your datasource the following connection string :</p>
<pre lang="html"><code lang="ini">characterEncoding=UTF8&amp;characterSetResults=UTF8</code></pre>
<p>It will ensure that your data is correctly saved and fetched using UTF8. This is the coldfusion equivalent of the more commonly known <code>SET NAMES 'utf8';</code></p>