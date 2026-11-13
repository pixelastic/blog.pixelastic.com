import { ogPermalink } from '../ogPermalink.js';

describe('ogPermalink', () => {
  it('mirrors the post url and adds the hash', () => {
    const actual = ogPermalink(
      '/2026/11/10/mocking-sourced-zsh-functions/',
      'a1b2c3d4e5f6',
    );
    expect(actual).toEqual(
      '/og/2026/11/10/mocking-sourced-zsh-functions.a1b2c3d4e5f6.png',
    );
  });
});
