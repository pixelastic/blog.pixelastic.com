---
layout: post
title: "Mocking in Jest"
tags: jest
---

I used to do my JavaScript testing using a combination of `mocha`, `expect` and
`sinon`, but [Jest](https://facebook.github.io/jest/) packages all those
features into one cohesive package. 

Transitioning to Jest has been smooth. The part that took me a while to figure
out is how to properly mock methods, and this is what I'm going to develop here.

## Mocking direct methods

Imagine a dummy component with two methods, `foo` and `bar`, with the following
implementation:

```javascript
const component = {
  foo(input) {
    return {
      id: input,
      name: component.bar()
    }
  },
  bar() {
    const alpha = 'bar';
    const beta = 'baz';
    return `${alpha}-${beta}`;
  }
}
export default component;
```

Calling `foo(42)` will return `{ id: 42, name: 'bar-baz' }`.

The `bar` method is straightforward to test as it does not have any
dependencies. All we have to test is that the output is the one we are
expecting. The code can be simplified but I'm making it overly complicated here
on purpose.

The point is that when we test `foo`, we don't want to deal with the internals
of `bar`. We should be able to change the internals of `bar` and have our `foo`
tests still work. Actually, we could even completly change the return value of
`bar` and still have our `foo` tests pass.

To achieve that decoupling, the trick is to mock the `bar` method to control its
behavior during our test. 

```
import component from './component.js';

describe('component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should have the name set to the value of bar()', () => {
    // Given
    const input = 42;
    const expected = {
      id: input,
      name: 'my-mock-name'
    };

    // When
    jest
      .spyOn(component, 'bar')
      .mockReturnValue('my-mock-name');
    const actual = component.foo(input);

    // Then
    expect(actual).toEqual(expected);
  });
});
```

The first step is to call `jest.spyOn(component, 'bar')`. This will replace the
`component.bar` method with a mock version. By default the mock version will
behave like the original method. Spying on a method has other benefits
(like being able to assert the number of times a method is called), but those
won't be discussed in this article.

Once we've replaced the original method with our spy, we can now call
`.mockReturnValue('my-mock-name')` on it that will change the original method so
it now always return `my-mock-name` when called.

The last step is to call `jest.restoreAllMocks()` in the `afterEach` hook.
`afterEach` is called after each test, and `restoreAllMocks` will restore all
our spies to their original methods. If we don't do that, all our
`component.bar` calls in all our tests will always return `my-mock-name`.

## Mocking dependency methods

This first part was about mocking methods of one of our dependencies. But how do
you mock sub-dependencies? Let's update our component so it now uses one of its
own dependencies:

```
import dependency from 'dependency';
const component = {
  foo(input) {
    return {
      id: input,
      name: dependency.bar()
    }
  }
}
export default component;
```

There is no `component.bar` method anymore here as `component` is directly
calling its `dependency` `.bar` method. To mock dependencies, we need
a bit more plumbing.

```
import component from './component.js';
jest.mock('dependency'); // <-- Here

describe('component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should have the name set to the value of bar()', () => {
    // Given
    const input = 42;
    const expected = {
      id: 42,
      name: 'my-mock-name'
    };

    // When
    const dependency = require('dependency'); // <-- Here
    jest
      .spyOn(dependency, 'bar') // <-- Here
      .mockReturnValue('my-mock-name');
    const actual = component.foo(input);

    // Then
    expect(actual).toEqual(expected);
  });
});
```

We've added `jest.mock('dependency')` to our test file. It will tell Jest to
replace all `require` and `import` of `dependency` with a mock object. This
means that whenever we will import `dependency` (either in `component.js` or in
our tests), it will be replaced with a mock version.

Like we did in the previous example, we will hardcode the return value of the
`bar` method in our test. This time, we first need to import it (`const
dependency = require('dependency')`, so we can spy on it and mock its return
value.

## Conclusion

Hope that overview can help others. It took me some time to understand how
mocking was working in Jest and I hope this will help other figure out all the
pieces.

__Tested with Jest v21.1.0__

