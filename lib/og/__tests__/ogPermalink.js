import { ogPermalink } from '../ogPermalink.js';

describe('ogPermalink', () => {
  it('mirrors the post url', () => {
    const actual = ogPermalink('/2026/11/10/mocking-sourced-zsh-functions/');
    expect(actual).toEqual('/og/2026/11/10/mocking-sourced-zsh-functions.png');
  });
});
