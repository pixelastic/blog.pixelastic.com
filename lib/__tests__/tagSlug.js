import { tagSlug } from '../tagSlug.js';

describe('tagSlug', () => {
  it.each([
    { title: 'plain tag', input: 'zsh', expected: 'zsh' },
    { title: 'sharp', input: 'C#', expected: 'csharp' },
    { title: 'dot', input: 'node.js', expected: 'nodedotjs' },
    { title: 'plus', input: 'C++', expected: 'cplusplus' },
    { title: 'slash', input: 'ci/cd', expected: 'cislashcd' },
    { title: 'backslash', input: 'a\\b', expected: 'abackslashb' },
    { title: 'space', input: 'web workers', expected: 'web-workers' },
    { title: 'upper case', input: 'JavaScript', expected: 'javascript' },
    { title: 'surrounding spaces', input: ' Vim ', expected: 'vim' },
    { title: 'dollar sign', input: '$q', expected: '$q' },
  ])('$title', ({ input, expected }) => {
    const actual = tagSlug(input);
    expect(actual).toEqual(expected);
  });
});
