import { askPortfolio } from './portfolio-qa.mjs';
import { passages } from './portfolio-passages.mjs';

const supportedPages = new Set(['portfolio','services','XD',...passages.map(p => p.route)]);
const sourceIds = new Set(passages.map(passage => passage.id));
const validHistory = history => Array.isArray(history) && history.length <= 6 && history.every(turn =>
  turn && typeof turn.question === 'string' && turn.question.length <= 2000 &&
  (turn.answer === undefined || typeof turn.answer === 'string' && turn.answer.length <= 6000) &&
  (turn.status === undefined || ['chat','answer','analysis','matches','clarify','insufficient','outside'].includes(turn.status)) &&
  Array.isArray(turn.sources) && turn.sources.length <= sourceIds.size && turn.sources.every(id => sourceIds.has(id))
);

export function portfolioApi(answer = askPortfolio) {
  let windowStart = 0, requests = 0;
  return async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/portfolio-qa') return next();
    const send = (code, result) => {
      res.writeHead(code, {'Content-Type':'application/json', 'Cache-Control':'no-store'});
      res.end(JSON.stringify(result));
    };
    if (req.method !== 'POST') return send(405,{error:'method'});
    if (!req.headers['content-type']?.startsWith('application/json')) return send(415,{error:'content'});
    if (req.headers.origin) {
      try { if (new URL(req.headers.origin).host !== req.headers.host) return send(403,{error:'origin'}); }
      catch { return send(403,{error:'origin'}); }
    }
    if (!process.env.DEEPSEEK_API_KEY) return send(503,{error:'unavailable'});
    if (Date.now()-windowStart > 60000) { windowStart=Date.now(); requests=0; }
    if (requests >= 12) return send(429,{error:'limit'});
    try {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 64000) return send(413,{error:'size'});
        chunks.push(chunk);
      }
      const {question,page,language,history} = JSON.parse(Buffer.concat(chunks).toString());
      if (!supportedPages.has(page) ||
        typeof question !== 'string' || !question.trim() || question.length > 2000 ||
        !['zh','en'].includes(language) || !validHistory(history)) return send(400,{error:'input'});
      requests++;
      const reply = await answer({question,page,language,history});
      send(reply.status === 'unavailable' ? 503 : 200,reply);
    } catch {
      send(400,{error:'input'});
    }
  };
}
