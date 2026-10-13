import { postPermalink } from '../postPermalink.js';

describe('postPermalink', () => {
  it.each([
    {
      title: 'dated post',
      input: '2016-06-01-marvel-super-search.md',
      expected: '/2016/06/01/marvel-super-search/',
    },
    {
      title: 'full input path',
      input: './src/posts/2016-06-01-marvel-super-search.md',
      expected: '/2016/06/01/marvel-super-search/',
    },
    {
      title: 'first post of a shared date',
      input: '2023-03-03-trim-string-in-zsh.md',
      expected: '/2023/03/03/trim-string-in-zsh/',
    },
    {
      title: 'second post of a shared date',
      input: '2023-03-03-slice-array-zsh.md',
      expected: '/2023/03/03/slice-array-zsh/',
    },
    {
      title: 'dot in the slug',
      input: '2015-02-16-the-making-of-programmingexcuses.sh.md',
      expected: '/2015/02/16/the-making-of-programmingexcuses.sh/',
    },
    {
      title: 'dollar sign in the slug',
      input: '2014-09-10-setting-all-inputs-as-$dirty-in-angularjs-1.2.md',
      expected: '/2014/09/10/setting-all-inputs-as-$dirty-in-angularjs-1.2/',
    },
    {
      title: 'post without a date',
      input: 'remove-element-from-array-in-zsh.md',
      expected: false,
    },
  ])('$title', ({ input, expected }) => {
    const actual = postPermalink(input);
    expect(actual).toEqual(expected);
  });
});
