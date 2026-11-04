import { interviewCards } from '../server/portfolio-interview.mjs';
export { interviewCards };
import { passages } from '../server/portfolio-passages.mjs';
import { socialReply } from '../server/portfolio-conversation.mjs';

const sample = (zh, en, ids, reply) => ({zh, en, ids: ids.split(' '), reply});
export const suggestions = {
  XD: [
    sample('这三个作品里，我分别可以亲手试什么？','What can I actually try in each of these three projects?', 'cupcakes-reveal reverie-discover travel-filter', {
      zh:'在 Cupcakes，挑一只礼盒，看颜色线索能不能帮你猜中口味。在 Reverie Reads，试选一种找书起点，再对照 Discover 截图看它在产品中的位置。在 Travel Discovery，先选海滩，再换城市，观察哪些目的地卡片留下来。',
      en:'In Cupcakes, choose a gift box and see if its clue helped you guess the flavor. In Reverie Reads, try a discovery starting point and compare it with the Discover screen. In Travel Discovery, switch from beach to city and watch which destination cards remain.',
    }),
    sample('想看一次点击怎样得到清楚的反馈，先去哪一页？','Where can I see how one click gives clear feedback?', 'cupcakes-reveal', {
      zh:'先看 Cupcakes 的礼盒。点之前，你只知道「一抹莓红」；点之后，同一位置出现草莓照片和名称。再点一次还能把盒子合上。前后变化都留在原处，很容易看出刚才的操作改变了什么。',
      en:'Start with the gift boxes in Cupcakes. Before the click you have a clue, “A little blush.” Afterwards the same card shows a strawberry photo and name. Another click closes the box. You can see exactly what your action changed without looking elsewhere.',
    }),
    sample('还没想好要读什么、去哪玩，这两个产品怎么帮人迈出第一步？','How do the reading and travel experiences help someone who hasn’t chosen yet?', 'reverie-discover travel-filter', {
      zh:'Reverie Reads 让读者从喜欢的一本书、当下心情或「想试点不同的」开始；已经知道书名的人仍可直接搜索。Travel Discovery 把第一步做得更具体：选海滩、城市或山野，就能看到相应的目的地，也能随时换一种偏好。',
      en:'Reverie Reads lets a reader start with a loved book, a mood or a wish for something different, while keeping search for readers who already know the title. Travel Discovery starts with beach, city or mountains, shows matching destinations, and lets the visitor switch preferences.',
    }),
  ],
  'XD-cupcakes': [
    sample('第一只礼盒给了什么线索，打开后又看到了什么？','What clue does the first gift box give, and what does it reveal?', 'cupcakes-reveal'),
    sample('我能同时打开两只礼盒吗？','Can I keep two gift boxes open at once?', 'cupcakes-stack'),
    sample('这个案例里 Annabelle 做了什么，品牌素材来自哪里？','What did Annabelle contribute, and where did the brand materials come from?', 'cupcakes-role'),
  ],
  'XD-reverie': [
    sample('知道书名和只知道想读哪种感觉，应该从哪里开始？','Where do I start with a title in mind, or with only a mood?', 'reverie-discover'),
    sample('改变阅读计划，会不会影响已经读过的记录？','Does changing my reading plan change what I already read?', 'reverie-plan'),
    sample('这些截图展示的是整个产品，还是 Annabelle 自己的工作？','Do these screenshots show the whole product or Annabelle’s own contributions?', 'reverie-stack'),
  ],
  'XD-travel': [
    sample('从「全部」换到「海滩」，目的地列表怎样变化？','What changes when I switch from all destinations to beach?', 'travel-filter'),
    sample('想重新比较所有目的地，需要从头开始吗？','Do I need to start over to compare all destinations again?', 'travel-stack'),
    sample('这个旅行作品是品牌委托，还是课程原型？','Was this a brand commission or a course prototype?', 'travel-rolecheck'),
  ],
  services: [
    sample('这三个项目分别想弄清什么问题？', 'What question is each project trying to answer?',
      'athub-overview visualization-overview energy-flow', {
        zh:'AtHub 问的是：股价和成交量出现怎样的变化，才值得发出预警？公共数据可视化关心的是怎么读懂一组记录，比如哪些水体记录的污水泄漏总量最大。数据中心选址则从一个决策出发：当电价、供电条件和地理位置各有利弊时，应该怎样比较候选地点？',
        en:'AtHub asks which changes in price and trading volume warrant an alert. The visualization collection asks what public records reveal, such as which water bodies account for the largest recorded spill volumes. The siting case asks how to compare locations when power costs, energy supply and geography point to different choices.',
      }),
    sample('哪个项目能看出模型在什么情况下会判断错？', 'Where can I see what a model gets wrong?',
      'athub-limits', {
        zh:'看 AtHub 的「预测窗口与误报取舍」图。多日预测把许多真正的异常日找了出来，却也把不少正常日标成了异常。如果你是收到警报的人，更关心的是：响了这么多次，有几次真的值得查？这正是为什么报告要把精确率和召回率放在一起看。',
        en:'Look at the forecast-horizons figure in AtHub. The multi-day model caught many unusual days, but it also flagged ordinary ones. For someone receiving those alerts, the practical question is how often an alarm is worth investigating. That is why precision matters alongside recall.',
      }),
    sample('我想从原始数据跟到最后一张图，哪件作品适合看？', 'Where can I follow the data all the way to a finished chart?',
      'visualization-spill', {
        zh:'打开「公共数据可视化」里的完整作品，找纽约州水体泄漏量那张图。代码先去掉水体名称缺失或泄漏量无效的记录，再统一名称、按水体累加泄漏量，最后画出总量最高的十个水体。对照代码和图就能看到：这里排的是累计泄漏量，泄漏次数最多的水体不一定排在最前面。',
        en:'Open the full visualization collection and find the New York spill chart. The R code removes records with missing water-body names or invalid quantities, standardizes the names, sums the volumes and plots the ten largest totals. You can trace why a water body with many small spills might rank below one with fewer, larger spills.',
      }),
  ],
  'data-athub': [
    sample('价格变化怎样变成一个异常标签？','How is a market movement turned into an anomaly label?', 'athub-labels'),
    sample('高召回率为什么不意味着预测有用？','Why does high recall not establish useful prediction?', 'athub-alerts'),
    sample('哪些图能看出阈值与预测窗口的取舍？','Where can I see the threshold and horizon tradeoffs?', 'athub-flow athub-limits'),
  ],
  'data-visualization': [
    sample('三种公共数据为什么需要三种图？','Why do the three public datasets use different charts?', 'visualization-overview'),
    sample('水体累计泄漏量能说明居民风险吗？','Does cumulative spill volume measure resident risk?', 'visualization-spill'),
    sample('行业与死亡原因之间的连线能证明因果吗？','Do industry-to-cause links show causation?', 'visualization-count'),
  ],
  'data-energy': [
    sample('选址为什么不能只看电价？','Why is electricity price alone not enough for siting?', 'energy-tradeoff'),
    sample('能源、地域和成本应该怎样放在一起比较？','How do energy, geography and cost fit into one comparison?', 'energy-flow'),
    sample('当选址条件的优先级变了，怎样重新考虑选择？','How should a change in priorities affect the choice?', 'energy-limits'),
  ],
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
  {route:'XD-cupcakes', id:'cupcakes-overview', pattern:'\\bcupcakes?\\b|纸杯蛋糕'},
  {route:'XD-reverie', id:'reverie-overview', pattern:'\\breverie reads\\b|\\bmidniht\\b'},
  {route:'XD-travel', id:'travel-overview', pattern:'\\btravel discovery\\b|旅行探索'},
  {route:'data-athub', id:'athub-overview', pattern:'\\bathub\\b|异常检测'},
  {route:'data-visualization', id:'visualization-overview', pattern:'public data visuali[sz]ation|公共数据可视化'},
  {route:'data-energy', id:'energy-overview', pattern:'data[ -]cent(?:er|re) siting|数据中心选址|选址项目'},
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
    const groupPrefix = page?.startsWith('XD') ? 'XD-' : page === 'services' || page?.startsWith('data-') ? 'data-' : 'web-';
    const groupRoutes = projects.filter(p => p.route.startsWith(groupPrefix)).map(p => p.route);
    const overview = ['portfolio','services','XD'].includes(page);
    const choices = (routes) => routes.map(route => english && route.startsWith('data-') ? {'data-athub':'AtHub','data-visualization':'Public data visualization','data-energy':'Data-center siting'}[route] : passages.find(p => p.route === route).title).join(' / ');
    const continuation = /^(那|它|他们|还有|and\b|then\b|what about|what else)/i.test(question.trim());
    if (!named.length && continuation && new Set(previous.map(p => p.route)).size > 1) {
      return empty('clarify','你指哪个项目？' + choices([...new Set(previous.map(p => p.route))]),'Which project do you mean? ' + choices([...new Set(previous.map(p => p.route))]));
    }
    const scope = named.length ? named.map(p => p.route) : continuation && previous.length ? previous.map(p => p.route) : [page];
    const technical = /代码逻辑|代码流程|业务逻辑|实现逻辑|技术架构|实现流程|code logic|code flow|implementation logic|technical architecture/gi;
    const walkthrough = question.search(technical) !== -1 && isIntroduction(question.replace(technical,'').replace(/是什么样的|是什么|\b(?:the|of|how does|work)\b/gi,''));
    const stackQuestion = /框架|技术栈|什么技术实现|framework|tech(?:nology)? stack|built (?:with|in)|用的是.{0,12}(?:react|vue|fastapi)|页面、API 和数据存储|mini program UI, API and storage/iu.test(question);
    const storageQuestion = /数据库|database/i.test(question) && /哪个|哪种|什么|which|what/i.test(question);
    if (stackQuestion || (storageQuestion && scope.length === 1 && scope[0] === 'web-agency-bloom')) {
      if (overview && scope.includes(page)) return empty('clarify','你想了解哪个项目的技术栈？' + choices(groupRoutes),'Which project’s stack would you like to explore? ' + choices(groupRoutes));
      selected = scope.map(route => passages.find(p => p.route === route && p.id.endsWith('-stack')));
    } else if (scope.includes('data-energy') && /选了|哪座城市|哪个城市|排名|回报率|which city|winning site|return on investment/i.test(question)) {
      selected = [passages.find(p => p.id === 'energy-ranking')];
    } else if (!walkthrough && /数据库|数据表结构|接口定义|源代码|database schema|database engine|source code|api contract/i.test(question)) {
      return empty('insufficient','已收录的案例介绍了产品的使用流程，没有公开数据库选型、接口定义或源码，无法据此确认具体实现。','The cases document product flows, but do not publish the database choice, API contracts or source code needed to confirm that implementation detail.');
    } else if (isIntroduction(question) || walkthrough) {
      const overviews = projects.filter(project => scope.includes(project.route));
      if (!overviews.length) return empty('clarify','你想先了解哪个项目？' + choices(groupRoutes),'Which project would you like to explore? ' + choices(groupRoutes));
      selected = overviews.flatMap(project => {
        const prefix = project.id.split('-')[0];
        const ids = walkthrough ? [prefix + '-flow'] : [project.id, prefix + '-flow'];
        return ids.map(id => passages.find(p => p.id === id));
      });
    } else {
      const query = terms(withoutNames(question));
      const ranked = passages.filter(p => scope.includes(p.route) || (overview && scope.includes(page) && groupRoutes.includes(p.route))).map(p => {
        const words = terms(p.zh + ' ' + p.en);
        return {p, score:[...query].filter(term => words.has(term)).length};
      }).filter(item => item.score > 0).sort((a,b) => b.score-a.score);
      selected = ranked.slice(0,2).map(item => item.p);
    }
  }
  if (!selected.length) return empty('unavailable','在已收录的作品资料中没有找到能回答这句话的内容。你可以问某个项目的使用流程、设计取舍或作者贡献。自由聊天和翻译需要在线 AI。','No published case passage answers that question. Try asking about a project’s flow, design choices or contributions. Free chat and translation require the online AI service.');
  return {status:example ? 'answer' : 'matches',text:example?.reply?.[lang] ?? selected.map(p => p[lang]).join('\n\n'),
    sources:selected.map(p => ({id:p.id,title:p.title,href:'#'+p.route}))};
}
