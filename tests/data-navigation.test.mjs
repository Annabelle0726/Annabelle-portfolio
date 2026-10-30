import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveNavigation,sameContentView} from '../src/navigation.js';
test('data cases have separate deep-linkable views',()=>{
const ids=['data-athub','data-visualization','data-energy'];
for(const id of ids){const r=resolveNavigation('#'+id);assert.equal(r?.id,id);assert.equal(r.group,'projects');assert.equal(sameContentView(r,resolveNavigation('#services')),false);}
assert.equal(sameContentView(resolveNavigation('#data-athub'),resolveNavigation('#data-energy')),false);
});
