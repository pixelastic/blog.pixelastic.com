---
layout: "post"
title: "Keeping the context of an Airtable Record Picker from page to page"
tags: airtable, automation, make
---

![](/img/files/2025-03-04-airtable-record-picker-context/header.png)

I'm using Airtable Interfaces a lot, to pilot my automations. For a project at work I built a whole pipeline to help us organize meetups in our office. It starts with the URL of a meetup.com event, and ends with the printing of the signs to put in the building, and goes through all the phases of calculating the number of pizzas needed, booking rooms in the corporate calendar, printing badges for attendees and pre-generating internal Slack messages, etc.

![](/img/files/2025-03-04-airtable-record-picker-context/01-a23907ad11.png)

But the process is made of multiple steps, that having all the info on one page was getting overwhelming and very practical, so I started splitting it into several pages. One page would handle the attendee list, another would take care of the calendar, another of the Slack messages, etc.

![](/img/files/2025-03-04-airtable-record-picker-context/02-2897e70403.png)

The issue I ran into though, was that whenever I would switch pages, I would lose the context of which meetup I'm currently editing. For example I would start on the "Metadata" page for the upcoming **React Meetup**; I would then click on the "Calendar Events" page and would somehow now be editing the upcoming **Algolia Search Party.**

This is because, from Airtable Interfaces point of view, each page is an independent context, and there is no default way to keep the currently selected Event from one page to the next.

### My hackish workaround

![](/img/files/2025-03-04-airtable-record-picker-context/03-6b43f05c8b.png)

![](/img/files/2025-03-04-airtable-record-picker-context/04-69868b2304.png)

The (very hackish and imperfect) way I found around this is to add a `isPinnedInUI` checkbox field to my table. Only one element of the table should be marked as pinned at any given time. I also configured the record picker to select the fields where `isPinnedInUi` is `true` in priority.

I also added a custom Make scenario (trigger when clicking on the **Pin** blue button next to the record picker) that would uncheck the previously checked element, and check the currently selected one.

That way, when I'm working on an event I can _pin it_ in place, and keep its context even when navigating from page to page.

Of course, this is just a bandaid, and fails as soon as more than one person is working on the dashboard at the same time. If I start pinning a meetup and my coworker Lucas is working on another one and pin the other, we'll just step on each other's toes. But so far, it has been an improvement over completely losing the context.