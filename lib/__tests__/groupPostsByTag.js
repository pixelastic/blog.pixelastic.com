import { groupPostsByTag } from '../groupPostsByTag.js';

describe('groupPostsByTag', () => {
  const old = {
    date: new Date('2020-01-01'),
    data: { title: 'old', tags: ['zsh', 'C#'] },
  };
  const mid = {
    date: new Date('2021-01-01'),
    data: { title: 'mid', tags: ['C#'] },
  };
  const recent = {
    date: new Date('2022-01-01'),
    data: { title: 'new', tags: ['zsh'] },
  };
  const untagged = {
    date: new Date('2023-01-01'),
    data: { title: 'untagged' },
  };

  it('lists every tag once, with its slug and its posts newest first', () => {
    const actual = groupPostsByTag([old, recent, mid, untagged]);
    expect(actual).toEqual([
      { name: 'zsh', slug: 'zsh', posts: [recent, old] },
      { name: 'C#', slug: 'csharp', posts: [mid, old] },
    ]);
  });

  it.each([
    {
      title: 'merges tags that share a slug into one page',
      input: [
        { ...old, data: { title: 'lower', tags: ['api'] } },
        { ...mid, data: { title: 'upper', tags: ['API'] } },
      ],
      expected: [
        {
          name: 'API',
          slug: 'api',
          posts: [
            { ...mid, data: { title: 'upper', tags: ['API'] } },
            { ...old, data: { title: 'lower', tags: ['api'] } },
          ],
        },
      ],
    },
    {
      title: 'ignores posts without tags',
      input: [untagged],
      expected: [],
    },
  ])('$title', ({ input, expected }) => {
    const actual = groupPostsByTag(input);
    expect(actual).toEqual(expected);
  });
});
