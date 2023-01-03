---
layout: post
title: "Firebase authentication with Auth0"
tags: firebase, auth0
---

I use Auth0 on my current project to authenticate my users. It prompts my users with a clear modal UI to ask them to authenticate using Google/GitHub/Other third parties. It's an easy way to handle authentication from the front-end without too much hassle.

But my app also uses Firebase as its main database, and I'm querying it from the front-end. I've set my Database rules to `auth != null` meaning that only authenticated users can read or write my data.

The Firebase JavaScript SDK provides widgets to handle authentication with a GUI directly with Firebase, but as I'm already using Auth0 for the rest of the app, I don't want to have to ask my users to authenticate twice.

Auth0 also do not provide any integration with Firebase out of the box. It used to provide one in the past, but it seems to have been deprecated. It means that I have to build my own plumbing between Auth0 and Firebase.

Because I already had to handle Firebase authentication in another part of the app, I was already familiar with the fact that I needed a custom token. All I needed to add was a way for me to request it from the front-end.

What I did was create a Firebase function publicly available on a specific url that will return a custom token. I will then query this url from my front-end to get the token and then authenticate to Firebase using it.

But such a naive implementation will expose my custom token through a public endpoint that anyone could request. I had to secure it a bit more.

What I did was to get the `access_token` obtained from auth0 during authentication and send it to my Firebase function in its payload.

The Firebase function would then call auth0 with the `access_token` to get information about the user associated with this token. If it succeeded (and the user email was matching the one initially sent), I could go forward and return the newly mint token. This token will then be used by the front-end to authenticate to Firebase.

In the end, here is the overview of the complete token dance:

- Authentication to Auth0, saving access_token locally
- Calling the Firebase function with this access_token
  - In turns calls Auth0 again with this access_token to valide it
  - It matches, so it returns a Firebase access token
- Call Firebase to authenticate using the access token I got from the Firebase function
