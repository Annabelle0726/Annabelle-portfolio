import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveNavigation, sameContentView } from '../src/navigation.js';

test('model usage URLs resolve to separate detail views in Favorites', () => {
  for (const id of ['models-chatgpt', 'models-claude-code']) {
    const route = resolveNavigation('#' + id);
    assert.deepEqual(route, { id, view: id, group: 'favorites' });
    assert.equal(sameContentView(route, resolveNavigation('#models')), false);
  }
  assert.equal(sameContentView(resolveNavigation('#models-chatgpt'), resolveNavigation('#models-claude-code')), false);
});
