import test from 'node:test';
import assert from 'node:assert/strict';
import { getAge } from '../src/sections/about-profile.js';

test('age changes at birthday midnight in Shanghai', () => {
  assert.equal(getAge(new Date('2026-07-25T15:59:59Z')), 24);
  assert.equal(getAge(new Date('2026-07-25T16:00:00Z')), 25);
  assert.equal(getAge(new Date('2026-10-29T04:00:00Z')), 25);
});
test('a new calendar year does not advance age before the birthday', () => {
  assert.equal(getAge(new Date('2027-01-01T00:00:00Z')), 25);
  assert.equal(getAge(new Date('2027-07-25T16:00:00Z')), 26);
});
