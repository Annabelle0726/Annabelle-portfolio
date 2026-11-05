import test from 'node:test';
import assert from 'node:assert/strict';
import { articlePageLinks } from '../src/components/article-pagination.js';
import { resolveNavigation } from '../src/navigation.js';

test('article pagination follows sidebar order in both directions', () => {
  const ids = ['agency-bloom', 'agency-bloom-value', 'agency-bloom-applause', 'agency-bloom-ideas', 'design-care', 'being-seen', 'personal-brand'];
  for (let i = 0; i < ids.length; i++) {
    const links = articlePageLinks(ids[i]);
    assert.equal(links.previous.href, '#' + (ids[i - 1] || 'services'));
    assert.equal(links.next.href, '#' + (ids[i + 1] || 'models'));
    assert.ok(resolveNavigation(links.previous.href));
    assert.ok(resolveNavigation(links.next.href));
  }
});
test('unknown articles have no pagination', () => assert.equal(articlePageLinks('missing'), null));
