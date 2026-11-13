import { renderOgImage } from '../renderOgImage.js';

describe('renderOgImage', () => {
  it('returns a 1200x630 PNG', async () => {
    const actual = await renderOgImage({
      title: 'Mocking sourced zsh functions',
      minutes: 5,
      author: 'Tim Carry',
      date: new Date('2026-11-10'),
      tags: ['zsh', 'testing', 'bats'],
    });
    expect(actual.subarray(1, 4).toString()).toEqual('PNG');
    expect(actual.readUInt32BE(16)).toEqual(1200);
    expect(actual.readUInt32BE(20)).toEqual(630);
  });
});
