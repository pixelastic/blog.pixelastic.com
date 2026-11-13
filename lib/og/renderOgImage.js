import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import _ from 'lodash';
import satori from 'satori';
import { formatOgDate } from './formatOgDate.js';

export let __;

const WIDTH = 1200;
const HEIGHT = 630;
const ASSETS = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'assets',
);

/**
 * Render the social card of a post as a PNG
 * @param {object} post - Data shown on the card
 * @param {string} post.title - Title of the post
 * @param {number} post.minutes - Reading time, in minutes
 * @param {string} post.author - Name of the author
 * @param {Date} post.date - Date of the post
 * @param {string[]} post.tags - Tags of the post
 * @returns {Promise<Buffer>} PNG image, 1200x630
 */
export async function renderOgImage(post) {
  const assets = await __.loadAssets();
  const svg = await satori(__.card(post, assets), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Mono', data: assets.bold, weight: 700 },
      { name: 'Mono', data: assets.regular, weight: 400 },
    ],
  });
  return new Resvg(svg).render().asPng();
}

__ = {
  /**
   * Read fonts and avatar from disk, only once
   * @returns {Promise<object>} Font buffers and avatar data URI
   */
  loadAssets: _.memoize(async () => {
    const [bold, regular, avatar] = await Promise.all([
      readFile(path.join(ASSETS, 'DejaVuSansMono-Bold.ttf')),
      readFile(path.join(ASSETS, 'DejaVuSansMono.ttf')),
      readFile(path.join(ASSETS, 'avatar.jpg')),
    ]);
    return {
      bold,
      regular,
      avatar: `data:image/jpeg;base64,${avatar.toString('base64')}`,
    };
  }),

  /**
   * Background of the card: dark page, circuit lines, diagonal panel
   * @returns {string} Data URI of the SVG background
   */
  background() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
<rect width="${WIDTH}" height="${HEIGHT}" fill="#0c0f15"/>
<g stroke="#63b3ed" stroke-opacity=".18" fill="none" stroke-width="3"><path d="M780 90h180v150h140M840 520h140v-110h160M720 300h110v130"/><circle cx="1100" cy="240" r="10"/><circle cx="1140" cy="410" r="10"/></g>
<polygon points="0,0 760,0 980,630 0,630" fill="#111827"/>
<polygon points="760,0 772,0 992,630 980,630" fill="#63b3ed"/></svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  },

  /**
   * Pick a title size that keeps long titles inside the panel
   * @param {string} title - Title of the post
   * @returns {number} Font size in pixels
   */
  titleSize(title) {
    if (title.length <= 40) {
      return 60;
    }
    return title.length <= 70 ? 48 : 40;
  },

  /**
   * Build a flex element
   * @param {object} style - CSS of the element
   * @param {object|string|object[]} children - Content of the element
   * @returns {object} Element understood by satori
   */
  div(style, children) {
    return {
      type: 'div',
      props: { style: { display: 'flex', ...style }, children },
    };
  },

  /**
   * Build the element tree of the card
   * @param {object} post - Data shown on the card
   * @param {object} assets - Avatar data URI
   * @returns {object} Element understood by satori
   */
  card(post, assets) {
    const { div } = __;
    const tags = _.map(post.tags, (tag) =>
      div(
        {
          marginLeft: 12,
          background: '#1c130d',
          border: '2px solid #5a2a10',
          color: '#ea580c',
          padding: '6px 18px',
          fontSize: 24,
        },
        tag,
      ),
    );

    return div(
      {
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: WIDTH,
        height: HEIGHT,
        padding: '56px 66px',
        backgroundImage: `url(${__.background()})`,
        color: '#d1d5db',
        fontFamily: 'Mono',
      },
      [
        div(
          {
            alignSelf: 'flex-start',
            border: '2px solid #63b3ed',
            color: '#90cdf4',
            padding: '6px 24px',
            fontSize: 24,
          },
          `${post.minutes} min read`,
        ),
        div({ width: 660 }, [
          div(
            {
              fontSize: __.titleSize(post.title),
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#ffffff',
            },
            [
              div({ color: '#38a169', marginRight: 24 }, '❯'),
              div({ width: 590 }, post.title),
            ],
          ),
        ]),
        div(
          { alignItems: 'center', justifyContent: 'space-between', width: 760 },
          [
            div({ alignItems: 'center' }, [
              {
                type: 'img',
                props: {
                  src: assets.avatar,
                  width: 96,
                  height: 96,
                  style: { borderRadius: 48, border: '3px solid #d69e2e' },
                },
              },
              div({ flexDirection: 'column', marginLeft: 28 }, [
                div(
                  { fontSize: 34, fontWeight: 700, color: '#ffffff' },
                  post.author,
                ),
                div(
                  { fontSize: 24, color: '#9ca3af', marginTop: 4 },
                  formatOgDate(post.date),
                ),
              ]),
            ]),
            div({}, tags),
          ],
        ),
      ],
    );
  },
};
