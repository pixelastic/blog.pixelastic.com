---
layout: post
title: "Testing several Jekyll versions"
tags: ruby, jekyll, travis, appraisal, rspec
---

Maintaining a Jekyll plugin that must work for two major versions of
Jekyll is a challenge.

I released the [Jekyll Algolia plugin][1] for Jekyll 2.5 (the version used by
GitHub). Jekyll recently released their v3.0 and while the plugin is still
working, it produces a huge number of deprecation warnings.

This is caused by the fact that Jekyll changed the place where some information
were stored (at the root of an objet or in a sub `data` key). This was mostly
a really easy fix to add but I wanted to make sure I wasn't adding any
regression as well.

## Testing multiple versions

That's when my journey into testing the plugin for two different major version
began. I needed a way to launch my tests for Jekyll 2.5 as well Jekyll 3.0 and
check that everything was green.

I used [Appraisal][2], a wonderful tool by
[Thoughtbot][3]. It lets you define your `Gemfile`
like usual, but also named overrides on top of it.

```ruby
# ./Gemfile
source 'http://rubygems.org'

gem 'algoliasearch', '~> 1.4'
gem 'appraisal', '~> 2.1.0'
gem 'jekyll', '~> 2.5'

group :development do
  gem 'appraisal', '~> 2.1.0'
  gem 'rspec', '~> 3.0'
  gem 'simplecov', '~> 0.10'
end
```

```ruby
# ./Appraisals
appraise 'jekyll-v2' do
  gem 'jekyll', '~> 2.5'
end

appraise 'jekyll-v3' do
  gem 'jekyll', '~> 3.0'
  gem 'jekyll-paginate', '~> 1.1.0'
end
```

As you can see, I simply defined my dependencies in `Gemfile`, then override
them in `Appraisal`, naming each group. `jekyll-v2` will use Jekyll 2.5 while
`jekyll-v3` will use 3.0. Jekyll 3 no longer comes shipped with
`jekyll-paginate` so I had to manually add it as well.

Once this is done, be sure to run `appraisal install` after the usual `bundle
install`. This will create all the needed gemfiles in `./gemfiles`.

```
gemfiles
├── jekyll_v2.gemfile
├── jekyll_v2.gemfile.lock
├── jekyll_v3.gemfile
└── jekyll_v3.gemfile.lock
```

## Running tests in two versions

Running scripts in one version or the other is now as simple as prefixing the
command with `appraisal jekyll-v2` or `appraisal jekyll-v3`. Granted, with
`bundler` and `rake` you end up typing stuff like `appraisal jekyll-v3 bundle
exec rake spec`, but just put it all in a wrapper bash script and problem
solved.

This is actually the content of some of my scripts in `./scripts`:

```sh
#!/usr/bin/env bash
# ./scripts/test_v2
cd "$(dirname "$BASH_SOURCE")"/..

echo "Testing under Jekyll 2"
appraisal jekyll-v2 bundle exec rake spec
```

```sh
#!/usr/bin/env bash
# ./scripts/test_v3
cd "$(dirname "$BASH_SOURCE")"/..

echo "Testing under Jekyll 3"
appraisal jekyll-v3 bundle exec rake spec
```

```sh
#!/usr/bin/env bash
# ./scripts/test
cd "$(dirname "$BASH_SOURCE")"

./test_v2 && ./test_v3
```

## Running some tests only for Jekyll 3

I had a couple of tests that made sense only for Jekyll 3, so I had to find
a way to only execute them when the Jekyll loaded as a dependency was > 3.0.

Here is the little ruby method I added to my spec helpers:

```ruby
def restrict_jekyll_version(more_than: nil, less_than: nil)
  jekyll_version = Gem::Version.new(Jekyll::VERSION)
  minimum_version = Gem::Version.new(more_than)
  maximum_version = Gem::Version.new(less_than)

  return false if !more_than.nil? && jekyll_version < minimum_version
  return false if !less_than.nil? && jekyll_version > maximum_version
  true
end
```

`Gem::Version` comes bundled with all the semver comparison you might need, so
better to use it than coding it myself.

And an example of how I use it in the tests:

```ruby
if restrict_jekyll_version(more_than: '3.0')
  describe 'Jekyll > 3.0' do
    it 'should not throw any deprecation warnings' do
      # Given

      # When
      post_file.metadata

      # Expect
      expect(@logger).to_not have_received(:warn)
    end
  end
end
```

## Using it with Guard

This gem is even compatible with Guard. You do not have to change anything to your
`Guardfile`, but simply prefix your `guard` call with `appraisal` like for
`bundler`.

Here is my default config for rspec TDD:

```ruby
# Guardfile
guard :rspec, cmd: 'bundle exec rspec --color --format documentation' do
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^lib/(.+)\.rb$})     { |m| "spec/#{m[1]}_spec.rb" }
  watch('spec/spec_helper.rb')  { 'spec' }
end

notification :off
```

```sh
#!/usr/bin/env bash
# ./scripts/watch_v2
cd "$(dirname "$BASH_SOURCE")"/..

appraisal jekyll-v2 guard 
```

```sh
#!/usr/bin/env bash
# ./scripts/watch_v3
cd "$(dirname "$BASH_SOURCE")"/..

appraisal jekyll-v3 guard 
```

Unfortunatly, it is not possible to run both `watch_v2` and `watch_v3` at the
same time, so you still have to do TDD on one version at a time.

## Configuring TravisCI

Appraisal is also [Travis][4]-compliant out of the box. Just run `appraisal generate
--travis` to get the config you need to add to your `.travis.yml` file.

This will simply output the matrix of `Gemfile`s to use. In my case it was
nothing more than:

```ruby
gemfile:
  - gemfiles/jekyll_v2.gemfile
  - gemfiles/jekyll_v3.gemfile
```

## Conclusion

It took me way more time to configure the testing environment for multiple
Jekyll version than "fixing" the initial bug. But in the end I'm now sure
I won't cause any regression in one version when I fix a bug in another.

Everything is [tested on Travis][5] on all supported Jekyll and Ruby versions.


[1]: https://github.com/algolia/algoliasearch-jekyll
[2]: https://github.com/thoughtbot/appraisal
[3]: https://github.com/thoughtbot
[4]: https://travis-ci.org/
[5]: https://travis-ci.org/algolia/algoliasearch-jekyll
