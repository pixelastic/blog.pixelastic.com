---
layout: post
title: "Authentication to Firebase Database from a Firebase Function"
tags: firebase
---

On one of the projects I'm working on, I'm using both Firebase functions and Firebase Database. I'm calling functions in reaction to specific events, that will save data in my Firebase Database.

I managed to have something running in development in a week. As I was still developing, I kept the default ACL to `read:true` and `write:true` on the database, meaning that anyone could read and write my data.

When time came to put to production, I followed the security best practices of Firebase and set the rules to `auth != null` meaning that only authenticated users could read or write data. I thought that "authenticated users" would mean anyone with the API key.

Turns out it's not what it means. Identification (through an API key) and Authentication (through a login/password) are two different things. And Firebase is expecting me to authenticate before being able to access my data, even if I'm calling the db from a Firebase function.

Most Firebase documentation will explain how to authenticate with a front-end application. The SDKs even provides GUI elements to make the integration smoother. It has widgets to incorporate authentication with third parties such as Twitter, GitHub or Google.

## Authentication using a custom token

That's useful; except when you're running your app from the backend and can't use those GUI elements. To authenticate from the backend, I had to use another method: authenticating through a custom token.

Basically what it means is that I'll give to the Firebase authentication method a token that could only have been crafted by someone with admin access. I needed to create my own token to then use it to authenticate.

What was a bit strange to grasp at first was that I needed to instanciate both a `firebaseAdmin` (to create the token) and a regular `firebase` instance to actually authenticate using this token.

## Getting the custom token

The first step is to have an instance of `firebaseAdmin` running. I found all the information in the official [Firebase documentation](https://firebase.google.com/docs/admin/setup). It needed to be initialized with the `credential` option set the a valid certificate generated from my `serviceAccountKey.json` key. This part is crucial as it will allow my `firebaseAdmin` to mint (create) new tokens.

```javascript
import * as firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountConfig),
  databaseURL: 'your_url'
});
let customToken = firebaseAdmin.auth().createCustomToken('backend');
```

The `'backend'` value can actually be any string, but will identify the user of this token (you can see it in your Firebase dashboard).

## Authenticating using the custom token

Now that I had the token, I had to actually authenticate using it. To do so, I initialized my `firebase` with `initializeApp` as usual, then sign in with the custom token:

```javascript
import firebase from 'firebase';
firebase.initializeApp({...your_config});
firebase.auth().signInWithCustomToken(customToken);
```

Now my `firebase` instance can read and write data from my Firebase database.

## Conclusion

Hope that helps. I got confused at first between identification and authentification and it also took me a while to understand that I needed to mint the custom token with the admin and the authenticate using it.
