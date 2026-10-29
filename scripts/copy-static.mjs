import { cpSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// The linked portfolio examples remain independent static websites.
const paths = [
  'assets/img',
  'ART 150',
  'Cupcakes',
  'GlobalTech_Portfolio',
  'PortfolioDigitalProduct',
  'Signature160D2',
  'DataVizPortfolio.html',
  'Annabelle Zhu Resume.pdf',
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
