---
layout: post
title: "Testing $q promises with Angular"
tags: angular, $q, promises, test
---

beforeEach(inject(function($injector) {
    Validator = $injector.get('Validator');
 
    // 1. Whenever $rootScope.apply() is called, Angular will initiate the Controllers, and matching default routes
    // and template loading. So we need to mock the backend to respond an empty object on any outgoing request
    $injector.get('$httpBackend').whenGET(/.*/).respond({});
  }));
 
  // 2. This is needed because $q mechanisms are tied with Angular scope lifecycle, so we need to manually trigger the
  // $digest() cycle to resolve/reject promises. See 1. for side-effect.
  afterEach(inject(function ($injector) {
    $injector.get('$rootScope').$digest();
  }));
