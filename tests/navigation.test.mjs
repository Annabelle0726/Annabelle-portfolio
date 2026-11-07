import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveNavigation, sameContentView } from '../src/navigation.js';

test('published anchors retain their destinations and navigation groups', () => {
  assert.deepEqual(resolveNavigation('#portfolio'), { id: 'portfolio', view: 'portfolio', group: 'projects' });
  assert.deepEqual(resolveNavigation('#XD'), { id: 'XD', view: 'design', group: 'projects' });
  assert.equal(resolveNavigation('#services').view, 'data');
  assert.equal(resolveNavigation('#resume'), null);
  assert.equal(resolveNavigation('#contact').view, 'contact');
});
test('the existing skills deep link opens the view containing skills', () => {
  assert.deepEqual(resolveNavigation('#skills'), { id: 'skills', view: 'about', group: 'home' });
  assert.equal(resolveNavigation('#about').view, 'about');
});
test('favorites entries have individual addresses in the favorites group', () => {
  for (const id of ['models', 'quotes', 'model-skills']) assert.deepEqual(resolveNavigation('#' + id), { id, view: 'favorites', group: 'favorites' });
});
test('malformed or unknown fragments and the skip target are not routes', () => {
  for (const hash of ['#%E0%A4%A', '#main', '#missing', '#toString', '#__proto__', '']) assert.equal(resolveNavigation(hash), null);
  assert.equal(resolveNavigation('#%58D').id, 'XD');
});

test('anchors within About share a view, but separate Favorites pages do not', () => {
  assert.equal(sameContentView(resolveNavigation('#about'), resolveNavigation('#skills')), true);
  assert.equal(sameContentView(resolveNavigation('#models'), resolveNavigation('#quotes')), false);
  assert.equal(sameContentView(resolveNavigation('#hero'), resolveNavigation('#about')), false);
});

test('WeChat articles open independent content views', () => {
  const ids = ['agency-bloom', 'agency-bloom-value', 'agency-bloom-applause', 'agency-bloom-ideas', 'design-care', 'being-seen', 'personal-brand', 'understanding-needs'];
  for (const id of ids) assert.deepEqual(resolveNavigation('#' + id), { id, view: id, group: 'wechat' });
  assert.equal(sameContentView(resolveNavigation('#agency-bloom'), resolveNavigation('#design-care')), false);
});
