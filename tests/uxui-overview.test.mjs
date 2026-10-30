import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { resolveNavigation, sameContentView } from '../src/navigation.js';

test('overview navigation starts a new page while detail switching keeps in-page focus', () => {
  const overview = resolveNavigation('#XD');
  const detail = resolveNavigation('#XD-reverie');
  assert.equal(sameContentView(overview, detail), false);
  assert.equal(sameContentView(detail, overview), false);
  assert.equal(sameContentView(detail, resolveNavigation('#XD-travel')), true);
});

test('overview renders all three projects; deep links still render one interactive detail', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { default: Portfolio } = await server.ssrLoadModule('/src/sections/DesignPortfolio.jsx');
    for (const language of ['zh', 'en']) {
      const overview = renderToStaticMarkup(React.createElement(Portfolio, { language, projectId: 'XD' }));
      assert.equal((overview.match(/class="uxui-overview-project /g) || []).length, 3);
      for (const id of ['XD-cupcakes', 'XD-reverie', 'XD-travel']) {
        assert.ok(overview.includes(`href="#${id}"`));
        const detail = renderToStaticMarkup(React.createElement(Portfolio, { language, projectId: id }));
        assert.ok(detail.includes(`id="${id}"`));
        assert.ok(detail.includes('href="#XD"'));
        assert.equal((detail.match(/class="uxui-project"/g) || []).length, 1);
        assert.ok(detail.includes('uxui-demo'));
      }
      assert.ok(!overview.includes('精选作品'));
      assert.ok(!overview.includes('SELECTED WORKS'));
    }
  } finally { await server.close(); }
});
