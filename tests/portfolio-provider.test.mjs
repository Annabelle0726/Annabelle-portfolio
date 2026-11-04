import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioProvider } from '../server/portfolio-provider.mjs';

test('official API address and model are defaults, even without website configuration', () => {
  assert.deepEqual(portfolioProvider({}),{url:'https://api.deepseek.com/chat/completions',model:'deepseek-flash'});
});

test('explicit server address supports an optional v1 path and model setting', () => {
  assert.deepEqual(portfolioProvider({DEEPSEEK_BASE_URL:'https://api.deepseek.com/v1/',DEEPSEEK_MODEL:'deepseek-flash'}),
    {url:'https://api.deepseek.com/v1/chat/completions',model:'deepseek-flash'});
});

test('a website URL, credentials in URLs and insecure external endpoints are not accepted', () => {
  for (const base of ['https://chat.deepseek.com','https://platform.deepseek.com','http://api.deepseek.com','https://user:password@api.deepseek.com']) {
    assert.throws(()=>portfolioProvider({DEEPSEEK_BASE_URL:base}));
  }
});
