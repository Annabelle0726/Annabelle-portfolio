// CSS minifiers may normalize 200ms to .2s, so never parse the number alone.
export function durationMilliseconds(value, fallback) {
  const match = /^(\d*\.?\d+)(ms|s)$/.exec(value.trim());
  return match ? Number(match[1]) * (match[2] === 's' ? 1000 : 1) : fallback;
}
