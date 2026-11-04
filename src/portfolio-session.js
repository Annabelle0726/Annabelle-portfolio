import { passages } from '../server/portfolio-passages.mjs';

const emptySession = () => ({turns:[], draft:''});
const registered = new Map(passages.map(p => [p.id,{id:p.id,title:p.title,href:'#'+p.route}]));

export function restoreSession(raw) {
  try {
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved?.turns) || typeof saved.draft !== 'string') return emptySession();
    return {draft:saved.draft.slice(0,2000), turns:saved.turns.filter(turn =>
      typeof turn?.question === 'string' && typeof turn.reply?.text === 'string' && Array.isArray(turn.reply.sources)
    ).map(turn => ({...turn, reply:['pending','generating'].includes(turn.reply.status)
      ? {status:'unavailable', text:[turn.reply.text,turn.origin?.language === 'en' ? 'The previous reply was interrupted. You can try again.' : '上次的回答中断了，可以重新试一次。'].filter(Boolean).join('\n\n'), sources:[], offline:true, interrupted:true}
      : {...turn.reply, sources:turn.reply.sources.map(source => registered.get(source?.id)).filter(Boolean)}}))};
  } catch { return emptySession(); }
}

export function conversationHistory(turns) {
  const history = turns.filter(turn => !['pending','generating','unavailable'].includes(turn.reply.status)).slice(-6).map(turn => ({
    question:turn.question.slice(0,2000), answer:turn.reply.text.slice(0,6000), status:turn.reply.status,
    sources:turn.reply.sources.map(source => source.id),
  }));
  // Leave room for the new question and request metadata within the 64 KB API limit.
  while (new TextEncoder().encode(JSON.stringify(history)).length > 48000) history.shift();
  return history;
}
