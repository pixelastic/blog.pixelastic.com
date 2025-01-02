---
layout: "post"
title: "Best Practices for Airtable IDs"
tags: automation
---

When working with Airtable, I've started to develop some good practices regarding IDs in my tables.

![](./01-40e7820dce.png)

Airtable has a concept of a **Primary Field**, which is the "main" field of a given entry, displayed as the first column in Grid view. It can be any field of the table (even a formula aggregating several fields), and will be used in the UI to represent the row.

But Airtable also has an internal notion of a `RECORD_ID()` (a string like `recR5nCNhl3SHbC1z`). It's an internal ID, and if you're only using the Airtable UI, you'll never see them.

But the moment you start using the API, it's everywhere, as it's the canonical way to identify a record.

I developed the habit of making the `RECORD_ID()` visible in all my tables. The first thing I do when I create a new table, is to add a field called `UUID`, set it as a formula, with a value of `RECORD_ID()`. That way, I have an easier mental mapping between what I can see in the UI and what I interact with in the API.

![](./02-b0a59845e4.png)

I also tend to name my **Primary Field** `code`, and make it a concatenation of unique (but short) identifiers of my record. That way, I can easily identify them, sort them, etc. I never use that field anywhere but in the UI.

![](./03-6fa6de0104.png)

Coming from a dev background, not understanding the difference between the visible **Primary Field** and the hidden `RECORD_ID()` has been one of the first things that tripped me up when I started plugging Airtable with Make. Having the `UUID` clearly exposed in the UI and the record makes everything way simpler.