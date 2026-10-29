import test from 'node:test';
import assert from 'node:assert/strict';
import { contactText } from '../src/sections/contact-content.js';
test('contact content follows the selected language', () => {
  assert.equal(contactText.zh.title, '联系我');
  assert.equal(contactText.en.title, 'Contact me');
  assert.match(contactText.zh.intro, /欢迎给我写邮件/);
});
