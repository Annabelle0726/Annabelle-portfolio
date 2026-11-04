import { passages } from './portfolio-passages.mjs';

export function caseIntroduction(page, language) {
  const summary = passages.find(p => p.route === page && p.id.endsWith('-overview'));
  return summary?.[language === 'en' ? 'en' : 'zh'];
}

// Exact social messages stay useful even when a model is not connected.
export function socialReply(question, language = 'zh', page) {
  const normalized = question.trim().toLowerCase().replace(/[!！?？。.,，\s]+$/gu, '');
  const english = !/[\u4e00-\u9fff]/u.test(normalized) && (/[a-z]/i.test(normalized) || language === 'en');
  let text;
  if (/^(你好|您好|嗨|哈喽|hello|hi|hey|早上好|晚上好)$/u.test(normalized)) {
    const intro = caseIntroduction(page, english ? 'en' : 'zh');
    text = intro ? (english ? 'Hi! ' : '你好！') + intro : (english
      ? 'Hi, welcome to Annabelle’s portfolio. Want to explore a project, or just have a chat?'
      : '你好呀，欢迎来逛 Annabelle 的作品集。想先看项目，还是随便聊聊？');
  } else if (/^(谢谢|谢谢你|多谢|感谢|thanks|thank you|thank you so much)$/u.test(normalized)) {
    text = english ? 'You’re welcome. Take your time looking around.' : '不客气，慢慢看。';
  } else if (/^(你能做什么|你是谁|你可以做什么|what can you do|who are you)$/u.test(normalized)) {
    text = english
      ? 'I’m the AI portfolio assistant. I can guide you through the published projects, explain ideas, translate, or help with writing when AI is connected. Project facts come with sources.'
      : '我是这里的 AI 作品助手。可以带你看公开项目，也可以在 AI 连通时解释概念、翻译或帮你整理文字。聊到项目事实时，我会附上出处。';
  }
  return text ? {status:'chat', text, sources:[]} : null;
}
