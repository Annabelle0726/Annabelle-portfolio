import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveNavigation, sameContentView } from '../src/navigation.js';

test('web project cases have distinct views and preserve the published article', () => {
  const article = resolveNavigation('#agency-bloom');
  assert.equal(article.group, 'wechat');
  for (const id of ['web-agency-bloom', 'web-belay', 'web-somnia']) {
    const route = resolveNavigation('#' + id);
    assert.deepEqual(route, { id, view: id, group: 'projects' });
    assert.equal(sameContentView(route, article), false);
    assert.equal(sameContentView(route, resolveNavigation('#portfolio')), false);
  }
  assert.equal(sameContentView(resolveNavigation('#web-belay'), resolveNavigation('#web-somnia')), false);
});
