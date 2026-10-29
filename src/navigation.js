// Keep the published anchor URLs, but mount only their content view.
const views = {
  'agency-bloom': ['agency-bloom', 'wechat'],
  'agency-bloom-value': ['agency-bloom-value', 'wechat'],
  'agency-bloom-applause': ['agency-bloom-applause', 'wechat'],
  hero: ['home', 'home'],
  about: ['about', 'home'],
  skills: ['about', 'home'],
  portfolio: ['portfolio', 'projects'],
  XD: ['design', 'projects'],
  'XD-cupcakes': ['design', 'projects'],
  'XD-reverie': ['design', 'projects'],
  'XD-travel': ['design', 'projects'],
  services: ['data', 'projects'],
  contact: ['contact', 'contact'],
  resume: ['resume', 'contact'],
  models: ['favorites', 'favorites'],
  'models-chatgpt': ['models-chatgpt', 'favorites'],
  'models-claude-code': ['models-claude-code', 'favorites'],
  quotes: ['favorites', 'favorites'],
  'model-skills': ['favorites', 'favorites'],
};

export function resolveNavigation(hash) {
  let id;
  try { id = decodeURIComponent(hash.replace(/^#/, '')); }
  catch { return null; }
  if (!Object.hasOwn(views, id)) return null;
  const [view, group] = views[id];
  return { id, view, group };
}

export function sameContentView(first, second) {
  return first.view === second.view && (first.view !== 'favorites' || first.id === second.id);
}
