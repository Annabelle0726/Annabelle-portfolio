// Keep the published anchor URLs, but mount only their content view.
const views = {
  'agency-bloom': ['agency-bloom', 'wechat'],
  'agency-bloom-value': ['agency-bloom-value', 'wechat'],
  'agency-bloom-applause': ['agency-bloom-applause', 'wechat'],
  'agency-bloom-ideas': ['agency-bloom-ideas', 'wechat'],
  hero: ['home', 'home'],
  about: ['about', 'home'],
  skills: ['about', 'home'],
  portfolio: ['portfolio', 'projects'],
  'web-agency-bloom': ['web-agency-bloom', 'projects'],
  'web-belay': ['web-belay', 'projects'],
  'web-somnia': ['web-somnia', 'projects'],
  XD: ['design', 'projects'],
  'XD-cupcakes': ['design', 'projects'],
  'XD-reverie': ['design', 'projects'],
  'XD-travel': ['design', 'projects'],
  services: ['data', 'projects'],
  'data-athub': ['data-athub', 'projects'],
  'data-visualization': ['data-visualization', 'projects'],
  'data-energy': ['data-energy', 'projects'],
  contact: ['contact', 'contact'],
  models: ['favorites', 'favorites'],
  'models-chatgpt': ['models-chatgpt', 'favorites'],
  'models-claude-code': ['models-claude-code', 'favorites'],
  quotes: ['favorites', 'favorites'],
  'notes-felix': ['notes-felix', 'favorites'],
  'notes-video': ['notes-video', 'favorites'],
  'notes-work': ['notes-work', 'favorites'],
  'notes-judgment': ['notes-judgment', 'favorites'],

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
  if (first.view === 'design' && second.view === 'design' && (first.id === 'XD') !== (second.id === 'XD')) return false;
  return first.view === second.view && (first.view !== 'favorites' || first.id === second.id);
}
