const articles = [
  ['agency-bloom', 'Agency Bloom：想抵达的生活'],
  ['agency-bloom-value', '在变化中寻找自己的价值'],
  ['agency-bloom-applause', '暂时没有掌声也想继续做下去'],
  ['agency-bloom-ideas', '给想法一次认真的尝试'],
  ['design-care', '好看，想让你多看一眼；用心，想让你心动'],
  ['being-seen', '想被看见，也想看见你'],
  ['personal-brand', 'AI 时代的个人品牌：你靠什么被记住？'],
];

export function articlePageLinks(routeId, en = false) {
  const index = articles.findIndex(([id]) => id === routeId);
  if (index < 0) return null;
  const entry = ([id, label]) => ({ href: '#' + id, label });
  return {
    previous: entry(index ? articles[index - 1] : ['services', en ? 'Data & AI' : '数据与 AI']),
    next: entry(index < articles.length - 1 ? articles[index + 1] : ['models', en ? 'Favorites' : '灵感收藏']),
  };
}
