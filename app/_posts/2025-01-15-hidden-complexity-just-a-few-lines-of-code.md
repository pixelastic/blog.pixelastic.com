---
layout: "post"
title: The hidden complexity of "just a few lines of code"
tags: cloudflare, API
---

![](/img/files/2025-01-15-hidden-complexity-just-a-few-lines-of-code/header.png)

We're often hosting meetups in the Algolia Paris office. To make our lives easier, I decided to build an API that would allow us to fetch metadata about the event easily (like description, date, list of attendees, etc). I decided to host that on Cloudflare Workers.

The premise was simple. Pass the `url` of the event to the API, and metadata about the event returned in a nicely formatted `JSON`. My function would crawl the URL, parse it with `cheerio`, extract relevant information and return it. Easy.

### It's just gonna be a few lines of code

I could grab the description easily, write a bit more complex selectors and get the date. Great.

Then I realized that the `meetup.com` markup had some specific `JSON` blocks, called [JSON-LD](https://json-ld.org/), that had most of the data I needed. Ok, so let's understand the schema, and extract what I need from that. Some keys are easier to access from this JSON (like the `startDate` and `endDate`) while others are still better in the HTML (`description` is truncated in the JSON for example). No problem, let's build an hybrid approach.

```
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "HumanTalks Paris Novembre 2024",
  "url": "https://www.meetup.com/humantalks-paris/events/304412456/",
  "description": "Hello everyone!\nThis month we wanted to thank **Algolia** for hosting us.",
  "startDate": "2024-11-12T18:45:00+01:00",
  "endDate": "2024-11-12T21:30:00+01:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "image": [
        "https://secure-content.meetupstatic.com/images/classic-events/524553157/676x676.jpg",
        "https://secure-content.meetupstatic.com/images/classic-events/524553157/676x507.jpg",
        "https://secure-content.meetupstatic.com/images/classic-events/524553157/676x380.jpg"
  ],
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
        "@type": "Place",
        "name": "Algolia",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressRegion": "",
          "addressCountry": "fr",
          "streetAddress": "5 rue de Bucarest, Paris"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.880684,
          "longitude": 2.326596
        }
  },
  "organizer": {
        "@type": "Organization",
        "name": "HumanTalks Paris",
        "url": "https://www.meetup.com/humantalks-paris/"
  }
}
```

Ok, now for the list of attendees. Oh, it's not in the markup, it's actually fetched from the front-end dynamically and added to the page. It seems to be doing a GraphQL query and getting the list of all attendees. All I have to do is replicate that query from my Cloudflare Worker. Thankfully, both the `URL` and the required query ID are available in the initial page. I just need to handle pagination of the results (as they are only returned by chunks of 50).

![](/img/files/2025-01-15-hidden-complexity-just-a-few-lines-of-code/01-79418f28d6.png)

### Testing

At that point, my code was obviously a bit more than just a few lines of code. I had to extract data from three different sources: HTML source, JSON LD and a GraphQL API.

That's when I started to add some unit tests. The number of edge cases was starting to increase, and I wanted to be sure that when I fixed one, I didn't end up breaking another.

### Error Handling

As I spent a few days working on that, I also realized that meetups that have passed are no longer accessible (unless you're logged in). That means I also needed to add some error handling for those cases. Also, some meetups can disable the fetching of the attendee list, even if the meetup itself is public. I also needed to handle that case gracefully.

### More sources

The project worked well, and really helped us internally plan for meetups. But then we had to host a meetup hosted on Eventbrite. And one on Luma. So I had to go back to my code again and see how to make my code work with those other platforms.

I had to re-organize my code, to have some shared helpers (like for parsing HTML with `cheerio` or for extracting JSON LD), but still keep per-source unit test and logic. 

I also had to handle some source-specific issues. For example Eventbrite has no visible attendee list, and the HTML returned by Luma is different based on the `User-Agent` passed. Many things are the same, but many others are different. That's when having unit tests really started to shine. I could be sure that I could fix something for Eventbrite, without breaking Luma. This would have been a nightmare to test manually.

![](/img/files/2025-01-15-hidden-complexity-just-a-few-lines-of-code/02-844fa93d4a.png)

### What I learned

An important lesson I learned was to make endpoints that were as generic as possible. Initially I had an endpoint for getting the description, another for getting the dates, etc. But I realized it was much easier (from a code POV, as well as a user POV), to have one endpoint that returned everything.

I still kept the list of attendees behind a flag (so, `off` by default, but if you need them you turn it on on the request), as it was the slowest part of the request and also the most prone to fail (on Eventbrite, or on past Meetup pages for example).

This "Oh, it's just going to be a simple proxy to grab 2 or 3 pieces of data" turned into a much more complex beast, but I like it. From the outside, I managed to keep it simple (just one API endpoint), and from the inside I have enough tests and shared code that it's relatively easy to make it evolve.
