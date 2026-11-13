import { readingTime } from '../readingTime.js';

describe('readingTime', () => {
  it.each([
    { title: 'rounds up to the next minute', words: 231, expected: 2 },
    { title: 'fits in one minute', words: 230, expected: 1 },
    { title: 'is at least one minute', words: 0, expected: 1 },
    { title: 'handles long posts', words: 1073, expected: 5 },
  ])('$title', ({ words, expected }) => {
    const input = new Array(words).fill('word').join(' ');
    const actual = readingTime(input);
    expect(actual).toEqual(expected);
  });
});
