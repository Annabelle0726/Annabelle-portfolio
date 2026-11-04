import { interviewCards } from '../server/portfolio-interview.mjs';
export { interviewCards };
import { passages } from '../server/portfolio-passages.mjs';
import { socialReply } from '../server/portfolio-conversation.mjs';

const sample = (zh, en, ids) => ({zh, en, ids: ids.split(' ')});
export const suggestions = {
  portfolio: [
    sample('Bloom 让用户选回应方式，Belay 让学生引用回复。它们各解决了什么问题？','Why does Bloom offer response modes while Belay lets students quote a reply?', 'bloom-onboarding belay-feedback'),
    sample('这三个产品分别把哪些选择留给了使用者？','What decisions does each product leave to the person using it?', 'bloom-action belay-feedback somnia-mood'),
    sample('从独立开发到团队协作，Annabelle 在三个项目里分别负责什么？','How did Annabelle’s responsibilities differ across the three projects?', 'bloom-role belay-continuity belay-access somnia-role'),
  ],
  'web-agency-bloom': [
    sample('如果用户只想被听见，为什么不一上来就给行动建议？','What if someone wants to be heard before taking action?', 'bloom-onboarding'),
    sample('「先找工作还是继续做产品」怎么变成了「列出三个可以联系的人」？','How did a career dilemma turn into a list of three people to contact?', 'bloom-action'),
    sample('用户试过之后改变主意，行动记录怎么接住这次变化？','What happens to an action when someone changes their mind?', 'bloom-action'),
  ],
  'web-belay': [
    sample('同一道代码题，运行成功和报错时，Belay 分别追问什么？','How does feedback change when the same exercise succeeds or fails?', 'belay-feedback'),
    sample('学生只说「我还是不懂」，引用前一条回复有什么用？','How does quoting a reply give “I’m still stuck” a more precise meaning?', 'belay-quote'),
    sample('Glass Box 展示哪些依据，学生接下来能检查什么？','What does Glass Box show, and what can the learner check next?', 'belay-glass'),
  ],
  'web-somnia': [
    sample('读者说不出想看哪本书，首页怎么帮他开始选？','How can readers start choosing a book without knowing a title?', 'somnia-mood'),
    sample('桌面录屏里的功能卡片，悬停前后有什么变化？','What changes when a reader hovers over a feature card?', 'somnia-cards'),
    sample('从 Reverie 到 Somnia，哪些是原有产品，哪些是 Annabelle 的贡献？','What came from Reverie, and where did Annabelle contribute?', 'somnia-role'),
  ],
};

export function findSample(question) {
  const interview = Object.values(interviewCards).flat().find(c => c.questions.includes(question));
  // Deictic questions such as "what framework?" depend on the active case.
  if (interview && !/框架|framework/i.test(question)) return {zh:interview.questions[0], en:interview.questions[1], ids:[interview.id]};
  return Object.values(suggestions).flat().find(row => row.zh === question || row.en === question);
}

const segmenter = new Intl.Segmenter('zh', {granularity:'word'});
const stop = new Set('what which how does the did can about this that when are and for user users project projects tell please introduce introduction overview brief me 一个 哪些 什么 怎么 如何 项目 用户 为什么 介绍 一下 什么是 是什么 简单 说说 了解'.split(' '));
const projects = [
  {route:'web-agency-bloom', id:'bloom-overview', pattern:'\\b(?:agency\\s*bloom|bloom)\\b'},
  {route:'web-belay', id:'belay-overview', pattern:'\\bbelay\\b'},
  {route:'web-somnia', id:'somnia-overview', pattern:'\\bsomnia(?:\\s+library)?\\b'},
];
function withoutNames(question) {
  return projects.reduce((text,project) => text.replace(new RegExp(project.pattern,'gi'),' '),question);
}
function isIntroduction(question) {
  const remainder = withoutNames(question).toLowerCase().replace(
    /什么是|是什么|是做什么的|是干什么的|做什么的|干什么的|介绍一下|介绍下|介绍|了解一下|了解|简单|请你|请|帮我|能不能|可以|能|说说|聊聊|这个|该|项目|产品|那|它|的|呢|啊|和|give me an overview of|a brief introduction to|tell me about|what is|what's|introduce|explain|please|this project|the project|and/gu,'',
  ).replace(/[\s\p{P}]/gu,'');
  return remainder === '';
}
function terms(text) {
  return new Set([...segmenter.segment(text.toLowerCase())].filter(x => x.isWordLike && x.segment.length > 1 && !stop.has(x.segment)).map(x => x.segment));
}

export function localAnswer({question, page, language, history = []}) {
  const social = socialReply(question, language, page);
  if (social) return social;
  const example = findSample(question);
  const english = /用英文|in english/i.test(question) || (!/用中文|in chinese/i.test(question) &&
    (example ? example.en === question : !/[\u4e00-\u9fff]/.test(question) && (/[a-z]{3}/i.test(question) || language === 'en')));
  const lang = english ? 'en' : 'zh';
  const empty = (status,zh,en) => ({status,text:english ? en : zh,sources:[]});
  let selected;
  if (example) {
    selected = example.ids.map(id => passages.find(p => p.id === id));
  } else {
    const named = projects.filter(project => new RegExp(project.pattern,'i').test(question));
    const previous = passages.filter(p => history.at(-1)?.sources?.includes(p.id));
    const continuation = /^(那|它|他们|还有|and\b|then\b|what about|what else)/i.test(question.trim());
    if (!named.length && continuation && new Set(previous.map(p => p.route)).size > 1) {
      return empty('clarify','你指的是 Agency Bloom、Belay，还是 Somnia Library？','Which project do you mean: Agency Bloom, Belay or Somnia Library?');
    }
    const scope = named.length ? named.map(p => p.route) : continuation && previous.length ? previous.map(p => p.route) : [page];
    const technical = /代码逻辑|代码流程|业务逻辑|实现逻辑|技术架构|实现流程|code logic|code flow|implementation logic|technical architecture/gi;
    const walkthrough = question.search(technical) !== -1 && isIntroduction(question.replace(technical,'').replace(/是什么样的|是什么|\b(?:the|of|how does|work)\b/gi,''));
    const stackQuestion = /框架|技术栈|什么技术实现|framework|tech(?:nology)? stack|built (?:with|in)|用的是.{0,12}(?:react|vue|fastapi)|页面、API 和数据存储|mini program UI, API and storage/iu.test(question);
    const storageQuestion = /数据库|database/i.test(question) && /哪个|哪种|什么|which|what/i.test(question);
    if (stackQuestion || (storageQuestion && scope.length === 1 && scope[0] === 'web-agency-bloom')) {
      if (scope.includes('portfolio')) return empty('clarify','你想了解哪个项目的技术栈：Agency Bloom、Belay，还是 Somnia Library？','Which project’s stack would you like to explore: Agency Bloom, Belay or Somnia Library?');
      selected = scope.map(route => passages.find(p => p.route === route && p.id.endsWith('-stack')));
    } else if (!walkthrough && /数据库|数据表结构|接口定义|源代码|database schema|database engine|source code|api contract/i.test(question)) {
      return empty('insufficient','已收录的案例介绍了产品的使用流程，没有公开数据库选型、接口定义或源码，无法据此确认具体实现。','The cases document product flows, but do not publish the database choice, API contracts or source code needed to confirm that implementation detail.');
    } else if (isIntroduction(question) || walkthrough) {
      const overviews = projects.filter(project => scope.includes(project.route));
      if (!overviews.length) return empty('clarify','你想先了解哪个项目：Agency Bloom、Belay，还是 Somnia Library？','Which project would you like to explore: Agency Bloom, Belay or Somnia Library?');
      selected = overviews.flatMap(project => {
        const prefix = project.id.split('-')[0];
        const ids = walkthrough ? [prefix + '-flow'] : [project.id, prefix + '-flow'];
        return ids.map(id => passages.find(p => p.id === id));
      });
    } else {
      const query = terms(withoutNames(question));
      const ranked = passages.filter(p => scope.includes(p.route) || scope.includes('portfolio')).map(p => {
        const words = terms(p.zh + ' ' + p.en);
        return {p, score:[...query].filter(term => words.has(term)).length};
      }).filter(item => item.score > 0).sort((a,b) => b.score-a.score);
      selected = ranked.slice(0,2).map(item => item.p);
    }
  }
  if (!selected.length) return empty('unavailable','在已收录的作品资料中没有找到能回答这句话的内容。你可以问某个项目的使用流程、设计取舍或作者贡献。自由聊天和翻译需要在线 AI。','No published case passage answers that question. Try asking about a project’s flow, design choices or contributions. Free chat and translation require the online AI service.');
  return {status:example ? 'answer' : 'matches',text:selected.map(p => p[lang]).join('\n\n'),
    sources:selected.map(p => ({id:p.id,title:p.title,href:'#'+p.route}))};
}
