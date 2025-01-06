---
layout: "post"
title: "Make webhook status visual feedback in Airtable"
tags: automation, airtable, make
---

I've been working on my Airtable and Make automations, and I wanted to share a small trick I've implemented to improve error handling and visibility. 

I use Airtable interfaces equipped with various buttons that, when clicked, trigger webhooks in Make, that in turn update my Airtable record with additional data. However, I found it quite frustrating that there was no visual feedback indicating the status of the webhook. Was it still running? Did it succeed? Did it fail? I had to open my Make dashboard each time, which was far from ideal.

![](/img/files/2025-01-06-make-webhook-status-visual-feedback-airtable/01-481bf18ab0.png)

So I added a simple status feature. I added a new field called `automationStatus` to my table. It's a select with three states: `OK` (default), `In Progress`, or `Error`. By default, it's set to OK. 

Now, when the webhook starts, instead of fetching the relevant Airtable record, it **updates** it instead by changing its `automationStatus` to `In Progress`. The Make module to update an Airtable record also returns the whole record, so I don't need to actually fetch it. I display the status next to the button, so now I can get visual feedback.

![](/img/files/2025-01-06-make-webhook-status-visual-feedback-airtable/02-87fcdcc3de.png)

At the end of a successful scenario, when I update the record with new data, I also set the `automationStatus` back to `OK`. And if any module fails along the way I add an Error Handler to set the `automationStatus` to `Error`.

For some very nasty scenarios, I even went further and added the `automationScenarioUrl` and `automationErrorDetails`, so I could have more visibility on what was really happening, and quickly click on the link to get to the Make Scenario page.

This approach of course has limitations (there is no history, and all automations of a given record share the same field), but it is already way better than what I used to have (ie. nothing) before.