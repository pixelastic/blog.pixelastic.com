---
layout: post
title: "Testing $q promises with Angular"
tags: angular, $q, promises, test
---

I've been working on a few Angular projects lately, and had to test some `$q`
promises. And there was one little thing in how Angular implementation of `$q`
and the `$digest` cycle interact that bit me once or twice.

If you ever fire a promise using `$q` in one of your tests, know that Angular
will not resolve it until you tell it to. It means that your promise will stay
in an undefined state (neither resolved nor rejected) and your test will surely
fail. This is because Angular promises are tied to the `$scope` lifecycle and
as we do not have one when running our tests, we have to add a bit of plumbing.

To force Angular to finish every promise, just add the following `afterEach`
implementation :

```javascript
afterEach(inject(function ($injector) {
  $injector.get('$rootScope').$digest();
}));
```

But this has a side-effet of triggering all your promises, even those you
forgot about, like loading the `templateUrl` for your directives. This will in
turn block your tests because some promises will fail. The easiest way to
correct this is to mock the responses and always respond an empty object.

```javascript
beforeEach(inject(function($injector) {
  $injector.get('$httpBackend').whenGET(/.*/).respond({});
}));
```

Hope this little tricks helped.
