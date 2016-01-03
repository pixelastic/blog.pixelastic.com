---
layout: post
title: "JavaScript journey to test coverage badge"
tags: javascript
---

Tooling in JavaScript is starting to become a big problem. We have so many tools
available, and new one popping up regularly. We have tools for tests, for code
coverage, for transpiling and various other tasks. This is a nice problem to
have, this means that the language is mature enough to have tools for all the
important tasks. But stitching them all together can sometimes become a hassle.

Here I'll document how I add a nice code coverage badge to one of the latest
project I worked on. I had to use TravisCI, Coveralls, BabelJS, Istanbul, Mocha,
Zepto, JSDom and Expectjs.

![Badges][1]

## Writing the tests

Test coverage is only useful if you have tests to begin with. I always use Mocha
as a test suite because I like the easy to read syntax of `describe`/`it` along
with the `beforeEach`/`beforeAll` hooks.

I sometimes even use Chai with it, but this time I went with expectjs.

Mocha expect your tests, by default, to be put in a `./test` folder at the root
of your project. You can name your files whatever you want, but I name them
`./test/something-test.js`, where `something` is the name of the class it is
testing. I find it easier to fuzzy-find them that way.

Here is a stripped down example of what my test file looks like:

```javascript
# ./test/utils-test.js
var expect = require('expect');
var utils = require('utils');

describe('utils', function() {
  describe('fizzBuzz', function() {
    it('should return fizz if input is divisible by 3', function() {
      // Given
      var input = 9;

      // When
      var actual = utils.fizzBuzz(input);

      // Then
      expect(actual).toEqual('fizz');
    });
  });
});
```

I tend to use the [Given, When, Then][2] form when writing my tests, but this is
personal preference.

## Running the tests

To run this tests, you can use complex (and useless) layers like Karma, Grunt or
Gulp, but I now tend to stick to simple `npm` scripts.

I just add the following to my `package.json`:

```json
{
  [...]
  "scripts": {
    "test": "mocha"
  }
  [...]
}
```

With that, I can now type `npm run test` and this will execute the locally
installed `mocha`, which will in turn run all the tests defined in `./test`

## Moving to ES6

Current version of JavaScript is nice, but ES6 is even better. I was skeptical
at first, but now that I've started using it, I have to add it on every project.
It makes writing code so much easier.

Adding ES6 support to mocha is really easy. You just have to install `babel`
locally, and then call `mocha --compilers js:babel/register` instead of `mocha`.
You can also create a default config file (at `./test/mocha.opts`) and put the
options there:

```config
# ./test/mocha.opts
--compilers js:babel/register
```

Here is what the test file looks like in ES6:

```javascript
# ./test/utils-test.js
import expect from 'expect';
import utils from 'utils';

describe('utils', () => {
  describe('fizzBuzz', () => {
    it('should return fizz if input is divisible by 3', () => {
      // Given
      let input = 9;

      // When
      let actual = utils.fizzBuzz(input);

      // Then
      expect(actual).toEqual('fizz');
    });
  });
});
```

`require` becomes `import`, `let` replaces `var` and we now use fat arrow
functions. Not much changed, really. But we can still call our tests with `npm
run test`, and babel will convert this code to ES5 for us.

## Testing Zepto


- Zepto, du coup besoin de jsdom pour charger dans un before
mocha-jsdom, jsdom({useEach: true})

- Ajout de sinon.js pour tester les mocks, mais du coup besoin de spyier les
  requires avec Rewire. Example de comment faire. Mettre cette dépendance qu'en
  test et lancer la comande avec BABEL_ENV=test

- Ajouter du coverage. Compliqué. Normalement on fait `istanbul "commande de
  test"`. Pour mocha, c'est `_mocha` et pas `mocha`, histoire de thread.
  Comme on utilise babel, il faut utiliser babel-istanbul et pas istanbul tout
  seul
  Bizarrement, besoin de filer les paths complets vers les binaires, sinon pas
  capable de trouver correctement
  Et comble, il faut lancer tout au travers de babel-node

- Coveralls
  besoin d'un export en lcov, donc ajout du plugin et de l'option
  pour avoir le badge, besoin de push la data chez coveralls
  Utilise Travis, donc déjà besoin d'avoir un travis.yml. execute les tests, et
  an after script balance le résultat sur coverall

- Badge
  Presque ok, mais besoin d'ajouter les badges, et de manière uniforme utilise
  shields.io pour badge travis et coverall






[1]: /img/files/2016-01-03/badges.png
[2]: http://martinfowler.com/bliki/GivenWhenThen.html
