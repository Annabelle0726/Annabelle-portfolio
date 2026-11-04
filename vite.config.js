import { defineConfig, loadEnv } from 'vite';
import { portfolioApi } from './server/qa-http.mjs';

export default defineConfig(() => {
  Object.assign(process.env, loadEnv('server', process.cwd(), 'DEEPSEEK_'));
  return {
    base: './',
    publicDir: false,
    plugins: [{
      name: 'portfolio-qa-api',
      configureServer(server) { server.middlewares.use(portfolioApi()); },
      configurePreviewServer(server) { server.middlewares.use(portfolioApi()); },
    }],
  };
});
