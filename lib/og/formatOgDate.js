/**
 * Format the date of a post for its social card
 * @param {Date} date - Date of the post
 * @returns {string} Uppercase date, like `NOVEMBER 10, 2026`
 */
export function formatOgDate(date) {
  return date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
    .toUpperCase();
}
