---
layout: "post"
title: "The Importance of Pinning Dependencies in Docker"
tags: docker
---



Recently, I found myself working on a Dockerfile for a deployment on Fly.io. While doing so, a thought struck me: future me will thank present me for pinning every dependency version meticulously. You see, throughout my 20+ years in web development, I've come to realize the importance of specifying exact dependency versions. It's something I've learned the hard way. When revisiting projects from a decade ago, I often find that what was once a "latest version" is now a totally different beast. Without pinned versions, I risk breaking the whole system when updating.

```
Docker run -something
```

Take, for instance, using Alpine Linux in Docker. If I just use the latest version, there's a chance that a major update in a single dependency could turn everything upside down. So, I ensure to hardcode the specific versions. Yes, it means more work upfront. But it guarantees that when I rerun the Dockerfile later on, whether in five years or by a new developer, it behaves exactly the same. This saves me the headache of debugging potential issues caused by silent updates.

It's worth mentioning that this strategy does bring a challenge: managing updates later. If I pin everything today, eventually, I will be faced with the necessity to update everything at once. It's tedious but manageable with tools like Renovate, which helps propose updates for dependencies. Assuming you have a suite of tests in place, increments can be tested automatically. This process is invaluable for big projects where staying up-to-date is vital.

For simpler projects or in cases where comprehensive testing isn't feasible, pinning dependencies becomes a crucial safeguard. It might seem trivial now, but it ensures my systems run seamlessly in any environment. It's a resolution that I was reminded of and acted upon, and one that I highly suggest all developers consider. When future me needs to revive a project, I'll be relaxed knowing everything works without surprises.