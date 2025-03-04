---
layout: "post"
title: "Changing Google Docs File Settings"
tags: 
---

![](/img/files/2025-03-05-google-docs-file-settings/header.png)

I've been working with the Google Docs API lately, and I wanted to share a bit about how to modify file settings. In a previous blog post, I covered changing text parameters. Now, I want to focus on altering the document file settings more directly. Specifically, I'll discuss changing the margins around a document and its default size.

![](/img/files/2025-03-05-google-docs-file-settings/01-3d59e79813.png)

The challenge here is that these measurements have to be in points, not centimeters. I use the metric system, so adapting to units like "US Letter" doesn't make intuitive sense to me. In Europe, we generally use A4 as the standard document size, which measures 21 cm by 29.7 cm. For this blog post, I aim to set margins to an arbitrary 0.5 centimeters on each side. But first, I must convert these into points, which, to be honest, isn't straightforward for me.

Having calculated these conversions already, I plan to document the exact values needed for an A4 with 50 mm margins. I realize this might not be an everyday task for everyone, but it could be helpful for those adjusting Google Docs to fit specific formats. Also, I'll include some screenshots from my Make scenarios that show these modifications in action.

I hope this quick guide helps anyone dealing with the sometimes confusing world of document settings in Google Docs. Having these settings tailored to the correct format can save a lot of time and ensure more consistent document output. Let's dive into the technical details!