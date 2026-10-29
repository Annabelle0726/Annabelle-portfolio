import test from 'node:test';
import assert from 'node:assert/strict';
import { durationMilliseconds } from '../src/motion.js';

test('animation timing survives CSS unit normalization', () => {
  assert.equal(durationMilliseconds('200ms', 1), 200);
  assert.equal(durationMilliseconds('.2s', 1), 200);
  assert.equal(durationMilliseconds(' 0.23s ', 1), 230);
  assert.equal(durationMilliseconds('0ms', 1), 0);
});
test('unresolved CSS duration values use an explicit fallback', () => {
  assert.equal(durationMilliseconds('', 200), 200);
  assert.equal(durationMilliseconds('invalid', 200), 200);
});
