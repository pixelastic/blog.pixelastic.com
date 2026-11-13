import { hashOgCard } from '../hashOgCard.js';

describe('hashOgCard', () => {
  const card = {
    title: 'My post',
    minutes: 5,
    author: 'Tim',
    date: new Date('2026-11-10'),
    tags: ['zsh'],
  };

  it('returns 12 hex characters', () => {
    expect(hashOgCard(card)).toMatch(/^[0-9a-f]{12}$/);
  });

  it('is stable for the same card', () => {
    expect(hashOgCard({ ...card })).toEqual(hashOgCard(card));
  });

  it.each([
    { title: 'title', change: { title: 'Other' } },
    { title: 'reading time', change: { minutes: 6 } },
    { title: 'author', change: { author: 'Someone' } },
    { title: 'date', change: { date: new Date('2026-11-11') } },
    { title: 'tags', change: { tags: ['zsh', 'bats'] } },
  ])('changes with the $title', ({ change }) => {
    const actual = hashOgCard({ ...card, ...change });
    expect(actual).not.toEqual(hashOgCard(card));
  });
});
