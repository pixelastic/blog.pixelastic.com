import _ from 'lodash';

export let __;

const LEVELS = ['year', 'month', 'day'];

/**
 * Group posts by year, month and day, to generate the archive pages
 * Periods without posts do not exist. Years come first, then months, then
 * days, each newest first. Posts are sorted newest first.
 * @param {object[]} posts - Eleventy posts, each with a `date`
 * @returns {object[]} List of `{ level, year, month?, day?, url, title, posts }`
 */
export function groupPostsByPeriod(posts) {
  const newestFirst = _.orderBy(posts, 'date', 'desc');

  return _.flatMap(LEVELS, (level, index) => {
    const fields = LEVELS.slice(0, index + 1);

    return _.chain(newestFirst)
      .groupBy((post) => __.url(_.pick(__.dateParts(post.date), fields)))
      .map((periodPosts, url) => {
        const parts = _.pick(__.dateParts(periodPosts[0].date), fields);
        return {
          level,
          ...parts,
          url,
          title: __.title(level, parts),
          posts: periodPosts,
        };
      })
      .value();
  });
}

__ = {
  /**
   * Split a date into numeric year, month and day, in UTC
   * Eleventy dates posts at midnight UTC, from their file name.
   * @param {Date} date - Date of a post
   * @returns {object} `{ year, month, day }`, month and day starting at 1
   */
  dateParts(date) {
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
    };
  },
  /**
   * Zero-padded URL of a period
   * @param {object} parts - Any of `year`, `month` and `day`
   * @returns {string} URL with a trailing slash, like `/2016/03/`
   */
  url(parts) {
    const segments = _.chain(parts)
      .values()
      .map((value) => _.padStart(value, 2, '0'))
      .value();
    return `/${segments.join('/')}/`;
  },
  /**
   * Title of the page of a period
   * @param {string} level - `year`, `month` or `day`
   * @param {object} parts - Any of `year`, `month` and `day`
   * @returns {string} Title, like `Archive March 05, 2016`
   */
  title(level, parts) {
    const { year, month, day } = parts;
    if (level === 'year') {
      return `Archive ${year}`;
    }

    const monthName = new Date(Date.UTC(year, month - 1)).toLocaleString(
      'en-US',
      { month: 'long', timeZone: 'UTC' },
    );
    if (level === 'month') {
      return `Archive ${monthName} ${year}`;
    }

    return `Archive ${monthName} ${_.padStart(day, 2, '0')}, ${year}`;
  },
};
