import { groupPostsByPeriod } from '../groupPostsByPeriod.js';

describe('groupPostsByPeriod', () => {
  const march2016a = {
    date: new Date('2016-03-05'),
    url: '/2016/03/05/a/',
    data: { title: 'a' },
  };
  const march2016b = {
    date: new Date('2016-03-05'),
    url: '/2016/03/05/b/',
    data: { title: 'b' },
  };
  const june2016 = {
    date: new Date('2016-06-01'),
    url: '/2016/06/01/c/',
    data: { title: 'c' },
  };
  const jan2023 = {
    date: new Date('2023-01-15'),
    url: '/2023/01/15/d/',
    data: { title: 'd' },
  };
  const posts = [march2016a, jan2023, march2016b, june2016];

  const find = (periods, url) => periods.find((period) => period.url === url);

  it('lists years from newest to oldest', () => {
    const actual = groupPostsByPeriod(posts)
      .filter((period) => period.level === 'year')
      .map((period) => period.year);
    expect(actual).toEqual([2023, 2016]);
  });

  it.each([
    {
      title: 'year page lists only its posts, newest first',
      url: '/2016/',
      expected: {
        level: 'year',
        year: 2016,
        title: 'Archive 2016',
        posts: [june2016, march2016a, march2016b],
      },
    },
    {
      title: 'month page lists only its posts',
      url: '/2016/03/',
      expected: {
        level: 'month',
        year: 2016,
        month: 3,
        title: 'Archive March 2016',
        posts: [march2016a, march2016b],
      },
    },
    {
      title: 'day page lists every post of the day',
      url: '/2016/03/05/',
      expected: {
        level: 'day',
        year: 2016,
        month: 3,
        day: 5,
        title: 'Archive March 05, 2016',
        posts: [march2016a, march2016b],
      },
    },
  ])('$title', ({ url, expected }) => {
    const actual = find(groupPostsByPeriod(posts), url);
    expect(actual).toEqual({ ...expected, url });
  });

  it('creates no page for a period without posts', () => {
    const actual = groupPostsByPeriod(posts).map((period) => period.url);
    expect(actual).not.toContain('/2016/04/');
    expect(actual).not.toContain('/2016/03/06/');
    expect(actual).not.toContain('/2017/');
  });

  it('returns nothing without posts', () => {
    const actual = groupPostsByPeriod([]);
    expect(actual).toEqual([]);
  });
});
