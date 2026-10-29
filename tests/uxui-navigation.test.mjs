import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveNavigation, sameContentView } from '../src/navigation.js';

test('project deep links stay inside the UX/UI view and Projects group', () => {
  for (const id of ['XD-cupcakes', 'XD-reverie', 'XD-travel']) {
    assert.deepEqual(resolveNavigation('#' + id), { id, view: 'design', group: 'projects' });
  }
});
test('changing UX/UI projects preserves the view for in-page focus', () => {
  const one = resolveNavigation('#XD-cupcakes');
  const two = resolveNavigation('#XD-reverie');
  assert.ok(one && two);
  assert.equal(sameContentView(one, two), true);
  assert.equal(resolveNavigation('#XD').view, 'design');
});
test('travel demonstration filters destinations and supports reset', async () => {
  const { destinationsFor } = await import('../src/sections/uxui-demo.js');
  assert.deepEqual(destinationsFor('beach').map(p => p.name), ['Algarve', 'Bali']);
  assert.deepEqual(destinationsFor('mountains').map(p => p.name), ['Dolomites', 'Bass Lake']);
  assert.deepEqual(destinationsFor('city').map(p => p.name), ['Atlanta', 'Istanbul']);
  assert.equal(destinationsFor('all').length, 6);
  assert.deepEqual(destinationsFor('unknown'), []);
});
