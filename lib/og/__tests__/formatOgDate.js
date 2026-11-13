import { formatOgDate } from '../formatOgDate.js';

describe('formatOgDate', () => {
  it.each([
    { date: new Date('2026-11-10'), expected: 'NOVEMBER 10, 2026' },
    { date: new Date('2024-07-01'), expected: 'JULY 1, 2024' },
  ])('$expected', ({ date, expected }) => {
    const actual = formatOgDate(date);
    expect(actual).toEqual(expected);
  });
});
