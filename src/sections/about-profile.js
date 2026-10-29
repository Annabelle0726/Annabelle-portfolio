export const birthday = { year: 2001, month: 7, day: 26 };

// Use the site's Shanghai calendar date, independent of the visitor's timezone.
export function getAge(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(now);
  const date = Object.fromEntries(parts.map(part => [part.type, Number(part.value)]));
  const beforeBirthday = date.month < birthday.month || (date.month === birthday.month && date.day < birthday.day);
  return date.year - birthday.year - Number(beforeBirthday);
}
