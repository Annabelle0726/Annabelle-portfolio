export function portfolioProvider(env = process.env) {
  const base = new URL(env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com');
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash ||
    ['chat.deepseek.com','platform.deepseek.com'].includes(base.hostname)) {
    throw new Error('Configure the API base URL, not the chat or account website');
  }
  if (!base.pathname.endsWith('/')) base.pathname += '/';
  return {url:new URL('chat/completions',base).href, model:env.DEEPSEEK_MODEL || 'deepseek-flash'};
}
