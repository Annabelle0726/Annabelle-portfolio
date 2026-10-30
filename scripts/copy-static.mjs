import { cpSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// The linked portfolio examples remain independent static websites.
const paths = [
  'assets/img',
  'Cupcakes',
  'PortfolioDigitalProduct',
  'DataVizPortfolio.html',
  'Annabelle-Zhu_Certificate.png',
  '404.html',
];

mkdirSync('dist', { recursive: true });
for (const path of paths) {
  cpSync(path, join('dist', path), {
    recursive: true,
    filter: (source) => !source.split(/[\\/]/).includes('.idea'),
  });
}
