---
layout: post
title: "Fake user profiles"
tags:
---

For a demo website I just built I needed a set of fake user profiles. I needed
something with names, address and a profile picture. I didn't want to use any
data from real existing people, but still needed something the looked _real
enough_.

So I got a sample of fake profiles from [randomuser.me][1], making sure that no
two profiles had the same picture. I also added in the mix a few pictures from
my coworkers at [Algolia][2] as an easter egg.

Everything is pushed to [GitHub][3], along
with the scripts used to generate the data. Everytime you launch the script, it
will generate a new list of random profiles.

Here is a sample of what a fake user looks like:

```json
{
  "email": "liam.walters@example.com",
  "gender": "male",
  "phone_number": "0438-376-652",
  "birthdate": 826530877,
  "location": {
    "street": "9156 dogwood ave",
    "city": "devonport",
    "state": "australian capital territory",
    "postcode": 7374
  },
  "username": "biglion964",
  "password": "training",
  "first_name": "liam",
  "last_name": "walters",
  "title": "mr",
  "picture": "men/50.jpg"
}
```

And the [full dataset][4] can be downloaded from GitHub as well, and all
pictures referenced in the list are also available in the repo.

[1]: https://randomuser.me
[2]: https://www.algolia.com
[3]: https://github.com/pixelastic/fakeusers
[4]: https://github.com/pixelastic/fakeusers/blob/master/data/final.json
