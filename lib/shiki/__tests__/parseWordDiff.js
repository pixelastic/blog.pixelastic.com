import { parseWordDiff } from '../parseWordDiff.js';

describe('parseWordDiff', () => {
  it('leaves code without markup untouched', () => {
    const actual = parseWordDiff('const a = 1;');
    expect(actual).toEqual({ code: 'const a = 1;', decorations: [] });
  });

  it.each([
    {
      title: 'a replaced word',
      input: 'const [-cust-]{+customer+} = 1;',
      code: 'const custcustomer = 1;',
      decorations: [
        { start: 6, end: 10, properties: { class: 'word-diff remove' } },
        { start: 10, end: 18, properties: { class: 'word-diff add' } },
      ],
    },
    {
      title: 'a removed word',
      input: 'a [-b-] c',
      code: 'a b c',
      decorations: [
        { start: 2, end: 3, properties: { class: 'word-diff remove' } },
      ],
    },
    {
      title: 'an added word',
      input: 'a {+b+} c',
      code: 'a b c',
      decorations: [
        { start: 2, end: 3, properties: { class: 'word-diff add' } },
      ],
    },
  ])('$title', ({ input, code, decorations }) => {
    const actual = parseWordDiff(input);
    expect(actual).toEqual({ code, decorations });
  });

  it('handles several replacements, on several lines', () => {
    const actual = parseWordDiff('[-a-]{+b+}\nx [-c-]{+d+}');
    expect(actual).toHaveProperty('code', 'ab\nx cd');
    expect(actual).toHaveProperty('decorations', [
      { start: 0, end: 1, properties: { class: 'word-diff remove' } },
      { start: 1, end: 2, properties: { class: 'word-diff add' } },
      { start: 5, end: 6, properties: { class: 'word-diff remove' } },
      { start: 6, end: 7, properties: { class: 'word-diff add' } },
    ]);
  });
});
