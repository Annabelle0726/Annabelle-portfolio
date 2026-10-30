import React from 'react';
import WebProjectNav from './WebProjectNav';

const groups = [
  { id: 'portfolio', label: ['网站与设计', 'Web & design'], items: [['web-agency-bloom', 'Agency Bloom'], ['web-belay', 'Belay'], ['web-somnia', 'Somnia Library']] },
  { id: 'XD', label: ['UX/UI 设计', 'UX/UI design'], items: [['XD-cupcakes', 'Cupcakes'], ['XD-reverie', 'Reverie Reads'], ['XD-travel', 'Travel Discovery']] },
  { id: 'services', label: ['数据与 AI', 'Data & AI'], items: [['data-athub', ['AtHub 异常检测', 'AtHub anomaly detection']], ['data-visualization', ['公共数据可视化', 'Public data visualization']], ['data-energy', ['可持续数据中心选址', 'Sustainable data-center siting']]] },
];

export function projectPageLinks(routeId, en = false) {
  const pick = value => Array.isArray(value) ? value[en ? 1 : 0] : value;
  const entry = (id, label) => ({ href: '#' + id, label: pick(label) });
  const groupIndex = groups.findIndex(group => group.id === routeId || group.items.some(([id]) => id === routeId));
  if (groupIndex < 0) return null;
  const group = groups[groupIndex];
  if (routeId === group.id) return {
    previous: groupIndex ? entry(groups[groupIndex - 1].id, groups[groupIndex - 1].label) : entry('about', ['关于我', 'About me']),
    next: groupIndex < groups.length - 1 ? entry(groups[groupIndex + 1].id, groups[groupIndex + 1].label) : entry('agency-bloom', ['微信公众号', 'WeChat articles']),
  };
  const index = group.items.findIndex(([id]) => id === routeId);
  const overview = entry(group.id, en ? 'Back to ' + pick(group.label) : '返回' + pick(group.label));
  return {
    previous: index ? entry(...group.items[index - 1]) : overview,
    next: index < group.items.length - 1 ? entry(...group.items[index + 1]) : overview,
  };
}

export default function ProjectPagination({ routeId, en = false, onNavigate }) {
  const links = projectPageLinks(routeId, en);
  return links && <WebProjectNav {...links} en={en} onNavigate={onNavigate} />;
}
